<?php
/**
 * Frontend Assets class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse
 */

namespace Gutenverse;

/**
 * Class Frontend Assets
 *
 * @package gutenverse
 */
class Frontend_Assets {
	/**
	 * Init constructor.
	 */
	public function __construct() {
		add_filter( 'gutenverse_include_frontend', array( $this, 'load_conditional_scripts' ) );
		add_filter( 'gutenverse_include_frontend', array( $this, 'load_conditional_styles' ) );
		add_filter( 'gutenverse_conditional_script_attributes', array( $this, 'font_icon_conditional_load' ), null, 3 );
	}

	/**
	 * Icon conditional load
	 *
	 * @param mixed $conditions The value from the attributes array.
	 *
	 * @since 3.3.0
	 */
	private function icon_conditional_load( &$conditions ) {
		$conditions[] = array(
			'style' => 'fontawesome-gutenverse',
		);

		$conditions[] = array(
			'style' => 'gutenverse-iconlist',
		);

		return $conditions;
	}

	/**
	 * Load the font icon
	 *
	 * @param mixed  $conditions The value from the attributes array.
	 * @param string $attrs The comparison operator (e.g., '===', '!==').
	 * @param mixed  $block_name The value to compare against.
	 *
	 * @since 3.3.0
	 */
	public function font_icon_conditional_load( $conditions, $attrs, $block_name ) {
		switch ( $block_name ) {
			case 'gutenverse/nav-menu':
				if ( ! isset( $attrs['mobileIconType'] ) || ! isset( $attrs['mobileCloseIconType'] ) || ! isset( $attrs['submenuItemIndicatorType'] ) ) {
					$this->icon_conditional_load( $conditions );
				}
				break;
			case 'gutenverse/divider':
				if ( isset( $attrs['content'] ) && 'icon' === $attrs['content'] ) {
					if ( ! isset( $attrs['iconType'] ) ) {
						$this->icon_conditional_load( $conditions );
					}
				}
				break;
			case 'gutenverse/accordions':
				if ( ( ! isset( $attrs['iconOpenType'] ) || 'icon' === $attrs['iconOpenType'] ) || ( ! isset( $attrs['iconClosedType'] ) || 'icon' === $attrs['iconClosedType'] ) ) {
					$this->icon_conditional_load( $conditions );
				}
				break;
			case 'gutenverse/button':
				if ( isset( $attrs['showIcon'] ) && $attrs['showIcon'] ) {
					if ( ! isset( $attrs['iconType'] ) || 'icon' === $attrs['iconType'] ) {
						$this->icon_conditional_load( $conditions );
					}
				}
				break;
			case 'gutenverse/breadcrumb':
				if ( ! isset( $attrs['separatorIconType'] ) || 'icon' === $attrs['separatorIconType'] ) {
					$this->icon_conditional_load( $conditions );
				}
				break;
			case 'gutenverse/fun-fact':
				if ( ! isset( $attrs['iconType'] ) || 'icon' === $attrs['iconType'] ) {
					$this->icon_conditional_load( $conditions );
				}
				break;
			case 'gutenverse/icon':
				if ( ! isset( $attrs['iconType'] ) || 'icon' === $attrs['iconType'] ) {
					$this->icon_conditional_load( $conditions );
				}
				break;
			case 'gutenverse/icon-box':
				if ( ! isset( $attrs['iconType'] ) || 'icon' === $attrs['iconType'] ) {
					$this->icon_conditional_load( $conditions );
				}
				break;
			case 'gutenverse/icon-list-item':
				if ( ! isset( $attrs['iconType'] ) || 'icon' === $attrs['iconType'] ) {
					$this->icon_conditional_load( $conditions );
				}
				break;
			case 'gutenverse/gallery':
				if ( ! isset( $attrs['zoomIconType'] ) || 'icon' === $attrs['zoomIconType'] ) {
					$this->icon_conditional_load( $conditions );
				}
				if ( ! isset( $attrs['linkIconType'] ) || 'icon' === $attrs['linkIconType'] ) {
					$this->icon_conditional_load( $conditions );
				}
				if ( ! isset( $attrs['enableLoadIconType'] ) || 'icon' === $attrs['enableLoadIconType'] ) {
					$this->icon_conditional_load( $conditions );
				}
				break;
			case 'gutenverse/image-box':
				if ( ! isset( $attrs['titleIconType'] ) || 'icon' === $attrs['titleIconType'] ) {
					$this->icon_conditional_load( $conditions );
				}
				break;
			case 'gutenverse/popup-builder':
				if ( ! isset( $attrs['closeIconType'] ) || 'icon' === $attrs['closeIconType'] ) {
					$this->icon_conditional_load( $conditions );
				}
				break;
		}

		return $conditions;
	}

	/**
	 * Load the scripts
	 *
	 * @since 3.3.0
	 */
	public function load_conditional_scripts() {
		$blocks = array(
			'accordion',
			'animated-text',
			'chart',
			'client-logo',
			'countdown',
			'fun-fact',
			'gallery',
			'google-maps',
			'nav-menu',
			'popup-builder',
			'portfolio-gallery',
			'post-comment',
			'postblock',
			'postlist',
			'progress-bar',
			'search',
			'tab',
			'team',
			'testimonials',
			'video',
		);

		foreach ( $blocks as $block ) {
			$include   = ( include GUTENVERSE_DIR . '/lib/dependencies/frontend/' . $block . '.asset.php' )['dependencies'];
			$include[] = 'gutenverse-frontend-event';

			wp_register_script(
				'gutenverse-frontend-' . $block . '-script',
				GUTENVERSE_URL . '/assets/js/frontend/' . $block . '.js',
				$include,
				GUTENVERSE_VERSION,
				true
			);
		}
	}

	/**
	 * Load the styles
	 *
	 * @since 3.3.0
	 */
	public function load_conditional_styles() {
		$blocks = array(
			'accordions',
			'accordion',
			'advanced-heading',
			'animated-text',
			'archive-title',
			'breadcrumb',
			'buttons',
			'button',
			'chart',
			'countdown',
			'demo',
			'divider',
			'feature-list',
			'fun-fact',
			'gallery',
			'google-maps',
			'heading',
			'icon',
			'icon-box',
			'icon-list',
			'icon-list-item',
			'image',
			'image-box',
			'logo-slider',
			'nav-menu',
			'popup-builder',
			'portfolio-gallery',
			'post-author',
			'post-block',
			'post-comment',
			'post-content',
			'post-date',
			'post-excerpt',
			'post-featured-image',
			'post-list',
			'post-terms',
			'post-title',
			'progress-bar',
			'search',
			'search-result-title',
			'social-icons',
			'social-icon',
			'social-share',
			'social-share-item',
			'spacer',
			'star-rating',
			'tabs',
			'taxonomy-list',
			'team',
			'testimonials',
			'text-editor',
			'text-paragraph',
			'video',
		);

		wp_register_style(
			'gutenverse-frontend',
			GUTENVERSE_URL . '/assets/css/frontend.css',
			array(),
			GUTENVERSE_VERSION
		);

		foreach ( $blocks as $block ) {
			wp_register_style(
				'gutenverse-frontend-' . $block . '-style',
				GUTENVERSE_URL . '/assets/css/frontend/' . $block . '.css',
				array( 'gutenverse-frontend' ),
				GUTENVERSE_VERSION
			);
		}
	}
}
