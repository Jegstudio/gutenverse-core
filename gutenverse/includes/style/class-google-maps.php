<?php
/**
 * Gutenverse Google Maps
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Google Maps
 *
 * @package gutenverse\style
 */
class Google_Maps extends Style_Abstract {
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
	protected $name = 'google-maps';

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
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		if ( isset( $this->attrs['height'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.gutenverse-maps iframe",
					'property'       => function ( $value ) {
						return "height: {$value}px;";
					},
					'value'          => $this->attrs['height'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['mapFilter'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.gutenverse-maps iframe",
					'property'       => function ( $value ) {
						$brightness = ! gutenverse_truly_empty( $value['brightness'] ) ? $value['brightness'] . '%' : '100%';
						$contrast = ! gutenverse_truly_empty( $value['contrast'] ) ? $value['contrast'] . '%' : '100%';
						$saturation = ! gutenverse_truly_empty( $value['saturation'] ) ? $value['saturation'] . '%' : '100%';
						$blur = ! gutenverse_truly_empty( $value['blur'] ) ? $value['blur'] . 'px' : '0px';
						$hue = ! gutenverse_truly_empty( $value['hue'] ) ? $value['hue'] . 'deg' : '0deg';

						return "filter: brightness({$brightness}) contrast({$contrast}) saturate({$saturation}) blur({$blur})hue-rotate({$hue});";
					},
					'value'          => $this->attrs['mapFilter'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['mapFilterHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.gutenverse-maps iframe:hover",
					'property'       => function ( $value ) {
						$brightness = ! gutenverse_truly_empty( $value['brightness'] ) ? $value['brightness'] . '%' : '100%';
						$contrast = ! gutenverse_truly_empty( $value['contrast'] ) ? $value['contrast'] . '%' : '100%';
						$saturation = ! gutenverse_truly_empty( $value['saturation'] ) ? $value['saturation'] . '%' : '100%';
						$blur = ! gutenverse_truly_empty( $value['blur'] ) ? $value['blur'] . 'px' : '0px';
						$hue = ! gutenverse_truly_empty( $value['hue'] ) ? $value['hue'] . 'deg' : '0deg';

						return "filter: brightness({$brightness}) contrast({$contrast}) saturate({$saturation}) blur({$blur})hue-rotate({$hue});";
					},
					'value'          => $this->attrs['mapFilterHover'],
					'device_control' => false,
				)
			);
		}
	}
}
