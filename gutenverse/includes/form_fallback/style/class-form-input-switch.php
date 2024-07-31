<?php
/**
 * Gutenverse Form_Input_Switch
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-form\style
 */

namespace Gutenverse\Form_Fallback\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Form_Input_Switch
 *
 * @package gutenverse-form\style
 */
class Form_Input_Switch extends Style_Abstract {
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
	protected $name = 'form-input-switch';

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

		if ( isset( $this->attrs['switcherWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-form-input.guten-form-input-switch .switch-wrapper .switch",
					'property'       => function ( $value ) {
						return "width: {$value}px;";
					},
					'value'          => $this->attrs['switcherWidth'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['switcherWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-form-input.guten-form-input-switch .switch-wrapper input:checked + .switch::after",
					'property'       => function ( $value ) {
						$circle_diameter = $value['switcherHeight'];
						$width_switcher = $value['switcherWidth'];
						$translate_x = $width_switcher - ( $circle_diameter + 1 );
						return "transform: translate3d({$translate_x}px, -50%, 0);";
					},
					'value'          => $this->attrs,
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['switcherHeight'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-form-input.guten-form-input-switch .switch-wrapper .switch",
					'property'       => function ( $value ) {
						return "height: {$value}px;";
					},
					'value'          => $this->attrs['switcherHeight'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['switcherHeight'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-form-input.guten-form-input-switch .switch-wrapper .switch::after",
					'property'       => function ( $value ) {
						$value = $value - 3;
						return "height: {$value}px;";
					},
					'value'          => $this->attrs['switcherHeight'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['switcherHeight'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-form-input.guten-form-input-switch .switch-wrapper .switch::after",
					'property'       => function ( $value ) {
						$value = $value - 3;
						return "width: {$value}px;";
					},
					'value'          => $this->attrs['switcherHeight'],
					'device_control' => false,
				)
			);
		}

		// if ( isset( $this->attrs['switcherHeight'] ) ) {
		// $this->inject_style(
		// array(
		// 'selector'       => ".{$this->element_id}.guten-form-input.guten-form-input-switch .switch-wrapper input:checked + .switch::after",
		// 'property'       => function ( $value ) {
		// return "transform: translate3d({$value}px, -50%, 0);";
		// },
		// 'value'          => $this->attrs['switcherHeight'],
		// 'device_control' => false,
		// )
		// );
		// }

		if ( isset( $this->attrs['switchTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id}.guten-form-input.guten-form-input-switch .switch-wrapper .switch::before",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['switchTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['switchTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id}.guten-form-input.guten-form-input-switch .switch-wrapper input:checked + .switch::before",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['switchTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['offBackground'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-form-input.guten-form-input-switch .switch-wrapper .switch",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['offBackground'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['offButton'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-form-input.guten-form-input-switch .switch-wrapper .switch::after",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['offButton'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['offTextColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-form-input.guten-form-input-switch .switch-wrapper .switch",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['offTextColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['onBackground'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-form-input.guten-form-input-switch .switch-wrapper input:checked + .switch",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['onBackground'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['onButton'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-form-input.guten-form-input-switch .switch-wrapper input:checked + .switch::after",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['onButton'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['onTextColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-form-input.guten-form-input-switch .switch-wrapper input:checked + .switch::before",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['onTextColor'],
					'device_control' => false,
				)
			);
		}
	}
}
