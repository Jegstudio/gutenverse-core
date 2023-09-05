<?php
/**
 * Meta Option.
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-framework
 */

namespace Gutenverse\Framework;

use Gutenverse\Framework\Init;

/**
 * Class Plugin Meta.
 *
 * @package gutenverse-framework
 */
class Meta_Option {
	/**
	 * Option Name.
	 *
	 * @var string
	 */
	private $option_name = 'gutenverse-meta-option';

	/**
	 * Instance of Gutenverse.
	 *
	 * @var Meta_Option
	 */
	private static $instance;

	/**
	 * Singleton page for Meta_Option Class
	 *
	 * @return Meta_Option
	 */
	public static function instance() {
		if ( null === static::$instance ) {
			static::$instance = new static();
		}

		return static::$instance;
	}

	/**
	 * Constructor
	 */
	private function __construct() {
		add_action( 'gutenverse_check_update', array( $this, 'check_assets' ) );
		add_action( 'gutenverse_after_init_framework', array( $this, 'init_meta_option' ) );
	}

	/**
	 * Upgrade Plugin Hook.
	 *
	 * @param string $old_version Old Version.
	 * @param string $new_version New Version.
	 * @param string $plugin_name Plugin Name.
	 */
	public function upgrade_plugin( $old_version, $new_version, $plugin_name ) {
		$tracker        = $this->get_option( 'tracker', array() );
		$plugin_tracker = $tracker[ $plugin_name ];
		$versions       = $plugin_tracker['version_history'];
		$versions[]     = $old_version;

		$plugin_tracker['current_version'] = $new_version;
		$plugin_tracker['upgrade_time']    = time();
		$plugin_tracker['version_history'] = $versions;

		$tracker[ $plugin_name ] = $plugin_tracker;

		$this->set_option( 'tracker', $tracker );
	}

	/**
	 * Initial Option.
	 */
	public function initial_option() {
		$options = apply_filters(
			'gutenverse_initial_meta_option',
			array(
				'tracker'          => array(),
				'liked_layout'     => get_option( 'gutenverse-liked-layout', array() ),
				'liked_section'    => get_option( 'gutenverse-liked-section', array() ),
				'subscribed'       => get_option( 'gutenverse-subscribed', false ),
				'subscribed_email' => get_option( 'gutenverse-subscribed-email', '' ),
			)
		);

		$this->set_options( $options );
	}

	/**
	 * Upgrade Process.
	 */
	public function init_meta_option() {
		$option = $this->get_option();

		if ( false === $option ) {
			$this->initial_option();
		}

		do_action( 'gutenverse_check_update' );
	}

	/**
	 * Check upgrade assets if plugin has been upgraded.
	 */
	public function check_assets() {
		$assets = Init::instance()->assets;

		if ( $assets->is_font_icon_exists() ) {
			$tracker = $this->get_option( 'tracker', array() );

			if ( ! isset( $tracker['assets_fonticon'] ) ) {
				$tracker['assets_fonticon'] = array(
					'install_time'    => time(),
					'current_version' => GUTENVERSE_FRAMEWORK_ASSETS_VERSION,
					'version_history' => array(),
					'upgrade_time'    => null,
				);

				$this->set_option( 'tracker', $tracker );
			}

			$version = $tracker['assets_fonticon']['current_version'];

			if ( version_compare( $version, GUTENVERSE_FRAMEWORK_ASSETS_VERSION, '<' ) ) {
				$assets->download_font_icon( true );
				$this->upgrade_plugin( $version, GUTENVERSE_FRAMEWORK_ASSETS_VERSION, 'assets_fonticon' );
			}
		}
	}

	/**
	 * Load Meta Data.
	 *
	 * @param string|null $name Name of setting.
	 * @param \mixed      $default Default Option Value.
	 *
	 * @return \mixed
	 */
	public function get_option( $name = null, $default = null ) {
		$options = get_option( $this->option_name );

		if ( $name ) {
			if ( isset( $options[ $name ] ) ) {
				return $options[ $name ];
			} else {
				return $default;
			}
		}

		return $options;
	}

	/**
	 * Set Option
	 *
	 * @param object $value Value of settings.
	 */
	public function set_options( $value ) {
		$option = $this->get_option();

		if ( $option ) {
			return update_option( $this->option_name, $value );
		} else {
			return add_option( $this->option_name, $value );
		}
	}

	/**
	 * Set Option Name.
	 *
	 * @param string $name Name of setting.
	 * @param mixed  $value Value of settings.
	 */
	public function set_option( $name, $value ) {
		$option          = $this->get_option();
		$option[ $name ] = $value;

		return $this->set_options( $option );
	}

	/**
	 * Delete Option.
	 *
	 * @param string $name Name of setting.
	 */
	public function delete_option( $name ) {
		$option = $this->get_option();
		unset( $option[ $name ] );

		return $this->set_options( $option );
	}
}
