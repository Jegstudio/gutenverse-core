<?php
/**
 * Gutenverse Flexible Wrapper
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Framework\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Flexible Wrapper
 *
 * @package gutenverse\style
 */
class Wrapper extends Style_Abstract {
	/**
	 * Block Name
	 *
	 * @var array
	 */
	protected $name = 'wrapper';

	/**
	 * Constructor
	 *
	 * @param array $attrs Attribute.
	 */
	public function __construct( $attrs ) {
		parent::__construct( $attrs );

		$this->set_feature(
			array(
				'background'        => array(
					'normal' => ".{$this->element_id}:not(.background-animated), .{$this->element_id}.background-animated > .guten-inner-wrap > .guten-background-animated .animated-layer",
					'hover'  => ".{$this->element_id}:not(.background-animated):hover, .{$this->element_id}.background-animated:hover > .guten-inner-wrap > .guten-background-animated .animated-layer",
				),
				'border'            => array(
					'normal' => ".{$this->element_id}",
					'hover'  => ".{$this->element_id}:hover",
				),
				'animation'         => ".{$this->element_id}",
				'advance'           => ".{$this->element_id}",
				'mask'              => null,
				'pointer'           => null,
				'cursor-effect'     => null,
				'background-effect' => ".{$this->element_id}> .guten-inner-wrap> .guten-background-effect",
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		$selector = ".{$this->element_id}.guten-element";

		if ( isset( $this->attrs['displayType'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $selector,
					'property'       => function ( $value ) {
						return "display: {$value};";
					},
					'value'          => $this->attrs['displayType'],
					'device_control' => false,
				)
			);

			if ( isset( $this->attrs['displayWidth'] ) && in_array( $this->attrs['displayType'], array( 'block', 'flex', 'grid' ), true ) ) {
				$this->inject_style(
					array(
						'selector'       => $selector,
						'property'       => function ( $value ) {
							return $this->handle_unit_point( $value, 'width', true );
						},
						'value'          => $this->attrs['displayWidth'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['displayHeight'] ) && in_array( $this->attrs['displayType'], array( 'block', 'flex', 'inline-block', 'grid' ), true ) ) {
				$this->inject_style(
					array(
						'selector'       => $selector,
						'property'       => function ( $value ) {
							return $this->handle_unit_point( $value, 'height' );
						},
						'value'          => $this->attrs['displayHeight'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['horizontalAlign'] ) && in_array( $this->attrs['displayType'], array( 'flex', 'grid' ), true ) ) {
				$this->inject_style(
					array(
						'selector'       => "{$selector}, {$selector} .guten-inner-wrap",
						'property'       => function ( $value ) {
							if ( 'default' === $value ) {
								return null;
							} else {
								return "justify-content: {$value};";
							}
						},
						'value'          => $this->attrs['horizontalAlign'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['verticalAlign'] ) && in_array( $this->attrs['displayType'], array( 'flex', 'grid' ), true ) ) {
				$this->inject_style(
					array(
						'selector'       => $selector,
						'property'       => function ( $value ) {
							if ( 'default' === $value ) {
								return null;
							} else {
								return "align-content: {$value}; align-items: {$value};";
							}
						},
						'value'          => $this->attrs['verticalAlign'],
						'device_control' => true,
					)
				);
			}
		}

		if ( isset( $this->attrs['backgroundOverlay'] ) ) {
			$this->handle_background( ".{$this->element_id} > .guten-background-overlay", $this->attrs['backgroundOverlay'] );
		}

		if ( isset( $this->attrs['backgroundOverlayHover'] ) ) {
			$this->handle_background( ".{$this->element_id}:hover > .guten-background-overlay", $this->attrs['backgroundOverlayHover'] );
		}

		if ( isset( $this->attrs['opacity'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} > .guten-background-overlay",
					'property'       => function ( $value ) {
						return "opacity: {$value};";
					},
					'value'          => $this->attrs['opacity'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['opacityHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}:hover > .guten-background-overlay",
					'property'       => function ( $value ) {
						return "opacity: {$value};";
					},
					'value'          => $this->attrs['opacityHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['displayOverflow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $selector,
					'property'       => function ( $value ) {
						return "overflow: {$value};";
					},
					'value'          => $this->attrs['displayOverflow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['positionType'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $selector,
					'property'       => function ( $value ) {
						return "position: {$value};";
					},
					'value'          => $this->attrs['positionType'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['positionLeft'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $selector,
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'left' );
					},
					'value'          => $this->attrs['positionLeft'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['positionRight'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $selector,
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'right' );
					},
					'value'          => $this->attrs['positionRight'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['positionTop'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $selector,
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'top' );
					},
					'value'          => $this->attrs['positionTop'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['positionBottom'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $selector,
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'bottom' );
					},
					'value'          => $this->attrs['positionBottom'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['blur'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-element.{$this->element_id}",
					'property'       => function ( $value ) {
						return "-webkit-backdrop-filter: blur({$value}px); backdrop-filter: blur({$value}px);";
					},
					'value'          => $this->attrs['blur'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['blurHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-element.{$this->element_id}:hover",
					'property'       => function ( $value ) {
						return "-webkit-backdrop-filter: blur({$value}px); backdrop-filter: blur({$value}px);";
					},
					'value'          => $this->attrs['blurHover'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['innerWrapWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-inner-wrap",
					'property'       => function ( $value ) {
						return "width: $value;";
					},
					'value'          => $this->attrs['innerWrapWidth'],
					'device_control' => true,
				)
			);
		}
	}
}
