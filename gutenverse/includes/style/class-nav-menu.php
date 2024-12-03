<?php
/**
 * Gutenverse Nav Menu
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Nav Menu
 *
 * @package gutenverse\style
 */
class Nav_Menu extends Style_Abstract {
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
	protected $name = 'nav-menu';



	/**
	 * Constructor
	 *
	 * @param array $attrs Attribute.
	 */
	public function __construct( $attrs ) {
		parent::__construct( $attrs );

		$this->set_feature(
			array(
				'background'  => array(
					'normal' => "#{$this->element_id}",
					'hover'  => "#{$this->element_id}:hover",
				),
				'border'      => array(
					'normal' => "#{$this->element_id}",
					'hover'  => "#{$this->element_id}:hover",
				),
				'positioning' => "#{$this->element_id}",
				'animation'   => "#{$this->element_id}",
				'advance'     => "#{$this->element_id}",
				'mask'        => "#{$this->element_id}",
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		if ( isset( $this->attrs['alignment'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu",
					'property'       => function ( $value ) {
						return "justify-content: {$value};";
					},
					'value'          => $this->attrs['alignment'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['menuHeight'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu > li > a, #{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu > ul > li > a",
					'property'       => function ( $value ) {
						return "height: {$value}px;";
					},
					'value'          => $this->attrs['menuHeight'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['menuBackground'] ) ) {
			$this->handle_background( "#{$this->element_id} .gutenverse-menu-wrapper", $this->attrs['menuBackground'] );
		}

		if ( isset( $this->attrs['mobileWrapperBackground'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.break-point-mobile.guten-nav-menu .gutenverse-menu-wrapper",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['mobileWrapperBackground'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['mobileWrapperBackground'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.break-point-tablet.guten-nav-menu .gutenverse-menu-wrapper",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['mobileWrapperBackground'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['menuPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id} .gutenverse-menu-wrapper",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['menuPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['menuMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id} .gutenverse-menu-wrapper",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['menuMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['menuRadius'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id} .gutenverse-menu-wrapper",
					'property'       => function ( $value ) {
						return $this->handle_border_radius( $value );
					},
					'value'          => $this->attrs['menuRadius'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['menuBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id} .gutenverse-menu-wrapper",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['menuBoxShadow'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['overlayBackground'] ) ) {
			$this->handle_background( "#{$this->element_id}.break-point-tablet.guten-nav-menu .guten-nav-overlay, #{$this->element_id}.break-point-mobile.guten-nav-menu .guten-nav-overlay", $this->attrs['overlayBackground'] );
		}

		if ( isset( $this->attrs['overlayOpacity'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.break-point-tablet.guten-nav-menu .guten-nav-overlay, #{$this->element_id}.break-point-mobile.guten-nav-menu .guten-nav-overlay",
					'property'       => function ( $value ) {
						return "opacity: calc({$value}/100);";
					},
					'value'          => $this->attrs['overlayOpacity'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['overlayPointer'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.break-point-tablet.guten-nav-menu .guten-nav-overlay, #{$this->element_id}.break-point-mobile.guten-nav-menu .guten-nav-overlay",
					'property'       => function ( $value ) {
						return "pointer-events: {$value} !important;";
					},
					'value'          => $this->attrs['overlayPointer'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['overlayBlur'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.break-point-tablet.guten-nav-menu .guten-nav-overlay, #{$this->element_id}.break-point-mobile.guten-nav-menu .guten-nav-overlay",
					'property'       => function ( $value ) {
						return "-webkit-backdrop-filter: blur({$value}px); backdrop-filter: blur({$value}px);";
					},
					'value'          => $this->attrs['overlayBlur'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => "#{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu > li > a, #{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu > ul > li > a",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['itemTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['itemSpacing'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu > li > a, #{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu > ul > li > a",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['itemSpacing'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu > li > a, #{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu > ul > li > a",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['itemMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemTextNormalColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu > li > a, #{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu > ul > li > a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['itemTextNormalColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemTextNormalBg'] ) ) {
			$this->handle_background( "#{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu > li > a, #{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu > ul > li > a", $this->attrs['itemTextNormalBg'] );
		}

		if ( isset( $this->attrs['itemMenuBorderNormal'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu > li > a,
                    #{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu > ul > li > a",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['itemMenuBorderNormal'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['itemMenuBorderHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu > li:hover > a,
                    #{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu > ul > li:hover > a",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['itemMenuBorderHover'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemMenuBorderActive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu > li.current-menu-ancestor > a,
                    #{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu > ul > li.current-menu-ancestor > a",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['itemMenuBorderActive'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemMenuBorderActive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu > li.current-menu-item > a,
                    #{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu > ul > li.current-menu-item > a",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['itemMenuBorderActive'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemTextHoverColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu > li:hover > a, #{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu > ul > li:hover > a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['itemTextHoverColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemTextHoverBg'] ) ) {
			$this->handle_background( "#{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu > li:hover > a, #{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu > ul > li:hover > a", $this->attrs['itemTextHoverBg'] );
		}

		if ( isset( $this->attrs['itemTextActiveColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu > li.current-menu-item > a, #{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu > ul > li.current-menu-item > a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['itemTextActiveColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemTextActiveColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu > li.current-menu-ancestor > a, #{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu > ul > li.current-menu-ancestor > a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['itemTextActiveColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemTextActiveBg'] ) ) {
			$this->handle_background( "#{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu > li.current-menu-item > a, #{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu > ul > li.current-menu-item > a", $this->attrs['itemTextActiveBg'] );
		}

		if ( isset( $this->attrs['itemTextActiveBg'] ) ) {
			$this->handle_background( "#{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu > li.current-menu-ancestor > a, #{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu > ul > li.current-menu-ancestor > a", $this->attrs['itemTextActiveBg'] );
		}

		if ( isset( $this->attrs['submenuIndicatorColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children > a > i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['submenuIndicatorColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['SubmenuIndicatorSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > li > a > i,
						#{$this->element_id}.guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu> ul > li > a > i",
					'property'       => function ( $value ) {
						return "font-size: {$value}px;";
					},
					'value'          => $this->attrs['SubmenuIndicatorSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['submenuIndicatorHoverColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children:hover > a > i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['submenuIndicatorHoverColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['submenuIndicatorActiveColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children.current-menu-parent > a > i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['submenuIndicatorActiveColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['submenuIndicatorMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children > a i",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['submenuIndicatorMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['submenuIndicatorPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children > a i",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['submenuIndicatorPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['submenuIndicatorBorder'] ) ) {
			$this->handle_border( 'submenuIndicatorBorder', "#{$this->element_id}.guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children > a i" );
		}

		if ( isset( $this->attrs['submenuIndicatorBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children > a i",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['submenuIndicatorBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['submenuTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => "#{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li  a",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['submenuTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['submenuSpacing'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li  a",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['submenuSpacing'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['submenuMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li  a",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['submenuMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['submenuTextNormalColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li > a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['submenuTextNormalColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['submenuTextNormalBg'] ) ) {
			$this->handle_background( "#{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li > a", $this->attrs['submenuTextNormalBg'] );
		}

		if ( isset( $this->attrs['submenuTextHoverColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li:hover > a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['submenuTextHoverColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['submenuTextHoverBg'] ) ) {
			$this->handle_background( "#{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li:hover > a", $this->attrs['submenuTextHoverBg'] );
		}

		if ( isset( $this->attrs['submenuTextActiveColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu .sub-menu > li.current-menu-item > a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['submenuTextActiveColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['submenuTextActiveBg'] ) ) {
			$this->handle_background( "#{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu .sub-menu > li.current-menu-item > a", $this->attrs['submenuTextActiveBg'] );
		}

		if ( isset( $this->attrs['submenuItemBorder'] ) ) {
			$this->handle_border( 'submenuItemBorder', "#{$this->element_id}.guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li > a" );
		}

		if ( isset( $this->attrs['submenuItemBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li > a",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['submenuItemBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['submenuFirstItemBorder'] ) ) {
			$this->handle_border( 'submenuFirstItemBorder', "#{$this->element_id}.guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li:first-child > a" );
		}

		if ( isset( $this->attrs['submenuFirstItemBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li:first-child > a",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['submenuFirstItemBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['submenuLastItemBorder'] ) ) {
			$this->handle_border( 'submenuLastItemBorder', "#{$this->element_id}.guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li:last-child > a" );
		}

		if ( isset( $this->attrs['submenuLastItemBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li:last-child > a",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['submenuLastItemBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['submenuPanelPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id} .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children .sub-menu",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['submenuPanelPadding'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['submenuPanelMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.guten-element .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children .sub-menu",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['submenuPanelMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['submenuPanelBorder'] ) ) {
			$this->handle_border( 'submenuPanelBorder', "#{$this->element_id}.guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children .sub-menu" );
		}

		if ( isset( $this->attrs['submenuPanelBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children .sub-menu",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['submenuPanelBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['submenuPanelBackground'] ) ) {
			$this->handle_background( "#{$this->element_id}.guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children .sub-menu", $this->attrs['submenuPanelBackground'] );
		}

		if ( isset( $this->attrs['submenuPanelWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children .sub-menu",
					'property'       => function ( $value ) {
						return "width: {$value}px;";
					},
					'value'          => $this->attrs['submenuPanelWidth'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['submenuPanelShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children .sub-menu",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['submenuPanelShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['hamburgerAlignment'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id} .gutenverse-hamburger-wrapper",
					'property'       => function ( $value ) {
						return "justify-content: {$value};";
					},
					'value'          => $this->attrs['hamburgerAlignment'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['hamburgerWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.guten-nav-menu .gutenverse-hamburger-menu",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'width' );
					},
					'value'          => $this->attrs['hamburgerWidth'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['hamburgerSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.guten-nav-menu .gutenverse-hamburger-menu i",
					'property'       => function ( $value ) {
						return "font-size: {$value}px;";
					},
					'value'          => $this->attrs['hamburgerSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['hamburgerPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.guten-nav-menu .gutenverse-hamburger-menu",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['hamburgerPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['hamburgerMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.guten-nav-menu .gutenverse-hamburger-menu",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['hamburgerMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['hamburgerColorNormal'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.guten-nav-menu .gutenverse-hamburger-menu",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['hamburgerColorNormal'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['hamburgerBgNormal'] ) ) {
			$this->handle_background( "#{$this->element_id}.guten-nav-menu .gutenverse-hamburger-menu", $this->attrs['hamburgerBgNormal'] );
		}

		if ( isset( $this->attrs['hamburgerBorderNormal'] ) ) {
			$this->handle_border( 'hamburgerBorderNormal', "#{$this->element_id}.guten-nav-menu .gutenverse-hamburger-menu" );
		}

		if ( isset( $this->attrs['hamburgerBorderNormalResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.guten-nav-menu .gutenverse-hamburger-menu",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['hamburgerBorderNormalResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['hamburgerColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.guten-nav-menu .gutenverse-hamburger-menu:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['hamburgerColorHover'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['hamburgerBgHover'] ) ) {
			$this->handle_background( "#{$this->element_id}.guten-nav-menu .gutenverse-hamburger-menu:hover", $this->attrs['hamburgerBgHover'] );
		}

		if ( isset( $this->attrs['hamburgerBorderHover'] ) ) {
			$this->handle_border( 'hamburgerBorderHover', "#{$this->element_id}.guten-nav-menu .gutenverse-hamburger-menu:hover" );
		}

		if ( isset( $this->attrs['hamburgerBorderHoverResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.guten-nav-menu .gutenverse-hamburger-menu:hover",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['hamburgerBorderHoverResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['closeWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'width' );
					},
					'value'          => $this->attrs['closeWidth'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['closeSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu i",
					'property'       => function ( $value ) {
						return "font-size: {$value}px;";
					},
					'value'          => $this->attrs['closeSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['closePadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['closePadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['closeMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['closeMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['closeColorNormal'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['closeColorNormal'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['closeBgNormal'] ) ) {
			$this->handle_background( "#{$this->element_id}.guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu", $this->attrs['closeBgNormal'] );
		}

		if ( isset( $this->attrs['closeBorderNormal'] ) ) {
			$this->handle_border( 'closeBorderNormal', "#{$this->element_id}.guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu" );
		}

		if ( isset( $this->attrs['closeBorderNormalResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['closeBorderNormalResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['closeColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['closeColorHover'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['closeBgHover'] ) ) {
			$this->handle_background( "#{$this->element_id}.guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu:hover", $this->attrs['closeBgHover'] );
		}

		if ( isset( $this->attrs['closeBorderHover'] ) ) {
			$this->handle_border( 'closeBorderHover', "#{$this->element_id}.guten-nav-menu .gutenverse-hamburger-menu:hover" );
		}

		if ( isset( $this->attrs['closeBorderHoverResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.guten-nav-menu .gutenverse-hamburger-menu:hover",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['closeBorderHoverResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['mobileLogoWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-nav-site-title .gutenverse-nav-logo img",
					'property'       => function ( $value ) {
						return "width: {$value}px;";
					},
					'value'          => $this->attrs['mobileLogoWidth'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['mobileLogoHeight'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-nav-site-title .gutenverse-nav-logo img",
					'property'       => function ( $value ) {
						return "height: {$value}px;";
					},
					'value'          => $this->attrs['mobileLogoHeight'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['mobileLogoFit'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-nav-site-title .gutenverse-nav-logo img",
					'property'       => function ( $value ) {
						return "object-fit: {$value};";
					},
					'value'          => $this->attrs['mobileLogoFit'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['mobileMenuMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-nav-site-title .gutenverse-nav-logo",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['mobileMenuMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['mobileMenuPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-nav-site-title .gutenverse-nav-logo",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['mobileMenuPadding'],
					'device_control' => true,
				)
			);
		}
	}
}
