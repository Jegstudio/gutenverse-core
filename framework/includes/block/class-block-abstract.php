<?php
/**
 * Blocks Abstract class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-framework\block
 */

namespace Gutenverse\Framework\Block;

/**
 * Class Block Abstract
 *
 * @package gutenverse-framework\block
 */
abstract class Block_Abstract {
	/**
	 * Block Attributes.
	 *
	 * @var array
	 */
	protected $attributes;

	/**
	 * Block $context.
	 *
	 * @var array
	 */
	protected $context;

	/**
	 * Content.
	 *
	 * @var string
	 */
	protected $content;

	/**
	 * Manager.
	 *
	 * @var Object
	 */
	protected $manager;

	/**
	 * Render
	 *
	 * @param array  $attributes .
	 * @param string $content .
	 * @param object $fulldata .
	 *
	 * @return mixed
	 */
	public function render( $attributes, $content, $fulldata ) {
		$this->set_attributes( $attributes );
		$this->set_content( $content );
		$this->set_context( $fulldata );

		if ( ( defined( 'REST_REQUEST' ) && REST_REQUEST ) || gutenverse_is_block_editor() ) {
			return $this->render_gutenberg();
		} else {
			return $this->render_frontend();
		}
	}

	/**
	 * Get element ID.
	 *
	 * @return string
	 */
	protected function get_element_id() {
		$element_id = isset( $this->attributes['elementId'] ) ? $this->attributes['elementId'] : '';
		return esc_attr( $element_id );
	}

	/**
	 * Get element ID.
	 *
	 * @return string
	 */
	protected function get_custom_classes() {
		$custom_classes = isset( $this->attributes['className'] ) ? $this->attributes['className'] : '';
		return esc_attr( $custom_classes );
	}

	/**
	 * Return empty content element
	 *
	 * @return mixed
	 */
	public function empty_content() {
		$text = isset( $this->attributes['noContentText'] ) ? $this->attributes['noContentText'] : '';

		$no_content = '<div class="guten-empty">' . esc_html( $text ) . '</div>';

		return apply_filters( 'gutenverse_no_content', $no_content );
	}

	/**
	 * Block attributes
	 *
	 * @param array $attributes .
	 */
	public function set_attributes( $attributes ) {
		if ( isset( $attributes['editParam'] ) && $attributes['editParam'] ) {
			if ( isset( $attributes['editParam']['page'] ) && $attributes['editParam']['page'] ) {
				$attributes['paged'] = $attributes['editParam']['page'];
			}
		}
		$this->attributes = $attributes;
	}

	/**
	 * Content
	 *
	 * @param string $content .
	 */
	protected function set_content( $content ) {
		$this->content = $content;
	}

	/**
	 * Context
	 *
	 * @param object $fulldata .
	 */
	protected function set_context( $fulldata ) {
		$this->context = $fulldata->context;
	}

	/**
	 * Check truthy value
	 *
	 * @param boolean|string $attribute .
	 *
	 * @return boolean
	 */
	protected function attr_is_true( $attribute ) {
		return 'true' === $attribute || true === $attribute;
	}

	/**
	 * Display classes
	 *
	 * @return string
	 */
	protected function set_display_classes() {
		$display_classes = ' ';

		if ( isset( $this->attributes['hideDesktop'] ) && ( true === $this->attributes['hideDesktop'] || 'true' === $this->attributes['hideDesktop'] ) ) {
			$display_classes .= 'hide-desktop ';
		}

		if ( isset( $this->attributes['hideTablet'] ) && ( true === $this->attributes['hideTablet'] || 'true' === $this->attributes['hideTablet'] ) ) {
			$display_classes .= 'hide-tablet ';
		}

		if ( isset( $this->attributes['hideMobile'] ) && ( true === $this->attributes['hideMobile'] || 'true' === $this->attributes['hideMobile'] ) ) {
			$display_classes .= 'hide-mobile ';
		}

		return esc_attr( $display_classes );
	}

	/**
	 * Animation classes
	 *
	 * @return string
	 */
	protected function set_animation_classes() {
		$animation_classes = ' ';

		if ( ! isset( $this->attributes ['animation'] ) ) {
			return '';
		}

		$is_animation = false;

		if ( isset( $this->attributes ['animation']['type'] ) ) {
			$is_animation = ( ! empty( $this->attributes ['animation']['type']['Desktop'] ) && 'none' !== $this->attributes ['animation']['type']['Desktop'] ) || ( ! empty( $this->attributes ['animation']['type']['Tablet'] ) && 'none' !== $this->attributes ['animation']['type']['Tablet'] ) || ( ! empty( $this->attributes ['animation']['type']['Mobile'] ) && 'none' !== $this->attributes ['animation']['type']['Mobile'] );
		}

		if ( $is_animation ) {
			$animation_classes .= 'animated guten-element-hide ';
		}

		if ( isset( $this->attributes ['animation']['duration'] ) && 'normal' !== $this->attributes ['animation']['duration'] ) {
			$animation_classes .= "{$this->attributes ['animation']['duration']} ";
		}

		if ( ! empty( $this->attributes ['animation']['type']['Desktop'] ) && 'none' !== $this->attributes ['animation']['type']['Desktop'] ) {
			$animation_classes .= "desktop-{$this->attributes ['animation']['type']['Desktop']} ";
		}

		if ( ! empty( $this->attributes ['animation']['type']['Tablet'] ) && 'none' !== $this->attributes ['animation']['type']['Tablet'] ) {
			$animation_classes .= "desktop-{$this->attributes ['animation']['type']['Tablet']} ";
		}

		if ( ! empty( $this->attributes ['animation']['type']['Mobile'] ) && 'none' !== $this->attributes ['animation']['type']['Mobile'] ) {
			$animation_classes .= "desktop-{$this->attributes ['animation']['type']['Mobile']} ";
		}

		return esc_attr( $animation_classes );
	}

	/**
	 * Render protected post password
	 *
	 * @param int $post_id .
	 *
	 * @return HTML
	 */
	protected function protected_post( $post_id ) {
		return '<form action="' . home_url() . '/wp-login.php?action=postpass" class="guten-post-password-form" method="post">
			<p>' . esc_html__( 'This content is password protected. To view it please enter this post password below:', 'gutenverse' ) . '</p>
			<div class="guten-pass-inputs">
				<input class="guten-input" name="post_password" id="pwbox-' . esc_attr( $post_id ) . '" type="password" size="20"/>
				<input class="guten-submit" type="submit" name="Submit" value="' . esc_attr( esc_html__( 'Enter', 'gutenverse' ) ) . '"/>
			</div>
		</form>';
	}

	/**
	 * Render view in editor
	 *
	 * @return mixed
	 */
	public function render_gutenberg() {
		return null;
	}

	/**
	 * Render view in frontend
	 *
	 * @return mixed
	 */
	public function render_frontend() {
		return null;
	}

	/**
	 * Filter Tag
	 *
	 * @param string $tag .
	 * @param string $def .
	 */
	protected function check_tag( $tag, $def = 'p' ) {
		$filter = array( 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p' );

		if ( in_array( $tag, $filter, true ) ) {
			return $tag;
		}

		return $def;
	}
}
