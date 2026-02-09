<?php
/**
 * Gutenverse ACF_Image
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class ACF_Image
 *
 * @package gutenverse\style
 */
class ACF_Image extends Style_Abstract {
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
	protected $name = 'acf-image';

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
		// Width
		if ( isset( $this->attrs['width'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} img",
					'property'       => function ( $value ) {
						// Assuming width is handled as dimension or string
						return "width: {$value};";
					},
					'value'          => $this->attrs['width'],
					'device_control' => true,
				)
			);
		}


		// Image Border
		if ( isset( $this->attrs['imgBorder'] ) ) {
			$this->handle_border( 'imgBorder', ".{$this->element_id} img" );
		}

		// Image Box Shadow
		if ( isset( $this->attrs['imgShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} img",
					'property'       => function ( $value ) {
						return "box-shadow: {$value};";
					},
					'value'          => $this->attrs['imgShadow'],
					'device_control' => false,
				)
			);
		}
	}
}
