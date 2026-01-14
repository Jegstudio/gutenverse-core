<?php
/**
 * Meta Option.
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-framework
 */

namespace Gutenverse\Framework;

/**
 * Options
 *
 * @package gutenverse-framework
 */
class Options {

	/**
	 * Instance
	 *
	 * @var Options
	 */
	private static $instance;

	/**
	 * All  gutenverse options.
	 *
	 * @var array
	 */
	public $options;

	/**
	 * Module Options
	 *
	 * @var array|false
	 */
	public $module_options = false;

	/**
	 * Default image load mechanism.
	 *
	 * @var string
	 */
	public $default_image_load = '';

	/**
	 * Gutenverse News Options Class.
	 *
	 * @return Options
	 */
	public static function get_instance() {
		if ( null === static::$instance ) {
			static::$instance = new static();
		}
		return static::$instance;
	}


	/**
	 * Options class cunstructor.
	 */
	public function __construct() {
		$this->options = get_option( 'gutenverse-settings', array() );
		$this->set_default_image_load();
	}

	/**
	 * Set default value image load.
	 */
	private function set_default_image_load() {
		if ( isset( $this->options['performance']['default_image_load'] ) ) {
			$default_image_load = $this->options['performance']['default_image_load'];
			if ( ! empty( $default_image_load ) ) {
				$this->default_image_load = $default_image_load;
			}
		}
		return 'normal';
	}

	/**
	 * Get image load mechanism
	 *
	 * @param string|false $old_option old option name.
	 * @param bool         $old_option_value old option value.
	 * @param string       $attr image load attribute from block option.
	 *
	 * @return string Image load mechanism.
	 */
	public function get_image_load( $old_option = 'lazy', $old_option_value = false, $attr = '' ) {
		if ( isset( $attr ) && ! empty( $attr ) ) {
			return $attr;
		}
		if ( ! $old_option ) {
			return $this->default_image_load;
		}
		if ( 'lazy' === $old_option && $old_option_value ) {
			return 'lazy';
		}

		if ( 'normal' === $old_option && ! $old_option_value ) {
			return 'normal';
		}
		return $this->default_image_load;
	}
}
