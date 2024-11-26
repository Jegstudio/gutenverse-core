<?php
/**
 * Frontend Assets class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-framework
 */

namespace Gutenverse\Framework;

use WP_Term;
use WP_Theme_Json_Resolver;
use WP_User;

/**
 * Class Frontend Assets
 *
 * @package gutenverse
 */
class Frontend_Assets {
	/**
	 * Init constructor.
	 */
	public function __construct() {
		add_action( 'wp_enqueue_scripts', array( $this, 'frontend_scripts' ), 99 );
		add_filter( 'gutenverse_global_css', array( $this, 'global_variable_css' ) );
	}

	/**
	 * Global Variable CSS
	 *
	 * @param string $result Global Variable CSS.
	 *
	 * @return string
	 */
	public function global_variable_css( $result = '' ) {
		$csss = array();

		// RENDER DEVICE WIDTH.
		$tablet_breakpoint = gutenverse_breakpoint( 'Tablet' );
		$mobile_breakpoint = gutenverse_breakpoint( 'Mobile' );

		$csss['breakpoint'] = ':root {
            --guten-screen-xs-max: ' . $mobile_breakpoint . 'px;
            --guten-screen-sm-min: ' . ( $mobile_breakpoint + 1 ) . 'px;
            --guten-screen-sm-max: ' . ( $tablet_breakpoint ) . 'px;
            --guten-screen-md-min: ' . ( $tablet_breakpoint + 1 ) . 'px; 
        }';

		// RENDER GLOBAL COLORS.
		$global_colors = array();
		$current_theme = wp_get_theme();
		$settings      = WP_Theme_Json_Resolver::get_user_data_from_wp_global_styles( $current_theme );

		if ( ! empty( $settings['post_content'] ) ) {
			$theme_settings = json_decode( $settings['post_content'], true );
			$global_colors  = ! empty( $theme_settings['settings']['color']['palette']['custom'] ) ? $theme_settings['settings']['color']['palette']['custom'] : $global_colors;
		}

		if ( ! empty( $global_colors ) ) {
			$csss['global_color'] = gutenverse_global_color_style_generator( $global_colors );
		}

		// RENDER GLOBAL FONTS.
		$global_fonts = Init::instance()->global_variable->get_global_variable( 'font' );

		if ( ! empty( $global_fonts ) ) {
			$csss['global_font'] = gutenverse_global_font_style_generator( $global_fonts );
		}

		$csss['section_inherit'] = $this->section_inherit();
		$csss['result']          = $result;

		return implode( ' ', $csss );
	}

	/**
	 * Inherit secttion if option is on.
	 */
	private function section_inherit() {
		$settings = get_option( 'gutenverse-settings' );

		if ( empty( $settings ) ) {
			return '';
		}

		$page_settings  = isset( $settings['template_page'] ) ? $settings['template_page'] : null;
		$theme_settings = gutenverse_get_theme_settings();

		if ( ! empty( $page_settings ) && isset( $page_settings['inherit_layout'] ) && $page_settings['inherit_layout'] && isset( $theme_settings['layout'] ) && ! empty( $theme_settings['layout']['contentSize'] ) ) {
			return ".guten-post-content > div.section-wrapper, .wp-block-post-content > div.section-wrapper {
				max-width: {$theme_settings['layout']['contentSize']}!important; margin-left:auto; margin-right:auto;
			}";
		}

		return '';
	}

	/**
	 * Frontend Script
	 */
	public function frontend_scripts() {
		wp_enqueue_script( 'gutenverse-frontend-event' );

		wp_localize_script( 'gutenverse-frontend-event', 'GutenverseData', $this->gutenverse_data() );

		do_action( 'gutenverse_include_frontend' );

		wp_enqueue_style( 'gutenverse-frontend-style' );

		wp_enqueue_style(
			'gutenverse-frontend-icon',
			GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/dist/frontend-icon.css',
			array(),
			GUTENVERSE_FRAMEWORK_VERSION
		);

		if ( is_user_logged_in() ) {
			wp_enqueue_style(
				'gutenverse-toolbar',
				GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/dist/toolbar.css',
				array(),
				GUTENVERSE_FRAMEWORK_VERSION
			);
		}
	}

	/**
	 * Get Query Data for API request
	 *
	 * @return array
	 */
	private function get_template_query() {
		$search_query = get_search_query();
		$object_query = get_queried_object();
		$query        = array();

		$query['q_search'] = ! empty( $search_query ) ? esc_attr( $search_query ) : null;

		if ( ! empty( $object_query ) ) {
			if ( $object_query instanceof WP_Term ) {
				switch ( $object_query->taxonomy ) {
					case 'category':
						$query['q_category_name'] = $object_query->slug;
						break;
					case 'post_tag':
						$query['q_tag'] = $object_query->slug;
						break;
				}
			}

			if ( $object_query instanceof WP_User ) {
				$query['q_author'] = $object_query->ID;
			}
		}

		return $query;
	}

	/**
	 * Gutenverse Config
	 *
	 * @return array
	 */
	public function gutenverse_data() {
		$settings_data          = get_option( 'gutenverse-settings' );
		$config                 = array();
		$config['postId']       = get_the_ID();
		$config['homeUrl']      = home_url();
		$config['query']        = $this->get_template_query();
		$config['settingsData'] = ! empty( $settings_data ) ? array(
			'editor_settings' => isset( $settings_data['editor_settings'] ) ? $settings_data['editor_settings'] : null,
		) : array();
		$active_plugins         = get_option( 'active_plugins' );
		$multisite_plugins      = get_site_option( 'active_sitewide_plugins' );
		if ( $multisite_plugins ) {
			$active_plugins_multisite = array_keys( $multisite_plugins );
			$active_plugins           = array_merge( $active_plugins, $active_plugins_multisite );
		}
		$arr_plugin = array();
		foreach ( $active_plugins as $plugin ) {
			$arr_plugin[] = $plugin;
		}
		$config['activePlugins'] = $arr_plugin;

		return apply_filters( 'gutenverse_frontend_config', $config );
	}
}
