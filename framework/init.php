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
			add_action( 'admin_enqueue_scripts', array( $this, 'print_info' ) );
		}

		/**
		 * Print Information.
		 */
		public function print_info() {
			$version = isset( $this->versions[ $this->loaded ] ) ? $this->versions[ $this->loaded ] : '';
			wp_enqueue_script( 'jquery' );

			$loaded_framework = sprintf(
				'var gutenverseLoadedFramework = {
					"plugin": "%s",
					"version": "%s",
					"registered": %s,
					"pro": %s,
				};',
				esc_js( $this->loaded ),
				esc_js( $version ),
				wp_json_encode( $this->versions ),
				wp_json_encode( $this->pro )
			);
			wp_add_inline_script( 'jquery', $loaded_framework );
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
			if ( defined( 'GUTENVERSE_VERSION' ) && version_compare( GUTENVERSE_VERSION, '1.9.9', '<=' ) ) {
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

			if ( defined( 'GUTENVERSE_VERSION' ) && version_compare( GUTENVERSE_VERSION, '1.9.9', '<=' ) ) {
				add_action( 'wp_ajax_gutenverse_compatibility_notice_close', array( $this, 'compatibility_notice_close' ) );
				add_action( 'admin_enqueue_scripts', array( $this, 'gutenverse_compatibility_notice_script' ) );

				return false;
			}

			return true;
		}

		/**
		 * Compatibility Notice .
		 */
		public function gutenverse_compatibility_notice_script() {
			wp_enqueue_style(
				'gutenverse-core-compatibility-notice',
				GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/admin/css/compatibility-notice.css',
				array(),
				GUTENVERSE_FRAMEWORK_VERSION
			);

			wp_enqueue_script(
				'gutenverse-core-compatibility-notice',
				GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/admin/js/compatibility-notice.js',
				array(),
				GUTENVERSE_FRAMEWORK_VERSION,
				true
			);
		}

		/**
		 * Change option page content to false.
		 */
		public function compatibility_notice_close() {
			update_option( 'gutenverse_compatibility_notice_close', true );
		}
	}
}
