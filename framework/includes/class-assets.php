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

		return 'https://cdn.rawgit.com/formulachance/font-icon/main/fonts/gtnicon/gtnicon.css';
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

		return 'https://cdn.rawgit.com/formulachance/font-icon/main/fonts/fontawesome/css/all.min.css';
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
				"https://github.com/formulachance/font-icon/archive/refs/tags/v{$version}.zip",
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
			rename( $folder . "/font-icon-{$version}", $folder . '/font-icon' );
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
	}
}
