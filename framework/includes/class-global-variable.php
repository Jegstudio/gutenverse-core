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
		// clear old variable option.
		update_option( 'gutenverse-global-variable', array() );

		// save values to new variable options.
		if ( isset( $options['googlefont'] ) ) {
			if ( false !== get_option( $this->google_option ) ) {
				update_option( $this->google_option, $options['googlefont'] );
			} else {
				add_option( $this->google_option, $options['googlefont'] );
			}
		}

		if ( isset( $options['fonts'] ) ) {
			if ( false !== get_option( $this->font_option ) ) {
				update_option( $this->font_option, $options['fonts'] );
			} else {
				add_option( $this->font_option, $options['fonts'] );
			}
		}

		if ( isset( $options['colors'] ) ) {
			if ( false !== get_option( $this->color_option ) ) {
				update_option( $this->color_option, $options['colors'] );
			} else {
				add_option( $this->color_option, $options['colors'] );
			}
		}
	}

	/**
	 * Google Fonts. Need to fetch font config from child if data is empty.
	 */
	public function get_google_fonts() {
		$google_fonts = get_option( $this->google_option, false );
		if ( ! $google_fonts ) {
			$config = apply_filters( 'gutenverse_block_config', array() );
			if ( isset( $config['globalVariable']['fonts'] ) ) {
				$google_fonts = array();
				$fonts        = $config['globalVariable']['fonts'];
				foreach ( $fonts as $font ) {
					$the_font = $font['font'];
					if ( ! empty( $the_font ) ) {
                        $weight         = isset( $the_font['weight'] ) ? $the_font['weight'] : 'default';
                        $font_data      = isset( $the_font['font'] ) ? $the_font['font'] : array();
                        $google_fonts[] = array(
                            'label'   => $font_data['label'],
                            'type'    => $font_data['type'],
                            'value'   => $font_data['value'],
                            'weight'  => $weight,
                            'id'      => $font['id'],
                            'weights' => array( $weight ),
                        );
                    }
				}
			} else {
				$google_fonts = array();
			}
		}

		return $google_fonts;
	}

	/**
	 * Global Fonts. Need to fetch font config from child if data is empty.
	 */
	public function get_global_fonts() {
		$global_fonts = get_option( $this->font_option, false );

		if ( ! $global_fonts ) {
			$config = apply_filters( 'gutenverse_block_config', array() );
			if ( isset( $config['globalVariable']['fonts'] ) ) {
				$global_fonts = $config['globalVariable']['fonts'];
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

		// Get value from new options.
		$global_fonts  = $this->get_global_fonts();
		$google_fonts  = $this->get_google_fonts();
		$global_colors = get_option( $this->color_option, array() );
		$inc_old_fonts = false;

		if ( ! empty( $global_variable['fonts'] ) ) {
			$global_fonts  = array_merge( $global_fonts, $global_variable['fonts'] );
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

		return array(
			'colors'    => $global_colors,
			'fonts'     => $global_fonts,
			'old_fonts' => $inc_old_fonts,
		);
	}
}
