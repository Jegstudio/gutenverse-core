<?php
/**
 * Post Content Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

/**
 * Class Post Content Block
 *
 * @package gutenverse\block
 */
class Post_Content extends Block_Abstract {
	/**
	 * Render content
	 *
	 * @param int $post_id .
	 *
	 * @return string
	 */
	public function render_content( $post_id ) {
		if ( ! empty( $post_id ) && post_password_required( $post_id ) ) {
			// show password form.
			return $this->protected_post( $post_id );
		}

		$post    = get_post( $post_id );
		$content = ! empty( $post->post_content ) ? $post->post_content : '';
		$blocks  = parse_blocks( $content );
		$content = '';

		// removed because some HTML tags styling became broken.
		remove_filter( 'the_content', 'wpautop' );

		if ( ! empty( $blocks ) ) {
			foreach ( $blocks as $block ) {
				// prevent loop if there is another post content block inside.
				if ( 'core/post-content' !== $block['blockName'] && 'gutenverse/post-content' !== $block['blockName'] ) {
					$content .= apply_filters( 'the_content', render_block( $block ) );
				}
			}
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
		$element_id      = $this->attributes['elementId'];
		$post_id         = esc_html( $this->context['postId'] );
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();

		return '<div class="' . $element_id . $display_classes . $animation_class . ' guten-post-content guten-element">' . $this->render_content( $post_id ) . '</div>';
	}
}
