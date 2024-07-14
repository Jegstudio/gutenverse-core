<?php
/**
 * Style Generator Cache
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-framework
 */

namespace Gutenverse\Framework;

/**
 * Class Style Cache.
 *
 * @package gutenverse-framework
 */
class Style_Cache {
	/**
	 * Option Name.
	 *
	 * @var string
	 */
	public static $option_name = 'gutenverse-style-cache-id';


	/**
	 * Font Cache Name.
	 *
	 * @var string
	 */
	protected $font_cache_name;

	/**
	 * Init constructor.
	 */
	public function __construct() {
		// Perlu Test Schedule.
		add_action( 'wp_loaded', array( $this, 'schedule_cleanup_cron' ) );
		add_action( 'gutenverse_cleanup_cached_style', array( $this, 'cleanup_cached_style' ) );
		add_action( 'switch_theme', array( $this, 'delete_generated_css_switch_theme' ) );

		// Reset Generator ID when this hook triggered.
		add_action( 'save_post', array( $this, 'generate_style_cache_id' ) );
		add_action( 'gutenverse_modify_global_variable', array( $this, 'generate_style_cache_id' ) );

		// Filter.
		add_filter( 'gutenverse_frontend_render_mechanism', array( $this, 'render_mechanism' ) );
		add_filter( 'gutenverse_bypass_generate_css', array( $this, 'bypass_generate_css' ), null, 3 );
		add_filter( 'gutenverse_global_fonts', array( $this, 'global_fonts' ), null, 2 );
	}

	/**
	 * Overwrite Render Mechanism
	 *
	 * @return string
	 */
	public function render_mechanism() {
		return 'file';
	}

	/**
	 * Get Font Cache Name.
	 *
	 * @return string
	 */
	public function get_font_cache_filename() {
		return $this->font_cache_name;
	}

	/**
	 * Set Font Cache Name
	 *
	 * @param string $name Name of cache.
	 * @param string $type Type of generated css.
	 */
	public function set_font_cache_name( $name, $type ) {
		$cache_id       = $this->get_style_cache_id();
		$font_file_name = $name . '-font-' . $cache_id . '.json';

		if ( is_page() || is_single() && 'content' === $type ) {
			$this->font_cache_name = $font_file_name;
		} elseif ( 'template' === $type ) {
			$this->font_cache_name = $font_file_name;
		}
	}

	/**
	 * By Pass Populate Font.
	 *
	 * @param array $fonts Array of fonts.
	 *
	 * @return array
	 */
	public function global_fonts( $fonts ) {
		$filename  = $this->get_font_cache_filename();
		$mechanism = apply_filters( 'gutenverse_frontend_render_mechanism', 'direct' );

		if ( 'file' === $mechanism && $this->is_file_exist( $filename ) ) {
			$fonts = $this->read_cache_file( $filename );
			return json_decode( $fonts, true );
		} else {
			$this->create_cache_file( $filename, wp_json_encode( $fonts, true ) );
		}

		return $fonts;
	}

	/**
	 * Check if we going to by pass css generation.
	 *
	 * @param boolean $flag Flag.
	 * @param string  $name Name of file.
	 * @param string  $type Type of generated css.
	 *
	 * @return bool
	 */
	public function bypass_generate_css( $flag, $name, $type ) {
		$this->set_font_cache_name( $name, $type );
		$mechanism = apply_filters( 'gutenverse_frontend_render_mechanism', 'direct' );
		$filename  = $this->get_file_name( $name );

		if ( 'file' === $mechanism && $this->is_file_exist( $filename ) ) {
			$this->inject_to_header( $filename, $type );
			return true;
		}

		return $flag;
	}

	/**
	 * Delete Generated CSS when Switching Theme
	 */
	public function delete_generated_css_switch_theme() {
		delete_option( self::$option_name );
		$path = gutenverse_css_path();
		$this->delete_file( $path );
	}

	/**
	 * Schedule Delete Cron.
	 */
	public function schedule_cleanup_cron() {
		if ( ! wp_next_scheduled( 'gutenverse_cleanup_cached_style' ) ) {
			wp_schedule_event( strtotime( '03:00:00' ), 'daily', 'gutenverse_cleanup_cached_style' );
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
		$path     = gutenverse_css_path();
		$cache_id = $this->get_style_cache_id();

		$this->delete_file( $path, $cache_id );
	}

	/**
	 * Rolling cache ID.
	 */
	public function generate_style_cache_id() {
		$cache_id = wp_rand( 111111, 999999 );
		update_option( self::$option_name, $cache_id );
	}

	/**
	 * Get Cache ID.
	 *
	 * @return string
	 */
	public function get_style_cache_id() {
		return get_option( self::$option_name, 'initial-cache' );
	}

	/**
	 * Get File Name.
	 *
	 * @param string $name Name of file.
	 *
	 * @return string
	 */
	public function get_file_name( $name ) {
		$cache_id = $this->get_style_cache_id();
		return $name . '-' . $cache_id . '.css';
	}

	/**
	 * Generate and Render Style
	 *
	 * @param string $name Name of file.
	 * @param string $style Generated Style.
	 * @param string $source Source of content.
	 */
	public function generate_and_render( $name, $style, $source ) {
		$filename = $this->get_file_name( $name );
		$this->create_cache_file( $filename, $style );
		$this->inject_to_header( $filename, $source );
	}

	/**
	 * Inject to header.
	 *
	 * @param string $filename with extension and style id.
	 * @param string $type Type of generate style cache.
	 */
	public function inject_to_header( $filename, $type ) {
		$cache_id = $this->get_style_cache_id();
		$file_url = gutenverse_css_url( $filename );

		wp_enqueue_style(
			'gutenverse-generated-' . $type,
			$file_url,
			array(),
			$cache_id
		);
	}

	/**
	 * Initialize WP Filesystem.
	 */
	public function initialize_wp_filesystem() {
		if ( ! function_exists( 'WP_Filesystem' ) ) {
			require_once ABSPATH . 'wp-admin/includes/file.php';
		}
		WP_Filesystem();
	}

	/**
	 * Create File.
	 *
	 * @param string $filename File name with extension.
	 * @param string $content Style Content.
	 *
	 * @return bool
	 */
	public function create_cache_file( $filename, $content ) {
		global $wp_filesystem;
		$this->initialize_wp_filesystem();

		$style_directory = gutenverse_css_path();
		$file_path       = gutenverse_css_path( $filename );

		if ( ! $wp_filesystem->is_dir( $style_directory ) ) {
			wp_mkdir_p( $style_directory );
		}

		if ( $wp_filesystem->put_contents( $file_path, $content, FS_CHMOD_FILE ) ) {
			gutenverse_rlog( 'File created with name : ' . $filename );
			return true;
		} else {
			gutenverse_rlog( 'Failed to create file with name : ' . $filename );
			return false;
		}
	}


	/**
	 * Read Cache File.
	 *
	 * @param string $filename File Name.
	 *
	 * @return string
	 */
	public function read_cache_file( $filename ) {
		global $wp_filesystem;
		$this->initialize_wp_filesystem();
		$file_path = gutenverse_css_path( $filename );

		if ( $wp_filesystem->exists( $file_path ) ) {
			return $wp_filesystem->get_contents( $file_path );
		} else {
			return 'File does not exist.';
		}
	}

	/**
	 * Check if file exist.
	 *
	 * @param string $filename file name.
	 *
	 * @return bool
	 */
	public function is_file_exist( $filename ) {
		global $wp_filesystem;
		$this->initialize_wp_filesystem();

		$file_path = gutenverse_css_path( $filename );

		if ( $wp_filesystem->exists( $file_path ) ) {
			return true;
		} else {
			return false;
		}
	}
}
