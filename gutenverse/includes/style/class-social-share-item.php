<?php
/**
 * Gutenverse Social_Share_Item
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Social_Share_Item
 *
 * @package gutenverse\style
 */
class Social_Share_Item extends Style_Abstract {
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
	protected $name = 'social-share-item';


	/**
	 * Constructor
	 *
	 * @param array $attrs Attribute.
	 */
	public function __construct( $attrs ) {
		parent::__construct( $attrs );

		$this->set_feature(
			array(
				'mask' => null,
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		if ( isset( $this->attrs['iconPading'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.gutenverse-share-item .gutenverse-share-icon",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['iconPading'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['textPading'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.gutenverse-share-item .gutenverse-share-text",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['textPading'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.gutenverse-share-item .gutenverse-share-icon i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['iconColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconBackgroundColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.gutenverse-share-item .gutenverse-share-icon",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['iconBackgroundColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['backgroundColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.gutenverse-share-item .gutenverse-share-text",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['backgroundColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['textColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.gutenverse-share-item .gutenverse-share-text",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['textColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['border_v2'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.gutenverse-share-item",
					'property'       => function ( $value ) {
						return $this->handle_border_v2( $value );
					},
					'value'          => $this->attrs['border_v2'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.gutenverse-share-item:hover .gutenverse-share-icon i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['iconColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconBackgroundColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.gutenverse-share-item:hover .gutenverse-share-icon",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['iconBackgroundColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['backgroundColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.gutenverse-share-item:hover .gutenverse-share-text",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['backgroundColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['textColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.gutenverse-share-item:hover .gutenverse-share-text",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['textColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['borderHover_v2'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.gutenverse-share-item:hover",
					'property'       => function ( $value ) {
						return $this->handle_border_v2( $value );
					},
					'value'          => $this->attrs['borderHover_v2'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['typography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => "#{$this->element_id}.gutenverse-share-item .gutenverse-share-text",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['typography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.gutenverse-share-item i",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'font-size' );
					},
					'value'          => $this->attrs['iconSize'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.gutenverse-share-item i",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'width' );
					},
					'value'          => $this->attrs['iconSize'],
					'device_control' => true,
				)
			);
		}
	}
}
