<?php
/**
 * Style Generator class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-framework
 */

namespace Gutenverse\Framework;

use WP_Block_Patterns_Registry;
use Gutenverse\Framework\Style\Column;
use Gutenverse\Framework\Style\Wrapper;
use Gutenverse\Framework\Style\Section;
use WP_Query;

/**
 * Class Style Generator
 *
 * @package gutenverse-framework
 */
class Style_Generator {
	/**
	 * Font Families
	 *
	 * @var array
	 */
	protected $font_families = array();

	/**
	 * Font Variables
	 *
	 * @var array
	 */
	protected $font_variables = array();

	/**
	 * Init constructor.
	 */
	public function __construct() {
		add_action( 'wp_head', array( $this, 'global_style_generator' ) );
		add_action( 'gutenverse_include_frontend', array( $this, 'template_style_generator' ), 9999 );
		add_action( 'gutenverse_include_frontend', array( $this, 'content_style_generator' ), 9999 );
		add_action( 'wp_head', array( $this, 'widget_style_generator' ) );
		add_action( 'wp_head', array( $this, 'embeed_font_generator' ) );
	}

	/**
	 * Render CSS for Widget.
	 */
	public function widget_style_generator() {
		if ( current_theme_supports( 'widgets' ) ) {
			$widgets = get_option( 'widget_block' );
			$style   = null;

			foreach ( $widgets as $widget ) {
				if ( isset( $widget['content'] ) ) {
					$blocks = $this->parse_blocks( $widget['content'] );
					$blocks = $this->flatten_blocks( $blocks );
					if ( $blocks ) {
						$this->loop_blocks( $blocks, $style );
					}
				}
			}

			gutenverse_core_print_header_style( 'gutenverse-widget-css', $style );
		}
	}

	/**
	 * Global Style Generator.
	 */
	public function global_style_generator() {
		$variable = apply_filters( 'gutenverse_global_css', '' );

		if ( ! empty( trim( $variable ) ) ) {
			gutenverse_core_print_header_style( 'gutenverse-global-css', $variable );
		}
	}

	/**
	 * Embeed Font on Header.
	 */
	public function embeed_font_generator() {
		global $_wp_current_template_id, $post;
		if ( 0 === count( $this->font_families ) ) {
			if ( is_page() || is_single() ) {
				$this->font_families = get_post_meta( $post->ID, 'font-families-post-' . $post->ID, true );
			} else {
				$this->font_families = get_option( 'font-families-template-' . $_wp_current_template_id );
			}
		} elseif ( is_page() || is_single() ) {
			update_post_meta( $post->ID, 'font-families-post-' . $post->ID, $this->font_families );
		} else {
			update_option( 'font-families-template' . $_wp_current_template_id, $this->font_families );
		}
		if ( 0 === count( $this->font_variables ) ) {
			if ( is_page() || is_single() ) {
				$this->font_variables = get_post_meta( $post->ID, 'font-variables-post-' . $post->ID, true );
			} else {
				$this->font_variables = get_option( 'font-variables-template-' . $_wp_current_template_id );
			}
		} elseif ( is_page() || is_single() ) {
			update_post_meta( $post->ID, 'font-variables-post-' . $post->ID, $this->font_variables );
		} else {
			update_option( 'font-variables-template' . $_wp_current_template_id, $this->font_variables );
		}
		if ( ! isset( $this->fonts_families ) ) {
			$this->font_families = array();
		}
		if ( ! isset( $this->fonts_variables ) ) {
			$this->font_variables = array();
		}
		$this->load_global_fonts();
		gutenverse_header_font( $this->font_families, $this->font_variables );
	}

	/**
	 * Callback function Flatten Blocks for lower version.
	 *
	 * @param blocks $blocks .
	 *
	 * @return blocks.
	 */
	public function flatten_blocks( $blocks ) {
		if ( is_gutenverse_compatible() ) {
			// use Gutenberg or WP 5.9 & above version.
			return _flatten_blocks( $blocks );
		}

		/**
		 * Below is the native functionality of "_flatten_blocks".
		 * Just to prevent fatal error if somehow user able to install this plugin on WP below 5.9.
		 */
		$all_blocks = array();
		$queue      = array();
		foreach ( $blocks as &$block ) {
			$queue[] = &$block;
		}

		$total = count( $queue );
		while ( $total > 0 ) {
			$block = &$queue[0];
			array_shift( $queue );
			$all_blocks[] = &$block;

			if ( ! empty( $block['innerBlocks'] ) ) {
				foreach ( $block['innerBlocks'] as &$inner_block ) {
					$queue[] = &$inner_block;
				}
			}
		}

		return $all_blocks;
	}

	/**
	 * Callback function for lower version.
	 *
	 * @param blocks $template_content .
	 *
	 * @return blocks.
	 */
	public function inject_theme_attribute_in_block_template_content( $template_content ) {
		if ( is_gutenverse_compatible() ) {
			// use Gutenberg or WP 5.9 & above version.
			return _inject_theme_attribute_in_block_template_content( $template_content );
		}

		/**
		 * Below is the native functionality of "_inject_theme_attribute_in_block_template_content".
		 * Just to prevent fatal error if somehow user able to install this plugin on WP below 5.9.
		 */
		$has_updated_content = false;
		$new_content         = '';
		$template_blocks     = parse_blocks( $template_content );

		$blocks = $this->flatten_blocks( $template_blocks );
		foreach ( $blocks as &$block ) {
			if (
				'core/template-part' === $block['blockName'] &&
				! isset( $block['attrs']['theme'] )
			) {
				$block['attrs']['theme'] = wp_get_theme()->get_stylesheet();
				$has_updated_content     = true;
			}
		}

		if ( $has_updated_content ) {
			foreach ( $template_blocks as &$block ) {
				$new_content .= serialize_block( $block );
			}

			return $new_content;
		}

		return $template_content;
	}

	/**
	 * Generate style for template.
	 */
	public function template_style_generator() {
		global $_wp_current_template_content, $_wp_current_template_id;
		if ( $_wp_current_template_id ) {
			$style                = null;
			$template             = explode( '//', $_wp_current_template_id );
			$updated_on           = false;
			$is_modified_template = false;
			$is_modified          = false;
			$query                = new WP_Query(
				array(
					'post_type' => array(
						'wp_template',
						'wp_template_part',
					),
					'name'      => $template[1],
				)
			);
			foreach ( $query->posts as $post ) {
				$terms                 = get_the_terms( $post->ID, 'wp_theme' );
				$template_updated_time = get_post_meta( $post->ID, 'template_modified_time', true );
				foreach ( $terms as $term ) {
					if ( $term->slug === $template['0'] ) {
						$updated_on = $post->post_modified;
						if ( $template_updated_time !== $updated_on ) {
							$is_modified_template = true;
							update_post_meta( $post->ID, 'template_modified_time', $updated_on );
						}
						break;
					}
				}
				if ( $updated_on ) {
					break;
				}
			}

			if ( ! empty( $_wp_current_template_content ) ) {
				$blocks      = $this->parse_blocks( $_wp_current_template_content );
				$blocks      = $this->flatten_blocks( $blocks );
				$is_modified = $this->check_modified( $blocks );
			}
			$upload_dir  = wp_upload_dir();
			$upload_path = $upload_dir['basedir'];
			$local_file  = $upload_path . '/gutenverse/css/gutenverse-template-generator-' . $template[1] . '.css';
			if ( $is_modified || $is_modified_template || ! file_exists( $local_file ) ) {
				if ( $blocks ) {
					$this->loop_blocks( $blocks, $style );
				}
				if ( ! empty( $style ) && ! empty( trim( $style ) ) ) {
					gutenverse_core_make_css_style( 'gutenverse-template-generator-' . $template[1], $style );
				}
			}
			if ( file_exists( $local_file ) ) {
				gutenverse_core_inject_css_file_to_header( 'gutenverse-template-generator-' . $template[1] );
			}
		}
	}
	/**
	 * Content Style Generator.
	 */
	public function content_style_generator() {
		global $post;
		$style            = null;
		$is_modified_post = false;
		$is_modified      = false;
		if ( $post ) {
			$content_updated_time = get_post_meta( $post->ID, 'content_modified_time', true );
			if ( $post->post_modified !== $content_updated_time ) {
				$is_modified_post = true;
				update_post_meta( $post->ID, 'content_modified_time', $post->post_modified );
			}
			if ( has_blocks( $post ) && isset( $post->post_content ) ) {
				$blocks      = $this->parse_blocks( $post->post_content );
				$blocks      = $this->flatten_blocks( $blocks );
				$is_modified = $this->check_modified( $blocks );
				$upload_dir  = wp_upload_dir();
				$upload_path = $upload_dir['basedir'];
				$local_file  = $upload_path . '/gutenverse/css/gutenverse-content-generator-' . $post->ID . '.css';
				if ( $is_modified || $is_modified_post || ! file_exists( $local_file ) ) {
					$this->loop_blocks( $blocks, $style );
					if ( ! empty( $style ) && ! empty( trim( $style ) ) ) {
						gutenverse_core_make_css_style( 'gutenverse-content-generator-' . $post->ID, $style );
					}
				}
				if ( file_exists( $local_file ) ) {
					gutenverse_core_inject_css_file_to_header( 'gutenverse-content-generator-' . $post->ID );
				}
			}
		}
	}

	/**
	 * Check Modified.
	 *
	 * @param array $blocks Array of blocks.
	 */
	public function check_modified( $blocks ) {
		$is_modified = false;
		foreach ( $blocks as $block ) {
			if ( 'core/template-part' === $block['blockName'] ) {
				$post_data = gutenverse_get_template_part_pattern_post_data( $block['attrs'], 'wp_template_part' );
				$parts     = null;
				if ( $post_data ) {
					$parts         = $post_data->post_content;
					$parts         = parse_blocks( $parts );
					$parts         = $this->flatten_blocks( $parts );
					$modified_date = get_post_meta( $post_data->ID, 'template_part_modified_time', true );
					if ( $post_data->post_modified !== $modified_date ) {
						$is_modified = true;
						update_post_meta( $post_data->ID, 'template_part_modified_time', $post_data->post_modified );
					}
					if ( ! $is_modified ) {
						$is_modified_loop = $this->check_modified( $parts );
						if ( $is_modified_loop ) {
							$is_modified = $is_modified_loop;
						}
					}
				}
			}

			if ( 'core/pattern' === $block['blockName'] ) {
				$post_data = gutenverse_get_template_part_pattern_post_data( $block['attrs'], 'wp_block' );
				$parts     = null;
				if ( $post_data ) {
					$parts         = $post_data->post_content;
					$parts         = parse_blocks( $parts );
					$parts         = $this->flatten_blocks( $parts );
					$modified_date = get_post_meta( $post_data->ID, 'pattern_modified_time', true );
					if ( $post_data->post_modified !== $modified_date ) {
						$is_modified = true;
						update_post_meta( $post_data->ID, 'pattern_modified_time', $post_data->post_modified );
					}
					if ( ! $is_modified ) {
						$is_modified_loop = $this->check_modified( $parts );
						if ( $is_modified_loop ) {
							$is_modified = $is_modified_loop;
						}
					}
				}
			}
			if ( 'core/block' === $block['blockName'] && isset( $block['attrs'] ) && isset( $block['attrs']['ref'] ) ) {
				$post_data = get_post( $block['attrs']['ref'] );
				if ( $post_data ) {
					$modified_date = get_post_meta( $post_data, 'block_modified_time', true );
					if ( $post_data->post_modified !== $modified_date ) {
						$is_modified = true;
						update_post_meta( $post_data->ID, 'block_modified_time', $post_data->post_modified );
					}
					if ( ! $is_modified ) {
						$reusables        = $this->parse_blocks( $post_data->post_content );
						$reusables        = $this->flatten_blocks( $reusables );
						$is_modified_loop = $this->check_modified( $reusables );
						if ( $is_modified_loop ) {
							$is_modified = $is_modified_loop;
						}
					}
				}
			}
			do_action_ref_array( 'gutenverse_check_modified', array( $block, $this ) );
		}
		return $is_modified;
	}
	/**
	 * Loop Block.
	 *
	 * @param array  $blocks Array of blocks.
	 * @param string $style Style string.
	 */
	public function loop_blocks( $blocks, &$style ) {
		foreach ( $blocks as $block ) {
			$this->generate_block_style( $block, $style );
			if ( 'core/template-part' === $block['blockName'] ) {
				$parts = $this->get_template_part_content( $block['attrs'] );
				$parts = parse_blocks( $parts );
				$parts = $this->flatten_blocks( $parts );
				if ( $parts ) {
					$this->loop_blocks( $parts, $style );
				}
				$this->inject_template_part( $block );
			}

			if ( 'core/pattern' === $block['blockName'] ) {
				$parts = $this->get_pattern_content( $block['attrs'] );
				$parts = parse_blocks( $parts );
				$parts = $this->flatten_blocks( $parts );
				if ( $parts ) {
					$this->loop_blocks( $parts, $style );
				}
			}

			if ( 'core/block' === $block['blockName'] && isset( $block['attrs'] ) && isset( $block['attrs']['ref'] ) ) {
				$reusables = get_post( $block['attrs']['ref'] );

				if ( $reusables ) {
					$reusables = $this->parse_blocks( $reusables->post_content );
					$reusables = $this->flatten_blocks( $reusables );
					if ( $reusables ) {
						$this->loop_blocks( $reusables, $style );
					}
				}
			}
			do_action_ref_array( 'gutenverse_loop_blocks', array( $block, &$style, $this ) );
		}
	}

	/**
	 * Add Template Part.
	 *
	 * @param array $block Block Part.
	 */
	public function inject_template_part( $block ) {
		add_filter(
			'gutenverse_inject_template_part',
			function ( $params ) use ( $block ) {
				$params[] = $block;
				return $params;
			}
		);
	}

	/**
	 * Generate Block Style.
	 *
	 * @param array  $block Detail of block.
	 * @param string $style Style string.
	 */
	public function generate_block_style( $block, &$style ) {
		$instance = $this->get_block_style_instance( $block['blockName'], $block['attrs'] );

		if ( ! is_null( $instance ) ) {
			$style    .= $instance->generate_style();
			$fonts     = $instance->get_fonts();
			$fonts_var = $instance->get_fonts_var();

			if ( ! empty( $fonts ) ) {
				$this->font_families = array_merge( $fonts, $this->font_families );
			}

			if ( ! empty( $fonts_var ) ) {
				$this->font_variables = array_merge( $fonts_var, $this->font_variables );
			}
		}
	}

	/**
	 * Get Template Part Content.
	 *
	 * @param array $attributes Attributes.
	 */
	public function get_template_part_content( $attributes ) {
		$template_part_id = null;
		$area             = WP_TEMPLATE_PART_AREA_UNCATEGORIZED;
		return gutenverse_template_part_content( $attributes, $template_part_id, $area );
	}

	/**
	 * Get Pattern Content.
	 *
	 * @param array $attributes Attributes.
	 */
	public function get_pattern_content( $attributes ) {
		$content = '';

		if ( isset( $attributes['slug'] ) ) {
			$block   = WP_Block_Patterns_Registry::get_instance()->get_registered( $attributes['slug'] );
			$content = isset( $block ) ? $block['content'] : $content;
		}
		return $content;
	}

	/**
	 * Get Block Style Instance.
	 *
	 * @param string $name Block Name.
	 * @param array  $attrs Block Attribute.
	 *
	 * @return Style_Abstract
	 */
	public function get_block_style_instance( $name, $attrs ) {
		$instance = null;

		switch ( $name ) {
			case 'gutenverse/section':
				$instance = new Section( $attrs );
				break;
			case 'gutenverse/column':
				$instance = new Column( $attrs );
				break;
			case 'gutenverse/wrapper':
				$instance = new Wrapper( $attrs );
				break;
		}

		$instance = apply_filters( 'gutenverse_block_style_instance', $instance, $name, $attrs );

		return $instance;
	}

	/**
	 * Loading fonts from global styles and variable
	 */
	public function load_global_fonts() {
		$variable_fonts      = apply_filters( 'gutenverse_font_header', Init::instance()->global_variable->get_global_variable( 'google' ) );
		$custom_fonts        = apply_filters( 'gutenverse_font_header', Init::instance()->global_variable->get_global_variable( 'custom_font_pro' ) );
		$this->font_families = array_merge( apply_filters( 'gutenverse_custom_font_pro', $variable_fonts, $custom_fonts ), $this->font_families );
	}

	/**
	 * Parse Guten Block.
	 *
	 * @param string $content the content string.
	 * @since 1.1.0
	 */
	public function parse_blocks( $content ) {
		global $wp_version;

		return ( version_compare( $wp_version, '5', '>=' ) ) ? parse_blocks( $content ) : parse_blocks( $content );
	}
}
