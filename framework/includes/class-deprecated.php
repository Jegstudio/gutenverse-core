<?php
/**
 * Deprecated class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-framework
 */

namespace Gutenverse\Framework;

/**
 * Deprecated functionality
 *
 * @package gutenverse
 */
class Deprecated {
	/**
	 * Init constructor.
	 */
	public function __construct() {
		if ( ! defined( 'GUTENVERSE' ) ) {
			return; // Theme Helper is only loaded when Gutenverse is activated.
		}

		// Filter.
		if ( ! apply_filters( 'gutenverse_themes_override_mechanism', false ) ) {
			add_filter( 'pre_get_block_templates', array( $this, 'get_block_template' ), null, 3 );
			add_filter( 'get_block_file_template', array( $this, 'get_block_file_template' ), null, 5 );
		}
	}

	/**
	 * Filters the array of queried block templates array after they've been fetched.
	 *
	 * @since 5.9.0
	 *
	 * @param WP_Block_Template|null $block_template The found block template, or null if there is none.
	 * @param string                 $id             Template unique identifier (example: theme_slug//template_slug).
	 * @param string                 $template_type  Template type: `'wp_template'` or '`wp_template_part'`.
	 */
	public function get_block_file_template( $block_template, $id, $template_type, $count = 0, $old_slug = '' ) {
		/**
		 * Filters the block templates array before the query takes place.
		 *
		 * Return a non-null value to bypass the WordPress queries.
		 *
		 * @since 5.9.0
		 *
		 * @param WP_Block_Template|null $block_template Return block template object to short-circuit the default query,
		 *                                               or null to allow WP to run its normal queries.
		 * @param string                 $id             Template unique identifier (example: theme_slug//template_slug).
		 * @param string                 $template_type  Template type: `'wp_template'` or '`wp_template_part'`.
		 */
		$block_template = apply_filters( 'pre_get_block_file_template', null, $id, $template_type );
		if ( ! is_null( $block_template ) ) {
			return $block_template;
		}

		$parts = explode( '//', $id, 2 );
		if ( count( $parts ) < 2 ) {
			/** This filter is documented in wp-includes/block-template-utils.php */
			return apply_filters( 'get_block_file_template', null, $id, $template_type );
		}
		list( $theme, $slug ) = $parts;

		$template_file = $this->get_block_template_file( $template_type, $slug );
		if ( null === $template_file ) {
			/** This filter is documented in wp-includes/block-template-utils.php */
			if ( $count < 5 ) {
				if ( $slug === $old_slug || '' === $slug ) {
					++$count;
				}
				return apply_filters( 'get_block_file_template', null, $id, $template_type, $count, $slug );
			}
		} elseif ( null !== $template_file ) {
			$block_template = _build_block_template_result_from_file( $template_file, $template_type );
		}
		return $block_template;
	}

	/**
	 * Get Block template.
	 *
	 * @param WP_Block_Template[] $query_result Array of found block templates.
	 * @param array               $query {
	 *                  Optional. Arguments to retrieve templates.
	 *
	 *     @type array  $slug__in List of slugs to include.
	 *     @type int    $wp_id Post ID of customized template.
	 * }
	 * @param string              $template_type wp_template or wp_template_part.
	 */
	public function get_block_template( $query_result, $query, $template_type ) {
		$post_type     = isset( $query['post_type'] ) ? $query['post_type'] : '';
		$wp_query_args = array(
			'post_status'    => array( 'auto-draft', 'draft', 'publish' ),
			'post_type'      => $template_type,
			'posts_per_page' => -1,
			'no_found_rows'  => true,
			'tax_query'      => array(
				array(
					'taxonomy' => 'wp_theme',
					'field'    => 'name',
					'terms'    => get_stylesheet(),
				),
			),
		);

		if ( 'wp_template_part' === $template_type && isset( $query['area'] ) ) {
			$wp_query_args['tax_query'][]           = array(
				'taxonomy' => 'wp_template_part_area',
				'field'    => 'name',
				'terms'    => $query['area'],
			);
			$wp_query_args['tax_query']['relation'] = 'AND';
		}

		if ( isset( $query['slug__in'] ) ) {
			$wp_query_args['post_name__in'] = $query['slug__in'];
		}

		// This is only needed for the regular templates/template parts post type listing and editor.
		if ( isset( $query['wp_id'] ) ) {
			$wp_query_args['p'] = $query['wp_id'];
		} else {
			$wp_query_args['post_status'] = 'publish';
		}

		$template_query = new \WP_Query( $wp_query_args );
		$query_result   = array();
		foreach ( $template_query->posts as $post ) {
			$template = _build_block_template_result_from_post( $post );

			if ( is_wp_error( $template ) ) {
				continue;
			}

			if ( $post_type && ! $template->is_custom ) {
				continue;
			}

			if (
				$post_type &&
				isset( $template->post_types ) &&
				! in_array( $post_type, $template->post_types, true )
			) {
				continue;
			}

			$query_result[] = $template;
		}

		if ( ! isset( $query['wp_id'] ) ) {
			$template_files = $this->get_block_templates_files( $template_type );

			foreach ( $template_files as $template_file ) {
				$template = _build_block_template_result_from_file( $template_file, $template_type );

				if ( $post_type && ! $template->is_custom ) {
					continue;
				}

				if ( $post_type &&
					isset( $template->post_types ) &&
					! in_array( $post_type, $template->post_types, true )
				) {
					continue;
				}

				$is_not_custom   = false === array_search(
					get_stylesheet() . '//' . $template_file['slug'],
					wp_list_pluck( $query_result, 'id' ),
					true
				);
				$fits_slug_query =
					! isset( $query['slug__in'] ) || in_array( $template_file['slug'], $query['slug__in'], true );
				$fits_area_query =
					! isset( $query['area'] ) || $template_file['area'] === $query['area'];
				$should_include  = $is_not_custom && $fits_slug_query && $fits_area_query;
				if ( $should_include ) {
					$query_result[] = $template;
				}
			}
		}

		/**
		 * Filters the array of queried block templates array after they've been fetched.
		 *
		 * @since 5.9.0
		 *
		 * @param WP_Block_Template[] $query_result Array of found block templates.
		 * @param array  $query {
		 *     Optional. Arguments to retrieve templates.
		 *
		 *     @type array  $slug__in List of slugs to include.
		 *     @type int    $wp_id Post ID of customized template.
		 * }
		 * @param string $template_type wp_template or wp_template_part.
		 */
		return apply_filters( 'get_block_templates', $query_result, $query, $template_type );
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
