<?php
/**
 * Editor Assets class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-framework
 */

namespace Gutenverse\Framework;

/**
 * Class Editor Assets
 *
 * @package gutenverse
 */
class Editor_Assets {
	/**
	 * Init constructor.
	 */
	public function __construct() {
		add_action( 'admin_footer', array( $this, 'register_root' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'register_script' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_backend' ) );
	}

	/**
	 * Register Javascript Script
	 */
	public function register_script() {
		// Register & Enqueue Style.
		wp_enqueue_style(
			'gutenverse-editor-style',
			GUTENVERSE_FRAMEWORK_URL . '/assets/css/editor.css',
			array( 'wp-edit-blocks', 'fontawesome-gutenverse', 'gutenverse-iconlist' ),
			GUTENVERSE_FRAMEWORK_VERSION
		);

		wp_enqueue_style(
			'gutenverse-frontend-style',
			GUTENVERSE_FRAMEWORK_URL . '/assets/css/frontend.css',
			array( 'gutenverse-iconlist', 'fontawesome-gutenverse', 'gutenverse-iconlist' ),
			GUTENVERSE_FRAMEWORK_VERSION
		);

		$include = ( include GUTENVERSE_FRAMEWORK_DIR . '/lib/dependencies/core.asset.php' )['dependencies'];

		wp_enqueue_script(
			'gutenverse-editor-event',
			GUTENVERSE_FRAMEWORK_URL . '/assets/js/core.js',
			$include,
			GUTENVERSE_FRAMEWORK_VERSION,
			true
		);

		wp_localize_script(
			apply_filters( 'gutenverse_editor_script_handle', 'gutenverse-editor-event' ),
			'GutenverseConfig',
			$this->gutenverse_config()
		);

		$include = ( include GUTENVERSE_FRAMEWORK_DIR . '/lib/dependencies/components.asset.php' )['dependencies'];

		wp_enqueue_script(
			'gutenverse-components-event',
			GUTENVERSE_FRAMEWORK_URL . '/assets/js/components.js',
			$include,
			GUTENVERSE_FRAMEWORK_VERSION,
			true
		);

		$include = ( include GUTENVERSE_FRAMEWORK_DIR . '/lib/dependencies/blocks.asset.php' )['dependencies'];

		wp_enqueue_script(
			'gutenverse-blocks-event',
			GUTENVERSE_FRAMEWORK_URL . '/assets/js/blocks.js',
			$include,
			GUTENVERSE_FRAMEWORK_VERSION,
			true
		);

		do_action( 'gutenverse_include_block' );
	}

	/**
	 * Gutenverse Config
	 *
	 * @return array
	 */
	public function gutenverse_config() {
		$template       = get_user_meta( get_current_user_id(), 'gutense_templates_viewed', true );
		$global_setting = get_option( 'gutenverse-global-setting' );

		$config                     = array();
		$config['globals']          = array();
		$config['fonts']            = ( new Fonts() )->get_font_settings();
		$config['imagePlaceholder'] = GUTENVERSE_FRAMEWORK_URL . '/assets/img/img-placeholder.jpg';
		$config['imgDir']           = GUTENVERSE_FRAMEWORK_URL . '/assets/img';
		$config['serverUrl']        = GUTENVERSE_FRAMEWORK_LIBRARY_URL;
		$config['serverEndpoint']   = 'wp-json/gutenverse-server/v1';
		$config['proUrl']           = GUTENVERSE_FRAMEWORK_STORE_URL;
		$config['openedTemplate']   = $template ? $template : array();
		$config['globalSetting']    = ! empty( $global_setting ) ? $global_setting : array();
		$config['userId']           = get_current_user_id();
		$config['freeImg']          = GUTENVERSE_FRAMEWORK_URL . '/assets/img/asset_21_small.webp';
		$config['isTools']          = ! ! defined( 'GUTENVERSE_TOOLS' );
		$config['settingsData']     = get_option( 'gutenverse-settings', array() );
		$config['globalVariable']   = Init::instance()->global_variable->get_global_variable();
		$config['adminUrl']         = admin_url();
		$config['themeListUrl']     = admin_url( 'admin.php?page=gutenverse&path=theme-list' );
		$config['plugins']          = self::list_plugin();
		$config['gtniconURL']       = Init::instance()->assets->get_gtnicon_url();
		$config['fontawesomeURL']   = Init::instance()->assets->get_fontawesome_url();

		return apply_filters( 'gutenverse_block_config', $config );
	}

	/**
	 * Get List Of Installed Plugin.
	 *
	 * @return array
	 */
	public static function list_plugin() {
		$plugins = array();
		$active  = array();

		foreach ( get_option( 'active_plugins' ) as  $plugin ) {
			$active[] = explode( '/', $plugin )[0];
		}

		foreach ( get_plugins() as $key => $plugin ) {
			$slug             = explode( '/', $key )[0];
			$data             = array();
			$data['active']   = in_array( $slug, $active, true );
			$data['version']  = $plugin['Version'];
			$data['name']     = $plugin['Name'];
			$data['path']     = str_replace( '.php', '', $key );
			$plugins[ $slug ] = $data;
		}

		return $plugins;
	}

	/**
	 * Add root div
	 */
	public function register_root() {
		?>
		<div id='gutenverse-root'></div><div id='gutenverse-error'></div>
		<?php
	}

	/**
	 * Enqueue Backend Font
	 */
	public function enqueue_backend() {
		wp_enqueue_style(
			'gutenverse-backend-font',
			'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&amp;family=Poppins:wght@400;500;600&amp;family=Roboto:wght@300;400;500;600;700;800&display=swap',
			array(),
			GUTENVERSE_FRAMEWORK_VERSION
		);

		wp_enqueue_style(
			'gutenverse-backend-font-2',
			'https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600&amp;display=swap',
			array(),
			GUTENVERSE_FRAMEWORK_VERSION
		);

		wp_enqueue_style(
			'gutenverse-toolbar',
			GUTENVERSE_FRAMEWORK_URL . '/assets/dist/toolbar.css',
			array(),
			GUTENVERSE_FRAMEWORK_VERSION
		);
	}
}
