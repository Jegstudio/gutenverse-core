<?php
/**
 * Gutenverse Form_Input_Checkbox
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-form\style
 */

namespace Gutenverse\Form_Fallback\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Form_Input_Checkbox
 *
 * @package gutenverse-form\style
 */
class Form_Input_Checkbox extends Style_Abstract {
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
	protected $name = 'form-input-checkbox';

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

		if ( isset( $this->attrs['labelSpace'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-inner-input label",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['labelSpace'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['checkboxSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-inner-input label .check:before",
					'property'       => function ( $value ) {
						return "font-size: {$value}px;";
					},
					'value'          => $this->attrs['checkboxSize'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['checkboxSpace'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-inner-input label .check:before",
					'property'       => function ( $value ) {
						return "margin-right: {$value}px;";
					},
					'value'          => $this->attrs['checkboxSpace'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['checkboxLabelColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-inner-input label",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['checkboxLabelColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['checkboxTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .main-wrapper label .check",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['checkboxTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['checkboxColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-inner-input label .check:before",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['checkboxColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['checkboxActiveColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-inner-input label input:checked + .check:before",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['checkboxActiveColor'],
					'device_control' => false,
				)
			);
		}
	}
}
