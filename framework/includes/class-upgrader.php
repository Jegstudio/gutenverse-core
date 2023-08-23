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

		add_action( 'admin_notices', array( $this, 'framework_init_notice' ) );
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

	/**
	 * Admin Notice for page content.
	 */
	public function framework_init_notice() {
		global $pagenow;

		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		$flag = get_option( $this->get_framework_init_option_name() );

		if ( $flag ) {
			wp_enqueue_style( 'fontawesome-gutenverse' );
			?>
			<div class="notice gutenverse-upgrade-notice framework-init-upgrade">
				<div class="notice-logo">
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M10 0C4.47754 0 0 4.47915 0 10C0 15.5241 4.47754 20 10 20C15.5225 20 20 15.5241 20 10C20 4.47915 15.5225 0 10 0ZM10 4.43548C10.9353 4.43548 11.6935 5.19371 11.6935 6.12903C11.6935 7.06435 10.9353 7.82258 10 7.82258C9.06468 7.82258 8.30645 7.06435 8.30645 6.12903C8.30645 5.19371 9.06468 4.43548 10 4.43548ZM12.2581 14.6774C12.2581 14.9446 12.0414 15.1613 11.7742 15.1613H8.22581C7.95859 15.1613 7.74194 14.9446 7.74194 14.6774V13.7097C7.74194 13.4425 7.95859 13.2258 8.22581 13.2258H8.70968V10.6452H8.22581C7.95859 10.6452 7.74194 10.4285 7.74194 10.1613V9.19355C7.74194 8.92633 7.95859 8.70968 8.22581 8.70968H10.8065C11.0737 8.70968 11.2903 8.92633 11.2903 9.19355V13.2258H11.7742C12.0414 13.2258 12.2581 13.4425 12.2581 13.7097V14.6774Z" fill="#FFC908"/>
					</svg>
				</div>
				<div class="notice-content">
					<h2><?php esc_html_e( 'Gutenverse Upgrade Notice!', '--gctd--' ); ?></h2>
					<p>
					<?php
					echo esc_html__( 'We have noticed that the versions of your Gutenverse plugins do not match. We recommend updating Gutenverse to ensure seamless compatibility and functionality of the plugins.', '--gctd--' );
					?>
					<div class="gutenverse-upgrade-action">
						<?php
						if ( 'plugins.php' !== $pagenow ) {
							?>
							<a class='button-primary upgrade-themes' href="<?php echo esc_url( admin_url( 'plugins.php' ) ); ?>"><?php esc_html_e( 'Go to plugin page', '--gctd--' ); ?></a>
							<?php
						}
						?>
						<a class='close-notification' href="#"><?php esc_html_e( 'Close notification', '--gctd--' ); ?></a>
					</div>
				</div>
			</div>
			<script>
				(function($) {
					$('.gutenverse-upgrade-notice.framework-init-upgrade .close-notification').on('click', function() {
						$.post( ajaxurl, {
							action: 'gutenverse_upgrader_framework_init_close'
						} );

						$('.gutenverse-upgrade-notice.framework-init-upgrade').fadeOut();
					});
				})(jQuery);
			</script>
			<?php
		}
	}
}
