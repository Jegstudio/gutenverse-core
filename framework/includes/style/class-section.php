<?php
/**
 * Gutenverse Section
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Framework\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Section
 *
 * @package gutenverse\style
 */
class Section extends Style_Abstract {
	/**
	 * Block Name
	 *
	 * @var array
	 */
	protected $name = 'section';

	/**
	 * Constructor
	 *
	 * @param array $attrs Attribute.
	 */
	public function __construct( $attrs ) {
		parent::__construct( $attrs );

		$element_id = explode( '-', $this->element_id )[1];

		$this->set_feature(
			array(
				'background'  => array(
					'normal' => ".{$this->element_id}:not(.background-animated), .{$this->element_id}.background-animated > .guten-background-animated .animated-layer",
					'hover'  => ".{$this->element_id}:not(.background-animated):hover, .{$this->element_id}.background-animated:hover > .guten-background-animated .animated-layer",
				),
				'border'      => null,
				'animation'   => null,
				'advance'     => null,
				'positioning' => ".section-wrapper[data-id=\"{$element_id}\"]",
				'mask'        => null,
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		if ( isset( $this->attrs['width'] ) && isset( $this->attrs['layout'] ) && 'boxed' === $this->attrs['layout'] ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.layout-boxed > .guten-container",
					'property'       => function ( $value ) {
						return "max-width: {$value}px;";
					},
					'value'          => $this->attrs['width'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['height'] ) && isset( $this->attrs['heightControl'] ) && 'min' === $this->attrs['heightControl'] ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} > .guten-container",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'min-height' );
					},
					'value'          => $this->attrs['height'],
					'device_control' => true,
				)
			);
		}

		if ( 'fit' === $this->attrs['heightControl'] ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}",
					'property'       => function ( $value ) {
						return 'height: 100vh;';
					},
					'value'          => $this->attrs['heightControl'],
					'device_control' => false,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} > .guten-container",
					'property'       => function ( $value ) {
						return 'height: 100%;';
					},
					'value'          => $this->attrs['heightControl'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['wrapColumn'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} > .guten-container",
					'property'       => function () {
						return 'flex-wrap: wrap;';
					},
					'value'          => $this->attrs['wrapColumn'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} > .guten-container > .guten-column",
					'property'       => function () {
						return 'width: 100%;';
					},
					'value'          => $this->attrs['wrapColumn'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['verticalAlign'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "section.guten-element.{$this->element_id} > .guten-container",
					'property'       => function ( $value ) {
						if ( 'default' === $value ) {
							return null;
						} else {
							return "align-content: {$value}; align-items: {$value};";
						}
					},
					'value'          => $this->attrs['verticalAlign'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['topDivider'] ) ) {
			$divider = $this->attrs['topDivider'];
			if ( isset( $divider['type'] ) && 'none' !== $divider['type'] ) {
				if ( isset( $divider['width'] ) ) {
					$this->inject_style(
						array(
							'selector'       => "section.{$this->element_id} .guten-shape-divider.guten-shape-divider-top svg",
							'property'       => function ( $value ) {
								return "width: calc( {$value}% + 1.3px);";
							},
							'value'          => $divider['width'],
							'device_control' => true,
						)
					);
				}

				if ( isset( $divider['height'] ) ) {
					$this->inject_style(
						array(
							'selector'       => "section.{$this->element_id} .guten-shape-divider.guten-shape-divider-top svg",
							'property'       => function ( $value ) {
								return "height: {$value}px;";
							},
							'value'          => $divider['height'],
							'device_control' => true,
						)
					);
				}

				if ( isset( $divider['color'] ) && ( ! isset( $divider['colorMode'] ) || 'default' === $divider['colorMode'] ) ) {
					$this->inject_style(
						array(
							'selector'       => "section.{$this->element_id} .guten-shape-divider.guten-shape-divider-top .guten-shape-fill path",
							'property'       => function ( $value ) {
								return $this->handle_color( $value, 'fill' );
							},
							'value'          => $divider['color'],
							'device_control' => false,
						)
					);
				}
			}
		}

		if ( isset( $this->attrs['bottomDivider'] ) ) {
			$divider = $this->attrs['bottomDivider'];
			if ( isset( $divider['type'] ) && 'none' !== $divider['type'] ) {
				if ( isset( $divider['width'] ) ) {
					$this->inject_style(
						array(
							'selector'       => "section.{$this->element_id} .guten-shape-divider.guten-shape-divider-bottom svg",
							'property'       => function ( $value ) {
								return "width: calc( {$value}% + 1.3px);";
							},
							'value'          => $divider['width'],
							'device_control' => true,
						)
					);
				}

				if ( isset( $divider['height'] ) ) {
					$this->inject_style(
						array(
							'selector'       => "section.{$this->element_id} .guten-shape-divider.guten-shape-divider-bottom svg",
							'property'       => function ( $value ) {
								return "height: {$value}px;";
							},
							'value'          => $divider['height'],
							'device_control' => true,
						)
					);
				}

				if ( isset( $divider['color'] ) && ( ! isset( $divider['colorMode'] ) || 'default' === $divider['colorMode'] ) ) {
					$this->inject_style(
						array(
							'selector'       => "section.{$this->element_id} .guten-shape-divider.guten-shape-divider-bottom .guten-shape-fill path",
							'property'       => function ( $value ) {
								return $this->handle_color( $value, 'fill' );
							},
							'value'          => $divider['color'],
							'device_control' => false,
						)
					);
				}
			}
		}

		if ( isset( $this->attrs['topDividerAnimated'] ) ) {
			$divider = $this->attrs['topDividerAnimated'];
			if ( isset( $divider['type'] ) && 'none' !== $divider['type'] ) {
				if ( isset( $divider['width'] ) ) {
					$this->inject_style(
						array(
							'selector'       => "section.{$this->element_id} .guten-shape-divider-animated.guten-shape-divider-animated-top svg",
							'property'       => function ( $value ) {
								return "width: calc( {$value}% + 1.3px);";
							},
							'value'          => $divider['width'],
							'device_control' => true,
						)
					);
				}

				if ( isset( $divider['height'] ) ) {
					$this->inject_style(
						array(
							'selector'       => "section.{$this->element_id} .guten-shape-divider-animated.guten-shape-divider-animated-top svg",
							'property'       => function ( $value ) {
								return "height: {$value}px;";
							},
							'value'          => $divider['height'],
							'device_control' => true,
						)
					);
				}
			}
		}

		if ( isset( $this->attrs['bottomDividerAnimated'] ) ) {
			$divider = $this->attrs['bottomDividerAnimated'];
			if ( isset( $divider['type'] ) && 'none' !== $divider['type'] ) {
				if ( isset( $divider['width'] ) ) {
					$this->inject_style(
						array(
							'selector'       => "section.{$this->element_id} .guten-shape-divider-animated.guten-shape-divider-animated-bottom svg",
							'property'       => function ( $value ) {
								return "width: calc( {$value}% + 1.3px);";
							},
							'value'          => $divider['width'],
							'device_control' => true,
						)
					);
				}

				if ( isset( $divider['height'] ) ) {
					$this->inject_style(
						array(
							'selector'       => "section.{$this->element_id} .guten-shape-divider-animated.guten-shape-divider-animated-bottom svg",
							'property'       => function ( $value ) {
								return "height: {$value}px;";
							},
							'value'          => $divider['height'],
							'device_control' => true,
						)
					);
				}
			}
		}

		if ( isset( $this->attrs['cursorEffect'] ) ) {
			$cursor_efect = $this->attrs['cursorEffect'];

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
								'device_control' => true,
							)
						);
					}

					if ( isset( $cursor_efect['textBorder'] ) ) {
						$selector = ".{$this->element_id}-cursor-effect.cursor-effect .cursor-content";
						$borders  = $cursor_efect['textBorder']['Desktop'];

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
									return "width: {$value['point']}{$value['unit']}; height: {$value['point']}{$value['unit']};";
								},
								'value'          => $cursor_efect['iconSize'],
								'device_control' => false,
							)
						);

						$this->inject_style(
							array(
								'selector'       => ".{$this->element_id}-cursor-effect.cursor-effect .cursor-content .cursor-icon",
								'property'       => function ( $value ) {
									return "font-size: {$value['point']}{$value['unit']};";
								},
								'value'          => $cursor_efect['iconSize'],
								'device_control' => false,
							)
						);
					}
					break;

				case 'image':
					if ( isset( $cursor_efect['imageSize'] ) ) {
						$this->inject_style(
							array(
								'selector'       => ".{$this->element_id}-cursor-effect.cursor-effect .cursor-content",
								'property'       => function ( $value ) {
									return "width: {$value['point']}{$value['unit']}; height: {$value['point']}{$value['unit']};";
								},
								'value'          => $cursor_efect['imageSize'],
								'device_control' => false,
							)
						);
					}

					if ( isset( $cursor_efect['imageBorder'] ) ) {
						$selector = ".{$this->element_id}-cursor-effect.cursor-effect .cursor-content .cursor-image";
						$borders  = $cursor_efect['imageBorder']['Desktop'];

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
									return "width: {$value['point']}{$value['unit']}; height: {$value['point']}{$value['unit']};";
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
									return "width: {$value['point']}{$value['unit']}; height: {$value['point']}{$value['unit']};";
								},
								'value'          => $cursor_efect['secondarySize'],
								'device_control' => false,
							)
						);
					}
					break;
			}
		}

		if ( isset( $this->attrs['typographyHeadingColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .wp-block-gutenverse-heading",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['typographyHeadingColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['typographyTextColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['typographyTextColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['typographyLinkColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['typographyLinkColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['typographyLinkHoverColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} a:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['typographyLinkHoverColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['typographyTextAlign'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}",
					'property'       => function ( $value ) {
						return "text-align: {$value};";
					},
					'value'          => $this->attrs['typographyTextAlign'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['backgroundOverlay'] ) ) {
			$this->handle_background( ".{$this->element_id} > .guten-background-overlay", $this->attrs['backgroundOverlay'] );
		}

		if ( isset( $this->attrs['backgroundOverlayHover'] ) ) {
			$this->handle_background( ".{$this->element_id}:hover > .guten-background-overlay", $this->attrs['backgroundOverlayHover'] );
		}

		if ( isset( $this->attrs['opacity'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} > .guten-background-overlay",
					'property'       => function ( $value ) {
						return "opacity: {$value};";
					},
					'value'          => $this->attrs['opacity'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['opacityHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}:hover > .guten-background-overlay",
					'property'       => function ( $value ) {
						return "opacity: {$value};";
					},
					'value'          => $this->attrs['opacityHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['blur'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "section.guten-element.{$this->element_id}:before",
					'property'       => function ( $value ) {
						return "-webkit-backdrop-filter: blur({$value}px); backdrop-filter: blur({$value}px);";
					},
					'value'          => $this->attrs['blur'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['blurHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "section.guten-element.{$this->element_id}:hover:before",
					'property'       => function ( $value ) {
						return "-webkit-backdrop-filter: blur({$value}px); backdrop-filter: blur({$value}px);";
					},
					'value'          => $this->attrs['blurHover'],
					'device_control' => true,
				)
			);
		}

		do_action( 'gutenverse_section_style', $this, $this->attrs );
	}
}
