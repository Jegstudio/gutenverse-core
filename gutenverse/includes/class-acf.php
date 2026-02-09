<?php
/**
 * ACF class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse
 */

namespace Gutenverse;

/**
 * ACF class
 *
 * @package gutenverse
 */
class Acf {
	/**
	 * Init constructor.
	 */
	public function __construct() {
		add_filter( 'init', array( $this, 'register_post_meta' ), 9 );
	}

	/**
	 * Register post meta so it can work on editor
	 *
	 * @phpstan-ignore-next-line -- ACF functions are defined by the Advanced Custom Fields plugin.
	 */
	public function register_post_meta() {
		if ( ! function_exists( 'acf_get_field_groups' ) ) {
			return;
		}

		$groups     = acf_get_field_groups();
		$post_types = array();

		foreach ( $groups as $group ) {
			if ( ! empty( $group['location'] ) ) {
				foreach ( $group['location'] as $location_or ) {
					foreach ( $location_or as $rule ) {
						if (
						'post_type' === $rule['param'] &&
						'==' === $rule['operator']
						) {
							$post_types[] = $rule['value'];
						}
					}
				}
			}

			if ( empty( $post_types ) ) {
				continue;
			}

			$fields = acf_get_fields( $group );

			if ( empty( $fields ) ) {
				continue;
			}

			foreach ( $fields as $field ) {
				foreach ( $post_types as $post_type ) {
					register_post_meta(
						$post_type,
						$field['name'],
						array(
							'type'         => 'string',
							'single'       => true,
							'show_in_rest' => true,
						)
					);
				}
			}
		}
	}
}
