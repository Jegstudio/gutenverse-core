<?php
/**
 * Gutenverse Style Interface
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-framework
 */

namespace Gutenverse\Framework;

use Error;

/**
 * Class Style_Interface
 *
 * @package gutenverse\framework
 */
abstract class Style_Interface {
	/**
	 * Block Attributes
	 *
	 * @var array
	 */
	protected $attrs;

	/**
	 * Element ID
	 *
	 * @var array
	 */
	protected $element_id;

	/**
	 * Name
	 *
	 * @var array
	 */
	protected $name;

	/**
	 * Generated Style for each device.
	 *
	 * @var array
	 */
	protected $generated = array(
		'Desktop' => array(),
		'Laptop'  => array(),
		'Tablet'  => array(),
		'Mobile'  => array(),
	);

	/**
	 * Additional Style.
	 *
	 * @var array
	 */
	protected $additional_style = array();

	/**
	 * Block Font variables
	 *
	 * @var array
	 */
	protected $font_variables;

	/**
	 * Block Font Families
	 *
	 * @var array
	 */
	protected $font_families;

	/**
	 * List of feature on blocks.
	 *
	 * @var array
	 */
	private $features = array();

	/**
	 * Generate style base on attribute.
	 *
	 * @return string.
	 */
	public function generate_style() {
		// need to reset style.
		$this->generate();
		$this->process_features();
		$this->style_filtered();

		return $this->render_style();
	}

	/**
	 * Generated Style Filtered.
	 */
	public function style_filtered() {
		do_action_ref_array( 'gutenverse_generated_style', array( &$this ) );
	}

	/**
	 * Get Style Features.
	 *
	 * @return array
	 */
	public function get_features() {
		return $this->features;
	}

	/**
	 * Get Attributes
	 *
	 * @return array
	 */
	public function get_attributes() {
		return $this->attrs;
	}

	/**
	 * Get Element Id.
	 *
	 * @return string
	 */
	public function get_element_id() {
		return $this->element_id;
	}

	/**
	 * Style
	 */
	public function render_style() {
		$generated_style = array();

		foreach ( $this->generated as $device => $css ) {
			$device_style = array();

			foreach ( $css as $selector => $property ) {
				$property_string = join( ' ', $property );
				if ( ! empty( $property_string ) ) {
					$device_style[] = "{$selector} { {$property_string} }";
				}
			}

			$generated_device_style = join( ' ', $device_style );

			if ( ! empty( $generated_device_style ) ) {
				if ( 'Desktop' === $device ) {
					$generated_style[] = $generated_device_style;
				} elseif ( 'Tablet' === $device ) {
					$generated_style[] = '@media only screen and (max-width: ' . gutenverse_breakpoint( 'Tablet' ) . 'px) { ' . $generated_device_style . ' }';
				} elseif ( 'Mobile' === $device ) {
					$generated_style[] = '@media only screen and (max-width: ' . gutenverse_breakpoint( 'Mobile' ) . 'px) { ' . $generated_device_style . ' }';
				}
			}
		}

		$generated_style = array_merge( $generated_style, $this->get_additional_style() );
		return join( ' ', $generated_style );
	}

	/**
	 * Get additional style that cannot be covered with normal inject style.
	 */
	public function get_additional_style() {
		return $this->additional_style;
	}

	/**
	 * Push Additonal Style.
	 *
	 * @param string $style Generated Style.
	 */
	public function push_additional_style( $style ) {
		$this->additional_style[] = $style;
	}

	/**
	 * Get All Gutenberg Device
	 */
	public function get_all_device() {
		return array( 'Desktop', 'Laptop', 'Tablet', 'Mobile' );
	}

	/**
	 * Get Device Value
	 *
	 * @param string $device .
	 * @param array  $values .
	 */
	public function get_device_value( $device, $values ) {
		if ( is_array( $values ) ) {
			$devices = array();

			switch ( $device ) {
				case 'Desktop':
					$devices[] = 'Desktop';
					break;
				case 'Tablet':
					$devices[] = 'Tablet';
					$devices[] = 'Desktop';
					break;
				case 'Mobile':
					$devices[] = 'Mobile';
					$devices[] = 'Tablet';
					$devices[] = 'Desktop';
					break;
			}

			foreach ( $devices as $device ) {
				if ( ! empty( $values[ $device ] ) ) {
					return $values[ $device ];
				}
			}
		}

		return null;
	}

	/**
	 * Check if variable is empty and not contain 0
	 *
	 * @param mixed $value .
	 *
	 * @return boolean
	 */
	public function truly_empty( &$value = '' ) {
		return empty( $value ) && '0' !== $value && 0 !== $value;
	}

	/**
	 * Inject Control Style
	 *
	 * @param array $data Control.
	 */
	public function inject_style( $data ) {
		if ( $data['device_control'] && ! $this->is_variable( $data['value'] ) && is_array( $data['value'] ) ) {
			$devices = $this->get_all_device();
			foreach ( $devices as $device ) {
				if ( ! $this->truly_empty( $data['value'][ $device ] ) || ( isset( $data['ignore_empty'] ) && $data['ignore_empty'] ) ) {
					$value    = $data['value'][ $device ];
					$selector = $data['selector'];
					$property = call_user_func( $data['property'], $value, $device );
					if ( ! isset( $this->generated[ $device ][ $selector ] ) ) {
						$this->generated[ $device ][ $selector ] = array();
					}

					$this->generated[ $device ][ $selector ][] = $property;
				}
			}
		} elseif ( isset( $data['value'] ) && isset( $data['property'] ) ) {
				$property = call_user_func( $data['property'], $data['value'] );
				$selector = $data['selector'];

				$this->generated['Desktop'][ $selector ][] = $property;
		}
	}

	/**
	 * Inject Column Style.
	 *
	 * @param string $selector Selector.
	 * @param array  $value Value of input.
	 */
	public function inject_column_width_style( $selector, $value ) {
		$devices = $this->get_all_device();

		foreach ( $devices as $device ) {
			$this->generated[ $device ][ $selector ] = array();
			if ( 'Desktop' === $device ) {
				if ( isset( $value[ $device ] ) ) {
					$this->generated[ $device ][ $selector ][] = "width: {$value[$device]}%;";
				}
			}

			if ( 'Tablet' === $device ) {
				if ( isset( $value[ $device ] ) ) {
					$this->generated[ $device ][ $selector ][] = "width: {$value[$device]}%;";
				} else {
					$this->generated[ $device ][ $selector ][] = "width: {$value['Desktop']}%;";
				}
			}

			if ( 'Mobile' === $device ) {
				$selector = ".guten-section {$selector}.guten-column ";
				if ( isset( $value[ $device ] ) ) {
					$this->generated[ $device ][ $selector ]   = array();
					$this->generated[ $device ][ $selector ][] = "width: {$value[$device]}%;";
				}
			}
		}
	}

	/**
	 * Check if value is from variable
	 *
	 * @param array $value variable value.
	 *
	 * @return boolean
	 */
	protected function is_variable( $value ) {
		return ! empty( $value['type'] ) && ! empty( $value['id'] ) && 'variable' === $value['type'];
	}

	/**
	 * Variable Font Name.
	 *
	 * @param string $id name of variable.
	 * @param string $child attribute child.
	 *
	 * @return string
	 */
	protected function variable_font_name( $id, $child ) {
		return "--gutenverse-font-{$child}-{$id}";
	}

	/**
	 * Add Font if google font
	 *
	 * @param array $typography .
	 */
	protected function add_font( $typography ) {
		if ( ! empty( $typography['font'] ) ) {
			$style  = isset( $typography['style'] ) ? $typography['style'] : '';
			$weight = isset( $typography['weight'] ) ? $typography['weight'] : '';
			$type   = $typography['font']['type'];
			$family = $typography['font']['value'];

			if ( $weight && 'italic' === $style ) {
				$weight = $weight . $style;
			}

			$this->font_families[] = array(
				'value'  => $family,
				'type'   => $type,
				'weight' => $weight,
			);
		}
	}

	/**
	 * Get font family
	 *
	 * @return array
	 */
	public function get_fonts() {
		return $this->font_families;
	}

	/**
	 * Get font family
	 *
	 * @return array
	 */
	public function get_fonts_var() {
		return $this->font_variables;
	}

	/**
	 * Typography format.
	 *
	 * @return array.
	 */
	protected function typography_format() {
		return array(
			'font'       => array(
				'property'       => function ( $value ) {
					return $this->is_variable( $value ) ? "font-family: var({$this->variable_font_name($value['id'], 'family')});" : "font-family: \"{$value['value']}\";";
				},
				'device_control' => false,
			),
			'size'       => array(
				'property'       => function ( $value ) {
					return $this->is_variable( $value ) ? "font-size: var({$this->variable_font_name($value['id'], 'size')});" : $this->handle_unit_point( $value, 'font-size' );
				},
				'device_control' => true,
			),
			'weight'     => array(
				'property'       => function ( $value ) {
					return $this->is_variable( $value ) ? "font-weight: var({$this->variable_font_name($value['id'], 'weight')});" : "font-weight: {$value};";
				},
				'device_control' => false,
			),
			'transform'  => array(
				'property'       => function ( $value ) {
					return $this->is_variable( $value ) ? "text-transform: var({$this->variable_font_name($value['id'], 'transform')});" : "text-transform: {$value};";
				},
				'device_control' => false,
			),
			'style'      => array(
				'property'       => function ( $value ) {
					return $this->is_variable( $value ) ? "font-style: var({$this->variable_font_name($value['id'], 'style')});" : "font-style: {$value};";
				},
				'device_control' => false,
			),
			'decoration' => array(
				'property'       => function ( $value ) {
					return $this->is_variable( $value ) ? "text-decoration: var({$this->variable_font_name($value['id'], 'decoration')});" : "text-decoration: {$value};";
				},
				'device_control' => false,
			),
			'lineHeight' => array(
				'property'       => function ( $value ) {
					return $this->is_variable( $value ) ? "line-height: var({$this->variable_font_name($value['id'], 'lineHeight')});" : $this->handle_unit_point( $value, 'line-height' );
				},
				'device_control' => true,
			),
			'spacing'    => array(
				'property'       => function ( $value ) {
					return $this->is_variable( $value ) ? "letter-spacing: var({$this->variable_font_name($value['id'], 'spacing')});" : "letter-spacing: {$value}em;";
				},
				'device_control' => true,
			),
		);
	}

	/**
	 * Inject Typography.
	 *
	 * @param array $data Control.
	 */
	protected function inject_typography( $data ) {
		$selector   = $data['selector'];
		$typography = $data['value'];
		$format     = $this->typography_format();

		if ( isset( $typography['type'] ) && 'variable' === $typography['type'] ) {
			$this->font_variables[] = $typography['id'];
			foreach ( $format as $key => $value ) {
				$this->inject_style(
					array(
						'selector'       => $selector,
						'property'       => $value['property'],
						'value'          => $typography,
						'device_control' => $value['device_control'],
					)
				);
			}
		} else {
			$this->add_font( $typography );
			foreach ( $format as $key => $value ) {
				if ( ! empty( $typography[ $key ] ) ) {
					$this->inject_style(
						array(
							'selector'       => $selector,
							'property'       => $value['property'],
							'value'          => $typography[ $key ],
							'device_control' => $value['device_control'],
						)
					);
				}
			}
		}
	}

	/**
	 * Variable Name.
	 *
	 * @param string $id name of variable.
	 *
	 * @return string
	 */
	protected function variable_color_name( $id ) {
		return "--wp--preset--color--{$id}";
	}

	/**
	 * Handle gradient
	 *
	 * @param array  $props Value of Color.
	 * @param string $angle gradient angle.
	 *
	 * @return string
	 */
	public function handle_gradient( $props, $angle ) {
		foreach ( $props as $gradient ) {
			$offset   = $gradient['offset'] * 100;
			$colors[] = "{$gradient['color']} {$offset}%";
		}

		$colors = join( ',', $colors );

		return "background: linear-gradient({$angle}deg, {$colors});";
	}

	/**
	 * Handle color
	 *
	 * @param array  $props Value of Color.
	 * @param string $property property of element.
	 *
	 * @return string
	 */
	public function handle_color( $props, $property ) {
		$color = $this->get_color( $props );

		return "{$property}: $color;";
	}

	/**
	 * Handle color
	 *
	 * @param array $props Value of Color.
	 *
	 * @return string
	 */
	protected function get_color( $props ) {
		$result = '';

		if ( isset( $props['r'] ) && isset( $props['g'] ) && isset( $props['b'] ) && isset( $props['a'] ) ) {
			$result = "rgba({$props['r']}, {$props['g']}, {$props['b']}, {$props['a']})";
		}

		if ( isset( $props['type'] ) && 'variable' === $props['type'] ) {
			$value  = $this->variable_color_name( $props['id'] );
			$result = "var({$value})";
		}

		return $result;
	}

	/**
	 * Handle Unit Point
	 *
	 * @param array   $value Value of Point.
	 * @param string  $property Property Value.
	 * @param boolean $important set !important.
	 *
	 * @return string|null
	 */
	public function handle_unit_point( $value, $property, $important = false ) {
		if ( isset( $value['unit'] ) && isset( $value['point'] ) && '' !== $value['point'] ) {
			$point = $value['point'];
			$unit  = $value['unit'];
			$imp   = $important ? '!important' : '';

			return "{$property}: {$point}{$unit}{$imp};";
		}
	}

	/**
	 * Set Feature
	 *
	 * @param array $features Array of Features.
	 */
	protected function set_feature( $features ) {
		$this->features = $features;
	}

	/**
	 * Process Feature
	 */
	private function process_features() {
		foreach ( $this->features as $feature => $selector ) {
			switch ( $feature ) {
				case 'background':
					$this->feature_background( $selector );
					break;
				case 'border':
					$this->feature_border( $selector );
					break;
				case 'positioning':
					$this->feature_positioning( $selector );
					break;
				case 'advance':
					$this->feature_advance( $selector );
					break;
				case 'animation':
					$this->feature_animation( $selector );
					break;
			}
		}
	}

	/**
	 * Handle positioning Feature.
	 *
	 * @param string $selector Selector.
	 */
	protected function feature_positioning( $selector ) {
		if ( empty( $selector ) ) {
			$selector = ".{$this->element_id}";
		}

		if ( isset( $this->attrs['positioningType'] ) ) {
			$hide   = array(
				'Desktop' => ! empty( $this->attrs['hideDesktop'] ) ? $this->attrs['hideDesktop'] : null,
				'Tablet'  => ! empty( $this->attrs['hideTablet'] ) ? $this->attrs['hideTablet'] : null,
				'Mobile'  => ! empty( $this->attrs['hideMobile'] ) ? $this->attrs['hideMobile'] : null,
			);
			$values = $this->merge_device_options(
				array(
					'type' => $this->attrs['positioningType'],
					'hide' => $hide,
				)
			);
			if ( isset( $this->attrs['positioningWidth'] ) ) {
				$values = $this->merge_device_options(
					array(
						'type'  => $this->attrs['positioningType'],
						'width' => $this->attrs['positioningWidth'],
						'hide'  => $hide,
					)
				);
			}
			$this->inject_style(
				array(
					'selector'       => $selector,
					'property'       => function ( $value, $device ) {
						$output  = '';
						$display = 'display: inline-block;';

						if ( ! empty( $value['hide'] ) ) {
							$display = 'display: inline-block;';
							$output  = '';
						}

						if ( isset( $value ) && isset( $value['type'] ) ) {
							if ( 'full' === $value['type'] ) {
								return 'width: 100%!important;';
							} elseif ( 'inline' === $value['type'] ) {
								return "width: auto!important; {$display}";
							} elseif ( 'custom' === $value['type'] ) {
								if ( isset( $value['width'] ) ) {
									$unit_point = $this->handle_unit_point( $value['width'], 'width', true );
									return "{$unit_point} {$display}";
								}
							}
						}

						return $output;
					},
					'value'          => $values,
					'ignore_empty'   => true,
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['positioningAlign'] ) ) {
			if ( ! isset( $this->attrs['positioningLocation'] ) || ( isset( $this->attrs['positioningLocation'] ) && 'default' === $this->attrs['positioningLocation'] ) ) {
				$this->inject_style(
					array(
						'selector'       => $selector,
						'property'       => function ( $value ) {
							$align = $this->handle_align_v( $value );
							return "align-self: {$value}; vertical-align: {$align};";
						},
						'value'          => $this->attrs['positioningAlign'],
						'device_control' => true,
					)
				);
			}
		}

		if ( isset( $this->attrs['positioningLocation'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $selector,
					'property'       => function ( $value ) {
						if ( 'default' !== $value ) {
							return "position: {$value}!important;";
						}
					},
					'value'          => $this->attrs['positioningLocation'],
					'device_control' => false,
				)
			);

			if ( 'fixed' === $this->attrs['positioningLocation'] || 'absolute' === $this->attrs['positioningLocation'] ) {
				if ( isset( $this->attrs['positioningLeft'] ) ) {
					$this->inject_style(
						array(
							'selector'       => $selector,
							'property'       => function ( $value ) {
								return $this->handle_unit_point( $value, 'left' );
							},
							'value'          => $this->attrs['positioningLeft'],
							'device_control' => true,
						)
					);
				}

				if ( isset( $this->attrs['positioningRight'] ) ) {
					$this->inject_style(
						array(
							'selector'       => $selector,
							'property'       => function ( $value ) {
								return $this->handle_unit_point( $value, 'right' );
							},
							'value'          => $this->attrs['positioningRight'],
							'device_control' => true,
						)
					);
				}

				if ( isset( $this->attrs['positioningTop'] ) ) {
					$this->inject_style(
						array(
							'selector'       => $selector,
							'property'       => function ( $value ) {
								return $this->handle_unit_point( $value, 'top' );
							},
							'value'          => $this->attrs['positioningTop'],
							'device_control' => true,
						)
					);
				}

				if ( isset( $this->attrs['positioningBottom'] ) ) {
					$this->inject_style(
						array(
							'selector'       => $selector,
							'property'       => function ( $value ) {
								return $this->handle_unit_point( $value, 'bottom' );
							},
							'value'          => $this->attrs['positioningBottom'],
							'device_control' => true,
						)
					);
				}
			}
		}
	}

	/**
	 * Handle Alignment
	 *
	 * @param array $value Value of Alignment in Flexbox.
	 *
	 * @return string|null
	 */
	protected function handle_align( $value ) {
		switch ( $value ) {
			case 'flex-start':
				return 'left';
			case 'flex-end':
				return 'right';
			case 'center':
				return 'center';
			case 'space-between':
				return 'justify';
			default:
				return $value;
		}
	}

	/**
	 * Handle Alignment Vertical
	 *
	 * @param array $value Value of Alignment in Flexbox.
	 *
	 * @return string|null
	 */
	protected function handle_align_v( $value ) {
		switch ( $value ) {
			case 'flex-start':
				return 'top';
			case 'flex-end':
				return 'bottom';
			case 'center':
				return 'middle';
			default:
				return $value;
		}
	}

	/**
	 * Handle Alignment Reverse
	 *
	 * @param array $value Value of Alignment in Text Align.
	 *
	 * @return string|null
	 */
	protected function handle_align_reverse( $value ) {
		switch ( $value ) {
			case 'left':
				return 'flex-start';
			case 'right':
				return 'flex-end';
			case 'center':
				return 'center';
			case 'justify':
				return 'space-between';
			default:
				return $value;
		}
	}

	/**
	 * Handle Background Feature
	 *
	 * @param string $selector Selector.
	 */
	protected function feature_background( $selector ) {
		if ( empty( $selector ) ) {
			$selector = array(
				'normal' => ".{$this->element_id}",
				'hover'  => ".{$this->element_id}:hover",
			);
		}

		if ( isset( $this->attrs['background'] ) ) {
			$this->handle_background( $selector['normal'], $this->attrs['background'] );
		}

		if ( isset( $this->attrs['backgroundHover'] ) ) {
			$this->handle_background( $selector['hover'], $this->attrs['backgroundHover'] );
		}
	}

	/**
	 * Handle Background Processing.
	 *
	 * @param string $selector selector.
	 * @param array  $background Value of Color.
	 */
	protected function handle_background( $selector, $background ) {
		if ( ! isset( $background['type'] ) ) {
			return;
		}

		if ( 'default' === $background['type'] ) {
			if ( isset( $background['color'] ) ) {
				$this->inject_style(
					array(
						'selector'       => $selector,
						'property'       => function ( $value ) {
							return $this->handle_color( $value['color'], 'background' );
						},
						'value'          => $background,
						'device_control' => false,
					)
				);
			}

			if ( isset( $background['image'] ) ) {
				$this->inject_style(
					array(
						'selector'       => $selector,
						'property'       => function ( $value ) {
							return "background-image: url({$value['image']});";
						},
						'value'          => $background['image'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $background['position'] ) ) {
				$this->inject_style(
					array(
						'selector'       => $selector,
						'property'       => function ( $value ) {
							if ( 'custom' !== $value && 'default' !== $value ) {
								return "background-position: {$value};";
							}
						},
						'value'          => $background['position'],
						'device_control' => true,
					)
				);

				if ( isset( $background['xposition'] ) ) {
					$this->inject_style(
						array(
							'selector'       => $selector,
							'property'       => function ( $value ) {
								$position = $value['position'];
								$xposition = isset( $value['xposition'] ) ? $value['xposition'] : false;

								if ( 'custom' === $position && $xposition ) {
									return ! empty( $xposition['point'] ) ? "background-position-x: {$xposition['point']}{$xposition['unit']};" : null;
								}

								return null;
							},
							'value'          => $this->merge_device_options(
								array(
									'position'  => $background['position'],
									'xposition' => $background['xposition'],
								)
							),
							'device_control' => true,
						)
					);
				}

				if ( isset( $background['yposition'] ) ) {
					$this->inject_style(
						array(
							'selector'       => $selector,
							'property'       => function ( $value ) {
								$position = $value['position'];
								$yposition = isset( $value['yposition'] ) ? $value['yposition'] : false;

								if ( 'custom' === $position && $yposition ) {
									return ! empty( $yposition['point'] ) ? "background-position-y: {$yposition['point']}{$yposition['unit']};" : null;
								}

								return null;
							},
							'value'          => $this->merge_device_options(
								array(
									'position'  => $background['position'],
									'yposition' => $background['yposition'],
								)
							),
							'device_control' => true,
						)
					);
				}
			}

			if ( isset( $background['repeat'] ) ) {
				$this->inject_style(
					array(
						'selector'       => $selector,
						'property'       => function ( $value ) {
							return "background-repeat: {$value};";
						},
						'value'          => $background['repeat'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $background['size'] ) ) {
				$this->inject_style(
					array(
						'selector'       => $selector,
						'property'       => function ( $value ) {
							if ( 'custom' !== $value && 'default' !== $value ) {
								return "background-size: {$value};";
							}
						},
						'value'          => $background['size'],
						'device_control' => true,
					)
				);

				if ( isset( $background['size'] ) && isset( $background['width'] ) ) {
					$this->inject_style(
						array(
							'selector'       => $selector,
							'property'       => function ( $value ) {
								$size = $value['size'];
								$width = isset( $value['width'] ) ? $value['width'] : null;

								if ( 'custom' === $size && $width ) {
									return "background-size: {$width['point']}{$width['unit']};";
								}

								return null;
							},
							'value'          => $this->merge_device_options(
								array(
									'size'  => $background['size'],
									'width' => $background['width'],
								)
							),
							'device_control' => true,
						)
					);
				}
			}

			if ( isset( $background['blendMode'] ) && ! empty( $background['blendMode'] ) ) {
				$this->inject_style(
					array(
						'selector'       => $selector,
						'property'       => function ( $value ) {
							return "background-blend-mode: {$value};";
						},
						'value'          => $background['blendMode'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $background['fixed'] ) ) {
				$this->inject_style(
					array(
						'selector'       => $selector,
						'property'       => function ( $value ) {
							$bg_attachment = '';

							if ( is_bool( $value ) ) {
								$fixed = $value ? 'fixed' : 'scroll';
								$bg_attachment = "background-attachment: {$fixed};";
							}

							return $bg_attachment;
						},
						'ignore_empty'   => true,
						'value'          => $background['fixed'],
						'device_control' => true,
					)
				);
			}
		} elseif ( 'gradient' === $background['type'] ) {
			$this->inject_style(
				array(
					'selector'       => $selector,
					'property'       => function ( $value ) {
						$gradient_color        = $value['gradientColor'];
						$gradient_type         = $value['gradientType'];
						$gradient_angle        = $value['gradientAngle'];
						$gradient_radial       = $value['gradientRadial'];

						if ( ! empty( $gradient_color ) ) {
							$colors = array();

							foreach ( $gradient_color as $gradient ) {
								$offset  = $gradient['offset'] * 100;
								$colors[] = "{$gradient['color']} {$offset}%";
							}

							$colors = join( ',', $colors );

							if ( 'radial' === $gradient_type ) {
								return "background: radial-gradient(at {$gradient_radial}, {$colors});";
							} else {
								return "background: linear-gradient({$gradient_angle}deg, {$colors});";
							}
						}
					},
					'value'          => array(
						'gradientColor'       => isset( $background['gradientColor'] ) ? $background['gradientColor'] : null,
						'gradientPosition'    => isset( $background['gradientPosition'] ) ? $background['gradientPosition'] : 0,
						'gradientEndColor'    => isset( $background['gradientEndColor'] ) ? $background['gradientEndColor'] : null,
						'gradientEndPosition' => isset( $background['gradientEndPosition'] ) ? $background['gradientEndPosition'] : 100,
						'gradientType'        => isset( $background['gradientType'] ) ? $background['gradientType'] : 'linear',
						'gradientAngle'       => isset( $background['gradientAngle'] ) ? $background['gradientAngle'] : 180,
						'gradientRadial'      => isset( $background['gradientRadial'] ) ? $background['gradientRadial'] : 'center center',
					),
					'device_control' => false,
				)
			);
		} elseif ( 'video' === $background['type'] ) {
			if ( isset( $background['videoImage'] ) ) {
				$this->inject_style(
					array(
						'selector'       => $selector,
						'property'       => function ( $value ) {
							return "background-image: url({$value['image']}); background-size: cover; background-position: center;";
						},
						'value'          => $background['videoImage'],
						'device_control' => true,
					)
				);
			}
		}
	}


	/**
	 * Merge device option.
	 *
	 * @param array $options Value tobe merged.
	 *
	 * @return array
	 */
	protected function merge_device_options( $options ) {
		$results = array();
		$devices = $this->get_all_device();

		foreach ( $devices as $device ) {
			$results[ $device ] = array();

			foreach ( $options as $key => $option ) {
				if ( isset( $option[ $device ] ) ) {
					$results[ $device ][ $key ] = $option[ $device ];
				}
			}
		}

		return $results;
	}

	/**
	 * Handle Border Feature
	 *
	 * @param string $selector Selector.
	 */
	protected function feature_border( $selector ) {
		if ( empty( $selector ) ) {
			$selector = array(
				'normal' => ".{$this->element_id}",
				'hover'  => ".{$this->element_id}:hover",
			);
		}

		if ( isset( $this->attrs['border'] ) ) {
			$this->handle_border( 'border', $selector['normal'] );
		}

		if ( isset( $this->attrs['borderHover'] ) ) {
			$this->handle_border( 'borderHover', $selector['hover'] );
		}

		if ( isset( $this->attrs['boxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $selector['normal'],
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['boxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['boxShadowHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $selector['hover'],
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['boxShadowHover'],
					'device_control' => false,
				)
			);
		}
	}

	/**
	 * Handle Border
	 *
	 * @param array $name Value of Box Shadow.
	 * @param array $selector Value of Box Shadow.
	 */
	protected function handle_border( $name, $selector ) {
		if ( isset( $this->attrs[ $name ] ) ) {
			$borders = $this->attrs[ $name ];

			uksort(
				$borders,
				function ( $a, $b ) {
					if ( 'all' === $a ) {
						return -1;
					}

					if ( 'all' === $b ) {
						return 1;
					}

					return strcmp( $a, $b );
				}
			);

			foreach ( $borders as $pos => $value ) {
				if ( 'radius' === $pos ) {
					$this->inject_style(
						array(
							'selector'       => "$selector",
							'property'       => function ( $value ) {
								return $this->handle_border_radius( $value );
							},
							'value'          => $value,
							'device_control' => true,
						)
					);
				} elseif ( ! empty( $value ) && ! empty( $value['type'] ) ) {
					$position = 'all' === $pos ? '' : "{$pos}-";

					$this->inject_style(
						array(
							'selector'       => "$selector",
							'property'       => function ( $value ) {
								return "border-{$value['position']}style: {$value['value']};";
							},
							'value'          => array(
								'position' => $position,
								'value'    => $value['type'],
							),
							'device_control' => false,
						)
					);

					if ( ! $this->truly_empty( $value['width'] ) ) {
						$this->inject_style(
							array(
								'selector'       => "$selector",
								'property'       => function ( $value ) {
									return "border-{$value['position']}width: {$value['value']}px;";
								},
								'value'          => array(
									'position' => $position,
									'value'    => $value['width'],
								),
								'device_control' => false,
							)
						);
					}

					if ( ! empty( $value['color'] ) ) {
						$this->inject_style(
							array(
								'selector'       => "$selector",
								'property'       => function ( $value ) {
									return $this->handle_color( $value['value'], "border-{$value['position']}color" );
								},
								'value'          => array(
									'position' => $position,
									'value'    => $value['color'],
								),
								'device_control' => false,
							)
						);
					}
				}
			}
		}
	}

	/**
	 * Handle Border Radius
	 *
	 * @param array $value Value of border radius.
	 */
	protected function handle_border_radius( $value ) {
		if ( isset( $value['dimension'] ) ) {
			$style     = '';
			$dimension = isset( $value['dimension'] ) ? $value['dimension'] : array();
			$unit      = $value['unit'];

			if ( ! $this->truly_empty( $dimension['top'] ) ) {
				$style .= "border-top-left-radius: {$dimension['top']}{$unit};";
			}

			if ( ! $this->truly_empty( $dimension['right'] ) ) {
				$style .= "border-top-right-radius: {$dimension['right']}{$unit};";
			}

			if ( ! $this->truly_empty( $dimension['bottom'] ) ) {
				$style .= "border-bottom-right-radius: {$dimension['bottom']}{$unit};";
			}

			if ( ! $this->truly_empty( $dimension['left'] ) ) {
				$style .= "border-bottom-left-radius: {$dimension['left']}{$unit};";
			}

			return $style;
		}
	}

	/**
	 * Handle Advance Feature
	 *
	 * @param string $selector Selector.
	 */
	protected function feature_advance( $selector ) {
		if ( empty( $selector ) ) {
			$selector = ".guten-element.{$this->element_id}";
		}

		if ( isset( $this->attrs['margin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $selector,
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['margin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['padding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $selector,
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['padding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['zIndex'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $selector,
					'property'       => function ( $value ) {
						return "z-index: {$value};";
					},
					'value'          => $this->attrs['zIndex'],
					'device_control' => true,
				)
			);
		}
	}

	/**
	 * Handle Advance Feature
	 *
	 * @param string $selector Selector.
	 */
	protected function feature_animation( $selector ) {
		if ( empty( $selector ) ) {
			$selector = ".{$this->element_id}";
		}

		if ( isset( $this->attrs['animation'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $selector,
					'property'       => function ( $value ) {
						if ( ! $this->truly_empty( $value['delay'] ) ) {
							$delay = (int) $value['delay'] / 1000;
							return "animation-delay: {$delay}s;";
						}
					},
					'value'          => $this->attrs['animation'],
					'device_control' => false,
				)
			);

			if ( isset( $this->attrs['animation']['type'] ) && is_array( $this->attrs['animation']['type'] ) ) {
				$this->inject_style(
					array(
						'selector'       => $selector,
						'property'       => function ( $value ) {
							if ( 'none' === $value ) {
								return 'animation-name: none; visibility: visible !important;';
							}
						},
						'value'          => $this->attrs['animation']['type'],
						'device_control' => true,
					)
				);
			}
		}
	}

	/**
	 * Handle Box Shadow
	 *
	 * @param array $value Value of Box Shadow.
	 *
	 * @return string|null
	 */
	public function handle_box_shadow( $value ) {
		if ( ! $this->truly_empty( $value['color'] ) ) {
			$position     = ! $this->truly_empty( $value['position'] ) && 'inset' === $value['position'] ? $value['position'] : '';
			$horizontal   = ! $this->truly_empty( $value['horizontal'] ) ? $value['horizontal'] : 0;
			$vertical     = ! $this->truly_empty( $value['vertical'] ) ? $value['vertical'] : 0;
			$blur         = ! $this->truly_empty( $value['blur'] ) ? $value['blur'] : 0;
			$spread       = ! $this->truly_empty( $value['spread'] ) ? "{$value['spread']}px" : '';
			$shadow_color = $this->get_color( $value['color'] );

			return "box-shadow: {$position} {$horizontal}px {$vertical}px {$blur}px {$spread} {$shadow_color};";
		}
	}

	/**
	 * Handle Text Shadow
	 *
	 * @param array $value Value of Box Shadow.
	 *
	 * @return string|null
	 */
	protected function handle_text_shadow( $value ) {
		if ( isset( $value['color'] ) ) {
			$horizontal   = ! $this->truly_empty( $value['horizontal'] ) ? $value['horizontal'] : 0;
			$vertical     = ! $this->truly_empty( $value['vertical'] ) ? $value['vertical'] : 0;
			$blur         = ! $this->truly_empty( $value['blur'] ) ? $value['blur'] : 0;
			$shadow_color = $this->get_color( $value['color'] );

			return "text-shadow: {$horizontal}px {$vertical}px {$blur}px {$shadow_color};";
		}
	}

	/**
	 * Handle Dimension
	 *
	 * @param array   $attribute Value of Point.
	 * @param string  $prefix Property Value.
	 * @param boolean $multi multi element.
	 * @param int     $min minimal value.
	 *
	 * @return string|null
	 */
	protected function handle_dimension( $attribute, $prefix, $multi = true, $min = 0 ) {
		$positions = array( 'top', 'right', 'bottom', 'left' );
		$styles    = array();
		$string    = '';

		if ( isset( $attribute['dimension'] ) && isset( $attribute['unit'] ) ) {
			$dimension = $attribute['dimension'];
			$unit      = $attribute['unit'];

			if ( $multi ) {
				foreach ( $positions as $position ) {
					if ( ! $this->truly_empty( $dimension[ $position ] ) ) {
						$styles[] = "{$prefix}-{$position}: {$dimension[ $position ]}{$unit};";
					}
				}

				$string = join( ' ', $styles );
			} else {
				$is_empty = true;

				foreach ( $positions as $position ) {
					if ( ! $this->truly_empty( $dimension[ $position ] ) ) {
						$is_empty = false;
						$styles[] = "{$dimension[ $position ]}{$unit}";
					} else {
						$is_empty = $is_empty && true;
						$styles[] = "{$min}{$unit}";
					}
				}

				$style = join( ' ', $styles );

				$string = ! $is_empty ? "{$prefix}: {$style};" : '';
			}
		}

		return $string;
	}

	/**
	 * Get Name.
	 *
	 * @return string
	 */
	public function get_name() {
		return $this->name;
	}

	/**
	 * Generate Element.
	 */
	abstract protected function generate();
}
