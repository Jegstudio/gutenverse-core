<?php
/**
 * Gutenverse Column
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Framework\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Column
 *
 * @package gutenverse\style
 */
class Column extends Style_Abstract {
	/**
	 * Block Name
	 *
	 * @var array
	 */
	protected $name = 'column';

	/**
	 * Constructor
	 *
	 * @param array $attrs Attribute.
	 */
	public function __construct( $attrs ) {
		parent::__construct( $attrs );

		$this->set_feature(
			array(
				'background'    => array(
					'normal' => ".{$this->element_id} > .sticky-wrapper > .guten-column-wrapper",
					'hover'  => ".{$this->element_id} > .sticky-wrapper > .guten-column-wrapper:hover",
				),
				'border'        => array(
					'normal' => ".{$this->element_id} > .sticky-wrapper > .guten-column-wrapper",
					'hover'  => ".{$this->element_id} > .sticky-wrapper > .guten-column-wrapper:hover",
				),
				'animation'     => ".{$this->element_id}",
				'advance'       => ".{$this->element_id} > .sticky-wrapper > .guten-column-wrapper",
				'mask'          => null,
				'cursor-effect' => null,
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		if ( isset( $this->attrs['width'] ) ) {
			$this->inject_column_width_style( ".{$this->element_id}", $this->attrs['width'] );
		}

		if ( isset( $this->attrs['verticalAlign'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-section > .guten-container > .{$this->element_id}.guten-column > .sticky-wrapper > .guten-column-wrapper",
					'property'       => function( $value ) {
						if ( 'default' === $value ) {
							return null;
						}

						return "align-content: {$value}; align-items: {$value};";
					},
					'value'          => $this->attrs['verticalAlign'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['horizontalAlign'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-section > .guten-container > .{$this->element_id}.guten-column > .sticky-wrapper > .guten-column-wrapper",
					'property'       => function( $value ) {
						if ( 'default' === $value ) {
							return null;
						}

						return "justify-content: {$value};";
					},
					'value'          => $this->attrs['horizontalAlign'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['order'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}",
					'property'       => function( $value ) {
						return "order: {$value};";
					},
					'value'          => $this->attrs['order'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['typographyHeadingColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .wp-block-gutenverse-heading",
					'property'       => function( $value ) {
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
					'property'       => function( $value ) {
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
					'property'       => function( $value ) {
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
					'property'       => function( $value ) {
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
					'property'       => function( $value ) {
						return "text-align: {$value};";
					},
					'value'          => $this->attrs['typographyTextAlign'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['backgroundOverlay'] ) ) {
			$this->handle_background( ".{$this->element_id} > .sticky-wrapper > .guten-column-wrapper:before", $this->attrs['backgroundOverlay'] );
		}

		if ( isset( $this->attrs['backgroundOverlayHover'] ) ) {
			$this->handle_background( ".{$this->element_id}:hover > .sticky-wrapper > .guten-column-wrapper:before", $this->attrs['backgroundOverlayHover'] );
		}

		if ( isset( $this->attrs['opacity'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} > .sticky-wrapper > .guten-column-wrapper:before",
					'property'       => function( $value ) {
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
					'selector'       => ".{$this->element_id}:hover > .sticky-wrapper > .guten-column-wrapper:before",
					'property'       => function( $value ) {
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
					'selector'       => ".{$this->element_id}:before",
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
					'selector'       => ".{$this->element_id}:hover:before",
					'property'       => function( $value ) {
						return "-webkit-backdrop-filter: blur({$value}px); backdrop-filter: blur({$value}px);";
					},
					'value'          => $this->attrs['blurHover'],
					'device_control' => true,
				)
			);
		}

		do_action( 'gutenverse_column_style', $this, $this->attrs );
	}
}
