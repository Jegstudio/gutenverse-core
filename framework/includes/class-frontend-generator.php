<?php
/**
 * Frontend Generator class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-framework
 */

namespace Gutenverse\Framework;

use WP_Block_Patterns_Registry;
use Gutenverse\Framework\Style\Column;
use Gutenverse\Framework\Style\Container;
use Gutenverse\Framework\Style\Wrapper;
use Gutenverse\Framework\Style\Section;

/**
 * Class Frontend Generator
 *
 * @since 2.3.0:
 *      - Class renamed from Style_Generator to Frontend_Generator
 *      - Add few functions to load scripts conditionally:
 *              - check_attributes
 *              - add_script
 *              - load_conditional_scripts
 *
 * @package gutenverse-framework
 */
class Frontend_Generator {
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
	 * List of scripts required to load
	 *
	 * @var array
	 */
	protected $script_list = array();

	/**
	 * List of styles required to load
	 *
	 * @var array
	 */
	protected $style_list = array();

	/**
	 * List of images required to preload
	 *
	 * @var array
	 */
	protected $preload_images = array();

	/**
	 * Template parts discovered while looping blocks.
	 *
	 * @var array
	 */
	protected $template_parts = array();

	/**
	 * Payload dependency stack.
	 *
	 * @var array
	 */
	protected $payload_dependency_stack = array();

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
		add_action( 'gutenverse_include_frontend', array( $this, 'load_conditional_scripts' ), 51 );
		add_action( 'gutenverse_include_frontend', array( $this, 'load_conditional_styles' ), 51 );
		add_action( 'gutenverse_include_frontend', array( $this, 'block_styles' ) );
		add_action( 'wp_head', array( $this, 'render_preload_images' ), 5 );
	}

	/**
	 * Render Style on Style.
	 *
	 * @todo: Jangan akses instance style cache secara langsung.
	 *
	 * @param string $name Name of Style.
	 * @param string|null $style Style Content.
	 * @param string $origin Origination of style.
	 * @param bool   $is_minified Whether style is already minified.
	 */
	public function render_style( $name, $style, $origin, $is_minified = false ) {
		if ( ! is_string( $style ) || '' === trim( $style ) ) {
			return;
		}

		wp_add_inline_style( 'gutenverse-dynamic-frontend-style', $is_minified ? $style : $this->minify_inline_css( $style ) );
	}

	/**
	 * Minify inline CSS without touching URL and string values.
	 *
	 * @param string $style CSS content.
	 *
	 * @return string
	 */
	protected function minify_inline_css( $style ) {
		if ( ! is_string( $style ) || '' === trim( $style ) ) {
			return '';
		}

		if ( ! apply_filters( 'gutenverse_frontend_minify_inline_css', true, $style ) ) {
			return $style;
		}

		$urls = array();
		$css  = preg_replace_callback(
			'/url\(\s*(?:"(?:\\\\.|[^"\\\\])*"|\'(?:\\\\.|[^\'\\\\])*\'|[^)])*\s*\)/i',
			function ( $matches ) use ( &$urls ) {
				$key          = '___GUTENVERSE_CSS_URL_' . count( $urls ) . '___';
				$urls[ $key ] = $matches[0];
				return $key;
			},
			$style
		);

		if ( null === $css ) {
			return $style;
		}

		$strings = array();
		$css     = preg_replace_callback(
			'/"(?:\\\\.|[^"\\\\])*"|\'(?:\\\\.|[^\'\\\\])*\'/',
			function ( $matches ) use ( &$strings ) {
				$key              = '___GUTENVERSE_CSS_STRING_' . count( $strings ) . '___';
				$strings[ $key ] = $matches[0];
				return $key;
			},
			$css
		);

		if ( null === $css ) {
			return $style;
		}

		$minified = preg_replace( '/\/\*(?!\!)[\s\S]*?\*\//', '', $css );
		$minified = null !== $minified ? preg_replace( '/\s+/', ' ', $minified ) : null;
		$minified = null !== $minified ? preg_replace( '/\s*([{}:;,>~])\s*/', '$1', $minified ) : null;
		$minified = null !== $minified ? preg_replace( '/;+\}/', '}', $minified ) : null;

		if ( null === $minified ) {
			return $style;
		}

		$css = $minified;
		$css = trim( $css );

		if ( ! empty( $strings ) ) {
			$css = strtr( $css, $strings );
		}

		if ( ! empty( $urls ) ) {
			$css = strtr( $css, $urls );
		}

		return $css;
	}

	/**
	 * Render CSS for Widget.
	 */
	public function widget_style_generator() {
		if ( current_theme_supports( 'widgets' ) ) {
			$widgets = get_option( 'widget_block' );
			$name    = 'gutenverse-widget';
			$source  = $this->get_widget_payload_source( $widgets );
			$style   = $this->apply_payload_cache(
				$source,
				function () use ( $widgets ) {
					$style = null;

					foreach ( gutenverse_secure_iterable( $widgets ) as $widget ) {
						if ( isset( $widget['content'] ) ) {
							$blocks = $this->parse_blocks( $widget['content'] );
							$blocks = $this->flatten_blocks( $blocks );
							if ( $blocks ) {
								$this->loop_blocks( $blocks, $style );
							}
						}
					}

					return $style;
				}
			);

			do_action( 'gutenverse_after_style_loop_blocks' );

			$this->render_style( $name, $style, 'widget', true );
		}
	}

	/**
	 * Global Style Generator.
	 */
	public function global_style_generator() {
		$name     = 'gutenverse-global';
		$source   = $this->get_global_payload_source();
		$variable = $this->apply_payload_cache(
			$source,
			function () {
				return apply_filters( 'gutenverse_global_css', '' );
			}
		);

		if ( ! empty( trim( $variable ) ) ) {
			$this->render_style( $name, $variable, 'global', true );
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
			$template = explode( '//', $_wp_current_template_id );
			$name     = isset( $template[1] ) ? 'gutenverse-template-' . $template[1] : 'gutenverse-template';
			$source   = $this->get_template_payload_source( $_wp_current_template_id, $_wp_current_template_content );
			$style    = $this->apply_payload_cache(
				$source,
				function () use ( $_wp_current_template_content ) {
					$style = null;

					if ( ! empty( $_wp_current_template_content ) ) {
						$blocks = $this->parse_blocks( $_wp_current_template_content );
						$blocks = $this->flatten_blocks( $blocks );

						if ( $blocks ) {
							$this->loop_blocks( $blocks, $style );
						}
					}

					return $style;
				}
			);

			$this->render_style( $name, $style, 'template', true );
			do_action( 'gutenverse_after_style_loop_blocks' );
		}
	}

	/**
	 * Content Style Generator.
	 */
	public function content_style_generator() {
		global $post;
		if ( $post ) {
			$name   = 'gutenverse-content-' . $post->ID;
			$source = $this->get_post_payload_source( $post );
			$style  = $this->apply_payload_cache(
				$source,
				function () use ( $post ) {
					$style = null;

					if ( has_blocks( $post ) && isset( $post->post_content ) ) {
						$blocks = $this->parse_blocks( $post->post_content );
						$blocks = $this->flatten_blocks( $blocks );
						$this->loop_blocks( $blocks, $style );
					}

					return $style;
				}
			);

			$this->render_style( $name, $style, 'content', true );
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
			$this->check_attributes( $block['attrs'], $block['blockName'] );

			// Template Part.
			if ( 'core/template-part' === $block['blockName'] ) {
				$style .= $this->get_template_part_payload_style( $block );
				$this->inject_template_part( $block );
			}

			// Pattern.
			if ( 'core/pattern' === $block['blockName'] ) {
				$style .= $this->get_pattern_payload_style( $block );
			}

			// Ref Block.
			if ( 'core/block' === $block['blockName'] && isset( $block['attrs'] ) && isset( $block['attrs']['ref'] ) ) {
				$style .= $this->get_reusable_payload_style( $block['attrs']['ref'] );
			}

			// Check for Background Attribute with fetchPriorityHigh.
			if ( isset( $block['attrs']['background']['type'] ) && 'video' === $block['attrs']['background']['type'] && ! empty( $block['attrs']['background']['videoImageFetchpriorityHigh'] ) ) {
				$bg         = $block['attrs']['background'];
				$image_urls = array();
				$image      = $bg['videoImage'];

				if ( isset( $image['Mobile']['image'] ) ) {
					$image_urls[] = $image['Mobile']['image'];
				} elseif ( isset( $image['Mobile']['url'] ) ) {
					$image_urls[] = $image['Mobile']['url'];
				} elseif ( isset( $image['Tablet']['image'] ) ) {
					$image_urls[] = $image['Tablet']['image'];
				} elseif ( isset( $image['Tablet']['url'] ) ) {
					$image_urls[] = $image['Tablet']['url'];
				} elseif ( isset( $image['image'] ) ) {
					$image_urls[] = $image['image'];
				} elseif ( isset( $image['url'] ) ) {
					$image_urls[] = $image['url'];
				} elseif ( isset( $image['Desktop']['image'] ) ) {
					$image_urls[] = $image['Desktop']['image'];
				} elseif ( isset( $image['Desktop']['url'] ) ) {
					$image_urls[] = $image['Desktop']['url'];
				}

				if ( ! empty( $image_urls ) ) {
					foreach ( $image_urls as $url ) {
						if ( $url ) {
							$this->preload_images[] = $url;
						}
					}
				}
			}
			if ( isset( $block['attrs']['background']['type'] ) && 'slide' === $block['attrs']['background']['type'] && ! empty( $block['attrs']['background']['sliderFallbackImageFetchpriorityHigh'] ) ) {
				$bg         = $block['attrs']['background'];
				$image_urls = array();
				$image      = $bg['sliderFallbackImage'];

				if ( isset( $image['Mobile']['image'] ) ) {
					$image_urls[] = $image['Mobile']['image'];
				} elseif ( isset( $image['Mobile']['url'] ) ) {
					$image_urls[] = $image['Mobile']['url'];
				} elseif ( isset( $image['Tablet']['image'] ) ) {
					$image_urls[] = $image['Tablet']['image'];
				} elseif ( isset( $image['Tablet']['url'] ) ) {
					$image_urls[] = $image['Tablet']['url'];
				} elseif ( isset( $image['image'] ) ) {
					$image_urls[] = $image['image'];
				} elseif ( isset( $image['url'] ) ) {
					$image_urls[] = $image['url'];
				} elseif ( isset( $image['Desktop']['image'] ) ) {
					$image_urls[] = $image['Desktop']['image'];
				} elseif ( isset( $image['Desktop']['url'] ) ) {
					$image_urls[] = $image['Desktop']['url'];
				}

				if ( ! empty( $image_urls ) ) {
					foreach ( $image_urls as $url ) {
						if ( $url ) {
							$this->preload_images[] = $url;
						}
					}
				}
			}
			if ( ! empty( $block['attrs']['background']['fetchPriorityHigh'] ) ) {
				$bg         = $block['attrs']['background'];
				$image_urls = array();

				if ( ! empty( $bg['useFeaturedImage'] ) && has_post_thumbnail() ) {
					$use_featured = $bg['useFeaturedImage'];
					if ( is_array( $use_featured ) ) {
						if ( ! empty( $use_featured['Desktop'] ) ) {
							$image_urls[] = get_the_post_thumbnail_url( get_the_ID(), 'full' );
						}
					} else { // Boolean or simple value.
						$image_urls[] = get_the_post_thumbnail_url( get_the_ID(), 'full' );
					}
				} elseif ( ! empty( $bg['type'] ) && 'slide' === $bg['type'] && ! empty( $bg['slideImage'] ) ) {
					$slide_images = $bg['slideImage'];

					if ( is_array( $slide_images ) && isset( $slide_images[0]['image']['image'] ) ) {
						$image_urls[] = $slide_images[0]['image']['image'];
					}
				} elseif ( ! empty( $bg['image'] ) ) {
					$image = $bg['image'];

					if ( isset( $image['Mobile']['image'] ) ) {
						$image_urls[] = $image['Mobile']['image'];
					} elseif ( isset( $image['Mobile']['url'] ) ) {
						$image_urls[] = $image['Mobile']['url'];
					} elseif ( isset( $image['Tablet']['image'] ) ) {
						$image_urls[] = $image['Tablet']['image'];
					} elseif ( isset( $image['Tablet']['url'] ) ) {
						$image_urls[] = $image['Tablet']['url'];
					} elseif ( isset( $image['image'] ) ) {
						$image_urls[] = $image['image'];
					} elseif ( isset( $image['url'] ) ) {
						$image_urls[] = $image['url'];
					} elseif ( isset( $image['Desktop']['image'] ) ) {
						$image_urls[] = $image['Desktop']['image'];
					} elseif ( isset( $image['Desktop']['url'] ) ) {
						$image_urls[] = $image['Desktop']['url'];
					}
				}

				if ( ! empty( $image_urls ) ) {
					foreach ( $image_urls as $url ) {
						if ( $url ) {
							$this->preload_images[] = $url;
						}
					}
				}
			}

			if ( ! empty( $block['attrs']['backgroundOverlay']['fetchPriorityHigh'] ) ) {
				$bg_overlay = $block['attrs']['backgroundOverlay'];

				if ( isset( $bg_overlay['image'] ) ) {
					$image      = $bg_overlay['image'];
					$image_urls = array();

					if ( isset( $image['Mobile']['image'] ) ) {
						$image_urls[] = $image['Mobile']['image'];
					} elseif ( isset( $image['Mobile']['url'] ) ) {
						$image_urls[] = $image['Mobile']['url'];
					} elseif ( isset( $image['Tablet']['image'] ) ) {
						$image_urls[] = $image['Tablet']['image'];
					} elseif ( isset( $image['Tablet']['url'] ) ) {
						$image_urls[] = $image['Tablet']['url'];
					} elseif ( isset( $image['image'] ) ) {
						$image_urls[] = $image['image'];
					} elseif ( isset( $image['url'] ) ) {
						$image_urls[] = $image['url'];
					} elseif ( isset( $image['Desktop']['image'] ) ) {
						$image_urls[] = $image['Desktop']['image'];
					} elseif ( isset( $image['Desktop']['url'] ) ) {
						$image_urls[] = $image['Desktop']['url'];
					}

					if ( ! empty( $image_urls ) ) {
						foreach ( $image_urls as $url ) {
							if ( $url ) {
								$this->preload_images[] = $url;
							}
						}
					}
				}
			}

			do_action_ref_array( 'gutenverse_loop_blocks', array( $block, &$style, $this ) );
		}
	}

	/**
	 * Render Preload Images
	 */
	public function render_preload_images() {
		global $post;
		static $printed_images = array();

		if ( ! empty( $this->preload_images ) ) {
			$this->preload_images = array_unique( $this->preload_images );
			foreach ( $this->preload_images as $image_url ) {
				if ( in_array( $image_url, $printed_images, true ) ) {
					continue;
				}

				printf( '<link rel="preload" fetchpriority="high" as="image" href="%s">' . "\n", esc_url( $image_url ) );
				$printed_images[] = $image_url;
			}
			$this->preload_images = array();
		}
	}

	/**
	 * Add Template Part.
	 *
	 * @param array $block Block Part.
	 */
	public function inject_template_part( $block ) {
		if ( $this->payload_item_exists( $block, $this->template_parts ) ) {
			return;
		}

		$this->template_parts[] = $block;

		add_filter(
			'gutenverse_inject_template_part',
			function ( $params ) use ( $block ) {
				$params[] = $block;
				return $params;
			}
		);
	}

	/**
	 * Check if payload item exists.
	 *
	 * @param mixed $item Payload item.
	 * @param array $items Payload items.
	 *
	 * @return bool
	 */
	protected function payload_item_exists( $item, $items ) {
		$key = $this->payload_item_key( $item );

		foreach ( $items as $existing ) {
			if ( $key === $this->payload_item_key( $existing ) ) {
				return true;
			}
		}

		return false;
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
	 * Get payload cache instance.
	 *
	 * @return Frontend_Cache|null
	 */
	protected function get_payload_cache() {
		$init = Init::instance();

		return isset( $init->frontend_cache ) ? $init->frontend_cache : null;
	}

	/**
	 * Get global payload source.
	 *
	 * @return array
	 */
	protected function get_global_payload_source() {
		$cache = $this->get_payload_cache();

		if ( ! $cache ) {
			return array();
		}

		return $cache->build_payload_source( 'global', 'global', 'global' );
	}

	/**
	 * Get widget payload source.
	 *
	 * @param mixed $widgets Widget option.
	 *
	 * @return array
	 */
	protected function get_widget_payload_source( $widgets ) {
		$cache = $this->get_payload_cache();

		if ( ! $cache ) {
			return array();
		}

		return $cache->build_payload_source( 'widget', 'blocks', wp_json_encode( $widgets ) );
	}

	/**
	 * Get template payload source.
	 *
	 * @param string $template_id Template ID.
	 * @param string $content Template content.
	 *
	 * @return array
	 */
	protected function get_template_payload_source( $template_id, $content ) {
		$cache = $this->get_payload_cache();

		if ( ! $cache ) {
			return array();
		}

		$content = is_string( $content ) ? $content : '';

		return $cache->build_payload_source(
			'template',
			$template_id,
			$content,
			0,
			$this->get_dynamic_source_context( $content )
		);
	}

	/**
	 * Get post payload source.
	 *
	 * @param \WP_Post $post Post object.
	 *
	 * @return array
	 */
	protected function get_post_payload_source( $post ) {
		$cache = $this->get_payload_cache();

		if ( ! $cache ) {
			return array();
		}

		$content  = isset( $post->post_content ) ? $post->post_content : '';
		$modified = ! empty( $post->post_modified_gmt ) ? strtotime( $post->post_modified_gmt . ' GMT' ) : 0;

		return $cache->build_payload_source(
			'post',
			$post->ID,
			$content,
			$modified,
			$this->get_dynamic_source_context( $content, $post->ID )
		);
	}

	/**
	 * Get template part payload style.
	 *
	 * @param array $block Template part block.
	 *
	 * @return string
	 */
	protected function get_template_part_payload_style( $block ) {
		$attributes       = isset( $block['attrs'] ) ? $block['attrs'] : array();
		$template_part_id = null;
		$area             = WP_TEMPLATE_PART_AREA_UNCATEGORIZED;
		$content          = gutenverse_template_part_content( $attributes, $template_part_id, $area );

		if ( empty( $content ) ) {
			return '';
		}

		$source = $this->get_template_part_payload_source( $attributes, $template_part_id, $content );

		return $this->apply_payload_cache(
			$source,
			function () use ( $content ) {
				$style = null;
				$parts = $this->parse_blocks( $content );
				$parts = $this->flatten_blocks( $parts );

				if ( $parts ) {
					$this->loop_blocks( $parts, $style );
				}

				return $style;
			}
		);
	}

	/**
	 * Get template part payload source.
	 *
	 * @param array       $attributes Template part attributes.
	 * @param string|null $template_part_id Template part ID.
	 * @param string      $content Template part content.
	 *
	 * @return array
	 */
	protected function get_template_part_payload_source( $attributes, $template_part_id, $content ) {
		$cache = $this->get_payload_cache();

		if ( ! $cache ) {
			return array();
		}

		$theme    = isset( $attributes['theme'] ) ? $attributes['theme'] : get_stylesheet();
		$slug     = isset( $attributes['slug'] ) ? $attributes['slug'] : md5( wp_json_encode( $attributes ) );
		$modified = 0;
		$post     = gutenverse_get_template_part_pattern_post_data( $attributes, 'wp_template_part' );

		if ( $post && ! empty( $post->post_modified_gmt ) ) {
			$modified = strtotime( $post->post_modified_gmt . ' GMT' );
		}

		$context = array(
			'theme'      => $theme,
			'attributes' => $attributes,
		);

		$context = array_merge( $context, $this->get_dynamic_source_context( $content ) );

		return $cache->build_payload_source(
			'template_part',
			$template_part_id ? $template_part_id : $slug,
			$content,
			$modified,
			$context
		);
	}

	/**
	 * Get pattern payload style.
	 *
	 * @param array $block Pattern block.
	 *
	 * @return string
	 */
	protected function get_pattern_payload_style( $block ) {
		$attributes = isset( $block['attrs'] ) ? $block['attrs'] : array();
		$content    = $this->get_pattern_content( $attributes );

		if ( empty( $content ) || empty( $attributes['slug'] ) ) {
			return '';
		}

		$source = $this->get_pattern_payload_source( $attributes['slug'], $content );

		return $this->apply_payload_cache(
			$source,
			function () use ( $content ) {
				$style = null;
				$parts = $this->parse_blocks( $content );
				$parts = $this->flatten_blocks( $parts );

				if ( $parts ) {
					$this->loop_blocks( $parts, $style );
				}

				return $style;
			}
		);
	}

	/**
	 * Get pattern payload source.
	 *
	 * @param string $slug Pattern slug.
	 * @param string $content Pattern content.
	 *
	 * @return array
	 */
	protected function get_pattern_payload_source( $slug, $content ) {
		$cache = $this->get_payload_cache();

		if ( ! $cache ) {
			return array();
		}

		return $cache->build_payload_source(
			'pattern',
			$slug,
			$content,
			0,
			$this->get_dynamic_source_context( $content )
		);
	}

	/**
	 * Get reusable block payload style.
	 *
	 * @param int $post_id Reusable block post ID.
	 *
	 * @return string
	 */
	protected function get_reusable_payload_style( $post_id ) {
		$reusable = get_post( $post_id );

		if ( ! $reusable ) {
			return '';
		}

		$source = $this->get_reusable_payload_source( $reusable );

		return $this->apply_payload_cache(
			$source,
			function () use ( $reusable ) {
				$style = null;
				$parts = $this->parse_blocks( $reusable->post_content );
				$parts = $this->flatten_blocks( $parts );

				if ( $parts ) {
					$this->loop_blocks( $parts, $style );
				}

				return $style;
			}
		);
	}

	/**
	 * Get reusable block payload source.
	 *
	 * @param \WP_Post $post Reusable block post.
	 *
	 * @return array
	 */
	protected function get_reusable_payload_source( $post ) {
		$cache = $this->get_payload_cache();

		if ( ! $cache ) {
			return array();
		}

		$modified = ! empty( $post->post_modified_gmt ) ? strtotime( $post->post_modified_gmt . ' GMT' ) : 0;

		return $cache->build_payload_source(
			'reusable',
			$post->ID,
			$post->post_content,
			$modified,
			$this->get_dynamic_source_context( $post->post_content )
		);
	}

	/**
	 * Get dynamic source context when CSS can depend on the current post.
	 *
	 * @param string   $content Source content.
	 * @param int|null $post_id Post ID.
	 *
	 * @return array
	 */
	protected function get_dynamic_source_context( $content, $post_id = null ) {
		$content = is_string( $content ) ? $content : '';

		if ( false === strpos( $content, 'useFeaturedImage' ) ) {
			return array();
		}

		$post_id = $post_id ? $post_id : get_the_ID();

		if ( ! $post_id ) {
			return array();
		}

		return array(
			'post_id'            => (int) $post_id,
			'featured_image_id'  => (int) get_post_thumbnail_id( $post_id ),
			'featured_image_url' => (string) get_the_post_thumbnail_url( $post_id, 'full' ),
		);
	}

	/**
	 * Apply payload cache around a source generator.
	 *
	 * @param array    $source Source descriptor.
	 * @param callable $generator Source generator.
	 *
	 * @return string
	 */
	protected function apply_payload_cache( $source, $generator ) {
		$cache = $this->get_payload_cache();

		if ( ! $cache || empty( $source ) || ! $cache->payload_cache_enabled() ) {
			return $this->minify_inline_css( (string) call_user_func( $generator ) );
		}

		if ( isset( $source['cacheable'] ) && ! $source['cacheable'] ) {
			$before = $this->snapshot_payload_state();
			$this->payload_dependency_stack[] = array();
			$style        = $this->minify_inline_css( (string) call_user_func( $generator ) );
			$dependencies = array_pop( $this->payload_dependency_stack );
			$payload      = $this->create_payload( $source, $style, $before, $dependencies );

			$this->register_payload_dependency( $source, $payload, false );

			return $style;
		}

		$payload = $cache->read_payload( $source );

		if ( $payload && $this->payload_dependencies_fresh( $payload ) ) {
			$this->replay_payload( $payload );
			$this->register_payload_dependency( $source, $payload, true );

			$style = isset( $payload['css'] ) ? (string) $payload['css'] : '';

			return ! empty( $payload['css_minified'] ) ? $style : $this->minify_inline_css( $style );
		}

		$lock = $cache->acquire_payload_generation_lock( $source );

		if ( ! $lock ) {
			$payload = $cache->wait_for_payload( $source );

			if ( $payload && $this->payload_dependencies_fresh( $payload ) ) {
				$this->replay_payload( $payload );
				$this->register_payload_dependency( $source, $payload, true );

				$style = isset( $payload['css'] ) ? (string) $payload['css'] : '';

				return ! empty( $payload['css_minified'] ) ? $style : $this->minify_inline_css( $style );
			}

			$style = $this->minify_inline_css( (string) call_user_func( $generator ) );
			$this->register_payload_dependency( $source );

			return $style;
		}

		$payload = $cache->read_payload( $source );

		if ( $payload && $this->payload_dependencies_fresh( $payload ) ) {
			$cache->release_payload_generation_lock( $lock );
			$this->replay_payload( $payload );
			$this->register_payload_dependency( $source, $payload, true );

			$style = isset( $payload['css'] ) ? (string) $payload['css'] : '';

			return ! empty( $payload['css_minified'] ) ? $style : $this->minify_inline_css( $style );
		}

		$before = $this->snapshot_payload_state();
		$this->payload_dependency_stack[] = array();
		$style        = $this->minify_inline_css( (string) call_user_func( $generator ) );
		$dependencies = array_pop( $this->payload_dependency_stack );
		$payload      = $this->create_payload( $source, $style, $before, $dependencies );
		$stored       = false;

		if ( $cache->should_write_payload( $source, $payload ) ) {
			$stored = $cache->write_payload( $source, $payload, $lock );
		}

		$cache->release_payload_generation_lock( $lock );
		$this->register_payload_dependency( $source, $payload, $stored );

		return $style;
	}

	/**
	 * Check payload dependencies.
	 *
	 * @param array $payload Payload.
	 * @param int   $depth Dependency depth.
	 *
	 * @return bool
	 */
	protected function payload_dependencies_fresh( $payload, $depth = 0 ) {
		if ( empty( $payload['dependencies'] ) || ! is_array( $payload['dependencies'] ) ) {
			return true;
		}

		if ( $depth > 5 ) {
			return false;
		}

		$cache = $this->get_payload_cache();

		foreach ( $payload['dependencies'] as $dependency ) {
			if ( isset( $dependency['cacheable'] ) && ! $dependency['cacheable'] ) {
				return false;
			}

			$current = $this->resolve_payload_dependency_source( $dependency );

			if ( ! $current || empty( $dependency['source_hash'] ) || $dependency['source_hash'] !== $current['hash'] ) {
				return false;
			}

			if ( ! empty( $dependency['has_dependencies'] ) && $cache ) {
				$dependency_payload = $cache->read_payload( $current );

				if ( ! $dependency_payload || ! $this->payload_dependencies_fresh( $dependency_payload, $depth + 1 ) ) {
					return false;
				}
			}
		}

		return true;
	}

	/**
	 * Resolve current dependency source.
	 *
	 * @param array $dependency Dependency.
	 *
	 * @return array|null
	 */
	protected function resolve_payload_dependency_source( $dependency ) {
		if ( empty( $dependency['source_type'] ) || ! isset( $dependency['source_id'] ) ) {
			return null;
		}

		switch ( $dependency['source_type'] ) {
			case 'global':
				return $this->get_global_payload_source();
			case 'widget':
				return $this->get_widget_payload_source( get_option( 'widget_block' ) );
			case 'post':
				$post = get_post( $dependency['source_id'] );
				return $post ? $this->get_post_payload_source( $post ) : null;
			case 'reusable':
				$post = get_post( $dependency['source_id'] );
				return $post ? $this->get_reusable_payload_source( $post ) : null;
			case 'pattern':
				$content = $this->get_pattern_content( array( 'slug' => $dependency['source_id'] ) );
				return $content ? $this->get_pattern_payload_source( $dependency['source_id'], $content ) : null;
			case 'template_part':
				$context    = isset( $dependency['source_context'] ) && is_array( $dependency['source_context'] ) ? $dependency['source_context'] : array();
				$attributes = isset( $context['attributes'] ) && is_array( $context['attributes'] ) ? $context['attributes'] : array();

				if ( empty( $attributes['slug'] ) && ! empty( $dependency['source_id'] ) ) {
					$parts              = explode( '//', $dependency['source_id'] );
					$attributes['slug'] = end( $parts );
				}

				$template_part_id = null;
				$area             = WP_TEMPLATE_PART_AREA_UNCATEGORIZED;
				$content          = gutenverse_template_part_content( $attributes, $template_part_id, $area );

				return $content ? $this->get_template_part_payload_source( $attributes, $template_part_id, $content ) : null;
			default:
				return null;
		}
	}

	/**
	 * Snapshot payload state before generation.
	 *
	 * @return array
	 */
	protected function snapshot_payload_state() {
		return array(
			'fonts'          => $this->font_families,
			'font_variables' => $this->font_variables,
			'scripts'        => $this->script_list,
			'styles'         => $this->style_list,
			'preload_images' => $this->preload_images,
			'template_parts' => $this->template_parts,
		);
	}

	/**
	 * Create payload from generated state.
	 *
	 * @param array  $source Source descriptor.
	 * @param string $style Generated CSS.
	 * @param array  $before State before generation.
	 * @param array  $dependencies Dependencies.
	 *
	 * @return array
	 */
	protected function create_payload( $source, $style, $before, $dependencies ) {
		$after = $this->snapshot_payload_state();

		return array(
			'css'            => $style,
			'css_minified'   => true,
			'fonts'          => $this->diff_payload_items( $after['fonts'], $before['fonts'] ),
			'font_variables' => $this->diff_payload_items( $after['font_variables'], $before['font_variables'] ),
			'scripts'        => $this->diff_payload_items( $after['scripts'], $before['scripts'] ),
			'styles'         => $this->diff_payload_items( $after['styles'], $before['styles'] ),
			'preload_images' => $this->diff_payload_items( $after['preload_images'], $before['preload_images'] ),
			'template_parts' => $this->diff_payload_items( $after['template_parts'], $before['template_parts'] ),
			'dependencies'   => $this->unique_payload_dependencies( $dependencies ),
		);
	}

	/**
	 * Replay payload effects.
	 *
	 * @param array $payload Payload.
	 */
	protected function replay_payload( $payload ) {
		$this->font_families = $this->merge_payload_items(
			isset( $payload['fonts'] ) ? $payload['fonts'] : array(),
			$this->font_families
		);

		$this->font_variables = $this->merge_payload_items(
			isset( $payload['font_variables'] ) ? $payload['font_variables'] : array(),
			$this->font_variables
		);

		$this->script_list = $this->merge_payload_items(
			$this->script_list,
			isset( $payload['scripts'] ) ? $payload['scripts'] : array()
		);

		$this->style_list = $this->merge_payload_items(
			$this->style_list,
			isset( $payload['styles'] ) ? $payload['styles'] : array()
		);

		$this->preload_images = $this->merge_payload_items(
			$this->preload_images,
			isset( $payload['preload_images'] ) ? $payload['preload_images'] : array()
		);

		if ( ! empty( $payload['template_parts'] ) && is_array( $payload['template_parts'] ) ) {
			foreach ( $payload['template_parts'] as $template_part ) {
				$this->inject_template_part( $template_part );
			}
		}
	}

	/**
	 * Register payload dependency in current parent frame.
	 *
	 * @param array      $source Source descriptor.
	 * @param array|null $payload Payload.
	 * @param bool       $stored Whether the payload was stored.
	 */
	protected function register_payload_dependency( $source, $payload = null, $stored = false ) {
		if ( empty( $this->payload_dependency_stack ) || empty( $source['type'] ) ) {
			return;
		}

		$index   = count( $this->payload_dependency_stack ) - 1;
		$payload = is_array( $payload ) ? $payload : array();

		$this->payload_dependency_stack[ $index ][] = array(
			'source_type'      => $source['type'],
			'source_id'        => $source['id'],
			'source_hash'      => $source['hash'],
			'source_modified'  => $source['modified'],
			'source_context'   => $source['context'],
			'cacheable'        => isset( $source['cacheable'] ) ? (bool) $source['cacheable'] : true,
			'stored'           => (bool) $stored,
			'has_dependencies' => ! empty( $payload['dependencies'] ),
		);
	}

	/**
	 * Diff payload items.
	 *
	 * @param array $after After state.
	 * @param array $before Before state.
	 *
	 * @return array
	 */
	protected function diff_payload_items( $after, $before ) {
		$known = array();
		$diff  = array();

		foreach ( gutenverse_secure_iterable( $before ) as $item ) {
			$known[ $this->payload_item_key( $item ) ] = true;
		}

		foreach ( gutenverse_secure_iterable( $after ) as $item ) {
			$key = $this->payload_item_key( $item );

			if ( ! isset( $known[ $key ] ) ) {
				$known[ $key ] = true;
				$diff[]        = $item;
			}
		}

		return $diff;
	}

	/**
	 * Merge payload items.
	 *
	 * @param array $base Base items.
	 * @param array $items New items.
	 *
	 * @return array
	 */
	protected function merge_payload_items( $base, $items ) {
		$known  = array();
		$merged = array();

		foreach ( array_merge( gutenverse_secure_iterable( $base ), gutenverse_secure_iterable( $items ) ) as $item ) {
			$key = $this->payload_item_key( $item );

			if ( ! isset( $known[ $key ] ) ) {
				$known[ $key ] = true;
				$merged[]      = $item;
			}
		}

		return $merged;
	}

	/**
	 * Unique payload dependencies.
	 *
	 * @param array $dependencies Dependencies.
	 *
	 * @return array
	 */
	protected function unique_payload_dependencies( $dependencies ) {
		return $this->merge_payload_items( array(), $dependencies );
	}

	/**
	 * Get payload item key.
	 *
	 * @param mixed $item Payload item.
	 *
	 * @return string
	 */
	protected function payload_item_key( $item ) {
		return is_scalar( $item ) ? (string) $item : md5( wp_json_encode( $item ) );
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
			case 'gutenverse/container':
				$instance = new Container( $attrs );
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

	/**
	 * Load attrs.
	 *
	 * @since 2.3.0
	 *
	 * @param array  $attrs attributes data.
	 * @param string $block_name block name.
	 */
	public function check_attributes( $attrs, $block_name ) {

		if ( empty( $attrs ) ) {
			return;
		}

		$conditions = array();

		if ( isset( $attrs['background'] ) ) {
			$conditions[] = array(
				'attr'     => $attrs['background'],
				'allow_if' => array(
					array(
						'id'       => 'type',
						'operator' => '===',
						'value'    => 'slide',
					),
				),
				'script'   => 'gutenverse-core-frontend-bg-slideshow-script',
			);

			$conditions[] = array(
				'attr'     => $attrs['background'],
				'allow_if' => array(
					array(
						'id'       => 'type',
						'operator' => '===',
						'value'    => 'video',
					),
				),
				'script'   => 'gutenverse-core-frontend-bg-video-script',
			);
		}

		if ( isset( $attrs['animation'] ) ) {
			$conditions[] = array(
				'attr'     => $attrs['animation'],
				'allow_if' => array(
					array(
						'id'       => 'type',
						'operator' => '!==',
						'value'    => 'none',
						'device'   => true,
					),
				),
				'script'   => 'gutenverse-core-frontend-animation-basic-script',
			);
		}

		$conditions = apply_filters( 'gutenverse_conditional_script_attributes', $conditions, $attrs, $block_name );

		foreach ( $conditions as $condition ) {
			$this->add_script( $condition );
		}
	}

	/**
	 * Conditionally enqueues a script based on attribute checks.
	 * If the 'device' parameter is present, it requires at least ONE device setting to pass the condition.
	 *
	 * @since 2.3.0
	 *
	 * @param array $args The script configuration array, including 'attr', 'allow_if', and 'script'.
	 */
	public function add_script( array $args ) {
		$can_load      = true;
		$script_handle = isset( $args['script'] ) ? $args['script'] : false;
		$style_handle  = isset( $args['style'] ) ? $args['style'] : false;

		if ( isset( $args['attr'], $args['allow_if'] ) ) {
			$attrs      = $args['attr'];
			$conditions = $args['allow_if'];

			foreach ( $conditions as $condition ) {
				$id       = $condition['id'];
				$operator = $condition['operator'];
				$value    = $condition['value'];

				if ( ! isset( $attrs[ $id ] ) ) {
					$can_load = false;
					break;
				}

				$attr_value = $attrs[ $id ];

				if ( isset( $condition['device'] ) ) {
					$device_condition_met = false;

					if ( is_array( $attr_value ) ) {
						foreach ( $attr_value as $device_setting_value ) {

							if ( $this->check_condition( $device_setting_value, $operator, $value ) ) {
								$device_condition_met = true;
								break;
							}
						}
					}

					if ( ! $device_condition_met ) {
						$can_load = false;
						break;
					}
				} elseif ( ! $this->check_condition( $attr_value, $operator, $value ) ) {
					$can_load = false;
					break;
				}
			}

			if ( ! $can_load ) {
				return;
			}
		}

		// Asumsikan pengecekan ada di element itu sendiri.
		if ( ! empty( $script_handle ) && ! in_array( $script_handle, $this->script_list, true ) ) {
			$this->script_list[] = $script_handle;
		}

		if ( ! empty( $style_handle ) && ! in_array( $style_handle, $this->style_list, true ) ) {
			$this->style_list[] = $style_handle;
		}
	}

	/**
	 * Helper method to securely check two values against a dynamic operator.
	 * Prevents security risks associated with using 'eval()'.
	 *
	 * @since 2.3.0
	 *
	 * @param mixed  $attr_value The value from the attributes array.
	 * @param string $operator The comparison operator (e.g., '===', '!==').
	 * @param mixed  $target_value The value to compare against.
	 *
	 * @return bool True if the condition is met, false otherwise.
	 */
	protected function check_condition( $attr_value, $operator, $target_value ) {
		switch ( $operator ) {
			case '===':
				return $attr_value === $target_value;
			case '!==':
				return $attr_value !== $target_value;
			case '==':
				return $attr_value == $target_value;
			case '!=':
				return $attr_value != $target_value;
			case '>':
				return $attr_value > $target_value;
			case '<':
				return $attr_value < $target_value;
			case '>=':
				return $attr_value >= $target_value;
			case '<=':
				return $attr_value <= $target_value;
			default:
				return false;
		}
	}

	/**
	 * Load the scripts
	 *
	 * @since 2.3.0
	 */
	public function load_conditional_scripts() {
		$include = array(
			'gutenverse-frontend-event',
		);

		wp_register_script(
			'gutenverse-core-frontend-animation-basic-script',
			GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/js/frontend/animation-basic.js',
			$include,
			GUTENVERSE_FRAMEWORK_VERSION,
			array(
				'in_footer' => true,
				'strategy'  => 'defer',
			)
		);

		wp_register_script(
			'gutenverse-core-frontend-bg-slideshow-script',
			GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/js/frontend/slideshow.js',
			$include,
			GUTENVERSE_FRAMEWORK_VERSION,
			array(
				'in_footer' => true,
				'strategy'  => 'defer',
			)
		);

		wp_register_script(
			'gutenverse-core-frontend-bg-video-script',
			GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/js/frontend/video.js',
			$include,
			GUTENVERSE_FRAMEWORK_VERSION,
			array(
				'in_footer' => true,
				'strategy'  => 'defer',
			)
		);

		$script_handles = $this->script_list;

		if ( ! is_array( $script_handles ) ) {
			return;
		}

		// remove duplicates.
		$script_handles = array_values( array_unique( $script_handles ) );

		if ( ! empty( $script_handles ) ) {
			foreach ( $script_handles as $handle ) {
				wp_enqueue_script( $handle );
			}
		}
	}

	/**
	 * Load conditional styles file
	 *
	 * @since 2.3.0
	 */
	public function load_conditional_styles() {
		$style_handles = $this->style_list;
		if ( ! is_array( $style_handles ) ) {
			return;
		}

		// remove duplicates.
		$style_handles = array_values( array_unique( $style_handles ) );

		if ( ! empty( $style_handles ) ) {
			foreach ( $style_handles as $handle ) {
				wp_enqueue_style( $handle );
			}
		}
	}

	/**
	 * Load the styles
	 *
	 * @since 2.3.0
	 */
	public function block_styles() {
		$blocks = array(
			'column',
			'container',
			'section',
			'wrapper',
		);

		foreach ( $blocks as $block ) {
			$handle = 'gutenverse-core-frontend-' . $block . '-style';

			wp_register_style(
				$handle,
				GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/css/frontend/' . $block . '.css',
				array(),
				GUTENVERSE_FRAMEWORK_VERSION
			);

			wp_style_add_data(
				$handle,
				'path',
				GUTENVERSE_FRAMEWORK_DIR . '/assets/css/frontend/' . $block . '.css'
			);
		}
	}
}
