<?php
/**
 * Gutenverse Global Style
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-framework
 */

namespace Gutenverse\Framework;

/**
 * Class Global Style
 *
 * @package gutenverse\framework
 */
class Global_Style extends Style_Interface {
	/**
	 * The Constructor
	 *
	 * @param array $attrs Attribute.
	 */
	public function __construct( $attrs ) {
		$this->attrs = $attrs;
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		if ( isset( $this->attrs['bodyTextColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => 'body',
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['bodyTextColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['bodyTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => 'body',
					'value'    => $this->attrs['bodyTypography'],
				)
			);
		}

		if ( isset( $this->attrs['paragraphSpacing'] ) ) {
			$this->inject_style(
				array(
					'selector'       => 'p',
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'margin-bottom' );
					},
					'value'          => $this->attrs['paragraphSpacing'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['linkTextColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => 'a',
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['linkTextColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['linkTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => 'a',
					'value'    => $this->attrs['linkTypography'],
				)
			);
		}

		if ( isset( $this->attrs['h1TextColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => 'h1',
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['h1TextColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['h1Typography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => 'h1',
					'value'    => $this->attrs['h1Typography'],
				)
			);
		}

		if ( isset( $this->attrs['h2TextColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => 'h2',
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['h2TextColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['h2Typography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => 'h2',
					'value'    => $this->attrs['h2Typography'],
				)
			);
		}

		if ( isset( $this->attrs['h3TextColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => 'h3',
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['h3TextColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['h3Typography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => 'h3',
					'value'    => $this->attrs['h3Typography'],
				)
			);
		}

		if ( isset( $this->attrs['h4TextColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => 'h4',
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['h4TextColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['h4Typography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => 'h4',
					'value'    => $this->attrs['h4Typography'],
				)
			);
		}

		if ( isset( $this->attrs['h5TextColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => 'h5',
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['h5TextColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['h5Typography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => 'h5',
					'value'    => $this->attrs['h5Typography'],
				)
			);
		}

		if ( isset( $this->attrs['h6TextColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => 'h6',
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['h6TextColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['h6Typography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => 'h6',
					'value'    => $this->attrs['h6Typography'],
				)
			);
		}

		if ( isset( $this->attrs['buttonTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => '.guten-button-wrapper .guten-button',
					'value'    => $this->attrs['buttonTypography'],
				)
			);
		}

		if ( isset( $this->attrs['buttonTextShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => '.guten-button-wrapper .guten-button',
					'property'       => function ( $value ) {
						return $this->handle_text_shadow( $value );
					},
					'value'          => $this->attrs['buttonTextShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['buttonBackground'] ) ) {
			$this->handle_background( '.guten-button-wrapper .guten-button', $this->attrs['buttonBackground'] );
		}

		if ( isset( $this->attrs['buttonTextColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => '.guten-button-wrapper .guten-button',
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['buttonTextColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['buttonBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => '.guten-button-wrapper .guten-button',
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['buttonBoxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['buttonBorder'] ) ) {
			$this->handle_border( 'buttonBorder', '.guten-button' );
		}

		if ( isset( $this->attrs['buttonBackgroundHover'] ) ) {
			$this->handle_background( '.guten-button-wrapper .guten-button:hover', $this->attrs['buttonBackgroundHover'] );
		}

		if ( isset( $this->attrs['buttonTextColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => '.guten-button-wrapper .guten-button:hover',
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['buttonTextColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['buttonBoxShadowHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => '.guten-button-wrapper .guten-button:hover',
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['buttonBoxShadowHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['buttonBorderHover'] ) ) {
			$this->handle_border( 'buttonBorderHover', '.guten-button:hover' );
		}

		if ( isset( $this->attrs['buttonPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => '.guten-button-wrapper .guten-button',
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['buttonPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['formTextColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => 'label, .guten-form-input .input-label',
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['formTextColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['formTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => 'label, .guten-form-input .input-label',
					'value'    => $this->attrs['formTypography'],
				)
			);
		}

		if ( isset( $this->attrs['inputTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => 'input, select, .radio, .check, .choices',
					'value'    => $this->attrs['inputTypography'],
				)
			);
		}

		if ( isset( $this->attrs['inputTextColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => 'input, select, .radio, .check, .choices, .guten-form-input .gutenverse-input, .guten-form-input .choices__item, .guten-form-input .choices__placeholder',
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['inputTextColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['inputBgColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => 'input, select, .choices, .guten-form-input .gutenverse-input',
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['inputBgColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['inputBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => 'input, select, .choices, .guten-form-input .gutenverse-input',
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['inputBoxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['inputBorder'] ) ) {
			$this->handle_border( 'inputBorder', 'input, select, .choices, .guten-form-input .gutenverse-input' );
		}

		if ( isset( $this->attrs['inputTextColorFocus'] ) ) {
			$this->inject_style(
				array(
					'selector'       => 'input:focus, select:focus, .radio:focus, .check:focus, .choices:focus, .guten-form-input .gutenverse-input, .guten-form-input:focus .choices__item:focus, .guten-form-input .choices__placeholder:focus',
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['inputTextColorFocus'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['inputBgColorFocus'] ) ) {
			$this->inject_style(
				array(
					'selector'       => 'input:focus, select:focus, .choices:focus, .guten-form-input .gutenverse-input:focus',
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['inputBgColorFocus'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['inputBoxShadowFocus'] ) ) {
			$this->inject_style(
				array(
					'selector'       => 'input:focus, select:focus, .choices:focus, .guten-form-input .gutenverse-input:focus',
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['inputBoxShadowFocus'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['inputBorderFocus'] ) ) {
			$this->handle_border( 'inputBorderFocus', 'input:focus, select:focus, .choices:focus, .guten-form-input .gutenverse-input:focus' );
		}

		if ( isset( $this->attrs['inputPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => 'input, select, .radio, .check, .choices, .guten-form-input .gutenverse-input',
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['inputPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['inputHelperColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => '.input-helper',
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['inputHelperColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['inputHelperTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => '.input-helper',
					'value'    => $this->attrs['inputHelperTypography'],
				)
			);
		}

		if ( isset( $this->attrs['imageBorder'] ) ) {
			$this->handle_border( 'imageBorder', 'img' );
		}

		if ( isset( $this->attrs['imageOpacity'] ) ) {
			$this->inject_style(
				array(
					'selector'       => 'img',
					'property'       => function ( $value ) {
						return "opacity: {$value};";
					},
					'value'          => $this->attrs['imageOpacity'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['imageBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => 'img',
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['imageBoxShadow'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['imageBorderHover'] ) ) {
			$this->handle_border( 'imageBorderHover', 'img:hover' );
		}

		if ( isset( $this->attrs['imageOpacityHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => 'img:hover',
					'property'       => function ( $value ) {
						return "opacity: {$value};";
					},
					'value'          => $this->attrs['imageOpacityHover'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['imageBoxShadowHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => 'img:hover',
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['imageBoxShadowHover'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['background'] ) ) {
			$this->handle_background( 'body', $this->attrs['background'] );
		}
	}
}
