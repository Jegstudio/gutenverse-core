<?php
/**
 * Post Title Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

/**
 * Class Post Title Block
 *
 * @package gutenverse\block
 */
class Post_Title extends Block_Abstract {
	/**
	 * Render content
	 *
	 * @param int $post_id .
	 *
	 * @return string
	 */
	public function render_content( $post_id ) {
		$html_tag    = esc_html( $this->attributes['htmlTag'] );
		$post_link   = ! empty( $this->attributes['postLink'] ) ? $this->attributes['postLink'] : false;
		$link_target = ! empty( $this->attributes['postLinkTarget'] ) ? '_blank' : '_self';
		$link_rel    = ! empty( $this->attributes['postLinkRel'] ) ? esc_html( $this->attributes['postLinkRel'] ) : 'noreferrer';
		$post_title  = $post_id ? get_the_title( $post_id ) : esc_html__( 'Post Title', 'gutenverse' );

		if ( $post_link ) {
			$post_url   = get_post_permalink( $post_id );
			$post_title = "<a href='{$post_url}' target='{$link_target}' rel='{$link_rel}'>{$post_title}</a>";
		}

		return "<{$html_tag}>{$post_title}</{$html_tag}>";
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

		return '<div class="' . $element_id . $display_classes . $animation_class . ' guten-post-title guten-element">' . $this->render_content( $post_id ) . '</div>';
	}
}
