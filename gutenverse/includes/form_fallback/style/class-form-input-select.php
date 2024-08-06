<?php
/**
 * Gutenverse Form_Input_Select
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-form\style
 */

namespace Gutenverse\Form_Fallback\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Form_Input_Select
 *
 * @package gutenvers-form\style
 */
class Form_Input_Select extends Style_Abstract {
	/**
	 * Block Directory
	 *
	 * @var string
	 */
	protected $block_dir = GUTENVERSE_DIR . 'includes/form_fallback/block/';

	/**
	 * Block Name
	 *
	 * @var array
	 */
	protected $name = 'form-input-select';


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
		if ( isset( $this->attrs['labelWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .label-wrapper",
					'property'       => function ( $value ) {
						return "width: {$value}%;";
					},
					'value'          => $this->attrs['labelWidth'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['labelColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .label-wrapper .input-label",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['labelColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['labelTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .label-wrapper .input-label",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['labelTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['labelPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .label-wrapper",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['labelPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['labelMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .label-wrapper",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['labelMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['labelRequireColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .label-wrapper .required-badge",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['labelRequireColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['helperColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .input-helper",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['helperColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['helperTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .input-helper",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['helperTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['helperPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .input-helper",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['helperPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['warningColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .validation-error",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['warningColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['warningTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .validation-error",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['warningTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['inputPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .main-wrapper .choices__inner",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['inputPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['inputMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .main-wrapper .choices__inner",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['inputMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['placeholderColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .choices__placeholder:not(.choices__item--choice), .{$this->element_id} .choices .choices__list.choices__list--dropdown input",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['placeholderColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['placeholderBgColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .choices__inner, .{$this->element_id} .choices .choices__list.choices__list--dropdown input",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['placeholderBgColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['inputTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .choices__placeholder, .{$this->element_id} .choices__item, .{$this->element_id} .choices__input",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['inputTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['inputColorNormal'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .choices .choices__inner .choices__list .choices__item.choices__item--selectable:not(.choices__placeholder)",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['inputColorNormal'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['choicesColorNormal'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .choices .choices__list.choices__list--dropdown .choices__item",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['choicesColorNormal'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['choicesBgColorNormal'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .choices .choices__list.choices__list--dropdown .choices__item",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['choicesBgColorNormal'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['inputBorderNormal'] ) ) {
			$this->handle_border( 'inputBorderNormal', ".{$this->element_id} .choices .choices__inner, .{$this->element_id} .choices .choices__list.choices__list--dropdown" );
		}

		if ( isset( $this->attrs['inputBorderNormalResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .choices .choices__inner, .{$this->element_id} .choices .choices__list.choices__list--dropdown",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['inputBorderNormalResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['inputColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}:hover .choices .choices__inner .choices__list .choices__item.choices__item--selectable:not(.choices__placeholder)",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['inputColorHover'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['choicesColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .choices .choices__list.choices__list--dropdown .choices__item.is-highlighted",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['choicesColorHover'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['choicesBgColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .choices .choices__list.choices__list--dropdown .choices__item.is-highlighted",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['choicesBgColorHover'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['inputBorderHover'] ) ) {
			$this->handle_border( 'inputBorderHover', ".{$this->element_id} .choices .choices__inner:hover, .{$this->element_id} .choices .choices__list.choices__list--dropdown:hover" );
		}

		if ( isset( $this->attrs['inputBorderHoverResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .choices .choices__inner:hover, .{$this->element_id} .choices .choices__list.choices__list--dropdown:hover",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['inputBorderHoverResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['inputAreaBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .choices .choices__inner, .{$this->element_id} .choices .choices__list.choices__list--dropdown",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['inputAreaBoxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['inputAreaBoxShadowHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .choices .choices__inner:hover, .{$this->element_id} .choices .choices__list.choices__list--dropdown:hover",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['inputAreaBoxShadowHover'],
					'device_control' => false,
				)
			);
		}
	}
}
