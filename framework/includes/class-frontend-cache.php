<?php
/**
 * Legacy frontend generated file cleanup
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-framework
 */

namespace Gutenverse\Framework;

/**
 * Class Frontend Cache.
 *
 * Keeps compatibility for legacy generated frontend files. Frontend CSS now
 * renders inline through the frontend style handle.
 *
 * @package gutenverse-framework
 */
class Frontend_Cache {
	/**
	 * Option Name.
	 *
	 * @var string
	 */
	public static $option_name = 'gutenverse-style-cache-id';

	/**
	 * Init constructor.
	 */
	public function __construct() {
		add_action( 'wp_loaded', array( $this, 'clear_cleanup_cron' ) );
		add_action( 'gutenverse_cleanup_cached_style', array( $this, 'cleanup_cached_style' ) );
	}

	/**
	 * Clear the old automatic cleanup schedule.
	 */
	public function clear_cleanup_cron() {
		$hook = 'gutenverse_cleanup_cached_style';

		if ( wp_next_scheduled( $hook ) ) {
			wp_clear_scheduled_hook( $hook );
		}
	}

	/**
	 * Delete File if not Containing String.
	 *
	 * @param string $folder_path Folder Path.
	 * @param string $cache_id Cache Id.
	 *
	 * @return void
	 */
	public function delete_file( $folder_path, $cache_id = false ) {
		if ( ! is_dir( $folder_path ) ) {
			return;
		}
		$files = list_files( $folder_path );

		foreach ( $files as $file ) {
			if ( is_file( $file ) ) {
				$filename = basename( $file );
				if ( $cache_id ) {
					if ( strpos( $filename, $cache_id ) === false ) {
						wp_delete_file( $file );
					}
				} else {
					wp_delete_file( $file );
				}
			}
		}
	}

	/**
	 * Clean up cache style.
	 */
	public function cleanup_cached_style() {
		$cache_id = $this->get_style_cache_id();

		$css_path = gutenverse_css_path();
		$this->delete_file( $css_path, $cache_id );

		$conditional_path = gutenverse_conditional_path();
		$this->delete_file( $conditional_path, $cache_id );

		$preload_path = gutenverse_preload_assets_path();
		$this->delete_file( $preload_path, $cache_id );
	}

	/**
	 * Clean up all legacy generated frontend files.
	 */
	public function cleanup_legacy_files() {
		$this->delete_file( gutenverse_css_path() );
		$this->delete_file( gutenverse_conditional_path() );
		$this->delete_file( gutenverse_preload_assets_path() );
	}

	/**
	 * Get Cache ID.
	 *
	 * @return string
	 */
	public function get_style_cache_id() {
		return get_option( self::$option_name, 'initial-cache' );
	}
}
