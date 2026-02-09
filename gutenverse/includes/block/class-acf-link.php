<?php
/**
 * ACF Link Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class ACF_Link
 *
 * @package gutenverse\block
 */
class ACF_Link extends Block_Abstract {

	/**
	 * Render content
	 *
	 * @param int $post_id .
	 *
	 * @return string
	 */
	public function render_content( $post_id ) {
		$field_key = isset( $this->attributes['fieldKey'] ) ? $this->attributes['fieldKey'] : '';
		$label     = isset( $this->attributes['label'] ) ? $this->attributes['label'] : __( 'Learn More', 'gutenverse' );

		if ( empty( $field_key ) || ! function_exists( 'get_field' ) ) {
			return '';
		}

		$link = get_field( $field_key, $post_id );

		if ( ! $link ) {
			return '';
		}

		$url    = '';
		$title  = $label;
		$target = isset( $this->attributes['linkTarget'] ) ? $this->attributes['linkTarget'] : '_self';

		if ( is_array( $link ) ) {
			$url    = isset( $link['url'] ) ? $link['url'] : '';
			$title  = isset( $link['title'] ) && ! empty( $link['title'] ) ? $link['title'] : $label;
			$target = isset( $link['target'] ) ? $link['target'] : $target;
		} elseif ( is_string( $link ) ) {
			$url = $link;
		}

		if ( empty( $url ) ) {
			return '';
		}

		return '<a class="guten-button" href="' . esc_url( $url ) . '" target="' . esc_attr( $target ) . '"><span>' . esc_html( $title ) . '</span></a>';
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
		
		return '<div class="' . $element_id . $display_classes . $animation_class . $custom_classes . ' guten-acf-link guten-element"><div class="guten-acf-link-wrapper">' . $this->render_content( $post_id ) . '</div></div>';
	}
}
