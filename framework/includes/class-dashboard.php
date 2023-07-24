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

	/**
	 * Id
	 *
	 * @var id
	 */
	public $id;

	/**
	 * Init constructor.
	 */
	public function __construct() {
		$this->id = 'tabbed-template';

		add_action( 'admin_menu', array( $this, 'parent_menu' ) );
		add_action( 'admin_menu', array( $this, 'child_menu' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );

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

		if ( 'admin.php' === $pagenow && isset( $_GET['page'] ) ) { //phpcs:ignore
			$old_page = wp_sanitize_redirect( wp_unslash( $_GET['page'] ) ); //phpcs:ignore

			switch ( $old_page ) {
				case 'gutenverse-settings':
					wp_safe_redirect( admin_url( 'admin.php?page=gutenverse&path=settings' ) );
					exit;
				case 'gutenverse-upgrade-notice':
					$version = isset( $_GET['version'] ) ? '&version=' . wp_sanitize_redirect( wp_unslash( $_GET['version'] ) ) : null; //phpcs:ignore
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

		if ( $current_screen->is_block_editor ) {
			return;
		}

		wp_enqueue_style(
			'gutenverse-core-dashboard-icons',
			GUTENVERSE_FRAMEWORK_URL . '/assets/dist/dashboard-icon.css',
			array(),
			GUTENVERSE_FRAMEWORK_VERSION
		);

		wp_enqueue_style(
			'gutenverse-core-dashboard-notice',
			GUTENVERSE_FRAMEWORK_URL . '/assets/dist/dashboard-notice.css',
			array(),
			GUTENVERSE_FRAMEWORK_VERSION
		);

		$include = ( include GUTENVERSE_FRAMEWORK_DIR . '/lib/dependencies/core.asset.php' )['dependencies'];

		wp_enqueue_script( 'gutenverse-core-event' );

		wp_localize_script( 'gutenverse-core-event', 'GutenverseDashboard', $this->gutenverse_dashboard_config() );

		wp_localize_script( 'gutenverse-core-event', 'GutenverseThemeList', $this->gutenverse_theme_list_config() );

		wp_localize_script( 'gutenverse-core-event', 'GutenverseSettings', $this->gutenverse_setting_config() );

		wp_set_script_translations( 'gutenverse-core-event', 'gutenverse', GUTENVERSE_FRAMEWORK_LANG_DIR );

		wp_register_style(
			'fontawesome-gutenverse',
			'https://cdn.rawgit.com/jegbagus/fluffy-funicular/main/fonts/fontawesome/css/all.css',
			null,
			GUTENVERSE_FRAMEWORK_VERSION
		);

		if ( 'toplevel_page_gutenverse' === $hook ) {
			$include   = ( include GUTENVERSE_FRAMEWORK_DIR . '/lib/dependencies/dashboard.asset.php' )['dependencies'];
			$include[] = 'gutenverse-frontend-event';

			wp_enqueue_script(
				'gutenverse-core-dashboard-event',
				GUTENVERSE_FRAMEWORK_URL . '/assets/js/dashboard.js',
				$include,
				GUTENVERSE_FRAMEWORK_VERSION,
				true
			);

			wp_enqueue_script( 'gutenverse-blocks-event' );

			wp_enqueue_style(
				'gutenverse-core-dashboard-bg',
				GUTENVERSE_FRAMEWORK_URL . '/assets/dist/dashboard-bg.css',
				array(),
				GUTENVERSE_FRAMEWORK_VERSION
			);

			wp_enqueue_style(
				'gutenverse-core-dashboard-event',
				GUTENVERSE_FRAMEWORK_URL . '/assets/css/backend.css',
				array( 'fontawesome-gutenverse' ),
				GUTENVERSE_FRAMEWORK_VERSION
			);
		}

		do_action( 'gutenverse_include_dashboard' );
	}

	/**
	 * Gutenverse Dashboard Config
	 *
	 * @return array
	 */
	public function gutenverse_dashboard_config() {
		$config = array();

		$config['imgDir']         = GUTENVERSE_FRAMEWORK_URL . '/assets/img';
		$config['freeImg']        = GUTENVERSE_FRAMEWORK_URL . '/assets/img/asset_21.webp';
		$config['getPro']         = GUTENVERSE_FRAMEWORK_SERVER_URL;
		$config['apiUrl']         = 'https://gutenverse.com/wp-json/gutenverse-server/v1';
		$config['url']            = home_url();
		$config['fseUrl']         = is_gutenverse_compatible() ? admin_url( 'site-editor.php' ) : admin_url( 'edit.php?post_type=page' );
		$config['subscribed']     = Meta_Option::instance()->get_option( 'subscribed' );
		$config['assetURL']       = GUTENVERSE_FRAMEWORK_URL . '/assets/';
		$config['rating']         = 'https://wordpress.org/support/plugin/gutenverse/reviews/#new-post';
		$config['support']        = 'https://wordpress.org/support/plugin/gutenverse/';
		$config['docs']           = 'https://gutenverse.com/docs/';
		$config['community']      = 'https://www.facebook.com/groups/gutenversecommunity/';
		$config['themelist']      = admin_url( 'admin.php?page=gutenverse&path=theme-list' );
		$config['homeSlug']       = 'gutenverse';
		$config['system']         = $this->system_status();
		$config['plugins']        = Editor_Assets::list_plugin();
		$config['pluginVersions'] = array();
		$config['fontIconExists'] = Init::instance()->assets->is_font_icon_exists();

		return apply_filters( 'gutenverse_dashboard_config', $config );
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
		$remote     = wp_remote_get( 'http://api.wordpress.org/plugins/update-check/1.1/' );
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
				$item['name']        = isset( $plugin['Name'] ) ? $plugin['Name'] : esc_html__( 'unknown', 'gutenverse' );
				$item['author_uri']  = isset( $plugin['AuthorURI'] ) ? esc_url( $plugin['AuthorURI'] ) : '#';
				$item['author_name'] = isset( $plugin['Author'] ) ? $plugin['Author'] : esc_html__( 'unknown', 'gutenverse' );
				$item['version']     = isset( $plugin['Version'] ) ? $plugin['Version'] : esc_html__( 'unknown', 'gutenverse' );

				$content = esc_html__( 'by', 'gutenverse' );

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

		$config['serverUrl']      = GUTENVERSE_FRAMEWORK_SERVER_URL;
		$config['serverEndpoint'] = 'wp-json/gutenverse-server/v1';
		$config['imgDir']         = GUTENVERSE_FRAMEWORK_URL . '/assets/img';
		$config['freeImg']        = GUTENVERSE_FRAMEWORK_URL . '/assets/img/asset_21.webp';
		$config['getPro']         = GUTENVERSE_FRAMEWORK_SERVER_URL;
		$config['apiUrl']         = 'https://gutenverse.com/wp-json/gutenverse-server/v1';
		$config['url']            = home_url();
		$config['fseUrl']         = is_gutenverse_compatible() ? admin_url( 'site-editor.php' ) : admin_url( 'edit.php?post_type=page' );
		$config['subscribed']     = get_option( 'gutenverse-subscribed', false );
		$config['rating']         = 'https://wordpress.org/support/plugin/gutenverse/reviews/#new-post';
		$config['support']        = 'https://wordpress.org/support/plugin/gutenverse/';
		$config['installNonce']   = wp_create_nonce( 'updates' );
		$config['themeUrl']       = admin_url( 'themes.php?page=' );

		return $config;
	}

	/**
	 * Gutenverse Settings Config
	 *
	 * @return array
	 */
	public function gutenverse_setting_config() {
		$config                    = array();
		$config['settingsData']    = get_option( 'gutenverse-settings', array() );
		$config['getPro']          = GUTENVERSE_FRAMEWORK_SERVER_URL;
		$config['freeImg']         = GUTENVERSE_FRAMEWORK_URL . '/assets/img/asset_21.webp';
		$config['blockCategories'] = Init::instance()->blocks->gutenverse_categories();

		return $config;
	}

	/**
	 * Parent Menu
	 */
	public function parent_menu() {
		add_menu_page(
			esc_html__( 'Gutenverse', 'gutenverse' ),
			esc_html__( 'Gutenverse', 'gutenverse' ),
			'manage_options',
			self::TYPE,
			null,
			GUTENVERSE_FRAMEWORK_URL . '/assets/icon/icon-logo-dashboard.svg',
			30
		);
	}

	/**
	 * Child Menu
	 */
	public function child_menu() {
		$path = admin_url( 'admin.php?page=gutenverse&path=' );

		add_submenu_page(
			self::TYPE,
			esc_html__( 'Dashboard', 'gutenverse' ),
			esc_html__( 'Dashboard', 'gutenverse' ),
			'manage_options',
			self::TYPE,
			array( $this, 'load_gutenverse_dashboard' ),
			0
		);

		add_submenu_page(
			self::TYPE,
			esc_html__( 'Ecosystem', 'gutenverse' ),
			esc_html__( 'Ecosystem', 'gutenverse' ),
			'manage_options',
			$path . 'ecosystem',
			null,
			1
		);

		add_submenu_page(
			self::TYPE,
			esc_html__( 'Theme List', 'gutenverse' ),
			esc_html__( 'Theme List', 'gutenverse' ),
			'manage_options',
			$path . 'theme-list',
			null,
			2
		);

		add_submenu_page(
			self::TYPE,
			esc_html__( 'Blocks', 'gutenverse' ),
			esc_html__( 'Blocks', 'gutenverse' ),
			'manage_options',
			$path . 'block-list',
			null,
			3
		);

		add_submenu_page(
			self::TYPE,
			esc_html__( 'Settings', 'gutenverse' ),
			esc_html__( 'Settings', 'gutenverse' ),
			'manage_options',
			$path . 'settings',
			null,
			4
		);

		add_submenu_page(
			self::TYPE,
			esc_html__( 'System Status', 'gutenverse' ),
			esc_html__( 'System Status', 'gutenverse' ),
			'manage_options',
			$path . 'system',
			null,
			5
		);

		add_submenu_page(
			self::TYPE,
			esc_html__( 'Update Notice', 'gutenverse' ),
			esc_html__( 'Update Notice', 'gutenverse' ),
			'manage_options',
			$path . 'update-notice&version=',
			null,
			100
		);

		if ( ! defined( 'GUTENVERSE_PRO' ) ) {
			add_submenu_page(
				self::TYPE,
				esc_html__( 'Upgrade to PRO', 'gutenverse' ),
				'<span><img src="' . esc_url( GUTENVERSE_FRAMEWORK_URL . '/assets/icon/icon-crown.svg' ) . '"/>' . esc_html__( 'Upgrade to PRO', 'gutenverse' ) . '</span>',
				'manage_options',
				'admin.php?page=gutenverse&path=upgrade-pro',
				null,
				9999
			);
		}

		// Add Submenu on Appearance.
		add_submenu_page(
			'themes.php',
			esc_html__( 'Gutenverse Themes', 'gutenverse' ),
			esc_html__( 'Gutenverse Themes', 'gutenverse' ),
			'manage_options',
			'admin.php?page=gutenverse&path=theme-list',
			null,
			1
		);
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
