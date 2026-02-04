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
	/**
	 * Render content
	 *
	 * @return string
	 */
	public function render_content() {
		// The Post Template block doesn't render much itself,
		// it acts as a wrapper for the inner blocks (Title, Image, etc.).
		// The context (current post) is set by the parent Query Loop block or global WP state.

		$content = '';
		if ( isset( $this->block->inner_blocks ) ) {
			foreach ( $this->block->inner_blocks as $inner_block ) {
				$content .= $inner_block->render();
			}
		}

		return '<div class="wp-block-post guten-post-template">' . $content . '</div>';
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
		return $this->render_content();
	}
}
