<?php
/**
 * Nav Menu Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

/**
 * Class Nav Menu Block
 *
 * @package gutenverse\block
 */
class Nav_Menu extends Block_Abstract {
	/**
	 * Render Content
	 *
	 * @param boolean $remove_link : Flag to remove link.
	 *
	 * @return string
	 */
	public function render_content( $remove_link = false ) {
		$element_id        = $this->attributes['elementId'];
		$menu_breakpoint   = $this->attributes['breakpoint'];
		$mobile_menu_icon  = $this->attributes['mobileIcon'];
		$mobile_close_icon = $this->attributes['mobileCloseIcon'];
		$mobile_logo       = isset( $this->attributes['mobileMenuLogo'] ) ? $this->attributes['mobileMenuLogo'] : null;
		$mobile_logo_image = $this->render_image( $mobile_logo );
		$submenu_click     = $this->attributes['mobileSubmenuClick'] ? 'submenu-click-title' : 'submenu-click-icon';
		$closeon_click     = $this->attributes['mobileCloseOnClick'];
		$item_indicator    = $this->attributes['submenuItemIndicator'];
		$menu_link         = $this->attributes['mobileMenuLink'];
		$menu_url          = 'home' === $menu_link ? home_url() : $this->attributes['mobileMenuURL'];
		$mobile_close_icon = $this->attributes['mobileCloseIcon'];
		$custom_classes    = isset( $this->attributes['className'] ) ? $this->attributes['className'] : '';
		$display_classes   = $this->set_display_classes();
		$animation_class   = $this->set_animation_classes();
		$menu              = gutenverse_get_menu( $this->attributes['menuId'] );

		if ( $remove_link ) {
			$menu = str_replace( 'href', 'href="javascript:void(0);" data-href', $menu );
		}

		return '<div id="' . $element_id . '" class="guten-element guten-nav-menu nav-menu break-point-' . $menu_breakpoint . ' ' . $submenu_click . $display_classes . $animation_class . $custom_classes . '" data-item-indicator="' . $item_indicator . '" data-close-on-click="' . $closeon_click . '">
			<div class="gutenverse-hamburger-wrapper">
				<button class="gutenverse-hamburger-menu">
					<i aria-hidden="true" class="' . $mobile_menu_icon . '"></i>
				</button>
			</div>
			<div class="gutenverse-menu-wrapper">' . $menu . '
				<div>
					<div class="gutenverse-nav-identity-panel">
						<div class="gutenverse-nav-site-title">
							<a href="' . $menu_url . '" class="gutenverse-nav-logo">' . $mobile_logo_image . '</a>
						</div>
						<button class="gutenverse-close-menu"><i aria-hidden="true" class="' . $mobile_close_icon . '"></i></button>
					</div>
				</div>
			</div>
		</div>';
	}

	/**
	 * Render Image
	 *
	 * @param array $image .
	 *
	 * @return string
	 */
	public function render_image( $image ) {
		if ( $image ) {
			$media    = $image['media'];
			$size     = $image['size'];
			$image_id = $media['imageId'];
			$alt      = get_bloginfo( 'name' ) . ' - ' . get_bloginfo( 'description' );

			$attachment = wp_get_attachment_image_src( $image_id, $size );

			$src = '';

			if ( ! empty( $attachment ) ) {
				$src = $attachment[0];
			} elseif ( ! empty( $media['sizes'][ $size ]['url'] ) ) {
				$src = $media['sizes'][ $size ]['url'];
			}

			return '<img src="' . esc_url( $src ) . '" alt="' . $alt . '">';
		} else {
			return null;
		}
	}

	/**
	 * Render view in editor
	 */
	public function render_gutenberg() {
		return $this->render_content( true );
	}

	/**
	 * Render view in frontend
	 */
	public function render_frontend() {
		return $this->render_content();
	}
}
