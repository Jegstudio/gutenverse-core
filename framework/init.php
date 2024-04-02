<?php
/**
 * Initialization helper for each of framework
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-framework
 */

if ( ! class_exists( 'Gutenverse_Initialize_Framework' ) ) {
	/**
	 * Class Gutenverse_Initialize_Framework
	 *
	 * @package gutenverse
	 */
	class Gutenverse_Initialize_Framework {
		/**
		 * Instance of Gutenverse.
		 *
		 * @var Gutenverse
		 */
		private static $instance;

		/**
		 * Hold Versions of Plugin.
		 *
		 * @var array
		 */
		private $versions;

		/**
		 * Loaded Slug.
		 *
		 * @var string
		 */
		private $loaded;

		/**
		 * Hold Minimal Pro Version of Plugin.
		 *
		 * @var array
		 */
		private $pro;

		/**
		 * Singleton Class
		 *
		 * @return Gutenverse_Initialize_Framework
		 */
		public static function instance() {
			if ( null === static::$instance ) {
				static::$instance = new static();
			}

			return static::$instance;
		}

		/**
		 * Construct.
		 */
		private function __construct() {
			$this->hook();
			$this->versions = array();
		}

		/**
		 * Hooks.
		 */
		public function hook() {
			add_action( 'admin_head', array( $this, 'print_info' ) );
		}

		/**
		 * Print Information.
		 */
		public function print_info() {
			$version = isset( $this->versions[ $this->loaded ] ) ? $this->versions[ $this->loaded ] : '';
			?>
			<script> 
			var gutenverseLoadedFramework = {
				plugin: "<?php echo esc_html( $this->loaded ); ?>",
				version: "<?php echo esc_html( $version ); ?>",
				registered: <?php echo wp_json_encode( $this->versions ); ?>,
				pro: <?php echo wp_json_encode( $this->pro ); ?>
			}; 
			</script>
			<?php
		}

		/**
		 * Register version.
		 *
		 * @param string $slug Plugin Slug.
		 * @param string $framework_version Framework Version.
		 */
		public function register_version( $slug, $framework_version ) {
			$this->versions[ $slug ] = $framework_version;
		}

		/**
		 * Register Pro.
		 *
		 * @param string $slug Plugin Slug.
		 * @param string $pro_version Minimal Pro Version.
		 */
		public function register_pro_version( $slug, $pro_version ) {
			$this->pro[ $slug ] = $pro_version;
		}

		/**
		 * Check if pro need to be updated.
		 */
		public function need_update_pro() {
			$flag    = false;
			$version = '0.0.0';

			if ( defined( 'GUTENVERSE_PRO' ) && ! empty( $this->pro ) ) {
				foreach ( $this->pro as $pro ) {
					$version = version_compare( $pro, $version, '>' ) ? $pro : $version;
					if ( version_compare( GUTENVERSE_PRO_VERSION, $pro, '<' ) ) {
						$flag = true;
					}
				}
			}

			return array(
				'minimal_version' => $version,
				'need_update'     => $flag,
			);
		}

		/**
		 * Read File and parse version.
		 *
		 * @param string $file File Path of framework constant.
		 *
		 * @return string|null
		 */
		public function get_framework_version( $file ) {
			global $wp_filesystem;
			require_once ABSPATH . 'wp-admin/includes/file.php';
			WP_Filesystem();

			if ( $wp_filesystem->exists( $file ) ) {
				$text = $wp_filesystem->get_contents( $file );

				$pattern = "/\'GUTENVERSE_FRAMEWORK_VERSION\'\,[\s+|\']+(\S+)\'/";
				preg_match( $pattern, $text, $matches );
				return $matches[1];
			}

			return null;
		}

		/**
		 * Check if we can load current framework version.
		 *
		 * @param string $slug Plugin Slug.
		 *
		 * @return bool
		 */
		public function can_load_version( $slug ) {
			// Don't load framework if gutenverse installed on version less then 2.0.0.
			if ( defined( 'GUTENVERSE_VERSION' ) && version_compare( GUTENVERSE_VERSION, '1.9.0', '<=' ) ) {
				return false;
			}

			$latest = array(
				'slug'    => '',
				'version' => '0.0.0',
			);

			foreach ( $this->versions as $key => $version ) {
				if ( version_compare( $version, $latest['version'], '>' ) ) {
					$latest = array(
						'slug'    => $key,
						'version' => $version,
					);
				}
			}

			if ( $latest['slug'] === $slug ) {
				$this->loaded = $slug;
				return true;
			}

			return false;
		}

		/**
		 * Check compatibility with older version of Gutenverse plugin.
		 *
		 * @return bool
		 */
		public function check_compatibility() {
			if ( defined( 'GUTENVERSE_VERSION' ) && version_compare( GUTENVERSE_VERSION, '1.9.0', '<=' ) ) {
				add_action( 'admin_notices', array( $this, 'gutenverse_compatibility_notice' ) );
				add_action( 'wp_ajax_gutenverse_compatibility_notice_close', array( $this, 'compatibility_notice_close' ) );

				return false;
			}

			return true;
		}

		/**
		 * Show notification to update Gutenverse Plugin to version 2.0.
		 */
		public function gutenverse_compatibility_notice() {
			if ( ! current_user_can( 'manage_options' ) ) {
				return;
			}

			$plugin_list = apply_filters( 'gutenverse_companion_plugin_list', array() );

			if ( ! get_option( 'gutenverse_compatibility_notice_flag' ) ) {
				?>
				<style>
					.gutenverse-upgrade-notice.important .notice-logo {
						background: #ffe2e2;
						border-left-color: #ff0909;
					}

					.gutenverse-upgrade-notice .plugin-list {
						list-style: disc;
						padding-left: 16px;
					}
				</style>
				<div class="notice gutenverse-upgrade-notice important page-content-upgrade">
					<div class="notice-logo">
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M10 0C4.47754 0 0 4.47915 0 10C0 15.5241 4.47754 20 10 20C15.5225 20 20 15.5241 20 10C20 4.47915 15.5225 0 10 0ZM10 4.43548C10.9353 4.43548 11.6935 5.19371 11.6935 6.12903C11.6935 7.06435 10.9353 7.82258 10 7.82258C9.06468 7.82258 8.30645 7.06435 8.30645 6.12903C8.30645 5.19371 9.06468 4.43548 10 4.43548ZM12.2581 14.6774C12.2581 14.9446 12.0414 15.1613 11.7742 15.1613H8.22581C7.95859 15.1613 7.74194 14.9446 7.74194 14.6774V13.7097C7.74194 13.4425 7.95859 13.2258 8.22581 13.2258H8.70968V10.6452H8.22581C7.95859 10.6452 7.74194 10.4285 7.74194 10.1613V9.19355C7.74194 8.92633 7.95859 8.70968 8.22581 8.70968H10.8065C11.0737 8.70968 11.2903 8.92633 11.2903 9.19355V13.2258H11.7742C12.0414 13.2258 12.2581 13.4425 12.2581 13.7097V14.6774Z" fill="#ff0909"/>
						</svg>
					</div>
					<div class="notice-content">
						<h2><?php esc_html_e( 'Important Gutenverse Compatibility Notice!', '--gctd--' ); ?></h2>
						<p>
						<?php
						esc_html_e( 'You are currently using lower version of Gutenverse plugin, we highly recommend to update to Gutenverse 2.0 or higher so you can continue using these plugins :', '--gctd--' );
						?>
						</p>
						<ul class="plugin-list">
						<?php
						foreach ( $plugin_list as $plugin ) {
							// translators: %s is plugin name in string format.
							?>
							<li><?php echo esc_html( sprintf( '%s', $plugin ) ); ?></li>
							<?php
						}
						?>
						</ul>
						<div class="gutenverse-upgrade-action">
							<a class='update-action' href="<?php echo esc_url( admin_url( 'plugins.php' ) ); ?>"><strong><?php esc_html_e( 'Update Gutenverse Now!', '--gctd--' ); ?></strong></a>
						</div>
					</div>
				</div>
				<script>
					(function($) {
						$('.gutenverse-upgrade-notice.page-content-upgrade .close-notification').on('click', function() {
							$.post( ajaxurl, {
								action: 'gutenverse_compatibility_notice_close'
							} );

							$('.gutenverse-upgrade-notice.page-content-upgrade').fadeOut();
						});
					})(jQuery);
				</script>
				<?php
			}
		}

		/**
		 * Change option page content to false.
		 */
		public function compatibility_notice_close() {
			update_option( 'gutenverse_compatibility_notice_close', true );
		}
	}
}
