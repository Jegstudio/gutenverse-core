<?php
/**
 * Gutenverse Chart
 *
 * @author Jegstudio
 * @since 2.2.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Chart
 *
 * @package gutenverse\style
 */
class Chart extends Style_Abstract {
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
	protected $name = 'chart';



	/**
	 * Constructor
	 *
	 * @param array $attrs Attribute.
	 */
	public function __construct( $attrs ) {
		parent::__construct( $attrs );

		$this->set_feature(
			array(
				'background'  => array(
					'normal' => "#{$this->element_id}",
					'hover'  => "#{$this->element_id}:hover",
				),
				'border'      => array(
					'normal' => "#{$this->element_id}",
					'hover'  => "#{$this->element_id}:hover",
				),
				'positioning' => "#{$this->element_id}",
				'animation'   => "#{$this->element_id}",
				'advance'     => "#{$this->element_id}",
				'mask'        => "#{$this->element_id}",
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		if ( isset( $this->attrs['mobileMenuPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-nav-site-title .gutenverse-nav-logo",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['mobileMenuPadding'],
					'device_control' => true,
				)
			);
		}
	}
}
