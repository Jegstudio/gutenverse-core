<?php
/**
 * Gutenverse Taxonomy_List
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Taxonomy_List
 *
 * @package gutenverse\style
 */
class Taxonomy_List extends Style_Abstract {
	/**
	 * Block Directory
	 *
	 * @var string
	 */
	protected $block_dir = GUTENVERSE_DIR . '/block/';

	/**
	 * Block Name
	 *
	 * @var array
	 */
	protected $name = 'taxonomy-list';

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
				'transform'   => array(
					'normal' => ".{$this->element_id}.guten-element",
					'hover'  => ".{$this->element_id}.guten-element:hover",
				),
				'mask'        => null,
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		if ( isset( $this->attrs['iconColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .taxonomy-list-wrapper .taxonomy-list-item a .icon-list",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['iconColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .taxonomy-list-wrapper .taxonomy-list-item a:hover .icon-list",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['iconColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .taxonomy-list-wrapper .taxonomy-list-item a .icon-list",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'font-size' );
					},
					'value'          => $this->attrs['iconSize'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['iconSpace'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .taxonomy-list-wrapper .taxonomy-list-item a .icon-list",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'margin-right' );
					},
					'value'          => $this->attrs['iconSpace'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['layout'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .taxonomy-list-wrapper",
					'property'       => function ( $value ) {
						return "flex-direction: {$value};";
					},
					'value'          => $this->attrs['layout'],
					'device_control' => true,
				)
			);
			if ( isset( $this->attrs['contentAlignment'] ) ) {
				if ( 'column' === $this->attrs['layout'] ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} .taxonomy-list-wrapper",
							'property'       => function ( $value ) {
								if ( 'space-between' === $value ) {
									return 'align-items: flex-start;';
								}
								return "align-items: {$value};";
							},
							'value'          => $this->attrs['contentAlignment'],
							'device_control' => true,
						)
					);
				} elseif ( 'row' === $this->attrs['layout'] ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} .taxonomy-list-wrapper",
							'property'       => function ( $value ) {
								return "justify-content: {$value};";
							},
							'value'          => $this->attrs['contentAlignment'],
							'device_control' => true,
						)
					);
				}
			}
		}

		if ( isset( $this->attrs['contentSpacing'] ) ) {
			if ( 'column' === $this->attrs['layout'] ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .taxonomy-list-wrapper .taxonomy-list-item",
						'property'       => function ( $value ) {
							$point = $value['point'] / 2;
							$unit  = $value['unit'];
							return "padding: {$point}{$unit} 0;";
						},
						'value'          => $this->attrs['contentSpacing'],
						'device_control' => true,
					)
				);
			} elseif ( 'row' === $this->attrs['layout'] ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .taxonomy-list-wrapper .taxonomy-list-item",
						'property'       => function ( $value ) {
							$point = $value['point'] / 2;
							$unit  = $value['unit'];
							return "padding: 0 {$point}{$unit};";
						},
						'value'          => $this->attrs['contentSpacing'],
						'device_control' => true,
					)
				);
			}
		}
		if ( isset( $this->attrs['contentTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .taxonomy-list-wrapper .taxonomy-list-item a .taxonomy-list-content",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['contentTypography'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['contentColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .taxonomy-list-item a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['contentColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['contentColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .taxonomy-list-item a:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['contentColorHover'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['showDivider'] ) ) {
			if ( $this->attrs['showDivider'] ) {
				if ( 'column' === $this->attrs['layout'] ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} .taxonomy-list-item:not(:first-child)",
							'property'       => function ( $value ) {
								return 'border-top-style : solid;';
							},
							'value'          => $this->attrs['showDivider'],
							'device_control' => false,
						)
					);
				} elseif ( 'row' === $this->attrs['layout'] ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} .taxonomy-list-item:not(:first-child)",
							'property'       => function ( $value ) {
								return 'border-left-style : solid;';
							},
							'value'          => $this->attrs['showDivider'],
							'device_control' => false,
						)
					);
				}
				if ( isset( $this->attrs['colorDivider'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} .taxonomy-list-item:not(:first-child)",
							'property'       => function ( $value ) {
								return $this->handle_color( $value, 'border-color' );
							},
							'value'          => $this->attrs['colorDivider'],
							'device_control' => false,
						)
					);
				}
				if ( isset( $this->attrs['typeDivider'] ) ) {
					if ( 'column' === $this->attrs['layout'] ) {
						$this->inject_style(
							array(
								'selector'       => ".{$this->element_id} .taxonomy-list-item:not(:first-child)",
								'property'       => function ( $value ) {
									return "border-top-style : {$value};";
								},
								'value'          => $this->attrs['typeDivider'],
								'device_control' => false,
							)
						);
					} elseif ( 'row' === $this->attrs['layout'] ) {
						$this->inject_style(
							array(
								'selector'       => ".{$this->element_id} .taxonomy-list-item:not(:first-child)",
								'property'       => function ( $value ) {
									return "border-left-style : {$value};";
								},
								'value'          => $this->attrs['typeDivider'],
								'device_control' => false,
							)
						);
					}
				}
				if ( isset( $this->attrs['widthDivider'] ) ) {
					if ( 'column' === $this->attrs['layout'] ) {
						$this->inject_style(
							array(
								'selector'       => ".{$this->element_id} .taxonomy-list-item",
								'property'       => function ( $value ) {
									return $this->handle_unit_point( $value, 'width' );
								},
								'value'          => $this->attrs['widthDivider'],
								'device_control' => false,
							)
						);
					} elseif ( 'row' === $this->attrs['layout'] ) {
						$this->inject_style(
							array(
								'selector'       => ".{$this->element_id} .taxonomy-list-item",
								'property'       => function ( $value ) {
									return $this->handle_unit_point( $value, 'height' );
								},
								'value'          => $this->attrs['widthDivider'],
								'device_control' => false,
							)
						);
					}
				}
				if ( isset( $this->attrs['sizeDivider'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} .taxonomy-list-item",
							'property'       => function ( $value ) {
								return $this->handle_unit_point( $value, 'border-width' );
							},
							'value'          => $this->attrs['sizeDivider'],
							'device_control' => false,
						)
					);
				}
			}
		}
	}
}
