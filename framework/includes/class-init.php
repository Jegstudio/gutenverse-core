<?php
/**
 * Gutenverse Framework Main class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-framework
 */

namespace Gutenverse\Framework;

/**
 * Class Init
 *
 * @package gutenverse-framework
 */
class Init {
	/**
	 * Instance of Init.
	 *
	 * @var Init
	 */
	private static $instance;

	/**
	 * Hold instance of api
	 *
	 * @var Api
	 */
	public $api;

	/**
	 * Hold instance of blocks
	 *
	 * @var Blocks
	 */
	public $blocks;

	/**
	 * Hold instance of dashboard
	 *
	 * @var Dashboard
	 */
	public $dashboard;

	/**
	 * Hold instance of editor assets
	 *
	 * @var Editor_Assets
	 */
	public $editor_assets;

	/**
	 * Hold instance of fontend assets
	 *
	 * @var Frontend_Assets
	 */
	public $frontend_assets;

	/**
	 * Hold instance of fontend toolbar
	 *
	 * @var Frontend_Toolbar
	 */
	public $frontend_toolbar;

	/**
	 * Hold instance of meta options
	 *
	 * @var Meta_Option
	 */
	public $meta_option;

	/**
	 * Hold instance of frontend generator
	 *
	 * @since 2.3.0: renamed from style_generator to frontend_generator
	 *
	 * @var Frontend_Generator
	 */
	public $frontend_generator;

	/**
	 * Frontend Cache
	 *
	 * @since 2.3.0: renamed from style_cache to frontend_cache
	 *
	 * @var Frontend_Cache
	 */
	public $frontend_cache;

	/**
	 * Old frontend generator kept for backward compatibility
	 */
	public $style_generator;

	/**
	 * Old frontend cache kept for backward compatibility
	 */
	public $style_cache;

	/**
	 * Hold instance of global variable
	 *
	 * @var Global_Variable
	 */
	public $global_variable;

	/**
	 * Hold instance of theme helper
	 *
	 * @var Theme_Helper
	 */
	public $theme_helper;

	/**
	 * Hold instance of assets
	 *
	 * @var Assets
	 */
	public $assets;

	/**
	 * Hold instance of upgrader
	 *
	 * @var Upgrader
	 */
	public $upgrader;

	/**
	 * Singleton page for Init Class
	 *
	 * @return Init
	 */
	public static function instance() {
		if ( null === static::$instance ) {
			static::$instance = new static();
		}

		return static::$instance;
	}

	/**
	 * Init constructor.
	 */
	private function __construct() {
		$this->init_hook();
		$this->init_instance();
		$this->init_class();
	}

	/**
	 * Initialize Hook
	 */
	public function init_hook() {
		// actions.
		add_action( 'admin_enqueue_scripts', array( $this, 'notice_install_plugin_script' ) );
		add_action( 'rest_api_init', array( $this, 'init_api' ) );
		add_action( 'activated_plugin', array( $this, 'flush_rewrite_rules' ) );
		add_action( 'admin_init', array( $this, 'redirect_to_dashboard' ) );
		add_action( 'customize_register', '__return_true' );
		add_action( 'template_redirect', array( $this, 'remove_doing_wp_cron_param' ) );
		add_action( 'wp_footer', array( $this, 'run_wp_cron_from_footer' ) );

		// filters.
		add_filter( 'after_setup_theme', array( $this, 'init_settings' ) );
		add_filter( 'upload_mimes', array( $this, 'add_fonts_to_allowed_mimes' ) );
		add_filter( 'wp_check_filetype_and_ext', array( $this, 'update_mime_types' ), 10, 3 );
		add_filter( 'wp_handle_upload_prefilter', array( $this, 'verify_svg_upload' ), 10, 1 );
		add_filter( 'wp_lazy_loading_enabled', array( $this, 'disable_wp_lazyload' ), 10, 1 );

		/**
		 * These functions used to be called inside init hook.
		 * But because framework called using init hook.
		 * Now these functions will be called directly.
		 */
		$this->register_menu_position();
		$this->import_mechanism();
	}

	/**
	 * Disable default lazyload.
	 *
	 * @param bool $default .
	 */
	public function disable_wp_lazyload( $default ) {
		$settings = get_option( 'gutenverse-settings' );

		if ( ! isset( $settings['frontend_settings']['disable_wp_lazyload'] ) || $settings['frontend_settings']['disable_wp_lazyload'] ) {
			return false;
		}

		return $default;
	}

	/**
	 * Verify Svg Upload
	 *
	 * @param mixed $file .
	 */
	public function verify_svg_upload( $file ) {

		if ( 'image/svg+xml' !== $file['type'] ) {
			return $file;
		}

		$svg = file_get_contents( $file['tmp_name'] );

		if ( false === $svg ) {
			$file['error'] = __( 'Unable to read SVG file.', 'gutenverse' );
			return $file;
		}

		if ( ! gutenverse_is_svg_safe( $svg ) ) {
			$file['error'] = __( 'SVG file contains disallowed or unsafe elements.', 'gutenverse' );
		}

		return $file;
	}

	/**
	 * Hide doing_wp_cron query argument in url
	 */
	public function remove_doing_wp_cron_param() {
		if ( isset( $_GET['doing_wp_cron'] ) ) {
			$url = remove_query_arg( 'doing_wp_cron' );
			wp_safe_redirect( $url );
			exit;
		}
	}

	/**
	 * Run Cron from footer instead of query argument
	 */
	public function run_wp_cron_from_footer() {
		if ( defined( 'DOING_CRON' ) && DOING_CRON ) {
			return;
		}
		define( 'DOING_CRON', true );

		wp_cron();
	}

	/**
	 * Initialize Instances
	 */
	public function init_instance() {
		$this->meta_option = Meta_Option::instance();
	}

	/**
	 * Initialize Classes
	 */
	public function init_class() {
		$this->assets           = new Assets();
		$this->dashboard        = new Dashboard();
		$this->theme_helper     = new Theme_Helper();
		$this->blocks           = new Blocks();
		$this->frontend_assets  = new Frontend_Assets();
		$this->editor_assets    = new Editor_Assets();
		$this->frontend_toolbar = new Frontend_Toolbar();
		$this->global_variable  = new Global_Variable();
		$this->upgrader         = new Upgrader();
		$this->meta_option      = Meta_Option::instance();

		/**
		 * Load the renamed variables and add fallback for old variables, in case there is function still using them
		 *
		 * @since 3.3.0
		 */
		$this->frontend_cache     = new Frontend_Cache();
		$this->frontend_generator = new Frontend_Generator();
		$this->style_cache        = $this->frontend_cache;
		$this->style_generator    = $this->frontend_generator;

		// Deprecated Function.
		new Deprecated();
	}

	/**
	 * Init Rest API
	 */
	public function init_api() {
		$this->api = Api::instance();
	}

	/**
	 * Load import mechanism
	 */
	public function import_mechanism() {
		new Import_Template();
	}

	/**
	 * Register Menu Position.
	 */
	public function register_menu_position() {
		register_nav_menus(
			array(
				'primary' => esc_html__( 'Primary Navigation', '--gctd--' ),
			)
		);
	}

	/**
	 * Rewrite rules only once on activation
	 */
	public function flush_rewrite_rules() {
		if ( ! get_option( 'gutenverse_plugin_permalinks_flushed' ) ) {
			flush_rewrite_rules();
			update_option( 'gutenverse_plugin_permalinks_flushed', 1 );
		}
	}

	/**
	 * Redirect page after plugin is actived
	 */
	public function redirect_to_dashboard() {
		if ( get_transient( 'gutenverse_redirect' ) ) {
			global $pagenow;
			if ( 'plugins.php' === $pagenow || 'plugin-install.php' === $pagenow ) {
				wp_safe_redirect( admin_url( 'admin.php?page=gutenverse' ) );
				delete_transient( 'gutenverse_redirect' );
				exit;
			} else {
				delete_transient( 'gutenverse_redirect' );
			}
		}
	}

	/**
	 * Init settings
	 */
	public function init_settings() {
		$settings_data = get_option( 'gutenverse-settings' );

		if ( isset( $settings_data['general'] ) ) {
			if ( isset( $settings_data['general']['enable_default_template'] ) && true === $settings_data['general']['enable_default_template'] ) {
				add_theme_support( 'block-templates' );
			}
		}
	}
	/**
	 * Add mime type
	 *
	 * @param array $mimes .
	 *
	 * @return array $mimes
	 */
	public function add_fonts_to_allowed_mimes( $mimes ) {
		$mimes['woff']  = 'application/x-font-woff';
		$mimes['woff2'] = 'application/x-font-woff2';
		$mimes['ttf']   = 'application/x-font-ttf';
		$mimes['svg']   = 'image/svg+xml';
		$mimes['eot']   = 'application/vnd.ms-fontobject';
		$mimes['otf']   = 'application/otf';

		return $mimes;
	}
	/**
	 * Update mime type for otf and ttf
	 *
	 * @param array  $defaults .
	 * @param array  $file .
	 * @param string $filename .
	 */
	public function update_mime_types( $defaults, $file, $filename ) {
		if ( 'ttf' === pathinfo( $filename, PATHINFO_EXTENSION ) ) {
			$defaults['type'] = 'application/x-font-ttf';
			$defaults['ext']  = 'ttf';
		}

		if ( 'otf' === pathinfo( $filename, PATHINFO_EXTENSION ) ) {
			$defaults['type'] = 'application/x-font-otf';
			$defaults['ext']  = 'otf';
		}

		if ( 'woff' === pathinfo( $filename, PATHINFO_EXTENSION ) ) {
			$defaults['type'] = 'application/x-font-woff';
			$defaults['ext']  = 'woff';
		}

		if ( 'woff2' === pathinfo( $filename, PATHINFO_EXTENSION ) ) {
			$defaults['type'] = 'application/x-font-woff2';
			$defaults['ext']  = 'woff2';
		}

		return $defaults;
	}

	/**
	 * Show notification to install Gutenverse Plugin script.
	 */
	public function notice_install_plugin_script() {
		// skip if compatible.
		if ( gutenverse_compatible_check() ) {
			return;
		}

		$screen = get_current_screen();
		if ( isset( $screen->parent_file ) && 'plugins.php' === $screen->parent_file && 'update' === $screen->id ) {
			return;
		}

		if ( 'true' === get_user_meta( get_current_user_id(), 'gutenverse_install_notice', true ) ) {
			return;
		}

		wp_enqueue_style(
			'gutenverse-core-install-plugin-notice',
			GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/admin/css/install-plugin-notice.css',
			array(),
			GUTENVERSE_FRAMEWORK_VERSION
		);

		wp_enqueue_script(
			'gutenverse-core-install-plugin-notice',
			GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/admin/js/install-plugin-notice.js',
			array(),
			GUTENVERSE_FRAMEWORK_VERSION,
			true
		);
	}
}
