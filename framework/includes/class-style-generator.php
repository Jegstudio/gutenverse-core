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
	 * priority change to 10 and embed font after style generator with priority 11.
	 * to fix font not loaded in frontend for section that imported from libary.
	 */
	public function __construct() {
		add_action( 'gutenverse_include_frontend', array( $this, 'global_style_generator' ), 30 );
		add_action( 'gutenverse_include_frontend', array( $this, 'template_style_generator' ), 30 );
		add_action( 'gutenverse_include_frontend', array( $this, 'content_style_generator' ), 31 );
		add_action( 'gutenverse_include_frontend', array( $this, 'widget_style_generator' ) );
		add_action( 'gutenverse_include_frontend', array( $this, 'embeed_font_generator' ), 50 );
	}

	/**
	 * Get render mechanism.
	 *
	 * @return string
	 */
	public function get_render_mechanism() {
		return apply_filters( 'gutenverse_frontend_render_mechanism', 'direct' );
	}

	/**
	 * Render Style on Frontend.
	 *
	 * @todo: Jangan akses instance style cache secara langsung.
	 *
	 * @param string $name Name of Style.
	 * @param string $style Style Content.
	 * @param string $origin Origination of style.
	 */
	public function render_style( $name, $style, $origin ) {
		if ( apply_filters( 'gutenverse_render_generated_style', false, $name, $style, $origin ) ) {
			return;
		}

		wp_add_inline_style( 'gutenverse-frontend', $style );
	}

	/**
	 * Render CSS for Widget.
	 */
	public function widget_style_generator() {
		if ( current_theme_supports( 'widgets' ) ) {
			$widgets    = get_option( 'widget_block' );
			$style      = null;
			$style_name = 'gutenverse-widget';

			if ( apply_filters( 'gutenverse_bypass_generate_style', false, $style_name, 'widget' ) ) {
				return;
			}

			foreach ( $widgets as $widget ) {
				if ( isset( $widget['content'] ) ) {
					$blocks = $this->parse_blocks( $widget['content'] );
					$blocks = $this->flatten_blocks( $blocks );
					if ( $blocks ) {
						$this->loop_blocks( $blocks, $style );
					}
				}
			}

			do_action( 'gutenverse_after_style_loop_blocks' );

			$this->render_style( $style_name, $style, 'widget' );
		}
	}

	/**
	 * Global Style Generator.
	 */
	public function global_style_generator() {
		$variable = apply_filters( 'gutenverse_global_css', '' );

		if ( ! empty( trim( $variable ) ) ) {
			wp_add_inline_style( 'gutenverse-frontend', $variable );
		}
	}

	/**
	 * Embeed Font on Header.
	 */
	public function embeed_font_generator() {
		$this->font_families = $this->load_global_fonts();
		gutenverse_header_font( $this->font_families );
	}

	/**
	 * Callback function Flatten Blocks for lower version.
	 *
	 * @param blocks $blocks .
	 *
	 * @return blocks.
	 */
	public function flatten_blocks( $blocks ) {
		if ( gutenverse_compatible_check() ) {
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
		if ( gutenverse_compatible_check( '6.4' ) ) {
			// use Gutenberg or WP 6.4 & above version.
			return traverse_and_serialize_blocks( parse_blocks( $template_content ), '_inject_theme_attribute_in_template_part_block' );
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
			$style      = null;
			$template   = explode( '//', $_wp_current_template_id );
			$style_name = 'gutenverse-template-' . $template[1];

			if ( apply_filters( 'gutenverse_bypass_generate_style', false, $style_name, 'template' ) ) {
				return;
			}

			if ( ! empty( $_wp_current_template_content ) ) {
				$blocks = $this->parse_blocks( $_wp_current_template_content );
				$blocks = $this->flatten_blocks( $blocks );

				if ( $blocks ) {
					$this->loop_blocks( $blocks, $style );
				}

				if ( ! empty( $style ) && ! empty( trim( $style ) ) ) {
					$this->render_style( $style_name, $style, 'template' );
				}
			}

			do_action( 'gutenverse_after_style_loop_blocks' );
		}
	}

	/**
	 * Content Style Generator.
	 */
	public function content_style_generator() {
		global $post;
		if ( $post ) {
			$style      = null;
			$style_name = 'gutenverse-content-' . $post->ID;
			if ( apply_filters( 'gutenverse_bypass_generate_style', false, $style_name, 'content' ) ) {
				return;
			}

			if ( has_blocks( $post ) && isset( $post->post_content ) ) {
				$blocks = $this->parse_blocks( $post->post_content );
				$blocks = $this->flatten_blocks( $blocks );
				$this->loop_blocks( $blocks, $style );

				if ( ! empty( $style ) && ! empty( trim( $style ) ) ) {
					$this->render_style( $style_name, $style, 'content' );
				}
			}

			do_action( 'gutenverse_after_style_loop_blocks' );
		}
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
	 *
	 * @return array
	 */
	public function load_global_fonts() {
		$variable_fonts = apply_filters( 'gutenverse_font_header', Init::instance()->global_variable->get_global_variable( 'google' ) );
		$custom_fonts   = apply_filters( 'gutenverse_font_header', Init::instance()->global_variable->get_global_variable( 'custom_font_pro' ) );
		$the_fonts      = array_merge( apply_filters( 'gutenverse_custom_font_pro', $variable_fonts, $custom_fonts ), $this->font_families );

		return apply_filters( 'gutenverse_global_fonts', $the_fonts );
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
