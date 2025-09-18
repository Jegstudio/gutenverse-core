<?php
/**
 * Upgrader class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-framework
 */

namespace Gutenverse\Framework;

/**
 * Class Upgrader
 *
 * Show notice if user install Gutenverse below version 2.0.0 while they installing Satelite plugin with Core Framework.
 *
 * @package gutenverse-framework
 */
class Upgrader {
	/**
	 * Class constructor.
	 */
	public function __construct() {
		$this->set_upgrader_framework_init();

		add_action( 'wp_ajax_gutenverse_upgrader_framework_init_close', array( $this, 'upgrader_framework_init_close' ) );
	}

	/**
	 * Change option framework to false.
	 */
	public function upgrader_framework_init_close() {
		update_option( $this->get_framework_init_option_name(), false );
	}

	/**
	 * Get Framework Init Upgrader Option Name.
	 *
	 * @return string.
	 */
	public function get_framework_init_option_name() {
		return 'gutenverse_' . wp_get_theme()->template . '_upgrader_framework_init';
	}

	/**
	 * Set content width upgrader option meta
	 */
	public function set_upgrader_framework_init() {
		$flag = ! get_option( $this->get_framework_init_option_name() ) && defined( 'GUTENVERSE_VERSION' ) && version_compare( GUTENVERSE_VERSION, '2.0.0', '<' );

		if ( $flag ) {
			add_option( $this->get_framework_init_option_name(), true );
		}
	}
}
