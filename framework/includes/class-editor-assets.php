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
			GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/css/editor.css',
			array( 'wp-edit-blocks', 'fontawesome-gutenverse', 'gutenverse-iconlist' ),
			GUTENVERSE_FRAMEWORK_VERSION
		);

		wp_enqueue_style( 'gutenverse-frontend-style' );

		wp_enqueue_script( 'gutenverse-core-event' );

		wp_enqueue_script( 'gutenverse-frontend-event' );

		wp_localize_script(
			apply_filters( 'gutenverse_editor_script_handle', 'gutenverse-core-event' ),
			'GutenverseConfig',
			$this->gutenverse_config()
		);

		wp_enqueue_script( 'gutenverse-components-event' );

		wp_enqueue_script( 'gutenverse-blocks-event' );

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
		$upload_path    = wp_upload_dir();

		$config                      = array();
		$config['globals']           = array();
		$config['fonts']             = ( new Fonts() )->get_font_settings();
		$config['customFonts']       = ( new Fonts() )->get_custom_font_settings();
		$config['imagePlaceholder']  = GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/img/img-placeholder.jpg';
		$config['imgDir']            = GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/img';
		$config['videoDir']          = GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/video';
		$config['libraryApi']        = GUTENVERSE_FRAMEWORK_LIBRARY_URL . 'wp-json/gutenverse-server/v1';
		$config['openedTemplate']    = $template ? $template : array();
		$config['globalSetting']     = ! empty( $global_setting ) ? $global_setting : array();
		$config['userId']            = get_current_user_id();
		$config['isTools']           = (bool) defined( 'GUTENVERSE_TOOLS' );
		$config['settingsData']      = get_option( 'gutenverse-settings', array() );
		$config['globalVariable']    = Init::instance()->global_variable->get_global_variable();
		$config['adminUrl']          = admin_url();
		$config['themeListUrl']      = admin_url( 'admin.php?page=gutenverse&path=theme-list' );
		$config['plugins']           = self::list_plugin();
		$config['gtniconURL']        = Init::instance()->assets->get_gtnicon_url();
		$config['fontawesomeURL']    = Init::instance()->assets->get_fontawesome_url();
		$config['themesUrl']         = GUTENVERSE_FRAMEWORK_THEMES_URL;
		$config['upgradeProUrl']     = gutenverse_upgrade_pro();
		$config['documentationUrl']  = GUTENVERSE_FRAMEWORK_DOCUMENTATION_URL;
		$config['proDemoUrl']        = GUTENVERSE_FRAMEWORK_SERVER_URL;
		$config['uploadPath']        = $upload_path['baseurl'];
		$config['updateLicensePage'] = admin_url( 'admin.php?page=gutenverse&path=license' );
		$config['autoBlockRecovery'] = gutenverse_autoblock_recovery();
		$config['missingBlocksWarn'] = gutenverse_missing_blocks();
		$config['eventBanner']       = gutenverse_get_event_banner();

		if ( defined( 'GUTENVERSE' ) ) {
			$config['oldImagePlaceholder'] = plugins_url( GUTENVERSE ) . '/assets/img/img-placeholder.jpg';
		}

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
			'gutenverse-roboto-font',
			GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/fonts/roboto/roboto.css',
			array(),
			GUTENVERSE_FRAMEWORK_VERSION
		);

		wp_enqueue_style(
			'gutenverse-poppins-font',
			GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/fonts/poppins/poppins.css',
			array(),
			GUTENVERSE_FRAMEWORK_VERSION
		);

		wp_enqueue_style(
			'gutenverse-heebo-font',
			GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/fonts/heebo/heebo.css',
			array(),
			GUTENVERSE_FRAMEWORK_VERSION
		);

		wp_enqueue_style(
			'gutenverse-jakarta-sans-font',
			GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/fonts/plus-jakarta-sans/plus-jakarta-sans.css',
			array(),
			GUTENVERSE_FRAMEWORK_VERSION
		);

		wp_enqueue_style(
			'gutenverse-toolbar',
			GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/dist/toolbar.css',
			array(),
			GUTENVERSE_FRAMEWORK_VERSION
		);
	}
}
