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

		add_action( 'wp_footer', array( $this, 'render_template' ) );

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

		if ( ! isset( $this->attributes['animation'] ) ) {
			return '';
		}

		$is_animation = false;

		if ( isset( $this->attributes['animation']['type'] ) ) {
			$is_animation = ( ! empty( $this->attributes['animation']['type']['Desktop'] ) && 'none' !== $this->attributes['animation']['type']['Desktop'] ) || ( ! empty( $this->attributes['animation']['type']['Tablet'] ) && 'none' !== $this->attributes['animation']['type']['Tablet'] ) || ( ! empty( $this->attributes['animation']['type']['Mobile'] ) && 'none' !== $this->attributes['animation']['type']['Mobile'] );
		}

		if ( $is_animation ) {
			$animation_classes .= 'animated guten-element-hide ';
		}

		if ( isset( $this->attributes['animation']['duration'] ) && 'normal' !== $this->attributes['animation']['duration'] ) {
			$animation_classes .= "{$this->attributes['animation']['duration']} ";
		}

		if ( ! empty( $this->attributes['animation']['type']['Desktop'] ) && 'none' !== $this->attributes['animation']['type']['Desktop'] ) {
			$animation_classes .= "desktop-{$this->attributes['animation']['type']['Desktop']} ";
		}

		if ( ! empty( $this->attributes['animation']['type']['Tablet'] ) && 'none' !== $this->attributes['animation']['type']['Tablet'] ) {
			$animation_classes .= "desktop-{$this->attributes['animation']['type']['Tablet']} ";
		}

		if ( ! empty( $this->attributes['animation']['type']['Mobile'] ) && 'none' !== $this->attributes['animation']['type']['Mobile'] ) {
			$animation_classes .= "desktop-{$this->attributes['animation']['type']['Mobile']} ";
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
			<p>' . esc_html__( 'This content is password protected. To view it please enter this post password below:', '--gctd--' ) . '</p>
			<div class="guten-pass-inputs">
				<input class="guten-input" name="post_password" id="pwbox-' . esc_attr( $post_id ) . '" type="password" size="20"/>
				<input class="guten-submit" type="submit" name="Submit" value="' . esc_attr( esc_html__( 'Enter', '--gctd--' ) ) . '"/>
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
	 * Render Template in wp_footer
	 *
	 * @return mixed
	 */
	public function render_template() {
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

	/**
	 * Render Icon
	 *
	 * @param string $type                Icon type.
	 * @param string $icon                Icon class.
	 * @param string $svg                 SVG data.
	 * @param string $element_id          Element ID.
	 * @param array  $icon_gradient       Icon Gradient.
	 * @param array  $icon_gradient_hover Icon Gradient Hover.
	 *
	 * @return string
	 */
	protected function render_icon( $type, $icon, $svg, $element_id = '', $icon_gradient = false, $icon_gradient_hover = false ) {
		if ( 'svg' === $type && ! empty( $svg ) ) {
			// phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_decode
			$svg_data = base64_decode( $svg, true );

			$gradients = '';
			if ( $icon_gradient || $icon_gradient_hover ) {
				if ( empty( $element_id ) ) {
					$element_id = $this->get_element_id();
				}

				if ( $icon_gradient ) {
					$gradients .= $this->create_gradient_svg( $icon_gradient, 'iconGradient-' . $element_id );
				}

				if ( $icon_gradient_hover ) {
					$gradients .= $this->create_gradient_svg( $icon_gradient_hover, 'iconGradientHover-' . $element_id );
				}
			}

			if ( ! empty( $gradients ) ) {
				$svg_data .= '<svg style="width:0;height:0;position:absolute;" aria-hidden="true" focusable="false"><defs>' . $gradients . '</defs></svg>';
			}

			return '<div class="gutenverse-icon-svg">' . $svg_data . '</div>';
		}
		return '<i aria-hidden="true" class="' . esc_attr( $icon ) . '"></i>';
	}

	/**
	 * Create Gradient SVG
	 *
	 * @param array  $gradient Gradient data.
	 * @param string $id       Gradient ID.
	 *
	 * @return string
	 */
	protected function create_gradient_svg( $gradient, $id ) {
		$stops = '';
		if ( isset( $gradient['gradientColor'] ) && is_array( $gradient['gradientColor'] ) ) {
			foreach ( $gradient['gradientColor'] as $color ) {
				$stops .= '<stop offset="' . esc_attr( $color['offset'] ) . '" stop-color="' . esc_attr( $color['color'] ) . '"/>';
			}
		}

		$type = isset( $gradient['gradientType'] ) ? $gradient['gradientType'] : 'linear';

		if ( 'radial' === $type ) {
			$radial_pos = isset( $gradient['gradientRadial'] ) ? $gradient['gradientRadial'] : 'center center';
			$pos        = explode( ' ', $radial_pos );
			$cx         = '50%';
			$cy         = '50%';
			$map        = array(
				'left'   => '0%',
				'center' => '50%',
				'right'  => '100%',
				'top'    => '0%',
				'bottom' => '100%',
			);

			foreach ( $pos as $p ) {
				if ( isset( $map[ $p ] ) ) {
					if ( in_array( $p, array( 'left', 'right' ), true ) ) {
						$cx = $map[ $p ];
					} elseif ( in_array( $p, array( 'top', 'bottom' ), true ) ) {
						$cy = $map[ $p ];
					}
				}
			}

			return '<radialGradient id="' . esc_attr( $id ) . '" cx="' . $cx . '" cy="' . $cy . '" r="50%" fx="' . $cx . '" fy="' . $cy . '">
					' . $stops . '
				</radialGradient>';
		}

		$angle = isset( $gradient['gradientAngle'] ) ? (float) $gradient['gradientAngle'] : 180;
		$rad   = ( $angle * pi() ) / 180;

		$x1 = ( 50 - 50 * sin( $rad ) ) . '%';
		$y1 = ( 50 + 50 * cos( $rad ) ) . '%';
		$x2 = ( 50 + 50 * sin( $rad ) ) . '%';
		$y2 = ( 50 - 50 * cos( $rad ) ) . '%';

		return '<linearGradient id="' . esc_attr( $id ) . '" x1="' . $x1 . '" y1="' . $y1 . '" x2="' . $x2 . '" y2="' . $y2 . '">
					' . $stops . '
				</linearGradient>';
	}
}
