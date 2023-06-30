<?php
/**
 * Gutenverse Framework
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-framework
 */

if ( defined( 'GUTENVERSE_FRAMEWORK_VERSION' ) ) {
	return;
}

defined( 'GUTENVERSE_FRAMEWORK_VERSION' ) || define( 'GUTENVERSE_FRAMEWORK_VERSION', '1.0.0' );
defined( 'GUTENVERSE_FRAMEWORK_ASSETS_VERSION' ) || define( 'GUTENVERSE_FRAMEWORK_ASSETS_VERSION', '1.0.0' );
defined( 'GUTENVERSE_FRAMEWORK_DIR' ) || define( 'GUTENVERSE_FRAMEWORK_DIR', dirname( __FILE__ ) );
defined( 'GUTENVERSE_FRAMEWORK_CLASS_DIR' ) || define( 'GUTENVERSE_FRAMEWORK_CLASS_DIR', GUTENVERSE_FRAMEWORK_DIR . '/includes' );
defined( 'GUTENVERSE_FRAMEWORK_LANG_DIR' ) || define( 'GUTENVERSE_FRAMEWORK_LANG_DIR', GUTENVERSE_FRAMEWORK_DIR . '/languages' );
defined( 'GUTENVERSE_FRAMEWORK_STORE_URL' ) || define( 'GUTENVERSE_FRAMEWORK_STORE_URL', 'https://gutenverse.com/products' );
defined( 'GUTENVERSE_FRAMEWORK_LIBRARY_URL' ) || define( 'GUTENVERSE_FRAMEWORK_LIBRARY_URL', 'http://gutenverse-server.local/' );

require_once 'autoload.php';
require_once 'helper.php';

/**
 * Initialize Framework
 */
add_action(
	'init',
	function() {
		Gutenverse\Framework\Init::instance();
		do_action( 'gutenverse_after_init_framework' );
	}
);
