<?php
/**
 * Assets class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-framework
 */

namespace Gutenverse\Framework;

/**
 * Class Assets
 *
 * @package gutenverse-framework
 */
class Assets {
	/**
	 * Font Icon Folder
	 *
	 * @var string
	 */
	public static $fonticon_folder = '/gutenverse/font-icon/fonts/';

	/**
	 * Init constructor.
	 */
	public function __construct() {
		$this->init_assets();
		$this->init_scripts();
	}

	/**
	 * Check if assets exists
	 */
	public function is_font_icon_exists() {
		$upload_dir = wp_upload_dir()['basedir'];
		$folder     = $upload_dir . self::$fonticon_folder;

		$gtnicon_exists     = file_exists( $folder . 'gtnicon/gtnicon.css' );
		$fontawesome_exists = file_exists( $folder . 'fontawesome/css/all.min.css' );

		return $fontawesome_exists && $gtnicon_exists;
	}

	/**
	 * Get gtnicon URL
	 */
	public function get_gtnicon_url() {
		$upload_dir = wp_upload_dir()['baseurl'];
		$folder     = $upload_dir . self::$fonticon_folder;

		if ( $this->is_font_icon_exists() ) {
			return $folder . 'gtnicon/gtnicon.css';
		}

		return GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/fonts/gtnicon/gtnicon.css';
	}

	/**
	 * Get fontawesome URL
	 */
	public function get_fontawesome_url() {
		$upload_dir = wp_upload_dir()['baseurl'];
		$folder     = $upload_dir . self::$fonticon_folder;

		if ( $this->is_font_icon_exists() ) {
			return $folder . 'fontawesome/css/all.min.css';
		}

		return GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/fonts/fontawesome/css/all.min.css';
	}

	/**
	 * Download font icon
	 *
	 * @param boolean $upgrade Determine whether it is an upgrade or not.
	 */
	public function download_font_icon( $upgrade = false ) {
		if ( ! $this->is_font_icon_exists() || $upgrade ) {
			global $wp_filesystem;
			require_once ABSPATH . 'wp-admin/includes/file.php';
			WP_Filesystem();

			$upload_dir = wp_upload_dir()['basedir'];
			$folder     = $upload_dir . '/gutenverse';
			$path       = realpath( $folder );
			$file       = $upload_dir . '/fonticon.zip';
			$version    = GUTENVERSE_FRAMEWORK_ASSETS_VERSION;

			if ( false === $path ) {
				wp_mkdir_p( $folder );
			}

			$res = wp_remote_get(
				"https://github.com/Jegstudio/font-icon/archive/refs/tags/v{$version}.zip",
				array(
					'stream'   => true,
					'filename' => $file,
				)
			);

			$zip = new \ZipArchive();
			$res = $zip->open( $file );

			if ( true === $res ) {
				$zip->extractTo( $folder );
				$zip->close();
			} else {
				return false;
			}

			gutenverse_remove_folder( $folder . '/font-icon' );
			$wp_filesystem->move( $folder . "/font-icon-{$version}", $folder . '/font-icon' );
			$wp_filesystem->delete( $file );
		}

		return true;
	}

	/**
	 * Init assets
	 */
	private function init_assets() {
		wp_register_style(
			'fontawesome-gutenverse',
			self::get_fontawesome_url(),
			null,
			GUTENVERSE_FRAMEWORK_VERSION
		);

		wp_register_style(
			'gutenverse-iconlist',
			self::get_gtnicon_url(),
			array(),
			GUTENVERSE_FRAMEWORK_VERSION
		);

		wp_register_style(
			'gutenverse-frontend-style',
			GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/css/frontend.css',
			array( 'fontawesome-gutenverse', 'gutenverse-iconlist' ),
			GUTENVERSE_FRAMEWORK_VERSION
		);
	}

	/**
	 * Register Scripts.
	 */
	private function init_scripts() {
		$include = ( include GUTENVERSE_FRAMEWORK_DIR . '/lib/dependencies/core.asset.php' )['dependencies'];

		wp_register_script(
			'gutenverse-core-event',
			GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/js/core.js',
			$include,
			GUTENVERSE_FRAMEWORK_VERSION,
			true
		);

		wp_register_script(
			'gutenverse-frontend-event',
			GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/js/corefrontend.js',
			array(),
			GUTENVERSE_FRAMEWORK_VERSION,
			true
		);

		wp_localize_script(
			'gutenverse-frontend-event',
			'GutenverseFrontendConfig',
			$this->gutenverse_frontend_config()
		);

		$include = ( include GUTENVERSE_FRAMEWORK_DIR . '/lib/dependencies/components.asset.php' )['dependencies'];

		wp_register_script(
			'gutenverse-components-event',
			GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/js/components.js',
			$include,
			GUTENVERSE_FRAMEWORK_VERSION,
			true
		);

		$include = ( include GUTENVERSE_FRAMEWORK_DIR . '/lib/dependencies/blocks.asset.php' )['dependencies'];

		wp_register_script(
			'gutenverse-blocks-event',
			GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/js/blocks.js',
			$include,
			GUTENVERSE_FRAMEWORK_VERSION,
			true
		);
	}

	/**
	 * Frontend Config
	 *
	 * @return array
	 */
	public function gutenverse_frontend_config() {
		$config                      = array();
		$config['wpjson_url']        = get_rest_url();
		$config['wpjson_nonce']      = wp_create_nonce( 'wp_rest' );
		$config['wpjson_endpoint']   = admin_url( 'admin-ajax.php?action=rest-nonce' );
		$config['framework_asset']   = GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/';
		$config['framework_version'] = GUTENVERSE_FRAMEWORK_VERSION;
		$config['image_placeholder'] = GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/img/img-placeholder.jpg';

		return $config;
	}
}
