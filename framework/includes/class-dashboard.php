<?php
/**
 * Dashboard class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-framework
 */

namespace Gutenverse\Framework;

/**
 * Class Dashboard
 *
 * @package gutenverse
 */
class Dashboard {
	/**
	 * Type
	 *
	 * @var string
	 */
	const TYPE = 'gutenverse';

	const PLUGIN_VERSION_LIST_CACHE = 'gutenverse_plugin_version_list_cache';

	/**
	 * Id
	 *
	 * @var id
	 */
	public $id;

	/**
	 * Event banner data.
	 *
	 * @var mixed
	 */
	private $event_banner = false;

	/**
	 * Init constructor.
	 */
	public function __construct() {
		$this->id = 'tabbed-template';

		add_action( 'admin_menu', array( $this, 'parent_menu' ) );
		add_action( 'admin_menu', array( $this, 'child_menu' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_action( 'enqueue_script_in_wizard', array( $this, 'enqueue_scripts' ) );
		add_action( 'admin_notices', array( $this, 'load_global_event_banner' ) );
		add_action( 'wp_ajax_gutenverse_dismiss_global_event_banner', array( $this, 'dismiss_global_event_banner' ) );

		add_filter( 'admin_footer_text', '__return_empty_string', 11 );
		add_filter( 'update_footer', '__return_empty_string', 11 );

		/**
		 * These functions used to be called inside init hook.
		 * But because framework called using init hook.
		 * Now these functions will be called directly.
		 */
		$this->redirect_dashboard();
	}

	/**
	 * Redirect old dashboard url
	 */
	public function redirect_dashboard() {
		global $pagenow;

		if ( 'admin.php' === $pagenow && isset( $_GET['page'] ) ) {
			$page = sanitize_text_field( wp_unslash( $_GET['page'] ) );

			if ( 'gutenverse' === $page && isset( $_GET['path'] ) && 'theme-list' === sanitize_text_field( wp_unslash( $_GET['path'] ) ) ) {
				if ( ! apply_filters( 'gutenverse_show_theme_list_dashboard', false ) ) {
					wp_safe_redirect( admin_url( 'admin.php?page=gutenverse' ) );
					exit;
				}
			}

			$old_page = wp_sanitize_redirect( $page );

			switch ( $old_page ) {
				case 'gutenverse-settings':
					wp_safe_redirect( admin_url( 'admin.php?page=gutenverse&path=settings' ) );
					exit;
				case 'gutenverse-upgrade-notice':
					$version = isset( $_GET['version'] ) ? '&version=' . wp_sanitize_redirect( wp_unslash( $_GET['version'] ) ) : null;
					wp_safe_redirect( admin_url( 'admin.php?page=gutenverse&path=update-notice' . $version ) );
					exit;
				default:
					break;
			}
		}
	}

	/**
	 * Enqueue scripts
	 *
	 * @param string $hook .
	 */
	public function enqueue_scripts( $hook ) {
		global $current_screen;

		wp_enqueue_style(
			'gutenverse-core-dashboard-icons',
			GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/dist/dashboard-icon.css',
			array(),
			GUTENVERSE_FRAMEWORK_VERSION
		);

		wp_enqueue_style(
			'gutenverse-core-dashboard-notice',
			GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/dist/dashboard-notice.css',
			array(),
			GUTENVERSE_FRAMEWORK_VERSION
		);

		// @since 3.2.0
		wp_enqueue_style(
			'gutenverse-core-notifications',
			GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/css/notifications.css',
			null,
			GUTENVERSE_FRAMEWORK_VERSION
		);

		if ( isset( $current_screen ) && $current_screen->is_block_editor ) {
			return;
		}

		$include = ( include GUTENVERSE_FRAMEWORK_DIR . '/lib/dependencies/core.asset.php' )['dependencies'];

		wp_enqueue_script( 'gutenverse-core-event' );

		wp_localize_script( 'gutenverse-core-event', 'GutenverseDashboard', $this->gutenverse_dashboard_config() );

		wp_localize_script( 'gutenverse-core-event', 'GutenverseThemeList', $this->gutenverse_theme_list_config() );

		wp_localize_script( 'gutenverse-core-event', 'GutenverseSettings', $this->gutenverse_setting_config() );

		$plugin_version_list_config = $this->gutenverse_plugin_version_list_config();

		wp_localize_script( 'gutenverse-core-event', 'GutenversePluginVersionList', $plugin_version_list_config );

		wp_set_script_translations( 'gutenverse-core-event', 'gutenverse', GUTENVERSE_FRAMEWORK_LANG_DIR );

		if ( 'toplevel_page_gutenverse' === $hook ) {
			$include   = ( include GUTENVERSE_FRAMEWORK_DIR . '/lib/dependencies/dashboard.asset.php' )['dependencies'];
			$include[] = 'gutenverse-frontend-event';

			wp_enqueue_script(
				'gutenverse-core-dashboard-event',
				GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/js/dashboard.js',
				$include,
				GUTENVERSE_FRAMEWORK_VERSION,
				true
			);
			wp_enqueue_media();
			wp_enqueue_script( 'gutenverse-blocks-event' );

			wp_enqueue_style(
				'gutenverse-core-dashboard-bg',
				GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/dist/dashboard-bg.css',
				array(),
				GUTENVERSE_FRAMEWORK_VERSION
			);

			wp_enqueue_style(
				'gutenverse-core-dashboard-event',
				GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/css/backend.css',
				array( 'fontawesome-gutenverse' ),
				GUTENVERSE_FRAMEWORK_VERSION
			);
		}

		/** Polyfil for version 6.6 */
		if ( ! wp_script_is( 'react-jsx-runtime', 'registered' ) ) {
			wp_register_script(
				'react-jsx-runtime',
				GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/js/react-jsx-runtime.js',
				array( 'react' ),
				GUTENVERSE_FRAMEWORK_VERSION,
				true
			);
		}

		$notifications = ( include GUTENVERSE_FRAMEWORK_DIR . '/lib/dependencies/notifications.asset.php' )['dependencies'];

		// @since 3.2.0
		wp_enqueue_script(
			'gutenverse-core-notifications',
			GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/js/notifications.js',
			$notifications,
			GUTENVERSE_FRAMEWORK_VERSION,
			true
		);

		do_action( 'gutenverse_include_dashboard' );
	}

	/**
	 * Gutenverse Dashboard Config
	 *
	 * @return array
	 */
	public function gutenverse_dashboard_config() {
		global $pagenow;

		$config = array();

		$config['imgDir']                   = GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/img';
		$config['libraryApi']               = GUTENVERSE_FRAMEWORK_LIBRARY_URL . '/wp-json/gutenverse-server/v1';
		$config['url']                      = home_url();
		$config['fseUrl']                   = gutenverse_compatible_check() ? admin_url( 'site-editor.php' ) : admin_url( 'edit.php?post_type=page' );
		$config['subscribed']               = Meta_Option::instance()->get_option( 'subscribed' );
		$config['assetURL']                 = GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/';
		$config['rating']                   = 'https://wordpress.org/support/plugin/gutenverse/reviews/#new-post';
		$config['support']                  = 'https://wordpress.org/support/plugin/gutenverse/';
		$config['docs']                     = GUTENVERSE_FRAMEWORK_DOCUMENTATION_URL;
		$config['community']                = 'https://www.facebook.com/groups/gutenversecommunity/';
		$config['showThemeList']            = apply_filters( 'gutenverse_show_theme_list_dashboard', false );
		$config['themelist']                = admin_url( 'admin.php?page=gutenverse&path=theme-list' );
		$config['homeSlug']                 = 'gutenverse';
		$config['plugins']                  = Editor_Assets::list_plugin( true );
		$config['pluginVersions']           = array();
		$config['fontIconExists']           = Init::instance()->assets->is_font_icon_exists();
		$config['themesUrl']                = GUTENVERSE_FRAMEWORK_THEMES_URL;
		$config['proDemoUrl']               = untrailingslashit( GUTENVERSE_FRAMEWORK_LIBRARY_URL );
		$config['adminUrl']                 = admin_url();
		$config['upgradeProUrl']            = gutenverse_upgrade_pro();
		$config['proSiteUrl']               = GUTENVERSE_FRAMEWORK_PRO_URL;
		$config['requireProUpdate']         = \Gutenverse_Initialize_Framework::instance()->need_update_pro();
		$config['eventBanner']              = $this->get_event_banner();
		$config['adsBannerThemeTF']         = gutenverse_get_ads_banner_theme_tf();
		$config['pricingPlan']              = gutenverse_get_pricing_plan();
		$config['isUsingGutenverseThemeTF'] = apply_filters( 'gutenverse_tp_plus_mechanism', false );
		$config['activeTheme']              = get_option( 'stylesheet' );
		$config['activePlugins']            = $this->get_active_plugins();
		$config['noticeActions']            = array(
			'gutenverse-core-notice-wp-59'             => array(
				'show' => ! gutenverse_compatible_check(),
			),
			'gutenverse-core-notice-mismatch-version'  => array(
				'show'      => get_option( ( new Upgrader() )->get_framework_init_option_name() ),
				'actionUrl' => esc_url( admin_url( 'plugins.php' ) ),
			),
			'gutenverse-core-compatibility-notice-2-0' => array(
				'show'        => defined( 'GUTENVERSE_VERSION' ) && version_compare( GUTENVERSE_VERSION, '1.9.9', '<=' ) && ! get_option( 'gutenverse_compatibility_notice_flag' ),
				'plugin_list' => apply_filters( 'gutenverse_companion_plugin_list', array() ),
				'action_url'  => admin_url( 'plugins.php' ),
			),
			'gutenverse-core-render-mechanism-notice-3-0-0' => array(
				'show'      => version_compare( GUTENVERSE_FRAMEWORK_VERSION, '3.0.0', '>=' ),
				'actionUrl' => esc_url_raw( admin_url( 'admin.php?page=gutenverse&path=settings&settings=frontend' ) ),
			),
		);

		if ( 'admin.php' === $pagenow && isset( $_GET['page'] ) && 'gutenverse' === $_GET['page'] ) {
			$config['system'] = $this->system_status();
		}
		if ( in_array( 'gutenverse-companion/gutenverse-companion.php', $config['activePlugins'], true ) || in_array( 'gutenverse-companion', $config['activePlugins'], true ) ) {
			$config['companionActive'] = true;
		} else {
			$config['companionActive'] = 'false';
		}
		$config['is_wporg_theme'] = gutenverse_is_wporg_theme();

		return apply_filters( 'gutenverse_dashboard_config', $config );
	}

	/**
	 * Get event banner data.
	 *
	 * @return mixed
	 */
	public function get_event_banner() {
		if ( false === $this->event_banner ) {
			$this->event_banner = gutenverse_get_event_banner();
		}

		return $this->event_banner;
	}

	/**
	 * Get global event banner ID.
	 *
	 * @param mixed $event_banner Event banner data.
	 *
	 * @return string
	 */
	private function get_global_event_banner_id( $event_banner ) {
		if ( ! empty( $event_banner->bannerId ) ) {
			return sanitize_key( $event_banner->bannerId );
		}

		$payload = wp_json_encode(
			array(
				'bannerGlobal' => $event_banner->bannerGlobal,
				'url'          => $event_banner->url,
				'expired'      => $event_banner->expired,
			)
		);

		return wp_hash( false !== $payload ? $payload : '' );
	}

	/**
	 * Load global event banner in WordPress admin pages.
	 */
	public function load_global_event_banner() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		global $pagenow;

		$page = isset( $_GET['page'] ) ? sanitize_key( wp_unslash( $_GET['page'] ) ) : '';

		if ( 'admin.php' === $pagenow && self::TYPE === $page ) {
			return;
		}

		$event_banner = $this->get_event_banner();

		if ( ! gutenverse_is_event_banner_valid( $event_banner, 'bannerGlobal' ) ) {
			return;
		}

		$expired = strtotime( $event_banner->expired );

		if ( ! $expired || current_time( 'timestamp' ) > $expired ) {
			return;
		}

		$banner_id = $this->get_global_event_banner_id( $event_banner );
		$user_id   = get_current_user_id();

		if ( empty( $banner_id ) ) {
			return;
		}

		if ( $user_id && hash_equals( (string) get_user_meta( $user_id, 'gutenverse_global_event_banner_dismissed', true ), $banner_id ) ) {
			return;
		}

		?>
		<div id="gutenverse-global-event-banner-<?php echo esc_attr( $banner_id ); ?>" class="notice gutenverse-global-event-banner">
			<a href="<?php echo esc_url( $event_banner->url ); ?>" target="_blank" rel="noopener noreferrer">
				<img src="<?php echo esc_url( $event_banner->bannerGlobal ); ?>" alt="<?php esc_attr_e( 'Gutenverse event banner', '--gctd--' ); ?>" />
			</a>
			<button type="button" class="notice-dismiss gutenverse-global-event-banner-dismiss" data-banner-id="<?php echo esc_attr( $banner_id ); ?>" data-nonce="<?php echo esc_attr( wp_create_nonce( 'gutenverse_global_event_banner' ) ); ?>">
				<span class="screen-reader-text"><?php esc_html_e( 'Dismiss this notice.', '--gctd--' ); ?></span>
			</button>
		</div>
		<script>
			( function() {
				var banner = document.getElementById( 'gutenverse-global-event-banner-<?php echo esc_js( $banner_id ); ?>' );

				if ( ! banner ) {
					return;
				}

				var dismissButton = banner.querySelector( '.gutenverse-global-event-banner-dismiss' );

				if ( ! dismissButton ) {
					return;
				}

				dismissButton.addEventListener( 'click', function() {
					var request = new FormData();

					banner.remove();
					request.append( 'action', 'gutenverse_dismiss_global_event_banner' );
					request.append( 'nonce', dismissButton.dataset.nonce );
					request.append( 'banner_id', dismissButton.dataset.bannerId );

					window.fetch( window.ajaxurl, {
						method: 'POST',
						credentials: 'same-origin',
						body: request
					} );
				} );
			}() );
		</script>
		<?php
	}

	/**
	 * Dismiss global event banner.
	 */
	public function dismiss_global_event_banner() {
		check_ajax_referer( 'gutenverse_global_event_banner', 'nonce' );

		$user_id = get_current_user_id();

		if ( ! $user_id || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( null, 403 );
		}

		$banner_id = isset( $_POST['banner_id'] ) ? sanitize_key( wp_unslash( $_POST['banner_id'] ) ) : '';

		if ( empty( $banner_id ) ) {
			wp_send_json_error( null, 400 );
		}

		$event_banner = $this->get_event_banner();

		if ( ! gutenverse_is_event_banner_valid( $event_banner, 'bannerGlobal' ) ) {
			wp_send_json_error( null, 404 );
		}

		$expected_banner_id = $this->get_global_event_banner_id( $event_banner );

		if ( empty( $expected_banner_id ) || ! hash_equals( $expected_banner_id, $banner_id ) ) {
			wp_send_json_error( null, 400 );
		}

		update_user_meta( $user_id, 'gutenverse_global_event_banner_dismissed', $banner_id );
		wp_send_json_success();
	}

	/**
	 * Get active plugin lists.
	 *
	 * @return array
	 */
	public function get_active_plugins() {
		if ( ! function_exists( 'get_plugins' ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
		}
		$active_plugins          = get_option( 'active_plugins', array() );
		$active_sitewide_plugins = get_site_option( 'active_sitewide_plugins', array() );
		$active_sitewide_plugins = array_keys( $active_sitewide_plugins );
		$active_plugins          = array_unique( array_merge( $active_plugins, $active_sitewide_plugins ) );
		$all_plugins             = get_plugins();
		$plugin_lists            = array();
		foreach ( $active_plugins as $plugin ) {
			if ( isset( $all_plugins[ $plugin ] ) && isset( $all_plugins[ $plugin ]['TextDomain'] ) ) {
				$plugin_lists[] = $all_plugins[ $plugin ]['TextDomain'];
			}
		}

		return $plugin_lists;
	}
	/**
	 * System Status.
	 *
	 * @return array
	 */
	public function system_status() {
		$status = array();

		/** Themes */
		$theme                    = wp_get_theme();
		$parent                   = wp_get_theme( get_template() );
		$status['theme_name']     = $theme->get( 'Name' );
		$status['theme_version']  = $theme->get( 'Version' );
		$status['is_child_theme'] = is_child_theme();
		$status['parent_theme']   = $parent->get( 'Name' );
		$status['parent_version'] = $parent->get( 'Version' );

		/** WordPress Environment */
		$wp_upload_dir              = wp_upload_dir();
		$status['home_url']         = home_url( '/' );
		$status['site_url']         = site_url();
		$status['login_url']        = wp_login_url();
		$status['wp_version']       = get_bloginfo( 'version', 'display' );
		$status['is_multisite']     = is_multisite();
		$status['wp_debug']         = defined( 'WP_DEBUG' ) && WP_DEBUG;
		$status['memory_limit']     = ini_get( 'memory_limit' );
		$status['wp_memory_limit']  = WP_MEMORY_LIMIT;
		$status['wp_language']      = get_locale();
		$status['writeable_upload'] = wp_is_writable( $wp_upload_dir['basedir'] );
		$status['count_category']   = wp_count_terms( 'category' );
		$status['count_tag']        = wp_count_terms( 'post_tag' );

		/** Server Environment */
		$remote = get_transient( 'gutenverse_wp_remote_get_status_cache' );
		if ( ! $remote ) {
			$remote = wp_remote_get( home_url() );
			set_transient( 'gutenverse_wp_remote_get_status_cache', $remote, 30 * MINUTE_IN_SECONDS );
		}

		$gd_support = array();
		if ( function_exists( 'gd_info' ) ) {
			foreach ( gd_info() as $key => $value ) {
				$gd_support[ $key ] = $value;
			}
		}

		$status['server_info']        = isset( $_SERVER['SERVER_SOFTWARE'] ) ? sanitize_text_field( wp_unslash( $_SERVER['SERVER_SOFTWARE'] ) ) : '';
		$status['php_version']        = PHP_VERSION;
		$status['post_max_size']      = ini_get( 'post_max_size' );
		$status['max_input_vars']     = ini_get( 'max_input_vars' );
		$status['max_execution_time'] = ini_get( 'max_execution_time' );
		$status['suhosin']            = extension_loaded( 'suhosin' );
		$status['imagick']            = extension_loaded( 'imagick' );
		$status['gd']                 = extension_loaded( 'gd' ) && function_exists( 'gd_info' );
		$status['gd_webp']            = extension_loaded( 'gd' ) && $gd_support['WebP Support'];
		$status['fileinfo']           = extension_loaded( 'fileinfo' ) && ( function_exists( 'finfo_open' ) || function_exists( 'mime_content_type' ) );
		$status['curl']               = extension_loaded( 'curl' ) && function_exists( 'curl_version' );
		$status['wp_remote_get']      = ! is_wp_error( $remote ) && $remote['response']['code'] >= 200 && $remote['response']['code'] < 300;

		/** Plugins */
		$status['plugins'] = $this->data_active_plugin();

		return $status;
	}

	/**
	 * Data active plugin
	 *
	 * @return array
	 */
	public function data_active_plugin() {
		$active_plugin = array();

		$plugins = array_merge(
			array_flip( (array) get_option( 'active_plugins', array() ) ),
			(array) get_site_option( 'active_sitewide_plugins', array() )
		);

		$plugins = array_intersect_key( get_plugins(), $plugins );

		if ( count( $plugins ) > 0 ) {
			foreach ( $plugins as $plugin ) {
				$item                = array();
				$item['uri']         = isset( $plugin['PluginURI'] ) ? esc_url( $plugin['PluginURI'] ) : '#';
				$item['name']        = isset( $plugin['Name'] ) ? $plugin['Name'] : esc_html__( 'unknown', '--gctd--' );
				$item['author_uri']  = isset( $plugin['AuthorURI'] ) ? esc_url( $plugin['AuthorURI'] ) : '#';
				$item['author_name'] = isset( $plugin['Author'] ) ? $plugin['Author'] : esc_html__( 'unknown', '--gctd--' );
				$item['version']     = isset( $plugin['Version'] ) ? $plugin['Version'] : esc_html__( 'unknown', '--gctd--' );

				$content = esc_html__( 'by', '--gctd--' );

				$active_plugin[] = array(
					'type'            => 'status',
					'title'           => $item['name'],
					'content'         => $content,
					'link'            => $item['author_uri'],
					'link_text'       => $item['author_name'],
					'additional_text' => $item['version'],
				);
			}
		}

		return $active_plugin;
	}

	/**
	 * Gutenverse Theme List Config
	 *
	 * @return array
	 */
	public function gutenverse_theme_list_config() {
		$config = array();

		$config['installNonce'] = wp_create_nonce( 'updates' );
		$config['themeUrl']     = admin_url( 'themes.php?page=' );

		return $config;
	}

	/**
	 * Gutenverse Plugin Version List Config
	 *
	 * @return array
	 */
	public function gutenverse_plugin_version_list_config() {
		$local_config  = $this->get_local_plugin_version_list_config();
		$remote_config = $this->get_remote_plugin_version_list_config();

		if ( is_array( $remote_config ) ) {
			return $remote_config;
		}

		return $local_config;
	}

	/**
	 * Get local plugin compatibility data bundled with the plugin.
	 *
	 * @return array
	 */
	private function get_local_plugin_version_list_config() {
		$config = array(
			'pluginCheck' => array(),
		);
		$file   = GUTENVERSE_FRAMEWORK_DIR . '/data/plugin-version-list.json';

		if ( ! file_exists( $file ) || ! is_readable( $file ) ) {
			return $config;
		}

		// phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
		$contents = file_get_contents( $file );
		$decoded  = json_decode( $contents, true );

		if ( JSON_ERROR_NONE !== json_last_error() ) {
			return $config;
		}

		$decoded = $this->normalize_plugin_version_list_config( $decoded );

		return is_array( $decoded ) ? $decoded : $config;
	}

	/**
	 * Get cached remote plugin compatibility data, refreshing at most once per day.
	 *
	 * @return array|null
	 */
	private function get_remote_plugin_version_list_config() {
		$cached = get_transient( self::PLUGIN_VERSION_LIST_CACHE );

		if ( is_array( $cached ) && array_key_exists( 'data', $cached ) ) {
			return is_array( $cached['data'] ) ? $cached['data'] : null;
		}

		$remote = $this->fetch_remote_plugin_version_list();

		set_transient(
			self::PLUGIN_VERSION_LIST_CACHE,
			array(
				'data' => $remote,
			),
			DAY_IN_SECONDS
		);

		return $remote;
	}

	/**
	 * Fetch plugin compatibility data from the Gutenverse server.
	 *
	 * @return array|null
	 */
	private function fetch_remote_plugin_version_list() {
		$url = trailingslashit( GUTENVERSE_FRAMEWORK_LIBRARY_URL ) . 'wp-json/gutenverse-tools/v1/plugin/version-list';

		if ( ! wp_http_validate_url( $url ) ) {
			return null;
		}

		$response = wp_safe_remote_get(
			$url,
			array(
				'timeout'             => 15,
				'redirection'         => 3,
				'limit_response_size' => 1048576,
				'headers'             => array(
					'Accept' => 'application/json',
				),
			)
		);

		if ( is_wp_error( $response ) || 200 !== (int) wp_remote_retrieve_response_code( $response ) ) {
			return null;
		}

		$body = trim( wp_remote_retrieve_body( $response ) );

		if ( '' === $body || 'null' === $body ) {
			return null;
		}

		$decoded = json_decode( $body, true );

		if ( JSON_ERROR_NONE !== json_last_error() ) {
			return null;
		}

		return $this->normalize_plugin_version_list_config( $decoded );
	}

	/**
	 * Normalize plugin compatibility data to the dashboard contract.
	 *
	 * @param array $config Plugin version list config.
	 *
	 * @return array|null
	 */
	private function normalize_plugin_version_list_config( $config ) {
		if ( ! is_array( $config ) ) {
			return null;
		}

		$plugin_check = isset( $config['pluginCheck'] ) && is_array( $config['pluginCheck'] ) ? $config['pluginCheck'] : $config;
		$normalized   = array();

		foreach ( $plugin_check as $slug => $versions ) {
			$slug = sanitize_key( $slug );

			if ( ! $slug || ! is_array( $versions ) ) {
				continue;
			}

			foreach ( $versions as $version ) {
				if ( ! is_array( $version ) ) {
					continue;
				}

				$plugin_version    = isset( $version['plugin_version'] ) && ! is_array( $version['plugin_version'] ) && ! is_object( $version['plugin_version'] ) ? sanitize_text_field( (string) $version['plugin_version'] ) : '';
				$framework_version = isset( $version['framework_version'] ) && ! is_array( $version['framework_version'] ) && ! is_object( $version['framework_version'] ) ? sanitize_text_field( (string) $version['framework_version'] ) : '';

				if ( '' === $plugin_version || '' === $framework_version ) {
					continue;
				}

				$normalized[ $slug ][] = array(
					'plugin_version'    => $plugin_version,
					'framework_version' => $framework_version,
				);
			}

			if ( isset( $normalized[ $slug ] ) ) {
				usort(
					$normalized[ $slug ],
					function ( $a, $b ) {
						return version_compare( $a['framework_version'], $b['framework_version'] );
					}
				);
			}
		}

		if ( empty( $normalized ) ) {
			return null;
		}

		return array(
			'pluginCheck' => $normalized,
		);
	}

	/**
	 * Gutenverse Settings Config
	 *
	 * @return array
	 */
	public function gutenverse_setting_config() {
		$upload_path = wp_upload_dir();

		$config = array();

		$settings_data = apply_filters( 'gutenverse_settings_data', get_option( 'gutenverse-settings', array() ) );

		if ( ! isset( $settings_data['frontend_settings'] ) || ! is_array( $settings_data['frontend_settings'] ) ) {
			$settings_data['frontend_settings'] = array();
		}

		unset(
			$settings_data['frontend_settings']['render_mechanism'],
			$settings_data['frontend_settings']['file_delete_mechanism'],
			$settings_data['frontend_settings']['old_render_deletion_schedule'],
			$settings_data['frontend_settings']['cache_id'],
			$settings_data['frontend_settings']['unused_size'],
			$settings_data['frontend_settings']['payload_cache_size'],
			$settings_data['frontend_settings']['payload_cache_files']
		);

		$payload_cache_stats                                       = Init::instance()->frontend_cache->get_payload_cache_stats();
		$settings_data['frontend_settings']['legacy_cache_size']   = gutenverse_legacy_cache_file_size();
		$settings_data['frontend_settings']['payload_cache_size']  = $payload_cache_stats['size_label'];
		$settings_data['frontend_settings']['payload_cache_files'] = $payload_cache_stats['files'];
		$config['settingsData']                                    = $settings_data;
		$config['blockCategories']                                 = Init::instance()->blocks->gutenverse_categories();
		$config['uploadPath']                                      = $upload_path['basedir'];

		return $config;
	}

	/**
	 * Parent Menu
	 */
	public function parent_menu() {
		add_menu_page(
			esc_html__( 'Gutenverse', '--gctd--' ),
			esc_html__( 'Gutenverse', '--gctd--' ),
			'manage_options',
			self::TYPE,
			null,
			GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/icon/icon-logo-dashboard.svg',
			30
		);
	}

	/**
	 * Child Menu
	 */
	public function child_menu() {
		$path         = admin_url( 'admin.php?page=gutenverse&path=' );
		$active_theme = get_option( 'stylesheet' );
		$companion    = $this->get_active_plugins();
		$companion    = in_array( 'gutenverse-companion/gutenverse-companion.php', $companion, true ) || in_array( 'gutenverse-companion', $companion, true );

		add_submenu_page(
			self::TYPE,
			esc_html__( 'Dashboard', '--gctd--' ),
			esc_html__( 'Dashboard', '--gctd--' ),
			'manage_options',
			self::TYPE,
			array( $this, 'load_gutenverse_dashboard' ),
			0
		);

		add_submenu_page(
			self::TYPE,
			esc_html__( 'Ecosystem', '--gctd--' ),
			esc_html__( 'Ecosystem', '--gctd--' ),
			'manage_options',
			$path . 'ecosystem',
			null,
			1
		);

		add_submenu_page(
			self::TYPE,
			esc_html__( 'Blocks', '--gctd--' ),
			esc_html__( 'Blocks', '--gctd--' ),
			'manage_options',
			$path . 'block-list',
			null,
			2
		);

		if ( apply_filters( 'gutenverse_show_theme_list_dashboard', false ) ) {
			add_submenu_page(
				self::TYPE,
				esc_html__( 'Theme List', '--gctd--' ),
				esc_html__( 'Theme List', '--gctd--' ),
				'manage_options',
				$path . 'theme-list',
				null,
				3
			);
		}

		add_submenu_page(
			self::TYPE,
			esc_html__( 'Settings', '--gctd--' ),
			esc_html__( 'Settings', '--gctd--' ),
			'manage_options',
			$path . 'settings',
			null,
			4
		);

		add_submenu_page(
			self::TYPE,
			esc_html__( 'System Status', '--gctd--' ),
			esc_html__( 'System Status', '--gctd--' ),
			'manage_options',
			$path . 'system',
			null,
			5
		);

		add_submenu_page(
			self::TYPE,
			esc_html__( 'Update Notice', '--gctd--' ),
			esc_html__( 'Update Notice', '--gctd--' ),
			'manage_options',
			$path . 'update-notice&version=',
			null,
			100
		);

		if ( ! defined( 'GUTENVERSE_PRO' ) ) {
			add_submenu_page(
				self::TYPE,
				esc_html__( 'Upgrade to PRO', '--gctd--' ),
				'<span>' . esc_html__( 'Upgrade to PRO', '--gctd--' ) . '<img src="' . esc_url( GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/icon/icon-crown.svg' ) . '"/> </span>',
				'manage_options',
				$path . 'upgrade-pro',
				null,
				9999
			);
		}
	}

	/**
	 * Load Gutenverse Pro Activation Page
	 */
	public function load_gutenverse_dashboard() {
		?>
		<div id="gutenverse-dashboard"></div>
		<?php
	}
}
