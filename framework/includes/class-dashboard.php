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

		if ( 'admin.php' === $pagenow && isset( $_GET['page'] ) ) {
			$old_page = wp_sanitize_redirect( wp_unslash( $_GET['page'] ) );

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

		if ( $current_screen->is_block_editor ) {
			return;
		}

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

		$include = ( include GUTENVERSE_FRAMEWORK_DIR . '/lib/dependencies/core.asset.php' )['dependencies'];

		wp_enqueue_script( 'gutenverse-core-event' );

		wp_localize_script( 'gutenverse-core-event', 'GutenverseDashboard', $this->gutenverse_dashboard_config() );

		wp_localize_script( 'gutenverse-core-event', 'GutenverseThemeList', $this->gutenverse_theme_list_config() );

		wp_localize_script( 'gutenverse-core-event', 'GutenverseSettings', $this->gutenverse_setting_config() );

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

		do_action( 'gutenverse_include_dashboard' );
	}

	/**
	 * Gutenverse Dashboard Config
	 *
	 * @return array
	 */
	public function gutenverse_dashboard_config() {
		$config = array();

		$config['imgDir']           = GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/img';
		$config['libraryApi']       = GUTENVERSE_FRAMEWORK_LIBRARY_URL . '/wp-json/gutenverse-server/v1';
		$config['url']              = home_url();
		$config['fseUrl']           = gutenverse_compatible_check() ? admin_url( 'site-editor.php' ) : admin_url( 'edit.php?post_type=page' );
		$config['subscribed']       = Meta_Option::instance()->get_option( 'subscribed' );
		$config['assetURL']         = GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/';
		$config['rating']           = 'https://wordpress.org/support/plugin/gutenverse/reviews/#new-post';
		$config['support']          = 'https://wordpress.org/support/plugin/gutenverse/';
		$config['docs']             = GUTENVERSE_FRAMEWORK_DOCUMENTATION_URL;
		$config['community']        = 'https://www.facebook.com/groups/gutenversecommunity/';
		$config['themelist']        = admin_url( 'admin.php?page=gutenverse&path=theme-list' );
		$config['homeSlug']         = 'gutenverse';
		$config['system']           = $this->system_status();
		$config['plugins']          = Editor_Assets::list_plugin();
		$config['pluginVersions']   = array();
		$config['fontIconExists']   = Init::instance()->assets->is_font_icon_exists();
		$config['themesUrl']        = GUTENVERSE_FRAMEWORK_THEMES_URL;
		$config['adminUrl']         = admin_url();
		$config['upgradeProUrl']    = gutenverse_upgrade_pro();
		$config['requireProUpdate'] = \Gutenverse_Initialize_Framework::instance()->need_update_pro();
		$config['eventBanner']       = gutenverse_get_event_banner();

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
		$remote     = wp_remote_get( home_url() );
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
	 * Gutenverse Settings Config
	 *
	 * @return array
	 */
	public function gutenverse_setting_config() {
		$upload_path = wp_upload_dir();

		$config                    = array();
		$config['settingsData']    = get_option( 'gutenverse-settings', array() );
		$config['blockCategories'] = Init::instance()->blocks->gutenverse_categories();
		$config['uploadPath']      = $upload_path['basedir'];
		$config['renderSchedule']  = gmdate( 'Y-m-d H:i:s', wp_next_scheduled( 'gutenverse_cleanup_cached_style' ) );

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
		$path = admin_url( 'admin.php?page=gutenverse&path=' );
		$show_theme_list = apply_filters( 'gutenverse_show_theme_list', true );

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

		if ( $show_theme_list ) {
			add_submenu_page(
				self::TYPE,
				esc_html__( 'Theme List', '--gctd--' ),
				esc_html__( 'Theme List', '--gctd--' ),
				'manage_options',
				$path . 'theme-list',
				null,
				2
			);
		}

		add_submenu_page(
			self::TYPE,
			esc_html__( 'Blocks', '--gctd--' ),
			esc_html__( 'Blocks', '--gctd--' ),
			'manage_options',
			$path . 'block-list',
			null,
			3
		);

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
				'admin.php?page=gutenverse&path=upgrade-pro',
				null,
				9999
			);
		}

		// Add Submenu on Appearance.
		if ( $show_theme_list ) {
			add_submenu_page(
				'themes.php',
				esc_html__( 'Gutenverse Themes', '--gctd--' ),
				esc_html__( 'Gutenverse Themes', '--gctd--' ),
				'manage_options',
				'admin.php?page=gutenverse&path=theme-list',
				null,
				1
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
