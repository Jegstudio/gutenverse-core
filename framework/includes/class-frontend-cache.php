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
 * @since 2.3.0:
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
		// Filter.
		add_filter( 'gutenverse_frontend_render_mechanism', array( $this, 'render_mechanism' ) );
	}

	/**
	 * Overwrite Render Mechanism
	 *
	 * @return string
	 */
	public function render_mechanism() {
		return 'direct';
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
		// Safe access.
		$frontend = isset( $options['frontend_settings'] ) && is_array( $options['frontend_settings'] )
		? $options['frontend_settings']
		: array();

		$render_mechanism      = $frontend['render_mechanism'] ?? '';
		$file_delete_mechanism = $frontend['file_delete_mechanism'] ?? '';

		$custom_schedule = $frontend['old_render_deletion_schedule'] ?? 'daily';

		$hook = 'gutenverse_cleanup_cached_style';

		// Validate schedule.
		$schedules = wp_get_schedules();
		if ( ! isset( $schedules[ $custom_schedule ] ) ) {
			$custom_schedule = 'daily';
		}

		// Check if feature should be active.
		$should_schedule = (
			( 'file' === $render_mechanism || ! $render_mechanism ) &&
			( 'auto' === $file_delete_mechanism )
		);

		// Get current scheduled event.
		$timestamp = wp_next_scheduled( $hook );

		// Get next midnight using WP timezone.
		$now      = current_time( 'timestamp' );
		$midnight = strtotime( 'tomorrow midnight', $now );

		// CASE 1: Should NOT be scheduled → clear if exists.
		if ( ! $should_schedule ) {
			if ( $timestamp ) {
				wp_clear_scheduled_hook( $hook );
			}
			return;
		}

		// CASE 2: Should be scheduled but not yet scheduled.
		if ( ! $timestamp ) {
			wp_schedule_event( $midnight, $custom_schedule, $hook );
			return;
		}

		// CASE 3: Already scheduled → check if rescheduling needed.
		$current_schedule = wp_get_schedule( $hook );

		if ( $current_schedule !== $custom_schedule ) {
			// Reschedule with new interval.
			wp_clear_scheduled_hook( $hook );
			wp_schedule_event( $midnight, $custom_schedule, $hook );
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
	 * Get Cache ID.
	 *
	 * @return string
	 */
	public function get_style_cache_id() {
		return get_option( self::$option_name, 'initial-cache' );
	}
}
