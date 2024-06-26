<?php
/**
 * Upgrade Wizard Class.
 *
 * @author Jegstudio
 * @since 2.0.0
 * @package gutenverse
 */

namespace Gutenverse;

use Gutenverse\Framework\Init;

/**
 * Class Upgrade Wizard.
 *
 * @package gutenverse
 */
class Upgrade_Wizard {
	/**
	 * Action Slug
	 *
	 * @var string
	 */
	public static $action = 'gutenverse-upgrade-wizard';

	/**
	 * Upgrade_Wizard constructor.
	 */
	public function __construct() {
		add_action( 'admin_action_' . self::$action, array( $this, 'wizard_page' ) );
	}

	/**
	 * Wizard Page.
	 *
	 * @throws \Exception Throw exception.
	 */
	public function wizard_page() {
		try {
			if ( isset( $_REQUEST['nonce'] ) && wp_verify_nonce( sanitize_key( $_REQUEST['nonce'] ), self::$action ) ) {
				// Nanti implement.
			}

			if ( ! current_user_can( 'install_plugins' ) ) {
				throw new \Exception( 'Access denied', 403 );
			}

			header( 'Content-Type: ' . get_option( 'html_type' ) . '; charset=' . get_option( 'blog_charset' ) );
			$this->set_hook();
			$this->render_wizard();
			exit();
		} catch ( \Exception $e ) {
			echo wp_kses( $e->getMessage(), wp_kses_allowed_html() );
		}
	}

	/**
	 * Render Wizard.
	 */
	public function render_wizard() {
		?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="utf-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	<title><?php esc_html_e( 'Gutenverse Upgrade Wizard', 'gutenverse' ); ?></title>
		<?php wp_head(); ?>
</head>
<body>
<div id="gutenverse-wizard"></div>
		<?php
		wp_footer();
		/** This action is documented in wp-admin/admin-footer.php */
		do_action( 'admin_print_footer_scripts' );
		?>
</body>
</html>
		<?php
	}

	/**
	 * Set Hooks
	 */
	public function set_hook() {
		add_filter( 'show_admin_bar', '__return_false' );

		// Remove all HTML related WordPress actions.
		remove_all_actions( 'wp_head' );
		remove_all_actions( 'wp_print_styles' );
		remove_all_actions( 'wp_print_head_scripts' );
		remove_all_actions( 'wp_footer' );

		// Enqueue Script.
		add_action( 'wp_head', 'wp_enqueue_scripts', 1 );
		add_action( 'wp_head', 'wp_print_styles', 8 );
		add_action( 'wp_head', 'wp_print_head_scripts', 9 );
		add_action( 'wp_head', 'wp_site_icon' );

		// Handle `wp_footer`.
		add_action( 'wp_footer', 'wp_print_footer_scripts', 20 );
		add_action( 'wp_footer', 'wp_auth_check_html', 30 );

		// Handle `wp_enqueue_scripts`.
		remove_all_actions( 'wp_enqueue_scripts' );
		add_filter( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ), 999999 );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_styles' ), 999999 );
	}

	/**
	 * Enqueue Scripts
	 */
	public function enqueue_scripts() {
		$include = ( include GUTENVERSE_DIR . '/lib/dependencies/wizard.asset.php' )['dependencies'];

		wp_enqueue_script(
			'gutenverse-wizard',
			GUTENVERSE_URL . '/assets/js/wizard.js',
			$include,
			GUTENVERSE_VERSION,
			true
		);

		wp_localize_script(
			'gutenverse-wizard',
			'GutenverseWizard',
			$this->wizard_config()
		);
	}

	/**
	 * Wizard Config
	 *
	 * @return array
	 */
	public function wizard_config() {
		$config              = array();
		$config['dashboard'] = admin_url( 'admin.php?page=gutenverse' );
		$config['status']    = array(
			'form' => ! is_plugin_active( 'gutenverse-form/gutenverse-form.php' ),
			'icon' => ! Init::instance()->assets->is_font_icon_exists(),
		);

		return $config;
	}

	/**
	 * Enqueue Style
	 */
	public function enqueue_styles() {
		wp_enqueue_style(
			'gutenverse-backend-font',
			'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&amp;family=Roboto:wght@400;500;600&amp;display=swap',
			array(),
			GUTENVERSE_FRAMEWORK_VERSION
		);

		wp_enqueue_style(
			'gutenverse-wizard',
			GUTENVERSE_URL . '/assets/css/wizard.css',
			array(),
			GUTENVERSE_VERSION
		);
	}
}
