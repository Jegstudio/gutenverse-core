<?php
/**
 * Pro plugin dependency notices.
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-framework
 */

namespace Gutenverse\Framework;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Pro_Plugin_Dependency
 *
 * @package gutenverse-framework
 */
class Pro_Plugin_Dependency {
	/**
	 * Plugin dependency map.
	 *
	 * @var array
	 */
	private $plugins = array(
		'gutenverse-news-essential/gutenverse-news-essential.php' => array(
			'name'     => 'Gutenverse News Essential',
			'requires' => array(
				'gutenverse/gutenverse.php'           => 'Gutenverse',
				'gutenverse-news/gutenverse-news.php' => 'Gutenverse News',
				'gutenverse-pro/gutenverse-pro.php'   => 'Gutenverse Pro',
			),
		),
		'gutenverse-news-migration/gutenverse-news-migration.php' => array(
			'name'     => 'Gutenverse News Migration',
			'requires' => array(
				'gutenverse/gutenverse.php'           => 'Gutenverse',
				'gutenverse-news/gutenverse-news.php' => 'Gutenverse News',
				'gutenverse-pro/gutenverse-pro.php'   => 'Gutenverse Pro',
				'gutenverse-news-essential/gutenverse-news-essential.php' => 'Gutenverse News Essential',
			),
		),
	);

	/**
	 * Class constructor.
	 */
	public function __construct() {
		if ( is_admin() ) {
			foreach ( array_keys( $this->plugins ) as $plugin_file ) {
				add_action( 'after_plugin_row_' . $plugin_file, array( $this, 'plugin_row_notice' ), 10, 1 );
			}
		}
	}

	/**
	 * Load plugin helper functions when needed.
	 */
	private function load_plugin_functions() {
		if ( ! function_exists( 'is_plugin_active' ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
		}
	}

	/**
	 * Get inactive required plugins.
	 *
	 * @param string $plugin_file Plugin file.
	 * @return array
	 */
	private function missing_required_plugins( $plugin_file ) {
		$this->load_plugin_functions();

		$missing = array();
		$plugin  = isset( $this->plugins[ $plugin_file ] ) ? $this->plugins[ $plugin_file ] : null;

		if ( empty( $plugin['requires'] ) ) {
			return $missing;
		}

		foreach ( $plugin['requires'] as $required_file => $required_name ) {
			if ( ! is_plugin_active( $required_file ) ) {
				$missing[] = $required_name;
			}
		}

		return $missing;
	}

	/**
	 * Show required plugin notice in plugin list.
	 *
	 * @param string $plugin_file Plugin file.
	 */
	public function plugin_row_notice( $plugin_file ) {
		if ( ! current_user_can( 'activate_plugins' ) ) {
			return;
		}

		$missing = $this->missing_required_plugins( $plugin_file );

		if ( empty( $missing ) ) {
			return;
		}

		printf(
			'<tr class="plugin-update-tr"><td colspan="4" class="plugin-update colspanchange"><div class="update-message notice inline notice-error notice-alt"><p>%s</p></div></td></tr>',
			sprintf(
				/* translators: %s: required plugin names. */
				esc_html__( 'Required plugin needs to be activated: %s.', 'gutenverse' ),
				esc_html( implode( ', ', $missing ) )
			)
		);
	}
}
