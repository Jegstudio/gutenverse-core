<?php
/**
 * Gutenverse Abstract Style
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-framework
 */

namespace Gutenverse\Framework;

/**
 * Class Style_Abstract
 *
 * @package gutenverse\style
 */
abstract class Style_Abstract extends Style_Interface {
	/**
	 * Block Directory
	 *
	 * @var string
	 */
	protected $block_dir = GUTENVERSE_FRAMEWORK_DIR . '/block/';

	/**
	 * Generated Style for each device.
	 *
	 * @var array
	 */
	protected $generated = array(
		'Desktop' => array(),
		'Tablet'  => array(),
		'Mobile'  => array(),
	);

	/**
	 * Block Font Families
	 *
	 * @var array
	 */
	protected $font_families;

	/**
	 * The Constructor
	 *
	 * @param array $attrs Attribute.
	 */
	public function __construct( $attrs ) {
		if ( isset( $attrs['elementId'] ) ) {
			$this->element_id = $attrs['elementId'];
		}
		$this->set_attrs( $attrs );
	}

	/**
	 * Set default attributes
	 *
	 * @param array $attrs .
	 */
	protected function set_attrs( $attrs ) {
		if ( isset( $this->name ) ) {
			$path = $this->block_dir . "{$this->name}/block.json";

			if ( ! file_exists( $path ) ) {
				return;
			}

			$block_json = gutenverse_get_json( $path );

			if ( isset( $block_json['attributes'] ) ) {
				foreach ( $block_json['attributes'] as $key => $value ) {
					if ( isset( $attrs[ $key ] ) ) {
						$this->attrs[ $key ] = $attrs[ $key ];
					} elseif ( isset( $value['default'] ) ) {
						$this->attrs[ $key ] = $value['default'];
					}
				}
			}
		}
	}
}
