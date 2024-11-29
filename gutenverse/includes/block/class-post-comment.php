<?php
/**
 * Post Comment Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

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

			$show_suffix  = $this->attributes['enableSuffix'];
			$suffix_main  = $this->attributes['suffixMain'];
			$suffix_reply = $this->attributes['suffixReply'];

			$data_settings = array(
				'enableSuffix' => "{$show_suffix}",
				'suffixMain'   => "{$suffix_main}",
				'suffixReply'  => "{$suffix_reply}",
			);

			$json_data = wp_json_encode( $data_settings );

			if ( ! empty( $comment_list ) ) {
				$comment_list = "<ol class='commentlist' data-settings='{$json_data}' >" . $comment_list . '</ol>';
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
		$post_id         = ! empty( $this->context['postId'] ) ? esc_html( $this->context['postId'] ) : get_the_ID();
		$element_id      = $this->get_element_id();
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();
		$custom_classes  = $this->get_custom_classes();

		return '<div class="' . $element_id . $display_classes . $animation_class . $custom_classes . ' guten-post-comment guten-element">' . $this->render_content( $post_id ) . '</div>';
	}
}
