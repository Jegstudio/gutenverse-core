<?php
/**
 * Freemius integration class.
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-framework
 */

namespace Gutenverse\Framework\Integration;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Class Freemius
 *
 * @package gutenverse-framework
 */
class Freemius {
	/**
	 * Freemius instance.
	 *
	 * @var mixed|null
	 */
	protected static $instance = null;

	/**
	 * Get Freemius config.
	 *
	 * @return array
	 */
	public static function get_config() {
		$config = array(
			'id'                  => '28324',
			'slug'                => 'mestorewhy',
			'type'                => 'plugin',
			'public_key'          => 'pk_aeeba75202ab073ac44120b725265',
			'premium_slug'        => 'mestorewhy-premium',
			'premium_suffix'      => 'Pro',
			'is_premium'          => true,
			'has_addons'          => false,
			'has_premium_version' => true,
			'has_paid_plans'      => true,
			'is_org_compliant'    => true,
			'enable_anonymous'    => true,
			'anonymous_mode'      => true,
			'menu'                => array(
				'slug'   => 'gutenverse-pricing',
				'parent' => array(
					'slug' => 'gutenverse',
				),
			),
		);

		return apply_filters( 'gutenverse_freemius_config', $config );
	}

	/**
	 * Check if Freemius credentials exist.
	 *
	 * @param array $config Freemius config.
	 *
	 * @return boolean
	 */
	public static function has_credentials( $config = array() ) {
		return ! empty( $config['id'] ) && ! empty( $config['public_key'] );
	}

	/**
	 * Initialize Freemius.
	 *
	 * @return mixed|null
	 */
	public static function init() {
		if ( null !== static::$instance ) {
			return static::$instance;
		}

		$config = static::get_config();

		if ( ! static::has_credentials( $config ) ) {
			static::$instance = false;
			return null;
		}

		if ( ! function_exists( 'fs_dynamic_init' ) ) {
			$sdk_path = GUTENVERSE_FRAMEWORK_DIR . '/lib/vendor/freemius/wordpress-sdk/start.php';

			if ( ! file_exists( $sdk_path ) ) {
				static::$instance = false;
				return null;
			}

			require_once $sdk_path;
		}

		static::$instance = fs_dynamic_init( $config );

		do_action( 'gutenverse_freemius_loaded' );

		return static::$instance;
	}

	/**
	 * Get Freemius instance.
	 *
	 * @return mixed|null
	 */
	public static function get_instance() {
		$instance = static::init();

		return $instance ? $instance : null;
	}

	/**
	 * Check if Freemius is enabled.
	 *
	 * @return boolean
	 */
	public static function is_enabled() {
		return null !== static::get_instance();
	}

	/**
	 * Get upgrade URL.
	 *
	 * @return string
	 */
	public static function get_upgrade_url() {
		if ( static::is_enabled() ) {
			return static::get_instance()->get_upgrade_url();
		}

		$referral = apply_filters( 'gutenverse_theme_referral_code', null );

		if ( ! empty( $referral ) ) {
			return GUTENVERSE_FRAMEWORK_REFERRAL_URL . '/' . $referral;
		}

		return GUTENVERSE_UPGRADE_URL;
	}

	/**
	 * Get Freemius runtime data for JS.
	 *
	 * @return array
	 */
	public static function get_runtime_data() {
		$data = array(
			'enabled'       => false,
			'pricingUrl'    => '',
			'pricingConfig' => null,
		);

		if ( ! static::is_enabled() ) {
			return $data;
		}

		$data['enabled']       = true;
		$data['pricingUrl']    = static::get_instance()->get_upgrade_url();
		$data['pricingConfig'] = static::get_pricing_config();

		return $data;
	}

	/**
	 * Get default pricing plan payload for JS.
	 *
	 * @return array
	 */
	public static function get_default_pricing_plan_data() {
		return array(
			'active_promotion' => array(),
			'is_event_sales'   => false,
			'event_expired'    => '',
		);
	}

	/**
	 * Get Freemius pricing config data to be consumed by the React pricing page.
	 *
	 * @return array|null
	 */
	public static function get_pricing_config() {
		$fs = static::get_instance();

		if ( ! $fs ) {
			return null;
		}

		$timestamp = time();

		$context_params = array(
			'plugin_id'         => $fs->get_id(),
			'plugin_public_key' => $fs->get_public_key(),
			'plugin_version'    => $fs->get_plugin_version(),
		);

		$bundle_id = $fs->get_bundle_id();
		if ( ! is_null( $bundle_id ) ) {
			$context_params['bundle_id'] = $bundle_id;
		}

		if ( $fs->is_registered() ) {
			$context_params = array_merge(
				$context_params,
				\FS_Security::instance()->get_context_params(
					$fs->get_site(),
					$timestamp,
					'upgrade'
				)
			);
		} else {
			$context_params['home_url'] = home_url();
		}
		if ( $fs->is_payments_sandbox() ) {
			// Add sandbox secure token and full sandbox context parameters.
			// Some frontend integrations expect the full `s_ctx_*` context
			// (type/id/ts/secure) alongside the `sandbox` token so the
			// hosted checkout validates sandbox mode. Ensure we include
			// them even for anonymous/non-registered flows by deriving
			// context from the plugin entity.
			$context_params['sandbox'] = \FS_Security::instance()->get_secure_token(
				$fs->get_plugin(),
				$timestamp,
				'checkout'
			);
			// Merge explicit context params (s_ctx_type, s_ctx_id, s_ctx_ts, s_ctx_secure).
			$context_params = array_merge(
				$context_params,
				\FS_Security::instance()->get_context_params( $fs->get_plugin(), $timestamp, 'checkout' )
			);
		}

		$query_params = array_merge(
			$context_params,
			array(
				'next'             => $fs->_get_sync_license_url( false, false ),
				'plugin_version'   => $fs->get_plugin_version(),
				'billing_cycle'    => WP_FS__PERIOD_ANNUALLY,
				'is_network_admin' => fs_is_network_admin() ? 'true' : 'false',
				'currency'         => $fs->apply_filters( 'default_currency', 'usd' ),
				'discounts_model'  => $fs->apply_filters( 'pricing/discounts_model', 'absolute' ),
			)
		);

			return array_merge(
				array(
					'contact_url'             => $fs->contact_url(),
					'is_production'           => defined( 'WP_FS__IS_PRODUCTION_MODE' ) ? WP_FS__IS_PRODUCTION_MODE : null,
					'menu_slug'               => $fs->get_menu_slug(),
					'mode'                    => 'dashboard',
					'fs_wp_endpoint_url'      => WP_FS__ADDRESS,
					'request_handler_url'     => admin_url(
						'admin-ajax.php?' . http_build_query(
							array(
								'module_id' => $fs->get_id(),
								'action'    => $fs->get_ajax_action( 'pricing_ajax_action' ),
								'security'  => $fs->get_ajax_security( 'pricing_ajax_action' ),
							)
						)
					),
					'unique_affix'            => $fs->get_unique_affix(),
					'show_annual_in_monthly'  => $fs->apply_filters( 'pricing/show_annual_in_monthly', true ),
					'license'                 => $fs->has_active_valid_license() ? $fs->_get_license() : null,
					'disable_single_package'  => $fs->apply_filters( 'pricing/disable_single_package', false ),
					'default_coupon'          => $fs->apply_filters( 'pricing/default_coupon', '' ),
					'client_site'             => home_url(),
					'client_theme'            => wp_get_theme()->get( 'Name' ),
					'client_theme_author'     => wp_get_theme()->get( 'Author' ),
					'client_theme_author_uri' => wp_get_theme()->get( 'AuthorURI' ),
					'selector'                => '#gutenverse-freemius-modal-content',
				),
				$query_params
			);
	}
}
