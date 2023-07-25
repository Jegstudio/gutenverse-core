<?php
/**
 * Import Template class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-framework
 */

namespace Gutenverse\Framework;

/**
 * Class Import Template
 *
 * @package gutenverse-framework
 */
class Import_Template {
	/**
	 * Init constructor.
	 */
	public function __construct() {
		$this->install_templates();

		add_action( 'gutenverse_after_install_notice', array( $this, 'after_install_notice' ) );
	}

	/**
	 * Installation notice.
	 */
	public function after_install_notice() {
		if ( ! isset( $_REQUEST['install-template'] ) ) { //phpcs:ignore
			return;
		}

		?>
		<div class="notice is-dismissible">
			<span>
			<?php
				echo esc_html_e( 'Thank you for installing Gutenverse templates!', '--gctd--' );
				printf(
					// translators: %2$s site editor url.
					esc_html__( '%1$s %2$s', '--gctd--' ),
					esc_html__( ' Check out your tempates in ', '--gctd--' ),
					sprintf(
						'<a href="%s">%s</a>',
						esc_url( admin_url( 'site-editor.php' ) ),
						esc_html__( 'Fullsite Editor.', '--gctd--' )
					)
				);
			?>
			</span>
		</div>
		<?php
	}

	/**
	 * Install Gutenverse Templates.
	 *
	 * THIS FUNCTION IS DEPRECATED AND POTENTIALY WILL BE REMOVED IN THE FUTURE.
	 *
	 * @since 1.3.0
	 */
	private function install_templates() {
		if ( ! isset( $_REQUEST['install-template'] ) ) {
			return;
		}

		if ( 'gutenverse' === $_REQUEST['install-template'] && isset( $_REQUEST['_wpnonce'] ) && wp_verify_nonce( wp_unslash( $_REQUEST['_wpnonce'] ), 'install-template_gutenverse' ) ) { //phpcs:ignore
			$theme_dir   = get_template_directory();
			$parts       = scandir( $theme_dir . '/gutenverse-templates/parts/' );
			$source      = $theme_dir . '/gutenverse-templates/parts/';
			$destination = $theme_dir . '/parts/';

			foreach ( $parts as $part ) {
				if ( in_array( $part, array( '.', '..' ), true ) ) {
					continue;
				}
				copy( $source . $part, $destination . $part );
			}

			$templates   = scandir( $theme_dir . '/gutenverse-templates/templates/' );
			$source      = $theme_dir . '/gutenverse-templates/templates/';
			$destination = $theme_dir . '/templates/';

			foreach ( $templates as $template ) {
				if ( in_array( $template, array( '.', '..' ), true ) ) {
					continue;
				}
				copy( $source . $template, $destination . $template );
			}

			$theme = wp_get_theme();
			$name  = $theme->get( 'TextDomain' ) . '_gutenverse_template_installed';

			update_option( $name, true );
		}
	}
}
