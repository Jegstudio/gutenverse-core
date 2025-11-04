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
		add_filter( 'gutenverse_include_frontend', array( $this, 'enqueue_scripts' ) );
		add_filter( 'gutenverse_include_frontend', array( $this, 'load_conditional_scripts' ) );
		add_filter( 'gutenverse_include_frontend', array( $this, 'load_conditional_styles' ) );
	}

	/**
	 * Frontend Script
	 */
	public function enqueue_scripts() {
		$include   = ( include GUTENVERSE_DIR . '/lib/dependencies/frontend.asset.php' )['dependencies'];
		$include[] = 'gutenverse-frontend-event';

		wp_enqueue_script(
			'gutenverse-frontend',
			GUTENVERSE_URL . '/assets/js/frontend.js',
			$include,
			GUTENVERSE_VERSION,
			true
		);

		wp_enqueue_style(
			'gutenverse-frontend',
			GUTENVERSE_URL . '/assets/css/frontend.css',
			array( 'fontawesome-gutenverse', 'gutenverse-iconlist' ),
			GUTENVERSE_VERSION
		);
	}

	/**
	 * Load the scripts
	 * 
	 * @since 3.3.0-dev
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
			'video'
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
	 * @since 3.3.0-dev
	 */
	public function load_conditional_styles() {
		$blocks = array(
			'accordion',
			'accordions',
			'advanced-heading',
			'animated-text',
			'archive-title',
			'button',
			'buttons',
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
			'social-icon',
			'social-icons',
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

		foreach ( $blocks as $block ) {
			wp_register_style(
				'gutenverse-frontend-' . $block . '-style',
				GUTENVERSE_URL . '/assets/css/frontend/' . $block . '.css',
				array(),
				GUTENVERSE_VERSION
			);
		}
	}
}
