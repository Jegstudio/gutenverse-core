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
	 * Hold instance of style generator
	 *
	 * @var Style_Generator
	 */
	public $style_generator;

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
		add_action( 'admin_notices', array( $this, 'notice_install_plugin' ) );
		add_action( 'rest_api_init', array( $this, 'init_api' ) );
		add_action( 'activated_plugin', array( $this, 'flush_rewrite_rules' ) );
		add_action( 'activated_plugin', array( $this, 'redirect_to_dashboard' ), 99 );
		add_action( 'customize_register', '__return_true' );

		// filters.
		add_filter( 'after_setup_theme', array( $this, 'init_settings' ) );
		add_filter( 'upload_mimes', array( $this, 'add_fonts_to_allowed_mimes' ) );
		add_filter( 'wp_check_filetype_and_ext', array( $this, 'update_mime_types' ), 10, 3 );
		// add_filter( 'wp_lazy_loading_enabled', '__return_false' );
		/**
		 * These functions used to be called inside init hook.
		 * But because framework called using init hook.
		 * Now these functions will be called directly.
		 */
		$this->register_menu_position();
		$this->import_mechanism();
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
		$this->style_generator  = new Style_Generator();
		$this->frontend_toolbar = new Frontend_Toolbar();
		$this->global_variable  = new Global_Variable();
		$this->upgrader         = new Upgrader();
		$this->meta_option      = Meta_Option::instance();
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
	 *
	 * @param string $plugin .
	 */
	public function redirect_to_dashboard( $plugin ) {
		if ( false !== strpos( $plugin, 'gutenverse' ) && wp_safe_redirect( admin_url( 'admin.php?page=gutenverse' ) ) ) {
			exit;
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
	 * Show notification to install Gutenverse Plugin.
	 */
	public function notice_install_plugin() {
		// skip if compatible.
		if ( is_gutenverse_compatible() ) {
			return;
		}

		$screen = get_current_screen();
		if ( isset( $screen->parent_file ) && 'plugins.php' === $screen->parent_file && 'update' === $screen->id ) {
			return;
		}

		if ( 'true' === get_user_meta( get_current_user_id(), 'gutenverse_install_notice', true ) ) {
			return;
		}
		?>
		<style>
			.install-gutenverse-plugin-notice {
				border: 1px solid #E6E6EF;
				border-radius: 5px;
				padding: 35px 40px;
				position: relative;
				overflow: hidden;
				background-position: right top;
				background-repeat: no-repeat;
			}

			.install-gutenverse-plugin-notice .notice-dismiss {
				top: 20px;
				right: 20px;
				padding: 0;
			}

			.install-gutenverse-plugin-notice .notice-dismiss:before {
				content: "\f335";
				font-size: 17px;
				width: 25px;
				height: 25px;
				line-height: 25px;
				border: 1px solid #E6E6EF;
				border-radius: 3px;
				color: #fff;
			}

			.install-gutenverse-plugin-notice h3 {
				margin-top: 5px;
				font-weight: 700;
				font-size: 18px;
			}

			.install-gutenverse-plugin-notice p {
				font-size: 14px;
				font-weight: 300;
			}

			.install-gutenverse-plugin-notice .gutenverse-bottom {
				display: flex;
				align-items: center;
				margin-top: 20px;
			}

			.install-gutenverse-plugin-notice a {
				text-decoration: none;
				margin-right: 20px;
			}

			.install-gutenverse-plugin-notice a.gutenverse-button {
				font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
				text-decoration: none;
				cursor: pointer;
				font-size: 12px;
				line-height: 18px;
				border-radius: 17px;
				background: #3B57F7;
				color: #fff;
				padding: 8px 30px;
				font-weight: 300;
			}
		</style>
		<script>
		jQuery( function( $ ) {
			$( 'div.notice.install-gutenverse-plugin-notice' ).on( 'click', 'button.notice-dismiss', function( event ) {
				event.preventDefault();

				$.post( ajaxurl, {
					action: 'gutenverse_set_admin_notice_viewed'
				} );
			} );
		} );
		</script>
		<div class="notice is-dismissible install-gutenverse-plugin-notice">
			<div class="gutenverse-notice-inner">
				<div class="gutenverse-notice-content">
					<h3><?php esc_html_e( 'WordPress 5.9 required for Gutenverse.', '--gctd--' ); ?></h3>
					<p><?php esc_html_e( 'You are currently using lower version of WordPress, we recommend to update to WordPress 5.9 or higher. Or if you want to keep using lower version of WordPress, please install the latest version of Gutenberg', '--gctd--' ); ?></p>					
				</div>
			</div>
		</div>
		<?php
	}
}
