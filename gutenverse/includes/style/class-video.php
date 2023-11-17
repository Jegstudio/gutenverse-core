<?php
/**
 * Gutenverse Video
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Video
 *
 * @package gutenverse\style
 */
class Video extends Style_Abstract {
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
	protected $name = 'video';

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
		if ( isset( $this->attrs['width'] ) && isset( $this->attrs['videoSrc'] ) && isset( $this->attrs['videoType'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} video, .{$this->element_id} .guten-video-background",
					'property'       => function ( $value ) {
						return "width: {$value}%!important;";
					},
					'value'          => $this->attrs['width'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['height'] ) && isset( $this->attrs['videoSrc'] ) && isset( $this->attrs['videoType'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} video, .{$this->element_id} .guten-video-background",
					'property'       => function ( $value ) {
						return "height: {$value}px!important;";
					},
					'value'          => $this->attrs['height'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['captionType'] ) && 'none' !== $this->attrs['captionType'] && isset( $this->attrs['videoSrc'] ) ) {
			if ( isset( $this->attrs['captionSpace'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .guten-caption",
						'property'       => function ( $value ) {
							return "margin-top: {$value}px;";
						},
						'value'          => $this->attrs['captionSpace'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['typography'] ) ) {
				$this->inject_typography(
					array(
						'selector'       => ".{$this->element_id} .guten-caption",
						'property'       => function ( $value ) {},
						'value'          => $this->attrs['typography'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['captionColor'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .guten-caption",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs['captionColor'],
						'device_control' => false,
					)
				);
			}
		}
	}
}
