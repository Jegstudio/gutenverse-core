<?php
/**
 * Gutenverse Tabs
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Tabs
 *
 * @package gutenverse\style
 */
class Tabs extends Style_Abstract {
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
	protected $name = 'tabs';

	/**
	 * Constructor
	 *
	 * @param array $attrs Attribute.
	 */
	public function __construct( $attrs ) {
		parent::__construct( $attrs );

		$this->set_feature(
			array(
				'border'      => null,
				'positioning' => null,
				'animation'   => null,
				'advance'     => null,
				'mask'        => null,
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		if ( isset( $this->attrs['borderWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-tabs.{$this->element_id} .tab-heading-item, .guten-tabs.{$this->element_id} .tab-heading-item:after, .guten-tabs.{$this->element_id} .tab-heading-item:before, .guten-tabs.{$this->element_id} .tab-body, .guten-tabs.{$this->element_id} .tab-heading-mobile, .guten-tabs.{$this->element_id} .tab-heading-mobile .tab-option",
					'property'       => function ( $value ) {
						return "border-width: {$value}px;";
					},
					'value'          => $this->attrs['borderWidth'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['borderColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-tabs.{$this->element_id} .tab-heading-item.active, .guten-tabs.{$this->element_id}.vertical .tab-heading-item.active,  .guten-tabs.{$this->element_id} .tab-heading-item.active:after, .guten-tabs.{$this->element_id} .tab-heading-item.active:before, .guten-tabs.{$this->element_id} .tab-body, .guten-tabs.{$this->element_id} .tab-heading-mobile, .guten-tabs.{$this->element_id} .tab-heading-mobile .tab-option",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'border-color' );
					},
					'value'          => $this->attrs['borderColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['backgroundColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-tabs.{$this->element_id} .tab-heading-item.active,.guten-tabs.{$this->element_id} .tab-body, .guten-tabs.{$this->element_id} .tab-heading-mobile, .guten-tabs.{$this->element_id} .tab-heading-mobile .tab-option",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['backgroundColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['titleColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-tabs.{$this->element_id} .tab-heading-item, .guten-tabs.{$this->element_id} .tab-heading-item svg",
					'property'       => function ( $value ) {
						return "{$this->handle_color( $value, 'color' )}";
					},
					'value'          => $this->attrs['titleColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['titleActiveColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-tabs.{$this->element_id} .tab-heading-item.active, .guten-tabs.{$this->element_id} .tab-heading-mobile .tab-title, .guten-tabs.{$this->element_id} .tab-heading-mobile .tab-option .tab-option-item",
					'property'       => function ( $value ) {
						return "{$this->handle_color( $value, 'color' )}";
					},
					'value'          => $this->attrs['titleActiveColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['titleTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".guten-tabs.{$this->element_id} .tab-heading-item, .guten-tabs.{$this->element_id} .tab-heading-mobile",
					'value'    => $this->attrs['titleTypography'],
				)
			);
		}

		if ( isset( $this->attrs['contentColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-tabs.{$this->element_id} .tab-body",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['contentColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['contentTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".guten-tabs.{$this->element_id} .tab-body",
					'value'    => $this->attrs['contentTypography'],
				)
			);
		}

		if ( isset( $this->attrs['contentPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .tab-body",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['contentPadding'],
					'device_control' => true,
				)
			);
		}
	}
}
