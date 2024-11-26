<?php
/**
 * Gutenverse Style Interface
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-framework
 */

namespace Gutenverse\Framework;

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
	 * @var string
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
	 * Inline block status
	 *
	 * @var array
	 */
	protected $in_block = true;

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
	 * Sanitize value
	 *
	 * @param mixed $value .
	 *
	 * @return string|mixed
	 */
	public function sanitize_value( &$value = '' ) {
		if ( is_array( $value ) ) {
			foreach ( $value as $key => $child ) {
				$value[ $key ] = $this->sanitize_value( $child );
			}

			return $value;
		}

		return sanitize_text_field( $value );
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
				if ( isset( $data['skip_device'] ) && in_array( $device, $data['skip_device'], true ) ) {
					continue;
				}

				if ( ! gutenverse_truly_empty( $data['value'][ $device ] ) || ( isset( $data['ignore_empty'] ) && $data['ignore_empty'] ) ) {
					$value    = $this->sanitize_value( $data['value'][ $device ] );
					$selector = $data['selector'];
					$property = call_user_func( $data['property'], $value, $device );

					if ( empty( $property ) ) {
						continue;
					}

					if ( ! isset( $this->generated[ $device ][ $selector ] ) ) {
						$this->generated[ $device ][ $selector ] = array();
					}

					$this->generated[ $device ][ $selector ][] = $property;
				}
			}
		} elseif ( isset( $data['value'] ) && isset( $data['property'] ) ) {
				$value    = $this->sanitize_value( $data['value'] );
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
	public function inject_typography( $data ) {
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

		return '';
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
	 * Get Feature
	 */
	public function get_feature() {
		return $this->features;
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
				case 'mask':
					$this->feature_mask( $selector );
					break;
				case 'pointer':
					$this->feature_pointer_event( $selector );
					break;
				case 'cursor-effect':
					$this->feature_cursor_effect( $selector );
					break;
				case 'background-effect':
					$this->feature_background_effect( $selector );
					break;
			}
		}
	}

	/**
	 * Handle Feature Cursor.
	 *
	 * @param string $selector Selector.
	 */
	protected function feature_cursor_effect( $selector ) {
		if ( isset( $this->attrs['cursorEffect'] ) ) {
			$cursor_efect = $this->attrs['cursorEffect'];

			if ( isset( $cursor_efect['ZIndex'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}-cursor-effect.cursor-effect",
						'property'       => function ( $value ) {
							return "z-index: {$value}";
						},
						'value'          => $cursor_efect['ZIndex'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $cursor_efect['entranceTransition'] ) ) {
				$entrance_transition = $cursor_efect['entranceTransition'];

				switch ( $entrance_transition ) {
					case 'opacity':
						if ( isset( $cursor_efect['transitionSpeed'] ) ) {
							$this->inject_style(
								array(
									'selector'       => ".{$this->element_id}-cursor-effect.cursor-effect .cursor-content.enter, .{$this->element_id}-cursor-effect.cursor-effect .innerCursor.enter",
									'property'       => function ( $value ) {
										return "transition: opacity {$value}s, transform 0s;";
									},
									'value'          => $cursor_efect['transitionSpeed']['point'],
									'device_control' => false,
								)
							);
						}
						break;
					case 'scale':
						if ( isset( $cursor_efect['transitionSpeed'] ) ) {
							$this->inject_style(
								array(
									'selector'       => ".{$this->element_id}-cursor-effect.cursor-effect .cursor-content.enter, .{$this->element_id}-cursor-effect.cursor-effect .innerCursor.enter",
									'property'       => function ( $value ) {
										return "transition: opacity 0s, transform {$value}s;";
									},
									'value'          => $cursor_efect['transitionSpeed']['point'],
									'device_control' => false,
								)
							);
						}
						break;
					case 'opacityScale':
						if ( isset( $cursor_efect['transitionSpeed'] ) ) {
							$this->inject_style(
								array(
									'selector'       => ".{$this->element_id}-cursor-effect.cursor-effect .cursor-content.enter, .{$this->element_id}-cursor-effect.cursor-effect .innerCursor.enter",
									'property'       => function ( $value ) {
										return "transition: opacity {$value}s, transform {$value}s;";
									},
									'value'          => $cursor_efect['transitionSpeed']['point'],
									'device_control' => false,
								)
							);
						}
						break;
					default:
						break;
				}
			}

			if ( isset( $cursor_efect['blur'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}-cursor-effect.cursor-effect .cursor-content",
						'property'       => function ( $value ) {
							return "-webkit-backdrop-filter: blur({$value}px); backdrop-filter: blur({$value}px);";
						},
						'value'          => $cursor_efect['blur'],
						'device_control' => false,
					)
				);
			}

			switch ( $cursor_efect['type'] ) {
				case 'text':
					if ( isset( $cursor_efect['textColor'] ) ) {
						$this->inject_style(
							array(
								'selector'       => ".{$this->element_id}-cursor-effect.cursor-effect .cursor-content",
								'property'       => function ( $value ) {
									return $this->handle_color( $value, 'color' );
								},
								'value'          => $cursor_efect['textColor'],
								'device_control' => false,
							)
						);
					}

					if ( isset( $cursor_efect['background'] ) ) {
						$this->handle_background( ".{$this->element_id}-cursor-effect.cursor-effect .cursor-content", $cursor_efect['background'] );
					}

					if ( isset( $cursor_efect['padding'] ) ) {
						$this->inject_style(
							array(
								'selector'       => ".{$this->element_id}-cursor-effect.cursor-effect .cursor-content",
								'property'       => function ( $value ) {
									return $this->handle_dimension( $value, 'padding' );
								},
								'value'          => $cursor_efect['padding'],
								'device_control' => false,
							)
						);
					}

					if ( isset( $cursor_efect['textBorder'] ) ) {
						$selector = ".{$this->element_id}-cursor-effect.cursor-effect .cursor-content";
						$borders  = $cursor_efect['textBorder'];

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

								if ( ! gutenverse_truly_empty( $value['width'] ) ) {
									$this->inject_style(
										array(
											'selector' => "$selector",
											'property' => function ( $value ) {
												return "border-{$value['position']}width: {$value['value']}px;";
											},
											'value'    => array(
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
											'selector' => "$selector",
											'property' => function ( $value ) {
												return $this->handle_color( $value['value'], "border-{$value['position']}color" );
											},
											'value'    => array(
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

					if ( isset( $cursor_efect['typography'] ) ) {
						$this->inject_typography(
							array(
								'selector'       => ".{$this->element_id}-cursor-effect.cursor-effect .cursor-content",
								'property'       => function ( $value ) {},
								'value'          => $cursor_efect['typography'],
								'device_control' => false,
							)
						);
					}
					break;

				case 'icon':
					if ( isset( $cursor_efect['iconColor'] ) ) {
						$this->inject_style(
							array(
								'selector'       => ".{$this->element_id}-cursor-effect.cursor-effect .cursor-content",
								'property'       => function ( $value ) {
									return $this->handle_color( $value, 'color' );
								},
								'value'          => $cursor_efect['iconColor'],
								'device_control' => false,
							)
						);
					}

					if ( isset( $cursor_efect['iconSize'] ) ) {
						$this->inject_style(
							array(
								'selector'       => ".{$this->element_id}-cursor-effect.cursor-effect .cursor-content",
								'property'       => function ( $value ) {
									return $this->handle_unit_point( $value, 'height' );
								},
								'value'          => $cursor_efect['iconSize'],
								'device_control' => false,
							)
						);

						$this->inject_style(
							array(
								'selector'       => ".{$this->element_id}-cursor-effect.cursor-effect .cursor-content",
								'property'       => function ( $value ) {
									return $this->handle_unit_point( $value, 'width' );
								},
								'value'          => $cursor_efect['iconSize'],
								'device_control' => false,
							)
						);

						$this->inject_style(
							array(
								'selector'       => ".{$this->element_id}-cursor-effect.cursor-effect .cursor-content .cursor-icon",
								'property'       => function ( $value ) {
									return $this->handle_unit_point( $value, 'font-size' );
								},
								'value'          => $cursor_efect['iconSize'],
								'device_control' => false,
							)
						);
					}
					break;

				case 'image':
					if ( isset( $cursor_efect['imageFit'] ) ) {
						$this->inject_style(
							array(
								'selector'       => ".{$this->element_id}-cursor-effect.cursor-effect .cursor-content .cursor-image",
								'property'       => function ( $value ) {
									return "object-fit: {$value};";
								},
								'value'          => $cursor_efect['imageFit'],
								'device_control' => false,
							)
						);
					}
					if ( isset( $cursor_efect['imageHeight'] ) ) {
						$this->inject_style(
							array(
								'selector'       => ".{$this->element_id}-cursor-effect.cursor-effect .cursor-content",
								'property'       => function ( $value ) {
									return $this->handle_unit_point( $value, 'height' );
								},
								'value'          => $cursor_efect['imageHeight'],
								'device_control' => false,
							)
						);
					}

					if ( isset( $cursor_efect['imageWidth'] ) ) {
						$this->inject_style(
							array(
								'selector'       => ".{$this->element_id}-cursor-effect.cursor-effect .cursor-content",
								'property'       => function ( $value ) {
									return $this->handle_unit_point( $value, 'width' );
								},
								'value'          => $cursor_efect['imageWidth'],
								'device_control' => false,
							)
						);
					}

					if ( isset( $cursor_efect['imageBorder'] ) ) {
						$selector = ".{$this->element_id}-cursor-effect.cursor-effect .cursor-content .cursor-image";
						$borders  = $cursor_efect['imageBorder'];

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

								if ( ! gutenverse_truly_empty( $value['width'] ) ) {
									$this->inject_style(
										array(
											'selector' => "$selector",
											'property' => function ( $value ) {
												return "border-{$value['position']}width: {$value['value']}px;";
											},
											'value'    => array(
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
											'selector' => "$selector",
											'property' => function ( $value ) {
												return $this->handle_color( $value['value'], "border-{$value['position']}color" );
											},
											'value'    => array(
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

					break;
				default:
					if ( isset( $cursor_efect['primaryColor'] ) ) {
						$this->inject_style(
							array(
								'selector'       => ".{$this->element_id}-cursor-effect.cursor-effect .cursor-content",
								'property'       => function ( $value ) {
									$color = $this->get_color( $value );
									return "border: 4px solid {$color};";
								},
								'value'          => $cursor_efect['primaryColor'],
								'device_control' => false,
							)
						);
					}

					if ( isset( $cursor_efect['primarySize'] ) ) {
						$this->inject_style(
							array(
								'selector'       => ".{$this->element_id}-cursor-effect.cursor-effect .cursor-content",
								'property'       => function ( $value ) {
									return $this->handle_unit_point( $value, 'width' );
								},
								'value'          => $cursor_efect['primarySize'],
								'device_control' => false,
							)
						);

						$this->inject_style(
							array(
								'selector'       => ".{$this->element_id}-cursor-effect.cursor-effect .cursor-content",
								'property'       => function ( $value ) {
									return $this->handle_unit_point( $value, 'height' );
								},
								'value'          => $cursor_efect['primarySize'],
								'device_control' => false,
							)
						);
					}

					if ( isset( $cursor_efect['secondaryColor'] ) ) {
						if ( 'style2' === $cursor_efect['defaultStyle'] ) {
							$this->inject_style(
								array(
									'selector'       => ".{$this->element_id}-cursor-effect.cursor-effect .innerCursor::before",
									'property'       => function ( $value ) {
										return $this->handle_color( $value, 'background-color' );
									},
									'value'          => $cursor_efect['secondaryColor'],
									'device_control' => false,
								)
							);

							$this->inject_style(
								array(
									'selector'       => ".{$this->element_id}-cursor-effect.cursor-effect .innerCursor::after",
									'property'       => function ( $value ) {
										return $this->handle_color( $value, 'background-color' );
									},
									'value'          => $cursor_efect['secondaryColor'],
									'device_control' => false,
								)
							);
						} else {
							$this->inject_style(
								array(
									'selector'       => ".{$this->element_id}-cursor-effect.cursor-effect .innerCursor",
									'property'       => function ( $value ) {
										return $this->handle_color( $value, 'background-color' );
									},
									'value'          => $cursor_efect['secondaryColor'],
									'device_control' => false,
								)
							);
						}
					}

					if ( isset( $cursor_efect['secondarySize'] ) ) {
						$this->inject_style(
							array(
								'selector'       => ".{$this->element_id}-cursor-effect.cursor-effect .innerCursor",
								'property'       => function ( $value ) {
									return $this->handle_unit_point( $value, 'height' );
								},
								'value'          => $cursor_efect['secondarySize'],
								'device_control' => false,
							)
						);

						$this->inject_style(
							array(
								'selector'       => ".{$this->element_id}-cursor-effect.cursor-effect .innerCursor",
								'property'       => function ( $value ) {
									return $this->handle_unit_point( $value, 'width' );
								},
								'value'          => $cursor_efect['secondarySize'],
								'device_control' => false,
							)
						);
					}
					break;
			}
		}
	}

	/**
	 * Handle Feature Background Effect.
	 *
	 * @param string $selector Selector.
	 */
	protected function feature_background_effect( $selector ) {
		if ( isset( $this->attrs['backgroundEffect'] ) ) {
			$background_effect = $this->attrs['backgroundEffect'];
			if ( isset( $background_effect['hiddenOverflow'] ) ) {
				$this->inject_style(
					array(
						'selector'       => $selector ? $selector : ".{$this->element_id}> .guten-background-effect",
						'property'       => function ( $value ) {
							$overflow = 'visible';
							if ( $value ) {
								$overflow = 'hidden';
							}
							return "overflow: {$overflow};";
						},
						'value'          => $background_effect['hiddenOverflow'],
						'device_control' => true,
					)
				);
			}
			if ( isset( $background_effect['boxShadow'] ) ) {
				$box_shadow = $background_effect['boxShadow'];
				if ( '' === $box_shadow['color'] ) {
					$box_shadow['color'] = array(
						'type' => 'variable',
						'id'   => 'primary',
					);
				}
				$this->inject_style(
					array(
						'selector'       => $selector ? $selector . "> .inner-background-container .{$this->element_id}-effect" : ".{$this->element_id}> .guten-background-effect> .inner-background-container .{$this->element_id}-effect",
						'property'       => function ( $value ) {
							return $this->handle_box_shadow( $value );
						},
						'value'          => $box_shadow,
						'device_control' => false,
					)
				);
			}
		}
	}

	/**
	 * Handle Feature Mask.
	 *
	 * @param string $selector Selector.
	 */
	protected function feature_mask( $selector ) {
		if ( empty( $selector ) ) {
			$selector = ".{$this->element_id}";
		}

		if ( isset( $this->attrs['mask'] ) ) {
			$mask = $this->attrs['mask'];

			if ( isset( $mask['shape'] ) && '' !== $mask['shape'] ) {
				$svg_image = '';

				switch ( $mask['shape'] ) {
					case 'circle':
						$svg_image = GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/img/mask/circe.svg';
						break;
					case 'triangle':
						$svg_image = GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/img/mask/triangle.svg';
						break;
					case 'blob':
						$svg_image = GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/img/mask/blob.svg';
						break;
					case 'custom':
						$svg       = isset( $mask['svg'] ) ? $mask['svg'] : null;
						$svg_image = isset( $svg['image'] ) ? $svg['image'] : null;
				}

				if ( ! empty( $svg_image ) ) {
					$this->inject_style(
						array(
							'selector'       => $selector,
							'property'       => function ( $value ) {
								return "-webkit-mask-image: url($value); mask-image:url($value);";
							},
							'value'          => $svg_image,
							'device_control' => true,
						)
					);
				}
			}

			if ( isset( $mask['size'] ) ) {
				$this->inject_style(
					array(
						'selector'       => $selector,
						'property'       => function ( $value ) {
							if ( 'custom' !== $value['size'] ) {
								return "-webkit-mask-size: {$value['size']};";
							} elseif ( isset( $value['scale'] ) ) {
								return "-webkit-mask-size: {$value['scale']['point']}{$value['scale']['unit']};";
							}
						},
						'value'          => $this->merge_device_options(
							array(
								'size'  => $mask['size'],
								'scale' => isset( $mask['scale'] ) ? $mask['scale'] : null,
							)
						),
						'device_control' => true,
					)
				);
			}

			if ( isset( $mask['position'] ) ) {
				$this->inject_style(
					array(
						'selector'       => $selector,
						'property'       => function ( $value ) {
							if ( 'custom' !== $value['position'] && 'default' !== $value['position'] ) {
								return "-webkit-mask-position: {$value['position']};";
							} elseif ( 'custom' === $value['position'] ) {
								$xposition = 0;
								$yposition = 0;

								if ( isset( $value['xposition'] ) && $value['xposition']['point'] ) {
									$xposition = "{$value['xposition']['point']}{$value['xposition']['unit']}";
								}

								if ( isset( $value['yposition'] ) && $value['yposition']['point'] ) {
									$yposition = "{$value['yposition']['point']}{$value['yposition']['unit']}";
								}

								return "-webkit-mask-position: {$xposition} {$yposition};";
							}
						},
						'value'          => $this->merge_device_options(
							array(
								'position'  => $mask['position'],
								'xposition' => isset( $mask['xposition'] ) ? $mask['xposition'] : null,
								'yposition' => isset( $mask['yposition'] ) ? $mask['yposition'] : null,
							)
						),
						'device_control' => true,
					)
				);
			}

			if ( isset( $mask['repeat'] ) ) {
				$this->inject_style(
					array(
						'selector'       => $selector,
						'property'       => function ( $value ) {
							return "-webkit-mask-repeat: {$value};";
						},
						'value'          => $mask['repeat'],
						'device_control' => true,
					)
				);
			}
		}
	}

	/**
	 * Handle Feature Pointer Events.
	 *
	 * @param string $selector Selector.
	 */
	protected function feature_pointer_event( $selector ) {
		if ( empty( $selector ) ) {
			$selector = ".{$this->element_id}";
		}
		if ( isset( $this->attrs['pointer'] ) ) {
			$pointer = $this->attrs['pointer'];
			$this->inject_style(
				array(
					'selector'       => $selector,
					'property'       => function ( $value ) {
						return "pointer-events: {$value} !important;";
					},
					'value'          => $pointer['pointer'],
					'device_control' => true,
				)
			);
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
					'property'       => function ( $value ) {
						$output  = '';
						if ( $this->in_block ) {
							$display = 'display: inline-block;';
						} else {
							$display = 'display: inline-flex;';
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
	public function handle_background( $selector, $background ) {
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

							$bg_attachment = 'background-attachment: scroll';

							if ( is_bool( $value ) || '1' === $value ) {
								$fixed = ( $value || '1' === $value ) ? 'fixed' : 'scroll';
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
	public function merge_device_options( $options ) {
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
	 * Merge option.
	 *
	 * @param array $options Value tobe merged.
	 *
	 * @return array
	 */
	public function merge_options( $options ) {
		$results = array();

		foreach ( $options as $key => $option ) {
			if ( isset( $option ) ) {
				$results[ $key ] = $option;
			}
		}

		return $results;
	}

	/**
	 * Multi style values
	 *
	 * @param array $props .
	 *
	 * @return boolean
	 */
	public function multi_style_values( $props ) {
		$devices = array( 'Desktop', 'Tablet', 'Mobile' );
		$styles  = array();

		foreach ( $props as $prop ) {
			foreach ( $devices as $device ) {
				if ( empty( $styles[ $device ] ) ) {
					$styles[ $device ] = '';
				}

				if ( ! empty( $prop['value'][ $device ] ) ) {
					if ( is_array( $prop['value'][ $device ] ) ) {
						if ( gutenverse_truly_empty( $prop['value'][ $device ]['point'] ) || gutenverse_truly_empty( $prop['value'][ $device ]['unit'] ) ) {
							continue;
						} else {
							$styles[ $device ] .= call_user_func( $prop['style'], $prop['value'][ $device ] );
						}
					} else {
						$styles[ $device ] .= call_user_func( $prop['style'], $prop['value'][ $device ] );
					}
				}
			}
		}
		return $styles;
	}
	/**
	 * Multi style values not checking zero
	 *
	 * @param array $props .
	 *
	 * @return boolean
	 */
	public function multi_style_values_all_value( $props ) {
		$devices = array( 'Desktop', 'Tablet', 'Mobile' );
		$styles  = array();

		foreach ( $props as $prop ) {
			foreach ( $devices as $device ) {
				if ( empty( $styles[ $device ] ) ) {
					$styles[ $device ] = '';
				}
				if ( isset( $prop['value'][ $device ] ) ) {
					$styles[ $device ] .= call_user_func( $prop['style'], $prop['value'][ $device ] );
				}
			}
		}

		return $styles;
	}

	/**
	 * Handle Border Feature
	 *
	 * @param string $selector Selector.
	 */
	protected function feature_border( $selector ) {
		if ( empty( $selector ) ) {
			$selector = array(
				'normal' => ".{$this->element_id}.guten-element",
				'hover'  => ".{$this->element_id}.guten-element:hover",
			);
		}

		if ( isset( $this->attrs['border'] ) ) {
			$this->handle_border( 'border', $selector['normal'] );
		}

		if ( isset( $this->attrs['borderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $selector['normal'],
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['borderResponsive'],
					'device_control' => true,
					'skip_device'    => isset( $this->attrs['border'] ) ? array(
						'Desktop',
					) : null,
				)
			);
		}

		if ( isset( $this->attrs['borderHover'] ) ) {
			$this->handle_border( 'borderHover', $selector['hover'] );
		}

		if ( isset( $this->attrs['borderHoverResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $selector['hover'],
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['borderHoverResponsive'],
					'device_control' => true,
					'skip_device'    => isset( $this->attrs['borderHover'] ) ? array(
						'Desktop',
					) : null,
				)
			);
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
	 * Handle Border V2
	 *
	 * @param array $data .
	 *
	 * @return string
	 */
	public function handle_border_responsive( $data ) {
		$style = '';

		foreach ( $data as $key => $value ) {
			if ( 'radius' === $key ) {
				$style .= $this->handle_border_radius( $value );
			} elseif ( ! empty( $value ) && ! empty( $value['type'] ) ) {
				$position = 'all' === $key ? '' : "{$key}-";

				$style .= "border-{$position}style: {$value['type']};";

				if ( ! gutenverse_truly_empty( $value['width'] ) ) {
					$style .= "border-{$position}width: {$value['width']}px;";
				}

				if ( ! empty( $value['color'] ) ) {
					$style .= $this->handle_color( $value['color'], "border-{$position}color" );
				}
			}
		}

		return $style;
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

					if ( ! gutenverse_truly_empty( $value['width'] ) ) {
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

			if ( ! gutenverse_truly_empty( $dimension['top'] ) ) {
				$style .= "border-top-left-radius: {$dimension['top']}{$unit};";
			}

			if ( ! gutenverse_truly_empty( $dimension['right'] ) ) {
				$style .= "border-top-right-radius: {$dimension['right']}{$unit};";
			}

			if ( ! gutenverse_truly_empty( $dimension['bottom'] ) ) {
				$style .= "border-bottom-right-radius: {$dimension['bottom']}{$unit};";
			}

			if ( ! gutenverse_truly_empty( $dimension['left'] ) ) {
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
						if ( ! gutenverse_truly_empty( $value['delay'] ) ) {
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
								return 'animation-name: none;';
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
		if ( ! gutenverse_truly_empty( $value['color'] ) ) {
			$position     = ! gutenverse_truly_empty( $value['position'] ) && 'inset' === $value['position'] ? $value['position'] : '';
			$horizontal   = ! gutenverse_truly_empty( $value['horizontal'] ) ? $value['horizontal'] : 0;
			$vertical     = ! gutenverse_truly_empty( $value['vertical'] ) ? $value['vertical'] : 0;
			$blur         = ! gutenverse_truly_empty( $value['blur'] ) ? $value['blur'] : 0;
			$spread       = ! gutenverse_truly_empty( $value['spread'] ) ? "{$value['spread']}px" : '';
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
			$horizontal   = ! gutenverse_truly_empty( $value['horizontal'] ) ? $value['horizontal'] : 0;
			$vertical     = ! gutenverse_truly_empty( $value['vertical'] ) ? $value['vertical'] : 0;
			$blur         = ! gutenverse_truly_empty( $value['blur'] ) ? $value['blur'] : 0;
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
	public function handle_dimension( $attribute, $prefix, $multi = true, $min = 0 ) {
		$positions = array( 'top', 'right', 'bottom', 'left' );
		$styles    = array();
		$string    = '';

		if ( isset( $attribute['dimension'] ) && isset( $attribute['unit'] ) ) {
			$dimension = $attribute['dimension'];
			$unit      = $attribute['unit'];

			if ( $multi ) {
				foreach ( $positions as $position ) {
					if ( ! gutenverse_truly_empty( $dimension[ $position ] ) ) {
						$styles[] = "{$prefix}-{$position}: {$dimension[ $position ]}{$unit};";
					}
				}

				$string = join( ' ', $styles );
			} else {
				$is_empty = true;

				foreach ( $positions as $position ) {
					if ( ! gutenverse_truly_empty( $dimension[ $position ] ) ) {
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
