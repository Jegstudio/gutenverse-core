<?php
/**
 * Gutenverse Form_Input_Radio
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-form\style
 */

namespace Gutenverse\Form_Fallback\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Form_Input_Radio
 *
 * @package gutenverse-form\style
 */
class Form_Input_Radio extends Style_Abstract {
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
	protected $name = 'form-input-radio';


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

		if ( isset( $this->attrs['radioSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-inner-input label .radio:before",
					'property'       => function ( $value ) {
						return "font-size: {$value}px;";
					},
					'value'          => $this->attrs['radioSize'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['radioSpace'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-inner-input label .radio:before",
					'property'       => function ( $value ) {
						return "margin-right: {$value}px;";
					},
					'value'          => $this->attrs['radioSpace'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['radioLabelColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-inner-input label",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['radioLabelColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['radioTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .main-wrapper label .radio",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['radioTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['radioColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-inner-input label .radio:before",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['radioColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['radioActiveColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-inner-input label input:checked + .radio:before",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['radioActiveColor'],
					'device_control' => false,
				)
			);
		}
	}
}
