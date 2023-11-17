<?php
/**
 * Gutenverse Progress Bar
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Progress Bar
 *
 * @package gutenverse\style
 */
class Progress_Bar extends Style_Abstract {
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
	protected $name = 'progress-bar';


	/**
	 * Constructor
	 *
	 * @param array $attrs Attribute.
	 */
	public function __construct( $attrs ) {
		parent::__construct( $attrs );

		$this->set_feature(
			array(
				'background'  => null,
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
		if ( isset( $this->attrs['barGradient'] ) && isset( $this->attrs['colorMode'] ) && 'gradient' === $this->attrs['colorMode'] ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .progress-group .progress-skill-bar .skill-bar",
					'property'       => function ( $value ) {
						return $this->handle_gradient( $value, '90' );
					},
					'value'          => $this->attrs['barGradient'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['trackGradient'] ) && isset( $this->attrs['colorMode'] ) && 'gradient' === $this->attrs['colorMode'] ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .progress-group .progress-skill-bar .skill-bar .skill-track",
					'property'       => function ( $value ) {
						return $this->handle_gradient( $value, '90' );
					},
					'value'          => $this->attrs['trackGradient'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['barColor'] ) && ( ( isset( $this->attrs['colorMode'] ) && 'default' === $this->attrs['colorMode'] ) || ! isset( $this->attrs['colorMode'] ) ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .progress-group .progress-skill-bar .skill-bar",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['barColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['trackColor'] ) && ( ( isset( $this->attrs['colorMode'] ) && 'default' === $this->attrs['colorMode'] ) || ! isset( $this->attrs['colorMode'] ) ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .progress-group .progress-skill-bar .skill-bar .skill-track",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['trackColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['trackHeight'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .progress-group .progress-skill-bar .skill-bar",
					'property'       => function ( $value ) {
						return "height: {$value}px;";
					},
					'value'          => $this->attrs['trackHeight'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['barRadius'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .progress-group .progress-skill-bar .skill-bar",
					'property'       => function ( $value ) {
						return $this->handle_border_radius( $value );
					},
					'value'          => $this->attrs['barRadius'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['trackRadius'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .progress-group .progress-skill-bar .skill-bar .skill-track",
					'property'       => function ( $value ) {
						return $this->handle_border_radius( $value );
					},
					'value'          => $this->attrs['trackRadius'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['barPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .progress-group .progress-skill-bar .skill-bar",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['barPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['barMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .progress-group .progress-skill-bar .skill-bar",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['barMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['titleColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .progress-group .progress-skill-bar .skill-bar-content .skill-title",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['titleColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['titleTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .progress-group .progress-skill-bar .skill-bar-content .skill-title",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['titleTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['titleTextShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .progress-group .progress-skill-bar .skill-bar-content .skill-title",
					'property'       => function ( $value ) {
						return $this->handle_text_shadow( $value );
					},
					'value'          => $this->attrs['titleTextShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['percentBgColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .progress-group[class*='tooltip-'] .progress-skill-bar .skill-bar .skill-track .number-percentage-wrapper,.{$this->element_id} .progress-group.ribbon .progress-skill-bar .skill-bar .skill-track .number-percentage-wrapper,.{$this->element_id} .progress-group[class*='tooltip-']:not(.tooltip-style) .progress-skill-bar .skill-bar .skill-track .number-percentage-wrapper:before",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['percentBgColor'],
					'device_control' => false,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .progress-group.tooltip-style .progress-skill-bar .skill-bar .skill-track .number-percentage-wrapper:before",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['percentBgColor'],
					'device_control' => false,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .progress-group.ribbon .progress-skill-bar .skill-bar .skill-track .number-percentage-wrapper:before",
					'property'       => function ( $value ) {
						return "{$this->handle_color( $value, 'border-right-color' )}{$this->handle_color( $value, 'border-bottom-color' )}";
					},
					'value'          => $this->attrs['percentBgColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['barBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .progress-group .progress-skill-bar .skill-bar",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['barBoxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['percentColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .progress-group .progress-skill-bar .number-percentage, .{$this->element_id} .progress-group .number-percentage",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['percentColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['percentTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .progress-group .progress-skill-bar .number-percentage, .{$this->element_id} .progress-group .number-percentage",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['percentTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['percentTextShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .progress-group .progress-skill-bar .number-percentage, .{$this->element_id} .progress-group .number-percentage",
					'property'       => function ( $value ) {
						return $this->handle_text_shadow( $value );
					},
					'value'          => $this->attrs['percentTextShadow'],
					'device_control' => false,
				)
			);
		}
	}
}
