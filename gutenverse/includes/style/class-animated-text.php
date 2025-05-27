<?php
/**
 * Gutenverse Animated Text
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Animated Text
 *
 * @package gutenverse\style
 */
class Animated_Text extends Style_Abstract {
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
	protected $name = 'animated-text';

	/**
	 * Constructor
	 *
	 * @param array $attrs Attribute.
	 */
	public function __construct( $attrs ) {
		parent::__construct( $attrs );
		$this->in_block = false;
		$this->set_feature(
			array(
				'background'  => null,
				'border'      => null,
				'positioning' => null,
				'advance'     => null,
				'mask'        => null,
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		if ( isset( $this->attrs['alignText'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}",
					'property'       => function ( $value ) {
						return "justify-content: {$value};";
					},
					'value'          => $this->attrs['alignText'],
					'device_control' => true,
				)
			);
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} > *",
					'property'       => function ( $value ) {
						return 'text-align: ' .
						( 'flex-start' === $value ? 'left' :
						( 'flex-end' === $value ? 'right' : 'center' ) ) .
						';';
					},
					'value'          => $this->attrs['alignText'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['height'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'min-height' );
					},
					'value'          => $this->attrs['height'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['verticalAlign'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}",
					'property'       => function ( $value ) {
						return "align-items: {$value};";
					},
					'value'          => $this->attrs['verticalAlign'],
					'device_control' => true,
				)
			);
		}

		// Animated Text.
		if ( isset( $this->attrs['textAnimatedColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .text-content *",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['textAnimatedColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['textAnimatedTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .text-content *",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['textAnimatedTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['textAnimatedStroke'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .text-content *",
					'property'       => function ( $value ) {
						return $this->handle_text_stroke( $value );
					},
					'value'          => $this->attrs['textAnimatedStroke'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['textAnimatedShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .text-content *",
					'property'       => function ( $value ) {
						return $this->handle_text_shadow( $value );
					},
					'value'          => $this->attrs['textAnimatedShadow'],
					'device_control' => false,
				)
			);
		}

		// Normal text.
		if ( isset( $this->attrs['textNormalColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .non-animated-text",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['textNormalColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['textNormalTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .non-animated-text",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['textNormalTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['textNormalStroke'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .non-animated-text",
					'property'       => function ( $value ) {
						return $this->handle_text_stroke( $value );
					},
					'value'          => $this->attrs['textNormalStroke'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['textNormalShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .non-animated-text",
					'property'       => function ( $value ) {
						return $this->handle_text_shadow( $value );
					},
					'value'          => $this->attrs['textNormalShadow'],
					'device_control' => false,
				)
			);
		}
	}
}
