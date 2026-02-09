<?php
/**
 * Gutenverse ACF_Text
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class ACF_Text
 *
 * @package gutenverse\style
 */
class ACF_Text extends Style_Abstract {
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
	protected $name = 'acf-text';

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
				'box_shadow'  => null,
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		if ( isset( $this->attrs['alignment'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-acf-text-content",
					'property'       => function ( $value ) {
						return "justify-content: {$value}; text-align: {$this->handle_align($value)};";
					},
					'value'          => $this->attrs['alignment'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['typography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".{$this->element_id} .guten-acf-text-content",
					'value'    => $this->attrs['typography'],
				)
			);
		}

		if ( isset( $this->attrs['color'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-acf-text-content, .{$this->element_id} .guten-acf-text-content a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['color'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['colorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-acf-text-content:hover, .{$this->element_id} .guten-acf-text-content a:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['colorHover'],
					'device_control' => false,
				)
			);
		}
	}
}
