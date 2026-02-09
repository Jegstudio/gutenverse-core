<?php
/**
 * ACF Image Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class ACF_Image
 *
 * @package gutenverse\block
 */
class ACF_Image extends Block_Abstract {

	/**
	 * Render content
	 *
	 * @param int $post_id .
	 *
	 * @return string
	 */
	public function render_content( $post_id ) {
		$field_key = isset( $this->attributes['fieldKey'] ) ? $this->attributes['fieldKey'] : '';
		$size      = isset( $this->attributes['size'] ) ? $this->attributes['size'] : 'full';

		if ( empty( $field_key ) || ! function_exists( 'get_field' ) ) {
			return '';
		}

		$image = get_field( $field_key, $post_id );

		if ( ! $image ) {
			return '';
		}

		$img_html = '';

		if ( is_array( $image ) ) {
			// Image Object
			$img_html = wp_get_attachment_image( $image['ID'], $size );
		} elseif ( is_numeric( $image ) ) {
			// Image ID
			$img_html = wp_get_attachment_image( $image, $size );
		} elseif ( is_string( $image ) ) {
			// Image URL
			$img_html = '<img src="' . esc_url( $image ) . '" alt="" />';
		}

		return $img_html;
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
		$post_id         = ! empty( $this->context['postId'] ) ? esc_html( $this->context['postId'] ) : get_the_ID();
		$element_id      = $this->get_element_id();
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();
		$custom_classes  = $this->get_custom_classes();
		
		// Wrapper needed for consistency with editor structure usually
		return '<div class="' . $element_id . $display_classes . $animation_class . $custom_classes . ' guten-acf-image guten-element"><div class="guten-acf-image-container">' . $this->render_content( $post_id ) . '</div></div>';
	}
}
