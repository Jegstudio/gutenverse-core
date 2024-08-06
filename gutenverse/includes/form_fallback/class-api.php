<?php
/**
 * REST APIs class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse
 */

namespace Gutenverse\Form_Fallback;

use Gutenverse\Form_Fallback\Form;

/**
 * Class Api
 *
 * @package gutenverse
 */
class Api {
	/**
	 * Instance of Gutenverse.
	 *
	 * @var Api
	 */
	private static $instance;

	/**
	 * Endpoint Path
	 *
	 * @var string
	 */
	const ENDPOINT = 'gutenverse-form-client/v1';

	/**
	 * Singleton page for Gutenverse Class
	 *
	 * @return Api
	 */
	public static function instance() {
		if ( null === static::$instance ) {
			static::$instance = new static();
		}

		return static::$instance;
	}

	/**
	 * Blocks constructor.
	 */
	private function __construct() {
		if ( did_action( 'rest_api_init' ) ) {
			$this->register_routes();
		}
	}

	/**
	 * Register Gutenverse APIs
	 */
	private function register_routes() {

		/** ----------------------------------------------------------------
		 * Frontend/Global Routes
		 */
		register_rest_route(
			self::ENDPOINT,
			'form/init',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'form_init' ),
				'permission_callback' => '__return_true',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'form/submit',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'submit_form' ),
				'permission_callback' => '__return_true',
			)
		);
	}

	/**
	 * Get User IP Address
	 *
	 * @param array $data .
	 *
	 * @return array|false
	 */
	public function get_browser_data( $data ) {
		if ( empty( $data['user_browser'] ) ) {
			return false;
		}

		$ip = 'unknown';

		if ( ! empty( $_SERVER['HTTP_CLIENT_IP'] ) ) {
			$ip = sanitize_text_field( wp_unslash( $_SERVER['HTTP_CLIENT_IP'] ) );
		} elseif ( ! empty( $_SERVER['HTTP_X_FORWARDED_FOR'] ) ) {
			$ip = sanitize_text_field( wp_unslash( $_SERVER['HTTP_X_FORWARDED_FOR'] ) );
		} elseif ( ! empty( $_SERVER['REMOTE_ADDR'] ) ) {
			$ip = sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) );
		}

		$user_agent = isset( $_SERVER['HTTP_USER_AGENT'] ) ? sanitize_text_field( wp_unslash( $_SERVER['HTTP_USER_AGENT'] ) ) : 'unknown';

		return array(
			'ip'         => $ip,
			'user_agent' => $user_agent,
		);
	}

	/**
	 * Filter Form Params
	 *
	 * @param array $entry_data .
	 *
	 * @return array|null
	 */
	private function filter_form_params( $entry_data ) {
		$filtered_data = array();
		$entry_data    = rest_sanitize_array( $entry_data );

		if ( isset( $entry_data ) ) {
			foreach ( $entry_data as $data ) {
				if ( ! isset( $data['type'] ) ) {
					return null;
				}

				switch ( $data['type'] ) {
					case 'text':
					case 'select':
					case 'telp':
					case 'radio':
					case 'date':
					case 'image-radio':
						$filtered_data[] = array(
							'id'    => sanitize_key( $data['id'] ),
							'value' => sanitize_text_field( $data['value'] ),
						);
						break;
					case 'email':
						$filtered_data[] = array(
							'id'    => sanitize_key( $data['id'] ),
							'value' => sanitize_email( $data['value'] ),
						);
						break;
					case 'textarea':
						$filtered_data[] = array(
							'id'    => sanitize_key( $data['id'] ),
							'value' => sanitize_textarea_field( $data['value'] ),
						);
						break;
					case 'number':
						$filtered_data[] = array(
							'id'    => sanitize_key( $data['id'] ),
							'value' => floatval( $data['value'] ),
						);
						break;
					case 'switch':
						$filtered_data[] = array(
							'id'    => sanitize_key( $data['id'] ),
							'value' => rest_sanitize_boolean( $data['value'] ),
						);
						break;
					case 'multiselect':
					case 'multi-group-select':
					case 'checkbox':
						$filtered_data[] = array(
							'id'    => sanitize_key( $data['id'] ),
							'value' => rest_sanitize_array( $data['value'] ),
						);
						break;
					default:
						break;
				}
			}
		}

		return $filtered_data;
	}

	/**
	 * Submit Form
	 *
	 * @param object $request .
	 *
	 * @return WP_Response
	 */
	public function submit_form( $request ) {
		$form_entry   = $request['form-entry'];
		$form_data    = $this->filter_form_params( $form_entry['data'] );
		$form_id      = $form_entry['formId'];
		$is_login     = is_user_logged_in();
		$form_setting = get_post_meta( (int) $form_id, 'form-data', true );
		if ( $form_setting['require_login'] ) {
			if ( ! $is_login ) {
				$response = rest_ensure_response(
					array(
						'error'   => 'Bad Request',
						'message' => 'Your Must Login To Submit This Form',
					)
				);
				$response->set_status( 400 );
				return $response;
			}
		}
		if ( isset( $form_data ) ) {
			$form_id    = (int) $form_entry['formId'];
			$post_id    = (int) $form_entry['postId'];
			$form_entry = array(
				'form-id'      => $form_id,
				'post-id'      => $post_id,
				'entry-data'   => $form_data,
				'browser-data' => $this->get_browser_data( $form_entry ),
			);

			$params = wp_parse_args(
				$form_entry,
				array(
					'form-id'      => 0,
					'post-id'      => 0,
					'entry-data'   => array(),
					'browser-data' => array(),
				)
			);

			$result = array( 'entry_id' => Entries::submit_form_data( $params ) );

			if ( (int) $result['entry_id'] > 0 ) {
				$settings_data = get_option( 'gutenverse-settings', array() );
				$form_data     = get_post_meta( $form_id, 'form-data', true );
				$entry_id      = $result['entry_id'];

				if ( isset( $settings_data['form'] ) ) {
					if ( isset( $settings['form']['confirmation'] ) && true !== $form_data['overwrite_default_confirmation'] ) {
						$form_data = array_merge( $form_data, $settings['form']['confirmation'] );
					}

					if ( isset( $settings['form']['notification'] ) && true !== $form_data['overwrite_default_notification'] ) {
						$form_data = array_merge( $form_data, $settings['form']['notification'] );
					}
				}

				$mail_list = $this->mail_list( $form_entry['entry-data'], $form_data );

				if ( ! empty( $mail_list ) ) {
					$result = ( new Mail() )->send_user_email( $form_id, $form_data, $entry_id, $form_entry, $mail_list );
				}

				if ( ! empty( $form_data['admin_confirm'] ) ) {
					$result = ( new Mail() )->send_admin_email( $form_id, $form_data, $entry_id, $form_entry );
				}
			}
		}

		return rest_ensure_response( $result );
	}

	/**
	 * Check mail list
	 *
	 * @param array $entry_data .
	 * @param array $form_data .
	 *
	 * @return array.
	 */
	private function mail_list( $entry_data, $form_data ) {
		if ( empty( $form_data['user_confirm'] ) ) {
			return false;
		}

		$mail_rgx   = '/^(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){255,})(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){65,}@)(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22))(?:\.(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22)))*@(?:(?:(?!.*[^.]{64,})(?:(?:(?:xn--)?[a-z0-9]+(?:-[a-z0-9]+)*\.){1,126}){1,}(?:(?:[a-z][a-z0-9]*)|(?:(?:xn--)[a-z0-9]+))(?:-[a-z0-9]+)*)|(?:\[(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){7})|(?:(?!(?:.*[a-f0-9][:\]]){7,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?)))|(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){5}:)|(?:(?!(?:.*[a-f0-9]:){5,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3}:)?)))?(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))(?:\.(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))){3}))\]))$/iD';
		$input_name = false;
		$mail_list  = array();

		if ( ! $form_data['auto_select_email'] && isset( $form_data['email_input_name'] ) ) {
			$input_name = $form_data['email_input_name'];
		}

		foreach ( $entry_data as $data ) {
			if ( 'array' === gettype( $data['value'] ) ) {
				$data['value'] = implode( ', ', $data['value'] );
			}
			if ( $input_name ) {
				if ( $input_name === $data['id'] && preg_match( $mail_rgx, $data['value'] ) ) {
					$mail_list[] = $data['value'];
				}
			} elseif ( preg_match( $mail_rgx, $data['value'] ) ) {
				$mail_list[] = $data['value'];
			}
		}

		return $mail_list;
	}


	/**
	 * Search Meta
	 *
	 * @param object $request .
	 *
	 * @return WP_Rest.
	 */
	public function form_init( $request ) {
		$form_id   = $request->get_param( 'form_id' );
		$post_type = get_post_type( (int) $form_id );
		$result    = array(
			'require_login' => false,
			'logged_in'     => is_user_logged_in(),
		);

		if ( 'gutenverse-form' === $post_type ) {
			$data                          = get_post_meta( (int) $form_id, 'form-data', true );
			$result['require_login']       = $data['require_login'];
			$result['form_success_notice'] = $data['form_success_notice'];
			$result['form_error_notice']   = $data['form_error_notice'];
		}

		return $result;
	}
}
