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
		// RENDER DEVICE WIDTH.

		$tablet_breakpoint = gutenverse_breakpoint( 'Tablet' );
		$mobile_breakpoint = gutenverse_breakpoint( 'Mobile' );

		$result .= ':root {
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
			$result .= gutenverse_global_color_style_generator( $global_colors );
		}

		// RENDER GLOBAL FONTS.
		$global_fonts = Init::instance()->global_variable->get_global_variable( 'font' );

		if ( ! empty( $global_fonts ) ) {
			$result .= gutenverse_global_font_style_generator( $global_fonts );
		}

		$result = $this->section_inherit() . $result;

		return $result;
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
		// Load standalone package for ReactPlayer ref : https://github.com/CookPete/react-player.
		wp_enqueue_script(
			'react-player-dep',
			GUTENVERSE_FRAMEWORK_URL . '/assets/frontend/react-player/ReactPlayer.standalone.js',
			array(),
			GUTENVERSE_FRAMEWORK_VERSION,
			true
		);

		wp_enqueue_script( 'gutenverse-core-event' );

		wp_enqueue_script( 'gutenverse-frontend-event' );

		wp_localize_script( 'gutenverse-frontend-event', 'GutenverseData', $this->gutenverse_data() );

		do_action( 'gutenverse_include_frontend' );

		wp_enqueue_style( 'gutenverse-frontend-style' );

		wp_enqueue_style(
			'gutenverse-frontend-icon',
			GUTENVERSE_FRAMEWORK_URL . '/assets/dist/frontend-icon.css',
			array(),
			GUTENVERSE_FRAMEWORK_VERSION
		);

		if ( is_user_logged_in() ) {
			wp_enqueue_style(
				'gutenverse-toolbar',
				GUTENVERSE_FRAMEWORK_URL . '/assets/dist/toolbar.css',
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
		$settings_data = get_option( 'gutenverse-settings' );

		$config                 = array();
		$config['postId']       = get_the_ID();
		$config['query']        = $this->get_template_query();
		$config['settingsData'] = ! empty( $settings_data ) ? array(
			'editor_settings' => $settings_data['editor_settings'],
		) : array();

		return apply_filters( 'gutenverse_frontend_config', $config );
	}
}
