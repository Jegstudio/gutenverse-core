<?php
/**
 * Gutenverse Post_Author
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Post_Author
 *
 * @package gutenverse\style
 */
class Post_Author extends Style_Abstract {
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
	protected $name = 'post-author';

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
		if ( isset( $this->attrs['alignment'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}",
					'property'       => function ( $value ) {
						return "justify-content: {$value};";
					},
					'value'          => $this->attrs['alignment'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['typography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} *",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['typography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['color'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} *",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['color'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['textShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}",
					'property'       => function ( $value ) {
						return $this->handle_text_shadow( $value );
					},
					'value'          => $this->attrs['textShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['colorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}:hover *",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['colorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['textShadowHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}:hover",
					'property'       => function ( $value ) {
						return $this->handle_text_shadow( $value );
					},
					'value'          => $this->attrs['textShadowHover'],
					'device_control' => false,
				)
			);
		}

		// Author Avatar Styling.
		if ( ! empty( $this->attrs['authorAvatar'] ) ) {
			if ( isset( $this->attrs['size'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} img",
						'property'       => function ( $value ) {
							return $this->handle_unit_point( $value, 'max-width' );
						},
						'value'          => $this->attrs['size'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['opacity'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} img",
						'property'       => function ( $value ) {
							return "opacity: calc({$value}/100);";
						},
						'value'          => $this->attrs['opacity'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['avatarGap'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} img",
						'property'       => function ( $value ) {
							return "margin-right: {$value}px;";
						},
						'value'          => $this->attrs['avatarGap'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['rotate'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} img",
						'property'       => function ( $value ) {
							return "transform: rotate({$value}deg);";
						},
						'value'          => $this->attrs['rotate'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['authorBorder'] ) ) {
				$this->handle_border( 'authorBorder', ".{$this->element_id} img" );
			}

			if ( isset( $this->attrs['authorBorderResponsive'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} img",
						'property'       => function ( $value ) {
							return $this->handle_border_responsive( $value );
						},
						'value'          => $this->attrs['authorBorderResponsive'],
						'device_control' => true,
						'skip_device'    => array(
							'Desktop',
						),
					)
				);
			}

			if ( isset( $this->attrs['authorBoxShadow'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} img",
						'property'       => function ( $value ) {
							return $this->handle_box_shadow( $value );
						},
						'value'          => $this->attrs['authorBoxShadow'],
						'device_control' => false,
					)
				);
			}
		}
	}
}
