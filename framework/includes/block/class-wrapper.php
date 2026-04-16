<?php
/**
 * Wrapper Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-framework\block
 */

namespace Gutenverse\Framework\Block;

/**
 * Class Wrapper Block
 *
 * @package gutenverse-framework\block
 */
class Wrapper extends Block_Abstract {

	/**
	 * Render content
	 *
	 * @return string
	 */
	public function render_content() {
		return $this->get_inner_blocks_content();
	}

	/**
	 * Render view in editor
	 */
	public function render_gutenberg() {
		return $this->render_content();
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

		$element_id               = $this->get_element_id();
		$display_classes          = $this->set_display_classes();
		$animation_class          = $this->set_animation_classes();
		$display_type             = isset( $attributes['displayType'] ) ? $attributes['displayType'] : '';
		$cursor_effect            = isset( $attributes['cursorEffect'] ) ? $attributes['cursorEffect'] : array();
		$url                      = isset( $attributes['url'] ) ? $attributes['url'] : '';
		$link_target              = isset( $attributes['linkTarget'] ) ? $attributes['linkTarget'] : '';
		$background_overlay       = isset( $attributes['backgroundOverlay'] ) ? $attributes['backgroundOverlay'] : array();
		$background_overlay_hover = isset( $attributes['backgroundOverlayHover'] ) ? $attributes['backgroundOverlayHover'] : array();
		$background_animated      = isset( $attributes['backgroundAnimated'] ) ? $attributes['backgroundAnimated'] : array();
		$background_effect        = isset( $attributes['backgroundEffect'] ) ? $attributes['backgroundEffect'] : array();
		$background               = isset( $attributes['background'] ) ? $attributes['background'] : array();
		$is_slideshow         = ! empty( $background['slideImage'] ) && is_array( $background['slideImage'] ) && count( $background['slideImage'] ) > 0;
		$using_featured_image = ! empty( $background['useFeaturedImage'] ) && ( ! empty( $background['useFeaturedImage']['Desktop'] ) || ! empty( $background['useFeaturedImage']['Tablet'] ) || ! empty( $background['useFeaturedImage']['Mobile'] ) );
		$is_bg_animated       = $this->is_animation_active( $background_animated );
		$is_background_effect = ! empty( $background_effect ) && isset( $background_effect['type'] ) && 'none' !== $background_effect['type'];
		$cursor_effect_class  = ! empty( $cursor_effect['show'] ) ? ' guten-cursor-effect' : '';

		// Build data-id.
		$data_id  = '';
		$id_parts = explode( '-', $element_id );
		$short_id = count( $id_parts ) > 1 ? $id_parts[1] : '';

		// Advance animation data attribute.
		$advance_animation_attr = '';
		if ( isset( $attributes['advanceAnimation']['type'] ) && ! empty( $attributes['advanceAnimation']['type'] ) ) {
			$advance_animation_attr = ' data-id="' . esc_attr( $short_id ) . '"';
		}

		// Build classes.
		$class_name  = 'wp-block-gutenverse-wrapper guten-element guten-wrap-helper no-margin ' . $element_id;
		$class_name .= $animation_class;
		if ( ! empty( $display_type ) ) {
			$class_name .= ' ' . $display_type;
		}
		$class_name .= $display_classes;
		$class_name .= $cursor_effect_class;

		if ( $is_bg_animated ) {
			$class_name .= ' background-animated';
		}
		if ( ! empty( $url ) ) {
			$class_name .= ' with-url';
		}
		if ( $is_background_effect ) {
			$class_name .= ' guten-background-effect-active';
		}
		if ( $is_slideshow ) {
			$class_name .= ' guten-background-slideshow';
		}
		if ( $using_featured_image ) {
			$class_name .= ' guten-using-featured-image';
		}

		// onClick attribute.
		$onclick_attr = '';
		if ( ! empty( $url ) ) {
			$new_link_target = ( '_blank' === $link_target || true === $link_target ) ? '_blank' : '_self';
			$onclick_attr    = ' onClick="window.open(\'' . esc_url( $url ) . '\', \'' . esc_attr( $new_link_target ) . '\');"';
		}

		// Anchor id attribute.
		$anchor  = isset( $attributes['anchor'] ) ? $attributes['anchor'] : '';
		$id_attr = ! empty( $anchor ) ? ' id="' . esc_attr( $anchor ) . '"' : '';

		// Build output.
		$output = '<div class="' . esc_attr( trim( $class_name ) ) . '"' . $advance_animation_attr . $onclick_attr . $id_attr . '>';

		// Guten data div (bg animated data + slideshow data).
		if ( $is_bg_animated || $is_slideshow ) {
			$output .= '<div class="guten-data">';
			if ( $is_bg_animated ) {
				$output .= '<div data-var="bgAnimatedData' . esc_attr( $short_id ) . '" data-value="' . esc_attr( wp_json_encode( $background_animated ) ) . '"></div>';
			}
			if ( $is_slideshow ) {
				$slide_data                = $background;
				$slide_image               = isset( $slide_data['slideImage'] ) ? $slide_data['slideImage'] : array();
				$slide_data['slideLength'] = is_array( $slide_image ) ? count( $slide_image ) : 0;
				unset( $slide_data['slideImage'] );
				$output .= '<div data-var="backgroundSlideshow' . esc_attr( $short_id ) . '" data-value="' . esc_attr( wp_json_encode( $slide_data ) ) . '"></div>';
			}
			$output .= '</div>';
		}

		// FluidCanvasSave - apply filter (returns null by default).
		$fluid_canvas = apply_filters( 'gutenverse_fluid_canvas_script', '', $attributes );
		if ( ! empty( $fluid_canvas ) ) {
			$output .= $fluid_canvas;
		}

		// Video background.
		if ( isset( $background['type'] ) && 'video' === $background['type'] ) {
			$video_data = array(
				'url'         => isset( $background['videoLink'] ) ? $background['videoLink'] : '',
				'class'       => 'guten-video-bg-wrapper' . ( ! empty( $background['videoPlayOnMobile'] ) ? ' show-phone' : '' ),
				'width'       => '100%',
				'height'      => '100%',
				'playing'     => true,
				'muted'       => true,
				'loop'        => empty( $background['videoPlayOnce'] ),
				'playsinline' => true,
				'style'       => array(
					'zIndex'        => 0,
					'top'           => 0,
					'left'          => 0,
					'position'      => 'absolute',
					'overflow'      => 'hidden',
					'pointerEvents' => 'none',
				),
				'config'      => array(
					'youtube' => array(
						'playerVars' => array(
							'showinfo' => 0,
							'start'    => ! empty( $background['videoStartTime'] ) ? intval( $background['videoStartTime'] ) : 0,
							'end'      => ! empty( $background['videoEndTime'] ) ? intval( $background['videoEndTime'] ) : 0,
						),
					),
				),
			);
			$output    .= '<div class="guten-video-background" data-property="' . esc_attr( wp_json_encode( $video_data ) ) . '"></div>';
		}

		// Slideshow elements (when not bg animated).
		if ( ! $is_bg_animated && $is_slideshow ) {
			$output .= $this->render_slideshow_elements( $background, $element_id );
		}

		// Background overlay.
		if ( ! empty( $background_overlay ) || ! empty( $background_overlay_hover ) ) {
			$output .= '<div class="guten-background-overlay"></div>';
		}

		// Inner wrap.
		$output .= '<div class="guten-inner-wrap" data-id="' . esc_attr( $short_id ) . '">';

		// Background effect.
		if ( $is_background_effect ) {
			$output .= '<div class="guten-background-effect"><div class="inner-background-container"></div></div>';
		}

		// Background animated layer.
		if ( $is_bg_animated ) {
			$output .= '<div class="guten-background-animated"><div class="animated-layer animated-' . esc_attr( $short_id ) . '">';
			if ( $is_slideshow ) {
				$output .= $this->render_slideshow_elements( $background, $element_id );
			}
			$output .= '</div></div>';
		}

		// Inner blocks content.
		$output .= $this->render_content();

		$output .= '</div>'; // Close guten-inner-wrap.
		$output .= '</div>'; // Close wrapper.

		$output = apply_filters( 'gutenverse_cursor_move_effect_script', $output, $attributes, $element_id );
		$output = apply_filters( 'gutenverse_advance_animation_script', $output, $attributes, $element_id, 'wrapper' );
		$output = apply_filters( 'gutenverse_cursor_effect_script', $output, $attributes, $element_id, 'wrapper' );
		$output = apply_filters( 'gutenverse_background_effect_script', $output, $attributes, $element_id );

		return $output;
	}

	/**
	 * Check if background animation is active.
	 *
	 * @param array $background_animated Background animated data.
	 * @return bool
	 */
	private function is_animation_active( $background_animated ) {
		if ( empty( $background_animated ) ) {
			return false;
		}

		return isset( $background_animated['actions'] ) && is_array( $background_animated['actions'] ) && count( $background_animated['actions'] ) > 0;
	}

	/**
	 * Render slideshow elements.
	 *
	 * @param array  $background  Background data.
	 * @param string $element_id  Element ID.
	 * @return string
	 */
	private function render_slideshow_elements( $background, $element_id ) {
		$slide_images = isset( $background['slideImage'] ) ? $background['slideImage'] : array();

		if ( empty( $slide_images ) || ! is_array( $slide_images ) ) {
			return '';
		}

		$output  = '<div class="bg-slideshow-container">';
		$output .= '<div class="bg-slideshow-item">';

		foreach ( $slide_images as $index => $image ) {
			$image_url = '';
			if ( isset( $image['image']['image'] ) && ! empty( $image['image']['image'] ) ) {
				$image_url = $image['image']['image'];
			}

			$slide_class = '';
			if ( 1 === $index ) {
				$slide_class = ' current';
			} elseif ( 0 === $index ) {
				$slide_class = ' previous';
			}

			$output .= '<div class="' . esc_attr( $element_id ) . '-child-slideshow slideshow-item-container item-' . esc_attr( $index ) . '">';
			$output .= '<div class="' . esc_attr( $element_id ) . '-slideshow-image slideshow-image' . $slide_class . '"';
			if ( ! empty( $image_url ) ) {
				$output .= ' style="background-image: url(' . esc_url( $image_url ) . ')"';
			}
			$output .= '></div>';
			$output .= '</div>';
		}

		$output .= '</div>';
		$output .= '</div>';

		return $output;
	}
}
