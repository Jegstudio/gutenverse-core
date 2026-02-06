<?php
/**
 * Post Template Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Post Template Block
 *
 * @package gutenverse\block
 */
class Post_Template extends Block_Abstract {
	/**
	 * Block instance.
	 *
	 * @var \WP_Block
	 */
	protected $block;

	/**
	 * Render
	 *
	 * @param array  $attributes Attributes.
	 * @param string $content    Content.
	 * @param object $fulldata   Full Data (Block Instance).
	 *
	 * @return mixed
	 */
	public function render( $attributes, $content, $fulldata ) {
		$this->block = $fulldata;
		return parent::render( $attributes, $content, $fulldata );
	}

	/**
	 * Render content
	 *
	 * @return string
	 */
	public function render_content() {
		// Get posts from context (passed by Query Loop).
		$posts = $this->context['gutenverse/queryPosts'] ?? array();

		if ( empty( $posts ) ) {
			return '<div class="guten-no-posts-found">' . esc_html__( 'No posts found.', 'gutenverse' ) . '</div>';
		}

		$content = '';

		foreach ( $posts as $post ) {
			// Setup post data for template tags.
			setup_postdata( $post );

			// Render inner blocks for this post.
			$content .= $this->render_post_item( $post );
		}

		wp_reset_postdata();

		return $content;
	}

	/**
	 * Render a single post item with inner blocks.
	 *
	 * @param \WP_Post $post The post object.
	 *
	 * @return string
	 */
	protected function render_post_item( $post ) {
		// Build context for inner blocks.
		$block_context = array(
			'postId'   => $post->ID,
			'postType' => $post->post_type,
		);

		// Merge with existing context from parent.
		if ( isset( $this->block->context ) ) {
			$block_context = array_merge( $this->block->context, $block_context );
		}

		$inner_content = '';

		// Re-render each inner block with the post context.
		if ( isset( $this->block->inner_blocks ) ) {
			foreach ( $this->block->inner_blocks as $inner_block ) {
				// Create a new WP_Block instance with the updated context.
				$new_block      = new \WP_Block( $inner_block->parsed_block, $block_context );
				$inner_content .= $new_block->render();
			}
		}

		return $inner_content;
	}

	/**
	 * Render view in editor.
	 */
	public function render_gutenberg() {
		return $this->render_content();
	}

	/**
	 * Render view in frontend.
	 */
	public function render_frontend() {
		return $this->render_content();
	}
}
