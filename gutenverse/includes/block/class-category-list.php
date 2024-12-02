<?php
/**
 * Category List Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Post List Block
 *
 * @package gutenverse\block
 */
class Category_List extends Block_Abstract {
	/**
	 * Render content
	 *
	 *
	 * @return string
	 */
	public function render_content(  ) {
		
	}

	/**
	 * Render view in editor
	 */
	public function render_gutenberg() {
		return $this->render_content( true );
	}

	/**
	 * Render view in frontend
	 */
	public function render_frontend() {
		$element_id      = $this->get_element_id();
		$layout          = esc_attr( $this->attributes['layout'] );
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes(); 
		$custom_classes  = $this->get_custom_classes();

		return '<div class="' . $element_id . $display_classes . $animation_class . $custom_classes . ' layout-' . $layout . ' guten-post-list guten-element">' . $this->render_content() . '</div>';
	}
}
