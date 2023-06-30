<?php
/**
 * Post Comment Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

/**
 * Class Post Comment Block
 *
 * @package gutenverse\block
 */
class Post_Comment extends Block_Abstract {
	/**
	 * $attributes, $content
	 *
	 * @param int $post_id .
	 *
	 * @return string
	 */
	public function render_content( $post_id ) {
		$post_id = $post_id ? $post_id : get_the_ID();

		if ( ! empty( $post_id ) ) {
			if ( post_password_required( $post_id ) ) {
				// render nothing if still locked.
				return null;
			}

			$comments = get_comments(
				array(
					'post_id' => $post_id,
					'status'  => 'approve',
				)
			);

			$comment_list = wp_list_comments(
				array(
					'per_page'          => 10,
					'reverse_top_level' => false,
					'echo'              => false,
				),
				$comments
			);

			if ( ! empty( $comment_list ) ) {
				$comment_list = '<ol class="commentlist">' . $comment_list . '</ol>';
			}

			if ( ! empty( $this->attributes['showForm'] ) ) {
				ob_start();
				comment_form( array(), $post_id );
				$content = ob_get_clean();

				return $comment_list . '<div class="comment-form">' . $content . '</div>';
			}

			return $comment_list;
		}

		return $this->empty_content();
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

		return '<div class="' . $element_id . $display_classes . $animation_class . ' guten-post-comment guten-element">' . $this->render_content( $post_id ) . '</div>';
	}
}
