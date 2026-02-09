<?php
/**
 * Gutenverse ACF_Link
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class ACF_Link
 *
 * @package gutenverse\style
 */
class ACF_Link extends Style_Abstract {
	/**
	 * Block Directory
	 *
	 * @var string
	 */
	protected $block_dir = GUTENVERSE_DIR . '/block/';

	/**
	 * Block Name
	 *
	 * @var array
	 */
	protected $name = 'acf-link';

	/**
	 * Constructor
	 *
	 * @param array $attrs Attribute.
	 */
	public function __construct( $attrs ) {
		parent::__construct( $attrs );

		$this->set_feature(
			array(
				'background'  => null,
				'border'      => null,
				'positioning' => null,
				'animation'   => null,
				'margin'      => null,
				'padding'     => null,
				'box_shadow'  => null,
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		// Button Alignment
		if ( isset( $this->attrs['alignButton'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-acf-link-wrapper",
					'property'       => function ( $value ) {
						return "justify-content: {$value};";
					},
					'value'          => $this->attrs['alignButton'],
					'device_control' => true,
				)
			);
		}

		// Button Padding
		if ( isset( $this->attrs['paddingButton'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-button",
					'property'       => function ( $value ) {
						return "padding: {$value};";
					},
					'value'          => $this->attrs['paddingButton'],
					'device_control' => true,
				)
			);
		}

		// Button Colors
		if ( isset( $this->attrs['color'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-button span",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['color'],
					'device_control' => false,
				)
			);
		}

		// Button Background
		if ( isset( $this->attrs['buttonBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .guten-button", $this->attrs['buttonBackground'] );
		}

		// Button Border
		if ( isset( $this->attrs['buttonBorder'] ) ) {
			$this->handle_border( 'buttonBorder', ".{$this->element_id} .guten-button" );
		}
	}
}
