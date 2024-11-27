<?php
/**
 * Gutenverse Section
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Framework\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Section
 *
 * @package gutenverse\style
 */
class Section extends Style_Abstract {
	/**
	 * Block Name
	 *
	 * @var array
	 */
	protected $name = 'section';

	/**
	 * Constructor
	 *
	 * @param array $attrs Attribute.
	 */
	public function __construct( $attrs ) {
		parent::__construct( $attrs );

		$element_id = explode( '-', $this->element_id )[1];

		$this->set_feature(
			array(
				'background'        => array(
					'normal' => ".{$this->element_id}:not(.background-animated), .{$this->element_id}.background-animated > .guten-background-animated .animated-layer",
					'hover'  => ".{$this->element_id}:not(.background-animated):hover, .{$this->element_id}.background-animated:hover > .guten-background-animated .animated-layer",
				),
				'border'            => null,
				'animation'         => null,
				'advance'           => null,
				'positioning'       => ".section-wrapper[data-id=\"{$element_id}\"]",
				'mask'              => null,
				'pointer'           => ".section-wrapper[data-id=\"{$element_id}\"]",
				'cursor-effect'     => null,
				'background-effect' => null,
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		if ( isset( $this->attrs['width'] ) && isset( $this->attrs['layout'] ) && 'boxed' === $this->attrs['layout'] ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.layout-boxed > .guten-container",
					'property'       => function ( $value ) {
						return "max-width: {$value}px;";
					},
					'value'          => $this->attrs['width'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['height'] ) && isset( $this->attrs['heightControl'] ) && 'min' === $this->attrs['heightControl'] ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} > .guten-container",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'min-height' );
					},
					'value'          => $this->attrs['height'],
					'device_control' => true,
				)
			);
		}

		if ( 'fit' === $this->attrs['heightControl'] ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}",
					'property'       => function ( $value ) {
						return 'height: 100vh;';
					},
					'value'          => $this->attrs['heightControl'],
					'device_control' => false,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} > .guten-container",
					'property'       => function ( $value ) {
						return 'height: 100%;';
					},
					'value'          => $this->attrs['heightControl'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['wrapColumn'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} > .guten-container",
					'property'       => function () {
						return 'flex-wrap: wrap;';
					},
					'value'          => $this->attrs['wrapColumn'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} > .guten-container > .guten-column",
					'property'       => function () {
						return 'width: 100%;';
					},
					'value'          => $this->attrs['wrapColumn'],
					'device_control' => true,
				)
			);
		}

		$selector = 'stretch' === $this->attrs['align'] ?
			"section.guten-element.{$this->element_id} > .guten-container > .guten-column > .sticky-wrapper > .guten-column-wrapper, .guten-section > .guten-container >  .guten-column > .guten-column-wrapper" :
			"section.guten-element.{$this->element_id} > .guten-container";
		if ( isset( $this->attrs['verticalAlign'] ) ) {
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
							'selector'       => "section.{$this->element_id} .guten-shape-divider.guten-shape-divider-top svg",
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
							'selector'       => "section.{$this->element_id} .guten-shape-divider.guten-shape-divider-top svg",
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
							'selector'       => "section.{$this->element_id} .guten-shape-divider.guten-shape-divider-top .guten-shape-fill path",
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
							'selector'       => "section.{$this->element_id} .guten-shape-divider.guten-shape-divider-bottom svg",
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
							'selector'       => "section.{$this->element_id} .guten-shape-divider.guten-shape-divider-bottom svg",
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
							'selector'       => "section.{$this->element_id} .guten-shape-divider.guten-shape-divider-bottom .guten-shape-fill path",
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
							'selector'       => "section.{$this->element_id} .guten-shape-divider-animated.guten-shape-divider-animated-top svg",
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
							'selector'       => "section.{$this->element_id} .guten-shape-divider-animated.guten-shape-divider-animated-top svg",
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
							'selector'       => "section.{$this->element_id} .guten-shape-divider-animated.guten-shape-divider-animated-bottom svg",
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
							'selector'       => "section.{$this->element_id} .guten-shape-divider-animated.guten-shape-divider-animated-bottom svg",
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

		if ( isset( $this->attrs['typographyHeadingColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .wp-block-gutenverse-heading",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['typographyHeadingColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['typographyTextColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['typographyTextColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['typographyLinkColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['typographyLinkColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['typographyLinkHoverColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} a:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['typographyLinkHoverColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['typographyTextAlign'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}",
					'property'       => function ( $value ) {
						return "text-align: {$value};";
					},
					'value'          => $this->attrs['typographyTextAlign'],
					'device_control' => true,
				)
			);
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

		if ( isset( $this->attrs['blur'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "section.guten-element.{$this->element_id}:before",
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
					'selector'       => "section.guten-element.{$this->element_id}:hover::before",
					'property'       => function ( $value ) {
						return "-webkit-backdrop-filter: blur({$value}px); backdrop-filter: blur({$value}px);";
					},
					'value'          => $this->attrs['blurHover'],
					'device_control' => true,
				)
			);
		}

		do_action( 'gutenverse_section_style', $this, $this->attrs );
	}
}
