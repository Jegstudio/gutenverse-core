<?php
/**
 * Frontend Assets Generator Cache
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-framework
 */

namespace Gutenverse\Framework;

/**
 * Class Frontend Cache.
 *
 * @since 3.3.0-dev:
 *      - Class renamed from Style_Cache to Frontend_Cache
 *      - Add function get_path_by_type to load different path
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
	 * Font Cache Name.
	 *
	 * @var string
	 */
	protected $font_cache_name;

	/**
	 * Script Cache Name.
	 *
	 * @var string
	 */
	protected $conditional_script_cache_name;

	/**
	 * Style Cache Name.
	 *
	 * @var string
	 */
	protected $conditional_style_cache_name;

	/**
	 * Init constructor.
	 */
	public function __construct() {
		// Perlu Test Schedule.
		add_action( 'wp_loaded', array( $this, 'schedule_cleanup_cron' ) );
		add_action( 'gutenverse_cleanup_cached_style', array( $this, 'cleanup_cached_style' ) );
		add_action( 'switch_theme', array( $this, 'delete_generated_files_when_switch_theme' ) );
		add_filter( 'cron_schedules', array( $this, 'add_custom_intervals' ) );

		// Reset Generator ID when this hook triggered.
		add_action( 'save_post', array( $this, 'generate_style_cache_id' ) );
		add_action( 'gutenverse_modify_global_variable', array( $this, 'generate_style_cache_id' ) );

		// Filter.
		add_filter( 'gutenverse_frontend_render_mechanism', array( $this, 'render_mechanism' ) );
		add_filter( 'gutenverse_bypass_generate_style', array( $this, 'bypass_generate_css' ), null, 3 );
		add_filter( 'gutenverse_bypass_generate_script', array( $this, 'bypass_script' ), null, 2 );
		add_filter( 'gutenverse_global_fonts', array( $this, 'global_fonts' ), null, 2 );
		add_filter( 'gutenverse_conditional_script_handles', array( $this, 'script_handles' ), null, 2 );
		add_filter( 'gutenverse_conditional_style_handles', array( $this, 'style_handles' ), null, 2 );
		add_filter( 'gutenverse_render_generated_style', array( $this, 'render_style' ), null, 4 );
	}

	/**
	 * Overwrite Render Mechanism
	 *
	 * @return string
	 */
	public function render_mechanism() {
		$options = get_option( 'gutenverse-settings' );

		if ( isset( $options['frontend_settings']['render_mechanism'] ) ) {
			$render_mechanism = $options['frontend_settings']['render_mechanism'];
			if ( ! empty( $render_mechanism ) ) {
				return $render_mechanism;
			}
		}
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
	 * Get Script Cache Name.
	 *
	 * @return string
	 */
	public function get_script_cache_filename() {
		return $this->conditional_script_cache_name;
	}

	/**
	 * Get Style Cache Name.
	 *
	 * @return string
	 */
	public function get_style_cache_filename() {
		return $this->conditional_style_cache_name;
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
	 * Set Modular Script Cache Name
	 *
	 * @param string $name Name of cache.
	 */
	public function set_conditional_script_cache_name( $name ) {
		$cache_id         = $this->get_style_cache_id();
		$script_file_name = $name . '-script-' . $cache_id . '.json';
		$this->conditional_script_cache_name = $script_file_name;
	}

	/**
	 * Set Modular Style Cache Name
	 *
	 * @param string $name Name of cache.
	 */
	public function set_conditional_style_cache_name( $name ) {
		$cache_id         = $this->get_style_cache_id();
		$style_file_name = $name . '-style-' . $cache_id . '.json';
		$this->conditional_style_cache_name = $style_file_name;
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

		if ( 'file' === $mechanism ) {
			if ( $this->is_file_exist( $filename, 'font' ) ) {
				$fonts = $this->read_cache_file( $filename, 'font' );
				return json_decode( $fonts, true );
			} else {
				$this->create_cache_file( $filename, wp_json_encode( $fonts, true ), 'font' );
			}
		}

		return $fonts;
	}

	/**
	 * By Pass Script Loop Attribute.
	 *
	 * @param array $handles Array of script handles.
	 *
	 * @return array
	 */
	public function script_handles( $handles ) {
		$filename  = $this->get_script_cache_filename();
		$mechanism = apply_filters( 'gutenverse_frontend_render_mechanism', 'direct' );

		if ( 'file' === $mechanism ) {
			if ( $this->is_file_exist( $filename, 'conditional_js' ) ) {
				$handles = $this->read_cache_file( $filename, 'conditional_js' );
				return json_decode( $handles, true );
			} else {
				$this->create_cache_file( $filename, wp_json_encode( $handles, true ), 'conditional_js' );
			}
		}

		return $handles;
	}

	/**
	 * By Pass Script Loop Attribute.
	 *
	 * @param array $handles Array of style handles.
	 *
	 * @return array
	 */
	public function style_handles( $handles ) {
		$filename  = $this->get_style_cache_filename();
		$mechanism = apply_filters( 'gutenverse_frontend_render_mechanism', 'direct' );

		if ( 'file' === $mechanism ) {
			if ( $this->is_file_exist( $filename, 'conditional_css' ) ) {
				$handles = $this->read_cache_file( $filename, 'conditional_css' );
				return json_decode( $handles, true );
			} else {
				$this->create_cache_file( $filename, wp_json_encode( $handles, true ), 'conditional_css' );
			}
		}

		return $handles;
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

		if ( 'file' === $mechanism && $this->is_file_exist( $filename, 'css' ) ) {
			$this->inject_to_header( $filename, $type );
			return true;
		}

		return $flag;
	}

	/**
	 * Check if we going to by pass script checking.
	 *
	 * @param boolean $flag Flag.
	 * @param string  $name Name of file.
	 *
	 * @return bool
	 */
	public function bypass_script( $flag, $name ) {
		$this->set_conditional_script_cache_name( $name );
		$this->set_conditional_style_cache_name( $name );
		$mechanism = apply_filters( 'gutenverse_frontend_render_mechanism', 'direct' );
		$filename  = $this->get_file_js_name( $name );

		if ( 'file' === $mechanism && $this->is_file_exist( $filename, 'conditional_js' ) ) {
			return true;
		}

		return $flag;
	}

	/**
	 * Get File Name.
	 *
	 * @param string $name Name of file.
	 *
	 * @return string
	 */
	public function get_file_js_name( $name ) {
		$cache_id = $this->get_style_cache_id();
		return $name . '-' . $cache_id . '-script.json';
	}

	/**
	 * Delete Generated CSS & JSON when Switching Theme
	 */
	public function delete_generated_files_when_switch_theme() {
		delete_option( self::$option_name );

		$css_path = gutenverse_css_path();
		$this->delete_file( $css_path );

		$conditional_path = gutenverse_conditional_path();
		$this->delete_file( $conditional_path );
	}

	/**
	 * Add Custom Interval for Sceduler
	 *
	 * @param array $schedules Schedules.
	 *
	 * @return array
	 */
	public function add_custom_intervals( $schedules ) {
		$schedules['yearly']             = array(
			'interval' => 365 * 24 * 60 * 60, // 365 days in seconds
			'display'  => esc_html__( 'Once a Year', '--gctd--' ),
		);
		$schedules['monthly']            = array(
			'interval' => 30 * 24 * 60 * 60, // 30 days in seconds
			'display'  => esc_html__( 'Once a Month', '--gctd--' ),
		);
		$schedules['weekly']             = array(
			'interval' => 7 * 24 * 60 * 60, // 7 days in seconds
			'display'  => esc_html__( 'Every Week', '--gctd--' ),
		);
		$schedules['every_two_days']     = array(
			'interval' => 2 * 24 * 60 * 60, // 2 days in seconds
			'display'  => esc_html__( 'Once Every 2 Days', '--gctd--' ),
		);
		$schedules['daily']              = array(
			'interval' => 24 * 60 * 60, // 1 day in seconds
			'display'  => esc_html__( 'Daily', '--gctd--' ),
		);
		$schedules['every_five_minutes'] = array(
			'interval' => 5 * 60, // 5 minutes in seconds
			'display'  => esc_html__( 'Once Every 5 Minutes', '--gctd--' ),
		);
		return $schedules;
	}
	/**
	 * Schedule Delete Cron.
	 */
	public function schedule_cleanup_cron() {
		$options = get_option( 'gutenverse-settings' );

		if ( ! wp_next_scheduled( 'gutenverse_cleanup_cached_style' ) ) {
			$midnight = strtotime( 'tomorrow 00:00:00' );
			if ( isset( $options['frontend_settings']['render_mechanism'] ) && 'file' === $options['frontend_settings']['render_mechanism'] ) {
				wp_schedule_event( $midnight, isset( $options['frontend_settings']['old_render_deletion_schedule'] ) ? $options['frontend_settings']['old_render_deletion_schedule'] : 'daily', 'gutenverse_cleanup_cached_style' );
			} else {
				$this->cleanup_cached_style();
			}
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
	 * Render Generated Style.
	 *
	 * @param string $flag render flag.
	 * @param string $name Name of file.
	 * @param string $style Generated Style.
	 * @param string $source Source of content.
	 *
	 * @return boolean
	 */
	public function render_style( $flag, $name, $style, $source ) {
		$mechanism = apply_filters( 'gutenverse_frontend_render_mechanism', 'direct' );

		if ( 'file' === $mechanism ) {
			$this->generate_and_render( $name, $style, $source );
			return true;
		}

		return $flag;
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
		$this->create_cache_file( $filename, $style, 'css' );
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
		$includes = array('gutenverse-frontend-style');

		if ( gutenverse_pro_active() ) {
			$includes[] = 'gutenverse-pro-block';
		}

		wp_enqueue_style(
			'gutenverse-generated-' . $type,
			$file_url,
			$includes,
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
	 * @since 3.3.0-dev: add this function to load different path
	 *
	 * @param string $type File type.
	 * @param string $filename File name with extension.
	 *
	 * @return bool
	 */
	protected function get_path_by_type( $type, $filename = '' ) {
		switch ( $type ) {
			case 'conditional_js':
			case 'conditional_css':
				return gutenverse_conditional_path( $filename );
			case 'css':
			case 'font':
			default:
				return gutenverse_css_path( $filename );
		}
	}

	/**
	 * Create File.
	 *
	 * @since 3.3.0-dev: add $type to load different path
	 *
	 * @param string $filename File name with extension.
	 * @param string $content Style content.
	 * @param string $type File type.
	 *
	 * @return bool
	 */
	public function create_cache_file( $filename, $content, $type = 'css' ) {
		global $wp_filesystem;
		$this->initialize_wp_filesystem();

		$style_directory = $this->get_path_by_type( $type );
		$file_path       = $this->get_path_by_type( $type, $filename );

		if ( ! $wp_filesystem->is_dir( $style_directory ) ) {
			wp_mkdir_p( $style_directory );
		}

		if ( $wp_filesystem->put_contents( $file_path, $content, FS_CHMOD_FILE ) ) {
			defined( 'WP_DEBUG' ) && WP_DEBUG && gutenverse_rlog( 'File created with name : ' . $filename );
			return true;
		} else {
			defined( 'WP_DEBUG' ) && WP_DEBUG && gutenverse_rlog( 'Failed to create file with name : ' . $filename );
			return false;
		}
	}


	/**
	 * Read Cache File.
	 *
	 * @since 3.3.0-dev: add $type to load different path
	 *
	 * @param string $filename File name.
	 * @param string $type File type.
	 *
	 * @return string
	 */
	public function read_cache_file( $filename, $type = 'css' ) {
		global $wp_filesystem;
		$this->initialize_wp_filesystem();
		$file_path = $this->get_path_by_type( $type, $filename );

		if ( $wp_filesystem->exists( $file_path ) ) {
			return $wp_filesystem->get_contents( $file_path );
		} else {
			return 'File does not exist.';
		}
	}

	/**
	 * Check if file exist.
	 *
	 * @since 3.3.0-dev: add $type to load different path
	 *
	 * @param string $filename File name.
	 * @param string $type File type.
	 *
	 * @return bool
	 */
	public function is_file_exist( $filename, $type = 'css' ) {
		global $wp_filesystem;
		$this->initialize_wp_filesystem();

		$file_path = $this->get_path_by_type( $type, $filename );

		if ( $wp_filesystem->exists( $file_path ) ) {
			return true;
		} else {
			return false;
		}
	}
}
