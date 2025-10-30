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
}
