<?php
/**
 * Global Variable
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-framework
 */

namespace Gutenverse\Framework;

/**
 * Class Global Variable
 *
 * @package gutenverse-framework
 */
class Global_Variable {
	/**
	 * Allowed font source types.
	 *
	 * @var string[]
	 */
	private $allowed_font_types = array(
		'system',
		'google',
		'custom_font_pro',
	);

	/**
	 * Allowed typography weight values.
	 *
	 * @var string[]
	 */
	private $allowed_font_weights = array(
		'default',
		'normal',
		'bold',
		'100',
		'200',
		'300',
		'400',
		'500',
		'600',
		'700',
		'800',
		'900',
	);

	/**
	 * Allowed typography transform values.
	 *
	 * @var string[]
	 */
	private $allowed_font_transforms = array(
		'default',
		'uppercase',
		'lowercase',
		'capitalize',
		'normal',
		'none',
	);

	/**
	 * Allowed typography style values.
	 *
	 * @var string[]
	 */
	private $allowed_font_styles = array(
		'default',
		'normal',
		'italic',
		'oblique',
	);

	/**
	 * Allowed typography decoration values.
	 *
	 * @var string[]
	 */
	private $allowed_font_decorations = array(
		'default',
		'underline',
		'overline',
		'line-through',
		'none',
	);

	/**
	 * Allowed size units.
	 *
	 * @var string[]
	 */
	private $allowed_dimension_units = array(
		'px',
		'em',
		'rem',
		'%',
		'vw',
		'vh',
	);

	/**
	 * Global variable option.
	 *
	 * @var string
	 */
	private $variable_option;

	/**
	 * Global font option.
	 *
	 * @var string
	 */
	private $font_option;

	/**
	 * Global color option.
	 *
	 * @var string
	 */
	private $color_option;

	/**
	 * Global google font option.
	 *
	 * @var string
	 */
	private $google_option;

	/**
	 * Init constructor.
	 */
	public function __construct() {
		$current_theme = get_stylesheet();

		$this->variable_option = 'gutenverse-global-variable';
		$this->font_option     = 'gutenverse-global-variable-font-' . $current_theme;
		$this->color_option    = 'gutenverse-global-variable-color-' . $current_theme;
		$this->google_option   = 'gutenverse-global-variable-google-' . $current_theme;
	}

	/**
	 * Set global variables of a theme
	 *
	 * @param array $options Options.
	 */
	public function set_global_variable( $options ) {
		$options = is_array( $options ) ? $options : array();

		// clear old variable option.
		update_option( 'gutenverse-global-variable', array(), true );

		// save values to new variable options.
		if ( isset( $options['googlefont'] ) ) {
			$google_fonts = $this->sanitize_google_fonts( $options['googlefont'] );
			if ( false !== get_option( $this->google_option ) ) {
				update_option( $this->google_option, $google_fonts, true );
			} else {
				add_option( $this->google_option, $google_fonts );
			}
		}

		if ( isset( $options['fonts'] ) ) {
			$fonts = $this->sanitize_global_fonts( $options['fonts'] );
			if ( false !== get_option( $this->font_option ) ) {
				update_option( $this->font_option, $fonts, true );
			} else {
				add_option( $this->font_option, $fonts );
			}
		}

		if ( isset( $options['colors'] ) ) {
			if ( false !== get_option( $this->color_option ) ) {
				update_option( $this->color_option, $options['colors'], true );
			} else {
				add_option( $this->color_option, $options['colors'] );
			}
		}
	}

	/**
	 * Google Fonts. Need to fetch font config from child if data is empty.
	 */
	public function get_google_fonts() {
		$google_fonts = $this->sanitize_google_fonts( get_option( $this->google_option, false ) );
		if ( ! $google_fonts ) {
			$config = apply_filters( 'gutenverse_block_config', array() );
			if ( isset( $config['globalVariable']['fonts'] ) ) {
				$google_fonts = array();
				$fonts_config = $config['globalVariable']['fonts'];
				$fonts_option = $this->sanitize_global_fonts( get_option( $this->font_option ) );
				$fonts        = $this->sanitize_global_fonts( $fonts_config );
				if ( $fonts_option ) {
					$fonts = array_merge( $fonts, $fonts_option );
				}

				foreach ( $fonts as $font ) {
					$the_font = $font['font'];
					if ( ! empty( $the_font ) ) {
						$weight    = isset( $the_font['weight'] ) ? $the_font['weight'] : 'default';
						$font_data = isset( $the_font['font'] ) ? $the_font['font'] : array();
						if ( empty( $font_data ) ) {
							continue;
						}
						$google_fonts[] = array(
							'label'   => $this->sanitize_font_string( $font_data['label'] ),
							'type'    => $this->sanitize_font_type( $font_data['type'] ),
							'value'   => $this->sanitize_font_string( $font_data['value'] ),
							'weight'  => $this->sanitize_font_choice( $weight, $this->allowed_font_weights ),
							'id'      => $this->sanitize_font_slug( $font['id'] ),
							'weights' => array( $this->sanitize_font_choice( $weight, $this->allowed_font_weights ) ),
						);
					}
				}
			} else {
				$google_fonts = array();
			}
		}

		return $this->sanitize_google_fonts( $google_fonts );
	}

	/**
	 * Global Fonts. Need to fetch font config from child if data is empty.
	 */
	public function get_global_fonts() {
		$global_fonts = $this->sanitize_global_fonts( get_option( $this->font_option, false ) );

		if ( ! $global_fonts ) {
			$config = apply_filters( 'gutenverse_block_config', array() );
			if ( isset( $config['globalVariable']['fonts'] ) ) {
				$global_fonts = $this->sanitize_global_fonts( $config['globalVariable']['fonts'] );
			} else {
				$global_fonts = array();
			}
		}

		return $global_fonts;
	}

	/**
	 * Get global variables of a theme
	 *
	 * @param string $type which variable to get, default = all.
	 *
	 * @return array
	 */
	public function get_global_variable( $type = null ) {
		// Get value from old option.
		$global_variable = get_option( $this->variable_option );
		$global_pallete  = wp_get_global_settings( array( 'color', 'palette' ) );

		// Get value from new options.
		$global_fonts  = $this->get_global_fonts();
		$google_fonts  = $this->get_google_fonts();
		$global_colors = get_option( $this->color_option, array() );
		$inc_old_fonts = false;

		if ( ! empty( $global_variable['fonts'] ) ) {
			$global_fonts  = array_merge( $global_fonts, $this->sanitize_global_fonts( $global_variable['fonts'] ) );
			$inc_old_fonts = true;
		}

		if ( ! empty( $global_variable['colors'] ) ) {
			$global_colors = array_merge( $global_colors, $global_variable['colors'] );
		}

		if ( 'font' === $type || 'fonts' === $type ) {
			return $global_fonts;
		}

		if ( 'color' === $type || 'colors' === $type ) {
			return $global_colors;
		}

		if ( 'google' === $type ) {
			return $google_fonts;
		}
		if ( 'custom_font_pro' === $type ) {
			$custom_font = array();
			if ( $global_fonts ) {
				foreach ( $global_fonts as $value ) {
					if ( isset( $value ['font']['font']['type'] ) && 'custom_font_pro' === $value ['font']['font']['type'] ) {
						$temp_arr = array(
							'value'  => $value['font']['font']['value'],
							'type'   => $value['font']['font']['type'],
							'weight' => $value['font']['weight'],
						);
						array_push( $custom_font, $temp_arr );
					} else {
						continue;
					}
				}
			}
			return $custom_font;
		}
		if ( empty( $global_colors ) ) {
			$global_colors = $global_pallete;
		}
		return array(
			'colors'    => $global_colors,
			'fonts'     => $global_fonts,
			'old_fonts' => $inc_old_fonts,
		);
	}

	/**
	 * Sanitize an array of global font items.
	 *
	 * @param mixed $fonts Font payload.
	 *
	 * @return array
	 */
	private function sanitize_global_fonts( $fonts ) {
		if ( ! is_array( $fonts ) ) {
			return array();
		}

		$sanitized_fonts = array();

		foreach ( $fonts as $font ) {
			if ( ! is_array( $font ) ) {
				continue;
			}

			$sanitized_font = array(
				'id'   => isset( $font['id'] ) ? $this->sanitize_font_slug( $font['id'] ) : '',
				'name' => isset( $font['name'] ) ? $this->sanitize_font_string( $font['name'] ) : '',
				'font' => isset( $font['font'] ) && is_array( $font['font'] ) ? $this->sanitize_typography_settings( $font['font'] ) : array(),
			);

			if ( '' === $sanitized_font['id'] ) {
				continue;
			}

			$sanitized_fonts[] = $sanitized_font;
		}

		return $sanitized_fonts;
	}

	/**
	 * Sanitize cached google font data.
	 *
	 * @param mixed $fonts Google font payload.
	 *
	 * @return array
	 */
	private function sanitize_google_fonts( $fonts ) {
		if ( ! is_array( $fonts ) ) {
			return array();
		}

		$sanitized_fonts = array();

		foreach ( $fonts as $font ) {
			if ( ! is_array( $font ) ) {
				continue;
			}

			$font_reference = $this->sanitize_font_reference( $font );
			if ( empty( $font_reference ) ) {
				continue;
			}

			$font_reference['id']     = isset( $font['id'] ) ? $this->sanitize_font_slug( $font['id'] ) : '';
			$font_reference['weight'] = isset( $font['weight'] ) ? $this->sanitize_font_choice( $font['weight'], $this->allowed_font_weights ) : '';
			$font_reference['weights'] = array();

			if ( isset( $font['weights'] ) && is_array( $font['weights'] ) ) {
				foreach ( $font['weights'] as $weight ) {
					$sanitized_weight = $this->sanitize_font_choice( $weight, $this->allowed_font_weights );
					if ( '' !== $sanitized_weight ) {
						$font_reference['weights'][] = $sanitized_weight;
					}
				}
			}

			$sanitized_fonts[] = $font_reference;
		}

		return $sanitized_fonts;
	}

	/**
	 * Sanitize a typography settings object.
	 *
	 * @param array $settings Typography settings.
	 *
	 * @return array
	 */
	private function sanitize_typography_settings( $settings ) {
		$sanitized = array();

		if ( isset( $settings['font'] ) && is_array( $settings['font'] ) ) {
			$font_reference = $this->sanitize_font_reference( $settings['font'] );
			if ( ! empty( $font_reference ) ) {
				$sanitized['font'] = $font_reference;
			}
		}

		if ( isset( $settings['size'] ) && is_array( $settings['size'] ) ) {
			$sanitized['size'] = $this->sanitize_responsive_dimension( $settings['size'], false );
		}

		if ( isset( $settings['weight'] ) ) {
			$weight = $this->sanitize_font_choice( $settings['weight'], $this->allowed_font_weights );
			if ( '' !== $weight ) {
				$sanitized['weight'] = $weight;
			}
		}

		if ( isset( $settings['transform'] ) ) {
			$transform = $this->sanitize_font_choice( $settings['transform'], $this->allowed_font_transforms );
			if ( '' !== $transform ) {
				$sanitized['transform'] = $transform;
			}
		}

		if ( isset( $settings['style'] ) ) {
			$style = $this->sanitize_font_choice( $settings['style'], $this->allowed_font_styles );
			if ( '' !== $style ) {
				$sanitized['style'] = $style;
			}
		}

		if ( isset( $settings['decoration'] ) ) {
			$decoration = $this->sanitize_font_choice( $settings['decoration'], $this->allowed_font_decorations );
			if ( '' !== $decoration ) {
				$sanitized['decoration'] = $decoration;
			}
		}

		if ( isset( $settings['lineHeight'] ) && is_array( $settings['lineHeight'] ) ) {
			$sanitized['lineHeight'] = $this->sanitize_responsive_dimension( $settings['lineHeight'], false );
		}

		if ( isset( $settings['spacing'] ) && is_array( $settings['spacing'] ) ) {
			$sanitized['spacing'] = $this->sanitize_responsive_spacing( $settings['spacing'] );
		}

		return $sanitized;
	}

	/**
	 * Sanitize a font reference object.
	 *
	 * @param array $font Font reference payload.
	 *
	 * @return array
	 */
	private function sanitize_font_reference( $font ) {
		$label = isset( $font['label'] ) ? $this->sanitize_font_string( $font['label'] ) : '';
		$value = isset( $font['value'] ) ? $this->sanitize_font_string( $font['value'] ) : '';
		$type  = isset( $font['type'] ) ? $this->sanitize_font_type( $font['type'] ) : '';

		if ( '' === $value || '' === $type ) {
			return array();
		}

		return array(
			'label' => '' !== $label ? $label : $value,
			'value' => $value,
			'type'  => $type,
		);
	}

	/**
	 * Sanitize a font label/value string.
	 *
	 * @param mixed $value String value.
	 *
	 * @return string
	 */
	private function sanitize_font_string( $value ) {
		if ( ! is_scalar( $value ) ) {
			return '';
		}

		$value = sanitize_text_field( (string) $value );
		$value = preg_replace( '/[\x00-\x1F\x7F<>"\';{}\\\\]/u', '', $value );
		$value = preg_replace( '/[^\p{L}\p{N} _\-\.,&()]/u', '', $value );

		return trim( $value );
	}

	/**
	 * Sanitize a font item slug.
	 *
	 * @param mixed $value Slug value.
	 *
	 * @return string
	 */
	private function sanitize_font_slug( $value ) {
		if ( ! is_scalar( $value ) ) {
			return '';
		}

		return sanitize_title( (string) $value );
	}

	/**
	 * Sanitize a font type.
	 *
	 * @param mixed $value Type value.
	 *
	 * @return string
	 */
	private function sanitize_font_type( $value ) {
		$value = is_scalar( $value ) ? sanitize_key( (string) $value ) : '';

		return in_array( $value, $this->allowed_font_types, true ) ? $value : '';
	}

	/**
	 * Sanitize a value against an allow-list.
	 *
	 * @param mixed    $value   Value to sanitize.
	 * @param string[] $allowed Allowed values.
	 *
	 * @return string
	 */
	private function sanitize_font_choice( $value, $allowed ) {
		$value = is_scalar( $value ) ? sanitize_key( (string) $value ) : '';

		return in_array( $value, $allowed, true ) ? $value : '';
	}

	/**
	 * Sanitize a responsive point/unit object.
	 *
	 * @param array $value          Responsive value.
	 * @param bool  $allow_negative Whether negative numbers are allowed.
	 *
	 * @return array
	 */
	private function sanitize_responsive_dimension( $value, $allow_negative ) {
		$sanitized = array();
		$devices   = array( 'Desktop', 'Tablet', 'Mobile' );

		foreach ( $devices as $device ) {
			if ( ! isset( $value[ $device ] ) || ! is_array( $value[ $device ] ) ) {
				continue;
			}

			$point = isset( $value[ $device ]['point'] ) ? $this->sanitize_numeric_value( $value[ $device ]['point'], $allow_negative ) : null;
			$unit  = isset( $value[ $device ]['unit'] ) ? sanitize_key( (string) $value[ $device ]['unit'] ) : '';

			if ( null === $point || ! in_array( $unit, $this->allowed_dimension_units, true ) ) {
				continue;
			}

			$sanitized[ $device ] = array(
				'point' => $point,
				'unit'  => $unit,
			);
		}

		return $sanitized;
	}

	/**
	 * Sanitize responsive spacing values.
	 *
	 * @param array $value Responsive spacing value.
	 *
	 * @return array
	 */
	private function sanitize_responsive_spacing( $value ) {
		$sanitized = array();
		$devices   = array( 'Desktop', 'Tablet', 'Mobile' );

		foreach ( $devices as $device ) {
			if ( ! isset( $value[ $device ] ) ) {
				continue;
			}

			$spacing = $this->sanitize_numeric_value( $value[ $device ], true );
			if ( null === $spacing ) {
				continue;
			}

			$sanitized[ $device ] = $spacing;
		}

		return $sanitized;
	}

	/**
	 * Sanitize a numeric value used in typography settings.
	 *
	 * @param mixed $value          Numeric value.
	 * @param bool  $allow_negative Whether negative numbers are allowed.
	 *
	 * @return int|float|null
	 */
	private function sanitize_numeric_value( $value, $allow_negative ) {
		if ( is_string( $value ) ) {
			$value = trim( $value );
		}

		if ( '' === $value || ! is_numeric( $value ) ) {
			return null;
		}

		$numeric = 0 + $value;

		if ( ! $allow_negative && $numeric < 0 ) {
			return null;
		}

		return $numeric;
	}
}
