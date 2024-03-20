<?php
/**
 * Gutenverse Spacer
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Spacer
 *
 * @package gutenverse\style
 */
class Spacer extends Style_Abstract {
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
	protected $name = 'spacer';

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
				'advance'     => null,
				'mask'        => null,
				'pointer'     => null,
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		if ( isset( $this->attrs['space'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-spacer",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'padding-bottom' );
					},
					'value'          => $this->attrs['space'],
					'device_control' => true,
				)
			);
		}
	}
}
