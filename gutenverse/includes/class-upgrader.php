<?php
/**
 * Upgrader class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse
 */

namespace Gutenverse;

use Gutenverse\Framework\Api;
use Gutenverse\Framework\Init;
use Gutenverse\Framework\Meta_Option;

/**
 * Class Upgrader
 *
 * @package gutenverse
 */
class Upgrader {
	/**
	 * Class constructor.
	 */
	public function __construct() {
		add_action( 'admin_notices', array( $this, 'page_upgrade_notice' ) );
		add_action( 'admin_notices', array( $this, 'page_content_notice' ) );
		add_action( 'init', array( $this, 'set_upgrader_page_content' ), 99 );
		add_action( 'init', array( $this, 'set_upgrader_plugin_split' ), 99 );
		add_action( 'wp_ajax_gutenverse_upgrader_page_content_close', array( $this, 'upgrader_page_content_close' ) );
		add_action( 'wp_ajax_gutenverse_upgrader_page_upgrade_close', array( $this, 'upgrader_page_upgrade_close' ) );
		add_action( 'gutenverse_plugin_upgrade', array( $this, 'upgrade_like' ), 20 );
	}

	/**
	 * Enqueue Script.
	 */
	public function enqueue_script() {
		wp_enqueue_style( 'fontawesome-gutenverse' );
	}

	/**
	 * Upgrade like
	 */
	public function upgrade_like() {
		if ( ! apply_filters( 'gutenverse_server_mode', false ) ) {
			$flag = Meta_Option::instance()->get_option( 'converted-library', false );

			if ( ! $flag ) {
				// Force to update library.
				Api::instance()->update_library_data();
				$data = Api::instance()->library_data();

				$this->upgrade_like_layout( $data['theme-data'] );
				$this->upgrade_like_section( $data['section-data'] );
				Meta_Option::instance()->set_option( 'converted-library', true );
			}
		}
	}

	/**
	 * Upgrade like layout data.
	 *
	 * @param array $data Layout Data.
	 */
	public function upgrade_like_layout( $data ) {
		$layouts = Meta_Option::instance()->get_option( 'liked_layout' );

		/** Replace Layouts */
		$liked_layouts  = array();
		$liked_sections = array();
		foreach ( $layouts as $layout ) {
			foreach ( $data as $item ) {
				if ( $item['id'] === $layout ) {
					// Replace id to slug.
					$liked_layouts[] = $item['data']['slug'];
				}
			}
		}

		Meta_Option::instance()->set_option( 'liked_layout', $liked_layouts );
	}

	/**
	 * Upgrade like section data.
	 *
	 * @param array $data Section Data.
	 */
	public function upgrade_like_section( $data ) {
		$sections = Meta_Option::instance()->get_option( 'liked_section' );

		/** Replace Layouts */
		$liked_sections = array();
		foreach ( $sections as $section ) {
			foreach ( $data as $item ) {
				if ( $item['id'] === $section ) {
					// Replace id to slug.
					$liked_sections[] = $item['data']['slug'];
				}
			}
		}

		Meta_Option::instance()->set_option( 'liked_section', $liked_sections );
	}

	/**
	 * Change option page content to false.
	 */
	public function upgrader_page_content_close() {
		update_option( $this->get_page_content_option_name(), false );
	}

	/**
	 * Change option page upgrade to true.
	 */
	public function upgrader_page_upgrade_close() {
		update_option( $this->get_plugin_upgrade_option_name(), true );
	}

	/**
	 * Get Page Content Upgrader Option Name.
	 *
	 * @return string.
	 */
	public function get_page_content_option_name() {
		return 'gutenverse_' . wp_get_theme()->template . '_upgrader_page_content';
	}

	/**
	 * Get Form Split Upgrader Option Name.
	 *
	 * @return string.
	 */
	public function get_plugin_split_option_name() {
		return 'gutenverse_upgrader_plugin_split';
	}

	/**
	 * Ge Upgrader Option Name.
	 *
	 * @return string.
	 */
	public function get_plugin_upgrade_option_name() {
		return 'gutenverse_upgrader_complete';
	}

	/**
	 * Set content width upgrader option meta
	 */
	public function set_upgrader_page_content() {
		$flag = get_option( $this->get_page_content_option_name() );

		if ( ! $flag ) {
			add_option( $this->get_page_content_option_name(), true );
		}
	}

	/**
	 * Set form split option meta
	 */
	public function set_upgrader_plugin_split() {
		$flag            = get_option( $this->get_plugin_split_option_name() );
		$tracker         = Meta_Option::instance()->get_option( 'tracker' )[ GUTENVERSE ];
		$version_history = $tracker['version_history'];
		$version_flag    = count( $version_history ) > 0 && version_compare( $version_history[ count( $version_history ) - 1 ], '2.0.0', '<' ) ? true : false;

		if ( ! $flag && $version_flag && current_user_can( 'manage_options' ) ) {
			add_option( $this->get_plugin_split_option_name(), true );
			wp_safe_redirect( admin_url( 'admin.php?action=gutenverse-upgrade-wizard' ) );
		}
	}

	/**
	 * Check old theme
	 *
	 * @param object $theme : Old theme data.
	 */
	public function check_old_theme( $theme ) {
		$versions = array(
			'accountra' => '1.0.1',
			'financio'  => '1.1.1',
			'hypebiz'   => '1.0.2',
			'intrace'   => '1.0.8',
			'photology' => '1.1.1',
			'renovater' => '1.0.3',
			'restance'  => '1.0.2',
			'startupzy' => '1.0.9',
			'travey'    => '1.0.2',
			'waterlava' => '1.0.4',
			'zeever'    => '1.0.8',
		);

		if ( isset( $versions[ $theme->template ] ) ) {
			return version_compare( $theme->get( 'Version' ), $versions[ $theme->template ], '<=' );
		}

		return false;
	}

	/**
	 * Admin Notice for page content.
	 */
	public function page_content_notice() {
		global $pagenow;

		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		$theme = wp_get_theme();
		$flag  = get_option( $this->get_page_content_option_name() );

		if ( $this->check_old_theme( $theme ) && $flag ) {
			$this->enqueue_script();
			?>
			<div class="notice gutenverse-upgrade-notice page-content-upgrade">
				<div class="notice-logo">
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M10 0C4.47754 0 0 4.47915 0 10C0 15.5241 4.47754 20 10 20C15.5225 20 20 15.5241 20 10C20 4.47915 15.5225 0 10 0ZM10 4.43548C10.9353 4.43548 11.6935 5.19371 11.6935 6.12903C11.6935 7.06435 10.9353 7.82258 10 7.82258C9.06468 7.82258 8.30645 7.06435 8.30645 6.12903C8.30645 5.19371 9.06468 4.43548 10 4.43548ZM12.2581 14.6774C12.2581 14.9446 12.0414 15.1613 11.7742 15.1613H8.22581C7.95859 15.1613 7.74194 14.9446 7.74194 14.6774V13.7097C7.74194 13.4425 7.95859 13.2258 8.22581 13.2258H8.70968V10.6452H8.22581C7.95859 10.6452 7.74194 10.4285 7.74194 10.1613V9.19355C7.74194 8.92633 7.95859 8.70968 8.22581 8.70968H10.8065C11.0737 8.70968 11.2903 8.92633 11.2903 9.19355V13.2258H11.7742C12.0414 13.2258 12.2581 13.4425 12.2581 13.7097V14.6774Z" fill="#FFC908"/>
					</svg>
				</div>
				<div class="notice-content">
					<h2><?php esc_html_e( 'Gutenverse Upgrade Notice!', 'gutenverse' ); ?></h2>
					<p>
					<?php
					printf(
						// translators: theme name.
						esc_html__( 'We detect you are using %1$1s theme. There are some new exciting updates we want to announce. This update will required the latest version of %2$2s theme to work smoothly, so we recommend to update your %3$3s theme.', 'gutenverse' ),
						esc_html( $theme->name ),
						esc_html( $theme->name ),
						esc_html( $theme->name )
					);
					?>
					</p>
					<div class="gutenverse-upgrade-action">
						<?php
						if ( 'themes.php' !== $pagenow ) {
							?>
							<a class='button-primary upgrade-themes' href="<?php echo esc_url( admin_url( 'themes.php' ) ); ?>"><?php esc_html_e( 'Go to theme page', 'gutenverse' ); ?></a>
							<?php
						}
						?>
						<a class='close-notification' href="#"><?php esc_html_e( 'Close notification', 'gutenverse' ); ?></a>
					</div>
				</div>
			</div>
			<script>
				(function($) {
					$('.gutenverse-upgrade-notice.page-content-upgrade .close-notification').on('click', function() {
						$.post( ajaxurl, {
							action: 'gutenverse_upgrader_page_content_close'
						} );

						$('.gutenverse-upgrade-notice.page-content-upgrade').fadeOut();
					});
				})(jQuery);
			</script>
			<?php
		}
	}

	/**
	 * Admin Notice for page upgrade.
	 */
	public function page_upgrade_notice() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		$done = get_option( $this->get_plugin_upgrade_option_name() );
		$flag = get_option( $this->get_plugin_split_option_name() );
		$font = Init::instance()->assets->is_font_icon_exists();
		$form = is_plugin_active( 'gutenverse-form/gutenverse-form.php' );

		if ( $flag && ! $done && ( ! $font || ! $form ) ) {
			$this->enqueue_script();
			?>
			<div class="notice gutenverse-upgrade-notice page-content-upgrade">
				<div class="notice-logo">
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M10 0C4.47754 0 0 4.47915 0 10C0 15.5241 4.47754 20 10 20C15.5225 20 20 15.5241 20 10C20 4.47915 15.5225 0 10 0ZM10 4.43548C10.9353 4.43548 11.6935 5.19371 11.6935 6.12903C11.6935 7.06435 10.9353 7.82258 10 7.82258C9.06468 7.82258 8.30645 7.06435 8.30645 6.12903C8.30645 5.19371 9.06468 4.43548 10 4.43548ZM12.2581 14.6774C12.2581 14.9446 12.0414 15.1613 11.7742 15.1613H8.22581C7.95859 15.1613 7.74194 14.9446 7.74194 14.6774V13.7097C7.74194 13.4425 7.95859 13.2258 8.22581 13.2258H8.70968V10.6452H8.22581C7.95859 10.6452 7.74194 10.4285 7.74194 10.1613V9.19355C7.74194 8.92633 7.95859 8.70968 8.22581 8.70968H10.8065C11.0737 8.70968 11.2903 8.92633 11.2903 9.19355V13.2258H11.7742C12.0414 13.2258 12.2581 13.4425 12.2581 13.7097V14.6774Z" fill="#FFC908"/>
					</svg>
				</div>
				<div class="notice-content">
					<h2><?php esc_html_e( 'New Gutenverse Setup!', 'gutenverse' ); ?></h2>
					<p><?php echo esc_html__( 'We\'ve made some changes on v2.0.0:', 'gutenverse' ); ?></p>
					<p><?php printf( '1. We\'ve separated the %s from our main plugin to speed up Gutenverse and offer more flexibility. If you were using form before, please install & activate the form plugin.', '<strong>Gutenverse Form</strong>' ); ?></p>
					<p><?php echo esc_html__( '2. Fonticons are now loaded locally. You can find this option and download the font in the Gutenverse Settings menu.', 'gutenverse' ); ?></p>
					<div class="gutenverse-upgrade-action">
						<a class='button-primary upgrade-themes' href="<?php echo esc_url( admin_url( 'admin.php?action=gutenverse-upgrade-wizard' ) ); ?>"><?php esc_html_e( 'Setup Now!', 'gutenverse' ); ?></a>
						<a class='close-notification' href="#"><?php esc_html_e( 'Close notification', 'gutenverse' ); ?></a>
					</div>
				</div>
			</div>
			<script>
				(function($) {
					$('.gutenverse-upgrade-notice.page-content-upgrade .close-notification').on('click', function() {
						$.post( ajaxurl, {
							action: 'gutenverse_upgrader_page_upgrade_close'
						} );

						$('.gutenverse-upgrade-notice.page-content-upgrade').fadeOut();
					});
				})(jQuery);
			</script>
			<?php
		}
	}
}
