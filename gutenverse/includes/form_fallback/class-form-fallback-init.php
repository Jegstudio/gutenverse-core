<?php
/**
 * Gutenverse Form Main class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse
 */

namespace Gutenverse\Form_Fallback;

/**
 * Class Init
 *
 * @package gutenverse-form
 */
class Form_Fallback_Init {
	/**
	 * Instance of Init.
	 *
	 * @var Init
	 */
	private static $instance;

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
	 * Hold API Variable Instance.
	 *
	 * @var Api
	 */
	public $api;

	/**
	 * Hold Meta Option Variable Instance.
	 *
	 * @var Meta_Option
	 */
	public $meta_option;

	/**
	 * Hold Blocks Instance.
	 *
	 * @var Blocks
	 */
	public $blocks;

	/**
	 * Hold Form Validation Instance.
	 *
	 * @var Form_Validation
	 */
	public $form_validation;

	/**
	 * Init constructor.
	 */
	public function __construct() {
		$this->style_generator = new Style_Generator();
		$this->form_validation = new Form_Validation();
		$this->entries         = new Entries();
		$this->form            = new Form();
		$this->load_textdomain();
	}
	/**
	 * Load text domain
	 */
	public function load_textdomain() {
		add_action( 'rest_api_init', array( $this, 'init_api' ) );
		load_plugin_textdomain( 'gutenverse-form', false, GUTENVERSE_LANG_DIR );
	}

	/**
	 * Init Rest API
	 */
	public function init_api() {
		$this->api = Api::instance();
	}
}
