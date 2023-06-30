<?php
/**
 * Gutenverse Main class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse
 */

namespace Gutenverse;

/**
 * Class Gutenverse
 *
 * @package gutenverse
 */
class Gutenverse {
	/**
	 * Instance of Gutenverse.
	 *
	 * @var Gutenverse
	 */
	private static $instance;

	/**
	 * Hold instance of Blocks
	 *
	 * @var Blocks
	 */
	public $blocks;

	/**
	 * Hold instance of form
	 *
	 * @var Form
	 */
	public $form;

	/**
	 * Hold instance of entries
	 *
	 * @var Entries
	 */
	public $entries;

	/**
	 * Hold instance of dashboard
	 *
	 * @var Dashboard
	 */
	public $dashboard;

	/**
	 * Hold frontend assets instance
	 *
	 * @var Frontend_Assets
	 */
	public $frontend_assets;

	/**
	 * Hold editor assets instance
	 *
	 * @var Editor_Assets
	 */
	public $editor_assets;

	/**
	 * Hold theme list instance
	 *
	 * @var Theme_List
	 */
	public $theme_list;

	/**
	 * Hold Library Instance.
	 *
	 * @var Library
	 */
	public $library;

	/**
	 * Hold Theme Helper Instance.
	 *
	 * @var Theme_Helper
	 */
	public $theme_helper;

	/**
	 * Hold Style Generator Instance.
	 *
	 * @var Style_Generator
	 */
	public $style_generator;

	/**
	 * Hold Frontend Toolbar Instance.
	 *
	 * @var Frontend_Toolbar
	 */
	public $frontend_toolbar;

	/**
	 * Hold Banner Instance.
	 *
	 * @var Banner
	 */
	public $banner;

	/**
	 * Hold Upgrader Instance.
	 *
	 * @var Upgrader
	 */
	public $upgrader;

	/**
	 * Hold Global Variable Instance.
	 *
	 * @var Global_Variable
	 */
	public $global_variable;

	/**
	 * Hold API Variable Instance.
	 *
	 * @var Api
	 */
	public $api;

	/**
	 * Hold Meta Option Instance.
	 *
	 * @var Meta_Option
	 */
	public $meta_option;

	/**
	 * Upgrade Wizard.
	 *
	 * @var Upgrade_Wizard
	 */
	public $upgrade_wizard;

	/**
	 * Singleton page for Gutenverse Class
	 *
	 * @return Gutenverse
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
		$this->register_framework();
		add_action( 'plugins_loaded', array( $this, 'plugin_loaded' ) );
		add_filter( 'plugin_row_meta', array( $this, 'plugin_meta_links' ), 10, 2 );
		add_action( 'activated_plugin', array( $this, 'redirect_to_dashboard' ) );
	}

	/**
	 * Plugin Meta Link
	 *
	 * @param array  $links  Initial list of links.
	 * @param string $file   Basename of current plugin.
	 *
	 * @return array
	 */
	public function plugin_meta_links( $links, $file ) {
		if ( plugin_basename( GUTENVERSE_FILE ) === $file ) {
			$support_link = '<a target="_blank" href="https://wordpress.org/support/plugin/gutenverse/">' . esc_html__( 'Got Question?', 'gutenverse' ) . '</a>';
			$rate_link    = '<a target="_blank" href="https://wordpress.org/support/plugin/gutenverse/reviews/#new-post">' . esc_html__( 'Rate us ★★★★★', 'gutenverse' ) . '</a>';

			$links[] = $support_link;
			$links[] = $rate_link;
		}

		return $links;
	}

	/**
	 * Register Framework.
	 */
	public function register_framework() {
		require_once GUTENVERSE_DIR . 'lib/framework/init.php';
		$init = \Initialize_Gutenverse_Framework::instance();

		$framework_file    = GUTENVERSE_DIR . 'lib/framework/bootstrap.php';
		$framework_version = $init->get_framework_version( $framework_file );
		$init->register_version( GUTENVERSE, $framework_version );
	}

	/**
	 * Check if we can load framework.
	 *
	 * @return boolean
	 */
	public function can_load_framework() {
		require_once GUTENVERSE_DIR . 'lib/framework/init.php';
		$init = \Initialize_Gutenverse_Framework::instance();

		return $init->can_load_version( GUTENVERSE );
	}

	/**
	 * Plugin Loaded.
	 */
	public function plugin_loaded() {
		$this->init_framework();
		$this->load_textdomain();
		$this->init_instance();
		$this->init_post_type();
	}

	/**
	 * Redirect page after plugin is actived
	 */
	public function redirect_to_dashboard() {
		if ( wp_safe_redirect( admin_url( 'admin.php?page=gutenverse' ) ) ) {
			exit;
		}
	}

	/**
	 * Initialize Framework.
	 */
	public function init_framework() {
		if ( $this->can_load_framework() ) {
			require_once GUTENVERSE_DIR . 'lib/framework/bootstrap.php';
		}
	}

	/**
	 * Load text domain
	 */
	public function load_textdomain() {
		add_action( 'rest_api_init', array( $this, 'init_api' ) );
		load_plugin_textdomain( 'gutenverse', false, GUTENVERSE_LANG_DIR );
	}

	/**
	 * Initialize Form
	 */
	public function init_post_type() {
		$this->dashboard = new Dashboard();
	}

	/**
	 * Initialize Instance
	 */
	public function init_instance() {
		$this->blocks          = new Blocks();
		$this->frontend_assets = new Frontend_Assets();
		$this->editor_assets   = new Editor_Assets();
		$this->style_generator = new Style_Generator();
		$this->banner          = new Banner();
		$this->upgrader        = new Upgrader();
		$this->meta_option     = new Meta_Option();
		$this->upgrade_wizard  = new Upgrade_Wizard();
	}

	/**
	 * Init Rest API
	 */
	public function init_api() {
		$this->api = Api::instance();
	}

	/**
	 * WP API URL
	 */
	public function wp_api_url() {
		return esc_url_raw( rest_url( 'wp/v2' ) );
	}
}
