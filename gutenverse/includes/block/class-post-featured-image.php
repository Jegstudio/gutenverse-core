<?php
/**
 * Post Featured Image Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

/**
 * Class Post Featured Image Block
 *
 * @package gutenverse\block
 */
class Post_Featured_Image extends Block_Abstract {
	/**
	 * Render content
	 *
	 * @param int $post_id .
	 *
	 * @return string
	 */
	public function render_content( $post_id ) {
		$element_id      = esc_html( $this->attributes['elementId'] );
		$post_link       = ! empty( $this->attributes['postLink'] ) ? $this->attributes['postLink'] : false;
		$placeholder_img = ! empty( $this->attributes['placeholderImg'] ) ? $this->attributes['placeholderImg'] : false;
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();
		$post_url        = get_post_permalink( $post_id );
		$post_featured   = get_the_post_thumbnail_url( $post_id, 'full' );
		$content         = '';

		if ( ! empty( $post_featured ) ) {
			$content = '<img src="' . $post_featured . '"/>';
		} elseif ( ! empty( $placeholder_img ) ) {
			$content = '<img src="' . esc_url( GUTENVERSE_URL . '/assets/img/img-placeholder.jpg' ) . '"/>';
		}

		if ( ! empty( $post_link ) && ! empty( $post_url ) ) {
			$content = '<a href="' . $post_url . '" class="' . $element_id . $display_classes . $animation_class . ' guten-element guten-post-featured-image">' . $content . '</a>';
		} else {
			$content = '<div class="' . $element_id . $display_classes . $animation_class . ' guten-element guten-post-featured-image">' . $content . '</div>';
		}

		return $content;
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
		$post_id = esc_html( $this->context['postId'] );

		return $this->render_content( $post_id );
	}
}
