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
				'gutenverse-structure' => __( 'Gutenverse Wrapper', 'gutenverse' ),
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
		// Static block.
		register_block_type( GUTENVERSE_FRAMEWORK_DIR . '/block/section/block.json' );
		register_block_type( GUTENVERSE_FRAMEWORK_DIR . '/block/column/block.json' );
	}
}
