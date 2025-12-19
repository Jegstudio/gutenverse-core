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
					isset( $attrs['mobileIcon'] ) && '' !== $attrs['mobileIcon'] && $this->icon_conditional_load( $conditions );
				}
				break;
			case 'gutenverse/divider':
				if ( isset( $attrs['content'] ) && 'icon' === $attrs['content'] ) {
					if ( ! isset( $attrs['iconType'] ) ) {
						isset( $attrs['icon'] ) && '' !== $attrs['icon'] && $this->icon_conditional_load( $conditions );
					}
				}
				break;
			case 'gutenverse/accordions':
				if ( ( ! isset( $attrs['iconOpenType'] ) || 'icon' === $attrs['iconOpenType'] ) || ( ! isset( $attrs['iconClosedType'] ) || 'icon' === $attrs['iconClosedType'] ) ) {
					isset( $attrs['iconOpen'] ) && '' !== $attrs['iconOpen'] && $this->icon_conditional_load( $conditions );
				}
				break;
			case 'gutenverse/button':
				if ( isset( $attrs['showIcon'] ) && $attrs['showIcon'] ) {
					if ( ! isset( $attrs['iconType'] ) || 'icon' === $attrs['iconType'] ) {
						isset( $attrs['icon'] ) && '' !== $attrs['icon'] && $this->icon_conditional_load( $conditions );
					}
				}
				break;
			case 'gutenverse/breadcrumb':
				if ( ! isset( $attrs['separatorIconType'] ) || 'icon' === $attrs['separatorIconType'] ) {
					isset( $attrs['separatorIcon'] ) && '' !== $attrs['separatorIcon'] && $this->icon_conditional_load( $conditions );
				}
				break;
			case 'gutenverse/fun-fact':
				if ( ! isset( $attrs['iconType'] ) || 'icon' === $attrs['iconType'] ) {
					isset( $attrs['icon'] ) && '' !== $attrs['icon'] && $this->icon_conditional_load( $conditions );
				}
				break;
			case 'gutenverse/icon':
				if ( ! isset( $attrs['iconType'] ) || 'icon' === $attrs['iconType'] ) {
					// PHP do not serialize default value so if value not exist it mean they use icon.
					( ! isset( $attrs['icon'] ) || ( isset( $attrs['icon'] ) && '' !== $attrs['icon'] ) ) && $this->icon_conditional_load( $conditions );
				}
				break;
			case 'gutenverse/icon-box':
				if ( isset( $attrs['watermarkShow'] ) && $attrs['watermarkShow'] ) {
					if ( ! isset( $attrs['watermarkIconType'] ) || 'icon' === $attrs['watermarkIconType'] ) {
						isset( $attrs['watermarkIcon'] ) && '' !== $attrs['watermarkIcon'] && $this->icon_conditional_load( $conditions );
					}
				}
				if ( ( ! isset( $attrs['iconType'] ) || 'icon' === $attrs['iconType'] ) ) {
					isset( $attrs['icon'] ) && '' !== $attrs['icon'] && $this->icon_conditional_load( $conditions );
				}
				break;
			case 'gutenverse/icon-list-item':
				if ( ! isset( $attrs['iconType'] ) || 'icon' === $attrs['iconType'] ) {
					isset( $attrs['icon'] ) && '' !== $attrs['icon'] && $this->icon_conditional_load( $conditions );
				}
				break;
			case 'gutenverse/gallery':
				if ( ! isset( $attrs['zoomIconType'] ) || 'icon' === $attrs['zoomIconType'] ) {
					isset( $attrs['zoomIcon'] ) && '' !== $attrs['zoomIcon'] && $this->icon_conditional_load( $conditions );
				}
				if ( ! isset( $attrs['linkIconType'] ) || 'icon' === $attrs['linkIconType'] ) {
					isset( $attrs['linkIcon'] ) && '' !== $attrs['linkIcon'] && $this->icon_conditional_load( $conditions );
				}
				if ( isset( $attrs['enableLoadMore'] ) && $attrs['enableLoadMore'] ) {
					if ( ! isset( $attrs['enableLoadIconType'] ) || 'icon' === $attrs['enableLoadIconType'] ) {
						isset( $attrs['enableLoadIcon'] ) && '' !== $attrs['enableLoadIcon'] && $this->icon_conditional_load( $conditions );
					}
				}
				break;
			case 'gutenverse/image-box':
				if ( ! isset( $attrs['titleIconType'] ) || 'icon' === $attrs['titleIconType'] ) {
					isset( $attrs['titleIcon'] ) && '' !== $attrs['titleIcon'] && $this->icon_conditional_load( $conditions );
				}
				break;
			case 'gutenverse/popup-builder':
				if ( ! isset( $attrs['closeIconType'] ) || 'icon' === $attrs['closeIconType'] ) {
					isset( $attrs['closeIcon'] ) && '' !== $attrs['closeIcon'] && $this->icon_conditional_load( $conditions );
				}
				break;
			case 'gutenverse/portfolio-gallery':
				if ( ! isset( $attrs['showLink'] ) ) {
					if ( ! isset( $attrs['linkIconType'] ) || 'icon' === $attrs['linkIconType'] ) {
						isset( $attrs['linkIcon'] ) && '' !== $attrs['linkIcon'] && $this->icon_conditional_load( $conditions );
					}
				}
				break;
			case 'gutenverse/post-block':
				// Check readmore icon.
				if ( ! isset( $attrs['readmoreEnabled'] ) || $attrs['readmoreEnabled'] ) {
					if ( ! isset( $attrs['readmoreIconType'] ) || 'icon' === $attrs['readmoreIconType'] ) {
						isset( $attrs['readmoreIcon'] ) && '' !== $attrs['readmoreIcon'] && $this->icon_conditional_load( $conditions );
					}
				}

				// Check comment icon.
				if ( isset( $attrs['commentEnabled'] ) && $attrs['commentEnabled'] ) {
					if ( ! isset( $attrs['commentIconType'] ) || 'icon' === $attrs['commentIconType'] ) {
						isset( $attrs['commentIcon'] ) && '' !== $attrs['commentIcon'] && $this->icon_conditional_load( $conditions );
					}
				}

				// Check meta author icon.
				if ( ( ! isset( $attrs['metaEnabled'] ) || $attrs['metaEnabled'] ) && ( ! isset( $attrs['metaAuthorEnabled'] ) || $attrs['metaAuthorEnabled'] ) ) {
					if ( ! isset( $attrs['metaAuthorIconType'] ) || 'icon' === $attrs['metaAuthorIconType'] ) {
						isset( $attrs['metaAuthorIcon'] ) && '' !== $attrs['metaAuthorIcon'] && $this->icon_conditional_load( $conditions );
					}
				}

				// Check meta date icon.
				if ( ( ! isset( $attrs['metaEnabled'] ) || $attrs['metaEnabled'] ) && ( ! isset( $attrs['metaDateEnabled'] ) || $attrs['metaDateEnabled'] ) ) {
					if ( ! isset( $attrs['metaDateIconType'] ) || 'icon' === $attrs['metaDateIconType'] ) {
						isset( $attrs['metaDateIcon'] ) && '' !== $attrs['metaDateIcon'] && $this->icon_conditional_load( $conditions );
					}
				}

				// Check pagination icons.
				if ( isset( $attrs['paginationMode'] ) ) {
					if ( in_array( $attrs['paginationMode'], array( 'loadmore', 'scrollload' ), true ) ) {
						if ( ! isset( $attrs['paginationIconType'] ) || 'icon' === $attrs['paginationIconType'] ) {
							isset( $attrs['paginationIcon'] ) && '' !== $attrs['paginationIcon'] && $this->icon_conditional_load( $conditions );
						}
					}

					if ( in_array( $attrs['paginationMode'], array( 'prevnext', 'number', 'normal-prevnext', 'normal-number' ), true ) ) {
						if ( ! isset( $attrs['paginationPrevIconType'] ) || 'icon' === $attrs['paginationPrevIconType'] ) {
							isset( $attrs['paginationPrevIcon'] ) && '' !== $attrs['paginationPrevIcon'] && $this->icon_conditional_load( $conditions );
						}
						if ( ! isset( $attrs['paginationNextIconType'] ) || 'icon' === $attrs['paginationNextIconType'] ) {
							isset( $attrs['paginationNextIcon'] ) && '' !== $attrs['paginationNextIcon'] && $this->icon_conditional_load( $conditions );
						}
					}
				}
				break;
			case 'gutenverse/search':
				if ( ! isset( $attrs['closeIconType'] ) || 'icon' === $attrs['closeIconType'] ) {
					isset( $attrs['closeIcon'] ) && '' !== $attrs['closeIcon'] && $this->icon_conditional_load( $conditions );
				}
				break;
			case 'gutenverse/social-icon':
				if ( ! isset( $attrs['iconType'] ) || 'icon' === $attrs['iconType'] ) {
					isset( $attrs['icon'] ) && '' !== $attrs['icon'] && $this->icon_conditional_load( $conditions );
				}
				break;
			case 'gutenverse/taxonomy-list':
				if ( isset( $attrs['showIcon'] ) && $attrs['showIcon'] ) {
					if ( ! isset( $attrs['iconType'] ) || 'icon' === $attrs['iconType'] ) {
						isset( $attrs['icon'] ) && '' !== $attrs['icon'] && $this->icon_conditional_load( $conditions );
					}
				}
				break;
			case 'gutenverse/testimonials':
				if ( isset( $attrs['showQuote'] ) && $attrs['showQuote'] ) {
					if ( ! isset( $attrs['iconQuoteType'] ) || 'icon' === $attrs['iconQuoteType'] ) {
						isset( $attrs['iconQuote'] ) && '' !== $attrs['iconQuote'] && $this->icon_conditional_load( $conditions );
					}
				}

				if ( isset( $attrs['showRating'] ) && $attrs['showRating'] ) {
					if ( ! isset( $attrs['iconRatingFullType'] ) || 'icon' === $attrs['iconRatingFullType'] ) {
						isset( $attrs['iconRatingFull'] ) && '' !== $attrs['iconRatingFull'] && $this->icon_conditional_load( $conditions );
					}
					if ( ! isset( $attrs['iconRatingHalfType'] ) || 'icon' === $attrs['iconRatingHalfType'] ) {
						isset( $attrs['iconRatingHalf'] ) && '' !== $attrs['iconRatingHalf'] && $this->icon_conditional_load( $conditions );
					}
				}
				break;
			case 'gutenverse/chart':
				if ( isset( $attrs['chartContent'] ) && 'icon' === $attrs['chartContent'] ) {
					if ( ! isset( $attrs['iconType'] ) || 'icon' === $attrs['iconType'] ) {
						isset( $attrs['icon'] ) && '' !== $attrs['icon'] && $this->icon_conditional_load( $conditions );
					}
				}
				break;
			case 'gutenverse/post-list':
				if ( isset( $attrs['iconEnabled'] ) && $attrs['iconEnabled'] ) {
					if ( ! isset( $attrs['iconType'] ) || 'icon' === $attrs['iconType'] ) {
						isset( $attrs['icon'] ) && '' !== $attrs['icon'] && $this->icon_conditional_load( $conditions );
					}
				}

				if ( isset( $attrs['metaEnabled'] ) && $attrs['metaEnabled'] ) {
					if ( ! isset( $attrs['metaDateIconType'] ) || 'icon' === $attrs['metaDateIconType'] ) {
						isset( $attrs['metaDateIcon'] ) && '' !== $attrs['metaDateIcon'] && $this->icon_conditional_load( $conditions );
					}
				}
				if ( isset( $attrs['metaEnabled'] ) && $attrs['metaEnabled'] ) {
					if ( ! isset( $attrs['metaCategoryIconType'] ) || 'icon' === $attrs['metaCategoryIconType'] ) {
						isset( $attrs['metaCategoryIcon'] ) && '' !== $attrs['metaCategoryIcon'] && $this->icon_conditional_load( $conditions );
					}
				}

				// Check pagination icons.
				if ( isset( $attrs['paginationMode'] ) ) {
					if ( in_array( $attrs['paginationMode'], array( 'loadmore', 'scrollload' ), true ) ) {
						if ( ! isset( $attrs['paginationIconType'] ) || 'icon' === $attrs['paginationIconType'] ) {
							isset( $attrs['paginationIcon'] ) && '' !== $attrs['paginationIcon'] && $this->icon_conditional_load( $conditions );
						}
					}

					if ( in_array( $attrs['paginationMode'], array( 'prevnext', 'number', 'normal-prevnext', 'normal-number' ), true ) ) {
						if ( ! isset( $attrs['paginationPrevIconType'] ) || 'icon' === $attrs['paginationPrevIconType'] ) {
							isset( $attrs['paginationPrevIcon'] ) && '' !== $attrs['paginationPrevIcon'] && $this->icon_conditional_load( $conditions );
						}
						if ( ! isset( $attrs['paginationNextIconType'] ) || 'icon' === $attrs['paginationNextIconType'] ) {
							isset( $attrs['paginationNextIcon'] ) && '' !== $attrs['paginationNextIcon'] && $this->icon_conditional_load( $conditions );
						}
					}
				}
				break;
			case 'gutenverse/feature-list':
				if ( isset( $attrs['featureList'] ) && $attrs['featureList'] ) {
					$feature_list = $attrs['featureList'];
					if ( is_string( $feature_list ) ) {
						$feature_list = json_decode( $feature_list, true );
					}

					if ( is_array( $feature_list ) || is_object( $feature_list ) ) {
						foreach ( $feature_list as $feature ) {
							if ( 'icon' === $feature['type'] ) {
								$this->icon_conditional_load( $conditions );
							}
						}
					}
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
