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
	 * @var string
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

		if ( defined( 'REST_REQUEST' ) && REST_REQUEST ) {
			return $this->render_gutenberg();
		} else {
			return $this->render_frontend();
		}
	}

	/**
	 * Return empty content element
	 *
	 * @return mixed
	 */
	public function empty_content() {
		$text = esc_attr( $this->attributes['noContentText'] );
		$text = $text ? $text : '';

		$no_content = '<div class="guten-empty">' . $text . '</div>';

		return apply_filters( 'gutenverse_no_content', $no_content );
	}

	/**
	 * Block attributes
	 *
	 * @param array $attributes .
	 */
	public function set_attributes( $attributes ) {
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
	 * Transform class
	 *
	 * @return string
	 */
	protected function set_transform_class() {
		if ( empty( $this->attributes['transform'] ) ) {
			return;
		}

		$class = '';

		$duration         = ! empty( $this->attributes['transform']['duration'] );
		$ease             = ! empty( $this->attributes['transform']['ease'] );
		$perspective      = ! empty( $this->attributes['transform']['perspective'] ) ? $this->isset_device_value(
			$this->attributes['transform']['perspective'],
			function ( $value ) {
				return ! gutenverse_truly_empty( $value['point'] );
			}
		) : false;
		$transform_origin = ! empty( $this->attributes['transform']['transformOrigin'] ) ? $this->isset_device_value(
			$this->attributes['transform']['transformOrigin'],
			function ( $value ) {
				return ! gutenverse_truly_empty( $value );
			}
		) : false;
		$rotate_z         = ! empty( $this->attributes['transform']['rotateZ'] ) ? $this->isset_device_value(
			$this->attributes['transform']['rotateZ'],
			function ( $value ) {
				return ! gutenverse_truly_empty( $value['point'] );
			}
		) : false;
		$rotate_x         = ! empty( $this->attributes['transform']['rotateX'] ) ? $this->isset_device_value(
			$this->attributes['transform']['rotateX'],
			function ( $value ) {
				return ! gutenverse_truly_empty( $value['point'] );
			}
		) : false;
		$rotate_y         = ! empty( $this->attributes['transform']['rotateY'] ) ? $this->isset_device_value(
			$this->attributes['transform']['rotateY'],
			function ( $value ) {
				return ! gutenverse_truly_empty( $value['point'] );
			}
		) : false;
		$scale_x          = ! empty( $this->attributes['transform']['scaleX'] ) ? $this->isset_device_value(
			$this->attributes['transform']['scaleX'],
			function ( $value ) {
				return ! gutenverse_truly_empty( $value );
			}
		) : false;
		$scale_y          = ! empty( $this->attributes['transform']['scaleY'] ) ? $this->isset_device_value(
			$this->attributes['transform']['scaleY'],
			function ( $value ) {
				return ! gutenverse_truly_empty( $value );
			}
		) : false;
		$move_x           = ! empty( $this->attributes['transform']['moveX'] ) ? $this->isset_device_value(
			$this->attributes['transform']['moveX'],
			function ( $value ) {
				return ! gutenverse_truly_empty( $value['point'] );
			}
		) : false;
		$move_y           = ! empty( $this->attributes['transform']['moveY'] ) ? $this->isset_device_value(
			$this->attributes['transform']['moveY'],
			function ( $value ) {
				return ! gutenverse_truly_empty( $value['point'] );
			}
		) : false;
		$move_z           = ! empty( $this->attributes['transform']['moveZ'] ) ? $this->isset_device_value(
			$this->attributes['transform']['moveZ'],
			function ( $value ) {
				return ! gutenverse_truly_empty( $value['point'] );
			}
		) : false;
		$skew_x           = ! empty( $this->attributes['transform']['skewX'] ) ? $this->isset_device_value(
			$this->attributes['transform']['skewX'],
			function ( $value ) {
				return ! gutenverse_truly_empty( $value['point'] );
			}
		) : false;
		$skew_y           = ! empty( $this->attributes['transform']['skewY'] ) ? $this->isset_device_value(
			$this->attributes['transform']['skewY'],
			function ( $value ) {
				return ! gutenverse_truly_empty( $value['point'] );
			}
		) : false;
		$opacity          = ! empty( $this->attributes['transform']['opacity'] );
		$rotate_z_hover   = ! empty( $this->attributes['transform']['rotateZHover'] ) ? $this->isset_device_value(
			$this->attributes['transform']['rotateZHover'],
			function ( $value ) {
				return ! gutenverse_truly_empty( $value['point'] );
			}
		) : false;
		$rotate_x_hover   = ! empty( $this->attributes['transform']['rotateXHover'] ) ? $this->isset_device_value(
			$this->attributes['transform']['rotateXHover'],
			function ( $value ) {
				return ! gutenverse_truly_empty( $value['point'] );
			}
		) : false;
		$rotate_y_hover   = ! empty( $this->attributes['transform']['rotateYHover'] ) ? $this->isset_device_value(
			$this->attributes['transform']['rotateYHover'],
			function ( $value ) {
				return ! gutenverse_truly_empty( $value['point'] );
			}
		) : false;
		$scale_x_hover    = ! empty( $this->attributes['transform']['scaleXHover'] ) ? $this->isset_device_value(
			$this->attributes['transform']['scaleXHover'],
			function ( $value ) {
				return ! gutenverse_truly_empty( $value );
			}
		) : false;
		$scale_y_hover    = ! empty( $this->attributes['transform']['scaleYHover'] ) ? $this->isset_device_value(
			$this->attributes['transform']['scaleYHover'],
			function ( $value ) {
				return ! gutenverse_truly_empty( $value );
			}
		) : false;
		$move_x_hover     = ! empty( $this->attributes['transform']['moveXHover'] ) ? $this->isset_device_value(
			$this->attributes['transform']['moveXHover'],
			function ( $value ) {
				return ! gutenverse_truly_empty( $value['point'] );
			}
		) : false;
		$move_y_hover     = ! empty( $this->attributes['transform']['moveYHover'] ) ? $this->isset_device_value(
			$this->attributes['transform']['moveYHover'],
			function ( $value ) {
				return ! gutenverse_truly_empty( $value['point'] );
			}
		) : false;
		$move_z_hover     = ! empty( $this->attributes['transform']['moveZHover'] ) ? $this->isset_device_value(
			$this->attributes['transform']['moveZHover'],
			function ( $value ) {
				return ! gutenverse_truly_empty( $value['point'] );
			}
		) : false;
		$skew_x_hover     = ! empty( $this->attributes['transform']['skewXHover'] ) ? $this->isset_device_value(
			$this->attributes['transform']['skewXHover'],
			function ( $value ) {
				return ! gutenverse_truly_empty( $value['point'] );
			}
		) : false;
		$skew_y_hover     = ! empty( $this->attributes['transform']['skewYHover'] ) ? $this->isset_device_value(
			$this->attributes['transform']['skewYHover'],
			function ( $value ) {
				return ! gutenverse_truly_empty( $value['point'] );
			}
		) : false;
		$opacity_hover    = ! empty( $this->attributes['transform']['opacityHover'] );

		if ( $duration || $ease || $perspective || $transform_origin || $rotate_z || $rotate_x || $rotate_y || $scale_x || $scale_y || $move_x || $move_y || $move_z || $skew_x || $skew_y || $opacity || $rotate_z_hover || $rotate_x_hover || $rotate_y_hover || $scale_x_hover || $scale_y_hover || $move_x_hover || $move_y_hover || $move_z_hover || $skew_x_hover || $skew_y_hover || $opacity_hover ) {
			$class = ' gutenverse-transform';
		}

		return $class;
	}

	/**
	 * Isset device value
	 *
	 * @param array  $values .
	 * @param object $func .
	 *
	 * @return boolean
	 */
	private function isset_device_value( $values, $func ) {
		$devices = array( 'Desktop', 'Laptop', 'Tablet', 'Mobile' );
		$result  = false;

		foreach ( $devices as $device ) {
			if ( ! empty( $values[ $device ] ) ) {
				$result = $result || call_user_func( $func, $values[ $device ] );
			}
		}

		return $result;
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

		return $display_classes;
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

		return $animation_classes;
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
}
