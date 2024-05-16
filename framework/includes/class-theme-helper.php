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
		// add_filter( 'pre_get_block_templates', array( $this, 'get_block_template' ), null, 3 );
		// add_filter( 'get_block_file_template', array( $this, 'get_block_file_template' ), null, 5 );

		add_filter( 'pre_get_block_template', array( $this, 'change_stylesheet_and_template_directory' ), null );
		add_filter( 'pre_get_block_templates', array( $this, 'change_stylesheet_and_template_directory' ), null );
		add_filter( 'get_block_templates', array( $this, 'remove_filter_change_directory' ), null );

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
	 * Change Stylesheet and template directory
	 *
	 * @param WP_Block_Template[] $query_result Array of found block templates.
	 */
	public function change_stylesheet_and_template_directory( $query_result ) {
		add_filter( 'stylesheet_directory', array( $this, 'change_stylesheet_directory' ) );
		add_filter( 'template_directory', array( $this, 'change_template_directory' ) );
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
			return apply_filters( 'gutenverse_stylesheet_directory', $stylesheet_dir );
		} else {
			return $stylesheet_dir;
		}
	}

	/**
	 * Change Template Directory
	 *
	 * @param string $template_dir Absolute path to the active theme.
	 */
	public function change_template_directory( $template_dir ) {
		return apply_filters( 'gutenverse_template_directory', $template_dir );
	}

	/**
	 * Remove Filter change directory
	 *
	 * @param WP_Block_Template[] $query_result Array of found block templates.
	 */
	public function remove_filter_change_directory( $query_result ) {
		remove_filter( 'stylesheet_directory', array( $this, 'change_stylesheet_directory' ) );
		remove_filter( 'template_directory', array( $this, 'change_template_directory' ) );
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

	/**
	 * Retrieves the template files from the theme.
	 *
	 * @since 5.9.0
	 * @access private
	 *
	 * @param string $template_type 'wp_template' or 'wp_template_part'.
	 *
	 * @return array Template.
	 */
	public function get_block_templates_files( $template_type ) {
		if ( 'wp_template' !== $template_type && 'wp_template_part' !== $template_type ) {
			return null;
		}

		$themes         = array(
			get_stylesheet() => get_stylesheet_directory(),
			get_template()   => get_template_directory(),
		);
		$template_files = array();

		foreach ( $themes as $theme_slug => $theme_dir ) {
			$template_base_paths  = get_block_theme_folders( $theme_slug );
			$theme_template_files = _get_block_templates_paths( $theme_dir . '/' . $template_base_paths[ $template_type ] );

			foreach ( $theme_template_files as $template_file ) {
				$template_base_path = $template_base_paths[ $template_type ];
				$template_slug      = substr(
					$template_file,
					// Starting position of slug.
					strpos( $template_file, $template_base_path . DIRECTORY_SEPARATOR ) + 1 + strlen( $template_base_path ),
					// Subtract ending '.html'.
					-5
				);

				if ( ! gutenverse_child_template( $template_base_paths[ $template_type ], $template_slug ) ) {
					$template_file = apply_filters( 'gutenverse_template_path', $template_file, $theme_slug, $template_slug );
				}

				$new_template_item = array(
					'slug'  => $template_slug,
					'path'  => $template_file,
					'theme' => $theme_slug,
					'type'  => $template_type,
				);

				if ( 'wp_template_part' === $template_type ) {
					$template_files[] = _add_block_template_part_area_info( $new_template_item );
				}

				if ( 'wp_template' === $template_type ) {
					$template_files[] = _add_block_template_info( $new_template_item );
				}
			}
		}

		return apply_filters( 'gutenverse_themes_template', $template_files, $template_type );
	}

	/**
	 * Retrieves the template file from the theme for a given slug.
	 *
	 * @since 5.9.0
	 * @access private
	 *
	 * @param string $template_type 'wp_template' or 'wp_template_part'.
	 * @param string $slug          Template slug.
	 *
	 * @return array|null Template.
	 */
	public function get_block_template_file( $template_type, $slug ) {
		if ( 'wp_template' !== $template_type && 'wp_template_part' !== $template_type ) {
			return null;
		}

		$themes = array(
			get_stylesheet() => get_stylesheet_directory(),
			get_template()   => get_template_directory(),
		);
		foreach ( $themes as $theme_slug => $theme_dir ) {
			$template_base_paths = get_block_theme_folders( $theme_slug );
			$file_path           = $theme_dir . '/' . $template_base_paths[ $template_type ] . '/' . $slug . '.html';

			if ( ! gutenverse_child_template( $template_base_paths[ $template_type ], $slug ) ) {
				$file_path = apply_filters( 'gutenverse_template_path', $file_path, $theme_slug, $slug );
			}

			if ( file_exists( $file_path ) ) {
				$new_template_item = array(
					'slug'  => $slug,
					'path'  => $file_path,
					'theme' => $theme_slug,
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

		return null;
	}
}
