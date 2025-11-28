<?php
/**
 * REST APIs class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse
 */

namespace Gutenverse\Framework;

use Automatic_Upgrader_Skin;
use Exception;
use Theme_Upgrader;
use WP_Error;
use WP_Query;
use WP_REST_Response;

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

	const DATA_FOLDER = 'data_ver2_0_0';

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
		/**
		 * Backend routes.
		 */
		register_rest_route(
			self::ENDPOINT,
			'subscribed',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'subscribed' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'settings/modify',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'modify_settings' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'settings/font-icon',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'download_font_icon' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'globalvariable/modify',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'modify_global_variable' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'global/additional_settings',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'get_global_additional_settings' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'global/additional_settings/update',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'update_global_additional_settings' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'themes/activate',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'activate_theme' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'themes/install',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'install_theme' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'taxonomies',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_taxonomies' ),
				'permission_callback' => 'gutenverse_permission_check_author',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'singles',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_singles' ),
				'permission_callback' => 'gutenverse_permission_check_author',
			)
		);

		// Template Library.
		register_rest_route(
			self::ENDPOINT,
			'layout/like-list',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'liked_layout' ),
				'permission_callback' => 'gutenverse_permission_check_author',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'section/like-list',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'liked_section' ),
				'permission_callback' => 'gutenverse_permission_check_author',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'layout/set-like',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'site_like_layout' ),
				'permission_callback' => 'gutenverse_permission_check_author',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'section/set-like',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'site_like_section' ),
				'permission_callback' => 'gutenverse_permission_check_author',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'import/images',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'import_images' ),
				'permission_callback' => 'gutenverse_permission_check_author',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'layout/like-state',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'layout_like_state' ),
				'permission_callback' => 'gutenverse_permission_check_author',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'section/like-state',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'section_like_state' ),
				'permission_callback' => 'gutenverse_permission_check_author',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'layout/categories',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'layout_categories' ),
				'permission_callback' => 'gutenverse_permission_check_author',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'layout/search',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'layout_search' ),
				'permission_callback' => 'gutenverse_permission_check_author',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'layout/single',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'single_layout' ),
				'permission_callback' => 'gutenverse_permission_check_author',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'section/categories',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'section_categories' ),
				'permission_callback' => 'gutenverse_permission_check_author',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'section/search',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'section_search' ),
				'permission_callback' => 'gutenverse_permission_check_author',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'theme/search',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'search_theme' ),
				'permission_callback' => 'gutenverse_permission_check_author',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'library/data',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'fetch_library_data' ),
				'permission_callback' => 'gutenverse_permission_check_author',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'data/update',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'update_library_data' ),
				'permission_callback' => 'gutenverse_permission_check_author',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'notice/close',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'notice_close' ),
				'permission_callback' => 'gutenverse_permission_check_author',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'library/install-activate-theme',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'install_and_activate_theme_by_slug' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'settings/remove-cache',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'remove_cache_files' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		/** ----------------------------------------------------------------
		 * Frontend/Global Routes
		 */
		register_rest_route(
			self::ENDPOINT,
			'menu',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'menu' ),
				'permission_callback' => '__return_true',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'menu/render',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'menu_render' ),
				'permission_callback' => '__return_true',
			)
		);
	}

	/**
	 * Remove Frontend Cache Files
	 *
	 * since version 2.3.1
	 *
	 * @return WP_Rest
	 */
	public function remove_cache_files() {
		try {
			$options = get_option( 'gutenverse-settings' );

			if ( ( 'manual' === $options['frontend_settings']['file_delete_mechanism'] || null === $options['frontend_settings']['file_delete_mechanism'])) {
				Init::instance()->frontend_cache->cleanup_cached_style();
				return new WP_REST_Response(
					array(
						'status' => 'success',
					),
					200
				);
			}else{
				throw new Exception("Failed Request: Can Only used if Manual Deletion is Manual", 1);
			}
			
		} catch ( \Throwable $th ) {
			return new WP_REST_Response(
				array(
					'status'  => 'failed',
					'message' => $th->getMessage(),
				),
				400
			);
		}
	}
	/**
	 * Fetch Data
	 *
	 * @param object $request .
	 *
	 * @return WP_Rest
	 */
	public function install_and_activate_theme_by_slug( $request ) {
		require_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';
		require_once ABSPATH . 'wp-admin/includes/theme.php';
		require_once ABSPATH . 'wp-admin/includes/file.php';
		require_once ABSPATH . 'wp-admin/includes/plugin.php'; // for is_plugin_active() if needed
		require_once ABSPATH . 'wp-includes/theme.php';

		$slug = sanitize_text_field( $request->get_param( 'slug' ) );
		if ( empty( $slug ) ) {
			return new WP_Error( 'no_slug', 'Theme slug is required', array( 'status' => 400 ) );
		}

		// Check if already installed
		$installed_themes = wp_get_themes();
		if ( isset( $installed_themes[ $slug ] ) ) {
			switch_theme( $slug );
			return array(
				'success' => true,
				'message' => 'Theme already installed and activated',
				'slug'    => $slug,
			);
		}

		// Get theme info from WP.org
		$api = themes_api(
			'theme_information',
			array(
				'slug'   => $slug,
				'fields' => array( 'sections' => false ),
			)
		);
		if ( is_wp_error( $api ) ) {
			return new WP_Error( 'theme_api_failed', $api->get_error_message(), array( 'status' => 400 ) );
		}

		// Install theme
		$skin     = new Automatic_Upgrader_Skin();
		$upgrader = new Theme_Upgrader( $skin );

		$result = $upgrader->install( $api->download_link );
		if ( is_wp_error( $result ) || ! $result ) {
			return new WP_Error( 'install_failed', 'Theme installation failed', array( 'status' => 500 ) );
		}

		// Activate theme
		$theme_stylesheet = $slug;
		switch_theme( $theme_stylesheet );

		return array(
			'success' => true,
			'message' => 'Theme installed and activated successfully',
			'slug'    => $slug,
		);
	}
	/**
	 * Fetch Data
	 *
	 * @param object $request .
	 *
	 * @return WP_Rest
	 */
	public function fetch_library_data( $request ) {
		$library_time = Meta_Option::instance()->get_option( 'fetch_library_time' );
		$now          = time();

		$upload_dir       = wp_upload_dir();
		$upload_base_path = $upload_dir['basedir'];

		$directory_to_check = $upload_base_path . '/gutenverse/' . self::DATA_FOLDER;
		if ( ! is_dir( $directory_to_check ) ) {
			$this->update_library_data();
		}

		$dev_param = $request->get_param( 'dev' );

		if ( 'true' === $dev_param ) {
			$this->update_library_data();
		}

		if ( null === $library_time || $library_time < $now ) {
			$next_fetch = $now + ( 24 * 60 * 60 );
			Meta_Option::instance()->set_option( 'fetch_library_time', $next_fetch );
			$this->update_library_data();
		}
		return $this->library_data();
	}

	/**
	 * Install Themes from Gutenverse.com repository.
	 *
	 * @param object $request .
	 */
	public function install_theme( $request ) {
		$theme = $this->gutenverse_api_esc_data( $request->get_param( 'slug' ), 'string' );
		$info  = $this->gutenverse_api_esc_data( $request->get_param( 'info' ), 'string' );
		$key   = $this->gutenverse_api_esc_data( $request->get_param( 'key' ), 'string' );

		if ( empty( $info ) ) {
			$info = GUTENVERSE_FRAMEWORK_LIBRARY_URL . '/wp-json/gutenverse-server/v1/theme/information';
		}

		$request = wp_remote_post(
			$info,
			array(
				'headers' => array(
					'origin' => site_url(),
				),
				'body'    => array(
					'slug' => $theme,
					'key'  => $key,
				),
			)
		);

		$res = json_decode( wp_remote_retrieve_body( $request ), true );
		$api = (object) $res;

		require_once ABSPATH . 'wp-admin/includes/misc.php';
		require_once ABSPATH . 'wp-admin/includes/file.php';
		include_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';

		/** Need to allow file locally hosted. */
		add_filter(
			'http_request_host_is_external',
			function () {
				return true;
			}
		);

		$upgrader = new \Theme_Upgrader( new \WP_Ajax_Upgrader_Skin() );
		$result   = $upgrader->install( $api->download_link );

		if ( $result ) {
			return $api;
		} else {
			return false;
		}
	}

	/**
	 * Library Data.
	 *
	 * @return array
	 */
	public function library_data() {
		$data = array(
			'layout-data'        => null,
			'layout-categories'  => null,
			'theme-data'         => null,
			'theme-categories'   => null,
			'section-data'       => null,
			'section-categories' => null,
			'plugin-ecosystem'   => null,
		);

		foreach ( $data as $key => $value ) {
			$content = $this->get_json_data( $key );
			if ( 'layout-data' === $key ) {
				$content = $this->inject_layout_like( $content );
			}

			if ( 'section-data' === $key ) {
				$content = $this->inject_section_like( $content );
			}

			$data[ $key ] = $content;
		}
		return $data;
	}

	/**
	 * Get Plugin Image.
	 *
	 * @param array $plugin String Plugin.
	 *
	 * @return string
	 */
	public function get_plugin_image( $plugin ) {
		$plugin = (array) $plugin;

		if ( ! empty( $plugin['icons']['svg'] ) ) {
			$plugin_icon_url = $plugin['icons']['svg'];
		} elseif ( ! empty( $plugin['icons']['2x'] ) ) {
			$plugin_icon_url = $plugin['icons']['2x'];
		} elseif ( ! empty( $plugin['icons']['1x'] ) ) {
			$plugin_icon_url = $plugin['icons']['1x'];
		} else {
			$plugin_icon_url = $plugin['icons']['default'];
		}

		return $plugin_icon_url;
	}

	/**
	 * Inject Plugin Detail.
	 *
	 * @param array $data Theme Data.
	 *
	 * @return array
	 */
	public function inject_plugin_detail( $data ) {
		foreach ( $data as $key => $value ) {
			$plugin                      = $this->fetch_plugin_detail( $value->slug );
			$data[ $key ]                = (array) $data[ $key ];
			$data[ $key ]['icons']       = $this->get_plugin_image( $plugin );
			$data[ $key ]['description'] = $data[ $key ]['description'] ? $data[ $key ]['description'] : $plugin['description'];
			$data[ $key ]['version']     = $data[ $key ]['version'] ? $data[ $key ]['version'] : $plugin['version'];
		}
		return $data;
	}

	/**
	 * Get plugin information
	 *
	 * @param string $plugin_slug Plugin Slug.
	 *
	 * @return array
	 */
	public function fetch_plugin_detail( $plugin_slug ) {
		require_once ABSPATH . 'wp-admin/includes/plugin-install.php';
		$result = plugins_api(
			'plugin_information',
			array(
				'slug'   => $plugin_slug,
				'locale' => 'en_US',
				'fields' => array(
					'icons' => true,
				),
			)
		);

		$description = array(
			'icons'       => $result->icons,
			'description' => wp_strip_all_tags( $result->sections['description'] ),
			'version'     => $result->version,
			'name'        => $result->name,
		);
		return $description;
	}

	/**
	 * Inject Like To Theme.
	 *
	 * @param array $data Theme Data.
	 *
	 * @return array
	 */
	public function inject_layout_like( $data ) {
		$liked = Meta_Option::instance()->get_option( 'liked_layout' );
		if ( ! empty( $data ) ) {
			foreach ( $data as $key => $item ) {
				if ( is_array( $data[ $key ] ) ) {
					$data[ $key ]['like'] = ! empty( $liked ) ? in_array( $item['data']['slug'], $liked, true ) : false;
				}
			}
		}

		return $data;
	}

	/**
	 * Inject Like To Section.
	 *
	 * @param array $data Theme Data.
	 *
	 * @return array
	 */
	public function inject_section_like( $data ) {
		$liked = Meta_Option::instance()->get_option( 'liked_section' );

		foreach ( $data as $key => $item ) {
			if ( is_array( $data[ $key ] ) ) {
				$data[ $key ]['like'] = ! empty( $liked ) ? in_array( $item['data']['slug'], $liked, true ) : false;
			}
		}

		return $data;
	}

	/**
	 * Layout Like.
	 *
	 * @param object $request Request Object.
	 *
	 * @return WP_Rest
	 */
	public function search_theme( $request ) {
		$keyword = $this->gutenverse_api_esc_data( $request->get_param( 'keyword' ), 'string' );
		$paging  = $this->gutenverse_api_esc_data( $request->get_param( 'paging' ), 'integer' );
		$filter  = $this->gutenverse_api_esc_data( $request->get_param( 'filter' ), 'string' );

		$result = array();
		$themes = $this->filter_layout(
			array(
				'keyword' => $keyword,
				'host'    => $filter,
			)
		);

		foreach ( $themes as $theme ) {
			$result[] = array(
				'id'                 => $theme->id,
				'slug'               => $theme->data->slug,
				'name'               => $theme->data->name,
				'demo'               => $theme->data->demo,
				'host'               => $theme->data->host,
				'cover'              => $theme->data->cover[0],
				'compatible_version' => $theme->data->compatible_version,
			);
		}

		$content = $this->data_paging( $result, $paging, false );

		return array(
			'themes'  => $content['data'],
			'total'   => $content['total'],
			'current' => $paging,
		);
	}

	/**
	 * Like State.
	 *
	 * @param string $slug slug of single layout / theme.
	 * @param string $state like state.
	 * @param string $option Name of option.
	 *
	 * @return boolean
	 */
	public function like_state( $slug, $state, $option ) {
		$liked = Meta_Option::instance()->get_option( $option );

		if ( $state ) {
			if ( ! in_array( $slug, $liked, true ) ) {
				$liked[] = $slug;
			}
		} else {
			$search = array_search( $slug, $liked, true );
			if ( false !== $search ) {
				unset( $liked[ $search ] );
			}
		}

		return Meta_Option::instance()->set_option( $option, $liked );
	}

	/**
	 * Layout Like.
	 *
	 * @param object $request Request Object.
	 *
	 * @return WP_Rest
	 */
	public function section_like_state( $request ) {
		$slug  = $this->gutenverse_api_esc_data( $request->get_param( 'slug' ), 'string' );
		$state = $this->gutenverse_api_esc_data( $request->get_param( 'state' ), 'boolean' );

		return $this->like_state( $slug, $state, 'liked_section' );
	}

	/**
	 * Layout Like.
	 *
	 * @param object $request Request Object.
	 *
	 * @return WP_Rest
	 */
	public function layout_like_state( $request ) {
		$slug  = $this->gutenverse_api_esc_data( $request->get_param( 'slug' ), 'string' );
		$state = $this->gutenverse_api_esc_data( $request->get_param( 'state' ), 'boolean' );

		return $this->like_state( $slug, $state, 'liked_layout' );
	}

	/**
	 * Single Layout.
	 *
	 * @param int $id ID of single themes.
	 *
	 * @return object|null
	 */
	public function get_single_themes( $id ) {
		$themes = $this->get_json_data( 'theme-data' );

		foreach ( $themes as $theme ) {
			if ( $theme->id === $id ) {
				return $theme;
			}
		}
	}

	/**
	 * Single Layout.
	 *
	 * @param object $request Request Object.
	 *
	 * @return WP_Rest
	 */
	public function single_layout( $request ) {
		$liked = Meta_Option::instance()->get_option( 'liked_layout' );
		$id    = $request->get_param( 'id' );
		$theme = $this->get_single_themes( $id );

		if ( $theme ) {
			$title = $theme->name;
			$pages = array();

			foreach ( $theme->data->pages as $page ) {
				$pages[] = array(
					'id'         => $page->index,
					'title'      => $page->title,
					'coverImage' => $page->coverImage[0],
					'fullImage'  => $page->fullImage[0],
				);
			}

			return array(
				'id'                 => $id,
				'title'              => $title,
				'pages'              => $pages,
				'demo'               => $theme->data->demo,
				'isPro'              => (bool) $theme->data->pro,
				'slug'               => $theme->data->slug,
				'like'               => in_array( (int) $id, $liked, true ),
				'compatible_version' => $theme->data->compatible_version,
			);
		}

		return null;
	}

	/**
	 * Escape data
	 *
	 * @param mixed $value .
	 * @param mixed $type .
	 *
	 * @return mixed
	 */
	private function gutenverse_api_esc_data( $value, $type = 'string' ) {
		switch ( $type ) {
			case 'string':
				return esc_html( sanitize_text_field( wp_unslash( $value ) ) );
			case 'integer':
				return (int) $value;
			case 'boolean':
				return (bool) $value;
			default:
				return false;
		}
	}

	/**
	 * Update Data.
	 */
	public function update_library_data() {
		if ( ! apply_filters( 'gutenverse_server_mode', false ) ) {
			$endpoints = array(
				array(
					'version'  => 'v5',
					'endpoint' => 'layout/data',
					'filename' => 'layout/data',
				),
				array(
					'version'  => 'v4',
					'endpoint' => 'library/layout/categories',
					'filename' => 'layout/categories',
				),
				array(
					'version'  => 'v5',
					'endpoint' => 'theme/data',
					'filename' => 'theme/data',
				),
				array(
					'version'  => 'v4',
					'endpoint' => 'library/theme/categories',
					'filename' => 'theme/categories',
				),
				array(
					'version'  => 'v5',
					'endpoint' => 'section/data',
					'filename' => 'section/data',
				),
				array(
					'version'  => 'v4',
					'endpoint' => 'library/section/categories',
					'filename' => 'section/categories',
				),
				array(
					'version'  => 'v3',
					'endpoint' => 'plugin/ecosystem',
					'filename' => 'plugin/ecosystem',
				),
			);

			$apipath   = GUTENVERSE_FRAMEWORK_LIBRARY_URL . 'wp-json/gutenverse-server/';
			$basedir   = wp_upload_dir()['basedir'];
			$directory = $basedir . '/gutenverse/' . self::DATA_FOLDER . '/';
			wp_mkdir_p( $directory );

			foreach ( $endpoints as $data ) {
				$filename = str_replace( '/', '-', $data['filename'] ) . '.json';
				$filepath = $directory . $filename;
				$url      = $apipath . $data['version'] . '/' . $data['endpoint'];
				$this->fetch_file( $url, $filepath, $data['endpoint'] );
			}
		}
	}

	/**
	 * Close notice.
	 *
	 * @param object $request Request Object.
	 */
	public function notice_close( $request ) {
		$notice_id = $this->gutenverse_api_esc_data( $request->get_param( 'id' ), 'string' );
		update_option( "gutenverse_{$notice_id}", true );

		return false;
	}

	/**
	 * Get Json Data.
	 *
	 * @param string $name File File Path.
	 *
	 * @return mixed
	 *
	 * @todo : Fetch data untuk refresh data.
	 * @todo : Check folder data dulu. kalau ga ada fallback ke folder asli.
	 */
	public function get_json_data( $name ) {
		require_once ABSPATH . 'wp-admin/includes/file.php';
		WP_Filesystem();
		global $wp_filesystem;
		$directory = wp_upload_dir()['basedir'] . '/gutenverse/';
		$json      = array();

		if ( $wp_filesystem->exists( $directory . '/' . self::DATA_FOLDER . '/' . $name . '.json' ) ) {
			$file = $wp_filesystem->get_contents( $directory . '/' . self::DATA_FOLDER . '/' . $name . '.json' );
			$json = json_decode( $file, true );
		} elseif ( $wp_filesystem->exists( GUTENVERSE_FRAMEWORK_DIR . '/data/' . $name . '.json' ) ) {
			$file = $wp_filesystem->get_contents( GUTENVERSE_FRAMEWORK_DIR . '/data/' . $name . '.json' );
			$json = json_decode( $file, true );
		}

		$additional = apply_filters( 'gutenverse_json_data_' . $name, array() );
		if ( ! $json ) {
			$json = array();
		}
		return array_merge( $json, $additional );
	}

	/**
	 * Get theme count.
	 *
	 * @param array  $data array of themes.
	 * @param string $slug Theme Slug.
	 *
	 * @return integer
	 */
	public function get_data_count( $data, $slug ) {
		$count = 0;

		foreach ( $data as $item ) {
			foreach ( $item->categories as $category ) {
				if ( $category->slug === $slug ) {
					++$count;
				}
			}
		}

		return $count;
	}

	/**
	 * Soft Section.
	 *
	 * @param array $sections Array of section.
	 *
	 * @return array
	 */
	public function sort_section( $sections ) {
		usort(
			$sections,
			function ( $a, $b ) {
				return $a->count < $b->count;
			}
		);
		return $sections;
	}

	/**
	 * Layout Categories.
	 *
	 * @param object $request Request Object.
	 *
	 * @return WP_Rest
	 */
	public function section_categories( $request ) {
		$categories = $this->get_json_data( 'section-categories' );
		$license    = $this->gutenverse_api_esc_data( $request->get_param( 'license' ), 'string' );
		$favorite   = $this->gutenverse_api_esc_data( $request->get_param( 'favorite' ), 'boolean' );
		$filters    = array(
			'license' => $license,
		);

		if ( $favorite ) {
			$filters['include'] = Meta_Option::instance()->get_option( 'liked_section' );
		}

		$sections = $this->filter_section( $filters );

		foreach ( $categories as $index => $category ) {
			$count = $this->get_data_count( $sections, $category->slug );
			if ( $count ) {
				$categories[ $index ]->count = $count;
			} else {
				$categories[ $index ]->count = 0;
			}
		}

		return array_merge(
			array(
				array(
					'id'    => '',
					'name'  => esc_html__( 'All', '--gctd--' ),
					'count' => count( $sections ),
				),
			),
			$this->sort_section( $categories )
		);
	}

	/**
	 * Filter Section.
	 *
	 * @param array $filters Filters.
	 *
	 * @return array
	 */
	public function filter_section( $filters ) {
		$data   = $this->get_json_data( 'section-data' );
		$result = array();

		foreach ( $data as $section ) {
			if ( isset( $filters['include'] ) ) {
				if ( ! in_array( (int) $section->id, $filters['include'], true ) ) {
					continue;
				}
			}

			if ( isset( $filters['category'] ) && $filters['category'] ) {
				$flag = true;
				foreach ( $section->categories as $category ) {
					if ( $category->id === $filters['category'] ) {
						$flag = $flag && false;
					}
				}
				if ( $flag ) {
					continue;
				}
			}

			if ( isset( $filters['license'] ) && $filters['license'] ) {
				$is_pro = ( 'pro' === $filters['license'] );

				if ( $is_pro !== (bool) $section->data->pro ) {
					continue;
				}
			}

			$result[] = $section;
		}

		return $result;
	}

	/**
	 * Paging Data.
	 *
	 * @param array $data Array of data.
	 * @param int   $paging Current Page.
	 * @param int   $per_page Default Per Page.
	 *
	 * @return array
	 */
	public function data_paging( $data, $paging, $per_page ) {
		if ( $per_page ) {
			$start_index = $per_page * ( $paging - 1 );
			$result      = array_slice( $data, $start_index, $per_page );
			$count       = count( $data );
			$total_page  = ceil( $count / $per_page );

			return array(
				'current' => $paging,
				'data'    => $result,
				'total'   => $total_page,
			);
		} else {
			return array(
				'current' => 1,
				'data'    => $data,
				'total'   => 1,
			);
		}
	}

	/**
	 * Section Search.
	 *
	 * @param object $request Request Object.
	 *
	 * @return WP_Rest
	 */
	public function section_search( $request ) {
		$liked      = Meta_Option::instance()->get_option( 'liked_section' );
		$categories = $this->gutenverse_api_esc_data( $request->get_param( 'categories' ), 'integer' );
		$license    = $this->gutenverse_api_esc_data( $request->get_param( 'license' ), 'string' );
		$paging     = $this->gutenverse_api_esc_data( $request->get_param( 'paging' ), 'integer' );

		$result   = array();
		$sections = $this->filter_section(
			array(
				'category' => $categories,
				'license'  => $license,
			)
		);

		foreach ( $sections as $section ) {
			$result[] = array(
				'id'                 => $section->id,
				'pro'                => (bool) $section->data->pro,
				'cover'              => $section->data->cover,
				'like'               => in_array( (int) $section->id, $liked, true ),
				'compatible_version' => $section->data->compatible_version,
			);
		}

		return $this->data_paging( $result, $paging, 20 );
	}

	/**
	 * Layout Categories.
	 *
	 * @param object $request Request Object.
	 *
	 * @return WP_Rest
	 */
	public function layout_categories( $request ) {
		$categories = $this->get_json_data( 'theme-categories' );
		$keyword    = $this->gutenverse_api_esc_data( $request->get_param( 'keyword' ), 'string' );
		$license    = $this->gutenverse_api_esc_data( $request->get_param( 'license' ), 'string' );
		$favorite   = $this->gutenverse_api_esc_data( $request->get_param( 'favorite' ), 'boolean' );

		$filters = array(
			'keyword' => $keyword,
			'license' => $license,
		);

		if ( $favorite ) {
			$filters['include'] = Meta_Option::instance()->get_option( 'liked_layout' );
		}

		$themes = $this->filter_layout( $filters );

		foreach ( $categories as $index => $category ) {
			$count = $this->get_data_count( $themes, $category->slug );
			if ( $count ) {
				$categories[ $index ]->count = $count;
			} else {
				$categories[ $index ]->count = 0;
			}
		}

		return array_merge(
			array(
				array(
					'id'    => '',
					'name'  => esc_html__( 'All', '--gctd--' ),
					'count' => count( $themes ),
				),
			),
			$this->sort_section( $categories )
		);
	}

	/**
	 * Filter Layout.
	 *
	 * @param array $filters Filter Content.
	 *
	 * @return array
	 */
	public function filter_layout( $filters ) {
		$data   = $this->get_json_data( 'theme-data' );
		$result = array();

		foreach ( $data as $theme ) {
			if ( isset( $filters['include'] ) ) {
				if ( ! in_array( (int) $theme->id, $filters['include'], true ) ) {
					continue;
				}
			}

			if ( isset( $filters['category'] ) && $filters['category'] ) {
				$flag = true;
				foreach ( $theme->categories as $category ) {
					if ( $category->id === $filters['category'] ) {
						$flag = $flag && false;
					}
				}
				if ( $flag ) {
					continue;
				}
			}

			if ( isset( $filters['keyword'] ) && $filters['keyword'] ) {
				$flag = true;

				if ( ! gutenverse_str_contains( strtolower( $theme->data->name ), strtolower( $filters['keyword'] ) ) ) {
					continue;
				}
			}

			if ( isset( $filters['license'] ) && $filters['license'] ) {
				$is_pro = ( 'pro' === $filters['license'] );

				if ( $is_pro !== (bool) $theme->data->pro ) {
					continue;
				}
			}

			$result[] = $theme;
		}

		return $result;
	}

	/**
	 * Layout Search.
	 *
	 * @param object $request Request Object.
	 *
	 * @return WP_Rest
	 */
	public function layout_search( $request ) {
		$liked      = Meta_Option::instance()->get_option( 'liked_layout' );
		$categories = $this->gutenverse_api_esc_data( $request->get_param( 'categories' ), 'integer' );
		$keyword    = $this->gutenverse_api_esc_data( $request->get_param( 'keyword' ), 'string' );
		$license    = $this->gutenverse_api_esc_data( $request->get_param( 'license' ), 'string' );
		$paging     = $this->gutenverse_api_esc_data( $request->get_param( 'paging' ), 'integer' );

		$result  = array();
		$layouts = $this->filter_layout(
			array(
				'category' => $categories,
				'keyword'  => $keyword,
				'license'  => $license,
			)
		);

		foreach ( $layouts as $layout ) {
			$result[] = array(
				'id'                 => $layout->id,
				'pro'                => (bool) $layout->data->pro,
				'slug'               => $layout->data->slug,
				'title'              => $layout->data->name,
				'cover'              => $layout->data->cover,
				'compatible_version' => $layout->data->compatible_version,
				'like'               => in_array( (int) $layout->id, $liked, true ),
			);
		}

		return $this->data_paging( $result, $paging, 9 );
	}

	/**
	 * Liked Layout
	 *
	 * @param object $request object.
	 *
	 * @return WP_Rest
	 */
	public function liked_layout( $request ) {
		$liked      = Meta_Option::instance()->get_option( 'liked_layout' );
		$categories = (int) $this->gutenverse_api_esc_data( $request->get_param( 'categories' ), 'integer' );
		$license    = $this->gutenverse_api_esc_data( $request->get_param( 'license' ), 'string' );

		$result = array();
		$liked  = ! empty( $liked ) ? $liked : array();

		$layouts = $this->filter_layout(
			array(
				'category' => $categories,
				'license'  => $license,
				'include'  => $liked,
			)
		);

		foreach ( $layouts as $layout ) {
			$result[] = array(
				'id'    => $layout->id,
				'pro'   => (bool) $layout->data->pro,
				'slug'  => $layout->data->slug,
				'title' => $layout->data->name,
				'cover' => $layout->data->cover,
				'like'  => in_array( $layout->id, $liked, true ),
			);
		}

		return $this->data_paging( $result, 1, false );
	}

	/**
	 * Liked Layout
	 *
	 * @param object $request object.
	 *
	 * @return WP_Rest
	 */
	public function liked_section( $request ) {
		$liked      = Meta_Option::instance()->get_option( 'liked_section' );
		$categories = (int) $this->gutenverse_api_esc_data( $request->get_param( 'categories' ), 'integer' );
		$license    = $this->gutenverse_api_esc_data( $request->get_param( 'license' ), 'string' );

		$result = array();
		$liked  = ! empty( $liked ) ? $liked : array();

		$sections = $this->filter_section(
			array(
				'category' => $categories,
				'license'  => $license,
				'include'  => $liked,
			)
		);

		foreach ( $sections as $section ) {
			$result[] = array(
				'id'    => $section->id,
				'pro'   => (bool) $section->data->pro,
				'cover' => $section->data->cover,
				'like'  => in_array( $section->id, $liked, true ),
			);
		}

		return $this->data_paging( $result, 1, false );
	}

	/**
	 * Modify Settings
	 *
	 * @param object $request .
	 */
	public function modify_settings( $request ) {
		$data = $request->get_param( 'setting' );

		if ( array_key_exists( 'gvnews_settings', $data ) ) {
			update_option( 'gvnews_settings', $data['gvnews_settings'] );
		} else {
			global $wp_filesystem;
			require_once ABSPATH . 'wp-admin/includes/file.php';
			WP_Filesystem();
			$option      = get_option( 'gutenverse-settings' );
			$value       = $option ? $option : array();
			$upload_dir  = wp_upload_dir();
			$upload_path = $upload_dir['basedir'];
			foreach ( $data as $key => $setting ) {
				$value[ $key ] = $setting;
				if ( 'custom_font' === $key ) {
					foreach ( $data['custom_font']['value'] as $v ) {
						$local_file = $upload_path . '/' . $v['font_family'] . '.css';
						if ( file_exists( $local_file ) ) {
							wp_delete_file( $local_file );
						}
					}
					foreach ( $data['custom_font']['value'] as $v ) {

						if ( ! $v['font_style'] ) {
							$v['font_style'] = 'normal';
						}
						if ( ! $v['font_weight'] ) {
							$v['font_weight'] = 'normal';
						}
						$text = '';
						if ( $v['font_src_woff'] ) {
							$text .= $this->add_css_custom_font( $v, $v['font_src_woff'] );
						}
						if ( $v['font_src_woff2'] ) {
							$text .= $this->add_css_custom_font( $v, $v['font_src_woff2'] );
						}
						if ( $v['font_src_ttf'] ) {
							$text .= $this->add_css_custom_font( $v, $v['font_src_ttf'] );
						}
						if ( $v['font_src_otf'] ) {
							$text .= $this->add_css_custom_font( $v, $v['font_src_otf'] );
						}
						if ( $v['font_src_svg'] ) {
							$text .= $this->add_css_custom_font( $v, $v['font_src_svg'] );
						}
						$local_file = $upload_path . '/' . $v['font_family'] . '.css';
						if ( $wp_filesystem->exists( $local_file ) ) {
							$content  = $wp_filesystem->get_contents( $local_file );
							$content .= $text;
						} else {
							$content = $text;
						}
						$wp_filesystem->put_contents( $local_file, $content, FS_CHMOD_FILE );
					}
				}
				if ( 'frontend_settings' === $key ) {
					gutenverse_delete_sceduler( 'gutenverse_cleanup_cached_style' );
				}
			}
			if ( ! isset( $option ) ) {
				add_option( 'gutenverse-settings', $value );
			} else {
				update_option( 'gutenverse-settings', $value );
			}
		}

		return true;
	}
	/**
	 * Add css font face to string
	 *
	 * @param array  $custom_data .
	 * @param string $url .
	 *
	 * @return string
	 */
	public function add_css_custom_font( $custom_data, $url ) {
		return "
			@font-face {
				font-family: '{$custom_data['font_family']}' ;
				font-style: {$custom_data['font_style']};
				font-weight: {$custom_data['font_weight']};
				src: url('{$url}');
				font-display: swap;
				}
		";
	}

	/**
	 * Check if font icon need to be downloaded
	 */
	public function download_font_icon() {
		return Init::instance()->assets->download_font_icon();
	}

	/**
	 * Modify Global Variable.
	 *
	 * @param object $request .
	 */
	public function modify_global_variable( $request ) {
		$variable = array(
			'googlefont' => $request->get_param( 'googlefont' ),
			'fonts'      => $request->get_param( 'fonts' ),
			'colors'     => $request->get_param( 'colors' ),
		);
		Init::instance()->global_variable->set_global_variable( $variable );
		do_action( 'gutenverse_modify_global_variable', $variable );
		return true;
	}

	/**
	 * Get Global Additional Settings.
	 *
	 * @param object $request .
	 */
	public function get_global_additional_settings( $request ) {
		$post_id = (int) $request->get_param( 'id' );
		$types   = is_array( $request->get_param( 'types' ) ) ? $request->get_param( 'types' ) : array();
		$data    = array();

		foreach ( $types as $type ) {
			switch ( $type ) {
				case 'custom_css':
					if ( ! empty( $post_id ) ) {
						$data['custom_css'] = get_post_meta( $post_id, 'gutenverse_page_custom_css', true );
					}
					break;
				case 'custom_js':
					if ( ! empty( $post_id ) ) {
						$data['custom_js'] = get_post_meta( $post_id, 'gutenverse_page_custom_js', true );
					}
					break;
				default:
					break;
			}
		}

		return $data;
	}

	/**
	 * Update Global Additional Settings.
	 *
	 * @param object $request .
	 */
	public function update_global_additional_settings( $request ) {
		$post_id         = (int) $request->get_param( 'id' );
		$setting_type    = sanitize_text_field( $request->get_param( 'type' ) );
		$setting_content = $request->get_param( 'content' );

		switch ( $setting_type ) {
			case 'custom_css':
				if ( ! empty( $post_id ) ) {
					update_post_meta( $post_id, 'gutenverse_page_custom_css', $setting_content );
				}
				break;
			case 'custom_js':
				if ( ! empty( $post_id ) ) {
					update_post_meta( $post_id, 'gutenverse_page_custom_js', $setting_content );
				}
				break;
			default:
				break;
		}

		return true;
	}

	/**
	 * Flag true if already subscribed.
	 *
	 * @param object $request .
	 */
	public function subscribed( $request ) {
		$this->save_meta( $request, 'subscribed', 'subscribed' );
		$this->save_meta( $request, 'email', 'subscribed-email' );

		return true;
	}

	/**
	 * Save / Update Meta
	 *
	 * @param object $request Request Object.
	 * @param object $param_name Request Parameter Name.
	 * @param object $option_name Option .
	 */
	public function save_meta( $request, $param_name, $option_name ) {
		$data = $request->get_param( $param_name );
		return Meta_Option::instance()->set_option( $option_name, $data );
	}

	/**
	 * Save / Update Option
	 *
	 * @param object $request Request Object.
	 * @param object $param_name Request Parameter Name.
	 * @param object $option_name Option .
	 */
	public function save_option( $request, $param_name, $option_name ) {
		$data    = $request->get_param( $param_name );
		$options = get_option( $option_name );

		if ( ! isset( $options ) ) {
			$result = add_option( $option_name, $data );
		} else {
			$result = update_option( $option_name, $data );
		}

		return $result;
	}

	/**
	 * Get Taxonomies
	 *
	 * @param object $request object.
	 */
	public function get_taxonomies( $request ) {
		$include  = $request->get_param( 'include' );
		$search   = $request->get_param( 'search' );
		$taxonomy = $request->get_param( 'taxonomy' );

		$taxonomies = get_terms(
			array(
				'name__like' => $search,
				'include'    => $include,
				'taxonomy'   => $taxonomy,
				'hide_empty' => false,
			)
		);

		$result = array();

		foreach ( $taxonomies as $key => $term ) {
			$taxonomy = get_taxonomy( $term->taxonomy );
			$result[] = array(
				'id'   => $term->term_id,
				'name' => $term->name . ' - ' . $taxonomy->label,
			);
		}

		return $result;
	}

	/**
	 * Get Singles
	 *
	 * @param object $request object.
	 */
	public function get_singles( $request ) {
		$include   = $request->get_param( 'include' );
		$search    = $request->get_param( 'search' );
		$post_type = $request->get_param( 'post_type' );
		$post_type = ! empty( $post_type ) && 'all_types' !== $post_type ? $post_type : array( 'page', 'post' );

		$args  = array(
			's'         => $search,
			'include'   => $include,
			'post_type' => $post_type,
		);
		$posts = get_posts( $args );

		$result = array();

		foreach ( $posts as $key => $post ) {
			$result[] = array(
				'id'   => $post->ID,
				'name' => $post->post_title,
			);
		}

		return $result;
	}

	/**
	 * Liked Layout
	 *
	 * @param object $request object.
	 */
	public function template_notification( $request ) {
		$user_id   = $request->get_param( 'id' );
		$templates = $request->get_param( 'templates' );

		return update_user_meta( $user_id, 'gutense_templates_viewed', $templates );
	}

	/**
	 * Like Layout
	 *
	 * @param object $request object.
	 */
	public function site_like_section( $request ) {
		return $this->save_meta( $request, 'likes', 'liked_section' );
	}

	/**
	 * Import Images
	 *
	 * @param object $request images.
	 */
	public function import_images( $request ) {
		$image = $request->get_param( 'imageUrl' );

		$data = $this->check_image_exist( $image );
		if ( ! $data ) {
			$data = $this->handle_file( $image );
		}

		return $data;
	}

	/**
	 * Return image
	 *
	 * @param string $url Image attachment url.
	 *
	 * @return array|null
	 */
	public function check_image_exist( $url ) {
		$attachments = new WP_Query(
			array(
				'post_type'   => 'attachment',
				'post_status' => 'inherit',
				'meta_query'  => array(
					array(
						'key'     => '_import_source',
						'value'   => $url,
						'compare' => 'LIKE',
					),
				),
			)
		);

		foreach ( $attachments->posts as $post ) {
			$attachment_url = wp_get_attachment_url( $post->ID );
			return array(
				'id'  => $post->ID,
				'url' => $attachment_url,
			);
		}

		return $attachments->posts;
	}

	/**
	 * Handle Import file, and return File ID when process complete
	 *
	 * @param string $url URL of file.
	 *
	 * @return int|null
	 */
	public function handle_file( $url ) {
		$file_name = basename( $url );
		$upload    = wp_upload_bits( $file_name, null, '' );
		$this->fetch_file( $url, $upload['file'] );

		if ( $upload['file'] ) {
			$file_loc  = $upload['file'];
			$file_name = basename( $upload['file'] );
			$file_type = wp_check_filetype( $file_name );

			$attachment = array(
				'post_mime_type' => $file_type['type'],
				'post_title'     => preg_replace( '/\.[^.]+$/', '', basename( $file_name ) ),
				'post_content'   => '',
				'post_status'    => 'inherit',
			);

			include_once ABSPATH . 'wp-admin/includes/image.php';
			$attach_id = wp_insert_attachment( $attachment, $file_loc );
			update_post_meta( $attach_id, '_import_source', $url );

			try {
				$attach_data = wp_generate_attachment_metadata( $attach_id, $file_loc );
				wp_update_attachment_metadata( $attach_id, $attach_data );
			} catch ( \Exception $e ) {
				$this->handle_exception( $e );
			} catch ( \Throwable $t ) {
				$this->handle_exception( $e );
			}

			return array(
				'id'  => $attach_id,
				'url' => $upload['url'],
			);
		} else {
			return null;
		}
	}

	/**
	 * Handle Exception.
	 *
	 * @param \Exception $e Exception.
	 */
	public function handle_exception( $e ) {
		// Empty Exception.
	}

	/**
	 * Download file and save to file system
	 *
	 * @param string $url File URL.
	 * @param string $file_path file path.
	 * @param string $endpoint Endpoint.
	 *
	 * @return array|bool
	 */
	public function fetch_file( $url, $file_path, $endpoint = '' ) {
		$http     = new \WP_Http();
		$response = $http->get(
			add_query_arg(
				array(
					'framework_version' => GUTENVERSE_FRAMEWORK_VERSION,
					'sslverify'         => false,
				),
				$url
			)
		);

		if ( is_wp_error( $response ) ) {
			return false;
		}

		$headers             = wp_remote_retrieve_headers( $response );
		$headers['response'] = wp_remote_retrieve_response_code( $response );

		if ( false === $file_path ) {
			return $headers;
		}

		$body = wp_remote_retrieve_body( $response );
		if ( 'plugin/ecosystem' === $endpoint ) {
			$data = json_decode( $body );
			$body = $this->inject_plugin_detail( $data );
			$body = wp_json_encode( $body );
		}

		// GET request - write it to the supplied filename.
		require_once ABSPATH . 'wp-admin/includes/file.php';
		WP_Filesystem();
		global $wp_filesystem;
		$wp_filesystem->put_contents( $file_path, $body, FS_CHMOD_FILE );

		return $headers;
	}

	/**
	 * Like Layout
	 *
	 * @param object $request object.
	 */
	public function site_like_layout( $request ) {
		return $this->save_meta( $request, 'likes', 'liked_layout' );
	}

	/**
	 * Get User IP Address
	 *
	 * @param array $data .
	 *
	 * @return array|false
	 */
	public function get_browser_data( $data ) {
		if ( empty( $data['user_browser'] ) ) {
			return false;
		}

		$ip = 'unknown';

		if ( ! empty( $_SERVER['HTTP_CLIENT_IP'] ) ) {
			$ip = sanitize_text_field( wp_unslash( $_SERVER['HTTP_CLIENT_IP'] ) );
		} elseif ( ! empty( $_SERVER['HTTP_X_FORWARDED_FOR'] ) ) {
			$ip = sanitize_text_field( wp_unslash( $_SERVER['HTTP_X_FORWARDED_FOR'] ) );
		} elseif ( ! empty( $_SERVER['REMOTE_ADDR'] ) ) {
			$ip = sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) );
		}

		$user_agent = isset( $_SERVER['HTTP_USER_AGENT'] ) ? sanitize_text_field( wp_unslash( $_SERVER['HTTP_USER_AGENT'] ) ) : 'unknown';

		return array(
			'ip'         => $ip,
			'user_agent' => $user_agent,
		);
	}

	/**
	 * Fetch Menu API
	 */
	public function menu() {
		$menus = wp_get_nav_menus();
		$data  = array();

		foreach ( $menus as $menu ) {
			$data[] = array(
				'label' => $menu->name,
				'value' => $menu->term_id,
			);
		}

		return $data;
	}

	/**
	 * Render WP Menu
	 *
	 * @param object $request object.
	 *
	 * @return void|string|false
	 */
	public function menu_render( $request ) {
		$menu_id = $request->get_param( 'menu' );

		return gutenverse_get_menu( $menu_id );
	}

	/**
	 * Activate Theme
	 *
	 * @param object $request .
	 *
	 * @return WP_Rest.
	 */
	public function activate_theme( $request ) {
		$stylesheet = strtolower( $request->get_param( 'stylesheet' ) );

		$check_theme = wp_get_theme( $stylesheet );

		if ( $check_theme->exists() ) {
			switch_theme( $stylesheet );

			return array(
				'status' => 200,
			);
		}

		return null;
	}
}
