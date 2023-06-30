<?php
/**
 * Gutenverse Post_List
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Post_List
 *
 * @package gutenverse\style
 */
class Post_List extends Style_Abstract {
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
	protected $name = 'post-list';

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
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		if ( isset( $this->attrs['column'] ) && isset( $this->attrs['layout'] ) && 'horizontal' === $this->attrs['layout'] ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-posts",
					'property'       => function( $value ) {
						return "grid-template-columns: repeat({$value}, minmax(0, 1fr));";
					},
					'value'          => $this->attrs['column'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['columnGap'] ) && isset( $this->attrs['layout'] ) && 'horizontal' === $this->attrs['layout'] ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-posts",
					'property'       => function( $value ) {
						return "grid-column-gap: {$value}px;";
					},
					'value'          => $this->attrs['columnGap'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['contentAlign'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-post",
					'property'       => function( $value ) {
						return "text-align: {$value};";
					},
					'value'          => $this->attrs['contentAlign'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['contentMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-post a",
					'property'       => function( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['contentMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['contentPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-post a",
					'property'       => function( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['contentPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['contentWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-post a",
					'property'       => function( $value ) {
						return $this->handle_unit_point( $value, 'width' );
					},
					'value'          => $this->attrs['contentWidth'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['contentBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .guten-post", $this->attrs['contentBackground'] );
		}

		if ( isset( $this->attrs['contentHoverBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .guten-post:hover", $this->attrs['contentHoverBackground'] );
		}

		if ( isset( $this->attrs['contentBorder'] ) ) {
			$this->handle_border( 'contentBorder', ".{$this->element_id} .guten-post a" );
		}

		if ( isset( $this->attrs['contentHoverBorder'] ) ) {
			$this->handle_border( 'contentHoverBorder', ".{$this->element_id} .guten-post:hover a" );
		}

		if ( isset( $this->attrs['contentShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-post a",
					'property'       => function( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['contentShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['contentHoverShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-post:hover a",
					'property'       => function( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['contentHoverShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['titlePadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-post .guten-postlist-title",
					'property'       => function( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['titlePadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['titleColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-post .guten-postlist-title",
					'property'       => function( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['titleColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['titleTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".{$this->element_id} .guten-post .guten-postlist-title",
					'value'    => $this->attrs['titleTypography'],
				)
			);
		}

		if ( isset( $this->attrs['titleColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-post:hover .guten-postlist-title",
					'property'       => function( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['titleColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['titleTypographyHover'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".{$this->element_id} .guten-post:hover .guten-postlist-title",
					'value'    => $this->attrs['titleTypographyHover'],
				)
			);
		}

		if ( isset( $this->attrs['iconAlign'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-post a .icon-list",
					'property'       => function( $value ) {
						return "align-self: {$value};";
					},
					'value'          => $this->attrs['iconAlign'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['imageWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-post a img",
					'property'       => function( $value ) {
						return "width: {$value}%;";
					},
					'value'          => $this->attrs['imageWidth'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['imageHeight'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-post a img",
					'property'       => function( $value ) {
						return "height: {$value}px;";
					},
					'value'          => $this->attrs['imageHeight'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['imageFit'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-post a img",
					'property'       => function( $value ) {
						return "object-fit: {$value};";
					},
					'value'          => $this->attrs['imageFit'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['imageMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-post a img",
					'property'       => function( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['imageMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-post a .icon-list",
					'property'       => function( $value ) {
						return "width: {$value}px;";
					},
					'value'          => $this->attrs['iconWidth'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconHeight'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-post a .icon-list",
					'property'       => function( $value ) {
						return "height: {$value}px;";
					},
					'value'          => $this->attrs['iconHeight'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconLineHeight'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-post a .icon-list",
					'property'       => function( $value ) {
						return "line-height: {$value}px;";
					},
					'value'          => $this->attrs['iconLineHeight'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-post a .icon-list i",
					'property'       => function( $value ) {
						return "font-size: {$value}px;";
					},
					'value'          => $this->attrs['iconSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-post a .icon-list",
					'property'       => function( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['iconMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconRadius'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-post a .icon-list i",
					'property'       => function( $value ) {
						return $this->handle_border_radius( $value );
					},
					'value'          => $this->attrs['iconRadius'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-post a .icon-list i",
					'property'       => function( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['iconColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconHoverColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-post:hover a .icon-list i",
					'property'       => function( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['iconHoverColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .guten-post:hover a .icon-list", $this->attrs['iconBackground'] );
		}

		if ( isset( $this->attrs['metaAlign'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-post a .meta-lists",
					'property'       => function( $value ) {
						return "text-align: {$value};";
					},
					'value'          => $this->attrs['metaAlign'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['metaTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".{$this->element_id} .guten-post a .meta-lists",
					'value'    => $this->attrs['metaTypography'],
				)
			);
		}

		if ( isset( $this->attrs['metaIconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-post a .meta-lists i",
					'property'       => function( $value ) {
						return "font-size: {$value}px;";
					},
					'value'          => $this->attrs['metaIconSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['metaIconSpacing'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-post a .meta-lists i",
					'property'       => function( $value ) {
						return "margin-right: {$value}px;";
					},
					'value'          => $this->attrs['metaIconSpacing'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['metaMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-post a .meta-lists span",
					'property'       => function( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['metaMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['metaPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-post a .meta-lists span",
					'property'       => function( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['metaPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['metaColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-post a .meta-lists span",
					'property'       => function( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['metaColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['metaColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-post:hover a .meta-lists span",
					'property'       => function( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['metaColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['metaBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .guten-post a .meta-lists span", $this->attrs['metaBackground'] );
		}

		if ( isset( $this->attrs['metaHoverBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .guten-post:hover a .meta-lists span", $this->attrs['metaHoverBackground'] );
		}

		if ( isset( $this->attrs['metaBorder'] ) ) {
			$this->handle_border( 'metaBorder', ".{$this->element_id} .guten-post a .meta-lists span" );
		}

		if ( isset( $this->attrs['metaHoverBorder'] ) ) {
			$this->handle_border( 'metaHoverBorder', ".{$this->element_id} .guten-post:hover a .meta-lists span" );
		}

		if ( isset( $this->attrs['paginationTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .guten-block-pagination .guten-block-loadmore span",
					'property'       => function( $value ) {},
					'value'          => $this->attrs['paginationTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['paginationMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-block-pagination .guten-block-loadmore",
					'property'       => function( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['paginationMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['paginationPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-block-pagination .guten-block-loadmore",
					'property'       => function( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['paginationPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['paginationWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-block-pagination .guten-block-loadmore",
					'property'       => function( $value ) {
						return "width: {$value}%;";
					},
					'value'          => $this->attrs['paginationWidth'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['paginationIconSpacing'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-block-pagination .guten-block-loadmore.icon-position-before i",
					'property'       => function( $value ) {
						return "margin-right: {$value}px;";
					},
					'value'          => $this->attrs['paginationIconSpacing'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-block-pagination .guten-block-loadmore.icon-position-after i",
					'property'       => function( $value ) {
						return "margin-left: {$value}px;";
					},
					'value'          => $this->attrs['paginationIconSpacing'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['paginationAlign'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-block-pagination",
					'property'       => function( $value ) {
						return "text-align: {$value};";
					},
					'value'          => $this->attrs['paginationAlign'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['paginationColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-block-pagination .guten-block-loadmore span",
					'property'       => function( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['paginationColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['paginationHoverColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-block-pagination .guten-block-loadmore:hover a",
					'property'       => function( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['paginationHoverColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['paginationBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .guten-block-pagination .guten-block-loadmore", $this->attrs['paginationBackground'] );
		}

		if ( isset( $this->attrs['paginationHoverBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .guten-block-pagination .guten-block-loadmore:hover", $this->attrs['paginationHoverBackground'] );
		}

		if ( isset( $this->attrs['paginationBorder'] ) ) {
			$this->handle_border( 'paginationBorder', ".{$this->element_id} .guten-block-pagination .guten-block-loadmore" );
		}

		if ( isset( $this->attrs['paginationHoverBorder'] ) ) {
			$this->handle_border( 'paginationHoverBorder', ".{$this->element_id} .guten-block-pagination .guten-block-loadmore:hover" );
		}

		if ( isset( $this->attrs['paginationShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-block-pagination .guten-block-loadmore",
					'property'       => function( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['paginationShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['paginationHoverShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-block-pagination .guten-block-loadmore:hover",
					'property'       => function( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['paginationHoverShadow'],
					'device_control' => false,
				)
			);
		}
	}
}
