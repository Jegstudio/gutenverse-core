<?php
/**
 * Nonce Generator class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-framework
 */

namespace Gutenverse\Framework;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Class NonceGenerator
 *
 * @package gutenverse
 */
class NonceGenerator {
	/**
	 * Instance of NonceGenerator.
	 *
	 * @var NonceGenerator
	 */
	private static $instance;

	/**
	 * Generated nonces.
	 *
	 * @var array
	 */
	private $nonces = array();

	/**
	 * Whether nonces have been generated.
	 *
	 * @var bool
	 */
	private $generated = false;

	/**
	 * Registered nonce actions.
	 *
	 * @var array
	 */
	private $actions = array();

	/**
	 * Whether actions have been collected.
	 *
	 * @var bool
	 */
	private $actions_collected = false;

	/**
	 * Init constructor.
	 */
	private function __construct() {
		add_action( 'wp_ajax_gutenverse_generate_nonce', array( $this, 'ajax_generate_nonce' ) );
		add_action( 'wp_ajax_nopriv_gutenverse_generate_nonce', array( $this, 'ajax_generate_nonce' ) );
	}

	/**
	 * Instance of NonceGenerator.
	 *
	 * @return NonceGenerator
	 */
	public static function instance() {
		if ( ! isset( self::$instance ) && ! ( self::$instance instanceof NonceGenerator ) ) {
			self::$instance = new NonceGenerator();
		}

		return self::$instance;
	}

	/**
	 * Disable object cloning.
	 */
	public function __clone() {
	}

	/**
	 * Disable unserializing of the class.
	 */
	public function __wakeup() {
	}

	/**
	 * Get registered nonce actions.
	 *
	 * @return array
	 */
	public function get_actions() {
		if ( $this->actions_collected ) {
			return $this->actions;
		}

		$actions = apply_filters(
			'gutenverse_nonce_actions',
			array(
				'wp_rest',
			)
		);

		if ( ! is_array( $actions ) ) {
			$actions = array();
		}

		$this->actions           = array_values( array_unique( array_filter( array_map( 'strval', $actions ) ) ) );
		$this->actions_collected = true;

		return $this->actions;
	}

	/**
	 * Generate registered nonces.
	 *
	 * @return array
	 */
	public function generate() {
		if ( $this->generated ) {
			return $this->nonces;
		}

		$actions = $this->get_actions();

		foreach ( $actions as $action ) {
			$this->nonces[ $action ] = wp_create_nonce( $action );
		}

		$this->generated = true;

		return $this->nonces;
	}


	/**
	 * Generate nonce from AJAX request.
	 */
	public function ajax_generate_nonce() {
		wp_send_json_success(
			array(
				'nonceActions' => $this->generate(),
			)
		);
	}
}
