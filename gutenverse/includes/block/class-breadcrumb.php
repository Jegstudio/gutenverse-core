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
		return '<nav>
					<ul>'
						. $this->render_breadcrumbs() .
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
							. ' guten-post-title guten-element">'
							. $this->render_content( $post_id ) .
				'</div>';
	}

	// === PRIVATE ===

	/**
	 * Undocumented function
	 *
	 * @return string
	 */
	private function render_breadcrumbs() {
		$data        = $this->get_data();
		$component   = '';
		$data_length = count( $data );

		for ( $index = 0; $index < $data_length; $index++ ) {

			$is_not_last = $index < ( $data_length - 1 );

			if ( $is_not_last ) {
				$component .= '
				<li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
					<a itemprop="item" href="' . $data[ $index ]['href'] . '">
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
	 * @return array
	 */
	private function get_data() {
		return array();
	}
}
