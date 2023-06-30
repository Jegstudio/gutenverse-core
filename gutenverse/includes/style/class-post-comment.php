<?php
/**
 * Gutenverse Post_Comment
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Post_Comment
 *
 * @package gutenverse\style
 */
class Post_Comment extends Style_Abstract {
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
	protected $name = 'post-comment';

	/**
	 * Constructor
	 *
	 * @param array $attrs Attribute.
	 */
	public function __construct( $attrs ) {
		parent::__construct( $attrs );

		$this->set_feature(
			array(
				'background' => null,
				'border'     => null,
				'animation'  => null,
				'advance'    => null,
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		if ( isset( $this->attrs['typographyHeading'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} h1, .{$this->element_id} h2, .{$this->element_id} h3, .{$this->element_id} h4, .{$this->element_id} h5, .{$this->element_id} h6",
					'property'       => function( $value ) {},
					'value'          => $this->attrs['typographyHeading'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['colorHeading'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} h1, .{$this->element_id} h2, .{$this->element_id} h3, .{$this->element_id} h4, .{$this->element_id} h5, .{$this->element_id} h6",
					'property'       => function( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['colorHeading'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['marginHeading'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} h1, .{$this->element_id} h2, .{$this->element_id} h3, .{$this->element_id} h4, .{$this->element_id} h5, .{$this->element_id} h6, .{$this->element_id} .comment-reply-title",
					'property'       => function( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['marginHeading'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['typographyText'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} span, .{$this->element_id} p",
					'property'       => function( $value ) {},
					'value'          => $this->attrs['typographyText'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['colorText'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} span, .{$this->element_id} p",
					'property'       => function( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['colorText'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['marginText'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} span, .{$this->element_id} p",
					'property'       => function( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['marginText'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['typographyLink'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} a",
					'property'       => function( $value ) {},
					'value'          => $this->attrs['typographyLink'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['colorLink'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} a",
					'property'       => function( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['colorLink'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['marginLink'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} a",
					'property'       => function( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['marginLink'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['typographyLabel'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} label",
					'property'       => function( $value ) {},
					'value'          => $this->attrs['typographyLabel'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['colorLabel'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} label",
					'property'       => function( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['colorLabel'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['marginLabel'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} label, .{$this->element_id} .comment-form-author label, .{$this->element_id} .comment-form-comment label, .{$this->element_id} .comment-form-email label, .{$this->element_id} .comment-form-url label",
					'property'       => function( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['marginLabel'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['inputBorder'] ) ) {
			$this->handle_border( 'inputBorder', ".{$this->element_id} .comment-form form input:not([type=submit]), .{$this->element_id} .comment-form form textarea" );
		}

		if ( isset( $this->attrs['avatarBorder'] ) ) {
			$this->handle_border( 'avatarBorder', ".{$this->element_id} .comment-author img.avatar" );
		}

		if ( isset( $this->attrs['typographyButton'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id}.guten-post-comment input[type=submit]",
					'property'       => function( $value ) {},
					'value'          => $this->attrs['typographyButton'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['colorButton'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-post-comment input[type=submit]",
					'property'       => function( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['colorButton'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['bgcolorButton'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-post-comment input[type=submit]",
					'property'       => function( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['bgcolorButton'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['bggradientButton'] ) ) {
			$this->handle_background( ".{$this->element_id}.guten-post-comment input[type=submit]", $this->attrs['bggradientButton'] );
		}

		if ( isset( $this->attrs['borderButton'] ) ) {
			$this->handle_border( 'borderButton', ".{$this->element_id}.guten-post-comment input[type=submit]" );
		}

		if ( isset( $this->attrs['marginButton'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-post-comment input[type=submit]",
					'property'       => function( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['marginButton'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['paddingButton'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-post-comment input[type=submit]",
					'property'       => function( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['paddingButton'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['colorButtonHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-post-comment input[type=submit]:hover",
					'property'       => function( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['colorButtonHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['bgcolorButtonHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-post-comment input[type=submit]:hover",
					'property'       => function( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['bgcolorButtonHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['bggradientButtonHover'] ) ) {
			$this->handle_background( ".{$this->element_id}.guten-post-comment input[type=submit]:hover", $this->attrs['bggradientButtonHover'] );
		}

		if ( isset( $this->attrs['borderButtonHover'] ) ) {
			$this->handle_border( 'borderButtonHover', ".{$this->element_id}.guten-post-comment input[type=submit]:hover" );
		}

		if ( isset( $this->attrs['marginButtonHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-post-comment input[type=submit]:hover",
					'property'       => function( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['marginButtonHover'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['paddingButtonHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-post-comment input[type=submit]:hover",
					'property'       => function( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['paddingButtonHover'],
					'device_control' => true,
				)
			);
		}
	}
}
