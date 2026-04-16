<?php
/**
 * Column Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-framework\block
 */

namespace Gutenverse\Framework\Block;

/**
 * Class Column Block
 *
 * @package gutenverse-framework\block
 */
class Column extends Block_Abstract {

	/**
	 * Check if sticky is active.
	 *
	 * @param array $sticky Sticky attribute.
	 * @return bool
	 */
	private function is_sticky( $sticky ) {
		if ( empty( $sticky ) || ! is_array( $sticky ) ) {
			return false;
		}
		foreach ( $sticky as $value ) {
			if ( $value ) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Check if section vertical align allows sticky column.
	 *
	 * @param string $align Section vertical align value.
	 * @return bool
	 */
	private function is_align_sticky_column( $align ) {
		return in_array( $align, array( 'flex-start', 'center', 'flex-end' ), true );
	}

	/**
	 * Check if background animation is active.
	 *
	 * @param array $animation Background animated attribute.
	 * @return bool
	 */
	private function is_animation_active( $animation ) {
		return ! empty( $animation ) && isset( $animation['actions'] ) && is_array( $animation['actions'] ) && count( $animation['actions'] ) > 0;
	}

	/**
	 * Get data ID from element ID.
	 *
	 * @return string
	 */
	private function get_data_id() {
		$element_id = $this->get_element_id();
		$parts      = explode( '-', $element_id );
		return isset( $parts[1] ) ? $parts[1] : '';
	}

	/**
	 * Render advance animation data attributes.
	 *
	 * @return string
	 */
	private function render_advance_animation_data() {
		if ( isset( $this->attributes['advanceAnimation']['type'] ) && ! empty( $this->attributes['advanceAnimation']['type'] ) ) {
			$data_id = $this->get_data_id();
			if ( ! empty( $data_id ) ) {
				return ' data-id="' . esc_attr( $data_id ) . '"';
			}
		}
		return '';
	}

	/**
	 * Build sticky classes string from sticky attribute.
	 *
	 * @param array $sticky Sticky attribute.
	 * @return string
	 */
	private function get_sticky_device_classes( $sticky ) {
		if ( empty( $sticky ) || ! is_array( $sticky ) ) {
			return '';
		}
		$classes = array();
		foreach ( $sticky as $device => $value ) {
			if ( $value ) {
				$classes[] = 'sticky-' . strtolower( $device );
			}
		}
		return implode( ' ', $classes );
	}

	/**
	 * Render guten-data div with JSON data attributes.
	 *
	 * @param string $data_id       Data ID.
	 * @param bool   $is_can_sticky Is sticky active.
	 * @param bool   $is_bg_animated Is background animated active.
	 * @param bool   $is_slideshow  Is slideshow active.
	 * @return string
	 */
	private function render_guten_data( $data_id, $is_can_sticky, $is_bg_animated, $is_slideshow ) {
		if ( ! $is_can_sticky && ! $is_bg_animated && ! $is_slideshow ) {
			return '';
		}

		$output = '<div class="guten-data">';

		$json_flags = JSON_UNESCAPED_SLASHES;

		if ( $is_can_sticky ) {
			$sticky_data = array(
				'sticky'         => isset( $this->attributes['sticky'] ) ? $this->attributes['sticky'] : new \stdClass(),
				'stickyShowOn'   => isset( $this->attributes['stickyShowOn'] ) ? $this->attributes['stickyShowOn'] : 'both',
				'stickyPosition' => isset( $this->attributes['stickyPosition'] ) ? $this->attributes['stickyPosition'] : 'top',
				'stickyEase'     => isset( $this->attributes['stickyEase'] ) ? $this->attributes['stickyEase'] : 'none',
				'stickyDuration' => isset( $this->attributes['stickyDuration'] ) ? $this->attributes['stickyDuration'] : 0.25,
				'topSticky'      => isset( $this->attributes['topSticky'] ) ? $this->attributes['topSticky'] : new \stdClass(),
				'bottomSticky'   => isset( $this->attributes['bottomSticky'] ) ? $this->attributes['bottomSticky'] : new \stdClass(),
			);
			$output     .= '<div data-var="stickyData' . esc_attr( $data_id ) . '" data-value="' . esc_attr( wp_json_encode( $sticky_data, $json_flags ) ) . '"></div>';
		}

		if ( $is_bg_animated ) {
			$bg_animated = isset( $this->attributes['backgroundAnimated'] ) ? $this->attributes['backgroundAnimated'] : new \stdClass();
			$output     .= '<div data-var="bgAnimatedData' . esc_attr( $data_id ) . '" data-value="' . esc_attr( wp_json_encode( $bg_animated, $json_flags ) ) . '"></div>';
		}

		if ( $is_slideshow ) {
			$background  = isset( $this->attributes['background'] ) ? $this->attributes['background'] : array();
			$slide_image = isset( $background['slideImage'] ) ? $background['slideImage'] : array();
			$slide_data  = $background;
			unset( $slide_data['slideImage'] );
			$slide_data['slideLength'] = is_array( $slide_image ) ? count( $slide_image ) : 0;
			$output                   .= '<div data-var="backgroundSlideshow' . esc_attr( $data_id ) . '" data-value="' . esc_attr( wp_json_encode( $slide_data, $json_flags ) ) . '"></div>';
		}

		$output .= '</div>';

		return $output;
	}

	/**
	 * Render slideshow elements.
	 *
	 * @return string
	 */
	private function render_slide_elements() {
		$background  = isset( $this->attributes['background'] ) ? $this->attributes['background'] : array();
		$slide_image = isset( $background['slideImage'] ) ? $background['slideImage'] : array();
		$element_id  = $this->get_element_id();

		if ( empty( $slide_image ) || ! is_array( $slide_image ) ) {
			return '';
		}

		$output  = '<div class="bg-slideshow-container">';
		$output .= '<div class="bg-slideshow-item">';

		foreach ( $slide_image as $index => $image ) {
			$image_url = '';
			if ( isset( $image['image']['image'] ) && ! empty( $image['image']['image'] ) ) {
				$image_url = $image['image']['image'];
			}

			$slide_class = $element_id . '-slideshow-image slideshow-image';
			if ( 1 === $index ) {
				$slide_class .= ' current';
			} elseif ( 0 === $index ) {
				$slide_class .= ' previous';
			}

			$style_attr = ! empty( $image_url ) ? ' style="background-image: url(' . esc_url( $image_url ) . ')"' : '';

			$output .= '<div class="' . esc_attr( $element_id . '-child-slideshow slideshow-item-container item-' . $index ) . '">';
			$output .= '<div class="' . esc_attr( $slide_class ) . '"' . $style_attr . '></div>';
			$output .= '</div>';
		}

		$output .= '</div>';
		$output .= '</div>';

		return $output;
	}

	/**
	 * Render view in editor
	 */
	public function render_gutenberg() {
		return null;
	}

	/**
	 * Render view in frontend
	 */
	public function render_frontend() {
		if ( ! empty( trim( $this->block_data->inner_html ) ) && apply_filters( 'gutenverse_force_dynamic', false ) ) {
			return $this->content;
		}

		// Snapshot attributes before rendering inner blocks, since this class is a singleton
		// and nested block renders will overwrite $this->attributes.
		$attributes = $this->attributes;

		$element_id      = $this->get_element_id();
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();
		$custom_classes  = $this->get_custom_classes();
		$anchor          = isset( $attributes['anchor'] ) ? $attributes['anchor'] : '';

		// Extract attributes with defaults.
		$sticky                 = isset( $attributes['sticky'] ) ? $attributes['sticky'] : array();
		$sticky_position        = isset( $attributes['stickyPosition'] ) ? $attributes['stickyPosition'] : 'top';
		$section_vertical_align = isset( $attributes['sectionVerticalAlign'] ) ? $attributes['sectionVerticalAlign'] : 'default';
		$cursor_effect          = isset( $attributes['cursorEffect'] ) ? $attributes['cursorEffect'] : array();
		$background_overlay     = isset( $attributes['backgroundOverlay'] ) ? $attributes['backgroundOverlay'] : array();
		$background_overlay_h   = isset( $attributes['backgroundOverlayHover'] ) ? $attributes['backgroundOverlayHover'] : array();
		$background_animated    = isset( $attributes['backgroundAnimated'] ) ? $attributes['backgroundAnimated'] : array();
		$background_effect      = isset( $attributes['backgroundEffect'] ) ? $attributes['backgroundEffect'] : array();
		$background             = isset( $attributes['background'] ) ? $attributes['background'] : array();

		// Computed flags.
		$_is_sticky           = $this->is_sticky( $sticky );
		$is_align_sticky      = $this->is_align_sticky_column( $section_vertical_align );
		$is_can_sticky        = $_is_sticky && $is_align_sticky;
		$_is_bg_animated      = $this->is_animation_active( $background_animated );
		$is_slideshow         = isset( $background['slideImage'] ) && is_array( $background['slideImage'] ) && count( $background['slideImage'] ) > 0;
		$is_background_effect = ! empty( $background_effect ) && isset( $background_effect['type'] ) && 'none' !== $background_effect['type'];
		$using_featured_image = ! empty( $background['useFeaturedImage'] ) && ( ! empty( $background['useFeaturedImage']['Desktop'] ) || ! empty( $background['useFeaturedImage']['Tablet'] ) || ! empty( $background['useFeaturedImage']['Mobile'] ) );
		$cursor_effect_show   = ! empty( $cursor_effect['show'] );

		$data_id = $this->get_data_id();

		// Build column class name.
		$column_classes   = array();
		$column_classes[] = 'wp-block-gutenverse-column';
		$column_classes[] = 'guten-element';
		$column_classes[] = 'guten-column';
		$column_classes[] = $element_id;

		if ( ! empty( trim( $animation_class ) ) ) {
			$column_classes[] = trim( $animation_class );
		}
		if ( ! empty( trim( $display_classes ) ) ) {
			$column_classes[] = trim( $display_classes );
		}
		if ( ! empty( $custom_classes ) ) {
			$column_classes[] = $custom_classes;
		}

		// Sticky device classes (e.g. sticky-desktop sticky-tablet).
		$sticky_device_classes = $this->get_sticky_device_classes( $sticky );
		if ( ! empty( $sticky_device_classes ) ) {
			$column_classes[] = $sticky_device_classes;
		}

		if ( $is_can_sticky ) {
			$column_classes[] = 'guten-sticky';
			$column_classes[] = 'sticky-' . $sticky_position;
		}
		if ( $cursor_effect_show ) {
			$column_classes[] = 'guten-cursor-effect';
		}
		if ( $_is_bg_animated ) {
			$column_classes[] = 'background-animated';
		}
		if ( $is_background_effect ) {
			$column_classes[] = 'guten-background-effect-active';
		}
		if ( $is_slideshow ) {
			$column_classes[] = 'guten-background-slideshow';
		}
		if ( $using_featured_image ) {
			$column_classes[] = 'guten-using-featured-image';
		}

		$class_name = esc_attr( implode( ' ', array_filter( $column_classes ) ) );

		// Advance animation data attribute.
		$advance_anim_data = $this->render_advance_animation_data();

		// data-id attribute for sticky on the outer div.
		$sticky_data_id_attr = '';
		if ( $is_can_sticky ) {
			$sticky_data_id_attr = ' data-id="' . esc_attr( $data_id ) . '"';
		}

		// ID attribute.
		$id_attr = ! empty( $anchor ) ? ' id="' . esc_attr( $anchor ) . '"' : '';

		// Build output.
		$output = '<div class="' . $class_name . '"' . $advance_anim_data . $sticky_data_id_attr . $id_attr . '>';

		// FluidCanvasSave.
		$fluid_canvas = apply_filters( 'gutenverse_fluid_canvas_script', '', $attributes );
		if ( ! empty( $fluid_canvas ) ) {
			$output .= $fluid_canvas;
		}

		// Guten data div.
		$output .= $this->render_guten_data( $data_id, $is_can_sticky, $_is_bg_animated, $is_slideshow );

		// Slideshow elements.
		$slide_elements = $this->render_slide_elements();

		if ( $is_can_sticky ) {
			// Sticky wrapper layout.
			$output .= '<div class="sticky-wrapper" data-id="' . esc_attr( $data_id ) . '">';
			$output .= '<div class="guten-column-wrapper">';

			if ( $is_slideshow ) {
				$output .= $slide_elements;
			}
			if ( $is_background_effect ) {
				$output .= '<div class="guten-background-effect"><div class="inner-background-container"></div></div>';
			}
			if ( $_is_bg_animated ) {
				$output .= '<div class="guten-background-animated"><div class="animated-layer animated-' . esc_attr( $data_id ) . '"></div></div>';
			}
			if ( ! empty( $background_overlay ) || ! empty( $background_overlay_h ) ) {
				$output .= '<div class="guten-background-overlay"></div>';
			}

			$output .= $this->get_inner_blocks_content();
			$output .= '</div>';
			$output .= '</div>';
		} else {
			// Non-sticky layout.
			$output .= '<div class="guten-column-wrapper" data-id="' . esc_attr( $data_id ) . '">';

			if ( ! $_is_bg_animated && $is_slideshow ) {
				$output .= $slide_elements;
			}
			if ( $is_background_effect ) {
				$output .= '<div class="guten-background-effect"><div class="inner-background-container"></div></div>';
			}
			if ( $_is_bg_animated ) {
				$output .= '<div class="guten-background-animated" data-id="' . esc_attr( $data_id ) . '"><div class="animated-layer animated-' . esc_attr( $data_id ) . '">';
				if ( $is_slideshow ) {
					$output .= $slide_elements;
				}
				$output .= '</div></div>';
			}
			if ( ! empty( $background_overlay ) || ! empty( $background_overlay_h ) ) {
				$output .= '<div class="guten-background-overlay"></div>';
			}

			$output .= $this->get_inner_blocks_content();
			$output .= '</div>';
		}

		$output .= '</div>';

		// Apply filter hooks (matching the HOC composition from save.js).
		$output = apply_filters( 'gutenverse_cursor_move_effect_script', $output, $attributes, $element_id );
		$output = apply_filters( 'gutenverse_cursor_effect_script', $output, $attributes, $element_id );
		$output = apply_filters( 'gutenverse_background_effect_script', $output, $attributes, $element_id );
		$output = apply_filters( 'gutenverse_advance_animation_script', $output, $attributes, $element_id, 'column' );

		return $output;
	}
}
