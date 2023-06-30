<?php
/**
 * Gutenverse Tab
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Tab
 *
 * @package gutenverse\style
 */
class Tab extends Style_Abstract {
	/**
	 * Block Directory
	 *
	 * @var string
	 */
	protected $block_dir = GUTENVERSE_DIR . '/block/';

	/**
	 * Block Name
	 *
	 * @var array
	 */
	protected $name = 'tab';

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
	}
}
