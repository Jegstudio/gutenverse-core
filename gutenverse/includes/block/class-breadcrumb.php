<?php
/**
 * Archive Title Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Breadcrumb Block
 *
 * @package gutenverse\block
 */
class Breadcrumb extends Block_Abstract {
	/**
	 * Render content
	 *
	 * @param int $post_id .
	 *
	 * @return string
	 */
	public function render_content( $post_id ) {
		return '<nav class="breadcrumb-nav">
					<ul>'
						. $this->render_breadcrumbs( $post_id ) .
					'</ul>
				</nav>';
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

		return '<div class="'
							. $element_id
							. $display_classes
							. $animation_class
							. $custom_classes
							. ' guten-breadcrumb guten-element">'
							. $this->render_content( $post_id ) .
				'</div>';
	}

	// === PRIVATE ===

	/**
	 * Undocumented function
	 *
	 * @param string $id id.
	 *
	 * @return string
	 */
	private function render_breadcrumbs( $id ) {
		$data        = $this->get_data( $id );
		$component   = '';
		$data_length = count( $data );

		for ( $index = 0; $index < $data_length; $index++ ) {

			$is_not_last = $index < ( $data_length - 1 );

			if ( $is_not_last ) {
				$component .= '
				<li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
					<a itemprop="item" href="' . $data[ $index ]['url'] . '">
						<span itemprop="name" class="breadcrumb-link">' . $data[ $index ]['name'] . '</span>
					</a>
				</li>
				<li class="separator">
                    <i class="' . $this->attributes['separatorIcon'] . '"></i>
                </li>';
			} else {
				$component .= '
				<li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                    <span itemprop="item">
                        <span itemprop="name" class="breadcrumb-text">' . $data[ $index ]['name'] . '</span>
                    </span>
                </li>';
			}
		}
		return $component;
	}

	/**
	 * Undocumented function
	 *
	 * @param string $id id.
	 *
	 * @return array
	 */
	private function get_data( $id ) {
		$front_page   = get_post( get_option( 'page_on_front' ) );
		$initial_data = array(
			$this->get_post_name_and_url( $front_page ),
		);
		if ( is_category() || is_tax() ) {
			return $this->taxonomy_category_data( $initial_data );
		}
		return array();
	}

	/**
	 * Undocumented function
	 *
	 * @param array $initial_data initial data.
	 *
	 * @return array
	 */
	private function taxonomy_category_data( $initial_data ) {
		$term        = get_queried_object();
		$ancestors   = get_ancestors( $term->term_id, $term->taxonomy );
		$hierarchy   = array_reverse( $ancestors );
		$hierarchy[] = $term->term_id;

		foreach ( $hierarchy as $id ) {
			$term_parent    = get_term( $id, $term->taxonomy );
			$initial_data[] = array(
				'name' => $term_parent->name,
				'url'  => get_term_link( $term_parent ),
			);
		}
		return $initial_data;
	}

	/**
	 * Undocumented function
	 *
	 * @param mixed $post post.
	 *
	 * @return array
	 */
	private function get_post_name_and_url( $post ) {
		if ( is_null( $post ) ) {
			return array();
		}
		return array(
			'name' => get_the_title( $post ),
			'url'  => get_permalink( $post ),
		);
	}
}
