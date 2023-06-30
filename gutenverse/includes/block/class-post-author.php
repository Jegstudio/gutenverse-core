<?php
/**
 * Post Author Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

/**
 * Class Post Author Block
 *
 * @package gutenverse\block
 */
class Post_Author extends Block_Abstract {
	/**
	 * Render content
	 *
	 * @param int $post_id .
	 *
	 * @return string
	 */
	public function render_content( $post_id ) {
		$type        = esc_html( $this->attributes['authorType'] );
		$html_tag    = esc_html( $this->attributes['htmlTag'] );
		$avatar      = ! empty( $this->attributes['authorAvatar'] ) ? $this->attributes['authorAvatar'] : false;
		$author_link = ! empty( $this->attributes['authorLink'] ) ? $this->attributes['authorLink'] : false;
		$link_target = ! empty( $this->attributes['authorLinkTarget'] ) ? '_blank' : '_self';
		$link_rel    = ! empty( $this->attributes['authorLinkRel'] ) ? esc_html( $this->attributes['authorLinkRel'] ) : 'noreferrer';
		$content     = '';

		if ( ! empty( $post_id ) ) {
			$post = get_post( $post_id );

			if ( ! empty( $post ) ) {
				$author_name = $this->get_author_name( $post, $type );

				if ( ! empty( $author_name ) ) {
					if ( $avatar ) {
						$content .= get_avatar( get_the_author_meta( 'email', $post->post_author ), 48 );
					}

					if ( $author_link ) {
						$author_url  = get_author_posts_url( $post->post_author );
						$author_name = "<a href='{$author_url}' target='{$link_target}' rel='{$link_rel}'>{$author_name}</a>";
					}

					$content .= "<{$html_tag}>{$author_name}</{$html_tag}>";
				}
			}
		}

		return $content;
	}

	/**
	 * Get author for current post
	 *
	 * @param \WP_Post $post Post object.
	 * @param display  $type string.
	 *
	 * @return string
	 */
	private function get_author_name( $post, $type = 'display_name' ) {
		$author_name = '';

		switch ( $type ) {
			case 'first_name':
				$author_name = get_the_author_meta( 'first_name', $post->post_author );
				break;
			case 'last_name':
				$author_name = get_the_author_meta( 'last_name', $post->post_author );
				break;
			case 'first_last':
				$author_name = sprintf( '%s %s', get_the_author_meta( 'first_name', $post->post_author ), get_the_author_meta( 'last_name', $post->post_author ) );
				break;
			case 'last_first':
				$author_name = sprintf( '%s %s', get_the_author_meta( 'last_name', $post->post_author ), get_the_author_meta( 'first_name', $post->post_author ) );
				break;
			case 'nick_name':
				$author_name = get_the_author_meta( 'nickname', $post->post_author );
				break;
			case 'display_name':
				$author_name = get_the_author_meta( 'display_name', $post->post_author );
				break;
			case 'user_name':
				$author_name = get_the_author_meta( 'user_login', $post->post_author );
				break;
			default:
				$author_name = esc_html__( 'Post Author', 'gutenverse' );
				break;
		}

		return $author_name;
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

		return '<div class="' . $element_id . $display_classes . $animation_class . ' guten-post-author guten-element">' . $this->render_content( $post_id ) . '</div>';
	}
}
