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

		register_rest_route(
			self::ENDPOINT,
			'base-theme/get',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'base_theme_get' ),
				'permission_callback' => function () {
					if ( ! current_user_can( 'manage_options' ) ) {
						return new \WP_Error(
							'forbidden_permission',
							esc_html__( 'Forbidden Access', 'gutenverse' ),
							array( 'status' => 403 )
						);
					}

					return true;
				},
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'check/license',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'license_check' ),
				'permission_callback' => '__return_true',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'check/requirement',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'requirement_check' ),
				'permission_callback' => '__return_true',
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

		$render = $post_data->render_frontend( false );

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

	/**
	 * Get base theme data
	 *
	 * @param object $request .
	 *
	 * @return object
	 */
	public function base_theme_get( $request ) {

		/**Check if file exist */
		$upload_dir       = wp_upload_dir();
		$upload_base_path = $upload_dir['basedir'];
		$file_path        = $upload_base_path . '/gutenverse/base-themes/data.json';

		global $wp_filesystem;

		if ( ! function_exists( 'WP_Filesystem' ) ) {
			require_once ABSPATH . 'wp-admin/includes/file.php';
			WP_Filesystem();
		}

		/**Check schedule fetch */
		$companion_data = get_option( 'gutenverse-companion-base-theme', false );
		$fetch_time     = null;
		$now            = time();
		if ( $companion_data ) {
			$fetch_time = $companion_data['fetch_time'];
		}
		/**Check if file exist */
		if ( ! $wp_filesystem->exists( $file_path ) ) {
			$updated = $this->update_basetheme_data( $request );
			if ( ! $updated ) {
				return new \WP_REST_Response(
					array(
						'message' => 'Unable to fetch demo data : Server Down! Please try again later.',
					),
					400
				);
			}
			$next_fetch = $now + ( 24 * 60 * 60 );
			update_option(
				'gutenverse-companion-base-theme',
				array(
					'fetch_time' => $next_fetch,
				)
			);
		}
		if ( null === $fetch_time || $fetch_time < $now ) {
			/**Update demo data and fetch time */
			$updated = $this->update_basetheme_data( $request );
			if ( ! $updated ) {
				return new \WP_REST_Response(
					array(
						'message' => 'Unable to fetch demo data : Server Down! Please try again later.',
					),
					400
				);
			}
			$next_fetch = $now + ( 24 * 60 * 60 );
			update_option(
				'gutenverse-companion-base-theme',
				array(
					'fetch_time' => $next_fetch,
				)
			);
		}

		$json_content = file_get_contents( $file_path );
		$data         = json_decode( $json_content, true );
		return rest_ensure_response( $data );
	}

	/**
	 * Update base theme Data
	 */
	public function update_basetheme_data() {

		$response = wp_remote_post(
			GUTENVERSE_FRAMEWORK_LIBRARY_URL . 'wp-json/gutenverse-server/v4/companion/base-theme',
			array(
				'body'    => '',
				'headers' => array(
					'Content-Type' => 'application/json',
				),
			)
		);

		if ( is_wp_error( $response ) || wp_remote_retrieve_response_code( $response ) !== 200 ) {
			return false;
		}

		$response_body = wp_remote_retrieve_body( $response );

		$data = json_decode( $response_body, true );

		if ( json_last_error() !== JSON_ERROR_NONE ) {
			gutenverse_rlog( 'JSON Decode Error: ' . json_last_error_msg() );
			return false;
		}

		// filter show case.
		if ( isset( $data['companion'] ) && is_array( $data['companion'] ) ) {
			$data['companion'] = array_values(
				array_filter(
					$data['companion'],
					function ( $item ) {
						return isset( $item['slug'] ) && 'show-case' !== $item['slug'];
					}
				)
			);
		}

		$filtered_json = wp_json_encode( $data );

		if ( false === $filtered_json ) {
			gutenverse_rlog( 'JSON Encode Error' );
			return false;
		}

		/**Check if directory exist */
		$basedir   = wp_upload_dir()['basedir'];
		$directory = $basedir . '/gutenverse/base-themes';
		if ( ! is_dir( $directory ) ) {
			wp_mkdir_p( $directory );
		}
		$file_path = $directory . '/data.json';

		/**Save data to json file */
		require_once ABSPATH . 'wp-admin/includes/file.php';
		WP_Filesystem();
		global $wp_filesystem;
		$wp_filesystem->put_contents( $file_path, $filtered_json, FS_CHMOD_FILE );
		return true;
	}

	/**
	 * Check if license key is active.
	 *
	 * @param Array $param Array of Request.
	 *
	 * @return WP_Rest.
	 */
	public function license_check( $param ) {
		$response = wp_remote_post(
			GUTENVERSE_LICENSE_SERVER . '/wp-json/gutenverse-pro/v1/license/validate',
			array(
				'body'    => wp_json_encode( $param ),
				'headers' => array(
					'Content-Type' => 'application/json',
				),
			)
		);

		if ( is_wp_error( $response ) ) {
			return false;
		} else {
			return json_decode( wp_remote_retrieve_body( $response ) );
		}
	}

	/**
	 * Check if requirement fullfiled.
	 *
	 * @return bool.
	 */
	public function requirement_check() {
		$plugins        = array();
		$active_plugins = get_option( 'active_plugins' );

		foreach ( $active_plugins as $active ) {
			$plugins[] = explode( '/', $active )[0];
		}
		$is_complete = apply_filters( 'gutenverse_companion_base_theme', false ) && in_array( 'gutenverse-companion', $plugins, true );
		return $is_complete;
	}
}
