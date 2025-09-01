<?php
/**
 * Gutenverse Framework Main class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-framework
 */

namespace Gutenverse\Framework;

/**
 * Class Init
 *
 * @package gutenverse-framework
 */
class Init {
	/**
	 * Instance of Init.
	 *
	 * @var Init
	 */
	private static $instance;

	/**
	 * Hold instance of api
	 *
	 * @var Api
	 */
	public $api;

	/**
	 * Hold instance of blocks
	 *
	 * @var Blocks
	 */
	public $blocks;

	/**
	 * Hold instance of dashboard
	 *
	 * @var Dashboard
	 */
	public $dashboard;

	/**
	 * Hold instance of editor assets
	 *
	 * @var Editor_Assets
	 */
	public $editor_assets;

	/**
	 * Hold instance of fontend assets
	 *
	 * @var Frontend_Assets
	 */
	public $frontend_assets;

	/**
	 * Hold instance of fontend toolbar
	 *
	 * @var Frontend_Toolbar
	 */
	public $frontend_toolbar;

	/**
	 * Hold instance of meta options
	 *
	 * @var Meta_Option
	 */
	public $meta_option;

	/**
	 * Hold instance of style generator
	 *
	 * @var Style_Generator
	 */
	public $style_generator;

	/**
	 * Style Cache
	 *
	 * @var Style_Cache
	 */
	public $style_cache;

	/**
	 * Hold instance of global variable
	 *
	 * @var Global_Variable
	 */
	public $global_variable;

	/**
	 * Hold instance of theme helper
	 *
	 * @var Theme_Helper
	 */
	public $theme_helper;

	/**
	 * Hold instance of assets
	 *
	 * @var Assets
	 */
	public $assets;

	/**
	 * Hold instance of upgrader
	 *
	 * @var Upgrader
	 */
	public $upgrader;

	/**
	 * Singleton page for Init Class
	 *
	 * @return Init
	 */
	public static function instance() {
		if ( null === static::$instance ) {
			static::$instance = new static();
		}

		return static::$instance;
	}

	/**
	 * Init constructor.
	 */
	private function __construct() {
		$this->init_hook();
		$this->init_instance();
		$this->init_class();
	}

	/**
	 * Initialize Hook
	 */
	public function init_hook() {
		// actions.
		add_action( 'admin_notices', array( $this, 'notice_unibiz' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'notice_install_plugin_script' ) );
		add_action( 'rest_api_init', array( $this, 'init_api' ) );
		add_action( 'activated_plugin', array( $this, 'flush_rewrite_rules' ) );
		add_action( 'admin_init', array( $this, 'redirect_to_dashboard' ) );
		add_action( 'customize_register', '__return_true' );
		add_action( 'template_redirect', array( $this, 'remove_doing_wp_cron_param' ) );
		add_action( 'wp_footer', array( $this, 'run_wp_cron_from_footer' ) );

		// filters.
		add_filter( 'after_setup_theme', array( $this, 'init_settings' ) );
		add_filter( 'upload_mimes', array( $this, 'add_fonts_to_allowed_mimes' ) );
		add_filter( 'wp_check_filetype_and_ext', array( $this, 'update_mime_types' ), 10, 3 );
		/**
		 * These functions used to be called inside init hook.
		 * But because framework called using init hook.
		 * Now these functions will be called directly.
		 */
		$this->register_menu_position();
		$this->import_mechanism();
	}

	/**
	 * Hide doing_wp_cron query argument in url
	 */
	public function notice_unibiz() {
		$current_theme = get_stylesheet();
		if ( 'unibiz' === $current_theme ) {
			return;
		}
		$image_dir = GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/img';
		ob_start();
		?>
		<style>
			.update-php .wrap{
				max-width: 100% !important;
			}
			.gutenverse-unibiz-notice{
				background : url(<?php echo esc_html( $image_dir ) . '/unibiz-bg-banner-gradient.png'; ?>);
				background-position: center;
				background-repeat: no-repeat;
				background-size: cover;
				position: relative;
			}
			.gutenverse-unibiz-notice .unibiz-gutenverse-badge{
				position: absolute;
				bottom: 0;
				right: 0;
			}
			.notice.gutenverse-unibiz-notice{
				border: none;
				padding: 0px;
			}
			.gutenverse-unibiz-notice .content-wrapper{
				width: 100%;
				height: 100%;
				display: flex;
				overflow: hidden;
				position: relative;
			}

			.gutenverse-unibiz-notice .content-wrapper .close-button{
				position: absolute;
				top: 5px;
				right: 5px;
				cursor: pointer;
				transition: transform .3s ease;
				z-index: 5;
			}
			.gutenverse-unibiz-notice .content-wrapper .close-button:hover{
				transform: scale(.93);
			}
			
			.gutenverse-unibiz-notice .content-wrapper .col-1{
				width: 50%;
				position: relative;
				z-index: 3;
			}
			.gutenverse-unibiz-notice .content-wrapper .col-1 .content{
				margin: 40px 0px 40px 60px;
			}

			.gutenverse-unibiz-notice .content-wrapper .col-1 .title{
				font-family: Host Grotesk;
				font-weight: 700;
				font-size: 24px;
				line-height: 1.14;
				background: linear-gradient(93.32deg, #00223D 0.65%, #371C73 68.04%);
				background-clip: text;
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}

			.gutenverse-unibiz-notice .content-wrapper .col-1 .title .highlight-title{
				background: linear-gradient(84.2deg, #7032FF 15.94%, #4B8EFF 97.2%);
				background-clip: text;
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}
			.gutenverse-unibiz-notice .content-wrapper .col-1 .description{
				font-family: Host Grotesk;
				font-weight: 400;
				font-size: 14px;
				color: #00223D99;
			}
			.gutenverse-unibiz-notice .content-wrapper .col-1 .feature-wrapper{
				display: flex;
				gap: 10px;
				text-wrap: nowrap;
				align-items: center;
			}
			.gutenverse-unibiz-notice .content-wrapper .col-1 .feature-wrapper .feature-item{
				display: flex;
				gap: 5px;
				align-items: center;
				font-family: Host Grotesk;
				font-weight: 500;
				font-size: 12px;
				color: #5C51F3;
				border-radius: 24px;
				padding: 3px 10px 3px 5px;
				background: #FFFFFF;
				border: 1px solid #5C51F34D
			}
			.gutenverse-unibiz-notice .content-wrapper .col-1 .button-wrapper{
				display: flex;
				align-items: center;
				margin-top: 20px;
			}

			.gutenverse-unibiz-notice .content-wrapper .col-1 .button-wrapper .button-install{
				width: 142px;
				height: 36px;
				border-radius: 8px;
				padding: 5px 16px;
				background: radial-gradient(103.69% 112% at 51.27% 100%, #4992FF 0%, #7722FF 100%);
				border: 1px solid #9760FF;
				color: white;
				cursor: pointer;
				transition: transform .3s ease;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.gutenverse-unibiz-notice .content-wrapper .col-1 .button-wrapper .button-install svg {
				animation: infinite rotate 2s linear;
			}
			.gutenverse-unibiz-notice .content-wrapper .col-1 .button-wrapper .button-install:hover{
				transform: scale(.93);
			}
			.gutenverse-unibiz-notice .content-wrapper .col-1 .button-wrapper .arrow-wrapper{
				position: relative;
			}
			.gutenverse-unibiz-notice .content-wrapper .col-1 .button-wrapper .unibiz-arrow{
				position: absolute;
				top: -55px;
				right: -130px;
			}

			.gutenverse-unibiz-notice .content-wrapper .col-2{
				position: relative;
				width: 100%;
				display: flex;
				justify-content: center;
			}

			.gutenverse-unibiz-notice .content-wrapper .col-2 .unibiz-wave{
				position:absolute;
				right: 0;
			}
			.gutenverse-unibiz-notice .content-wrapper .col-2 .mockup-wrapper{
				display: flex;
				justify-content: center;
				position: relative;
			}
			.gutenverse-unibiz-notice .content-wrapper .col-2 .mockup-wrapper .unibiz-mockup{
				z-index: 2;
				max-width: 550px;
			}
			.gutenverse-unibiz-notice .content-wrapper .col-2 .mockup-wrapper .unibiz-confetti{
				z-index: 2;
				position: absolute;
				top: -10px;
				bottom: 0;
				height: 110%;
			}
			.gutenverse-unibiz-notice .content-wrapper .col-2 .mockup-wrapper .unibiz-wave{
				z-index: 2;
				position: absolute;
				top: -200%;
				right: -70%;
			}
			@media screen and (max-width: 1440px) {
				.gutenverse-unibiz-notice .content-wrapper .col-2{
					position: relative;
					width: 100%;
					display: flex;
					justify-content: end;
				}
			}
			@media screen and (max-width: 1300px) {
				.gutenverse-unibiz-notice .content-wrapper .col-1{
					width: 100%;
				}
				.gutenverse-unibiz-notice .content-wrapper .col-2{
					display: none;
				}
			}
			@keyframes rotate {
				from {
					transform: rotate(0deg);
				}

				to {
					transform: rotate(360deg);
				}
			}
		</style>
		<div class="notice gutenverse-unibiz-notice">
			<div class="content-wrapper">
				<div class="close-button" id="gutenverse-unibiz-notice-close">
					<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
						<foreignObject x="-3" y="-3" width="20" height="20"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(1.5px);clip-path:url(#bgblur_0_23210_9188_clip_path);height:100%;width:100%"></div></foreignObject><g data-figma-bg-blur-radius="3">
						<rect width="14" height="14" rx="2" fill="#4F389C" fill-opacity="0.3"/>
						<path d="M9 5L5 9M5 5L9 9" stroke="white" stroke-width="0.8" stroke-linecap="round"/>
						</g>
						<defs>
						<clipPath id="bgblur_0_23210_9188_clip_path" transform="translate(3 3)"><rect width="14" height="14" rx="2"/>
						</clipPath></defs>
					</svg>

				</div>
				<div class="col-1">
					<div class="content">
						<h3 class="title"><?php esc_html_e( 'Supercharge Gutenverse With', 'gutenverse' ); ?> <span class="highlight-title"><?php esc_html_e( 'Unibiz Theme!', 'gutenverse' ); ?></span></h3>
						<p class="description"><?php esc_html_e( 'Get instant access to professionally designed demos, exclusive block patterns, and powerful features tailored to work seamlessly with Gutenverse.', 'gutenverse' ); ?></p>
						<ul class="feature-wrapper">
							<li class="feature-item">
								<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
									<rect width="14" height="14" rx="7" fill="#5C51F3"/>
									<g clip-path="url(#clip0_23210_9163)">
									<path d="M6.36496 10.1879L3.81934 7.40369L4.54651 6.60838L6.36548 8.5961L6.36496 8.59666L10.7285 3.82422L11.4557 4.61953L7.09214 9.39254L6.36548 10.1873L6.36496 10.1879Z" fill="white"/>
									</g>
									<defs>
									<clipPath id="clip0_23210_9163">
									<rect x="3.79297" y="3.89453" width="7.61251" height="7.61251" rx="3.80625" fill="white"/>
									</clipPath>
									</defs>
								</svg>
								<?php esc_html_e( 'Premium Starter Templates', 'gutenverse' ); ?>
							</li>
							<li class="feature-item">
								<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
									<rect width="14" height="14" rx="7" fill="#5C51F3"/>
									<g clip-path="url(#clip0_23210_9163)">
									<path d="M6.36496 10.1879L3.81934 7.40369L4.54651 6.60838L6.36548 8.5961L6.36496 8.59666L10.7285 3.82422L11.4557 4.61953L7.09214 9.39254L6.36548 10.1873L6.36496 10.1879Z" fill="white"/>
									</g>
									<defs>
									<clipPath id="clip0_23210_9163">
									<rect x="3.79297" y="3.89453" width="7.61251" height="7.61251" rx="3.80625" fill="white"/>
									</clipPath>
									</defs>
								</svg>
								<?php esc_html_e( 'Seamless Integration', 'gutenverse' ); ?>
							</li>
							<li class="feature-item">
								<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
									<rect width="14" height="14" rx="7" fill="#5C51F3"/>
									<g clip-path="url(#clip0_23210_9163)">
									<path d="M6.36496 10.1879L3.81934 7.40369L4.54651 6.60838L6.36548 8.5961L6.36496 8.59666L10.7285 3.82422L11.4557 4.61953L7.09214 9.39254L6.36548 10.1873L6.36496 10.1879Z" fill="white"/>
									</g>
									<defs>
									<clipPath id="clip0_23210_9163">
									<rect x="3.79297" y="3.89453" width="7.61251" height="7.61251" rx="3.80625" fill="white"/>
									</clipPath>
									</defs>
								</svg>
								<?php esc_html_e( 'Exclusive Blocks & Layouts', 'gutenverse' ); ?>
							</li>
						</ul>
						<div class="button-wrapper">
							<div class="button-install"><?php esc_html_e( 'Install Unibiz Theme', 'gutenverse' ); ?></div>
							<div class="arrow-wrapper">
								<img class="unibiz-arrow" src="<?php echo esc_html( $image_dir ) . '/unibiz-arrow.png'; ?>"  alt="image arrow unibiz"/>
							</div>
						</div>
					</div>
				</div>
				<div class="col-2">
					<div class="mockup-wrapper">
						<img class="unibiz-wave" src="<?php echo esc_html( $image_dir ) . '/unibiz-bg-banner-circle-full.png'; ?>" alt='wave'/>
						<img class="unibiz-confetti" src="<?php echo esc_html( $image_dir ) . '/unibiz-confetti.png'; ?>"  alt="image confetti"/>
						<img class="unibiz-mockup" src="<?php echo esc_html( $image_dir ) . '/unibiz-mockup.png'; ?>"  alt="image mockup"/>
					</div>
				</div>
			</div>
			<img class="unibiz-gutenverse-badge" src="<?php echo esc_html( $image_dir ) . '/unibiz-gutenverse-badge.png'; ?>"  alt="image gutenverse badge"/>
		</div>
		<script>
			const installingPlugins = (pluginsList) => {
				return new Promise((resolve, reject) => {
					const { plugins: installedPlugin } = window['GutenverseConfig'] || window['GutenverseDashboard'] || {};
					const plugins = pluginsList.map(plgn => ({
						name: plgn.name,
						slug: plgn.slug,
						version: plgn.version,
						url: plgn.url,
						installed: !!installedPlugin[plgn.slug],
						active: !!installedPlugin[plgn.slug]?.active,
					}));
					setTimeout(() => {
						const installPlugins = (index = 0) => {
							if (index >= plugins.length) {
								resolve();
								return;
							}

							const plugin = plugins[index];

							if (plugin) {
								// Not installed
								if (!plugin.installed) {
									wp.apiFetch({
										path: 'wp/v2/plugins',
										method: 'POST',
										data: {
											slug: plugin.slug,
											status: 'active'
										}
									}).then(()=> setTimeout(() => installPlugins(index + 1), 1500)
									).catch((err) => console.log(err));

									// Installed but not active
								} else if (!plugin.active) {
									const slug = plugin.slug;
									const path = `${slug}/${slug}`;
									wp.apiFetch({
										path: `wp/v2/plugins/plugin?plugin=${path}`,
										method: 'POST',
										data: {
											status: 'active'
										}
									}).then(()=> setTimeout(() => installPlugins(index + 1), 1500)
									).catch((err) => console.log(err));

									// Already installed & active
								} else {
									setTimeout(() => installPlugins(index + 1), 1500);
								}
							}
						};

						installPlugins();
					}, 500);
				});
			};
			const installAndActivateTheme = (slug) => {
				return new Promise((resolve, reject) => {
					wp.apiFetch({
						path: `gutenverse-client/v1/library/install-activate-theme`,
						method: 'POST',
						data: {
							slug: slug,
						},
					}).then((data) => resolve(data)
					).catch((err) => {
						console.error('Error', err);
						reject(err);
					});
				});
			}

			(function($) {
				const { domainURL } = window['GutenverseConfig'] || window['GutenverseDashboard'] ||{};

				$('.gutenverse-unibiz-notice #gutenverse-unibiz-notice-close').on('click', function() {
					$('.gutenverse-unibiz-notice').fadeOut();
				});
				$('.gutenverse-unibiz-notice .col-1 .button-wrapper .button-install').on('click', function() {
					const themeSlug = 'unibiz'; // change this to your theme slug
					const pluginsList = [
						{ name: 'Gutenverse Companion', slug: 'gutenverse-companion', version: '', url: '' },
					];
					const installBtn = document.querySelector('.gutenverse-unibiz-notice .button-install');
					if (installBtn) {
						installBtn.innerHTML = `<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8.69737 1V2.89873M8.69737 12.962V16M3.76316 8.40506H1M16 8.40506H14.8158M13.7951 13.3092L13.2368 12.7722M13.9586 3.40439L12.8421 4.47848M3.10914 13.7811L5.34211 11.6329M3.27264 3.2471L4.94737 4.85823" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						</svg>`;
					}
					// Step 1: Install + Activate Theme
					installAndActivateTheme(themeSlug)
						.then(themeResponse => {
							return installingPlugins(pluginsList);
						})
						.then(() => {
							// Redirect to Gutenverse Companion dashboard demo page
							window.location.replace(
								`${window.location.origin}/wp-admin/admin.php?page=gutenverse-companion-dashboard&path=demo`
							);
						})
						.catch(err => {
							console.error('Installation failed:', err);
							alert('Something went wrong during installation. Please try again.');
						});
				});
			})(jQuery);
		</script>
		<?php
		$data_html = ob_get_contents();
		ob_end_clean();
		echo $data_html;
	}

	/**
	 * Hide doing_wp_cron query argument in url
	 */
	public function remove_doing_wp_cron_param() {
		if ( isset( $_GET['doing_wp_cron'] ) ) {
			$url = remove_query_arg( 'doing_wp_cron' );
			wp_safe_redirect( $url );
			exit;
		}
	}

	/**
	 * Run Cron from footer instead of query argument
	 */
	public function run_wp_cron_from_footer() {
		if ( defined( 'DOING_CRON' ) && DOING_CRON ) {
			return;
		}
		define( 'DOING_CRON', true );

		wp_cron();
	}

	/**
	 * Initialize Instances
	 */
	public function init_instance() {
		$this->meta_option = Meta_Option::instance();
	}

	/**
	 * Initialize Classes
	 */
	public function init_class() {
		$this->assets           = new Assets();
		$this->dashboard        = new Dashboard();
		$this->theme_helper     = new Theme_Helper();
		$this->blocks           = new Blocks();
		$this->frontend_assets  = new Frontend_Assets();
		$this->editor_assets    = new Editor_Assets();
		$this->style_cache      = new Style_Cache();
		$this->style_generator  = new Style_Generator();
		$this->frontend_toolbar = new Frontend_Toolbar();
		$this->global_variable  = new Global_Variable();
		$this->upgrader         = new Upgrader();
		$this->meta_option      = Meta_Option::instance();

		// Deprecated Function.
		new Deprecated();
	}

	/**
	 * Init Rest API
	 */
	public function init_api() {
		$this->api = Api::instance();
	}

	/**
	 * Load import mechanism
	 */
	public function import_mechanism() {
		new Import_Template();
	}

	/**
	 * Register Menu Position.
	 */
	public function register_menu_position() {
		register_nav_menus(
			array(
				'primary' => esc_html__( 'Primary Navigation', '--gctd--' ),
			)
		);
	}

	/**
	 * Rewrite rules only once on activation
	 */
	public function flush_rewrite_rules() {
		if ( ! get_option( 'gutenverse_plugin_permalinks_flushed' ) ) {
			flush_rewrite_rules();
			update_option( 'gutenverse_plugin_permalinks_flushed', 1 );
		}
	}

	/**
	 * Redirect page after plugin is actived
	 */
	public function redirect_to_dashboard() {
		if ( get_transient( 'gutenverse_redirect' ) ) {
			global $pagenow;
			if ( 'plugins.php' === $pagenow || 'plugin-install.php' === $pagenow ) {
				wp_safe_redirect( admin_url( 'admin.php?page=gutenverse' ) );
				delete_transient( 'gutenverse_redirect' );
				exit;
			} else {
				delete_transient( 'gutenverse_redirect' );
			}
		}
	}

	/**
	 * Init settings
	 */
	public function init_settings() {
		$settings_data = get_option( 'gutenverse-settings' );

		if ( isset( $settings_data['general'] ) ) {
			if ( isset( $settings_data['general']['enable_default_template'] ) && true === $settings_data['general']['enable_default_template'] ) {
				add_theme_support( 'block-templates' );
			}
		}
	}
	/**
	 * Add mime type
	 *
	 * @param array $mimes .
	 *
	 * @return array $mimes
	 */
	public function add_fonts_to_allowed_mimes( $mimes ) {
		$mimes['woff']  = 'application/x-font-woff';
		$mimes['woff2'] = 'application/x-font-woff2';
		$mimes['ttf']   = 'application/x-font-ttf';
		$mimes['svg']   = 'image/svg+xml';
		$mimes['eot']   = 'application/vnd.ms-fontobject';
		$mimes['otf']   = 'application/otf';

		return $mimes;
	}
	/**
	 * Update mime type for otf and ttf
	 *
	 * @param array  $defaults .
	 * @param array  $file .
	 * @param string $filename .
	 */
	public function update_mime_types( $defaults, $file, $filename ) {
		if ( 'ttf' === pathinfo( $filename, PATHINFO_EXTENSION ) ) {
			$defaults['type'] = 'application/x-font-ttf';
			$defaults['ext']  = 'ttf';
		}

		if ( 'otf' === pathinfo( $filename, PATHINFO_EXTENSION ) ) {
			$defaults['type'] = 'application/x-font-otf';
			$defaults['ext']  = 'otf';
		}

		if ( 'woff' === pathinfo( $filename, PATHINFO_EXTENSION ) ) {
			$defaults['type'] = 'application/x-font-woff';
			$defaults['ext']  = 'woff';
		}

		if ( 'woff2' === pathinfo( $filename, PATHINFO_EXTENSION ) ) {
			$defaults['type'] = 'application/x-font-woff2';
			$defaults['ext']  = 'woff2';
		}

		return $defaults;
	}

	/**
	 * Show notification to install Gutenverse Plugin script.
	 */
	public function notice_install_plugin_script() {
		// skip if compatible.
		if ( gutenverse_compatible_check() ) {
			return;
		}

		$screen = get_current_screen();
		if ( isset( $screen->parent_file ) && 'plugins.php' === $screen->parent_file && 'update' === $screen->id ) {
			return;
		}

		if ( 'true' === get_user_meta( get_current_user_id(), 'gutenverse_install_notice', true ) ) {
			return;
		}

		wp_enqueue_style(
			'gutenverse-core-install-plugin-notice',
			GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/admin/css/install-plugin-notice.css',
			array(),
			GUTENVERSE_FRAMEWORK_VERSION
		);

		wp_enqueue_script(
			'gutenverse-core-install-plugin-notice',
			GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/admin/js/install-plugin-notice.js',
			array(),
			GUTENVERSE_FRAMEWORK_VERSION,
			true
		);
	}
}
