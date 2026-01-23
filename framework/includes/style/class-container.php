<?php
/**
 * Gutenverse Container
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Framework\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Container
 *
 * @package gutenverse\style
 */
class Container extends Style_Abstract {
	/**
	 * Block Name
	 *
	 * @var array
	 */
	protected $name = 'container';

	/**
	 * Constructor
	 *
	 * @param array $attrs Attribute.
	 */
	public function __construct( $attrs ) {
		parent::__construct( $attrs );

		if ( empty( $this->element_id ) ) {
			return;
		}

		$this->set_feature(
			array(
				'background'        => array(
					'normal' => ".guten-flex-container.{$this->element_id}:not(.background-animated), .guten-flex-container.{$this->element_id}.background-animated > .guten-background-animated .animated-layer",
					'hover'  => ".guten-flex-container.{$this->element_id}:not(.background-animated):hover, .guten-flex-container.{$this->element_id}.background-animated:hover > .guten-background-animated .animated-layer",
				),
				'border'            => null,
				'animation'         => null,
				'advance'           => null,
				'positioning'       => ".guten-flex-container.{$this->element_id}",
				'mask'              => null,
				'pointer'           => ".guten-flex-container.{$this->element_id}",
				'cursor-effect'     => null,
				'background-effect' => null,
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		$container_layout = isset( $this->attrs['containerLayout'] ) ? $this->attrs['containerLayout'] : 'full-width';

		// For boxed layout, target the inner container.
		$content_selector = 'boxed' === $container_layout
			? ".guten-flex-container.{$this->element_id} > .guten-inner-container"
			: ".guten-flex-container.{$this->element_id}";

		// Container Width.
		if ( isset( $this->attrs['containerWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $content_selector,
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'width' );
					},
					'value'          => $this->attrs['containerWidth'],
					'device_control' => true,
				)
			);
		}

		// Min Height.
		if ( isset( $this->attrs['minHeight'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-flex-container.{$this->element_id}",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'min-height' );
					},
					'value'          => $this->attrs['minHeight'],
					'device_control' => true,
				)
			);
		}

		// Flex Direction.
		if ( isset( $this->attrs['flexDirection'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $content_selector,
					'property'       => function ( $value ) {
						return "flex-direction: {$value};";
					},
					'value'          => $this->attrs['flexDirection'],
					'device_control' => true,
				)
			);
		}

		// Justify Content.
		if ( isset( $this->attrs['justifyContent'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $content_selector,
					'property'       => function ( $value ) {
						return "justify-content: {$value};";
					},
					'value'          => $this->attrs['justifyContent'],
					'device_control' => true,
				)
			);
		}

		// Align Items.
		if ( isset( $this->attrs['alignItems'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $content_selector,
					'property'       => function ( $value ) {
						return "align-items: {$value};";
					},
					'value'          => $this->attrs['alignItems'],
					'device_control' => true,
				)
			);
		}

		// Column Gap.
		if ( isset( $this->attrs['columnGap'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $content_selector,
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'column-gap' );
					},
					'value'          => $this->attrs['columnGap'],
					'device_control' => true,
				)
			);
		}

		// Row Gap.
		if ( isset( $this->attrs['rowGap'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $content_selector,
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'row-gap' );
					},
					'value'          => $this->attrs['rowGap'],
					'device_control' => true,
				)
			);
		}

		// Flex Wrap.
		if ( isset( $this->attrs['flexWrap'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $content_selector,
					'property'       => function ( $value ) {
						return "flex-wrap: {$value};";
					},
					'value'          => $this->attrs['flexWrap'],
					'device_control' => true,
				)
			);
		}

		// Align Content.
		if ( isset( $this->attrs['alignContent'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $content_selector,
					'property'       => function ( $value ) {
						return "align-content: {$value};";
					},
					'value'          => $this->attrs['alignContent'],
					'device_control' => true,
				)
			);
		}

		// Overflow.
		if ( isset( $this->attrs['overflow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $content_selector,
					'property'       => function ( $value ) {
						return "overflow: {$value};";
					},
					'value'          => $this->attrs['overflow'],
					'device_control' => false,
				)
			);
		}

		/**
		 * Overlay.
		 */

		// Background Overlay.
		if ( isset( $this->attrs['backgroundOverlay'] ) ) {
			$this->handle_background( ".guten-flex-container.{$this->element_id} > .guten-background-overlay", $this->attrs['backgroundOverlay'] );
		}

		// Background Overlay Hover.
		if ( isset( $this->attrs['backgroundOverlayHover'] ) ) {
			$this->handle_background( ".guten-flex-container.{$this->element_id}:hover > .guten-background-overlay", $this->attrs['backgroundOverlayHover'] );
		}

		// Opacity.
		if ( isset( $this->attrs['opacity'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-flex-container.{$this->element_id} > .guten-background-overlay",
					'property'       => function ( $value ) {
						return "opacity: {$value};";
					},
					'value'          => $this->attrs['opacity'],
					'device_control' => false,
				)
			);
		}

		// Opacity Hover.
		if ( isset( $this->attrs['opacityHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-flex-container.{$this->element_id}:hover > .guten-background-overlay",
					'property'       => function ( $value ) {
						return "opacity: {$value};";
					},
					'value'          => $this->attrs['opacityHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['topDivider'] ) ) {
			$divider = $this->attrs['topDivider'];
			if ( isset( $divider['type'] ) && 'none' !== $divider['type'] ) {
				if ( isset( $divider['width'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} .guten-shape-divider.guten-shape-divider-top svg",
							'property'       => function ( $value ) {
								return "width: calc( {$value}% + 1.3px);";
							},
							'value'          => $divider['width'],
							'device_control' => true,
						)
					);
				}

				if ( isset( $divider['height'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} .guten-shape-divider.guten-shape-divider-top svg",
							'property'       => function ( $value ) {
								return "height: {$value}px;";
							},
							'value'          => $divider['height'],
							'device_control' => true,
						)
					);
				}

				if ( isset( $divider['color'] ) && ( ! isset( $divider['colorMode'] ) || 'default' === $divider['colorMode'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} .guten-shape-divider.guten-shape-divider-top .guten-shape-fill path",
							'property'       => function ( $value ) {
								return $this->handle_color( $value, 'fill' );
							},
							'value'          => $divider['color'],
							'device_control' => false,
						)
					);
				}
			}
		}

		if ( isset( $this->attrs['bottomDivider'] ) ) {
			$divider = $this->attrs['bottomDivider'];
			if ( isset( $divider['type'] ) && 'none' !== $divider['type'] ) {
				if ( isset( $divider['width'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} .guten-shape-divider.guten-shape-divider-bottom svg",
							'property'       => function ( $value ) {
								return "width: calc( {$value}% + 1.3px);";
							},
							'value'          => $divider['width'],
							'device_control' => true,
						)
					);
				}

				if ( isset( $divider['height'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} .guten-shape-divider.guten-shape-divider-bottom svg",
							'property'       => function ( $value ) {
								return "height: {$value}px;";
							},
							'value'          => $divider['height'],
							'device_control' => true,
						)
					);
				}

				if ( isset( $divider['color'] ) && ( ! isset( $divider['colorMode'] ) || 'default' === $divider['colorMode'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} .guten-shape-divider.guten-shape-divider-bottom .guten-shape-fill path",
							'property'       => function ( $value ) {
								return $this->handle_color( $value, 'fill' );
							},
							'value'          => $divider['color'],
							'device_control' => false,
						)
					);
				}
			}
		}

		if ( isset( $this->attrs['topDividerAnimated'] ) ) {
			$divider = $this->attrs['topDividerAnimated'];
			if ( isset( $divider['type'] ) && 'none' !== $divider['type'] ) {
				if ( isset( $divider['width'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} .guten-shape-divider-animated.guten-shape-divider-animated-top svg",
							'property'       => function ( $value ) {
								return "width: calc( {$value}% + 1.3px);";
							},
							'value'          => $divider['width'],
							'device_control' => true,
						)
					);
				}

				if ( isset( $divider['height'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} .guten-shape-divider-animated.guten-shape-divider-animated-top svg",
							'property'       => function ( $value ) {
								return "height: {$value}px;";
							},
							'value'          => $divider['height'],
							'device_control' => true,
						)
					);
				}
			}
		}

		if ( isset( $this->attrs['bottomDividerAnimated'] ) ) {
			$divider = $this->attrs['bottomDividerAnimated'];
			if ( isset( $divider['type'] ) && 'none' !== $divider['type'] ) {
				if ( isset( $divider['width'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} .guten-shape-divider-animated.guten-shape-divider-animated-bottom svg",
							'property'       => function ( $value ) {
								return "width: calc( {$value}% + 1.3px);";
							},
							'value'          => $divider['width'],
							'device_control' => true,
						)
					);
				}

				if ( isset( $divider['height'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} .guten-shape-divider-animated.guten-shape-divider-animated-bottom svg",
							'property'       => function ( $value ) {
								return "height: {$value}px;";
							},
							'value'          => $divider['height'],
							'device_control' => true,
						)
					);
				}
			}
		}

		do_action( 'gutenverse_container_style', $this, $this->attrs );
	}
}
