<?php
/**
 * Frontend cache helpers
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-framework
 */

namespace Gutenverse\Framework;

/**
 * Class Frontend Cache.
 *
 * Keeps compatibility for legacy generated frontend files and stores source
 * payload JSON used by inline styles and virtual CSS responses.
 *
 * @package gutenverse-framework
 */
class Frontend_Cache {
	/**
	 * Payload cache schema version.
	 *
	 * @var int
	 */
	const PAYLOAD_SCHEMA_VERSION = 5;

	/**
	 * Filename prefix for response files left by the legacy virtual CSS implementation.
	 *
	 * @var string
	 */
	const LEGACY_DYNAMIC_CSS_CACHE_PREFIX = 'gutenverse-dynamic-css-';

	/**
	 * Option prefix used only to remove virtual CSS entries left by older versions.
	 *
	 * @var string
	 */
	const LEGACY_DYNAMIC_CSS_OPTION_PREFIX = 'gutenverse_dynamic_css_';

	/**
	 * Option Name.
	 *
	 * @var string
	 */
	public static $option_name = 'gutenverse-style-cache-id';

	/**
	 * Runtime payload cache salt.
	 *
	 * @var string|null
	 */
	protected $payload_cache_salt = null;

	/**
	 * Init constructor.
	 */
	public function __construct() {
		add_filter( 'query_vars', array( $this, 'register_dynamic_css_query_var' ) );
		add_action( 'parse_request', array( $this, 'parse_dynamic_css_request' ) );
		add_action( 'template_redirect', array( $this, 'serve_dynamic_css' ), 0 );
		add_action( 'wp_loaded', array( $this, 'clear_cleanup_cron' ) );
		add_action( 'wp_loaded', array( $this, 'maybe_cleanup_payload_cache' ) );
		add_action( 'gutenverse_cleanup_cached_style', array( $this, 'cleanup_cached_style' ) );
		add_action( 'switch_theme', array( $this, 'clear_payload_cache' ), 10, 0 );
		add_action( 'gutenverse_after_modify_settings', array( $this, 'clear_payload_cache' ), 10, 0 );
		add_action( 'gutenverse_modify_global_variable', array( $this, 'clear_payload_cache' ), 10, 0 );
		add_action( 'before_delete_post', array( $this, 'cleanup_payload_cache_for_post' ) );
	}

	/**
	 * Clear the old automatic cleanup schedule.
	 */
	public function clear_cleanup_cron() {
		$hook = 'gutenverse_cleanup_cached_style';

		if ( wp_next_scheduled( $hook ) ) {
			wp_clear_scheduled_hook( $hook );
		}
	}

	/**
	 * Delete File if not Containing String.
	 *
	 * @param string $folder_path Folder Path.
	 * @param string $cache_id Cache Id.
	 *
	 * @return void
	 */
	public function delete_file( $folder_path, $cache_id = false ) {
		if ( ! is_dir( $folder_path ) ) {
			return;
		}
		$files = list_files( $folder_path );

		foreach ( $files as $file ) {
			if ( is_file( $file ) ) {
				$filename = basename( $file );
				if ( $cache_id ) {
					if ( strpos( $filename, $cache_id ) === false ) {
						wp_delete_file( $file );
					}
				} else {
					wp_delete_file( $file );
				}
			}
		}
	}

	/**
	 * Clean up cache style.
	 */
	public function cleanup_cached_style() {
		$cache_id = $this->get_style_cache_id();

		$css_path = gutenverse_css_path();
		$this->delete_file( $css_path, $cache_id );

		$conditional_path = gutenverse_conditional_path();
		$this->delete_file( $conditional_path, $cache_id );

		$preload_path = gutenverse_preload_assets_path();
		$this->delete_file( $preload_path, $cache_id );
	}

	/**
	 * Clean up all legacy generated frontend files.
	 */
	public function cleanup_legacy_files() {
		$this->delete_file( gutenverse_css_path() );
		$this->delete_file( gutenverse_conditional_path() );
		$this->delete_file( gutenverse_preload_assets_path() );
	}

	/**
	 * Check if payload cache is enabled.
	 *
	 * @return bool
	 */
	public function payload_cache_enabled() {
		return (bool) apply_filters( 'gutenverse_frontend_payload_cache_enabled', true );
	}

	/**
	 * Build a source descriptor for payload cache.
	 *
	 * @param string $type Source type.
	 * @param string $id Source ID.
	 * @param string $content Source content.
	 * @param int    $modified Modified timestamp.
	 * @param array  $context Extra context.
	 *
	 * @return array
	 */
	public function build_payload_source( $type, $id, $content = '', $modified = 0, $context = array() ) {
		$type    = sanitize_key( $type );
		$id      = is_scalar( $id ) ? (string) $id : md5( wp_json_encode( $id ) );
		$content = is_string( $content ) ? $content : wp_json_encode( $content );
		$context = is_array( $context ) ? $context : array();

		$hash_data = array(
			'schema'       => self::PAYLOAD_SCHEMA_VERSION,
			'framework'    => GUTENVERSE_FRAMEWORK_VERSION,
			'theme'        => get_stylesheet(),
			'salt'         => $this->get_payload_cache_salt(),
			'type'         => $type,
			'id'           => $id,
			'modified'     => (int) $modified,
			'content_hash' => md5( $content ),
			'context'      => $context,
		);

		$cache_key = $this->sanitize_payload_cache_key( $type . '-' . $id );
		$cacheable = ! ( 'post' !== $type && ! empty( $context['post_id'] ) );

		return array(
			'type'      => $type,
			'id'        => $id,
			'modified'  => (int) $modified,
			'hash'      => md5( wp_json_encode( $hash_data ) ),
			'cache_key' => $cache_key,
			'context'   => $context,
			'cacheable' => (bool) apply_filters( 'gutenverse_frontend_payload_source_cacheable', $cacheable, $type, $id, $context ),
		);
	}

	/**
	 * Get payload cache salt.
	 *
	 * @return string
	 */
	protected function get_payload_cache_salt() {
		if ( null !== $this->payload_cache_salt ) {
			return $this->payload_cache_salt;
		}

		$current_theme = get_stylesheet();
		$salt_data     = array(
			'settings'        => get_option( 'gutenverse-settings', array() ),
			'global_variable' => get_option( 'gutenverse-global-variable', array() ),
			'global_font'     => get_option( 'gutenverse-global-variable-font-' . $current_theme, array() ),
			'global_color'    => get_option( 'gutenverse-global-variable-color-' . $current_theme, array() ),
			'global_google'   => get_option( 'gutenverse-global-variable-google-' . $current_theme, array() ),
		);

		$this->payload_cache_salt = md5( wp_json_encode( $salt_data ) );

		return $this->payload_cache_salt;
	}

	/**
	 * Sanitize payload cache key.
	 *
	 * @param string $key Cache key.
	 *
	 * @return string
	 */
	protected function sanitize_payload_cache_key( $key ) {
		$key = strtolower( (string) $key );
		$key = preg_replace( '/[^a-z0-9._-]+/', '-', $key );
		$key = trim( $key, '-_.' );

		return '' !== $key ? $key : md5( $key );
	}

	/**
	 * Get payload cache directory.
	 *
	 * @return string
	 */
	public function get_payload_cache_directory() {
		$upload_dir = wp_upload_dir();

		return trailingslashit( $upload_dir['basedir'] ) . 'gutenverse/frontend-cache';
	}

	/**
	 * Build a virtual URL for CSS stored in its source payload JSON.
	 *
	 * @param string $css Generated CSS.
	 * @param array  $source Source descriptor.
	 *
	 * @return string Stylesheet URL, or an empty string when the source payload is unavailable.
	 */
	public function get_or_create_dynamic_css_url( $css, $source ) {
		if ( ! is_string( $css ) || '' === trim( $css ) || ! is_array( $source ) ) {
			return '';
		}

		$cache_key  = isset( $source['cache_key'] ) ? $this->sanitize_payload_cache_key( $source['cache_key'] ) : '';
		$payload    = $this->read_payload( $source );
		$stored_css = is_array( $payload ) && isset( $payload['css'] ) && is_string( $payload['css'] ) ? $payload['css'] : '';

		if ( '' === $cache_key || $css !== $stored_css ) {
			return '';
		}

		$hash     = hash( 'sha256', $css );
		$filename = 'gutenverse-dynamic-' . $cache_key . '.css';

		$permalink_structure = (string) get_option( 'permalink_structure', '' );

		if ( '' !== $permalink_structure && false === strpos( $permalink_structure, 'index.php' ) ) {
			$url = trailingslashit( home_url( '/' ) ) . $filename;
		} else {
			$url = add_query_arg( 'gutenverse_dynamic_css', $filename, home_url( '/' ) );
		}

		return esc_url_raw( add_query_arg( 'ver', $hash, $url ) );
	}

	/**
	 * Read CSS directly from a source payload using the source key in the virtual URL.
	 *
	 * @param string $cache_key Source payload cache key.
	 * @param string $hash CSS SHA-256 hash.
	 *
	 * @return string
	 */
	protected function read_payload_css_by_hash( $cache_key, $hash ) {
		if ( ! is_string( $cache_key ) || '' === $cache_key || ! is_string( $hash ) || ! preg_match( '/\\A[a-f0-9]{64}\\z/', $hash ) ) {
			return '';
		}

		$sanitized_cache_key = $this->sanitize_payload_cache_key( $cache_key );

		if ( $cache_key !== $sanitized_cache_key ) {
			return '';
		}

		$cache_key = $sanitized_cache_key;
		$path      = trailingslashit( $this->get_payload_cache_directory() ) . $cache_key . '.json';

		if ( ! is_readable( $path ) ) {
			return '';
		}

		// phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
		$payload = json_decode( file_get_contents( $path ), true );
		$css     = is_array( $payload ) && isset( $payload['css'] ) && is_string( $payload['css'] ) ? $payload['css'] : '';

		if (
			! is_array( $payload )
			|| self::PAYLOAD_SCHEMA_VERSION !== (int) ( isset( $payload['schema_version'] ) ? $payload['schema_version'] : 0 )
			|| '' === trim( $css )
			|| ! hash_equals( $hash, hash( 'sha256', $css ) )
		) {
			return '';
		}

		if ( is_writable( $path ) ) {
			touch( $path );
		}

		return $css;
	}

	/**
	 * Read a response file left by the previous virtual CSS implementation.
	 *
	 * @param string $hash CSS SHA-256 hash.
	 *
	 * @return string
	 */
	protected function read_legacy_dynamic_css_cache( $hash ) {
		if ( ! is_string( $hash ) || ! preg_match( '/\\A[a-f0-9]{64}\\z/', $hash ) ) {
			return '';
		}

		$path = trailingslashit( $this->get_payload_cache_directory() ) . self::LEGACY_DYNAMIC_CSS_CACHE_PREFIX . $hash . '.json';

		if ( ! is_readable( $path ) ) {
			return '';
		}

		// phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
		$payload = json_decode( file_get_contents( $path ), true );
		$css     = is_array( $payload ) && isset( $payload['css'] ) && is_string( $payload['css'] ) ? $payload['css'] : '';

		return '' !== trim( $css ) && hash_equals( $hash, hash( 'sha256', $css ) ) ? $css : '';
	}

	/**
	 * Register the virtual CSS endpoint query variable.
	 *
	 * @param array $query_vars Public query variables.
	 *
	 * @return array
	 */
	public function register_dynamic_css_query_var( $query_vars ) {
		if ( ! in_array( 'gutenverse_dynamic_css', $query_vars, true ) ) {
			$query_vars[] = 'gutenverse_dynamic_css';
		}

		return $query_vars;
	}

	/**
	 * Resolve a CSS-named path when WordPress pretty permalinks are enabled.
	 *
	 * @param WP $wp WordPress request object.
	 */
	public function parse_dynamic_css_request( $wp ) {
		if ( ! is_object( $wp ) || ! isset( $wp->request ) ) {
			return;
		}

		if ( preg_match( '/\\Agutenverse-dynamic-[a-z0-9._-]+(?:-[a-f0-9]{64})?\\.css\\z/', trim( $wp->request, '/' ), $matches ) ) {
			if ( ! isset( $wp->query_vars ) || ! is_array( $wp->query_vars ) ) {
				$wp->query_vars = array();
			}

			$wp->query_vars['gutenverse_dynamic_css'] = $matches[0];
		}
	}

	/**
	 * Serve CSS from a source payload or a legacy response file.
	 */
	public function serve_dynamic_css() {
		$filename = get_query_var( 'gutenverse_dynamic_css', '' );

		if ( '' === $filename ) {
			return;
		}

		if ( ! is_string( $filename ) ) {
			status_header( 404 );
			header( 'Content-Type: text/plain; charset=UTF-8' );
			nocache_headers();
			exit;
		}

		$version = isset( $_GET['ver'] ) && is_string( $_GET['ver'] ) ? sanitize_text_field( wp_unslash( $_GET['ver'] ) ) : '';

		if ( preg_match( '/\\Agutenverse-dynamic-([a-z0-9._-]+)\\.css\\z/', $filename, $matches ) && preg_match( '/\\A[a-f0-9]{64}\\z/', $version ) ) {
			$cache_key = $matches[1];
			$hash      = $version;
			$css       = $this->read_payload_css_by_hash( $cache_key, $hash );
		} elseif ( preg_match( '/\\Agutenverse-dynamic-([a-z0-9._-]+)-([a-f0-9]{64})\\.css\\z/', $filename, $matches ) ) {
			// Serve path-style links emitted by the previous version while cached HTML expires.
			$cache_key = $matches[1];
			$hash      = $matches[2];
			$css       = $this->read_payload_css_by_hash( $cache_key, $hash );
		} elseif ( preg_match( '/\\A[a-f0-9]{64}\\z/', $filename ) ) {
			// Serve links emitted by the previous version while cached HTML expires.
			$hash = $filename;
			$css  = $this->read_legacy_dynamic_css_cache( $hash );
		} else {
			$hash = '';
			$css  = '';
		}

		if ( '' === $hash || ! is_string( $css ) || '' === trim( $css ) || ! hash_equals( $hash, hash( 'sha256', $css ) ) ) {
			status_header( 404 );
			header( 'Content-Type: text/plain; charset=UTF-8' );
			nocache_headers();
			exit;
		}

		$etag = '"' . $hash . '"';
		status_header( 200 );
		header( 'Content-Type: text/css; charset=UTF-8' );
		header( 'Cache-Control: public, max-age=' . YEAR_IN_SECONDS . ', immutable' );
		header( 'ETag: ' . $etag );
		header( 'X-Content-Type-Options: nosniff' );

		if ( isset( $_SERVER['HTTP_IF_NONE_MATCH'] ) ) {
			$client_etags = array_map( 'trim', explode( ',', wp_unslash( $_SERVER['HTTP_IF_NONE_MATCH'] ) ) );

			if ( in_array( $etag, $client_etags, true ) || in_array( 'W/' . $etag, $client_etags, true ) || in_array( '*', $client_etags, true ) ) {
				status_header( 304 );
				exit;
			}
		}

		echo $css; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		exit;
	}

	/**
	 * Delete response files and options left by earlier virtual CSS versions.
	 *
	 * @return int Number of removed legacy cache entries.
	 */
	public function clear_dynamic_css_cache() {
		global $wpdb;

		$removed   = 0;
		$directory = $this->get_payload_cache_directory();

		if ( is_dir( $directory ) ) {
			foreach ( list_files( $directory ) as $file ) {
				if ( is_file( $file ) && preg_match( '/\\Agutenverse-dynamic-css-[a-f0-9]{64}\\.json\\z/', basename( $file ) ) ) {
					wp_delete_file( $file );

					if ( ! file_exists( $file ) ) {
						$removed++;
					}
				}
			}
		}

		$option_names = $wpdb->get_col(
			$wpdb->prepare(
				"SELECT option_name FROM {$wpdb->options} WHERE option_name LIKE %s",
				$wpdb->esc_like( self::LEGACY_DYNAMIC_CSS_OPTION_PREFIX ) . '%'
			)
		);

		if ( is_array( $option_names ) ) {
			foreach ( $option_names as $option_name ) {
				if ( delete_option( $option_name ) ) {
					$removed++;
				}
			}
		}

		return $removed;
	}

	/**
	 * Ensure payload cache directory exists.
	 *
	 * @return bool
	 */
	protected function ensure_payload_cache_directory() {
		$directory = $this->get_payload_cache_directory();

		if ( ! is_dir( $directory ) && ! wp_mkdir_p( $directory ) ) {
			return false;
		}

		$index_path    = trailingslashit( $directory ) . 'index.php';
		$index_content = "<?php\n// Prevent directory listing for Gutenverse private frontend cache files.\n";
		$old_content   = "<?php\n// Silence is golden.\n";
		$write_index   = ! file_exists( $index_path );

		if ( ! $write_index && is_readable( $index_path ) ) {
			// phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
			$write_index = $old_content === file_get_contents( $index_path );
		}

		if ( $write_index ) {
			// phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_file_put_contents
			file_put_contents( $index_path, $index_content );
		}

		$htaccess_path = trailingslashit( $directory ) . '.htaccess';
		if ( ! file_exists( $htaccess_path ) ) {
			// phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_file_put_contents
			file_put_contents( $htaccess_path, "Deny from all\n" );
		}

		return true;
	}

	/**
	 * Get payload cache path.
	 *
	 * @param array $source Source descriptor.
	 *
	 * @return string
	 */
	public function get_payload_cache_path( $source ) {
		$cache_key = isset( $source['cache_key'] ) ? $source['cache_key'] : '';
		$cache_key = $this->sanitize_payload_cache_key( $cache_key );

		return trailingslashit( $this->get_payload_cache_directory() ) . $cache_key . '.json';
	}

	/**
	 * Read payload from cache.
	 *
	 * @param array $source Source descriptor.
	 *
	 * @return array|null
	 */
	public function read_payload( $source ) {
		if ( ! $this->payload_cache_enabled() ) {
			return null;
		}

		if ( isset( $source['cacheable'] ) && ! $source['cacheable'] ) {
			return null;
		}

		$path = $this->get_payload_cache_path( $source );

		if ( ! is_readable( $path ) ) {
			return null;
		}

		// phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
		$payload = json_decode( file_get_contents( $path ), true );

		if ( ! is_array( $payload ) || ! $this->is_payload_fresh( $payload, $source ) ) {
			wp_delete_file( $path );
			return null;
		}

		if ( is_writable( $path ) ) {
			// Track last use for long-unused post cache cleanup.
			touch( $path );
		}

		return $payload;
	}

	/**
	 * Check if payload matches source.
	 *
	 * @param array  $payload Payload.
	 * @param array  $source Source descriptor.
	 *
	 * @return bool
	 */
	public function is_payload_fresh( $payload, $source ) {
		return isset( $payload['schema_version'], $payload['source_type'], $payload['source_id'], $payload['source_hash'], $payload['css'] )
			&& self::PAYLOAD_SCHEMA_VERSION === (int) $payload['schema_version']
			&& is_string( $payload['css'] )
			&& isset( $source['type'], $source['id'], $source['hash'] )
			&& $payload['source_type'] === $source['type']
			&& $payload['source_id'] === $source['id']
			&& $payload['source_hash'] === $source['hash'];
	}

	/**
	 * Write payload to cache.
	 *
	 * @param array $source Source descriptor.
	 * @param array $payload Payload.
	 *
	 * @return bool
	 */
	public function write_payload( $source, $payload, $lock = null ) {
		if ( ! $this->payload_cache_enabled() || ! $this->ensure_payload_cache_directory() ) {
			return false;
		}

		if ( isset( $source['cacheable'] ) && ! $source['cacheable'] ) {
			return false;
		}

		$owns_lock = false;

		if ( ! $lock ) {
			$lock      = $this->acquire_payload_lock( $source );
			$owns_lock = true;
		}

		if ( ! $lock ) {
			return false;
		}

		$path    = $this->get_payload_cache_path( $source );
		$payload = $this->normalize_payload( $payload, $source );
		$json    = wp_json_encode( $payload );
		$written = false;

		if ( false !== $json ) {
			$written = $this->write_atomic_file( $path, $json );
		}

		if ( $owns_lock ) {
			$this->release_payload_lock( $lock );
		}

		return $written;
	}

	/**
	 * Normalize payload before write.
	 *
	 * @param array $payload Payload.
	 * @param array $source Source descriptor.
	 *
	 * @return array
	 */
	protected function normalize_payload( $payload, $source ) {
		return array(
			'schema_version'  => self::PAYLOAD_SCHEMA_VERSION,
			'source_type'     => isset( $source['type'] ) ? $source['type'] : '',
			'source_id'       => isset( $source['id'] ) ? $source['id'] : '',
			'source_hash'     => isset( $source['hash'] ) ? $source['hash'] : '',
			'source_modified' => isset( $source['modified'] ) ? (int) $source['modified'] : 0,
			'source_context'  => isset( $source['context'] ) ? $source['context'] : array(),
			'css'             => isset( $payload['css'] ) && is_string( $payload['css'] ) ? $payload['css'] : '',
			'css_minified'    => ! empty( $payload['css_minified'] ),
			'fonts'           => isset( $payload['fonts'] ) && is_array( $payload['fonts'] ) ? array_values( $payload['fonts'] ) : array(),
			'font_variables'  => isset( $payload['font_variables'] ) && is_array( $payload['font_variables'] ) ? array_values( $payload['font_variables'] ) : array(),
			'scripts'         => isset( $payload['scripts'] ) && is_array( $payload['scripts'] ) ? array_values( $payload['scripts'] ) : array(),
			'styles'          => isset( $payload['styles'] ) && is_array( $payload['styles'] ) ? array_values( $payload['styles'] ) : array(),
			'preload_images'  => isset( $payload['preload_images'] ) && is_array( $payload['preload_images'] ) ? array_values( $payload['preload_images'] ) : array(),
			'template_parts'  => isset( $payload['template_parts'] ) && is_array( $payload['template_parts'] ) ? array_values( $payload['template_parts'] ) : array(),
			'dependencies'    => isset( $payload['dependencies'] ) && is_array( $payload['dependencies'] ) ? array_values( $payload['dependencies'] ) : array(),
			'generated_at'    => time(),
		);
	}

	/**
	 * Write a file through a temporary file and rename.
	 *
	 * @param string $path File path.
	 * @param string $content File content.
	 *
	 * @return bool
	 */
	protected function write_atomic_file( $path, $content ) {
		$temp_path = $path . '.' . wp_generate_uuid4() . '.tmp';

		// phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_file_put_contents
		if ( false === file_put_contents( $temp_path, $content, LOCK_EX ) ) {
			return false;
		}

		if ( rename( $temp_path, $path ) ) {
			return true;
		}

		wp_delete_file( $temp_path );

		return false;
	}

	/**
	 * Check if payload is worth storing.
	 *
	 * @param array $source Source descriptor.
	 * @param array $payload Payload.
	 *
	 * @return bool
	 */
	public function should_write_payload( $source, $payload ) {
		$type     = isset( $source['type'] ) ? $source['type'] : '';
		$css_size = isset( $payload['css'] ) ? strlen( (string) $payload['css'] ) : 0;

		if ( 'template' === $type && ! empty( $payload['dependencies'] ) ) {
			return false;
		}

		foreach ( gutenverse_secure_iterable( isset( $payload['dependencies'] ) ? $payload['dependencies'] : array() ) as $dependency ) {
			if ( isset( $dependency['cacheable'] ) && ! $dependency['cacheable'] ) {
				return false;
			}

			if ( ! empty( $dependency['has_dependencies'] ) && empty( $dependency['stored'] ) ) {
				return false;
			}
		}

		$has_effects = ! empty( $payload['fonts'] )
			|| ! empty( $payload['font_variables'] )
			|| ! empty( $payload['scripts'] )
			|| ! empty( $payload['styles'] )
			|| ! empty( $payload['preload_images'] )
			|| ! empty( $payload['template_parts'] )
			|| ! empty( $payload['dependencies'] );

		if ( ! $has_effects && 0 === $css_size ) {
			return false;
		}

		if ( 'post' === $type ) {
			$min_size = (int) apply_filters( 'gutenverse_frontend_payload_cache_min_post_css_size', 1024, $source, $payload );

			if ( ! $has_effects && $css_size < $min_size ) {
				return false;
			}
		}

		return (bool) apply_filters( 'gutenverse_frontend_should_write_payload_cache', true, $source, $payload );
	}

	/**
	 * Acquire payload cache lock.
	 *
	 * @param array $source Source descriptor.
	 *
	 * @return array|false
	 */
	protected function acquire_payload_lock( $source ) {
		$lock_path = $this->get_payload_cache_path( $source ) . '.lock';
		// phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_fopen
		$handle = fopen( $lock_path, 'c' );

		if ( ! $handle ) {
			return false;
		}

		if ( ! flock( $handle, LOCK_EX | LOCK_NB ) ) {
			fclose( $handle ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_fclose
			return false;
		}

		return array(
			'handle' => $handle,
			'path'   => $lock_path,
		);
	}

	/**
	 * Acquire a generation lock for a source.
	 *
	 * @param array $source Source descriptor.
	 *
	 * @return array|false
	 */
	public function acquire_payload_generation_lock( $source ) {
		if ( ! $this->ensure_payload_cache_directory() ) {
			return false;
		}

		return $this->acquire_payload_lock( $source );
	}

	/**
	 * Release a generation lock.
	 *
	 * @param array $lock Lock data.
	 */
	public function release_payload_generation_lock( $lock ) {
		$this->release_payload_lock( $lock );
	}

	/**
	 * Wait briefly for another request to write a payload.
	 *
	 * @param array $source Source descriptor.
	 *
	 * @return array|null
	 */
	public function wait_for_payload( $source ) {
		$timeout = (int) apply_filters( 'gutenverse_frontend_payload_cache_wait_microseconds', 500000, $source );
		$step    = 50000;
		$waited  = 0;

		while ( $timeout > $waited ) {
			usleep( $step );
			$waited += $step;

			$payload = $this->read_payload( $source );

			if ( $payload ) {
				return $payload;
			}
		}

		return null;
	}

	/**
	 * Release payload cache lock.
	 *
	 * @param array $lock Lock data.
	 *
	 * @return void
	 */
	protected function release_payload_lock( $lock ) {
		if ( empty( $lock['handle'] ) ) {
			return;
		}

		if ( ! empty( $lock['path'] ) && is_file( $lock['path'] ) ) {
			wp_delete_file( $lock['path'] );
		}

		flock( $lock['handle'], LOCK_UN );
		fclose( $lock['handle'] ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_fclose
	}

	/**
	 * Clear payload cache.
	 */
	public function clear_payload_cache() {
		$this->delete_payload_cache_files();
	}

	/**
	 * Clean payload cache for a deleted post.
	 *
	 * @param int $post_id Post ID.
	 */
	public function cleanup_payload_cache_for_post( $post_id ) {
		$post = get_post( $post_id );

		if ( $post && in_array( $post->post_type, array( 'wp_template', 'wp_template_part' ), true ) ) {
			$this->clear_payload_cache();
			return;
		}

		$this->delete_payload_cache_files( 'post-' . $post_id );
		$this->delete_payload_cache_files( 'reusable-' . $post_id );
	}

	/**
	 * Delete payload cache files.
	 *
	 * @param string|false $prefix Optional cache key prefix.
	 */
	protected function delete_payload_cache_files( $prefix = false ) {
		$directory = $this->get_payload_cache_directory();

		if ( ! is_dir( $directory ) ) {
			return;
		}

		$prefix = $prefix ? $this->sanitize_payload_cache_key( $prefix ) : false;

		foreach ( list_files( $directory ) as $file ) {
			if ( ! is_file( $file ) || ! preg_match( '/\.(json|tmp|lock|css)$/', $file ) ) {
				continue;
			}

			if ( preg_match( '/\Agutenverse-dynamic-css-[a-f0-9]{64}\.json\z/', basename( $file ) ) ) {
				continue;
			}

			if ( $prefix && 0 !== strpos( basename( $file ), $prefix ) ) {
				continue;
			}

			wp_delete_file( $file );
		}
	}

	/**
	 * Get payload cache stats.
	 *
	 * @return array
	 */
	public function get_payload_cache_stats() {
		$directory = $this->get_payload_cache_directory();
		$stats     = array(
			'path'       => $directory,
			'exists'     => is_dir( $directory ),
			'files'      => 0,
			'size'       => 0,
			'size_label' => size_format( 0 ),
		);

		if ( ! $stats['exists'] ) {
			return $stats;
		}

		foreach ( list_files( $directory ) as $file ) {
			if ( ! is_file( $file ) || ! preg_match( '/\.json$/', $file ) || preg_match( '/\Agutenverse-dynamic-css-[a-f0-9]{64}\.json\z/', basename( $file ) ) ) {
				continue;
			}

			$stats['files']++;
			$stats['size'] += filesize( $file );
		}

		$stats['size_label'] = size_format( $stats['size'] );

		return $stats;
	}

	/**
	 * Maybe clean payload cache runtime files and old post caches.
	 */
	public function maybe_cleanup_payload_cache() {
		if ( get_transient( 'gutenverse_payload_cache_cleanup_lock' ) ) {
			return;
		}

		set_transient( 'gutenverse_payload_cache_cleanup_lock', true, DAY_IN_SECONDS );

		$directory = $this->get_payload_cache_directory();

		if ( ! is_dir( $directory ) ) {
			return;
		}

		$files       = list_files( $directory );
		$max_age     = (int) apply_filters( 'gutenverse_frontend_payload_cache_max_post_age', 30 * DAY_IN_SECONDS );
		$css_max_age = (int) apply_filters( 'gutenverse_dynamic_css_cache_max_age', YEAR_IN_SECONDS );

		foreach ( $files as $file ) {
			if ( ! is_file( $file ) ) {
				continue;
			}

			$is_runtime = preg_match( '/\.(tmp|lock)$/', $file );
			$is_old     = filemtime( $file ) < time() - HOUR_IN_SECONDS;

			if ( $is_runtime && $is_old ) {
				wp_delete_file( $file );
				continue;
			}

			if ( preg_match( '/\.css$/', $file ) ) {
				wp_delete_file( $file );
				continue;
			}

			if ( $css_max_age > 0 && preg_match( '/\Agutenverse-dynamic-css-[a-f0-9]{64}\.json\z/', basename( $file ) ) && filemtime( $file ) < time() - $css_max_age ) {
				wp_delete_file( $file );
				continue;
			}

			if ( $max_age > 0 && preg_match( '/\/post-[^\/]+\.json$/', $file ) && filemtime( $file ) < time() - $max_age ) {
				wp_delete_file( $file );
			}
		}
	}

	/**
	 * Get Cache ID.
	 *
	 * @return string
	 */
	public function get_style_cache_id() {
		return get_option( self::$option_name, 'initial-cache' );
	}
}
