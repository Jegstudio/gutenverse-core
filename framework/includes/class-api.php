<?php
/**
 * REST APIs class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse
 */

namespace Gutenverse\Framework;

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
			'ai/request',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'ai_request' ),
				'permission_callback' => 'gutenverse_permission_check_author',
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
		foreach ( $data as $key => $item ) {
			$data[ $key ]['like'] = ! empty( $liked ) ? in_array( $item['data']['slug'], $liked, true ) : false;
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
			$data[ $key ]['like'] = ! empty( $liked ) ? in_array( $item['data']['slug'], $liked, true ) : false;
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
					'version'  => 'v3',
					'endpoint' => 'layout/data',
					'filename' => 'layout/data',
				),
				array(
					'version'  => 'v4',
					'endpoint' => 'library/layout/categories',
					'filename' => 'layout/categories',
				),
				array(
					'version'  => 'v3',
					'endpoint' => 'theme/data',
					'filename' => 'theme/data',
				),
				array(
					'version'  => 'v4',
					'endpoint' => 'library/theme/categories',
					'filename' => 'theme/categories',
				),
				array(
					'version'  => 'v3',
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
		global $wp_filesystem;
		require_once ABSPATH . 'wp-admin/includes/file.php';
		WP_Filesystem();
		$data        = $request->get_param( 'setting' );
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

			if ( 'api_services' === $key && isset( $data['api_services'] ) && is_array( $data['api_services'] ) ) {
				$replacement = array();

				foreach ( $data['api_services'] as $api_id => $api_value ) {
					$keys_to_process = array(
						'gutenverse_ai_key',
					);

					if ( in_array( $api_id, $keys_to_process, true ) ) {
						$option_name = $api_id;

						// Save key in option, so it won't be showed on the setting page.
						if ( '[REDACTED_DATA]' !== $api_value ) {
							update_option( $option_name, $api_value );
						}

						$replacement[ $api_id ] = '[REDACTED_DATA]';
					} else {
						$replacement[ $api_id ] = $api_value;
					}
				}

				$value['api_services'] = $replacement;
			}
		}
		if ( ! isset( $option ) ) {
			add_option( 'gutenverse-settings', $value );
		} else {
			update_option( 'gutenverse-settings', $value );
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
		$response = wp_remote_get( $url, array( 'timeout' => 30 ) );

		if ( is_wp_error( $response ) ) {
			gutenverse_rlog( 'Error fetching file from URL ' . $url . ': ' . $response->get_error_message() );
			return null;
		}

		$file_content = wp_remote_retrieve_body( $response );
		$content_type = wp_remote_retrieve_header( $response, 'content-type' );

		if ( empty( $file_content ) || empty( $content_type ) ) {
			gutenverse_rlog( 'Failed to retrieve file content or content-type for URL: ' . $url );
			return null;
		}

		$extension = $this->get_extension_from_mime_type( $content_type );
		if ( ! $extension ) {
			gutenverse_rlog( 'Could not determine file extension for content type: ' . $content_type . ' from URL: ' . $url );
			return null;
		}

		$base_filename = sanitize_file_name( md5( $url ) );
		$file_name     = $base_filename . '.' . $extension;

		$upload = wp_upload_bits( $file_name, null, $file_content );

		if ( ! empty( $upload['error'] ) ) {
			gutenverse_rlog( 'Error uploading file with wp_upload_bits for URL ' . $url . ': ' . $upload['error'] );
			return null;
		}

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

			if ( ! function_exists( 'wp_generate_attachment_metadata' ) ) {
				require_once ABSPATH . 'wp-admin/includes/image.php';
			}

			$attach_id = wp_insert_attachment( $attachment, $file_loc );
			update_post_meta( $attach_id, '_import_source', $url );

			try {
				$attach_data = wp_generate_attachment_metadata( $attach_id, $file_loc );
				wp_update_attachment_metadata( $attach_id, $attach_data );
			} catch ( \Exception $e ) {
				$this->handle_exception( $e );
			} catch ( \Throwable $t ) {
				$this->handle_exception( $t );
			}

			return array(
				'id'  => $attach_id,
				'url' => $upload['url'],
			);
		} else {
			return null;
		}
	}

	private function get_extension_from_mime_type( $mime_type ) {
		$mime_map = array(
			'image/jpeg'               => 'jpg',
			'image/png'                => 'png',
			'image/gif'                => 'gif',
			'image/bmp'                => 'bmp',
			'image/webp'               => 'webp',
			'image/svg+xml'            => 'svg',
		);

		return isset( $mime_map[ $mime_type ] ) ? $mime_map[ $mime_type ] : false;
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

	/**
	 * AI Request
	 *
	 * @param object $request The WP_REST_Request object.
	 *
	 * @return WP_REST_Response|null.
	 */
	public function ai_request( $request ) {
		$prompt          = $request->get_param( 'prompt' );
		$key             = $request->get_param( 'key' );
		$chat_session_id = $request->get_param( 'chat_session_id' );
		$settings        = get_option( 'gutenverse-settings', array() );

		if ( ! current_user_can( 'manage_options' ) && ( ( ! isset( $settings['api_services']['gutenverse_ai_access'] ) || ! $settings['api_services']['gutenverse_ai_access'] ) ) ) {
			return new WP_Error(
				'rest_forbidden_access',
				__( 'You do not have permission to access the AI service.', 'your-text-domain' ),
				array( 'status' => rest_authorization_required_code() )
			);
		}

		if ( ! empty( $prompt ) ) {
			$gutenverse_ai_key = get_option( 'gutenverse_ai_key', false );

			$api_url = GUTENVERSE_FRAMEWORK_AI_URL . '/wp-json/gutenverse-pro/v1/ai/request';

			$payload_data = array(
				'prompt'          => strtolower( $prompt ),
				'ai_key'          => $gutenverse_ai_key,
				'chat_session_id' => ! empty( $chat_session_id ) ? $chat_session_id : 0,
			);

			if ( ! empty( $key ) ) {
				$payload_data['key'] = $key;
			}

			$payload = wp_json_encode( $payload_data );

			$args = array(
				'method'      => 'POST',
				'timeout'     => 900,
				'headers'     => array(
					'Content-Type' => 'application/json; charset=' . get_option( 'blog_charset' ),
					'Accept'       => 'application/json',
				),
				'body'        => $payload,
				'data_format' => 'body',
			);

			$response = wp_remote_post( $api_url, $args );

			if ( is_wp_error( $response ) ) {
				$error_message = $response->get_error_message();
				gutenverse_rlog( 'Request Error: ' . $error_message );
				return new WP_REST_Response(
					array(
						'status'  => 500,
						'message' => 'Failed to connect to service: ' . $error_message,
					),
					500
				);
			}

			$response_body    = wp_remote_retrieve_body( $response );
			$http_status_code = wp_remote_retrieve_response_code( $response );

			$decoded_response = json_decode( $response_body, true );

			if ( $http_status_code >= 200 && $http_status_code < 300 ) {
				return new WP_REST_Response(
					array(
						'status'  => $http_status_code,
						'data'    => $decoded_response,
						'message' => 'Request successful.',
					),
					$http_status_code
				);
			} else {
				gutenverse_rlog( 'Service Error: Status ' . $http_status_code . ' - Response: ' . $response_body );
				return new WP_REST_Response(
					array(
						'status'  => $http_status_code,
						'message' => 'Service returned an error.',
						'details' => $decoded_response,
					),
					$http_status_code
				);
			}
		}

		return new WP_REST_Response(
			array(
				'status'  => 400,
				'message' => 'Prompts parameter is required and cannot be empty.',
			),
			400
		);
	}
}
