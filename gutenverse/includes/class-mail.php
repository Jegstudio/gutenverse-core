<?php
/**
 * Mail class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse
 */

namespace Gutenverse;

use WP_Error;
use WP_REST_Response;

/**
 * Class Mail
 *
 * @package gutenverse
 */
class Mail {
	/**
	 * Class Construct.
	 */
	public function __construct() {
		// nothing.
	}

	/**
	 * Send User an Email.
	 *
	 * @param int   $form_id .
	 * @param array $form_data .
	 * @param int   $entry_id .
	 * @param array $form_entry .
	 * @param array $user_mail .
	 *
	 * @return WP_Response
	 */
	public function send_user_email( $form_id, $form_data, $entry_id, $form_entry, $user_mail ) {
		$subject  = isset( $form_data['user_email_subject'] ) ? $form_data['user_email_subject'] : get_bloginfo( 'name' );
		$from     = isset( $form_data['user_email_from'] ) ? $form_data['user_email_from'] : null;
		$reply_to = isset( $form_data['user_email_reply_to'] ) ? $form_data['user_email_reply_to'] : null;
		$body     = nl2br( isset( $form_data['user_email_body'] ) ? $form_data['user_email_body'] : null );

		$body      = "<html><body><h2 style='text-align: center;'>" . get_the_title( $entry_id ) . "</h2><h4 style='text-align: center;'>" . $body . '</h4>';
		$form_html = $this->format_data_for_mail( $entry_id, $form_entry, $entry_id, false );
		$body     .= $form_html . '</body></html>';
		$body      = apply_filters( 'gutenverse_form_user_email_body', $body, $form_id, $form_data, $entry_id, $form_entry );

		$headers  = 'MIME-Version: 1.0' . "\r\n";
		$headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";

		$headers .= 'From: ' . $from . "\r\n" .
			'Reply-To: ' . $reply_to . "\r\n" .
			'X-Mailer: PHP/' . phpversion();

		if ( empty( $user_mail ) ) {
			return new WP_Error(
				'email_error',
				esc_html__( 'Error. User email not found.', 'gutenverse' ),
				array( 'status' => 500 )
			);
		}

		$status = array(
			'entry_id' => $entry_id,
			'status'   => wp_mail( $user_mail, $subject, $body, $headers ),
		);

		return new WP_REST_Response( $status, 200 );
	}

	/**
	 * Send Admin an Email.
	 *
	 * @param int   $form_id .
	 * @param array $form_data .
	 * @param int   $entry_id .
	 * @param array $form_entry .
	 *
	 * @return WP_Response
	 */
	public function send_admin_email( $form_id, $form_data, $entry_id, $form_entry ) {
		$subject  = isset( $form_data['admin_email_subject'] ) ? $form_data['admin_email_subject'] : null;
		$from     = isset( $form_data['admin_email_from'] ) ? $form_data['admin_email_from'] : null;
		$reply_to = isset( $form_data['admin_email_reply_to'] ) ? $form_data['admin_email_reply_to'] : null;
		$body     = nl2br( isset( $form_data['admin_note'] ) ? $form_data['admin_note'] : null );

		$body      = "<html><body><h2 style='text-align: center;'>" . get_the_title( $form_id ) . ' ' . esc_html__( 'Submission', 'gutenverse' ) . "</h2><h4 style='text-align: center;'>" . $body . '</h4>';
		$form_html = $this->format_data_for_mail( $entry_id, $form_entry, $entry_id );
		$body     .= $form_html;
		if ( $entry_id ) {
			$edit_link = get_edit_post_link( $entry_id );
			$body     .= '<br/><span>' . __( 'Entry Details', 'gutenverse' ) . ' : <a href="' . $edit_link . '">' . $edit_link . '</a></span>';
		}
		$body .= '</body></html>';
		$body  = apply_filters( 'gutenverse_form_admin_email_body', $body, $form_id, $form_data, $entry_id, $form_entry );

		$headers  = 'MIME-Version: 1.0' . "\r\n";
		$headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";

		$headers .= 'From: ' . $from . "\r\n" .
			'Reply-To: ' . $reply_to . "\r\n" .
			'X-Mailer: PHP/' . phpversion();

		$mail = isset( $form_data['admin_email_to'] ) ? $form_data['admin_email_to'] : null;

		if ( ! $mail ) {
			return new WP_Error(
				'email_error',
				esc_html__( 'Error. Notification email not found.', 'gutenverse' ),
				array( 'status' => 500 )
			);
		}

		$admin_email  = preg_replace( '/\s+/', '', $mail );
		$admin_emails = explode( ',', $admin_email );
		foreach ( $admin_emails as $email ) {
			$status = array(
				'entry_id' => $entry_id,
				'status'   => wp_mail( $email, $subject, $body, $headers ),
			);
		}

		return new WP_REST_Response( $status, 200 );
	}

	/**
	 * Email HTML.
	 *
	 * @param int   $form_id .
	 * @param array $form_entry .
	 * @param int   $entry_id .
	 * @param bool  $admin .
	 *
	 * @return WP_Response
	 */
	public static function format_data_for_mail( $form_id, $form_entry, $entry_id, $admin = true ) {
			ob_start();
		?>
		<div>
			<table width="100%" cellpadding="5" cellspacing="0" bgcolor="#FFFFFF" style="border: 1px solid #EAF2FA">
				<tbody>
					<?php
					if ( $admin ) {
						echo "<tr bgcolor='#EAF2FA'><td colspan='3'><strong>" . esc_html__( 'Form ID', 'gutenverse' ) . '</strong></td></tr>';
						echo "<tr bgcolor='#FFFFFF'><td width='20'>" . esc_html( $form_id ) . '</td></tr>';
						echo "<tr bgcolor='#EAF2FA'><td colspan='3'><strong>" . esc_html__( 'Post ID', 'gutenverse' ) . '</strong></td></tr>';
						echo "<tr bgcolor='#FFFFFF'><td width='20'>" . esc_html( $form_entry['post-id'] ) . '</td></tr>';
					}

					echo "<tr bgcolor='#EAF2FA'><td colspan='3'><strong>" . esc_html__( 'Entry ID', 'gutenverse' ) . '</strong></td></tr>';
					echo "<tr bgcolor='#FFFFFF'><td width='20'>" . esc_html( $entry_id ) . '</td></tr>';
					echo "<tr bgcolor='#EAF2FA'><td colspan='3'><strong>" . esc_html__( 'Entry Data', 'gutenverse' ) . '</strong></td></tr>';

					foreach ( $form_entry['entry-data'] as $data ) {
						$value = is_array( $data['value'] ) ? gutenverse_join_array( $data['value'], false ) : $data['value'];

						echo "<tr bgcolor='#FFFFFF'><td colspan='2'><strong>" . esc_html( $data['id'] ) . '</strong></td>';
						echo "<td width='20'>" . esc_html( $value ) . '</td></tr>';
					}

					if ( $admin && ! empty( $form_entry['browser-data'] ) ) {
						echo "<tr bgcolor='#EAF2FA'><td colspan='3'><strong>" . esc_html__( 'Browser Info', 'gutenverse' ) . '</strong></td></tr>';
						echo "<tr bgcolor='#FFFFFF'><td colspan='2'><strong>IP Address</strong></td>";
						echo "<td width='20'>" . esc_html( $form_entry['browser-data']['ip'] ) . '</td></tr>';
						echo "<tr bgcolor='#FFFFFF'><td colspan='2'><strong>Browser Data</strong></td>";
						echo "<td width='20'>" . esc_html( $form_entry['browser-data']['user_agent'] ) . '</td></tr>';
					}

					?>
				</tbody>
			</table>
		</div>
		<?php
		$data_html = ob_get_contents();
		ob_end_clean();
		return apply_filters( 'gutenverse_form_format_data', $data_html, $form_id, $form_entry, $entry_id, $admin );
	}
}
