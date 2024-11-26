<?php
/**
 * Gutenverse Framework
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-framework
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( defined( 'GUTENVERSE_FRAMEWORK_VERSION' ) ) {
	return;
}

defined( 'GUTENVERSE_FRAMEWORK_VERSION' ) || define( 'GUTENVERSE_FRAMEWORK_VERSION', '1.1.3' );
defined( 'GUTENVERSE_FRAMEWORK_ASSETS_VERSION' ) || define( 'GUTENVERSE_FRAMEWORK_ASSETS_VERSION', '2.0.0' );
defined( 'GUTENVERSE_FRAMEWORK_DIR' ) || define( 'GUTENVERSE_FRAMEWORK_DIR', __DIR__ );
defined( 'GUTENVERSE_FRAMEWORK_CLASS_DIR' ) || define( 'GUTENVERSE_FRAMEWORK_CLASS_DIR', GUTENVERSE_FRAMEWORK_DIR . '/includes' );
defined( 'GUTENVERSE_FRAMEWORK_LANG_DIR' ) || define( 'GUTENVERSE_FRAMEWORK_LANG_DIR', GUTENVERSE_FRAMEWORK_DIR . '/languages' );
defined( 'GUTENVERSE_FRAMEWORK_SERVER_URL' ) || define( 'GUTENVERSE_FRAMEWORK_SERVER_URL', 'https://gutenverse.com/' );
defined( 'GUTENVERSE_FRAMEWORK_LIBRARY_URL' ) || define( 'GUTENVERSE_FRAMEWORK_LIBRARY_URL', GUTENVERSE_FRAMEWORK_SERVER_URL );
defined( 'GUTENVERSE_FRAMEWORK_UPGRADE_PRO_PAGE_URL' ) || define( 'GUTENVERSE_FRAMEWORK_UPGRADE_PRO_PAGE_URL', GUTENVERSE_FRAMEWORK_SERVER_URL . 'pro' );
defined( 'GUTENVERSE_FRAMEWORK_DOCUMENTATION_URL' ) || define( 'GUTENVERSE_FRAMEWORK_DOCUMENTATION_URL', GUTENVERSE_FRAMEWORK_SERVER_URL . 'docs' );
defined( 'GUTENVERSE_FRAMEWORK_THEMES_URL' ) || define( 'GUTENVERSE_FRAMEWORK_THEMES_URL', GUTENVERSE_FRAMEWORK_SERVER_URL . 'themes' );

// Pro Path.
defined( 'GUTENVERSE_UPGRADE_URL' ) || define( 'GUTENVERSE_UPGRADE_URL', 'https://gutenverse.com/pro' );
defined( 'GUTENVERSE_FRAMEWORK_REFERRAL_URL' ) || define( 'GUTENVERSE_FRAMEWORK_REFERRAL_URL', 'https://pro.gutenverse.com/invite' );


require_once 'autoload.php';
require_once 'helper.php';

/**
 * Initialize Framework
 */
add_action(
	'init',
	function () {
		Gutenverse\Framework\Init::instance();
		do_action( 'gutenverse_after_init_framework' );
	}
);
