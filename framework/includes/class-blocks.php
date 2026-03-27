<?php
/**
 * Blocks class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-framework
 */

namespace Gutenverse\Framework;

/**
 * Class Blocks
 *
 * @package gutenverse
 */
class Blocks {
	/**
	 * Blocks constructor.
	 */
	public function __construct() {
		add_filter( 'block_categories_all', array( $this, 'block_category' ), 9999999 );
		add_filter( 'gutenverse_force_dynamic', '__return_true' );

		/**
		 * These functions used to be called inside init hook.
		 * But because framework called using init hook.
		 * Now these functions will be called directly.
		 */
		$this->register_blocks();
	}

	/**
	 * Gutenverse categories
	 *
	 * @return array
	 */
	public function gutenverse_categories() {
		$categories = apply_filters(
			'gutenverse_block_categories',
			array(
				'gutenverse-structure' => esc_html__( 'Gutenverse Wrapper', '--gctd--' ),
			)
		);

		$categories = array_map(
			function ( $slug, $title ) {
				return array(
					'slug'  => $slug,
					'title' => $title,
				);
			},
			array_keys( $categories ),
			$categories
		);

		return $categories;
	}

	/**
	 * Block Category
	 *
	 * @param array $categories Block Categories.
	 *
	 * @return array
	 */
	public function block_category( $categories ) {
		return array_merge(
			$this->gutenverse_categories(),
			$categories
		);
	}

	/**
	 * Register All Blocks
	 */
	public function register_blocks() {
		// Dynamic block.
		$this->register_dynamic_block( GUTENVERSE_FRAMEWORK_DIR . '/block/section/block.json' );

		// Static block.
		register_block_type( GUTENVERSE_FRAMEWORK_DIR . '/block/column/block.json' );
		register_block_type( GUTENVERSE_FRAMEWORK_DIR . '/block/wrapper/block.json' );

		// Dynamic blocks.
		$this->register_dynamic_block( GUTENVERSE_FRAMEWORK_DIR . '/block/container/block.json' );
	}

	/**
	 * Register dynamic block.
	 *
	 * @param string $json Path to block.json.
	 */
	private function register_dynamic_block( $json ) {
		if ( ! file_exists( $json ) ) {
			return;
		}

		$block_json = gutenverse_get_json( $json );

		if ( isset( $block_json['class_callback'] ) ) {
			$instance = new $block_json['class_callback']();

			register_block_type(
				$json,
				array(
					'render_callback' => array( $instance, 'render' ),
				)
			);
		}
	}
}
