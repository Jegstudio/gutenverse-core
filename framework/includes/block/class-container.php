<?php
/**
 * Container Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-framework\block
 */

namespace Gutenverse\Framework\Block;

/**
 * Class Container Block
 *
 * @package gutenverse-framework\block
 */
class Container extends Block_Abstract {

	/**
	 * Check if sticky is active.
	 *
	 * @param array $sticky Sticky data.
	 * @return bool
	 */
	private function is_sticky( $sticky ) {
		if ( empty( $sticky ) || ! is_array( $sticky ) ) {
			return false;
		}
		foreach ( $sticky as $value ) {
			if ( $value ) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Check if background animation is active.
	 *
	 * @param array $animated Animation data.
	 * @return bool
	 */
	private function is_animation_active( $animated ) {
		return ! empty( $animated ) && isset( $animated['actions'] ) && is_array( $animated['actions'] ) && count( $animated['actions'] ) > 0;
	}

	/**
	 * Render gradient SVG definition.
	 *
	 * @param string $id           Gradient ID.
	 * @param array  $gradient_color Gradient color stops.
	 * @param string $gradient_angle Gradient angle.
	 * @return string
	 */
	private function render_gradient( $id, $gradient_color, $gradient_angle = '' ) {
		if ( empty( $gradient_color ) || ! is_array( $gradient_color ) ) {
			return '';
		}
		$transform = ! empty( $gradient_angle ) ? ' gradientTransform="rotate(' . esc_attr( $gradient_angle ) . ')"' : '';
		$stops     = '';
		foreach ( $gradient_color as $stop ) {
			$color  = isset( $stop['color'] ) ? $stop['color'] : '';
			$offset = isset( $stop['offset'] ) ? floatval( $stop['offset'] ) * 100 : 0;
			$stops .= '<stop style="stop-color:' . esc_attr( $color ) . '" offset="' . esc_attr( $offset ) . '%"></stop>';
		}
		return '<linearGradient id="' . esc_attr( $id ) . '"' . $transform . '>' . $stops . '</linearGradient>';
	}

	/**
	 * Render shape divider SVG.
	 *
	 * @param string $type   Shape type.
	 * @param array  $props  Shape properties.
	 * @return string
	 */
	private function render_shape_divider_svg( $type, $props ) {
		$id              = isset( $props['id'] ) ? $props['id'] : '';
		$invert          = isset( $props['invert'] ) ? $props['invert'] : false;
		$gradient        = isset( $props['gradient'] ) ? $props['gradient'] : false;
		$gradient_color  = isset( $props['gradientColor'] ) ? $props['gradientColor'] : array();
		$gradient_angle  = isset( $props['gradientAngle'] ) ? $props['gradientAngle'] : '';
		$gradient_color2 = isset( $props['gradientColor2'] ) ? $props['gradientColor2'] : array();
		$gradient_angle2 = isset( $props['gradientAngle2'] ) ? $props['gradientAngle2'] : '';
		$gradient_color3 = isset( $props['gradientColor3'] ) ? $props['gradientColor3'] : array();
		$gradient_angle3 = isset( $props['gradientAngle3'] ) ? $props['gradientAngle3'] : '';

		$shapes = $this->get_shape_data();

		if ( ! isset( $shapes[ $type ] ) ) {
			return '';
		}

		$shape   = $shapes[ $type ];
		$viewbox = $shape['viewBox'];
		$width   = $shape['width'];
		$height  = $shape['height'];

		if ( isset( $shape['multi'] ) && $shape['multi'] ) {
			return $this->render_multi_path_svg( $shape, $id, $gradient, $gradient_color, $gradient_angle, $gradient_color2, $gradient_angle2, $gradient_color3, $gradient_angle3, $width, $height, $viewbox );
		}

		$d    = $invert && isset( $shape['invert'] ) ? $shape['invert'] : $shape['normal'];
		$fill = $gradient && ! empty( $gradient_color ) ? 'url(#' . esc_attr( $id ) . ')' : '#000';

		$svg  = '<svg class="guten-shape-fill" viewBox="' . esc_attr( $viewbox ) . '" preserveAspectRatio="none" fill="none" height="' . esc_attr( $height ) . '" width="' . esc_attr( $width ) . '" xmlns="http://www.w3.org/2000/svg">';
		$svg .= '<path d="' . esc_attr( $d ) . '" fill="' . esc_attr( $fill ) . '"/>';
		if ( $gradient && ! empty( $gradient_color ) ) {
			$svg .= $this->render_gradient( $id, $gradient_color, $gradient_angle );
		}
		$svg .= '</svg>';

		return $svg;
	}

	/**
	 * Render multi-path SVG (shapes with opacity layers).
	 *
	 * @param array  $shape          Shape data.
	 * @param string $id             Gradient ID.
	 * @param bool   $gradient       Whether gradient is enabled.
	 * @param array  $gradient_color  Gradient color 1.
	 * @param string $gradient_angle  Gradient angle 1.
	 * @param array  $gradient_color2 Gradient color 2.
	 * @param string $gradient_angle2 Gradient angle 2.
	 * @param array  $gradient_color3 Gradient color 3.
	 * @param string $gradient_angle3 Gradient angle 3.
	 * @param string $width          SVG width.
	 * @param string $height         SVG height.
	 * @param string $viewbox        SVG viewBox.
	 * @return string
	 */
	private function render_multi_path_svg( $shape, $id, $gradient, $gradient_color, $gradient_angle, $gradient_color2, $gradient_angle2, $gradient_color3, $gradient_angle3, $width, $height, $viewbox ) {
		$paths = $shape['paths'];
		$svg   = '<svg class="guten-shape-fill" viewBox="' . esc_attr( $viewbox ) . '" preserveAspectRatio="none" fill="none" height="' . esc_attr( $height ) . '" width="' . esc_attr( $width ) . '" xmlns="http://www.w3.org/2000/svg">';

		$gradient_colors = array( $gradient_color, $gradient_color2, $gradient_color3 );
		$gradient_angles = array( $gradient_angle, $gradient_angle2, $gradient_angle3 );
		$gradient_ids    = array( $id, $id . '-2', $id . '-3' );
		$default_fills   = isset( $shape['default_fills'] ) ? $shape['default_fills'] : array( '#00000044', '#00000088', '#000' );

		if ( $gradient ) {
			$svg .= '<g>';
		} else {
			$svg .= '<g fill="#000">';
		}

		foreach ( $paths as $index => $path_data ) {
			$opacity = isset( $path_data['opacity'] ) ? ' opacity="' . esc_attr( $path_data['opacity'] ) . '"' : '';
			$gc      = isset( $gradient_colors[ $index ] ) ? $gradient_colors[ $index ] : array();
			if ( $gradient ) {
				$fill = ! empty( $gc ) ? 'url(#' . esc_attr( $gradient_ids[ $index ] ) . ')' : ( isset( $default_fills[ $index ] ) ? $default_fills[ $index ] : '#000' );
				$svg .= '<path d="' . esc_attr( $path_data['d'] ) . '"' . $opacity . ' fill="' . esc_attr( $fill ) . '"/>';
			} else {
				$svg .= '<path d="' . esc_attr( $path_data['d'] ) . '"' . $opacity . '/>';
			}
		}

		$svg .= '</g>';

		if ( $gradient ) {
			foreach ( $gradient_colors as $index => $gc ) {
				if ( ! empty( $gc ) ) {
					$svg .= $this->render_gradient( $gradient_ids[ $index ], $gc, isset( $gradient_angles[ $index ] ) ? $gradient_angles[ $index ] : '' );
				}
			}
		}

		$svg .= '</svg>';
		return $svg;
	}

	/**
	 * Get shape divider data.
	 *
	 * @return array
	 */
	private function get_shape_data() {
		return array(
			'arrow'        => array(
				'viewBox' => '0 0 1200 10',
				'width'   => '1200',
				'height'  => '10',
				'normal'  => 'm600 10-10-10h20z',
				'invert'  => 'M 0,10 V 0 H 600 L 590,10 Z M 600,0 h 600 V 10 H 610 Z',
			),
			'curve'        => array(
				'viewBox' => '0 0 1200 100',
				'width'   => '1200',
				'height'  => '100',
				'normal'  => 'm1200 0c-113.72 59.47-339.74 100-600 100s-486.28-40.53-600-100z',
				'invert'  => 'M 0,100 V 0 H 600 C 339.74,0 113.72,40.53 0,100 Z M 600,0 h 600 V 100 C 1086.28,40.53 860.26,0 600,0 Z',
			),
			'curve_a1'     => array(
				'viewBox'       => '0 0 1200 165',
				'width'         => '1200',
				'height'        => '165',
				'multi'         => true,
				'default_fills' => array( '#00000044', '#00000088', '#000' ),
				'paths'         => array(
					array(
						'd'       => 'm1200 0v16c-163.37 62.074-429.49 110-730 110-172.25 0-333.2-13.229-470-36.2919v-89.7081z',
						'opacity' => '.25',
					),
					array(
						'd'       => 'm1200 0v16c-163.37 52.221-429.49 90-730 90-172.25 0-333.2-11.1293-470-30.5313v-75.4687z',
						'opacity' => '.5',
					),
					array(
						'd' => 'm1200 0v16c-163.37 42.23-429.49 69.72-730 69.72-172.25 0-333.2-9-470-24.69v-61.03z',
					),
				),
			),
			'curve_a2'     => array(
				'viewBox'       => '0 0 1200 165',
				'width'         => '1200',
				'height'        => '165',
				'multi'         => true,
				'default_fills' => array( '#00000044', '#00000088', '#000' ),
				'paths'         => array(
					array(
						'd'       => 'm0 0v16c163.37 62.074 429.49 110 730 110 172.25 0 333.2-13.229 470-36.2919v-89.7081z',
						'opacity' => '.25',
					),
					array(
						'd'       => 'm0 0v16c163.37 52.221 429.49 90 730 90 172.25 0 333.2-11.1293 470-30.5313v-75.4687z',
						'opacity' => '.5',
					),
					array(
						'd' => 'm0 0v16c163.37 42.23 429.49 69.72 730 69.72 172.25 0 333.2-9 470-24.69v-61.03z',
					),
				),
			),
			'curve_n'      => array(
				'viewBox' => '0 0 1200 100',
				'width'   => '1200',
				'height'  => '100',
				'normal'  => 'M600 0S207 100 0 100V0zm0 0s393 100 600 100V0z',
				'invert'  => 'M 0,100 V 0 C 207,0 393,100 600,100 Z M 600,100 C 807,100 993,0 1200,0 V 100 Z',
			),
			'curve_o'      => array(
				'viewBox'       => '0 0 1200 100',
				'width'         => '1200',
				'height'        => '100',
				'multi'         => true,
				'default_fills' => array( '#00000044', '#000' ),
				'paths'         => array(
					array(
						'd'       => 'm0 100v-86c80.97 52.3 268.52 86 488 86 365.38 0 664.81-52.79 712-100z',
						'opacity' => '.33',
					),
					array(
						'd' => 'm1200 0c-47.19 47.21-346.62 100-712 100-219.48 0-407.03-33.7-488-86v86h1200z',
					),
				),
			),
			'mountain'     => array(
				'viewBox' => '0 0 1200 100',
				'width'   => '1200',
				'height'  => '100',
				'normal'  => 'm741 98.873 459 1.127v-100l-459 96.627-278.15-46.627-54.85 9.18-250 37.43-99 3.99z',
				'invert'  => 'M 459.1,53.373 0,100 V 0 H 1200 V 100 L 741,98.873 462.85,52.246 408,61.426 Z M 459.1,53.373 741,98.873 462.85,52.246 Z',
			),
			'mountain_o'   => array(
				'viewBox'       => '0 0 1200 100',
				'width'         => '1200',
				'height'        => '100',
				'multi'         => true,
				'default_fills' => array( '#00000044', '#000' ),
				'paths'         => array(
					array(
						'd'       => 'M 0,100 V 58.476 L 301,31.708 501.85,50.573 596.25,41.108 1200,100 Z',
						'opacity' => '.33',
					),
					array(
						'd' => 'm 0,100 V 91.726 L 301,31.708 501.85,50.573 596.25,41.108 1200,100 Z',
					),
				),
			),
			'papertear'    => array(
				'viewBox' => '0 0 1200 125',
				'width'   => '1200',
				'height'  => '125',
				'normal'  => 'm1200 0-2.39 7.64-2.32 3.07-3.4 2.63-1.62 3.46-1.6 3.18-3.04.44-4.12 3.48-4.78 5.64-5.03-.15-6.37 3.39-3.26 5.43-3.76 3.23-2.71 2.62-3.03 1.7-6.12 5.17-2.66 6.78-5.22 4.39-6.01 2.72-7.23 3.3-5.49-.76-3.07 2.41-3.6 5.19-3.07 6.33-3.83 3.55-5.14-.77-2.34 3.15-4.22 8.1-5.87 6.08-5.72 3.28-2.02 2.02-4.25 2.17-6.16 1.56-3.39 3.97-3.16 2.88-3.32 3.34-3.16 2.2-6.88-.2-3.5 3.19-5.67 3.26-3.59.98-4.26 1.54-3.81 3.94h-3.38l-5.8 3.96-3.09-.94-3.02-2.62-3.96-1.38-3.52-2.15-5.39.23-3.69-3.99-3.86 1.95-2.84-4.35-3.51 1.5-3.38-1.48-6.34-2.54-2.89 3.07-3.68 5.78-5.98 1.62-6.22-3.14-2.84.44-3.15 5.97-2.83 2.04-3.55.38-3.71 2.88-3.25 3.12-3.59 4.38-3.22 2.29-3.58 2.3-3.26-.33-5.68 3.66-6.81 2.61-5.18.42-3.72 2.7-3.37.26-3.93.68-3.5 3.84-3.12-2.55-3.36 6.08-3.66 4.06-3.85.39-3.22-1.84-5.46 3.95-6.54 1.06-6.47.63-4.36 2.68-4.85 2.49-6.03-1.3-3.69-2.14-3.56 4.18-3.3 3.83-5.87 2.49-6.35-.35-3.44 4.67-7.07 2.75-3.14-.63-5.78 5.73-3.37 3.21-3.09.84-7.41 2.89-5.3 3.66-6.56 3.82-2.95-.76-4.4 3.73-3.5 3.07-3.31 5.12-6.57 2.47-3.17-.28-3.6 2.97-4.86 3.93-6.05-4.31-3.43 4.64-3.54 3.31-3.85.74-3.5.19-3.18 4.11-3.17 3.91-3.19-.3-3.37-3.23-3.09 3.08-3.58 5.69-6.6-2.31-3.24 2.74-3.08 3.66-3.24 3.82-3.14-.74-3.37 2.12-3.16 3.5-3.12 5.48-3.75 3.04-3.09.56-3.08-1.05-3.33.55-3.42 4.16-5.74 3.53-6.39-2.27-3.36 3.3-3.73 1.38-3.41 4.39-3.21 3.1-3.14-.22-3.12 4.12-3.4 1.86-3.23 2.76-3.07 1.77-3.36.67-3.74 1.39-3.11 3.15-4.49-.51-4.4-1.26-3.8 1.14-5.25 2.63-5.13 3.18-3.38 4.02h-3.03l-3.38 4.66v125H1200z',
			),
			'split'        => array(
				'viewBox' => '0 0 1200 100',
				'width'   => '1200',
				'height'  => '100',
				'normal'  => 'm600 100-600-100h1200z',
				'invert'  => 'M 0,100 V 0 L 600,100 0,100 Z M 1200,0 600,100 h 600 z',
			),
			'split_n'      => array(
				'viewBox' => '0 0 1200 100',
				'width'   => '1200',
				'height'  => '100',
				'normal'  => 'M600 0 0 100h1200z',
				'invert'  => 'M 0,0 V 100 L 600,0 Z M 600,0 1200,100 V 0 Z',
			),
			'tilt'         => array(
				'viewBox' => '0 0 1200 100',
				'width'   => '1200',
				'height'  => '100',
				'normal'  => 'M1200 0H0v100z',
				'invert'  => 'M 0,0 V 100 H 1200 Z',
			),
			'tilt_g'       => array(
				'viewBox'       => '0 0 1200 100',
				'width'         => '1200',
				'height'        => '100',
				'multi'         => true,
				'default_fills' => array( '#00000088', '#000' ),
				'paths'         => array(
					array(
						'd'       => 'M1200 100H0V0l400 84z',
						'opacity' => '.5',
					),
					array(
						'd' => 'm1200 0v100H0L1200 0Z',
					),
				),
			),
			'triangle'     => array(
				'viewBox' => '0 0 1200 100',
				'width'   => '1200',
				'height'  => '100',
				'normal'  => 'M 598 100 L 0 0 L 1200 0 Z',
				'invert'  => 'M 0,100 V 0 L 598,100 Z M 1200,0 598,100 h 602 z',
			),
			'triangle_2'   => array(
				'viewBox'       => '0 0 1200 100',
				'width'         => '1200',
				'height'        => '100',
				'multi'         => true,
				'default_fills' => array( '#00000044', '#000' ),
				'paths'         => array(
					array(
						'd'       => 'm0 0 800 100L1200 0Z',
						'opacity' => '.33',
					),
					array(
						'd' => 'm0 0 598 100 602-100z',
					),
				),
			),
			'triangle_3'   => array(
				'viewBox' => '0 0 1200 100',
				'width'   => '1200',
				'height'  => '100',
				'normal'  => 'M1200 100H0V0l300 80 600-40z',
				'invert'  => 'M 0,0 V 100 H 300 L 0,0 Z M 1200,100 H 900 L 1200,0 Z M 300,100 900,100 300,80 Z',
			),
			'triangle_o'   => array(
				'viewBox'       => '0 0 1200 100',
				'width'         => '1200',
				'height'        => '100',
				'multi'         => true,
				'default_fills' => array( '#00000044', '#000' ),
				'paths'         => array(
					array(
						'd'       => 'm0 0 250 70L1200 0Z',
						'opacity' => '.33',
					),
					array(
						'd' => 'M1200 0H0l300 80 600-40z',
					),
				),
			),
			'triangle_n'   => array(
				'viewBox' => '0 0 1200 100',
				'width'   => '1200',
				'height'  => '100',
				'normal'  => 'M 598 0 L 0 100 H 1200 Z',
				'invert'  => 'M 0,0 V 100 L 598,0 Z M 1200,100 V 0 L 598,0 Z',
			),
			'triangle_n_o' => array(
				'viewBox'       => '0 0 1200 100',
				'width'         => '1200',
				'height'        => '100',
				'multi'         => true,
				'default_fills' => array( '#00000044', '#000' ),
				'paths'         => array(
					array(
						'd'       => 'M1200 100 402 0 0 100Z',
						'opacity' => '.33',
					),
					array(
						'd' => 'M1200 100 598 0 0 100Z',
					),
				),
			),
			'waves'        => array(
				'viewBox' => '0 0 1200 200',
				'width'   => '1200',
				'height'  => '200',
				'normal'  => 'M 0,200 V 111.57 C 104.24,130.1 223.56,142 354.3,142 657,142 924,56 1200,0 v 200 z',
				'invert'  => 'M 0,0 V 111.57 C 104.24,130.1 223.56,142 354.3,142 657,142 924,56 1200,0 Z',
			),
			'waves_2'      => array(
				'viewBox' => '0 0 1200 200',
				'width'   => '1200',
				'height'  => '200',
				'normal'  => 'M 0,200 V 80 C 169.28,122.88 354.44,150 556,150 782.6,150 992.5,113.92 1200,42 V 200 Z',
				'invert'  => 'M 0,0 V 80 C 169.28,122.88 354.44,150 556,150 782.6,150 992.5,113.92 1200,42 V 0 Z',
			),
			'waves_o1'     => array(
				'viewBox'       => '0 0 1200 200',
				'width'         => '1200',
				'height'        => '200',
				'multi'         => true,
				'default_fills' => array( '#00000044', '#00000088', '#000' ),
				'paths'         => array(
					array(
						'd'       => 'M 0,200 V 80.5 c 219.93,60.18 478.52,95.5 753.59,95.5 161.04,0 315.28,-13.72 446.41,-38.09 V 200 Z',
						'opacity' => '.25',
					),
					array(
						'd'       => 'M 0,200 V 120.16 C 173.15,157.88 377.42,180 600.09,180 830.95,180 1042.63,155.99 1200,114.23 V 200 Z',
						'opacity' => '.5',
					),
					array(
						'd' => 'M 0,200 V 160.07 C 139.07,178.14 302.49,188 480.09,188 721.22,188 940.38,166.36 1200,100 v 100 z',
					),
				),
			),
			'waves_o2'     => array(
				'viewBox'       => '0 0 1200 200',
				'width'         => '1200',
				'height'        => '200',
				'multi'         => true,
				'default_fills' => array( '#00000044', '#00000088', '#000' ),
				'paths'         => array(
					array(
						'd'       => 'M 0,200 V 60 C 120.98,76.89 260.15,90 413.88,90 668.38,90 895.75,51.5 1200,0 v 200 z',
						'opacity' => '.25',
					),
					array(
						'd'       => 'M 0,200 V 111.57 C 104.24,130.1 223.56,142 354.3,142 657,142 924,56 1200,0 v 200 z',
						'opacity' => '.5',
					),
					array(
						'd' => 'M 0,200 V 155.26 C 90,170 195,180 316.38,180 617.38,180 881.45,118 1200,46 v 154 z',
					),
				),
			),
			'waves_o3'     => array(
				'viewBox'       => '0 0 1200 200',
				'width'         => '1200',
				'height'        => '200',
				'multi'         => true,
				'default_fills' => array( '#00000044', '#00000088', '#000' ),
				'paths'         => array(
					array(
						'd'       => 'M 0,200 V 80 c 169.28,42.88 354.44,70 556,70 226.6,0 436.5,-36.08 644,-112 v 162 z',
						'opacity' => '.25',
					),
					array(
						'd'       => 'M 0,200 V 80 C 169.28,122.88 354.44,150 556,150 782.6,150 992.5,113.92 1200,42 V 200 Z',
						'opacity' => '.5',
					),
					array(
						'd' => 'M 0,200 V 130 C 169.28,167.88 354.44,180 556,180 782.6,180 992.5,158.92 1200,102 V 200 Z',
					),
				),
			),
			'zigzag'       => array(
				'viewBox' => '0 0 1200 10',
				'width'   => '1200',
				'height'  => '10',
				'normal'  => 'm 0,10 75.6,-5 75.6,5 75.6,-5 75.6,5 75.6,-5 75.6,5 75.6,-5 75.6,5 75.6,-5 75.6,5 75.6,-5 75.6,5 75.6,-5 75.6,5 75.6,-5 V 10 H 0 Z',
				'invert'  => 'M 0,0 75.6,5 151.2,0 226.8,5 302.4,0 378,5 453.6,0 529.2,5 604.8,0 680.4,5 756,0 831.6,5 907.2,0 982.8,5 1058.4,0 1134,5 1200,0 V 10 H 0 Z',
			),
		);
	}

	/**
	 * Render a shape divider section (top or bottom).
	 *
	 * @param string $position 'top' or 'bottom'.
	 * @param array  $divider  Divider attributes.
	 * @return string
	 */
	private function render_section_divider( $position, $divider ) {
		if ( empty( $divider ) ) {
			return '';
		}

		$type       = isset( $divider['type'] ) ? $divider['type'] : '';
		$flip       = isset( $divider['flip'] ) ? $divider['flip'] : false;
		$front      = isset( $divider['front'] ) ? $divider['front'] : false;
		$invert     = isset( $divider['invert'] ) ? $divider['invert'] : false;
		$color_mode = isset( $divider['colorMode'] ) ? $divider['colorMode'] : '';

		if ( empty( $type ) || 'none' === $type ) {
			return '';
		}

		$classes = array( 'guten-shape-divider', 'guten-shape-divider-' . $position );
		if ( $flip ) {
			$classes[] = 'guten-shape-flip';
		}
		if ( $front ) {
			$classes[] = 'guten-shape-zindex';
		}

		$element_id = $this->get_element_id();
		$props      = array(
			'id'             => 'divider-' . $position . '-' . $element_id,
			'invert'         => $invert,
			'gradient'       => 'gradient' === $color_mode,
			'gradientColor'  => isset( $divider['gradientColor'] ) ? $divider['gradientColor'] : array(),
			'gradientAngle'  => isset( $divider['gradientAngle'] ) ? $divider['gradientAngle'] : '',
			'gradientColor2' => isset( $divider['gradientColor2'] ) ? $divider['gradientColor2'] : array(),
			'gradientAngle2' => isset( $divider['gradientAngle2'] ) ? $divider['gradientAngle2'] : '',
			'gradientColor3' => isset( $divider['gradientColor3'] ) ? $divider['gradientColor3'] : array(),
			'gradientAngle3' => isset( $divider['gradientAngle3'] ) ? $divider['gradientAngle3'] : '',
		);

		$svg = $this->render_shape_divider_svg( $type, $props );

		return '<div class="' . esc_attr( implode( ' ', $classes ) ) . '">' . $svg . '</div>';
	}

	/**
	 * Render animated divider section.
	 *
	 * @param string $position 'top' or 'bottom'.
	 * @param array  $divider  Divider animated attributes.
	 * @return string
	 */
	private function render_animated_divider( $position, $divider ) {
		if ( empty( $divider ) || ! isset( $divider['type'] ) || 'none' === $divider['type'] ) {
			return '';
		}

		$flip  = isset( $divider['flip'] ) ? $divider['flip'] : false;
		$front = isset( $divider['front'] ) ? $divider['front'] : false;

		$classes = array( 'guten-shape-divider-animated', 'guten-shape-divider-animated-' . $position );
		if ( $flip ) {
			$classes[] = 'guten-shape-flip';
		}
		if ( $front ) {
			$classes[] = 'guten-shape-zindex';
		}

		return '<div class="' . esc_attr( implode( ' ', $classes ) ) . '"></div>';
	}

	/**
	 * Render content
	 *
	 * @return string
	 */
	public function render_content() {
		$container_layout = isset( $this->attributes['containerLayout'] ) ? $this->attributes['containerLayout'] : 'full-width';
		$inner_blocks     = $this->get_inner_blocks_content();

		if ( 'boxed' === $container_layout ) {
			return '<div class="guten-inner-container">' . $inner_blocks . '</div>';
		}

		return $inner_blocks;
	}

	/**
	 * Render view in editor
	 */
	public function render_gutenberg() {
		return null;
	}

	/**
	 * Render view in frontend
	 */
	public function render_frontend() {
		if ( ! empty( trim( $this->block_data->inner_html ) ) && apply_filters( 'gutenverse_force_dynamic', false ) ) {
			return $this->content;
		}

		// Snapshot attributes before rendering inner blocks, since this class is a singleton
		// and nested container renders will overwrite $this->attributes.
		$attributes = $this->attributes;

		$element_id      = $this->get_element_id();
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();
		$custom_classes  = $this->get_custom_classes();

		$container_layout         = isset( $attributes['containerLayout'] ) ? $attributes['containerLayout'] : 'full-width';
		$background               = isset( $attributes['background'] ) ? $attributes['background'] : array();
		$background_overlay       = isset( $attributes['backgroundOverlay'] ) ? $attributes['backgroundOverlay'] : array();
		$background_overlay_hover = isset( $attributes['backgroundOverlayHover'] ) ? $attributes['backgroundOverlayHover'] : array();
		$background_animated      = isset( $attributes['backgroundAnimated'] ) ? $attributes['backgroundAnimated'] : array();
		$background_effect        = isset( $attributes['backgroundEffect'] ) ? $attributes['backgroundEffect'] : array();
		$cursor_effect            = isset( $attributes['cursorEffect'] ) ? $attributes['cursorEffect'] : array();
		$sticky                   = isset( $attributes['sticky'] ) ? $attributes['sticky'] : array();
		$sticky_show_on           = isset( $attributes['stickyShowOn'] ) ? $attributes['stickyShowOn'] : 'both';
		$sticky_ease              = isset( $attributes['stickyEase'] ) ? $attributes['stickyEase'] : 'none';
		$sticky_position          = isset( $attributes['stickyPosition'] ) ? $attributes['stickyPosition'] : 'top';
		$sticky_duration          = isset( $attributes['stickyDuration'] ) ? $attributes['stickyDuration'] : 0.25;
		$top_sticky               = isset( $attributes['topSticky'] ) ? $attributes['topSticky'] : array();
		$bottom_sticky            = isset( $attributes['bottomSticky'] ) ? $attributes['bottomSticky'] : array();
		$top_divider              = isset( $attributes['topDivider'] ) ? $attributes['topDivider'] : array();
		$bottom_divider           = isset( $attributes['bottomDivider'] ) ? $attributes['bottomDivider'] : array();
		$top_divider_animated     = isset( $attributes['topDividerAnimated'] ) ? $attributes['topDividerAnimated'] : array();
		$bottom_divider_animated  = isset( $attributes['bottomDividerAnimated'] ) ? $attributes['bottomDividerAnimated'] : array();
		$html_tag                 = isset( $attributes['htmlTag'] ) ? $attributes['htmlTag'] : 'div';
		$anchor                   = isset( $attributes['anchor'] ) ? $attributes['anchor'] : '';

		$is_slideshow       = ! empty( $background['slideImage'] ) && is_array( $background['slideImage'] ) && count( $background['slideImage'] ) > 0;
		$is_bg_animated     = $this->is_animation_active( $background_animated );
		$is_bg_effect       = ! empty( $background_effect ) && isset( $background_effect['type'] ) && 'none' !== $background_effect['type'];
		$is_sticky          = $this->is_sticky( $sticky );
		$is_video_bg        = isset( $background['backgroundType'] ) && 'video' === $background['backgroundType'] && ! empty( $background['videoUrl'] );
		$is_cursor_effect   = ! empty( $cursor_effect['show'] );
		$is_top_div_anim    = ! empty( $top_divider_animated ) && isset( $top_divider_animated['type'] ) && 'none' !== $top_divider_animated['type'];
		$is_bottom_div_anim = ! empty( $bottom_divider_animated ) && isset( $bottom_divider_animated['type'] ) && 'none' !== $bottom_divider_animated['type'];

		$using_featured = false;
		if ( ! empty( $background['useFeaturedImage'] ) && is_array( $background['useFeaturedImage'] ) ) {
			foreach ( $background['useFeaturedImage'] as $val ) {
				if ( $val ) {
					$using_featured = true;
					break;
				}
			}
		}

		// Build classes.
		$classes = array(
			'guten-element',
			'guten-flex-container',
			$container_layout,
			$element_id,
		);

		if ( ! empty( $custom_classes ) ) {
			$classes[] = $custom_classes;
		}

		if ( $is_bg_animated ) {
			$classes[] = 'background-animated';
		}
		if ( $is_slideshow ) {
			$classes[] = 'guten-background-slideshow';
		}
		if ( $is_video_bg ) {
			$classes[] = 'guten-video-background';
		}
		if ( $is_cursor_effect ) {
			$classes[] = 'guten-cursor-effect';
		}
		if ( $is_bg_effect ) {
			$classes[] = 'guten-background-effect-active';
		}
		if ( $is_sticky ) {
			$classes[] = 'guten-sticky';
			$classes[] = 'sticky-' . $sticky_position;
		}
		if ( $using_featured ) {
			$classes[] = 'guten-using-featured-image';
		}

		$class_name = trim( implode( ' ', array_filter( $classes ) ) . $animation_class . $display_classes );

		// Data ID.
		$data_id  = '';
		$id_parts = explode( '-', $element_id );
		if ( count( $id_parts ) > 1 ) {
			$data_id = $id_parts[1];
		}

		// Advance animation data.
		$adv_anim_attr = '';
		if ( isset( $attributes['advanceAnimation']['type'] ) && ! empty( $attributes['advanceAnimation']['type'] ) ) {
			$adv_anim_attr = ' data-id="' . esc_attr( $data_id ) . '"';
		}

		// Anchor/ID.
		$id_attr = ! empty( $anchor ) ? ' id="' . esc_attr( $anchor ) . '"' : '';

		// Allowed HTML tags.
		$allowed_tags = array( 'div', 'header', 'footer', 'main', 'article', 'section', 'aside', 'nav' );
		if ( ! in_array( $html_tag, $allowed_tags, true ) ) {
			$html_tag = 'div';
		}

		// Build output.
		$output = '<' . $html_tag . ' class="' . esc_attr( $class_name ) . '" data-id="' . esc_attr( $data_id ) . '"' . $adv_anim_attr . $id_attr . '>';

		// Fluid canvas.
		$output .= apply_filters( 'gutenverse_fluid_canvas_script', '', $attributes );

		// Guten data.
		$has_data = $is_sticky || $is_bg_animated || $is_slideshow || $is_top_div_anim || $is_bottom_div_anim;
		if ( $has_data ) {
			$output .= '<div class="guten-data">';
			if ( $is_sticky ) {
				$sticky_data = wp_json_encode(
					array(
						'sticky'         => $sticky,
						'stickyShowOn'   => $sticky_show_on,
						'stickyPosition' => $sticky_position,
						'stickyEase'     => $sticky_ease,
						'stickyDuration' => $sticky_duration,
						'topSticky'      => $top_sticky,
						'bottomSticky'   => $bottom_sticky,
					)
				);
				$output     .= '<div data-var="stickyData' . esc_attr( $data_id ) . '" data-value="' . esc_attr( $sticky_data ) . '"></div>';
			}
			if ( $is_bg_animated ) {
				$output .= '<div data-var="bgAnimatedData' . esc_attr( $data_id ) . '" data-value="' . esc_attr( wp_json_encode( $background_animated ) ) . '"></div>';
			}
			if ( $is_top_div_anim ) {
				$output .= '<div data-var="topDividerAnimatedData' . esc_attr( $data_id ) . '" data-value="' . esc_attr( wp_json_encode( $top_divider_animated ) ) . '"></div>';
			}
			if ( $is_bottom_div_anim ) {
				$output .= '<div data-var="bottomDividerAnimatedData' . esc_attr( $data_id ) . '" data-value="' . esc_attr( wp_json_encode( $bottom_divider_animated ) ) . '"></div>';
			}
			if ( $is_slideshow ) {
				$output .= '<div data-var="backgroundSlideshow' . esc_attr( $data_id ) . '" data-value="' . esc_attr( wp_json_encode( $background ) ) . '"></div>';
			}
			$output .= '</div>';
		}

		// Background animated layer.
		if ( $is_bg_animated ) {
			$slide_elements = $is_slideshow ? apply_filters( 'gutenverse_background_slideshow', '', $attributes, $element_id ) : '';
			$output        .= '<div class="guten-background-animated"><div class="animated-layer animated-' . esc_attr( $data_id ) . '">' . $slide_elements . '</div></div>';
		}

		// Slideshow (without bg animated).
		if ( ! $is_bg_animated && $is_slideshow ) {
			$output .= apply_filters( 'gutenverse_background_slideshow', '', $attributes, $element_id );
		}

		// Background effect.
		if ( $is_bg_effect ) {
			$output .= '<div class="guten-background-effect"><div class="inner-background-container"></div></div>';
		}
		// Video background.
		if ( $is_video_bg ) {
			$output .= apply_filters( 'gutenverse_video_background', '', $attributes, $element_id );
		}

		// Background overlay.
		if ( ! empty( $background_overlay ) || ! empty( $background_overlay_hover ) ) {
			$output .= '<div class="guten-background-overlay"></div>';
		}

		// Shape dividers.
		if ( ! empty( $top_divider ) ) {
			$output .= $this->render_section_divider( 'top', $top_divider );
		}

		if ( ! empty( $bottom_divider ) ) {
			$output .= $this->render_section_divider( 'bottom', $bottom_divider );
		}

		// Animated dividers.
		if ( $is_top_div_anim ) {
			$output .= $this->render_animated_divider( 'top', $top_divider_animated );
		}
		if ( $is_bottom_div_anim ) {
			$output .= $this->render_animated_divider( 'bottom', $bottom_divider_animated );
		}

		// Inner content.
		$output .= $this->render_content();

		$output .= '</' . $html_tag . '>';

		$output = apply_filters( 'gutenverse_cursor_move_effect_script', $output, $attributes, $element_id );
		$output = apply_filters( 'gutenverse_cursor_effect_script', $output, $attributes, $element_id );
		$output = apply_filters( 'gutenverse_background_effect_script', $output, $attributes, $element_id );
		$output = apply_filters( 'gutenverse_advance_animation_script', $output, $attributes, $element_id, 'container' );

		return $output;
	}
}
