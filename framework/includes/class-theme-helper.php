<?php
/**
 * Theme Helper Class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-framework
 */

namespace Gutenverse\Framework;

use WP_Block_Type_Registry;

/**
 * Class Init
 *
 * @package Gutenverse-framework
 */
class Theme_Helper {

	/**
	 * Init constructor.
	 */
	public function __construct() {
		if ( ! defined( 'GUTENVERSE' ) ) {
			return; // Theme Helper is only loaded when Gutenverse is activated.
		}

		// Filter.
		add_filter( 'pre_get_block_template', array( $this, 'change_stylesheet_and_template_directory' ), null );
		add_filter( 'pre_get_block_templates', array( $this, 'change_stylesheet_and_template_directory' ), null );
		add_filter( 'get_block_templates', array( $this, 'remove_filter_change_directory' ), null );

		add_filter( 'pre_get_block_file_template', array( $this, 'change_stylesheet_and_template_directory' ), null );
		add_filter( 'get_block_file_template', array( $this, 'remove_filter_change_directory' ), null );

		add_filter( 'wp_theme_json_data_theme', array( $this, 'additional_custom_templates' ) );
		add_filter( 'get_block_template', array( $this, 'get_block_template' ), null, 3 );
		add_filter( 'validate_current_theme', '__return_false' );

		// Action.
		add_action( 'wp', array( $this, 'home_template' ), 99 );

		/**
		 * These functions used to be called inside init hook.
		 * But because framework called using init hook.
		 * Now these functions will be called directly.
		 */
		add_action( 'wp', array( $this, 'register_block_core_template_part' ) );
	}

	/**
	 * Get custom template.
	 *
	 * @param mixed  $block_template Template file path.
	 * @param string $id Theme id.
	 * @param string $template_type Template type.
	 *
	 * @return mxied
	 */
	public function get_block_template( $block_template, $id, $template_type ) {
		$parts = explode( '//', $id, 2 );
		if ( count( $parts ) < 2 ) {
			/** This filter is documented in wp-includes/block-template-utils.php */
			return apply_filters( 'get_block_file_template', null, $id, $template_type );
		}
		list( $theme, $slug ) = $parts;

		$custom_templates = apply_filters( 'gutenverse_themes_template', array(), 'wp_template', false );

		foreach ( $custom_templates as $template ) {
			if ( $template['slug'] === $slug ) {
				$block_template = _build_block_template_result_from_file( $this->get_template_content( $template['path'], $slug, $theme, $template_type ), $template_type );
			}
		}

		return $block_template;
	}

	/**
	 * Get custom template file.
	 *
	 * @param string $file_path Template file path.
	 * @param string $slug Template slug.
	 * @param string $theme Theme id.
	 * @param string $template_type Template type.
	 *
	 * @return mxied
	 */
	public function get_template_content( $file_path, $slug, $theme, $template_type ) {
		if ( file_exists( $file_path ) ) {
			$new_template_item = array(
				'slug'  => $slug,
				'path'  => $file_path,
				'theme' => $theme,
				'type'  => $template_type,
			);

			if ( 'wp_template_part' === $template_type ) {
				return _add_block_template_part_area_info( $new_template_item );
			}

			if ( 'wp_template' === $template_type ) {
				return _add_block_template_info( $new_template_item );
			}

			return $new_template_item;
		}
	}

	/**
	 * Add custom template.
	 *
	 * @param WP_Theme_JSON_Data $theme_json Class to access and update the underlying data.
	 *
	 * @return \WP_Theme_JSON_Data
	 */
	public function additional_custom_templates( $theme_json ) {
		if ( apply_filters( 'gutenverse_themes_override_mechanism', false ) ) {
			$wp_theme        = wp_get_theme();
			$theme_json_file = $wp_theme->get_file_path( 'theme.json' );

			if ( is_readable( $theme_json_file ) ) {
				$theme_json_data = wp_json_file_decode( $theme_json_file, array( 'associative' => true ) );
			} else {
				$theme_json_data = array();
			}

			$custom_templates = apply_filters( 'gutenverse_themes_template', array(), 'wp_template' );

			$theme_json_data['customTemplates'][] = array(
				'name'  => 'template-basic',
				'title' => 'Template Basic',
			);

			$theme_json_data['customTemplates'][] = array(
				'name'  => 'blank-canvas',
				'title' => 'Blank Canvas',
			);

			foreach ( $custom_templates as $custom ) {
				$title = str_replace( '-', ' ', $custom['slug'] );

				$theme_json_data['customTemplates'][] = array(
					'name'  => $custom['slug'],
					'title' => ucwords( $title ),
				);
			}

			if ( class_exists( 'WP_Theme_JSON_Data_Gutenberg' ) ) {
				return new \WP_Theme_JSON_Data_Gutenberg( $theme_json_data, 'theme' );
			} else {
				return new \WP_Theme_JSON_Data( $theme_json_data, 'theme' );
			}
		}

		return $theme_json;
	}

	/**
	 * Change Stylesheet and template directory
	 *
	 * @param WP_Block_Template[] $query_result Array of found block templates.
	 */
	public function change_stylesheet_and_template_directory( $query_result ) {
		if ( apply_filters( 'gutenverse_themes_override_mechanism', false ) ) {
			add_filter( 'stylesheet_directory', array( $this, 'change_stylesheet_directory' ) );
			add_filter( 'template_directory', array( $this, 'change_stylesheet_directory' ) );
		}
		return $query_result;
	}

	/**
	 * Change StyleSheet Directory
	 *
	 * @param string $stylesheet_dir Absolute path to the active theme.
	 */
	public function change_stylesheet_directory( $stylesheet_dir ) {
		$check_stylesheet = get_stylesheet();
		$check_template   = get_template();

		if ( $check_stylesheet === $check_template ) {
			$stylesheet_dir = apply_filters( 'gutenverse_stylesheet_directory', $stylesheet_dir );
		}

		return $stylesheet_dir;
	}

	/**
	 * Remove Filter change directory
	 *
	 * @param WP_Block_Template[] $query_result Array of found block templates.
	 */
	public function remove_filter_change_directory( $query_result ) {
		remove_filter( 'stylesheet_directory', array( $this, 'change_stylesheet_directory' ) );
		remove_filter( 'template_directory', array( $this, 'change_stylesheet_directory' ) );
		return $query_result;
	}

	/**
	 * Home Template.
	 */
	public function home_template() {
		$settings      = get_option( 'gutenverse-settings', array() );
		$page_settings = isset( $settings['template_page'] ) ? $settings['template_page'] : null;

		if ( is_front_page() && has_blocks() && ! empty( $page_settings ) && isset( $page_settings['use_setting_homepage'] ) && $page_settings['use_setting_homepage'] ) {
			add_filter( 'pre_get_block_templates', array( $this, 'home_block_template' ), null, 3 );
		}
	}

	/**
	 * Filter Home Block.
	 *
	 * @param string $result Template Name.
	 * @param string $query Query.
	 * @param string $template_type Template Type.
	 *
	 * @return array Templates.
	 */
	public function home_block_template( $result, $query, $template_type ) {
		if ( 'wp_template' === $template_type && isset( $query['slug__in'] ) && 'front-page' === $query['slug__in'][0] ) {
			return array();
		}

		return $result;
	}

	/**
	 * Re - Registers the `core/template-part` block on the server.
	 */
	public function register_block_core_template_part() {
		if ( WP_Block_Type_Registry::get_instance()->is_registered( 'core/template-part' ) ) {
			// If it is already registered, unregister first.
			unregister_block_type( 'core/template-part' );
		}

		register_block_type_from_metadata(
			ABSPATH . WPINC . '/blocks/template-part',
			array(
				'render_callback' => array( $this, 'render_block_core_template_part' ),
				'variations'      => build_template_part_block_variations(),
			)
		);
	}

	/**
	 * Renders the `core/template-part` block on the server.
	 *
	 * @param array $attributes The block attributes.
	 *
	 * @return string The render.
	 */
	public function render_block_core_template_part( $attributes ) {
		static $seen_ids = array();

		$template_part_id = null;
		$area             = WP_TEMPLATE_PART_AREA_UNCATEGORIZED;
		$content          = gutenverse_template_part_content( $attributes, $template_part_id, $area );

		// WP_DEBUG_DISPLAY must only be honored when WP_DEBUG. This precedent
		// is set in `wp_debug_mode()`.
		$is_debug = WP_DEBUG && WP_DEBUG_DISPLAY;

		if ( is_null( $content ) && $is_debug ) {
			if ( ! isset( $attributes['slug'] ) ) {
				// If there is no slug this is a placeholder and we dont want to return any message.
				return;
			}
			return sprintf(
			/* translators: %s: Template part slug. */
				__( 'Template part has been deleted or is unavailable: %s' ),
				$attributes['slug']
			);
		}

		if ( isset( $seen_ids[ $template_part_id ] ) ) {
			return $is_debug ?
			// translators: Visible only in the front end, this warning takes the place of a faulty block.
			__( '[block rendering halted]' ) :
			'';
		}

		// Look up area definition.
		$area_definition = null;
		$defined_areas   = get_allowed_block_template_part_areas();
		foreach ( $defined_areas as $defined_area ) {
			if ( $defined_area['area'] === $area ) {
				$area_definition = $defined_area;
				break;
			}
		}

		// If $area is not allowed, set it back to the uncategorized default.
		if ( ! $area_definition ) {
			$area = WP_TEMPLATE_PART_AREA_UNCATEGORIZED;
		}

		// Run through the actions that are typically taken on the_content.
		$content                       = shortcode_unautop( $content );
		$content                       = do_shortcode( $content );
		$seen_ids[ $template_part_id ] = true;
		$content                       = do_blocks( $content );
		unset( $seen_ids[ $template_part_id ] );
		$content = wptexturize( $content );
		$content = convert_smilies( $content );
		$content = wp_filter_content_tags( $content, "template_part_{$area}" );

		// Handle embeds for block template parts.
		global $wp_embed;
		$content = $wp_embed->autoembed( $content );

		if ( empty( $attributes['tagName'] ) ) {
			$area_tag = 'div';
			if ( $area_definition && isset( $area_definition['area_tag'] ) ) {
				$area_tag = $area_definition['area_tag'];
			}
			$html_tag = $area_tag;
		} else {
			$html_tag = esc_attr( $attributes['tagName'] );
		}
		$wrapper_attributes = get_block_wrapper_attributes();

		return "<$html_tag $wrapper_attributes>" . str_replace( ']]>', ']]&gt;', $content ) . "</$html_tag>";
	}
}
