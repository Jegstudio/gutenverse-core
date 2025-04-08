<?php
/**
 * REST APIs class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse
 */

namespace Gutenverse;

use Gutenverse\Block\Post_Block;
use Gutenverse\Block\Post_List;
use Gutenverse\Framework\Init;

/**
 * Class Api
 *
 * @package gutenverse
 */
class Api {
	/**
	 * Instance of Gutenverse.
	 *
	 * @var Api
	 */
	private static $instance;

	/**
	 * Endpoint Path
	 *
	 * @var string
	 */
	const ENDPOINT = 'gutenverse-client/v1';

	/**
	 * Singleton page for Gutenverse Class
	 *
	 * @return Api
	 */
	public static function instance() {
		if ( null === static::$instance ) {
			static::$instance = new static();
		}

		return static::$instance;
	}

	/**
	 * Blocks constructor.
	 */
	private function __construct() {
		if ( did_action( 'rest_api_init' ) ) {
			$this->register_routes();
		}
	}

	/**
	 * Register Gutenverse APIs
	 */
	private function register_routes() {
		/** ----------------------------------------------------------------
		 * Frontend/Global Routes
		 */
		register_rest_route(
			self::ENDPOINT,
			'postblock/data',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'post_block_data' ),
				'permission_callback' => '__return_true',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'postlist/data',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'post_list_data' ),
				'permission_callback' => '__return_true',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'upgrade',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'upgrade_step' ),
				'permission_callback' => array( $this, 'can_install_plugin' ),
			)
		);
	}

	/**
	 * Only for user who can install plugin.
	 */
	public function can_install_plugin() {
		if ( ! current_user_can( 'install_plugins' ) ) {
			return new \WP_Error(
				'forbidden_permission',
				esc_html__( 'Forbidden Access', 'gutenverse' ),
				array( 'status' => 403 )
			);
		}

		return true;
	}

	/**
	 * Upgrade Step.
	 *
	 * @param object $request Request Object.
	 *
	 * @return WP_Rest
	 */
	public function upgrade_step( $request ) {
		$step   = $request->get_param( 'step' );
		$result = true;

		switch ( $step ) {
			case 'form':
				$result = $this->install_plugin( 'gutenverse-form', 'gutenverse-form/gutenverse-form.php' );
				break;
			case 'icon':
				$result = Init::instance()->assets->download_font_icon();
				break;
			default:
				( new Upgrader() )->upgrader_page_upgrade_close();
				break;
		}

		return $result;
	}

	/**
	 * Install Plugin.
	 *
	 * @param string $path Plugin path.
	 *
	 * @return boolean
	 */
	public function is_plugin_installed( $path ) {
		require_once ABSPATH . 'wp-admin/includes/plugin.php';
		$installed_plugins = get_plugins();
		return isset( $installed_plugins[ $path ] );
	}

	/**
	 * Install Plugin.
	 *
	 * @param string $slug Plugin slug.
	 * @param string $plugin plugin path.
	 */
	public function install_plugin( $slug, $plugin ) {
		$result = true;

		if ( ! $this->is_plugin_installed( $plugin ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin-install.php';
			require_once ABSPATH . 'wp-admin/includes/file.php';
			require_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';
			require_once ABSPATH . 'wp-admin/includes/plugin.php';

			$api = plugins_api(
				'plugin_information',
				array(
					'slug' => $slug,
				)
			);

			$plugin_upgrader = new \Plugin_Upgrader( new \WP_Ajax_Upgrader_Skin() );

			$result = $plugin_upgrader->install(
				$api->download_link,
				array(
					'clear_update_cache' => false,
				)
			);
		}

		if ( $result || ! is_wp_error( $result ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
			activate_plugin( $plugin, null, null, true );
		}

		return true;
	}

	/**
	 * Get Post Block Pagination Data
	 *
	 * @param object $request .
	 */
	public function post_block_data( $request ) {
		$attributes = $request['attributes'];
		$post_data  = new Post_Block();

		$post_data->set_attributes( $attributes );

		$render = $post_data->render_frontend();

		return array(
			'rendered' => $render,
		);
	}

	/**
	 * Get Post List Pagination Data
	 *
	 * @param object $request .
	 */
	public function post_list_data( $request ) {
		$attributes = $request['attributes'];
		$post_data  = new Post_List();

		$post_data->set_attributes( $attributes );

		$render = $post_data->render_frontend();

		return array(
			'rendered' => $render,
		);
	}
}
