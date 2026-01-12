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
				'background'  => array(
					'normal' => ".guten-flex-container.{$this->element_id}",
					'hover'  => ".guten-flex-container.{$this->element_id}:hover",
				),
				'border'      => null,
				'animation'   => null,
				'advance'     => null,
				'positioning' => ".guten-flex-container.{$this->element_id}",
				'mask'        => null,
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

		// Min Height.
		if ( isset( $this->attrs['minHeight'] ) ) {
			$this->feature_background(
				array(
					'normal' => ".guten-flex-container.{$this->element_id} .guten-inner-container",
					'hover'  => ".guten-flex-container.{$this->element_id}:hover .guten-inner-container",
				),
				'boxedBackground'
			);
		}

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
		 * Child
		 */

		// Flex Align Self.
		if ( isset( $this->attrs['flexAlignSelf'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-flex-container.{$this->element_id}",
					'property'       => function ( $value ) {
						return "align-self: {$value};";
					},
					'value'          => $this->attrs['flexAlignSelf'],
					'device_control' => true,
				)
			);
		}

		// Flex Order.
		if ( isset( $this->attrs['flexOrder'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-flex-container.{$this->element_id}",
					'property'       => function ( $value ) {
						if ( 'start' === $value ) {
							return 'order: -9999;';
						}
						if ( 'end' === $value ) {
							return 'order: 9999;';
						}
						return '';
					},
					'value'          => $this->attrs['flexOrder'],
					'device_control' => true,
				)
			);
		}

		// Flex Custom Order.
		if ( isset( $this->attrs['flexCustomOrder'] ) && isset( $this->attrs['flexOrder'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-flex-container.{$this->element_id}",
					'property'       => function ( $value, $device ) {
						if ( isset( $this->attrs['flexOrder'][ $device ] ) && 'custom' === $this->attrs['flexOrder'][ $device ] ) {
							return "order: {$value};";
						}
						return '';
					},
					'value'          => $this->attrs['flexCustomOrder'],
					'device_control' => true,
				)
			);
		}

		// Flex Size (Grow/Shrink Presets).
		if ( isset( $this->attrs['flexSize'] ) ) {
			// Grow preset.
			$this->inject_style(
				array(
					'selector'       => ".guten-flex-container.{$this->element_id}",
					'property'       => function ( $value ) {
						return 'grow' === $value ? 'flex-grow: 1;' : '';
					},
					'value'          => $this->attrs['flexSize'],
					'device_control' => true,
				)
			);
			// Shrink preset.
			$this->inject_style(
				array(
					'selector'       => ".guten-flex-container.{$this->element_id}",
					'property'       => function ( $value ) {
						return 'shrink' === $value ? 'flex-shrink: 1;' : '';
					},
					'value'          => $this->attrs['flexSize'],
					'device_control' => true,
				)
			);
		}

		// Flex Size Grow (Custom).
		if ( isset( $this->attrs['flexSizeGrow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-flex-container.{$this->element_id}",
					'property'       => function ( $value ) {
						return "flex-grow: {$value};";
					},
					'value'          => $this->attrs['flexSizeGrow'],
					'device_control' => true,
				)
			);
		}

		// Flex Size Shrink (Custom).
		if ( isset( $this->attrs['flexSizeShrink'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-flex-container.{$this->element_id}",
					'property'       => function ( $value ) {
						return "flex-shrink: {$value};";
					},
					'value'          => $this->attrs['flexSizeShrink'],
					'device_control' => true,
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

		do_action( 'gutenverse_container_style', $this, $this->attrs );
	}
}
