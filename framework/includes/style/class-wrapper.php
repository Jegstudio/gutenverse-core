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
				'background' => array(
					'normal' => ".{$this->element_id}",
					'hover'  => ".{$this->element_id}:hover",
				),
				'border'     => array(
					'normal' => ".{$this->element_id}",
					'hover'  => ".{$this->element_id}:hover",
				),
				'animation'  => ".{$this->element_id}",
				'advance'    => ".{$this->element_id}",
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
					'property'       => function( $value ) {
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
						'property'       => function( $value ) {
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
						'property'       => function( $value ) {
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
						'selector'       => $selector,
						'property'       => function( $value ) {
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
						'property'       => function( $value ) {
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

		if ( isset( $this->attrs['displayOverflow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $selector,
					'property'       => function( $value ) {
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
					'property'       => function( $value ) {
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
					'selector'       => ".guten-element.{$this->element_id}:before",
					'property'       => function( $value ) {
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
					'selector'       => ".guten-element.{$this->element_id}:hover:before",
					'property'       => function( $value ) {
						return "-webkit-backdrop-filter: blur({$value}px); backdrop-filter: blur({$value}px);";
					},
					'value'          => $this->attrs['blurHover'],
					'device_control' => true,
				)
			);
		}
	}
}
