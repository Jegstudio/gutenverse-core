<?php
/**
 * Query Loop Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Post_Abstract;

/**
 * Class Query Loop Block
 *
 * @package gutenverse\block
 */
class Query_Loop extends Post_Abstract {
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
		$this->attributes['elementId'] = $this->get_element_id();
		$this->filter_post_attributes( $this->attributes );

		// Setup query arguments.
		$args = $this->build_query_args();

		$query = new \WP_Query( $args );

		$content = '';

		if ( $query->have_posts() ) {
			$display_classes = $this->set_display_classes();
			$animation_class = $this->set_animation_classes();
			$custom_classes  = $this->get_custom_classes();
			$element_id      = $this->get_element_id();

			$class = array(
				$element_id,
				$display_classes,
				$animation_class,
				$custom_classes,
				'guten-query-loop',
				'guten-element',
			);

			// Inner container for grid layout.
			$inner_class = array( 'guten-query-loop-container' );

			$inner_content = '';

			while ( $query->have_posts() ) {
				$query->the_post();
				// Use block_core_post_template logic if possible, or just render inner blocks.
				// Since we are iterating, we need to ensure the inner blocks (Post Template)
				// pick up the current post context content.

				// However, standard render_block_element() just renders inner blocks.
				// For Query Loop, we need to render the Post Template block for *each* post.

				// We'll rely on the inner blocks to handle their own rendering based on the global post object
				// which we've just set up with the_post().
				$inner_content .= $this->render_inner_blocks();
			}

			$content  = '<div class="' . implode( ' ', array_filter( $class ) ) . '">';
			$content .= '<div class="' . implode( ' ', $inner_class ) . '">' . $inner_content . '</div>';
			$content .= '</div>';

			wp_reset_postdata();
		} else {
			// Optional: Render "No posts found" message or empty state.
			$content = '<div class="guten-no-posts-found">' . esc_html__( 'No posts found.', 'gutenverse' ) . '</div>';
		}

		return $content;
	}

	/**
	 * Render Inner Blocks
	 * Helper to render inner blocks (Post Template) with proper context.
	 *
	 * @return string
	 */
	protected function render_inner_blocks() {
		$content = '';

		// Get current post ID and type from the loop.
		$post_id   = get_the_ID();
		$post_type = get_post_type();

		// Build context for inner blocks.
		$block_context = array(
			'postId'   => $post_id,
			'postType' => $post_type,
		);

		// Merge with existing context from parent.
		if ( isset( $this->block->context ) ) {
			$block_context = array_merge( $this->block->context, $block_context );
		}

		// Re-render each inner block with the new context.
		foreach ( $this->block->inner_blocks as $inner_block ) {
			// Create a new WP_Block instance with the updated context.
			$new_block = new \WP_Block( $inner_block->parsed_block, $block_context );
			$content  .= $new_block->render();
		}

		return $content;
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

	/**
	 * Build Query Arguments
	 *
	 * @return array
	 */
	protected function build_query_args() {
		// Reuse logic from Post_Abstract/Post_List if available or implement manually
		// Since Post_Abstract might already have this or similar, we check.
		// Assuming Post_Abstract has helper methods or we implement here based on attributes.

		$args = array(
			'post_type'      => isset( $this->attributes['postType'] ) ? $this->attributes['postType'] : 'post',
			'posts_per_page' => isset( $this->attributes['numberPost'] ) ? $this->attributes['numberPost'] : 3,
			'offset'         => isset( $this->attributes['postOffset'] ) ? $this->attributes['postOffset'] : 0,
			'post_status'    => 'publish',
		);

		// Sorting.
		$sort_by = isset( $this->attributes['sortBy'] ) ? $this->attributes['sortBy'] : 'latest';
		switch ( $sort_by ) {
			case 'oldest':
				$args['order']   = 'ASC';
				$args['orderby'] = 'date';
				break;
			case 'alphabet_asc':
				$args['order']   = 'ASC';
				$args['orderby'] = 'title';
				break;
			case 'alphabet_desc':
				$args['order']   = 'DESC';
				$args['orderby'] = 'title';
				break;
			case 'random':
				$args['orderby'] = 'rand';
				break;
			case 'latest':
			default:
				$args['order']   = 'DESC';
				$args['orderby'] = 'date';
				break;
		}

		// Include/Exclude.
		if ( ! empty( $this->attributes['includePost'] ) ) {
			$args['post__in'] = array_column( $this->attributes['includePost'], 'value' );
		}
		if ( ! empty( $this->attributes['excludePost'] ) ) {
			$args['post__not_in'] = array_column( $this->attributes['excludePost'], 'value' );
		}

		// Taxonomies.
		$tax_query = array();

		// Categories.
		if ( ! empty( $this->attributes['includeCategory'] ) ) {
			$tax_query[] = array(
				'taxonomy' => 'category',
				'field'    => 'term_id',
				'terms'    => array_column( $this->attributes['includeCategory'], 'value' ),
			);
		}
		if ( ! empty( $this->attributes['excludeCategory'] ) ) {
			$tax_query[] = array(
				'taxonomy' => 'category',
				'field'    => 'term_id',
				'terms'    => array_column( $this->attributes['excludeCategory'], 'value' ),
				'operator' => 'NOT IN',
			);
		}

		// Tags.
		if ( ! empty( $this->attributes['includeTag'] ) ) {
			$tax_query[] = array(
				'taxonomy' => 'post_tag',
				'field'    => 'term_id',
				'terms'    => array_column( $this->attributes['includeTag'], 'value' ),
			);
		}
		if ( ! empty( $this->attributes['excludeTag'] ) ) {
			$tax_query[] = array(
				'taxonomy' => 'post_tag',
				'field'    => 'term_id',
				'terms'    => array_column( $this->attributes['excludeTag'], 'value' ),
				'operator' => 'NOT IN',
			);
		}

		// Author.
		if ( ! empty( $this->attributes['includeAuthor'] ) ) {
			$args['author__in'] = array_column( $this->attributes['includeAuthor'], 'value' );
		}

		if ( ! empty( $tax_query ) ) {
			$tax_query['relation'] = 'AND';
			$args['tax_query']     = $tax_query;
		}

		return $args;
	}
}
