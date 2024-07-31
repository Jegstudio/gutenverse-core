<?php
/**
 * Gutenverse Form Builder
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-form\style
 */

namespace Gutenverse\Form_Fallback\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Form Builder
 *
 * @package gutenverse-form\style
 */
class Form_Builder extends Style_Abstract {
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
	protected $name = 'form-builder';

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
				'mask'       => null,
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		do_action( 'gutenverse_form_builder_style', $this, $this->attrs );

		if ( isset( $this->attrs['successBgColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .form-notification .notification-body.guten-success",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['successBgColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['successTextColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .form-notification .notification-body.guten-success",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['successTextColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['successAlign'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .form-notification .notification-body.guten-success",
					'property'       => function ( $value ) {
						return "text-align: {$value};";
					},
					'value'          => $this->attrs['successAlign'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['successPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .form-notification .notification-body.guten-success",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['successPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['successBorder'] ) ) {
			$this->handle_border( 'successBorder', ".{$this->element_id} .form-notification .notification-body.guten-success" );
		}

		if ( isset( $this->attrs['successBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .form-notification .notification-body.guten-success",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['successBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['successBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .form-notification .notification-body.guten-success",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['successBoxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['successTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .form-notification .notification-body.guten-success",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['successTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['errorBgColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .form-notification .notification-body.guten-error",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['errorBgColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['errorTextColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .form-notification .notification-body.guten-error",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['errorTextColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['errorAlign'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .form-notification .notification-body.guten-error",
					'property'       => function ( $value ) {
						return "text-align: {$value};";
					},
					'value'          => $this->attrs['errorAlign'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['errorPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .form-notification .notification-body.guten-error",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['errorPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['errorBorder'] ) ) {
			$this->handle_border( 'errorBorder', ".{$this->element_id} .form-notification .notification-body.guten-error" );
		}

		if ( isset( $this->attrs['errorBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .form-notification .notification-body.guten-error",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['errorBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['errorBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .form-notification .notification-body.guten-error",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['errorBoxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['errorTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .form-notification .notification-body.guten-error",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['errorTypography'],
					'device_control' => false,
				)
			);
		}
	}
}
