<?php
/**
 * Section Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-framework\block
 */

namespace Gutenverse\Framework\Block;

/**
 * Class Section Block
 *
 * @package gutenverse-framework\block
 */
class Section extends Block_Abstract {

	/**
	 * Check if sticky is active.
	 *
	 * @param array $sticky Sticky attribute.
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
	 * @param array $animation Background animated attribute.
	 * @return bool
	 */
	private function is_animation_active( $animation ) {
		return ! empty( $animation ) && isset( $animation['actions'] ) && is_array( $animation['actions'] ) && count( $animation['actions'] ) > 0;
	}

	/**
	 * Check if value is empty (mirrors JS isEmptyValue).
	 *
	 * @param mixed $value Value to check.
	 * @return bool
	 */
	private function is_empty_value( $value ) {
		if ( empty( $value ) ) {
			return true;
		}
		if ( is_array( $value ) && isset( $value['type'] ) && 'variable' === $value['type'] ) {
			return true;
		}
		return false;
	}

	/**
	 * Get data ID from element ID.
	 *
	 * @return string
	 */
	private function get_data_id() {
		$element_id = $this->get_element_id();
		$parts      = explode( '-', $element_id );
		return isset( $parts[1] ) ? $parts[1] : '';
	}

	/**
	 * Render advance animation data attributes.
	 *
	 * @return string
	 */
	private function render_advance_animation_data() {
		if ( isset( $this->attributes['advanceAnimation']['type'] ) && ! empty( $this->attributes['advanceAnimation']['type'] ) ) {
			$data_id = $this->get_data_id();
			if ( ! empty( $data_id ) ) {
				return ' data-id="' . esc_attr( $data_id ) . '"';
			}
		}
		return '';
	}

	/**
	 * Render guten-data div with JSON data attributes.
	 *
	 * @param string $data_id       Data ID.
	 * @param bool   $is_sticky     Is sticky active.
	 * @param bool   $is_bg_animated Is background animated active.
	 * @param bool   $is_top_div_animated Is top divider animated.
	 * @param bool   $is_bottom_div_animated Is bottom divider animated.
	 * @param bool   $is_slideshow  Is slideshow active.
	 * @return string
	 */
	private function render_guten_data( $data_id, $is_sticky, $is_bg_animated, $is_top_div_animated, $is_bottom_div_animated, $is_slideshow ) {
		if ( ! $is_sticky && ! $is_bg_animated && ! $is_top_div_animated && ! $is_bottom_div_animated && ! $is_slideshow ) {
			return '';
		}

		$output = '<div class="guten-data">';

		$json_flags = JSON_UNESCAPED_SLASHES;

		if ( $is_sticky ) {
			$sticky_data = array(
				'sticky'         => isset( $this->attributes['sticky'] ) ? $this->attributes['sticky'] : new \stdClass(),
				'stickyShowOn'   => isset( $this->attributes['stickyShowOn'] ) ? $this->attributes['stickyShowOn'] : 'both',
				'stickyPosition' => isset( $this->attributes['stickyPosition'] ) ? $this->attributes['stickyPosition'] : 'top',
				'stickyEase'     => isset( $this->attributes['stickyEase'] ) ? $this->attributes['stickyEase'] : 'none',
				'stickyDuration' => isset( $this->attributes['stickyDuration'] ) ? $this->attributes['stickyDuration'] : 0.25,
				'topSticky'      => isset( $this->attributes['topSticky'] ) ? $this->attributes['topSticky'] : new \stdClass(),
				'bottomSticky'   => isset( $this->attributes['bottomSticky'] ) ? $this->attributes['bottomSticky'] : new \stdClass(),
			);
			$output     .= '<div data-var="stickyData' . esc_attr( $data_id ) . '" data-value="' . esc_attr( wp_json_encode( $sticky_data, $json_flags ) ) . '"></div>';
		}

		if ( $is_bg_animated ) {
			$bg_animated = isset( $this->attributes['backgroundAnimated'] ) ? $this->attributes['backgroundAnimated'] : new \stdClass();
			$output     .= '<div data-var="bgAnimatedData' . esc_attr( $data_id ) . '" data-value="' . esc_attr( wp_json_encode( $bg_animated, $json_flags ) ) . '"></div>';
		}

		if ( $is_top_div_animated ) {
			$top_div_animated = isset( $this->attributes['topDividerAnimated'] ) ? $this->attributes['topDividerAnimated'] : new \stdClass();
			$output          .= '<div data-var="topDividerAnimatedData' . esc_attr( $data_id ) . '" data-value="' . esc_attr( wp_json_encode( $top_div_animated, $json_flags ) ) . '"></div>';
		}

		if ( $is_bottom_div_animated ) {
			$bottom_div_animated = isset( $this->attributes['bottomDividerAnimated'] ) ? $this->attributes['bottomDividerAnimated'] : new \stdClass();
			$output             .= '<div data-var="bottomDividerAnimatedData' . esc_attr( $data_id ) . '" data-value="' . esc_attr( wp_json_encode( $bottom_div_animated, $json_flags ) ) . '"></div>';
		}

		if ( $is_slideshow ) {
			$background  = isset( $this->attributes['background'] ) ? $this->attributes['background'] : array();
			$slide_image = isset( $background['slideImage'] ) ? $background['slideImage'] : array();
			$slide_data  = $background;
			unset( $slide_data['slideImage'] );
			$slide_data['slideLength'] = is_array( $slide_image ) ? count( $slide_image ) : 0;
			$output                   .= '<div data-var="backgroundSlideshow' . esc_attr( $data_id ) . '" data-value="' . esc_attr( wp_json_encode( $slide_data, $json_flags ) ) . '"></div>';
		}

		$output .= '</div>';

		return $output;
	}

	/**
	 * Render slideshow elements.
	 *
	 * @return string
	 */
	private function render_slide_elements() {
		$background  = isset( $this->attributes['background'] ) ? $this->attributes['background'] : array();
		$slide_image = isset( $background['slideImage'] ) ? $background['slideImage'] : array();
		$element_id  = $this->get_element_id();

		if ( empty( $slide_image ) || ! is_array( $slide_image ) ) {
			return '';
		}

		$output  = '<div class="bg-slideshow-container">';
		$output .= '<div class="bg-slideshow-item">';

		foreach ( $slide_image as $index => $image ) {
			$image_url = '';
			if ( isset( $image['image']['image'] ) && ! empty( $image['image']['image'] ) ) {
				$image_url = $image['image']['image'];
			}

			$slide_class = $element_id . '-slideshow-image slideshow-image';
			if ( 1 === $index ) {
				$slide_class .= ' current';
			} elseif ( 0 === $index ) {
				$slide_class .= ' previous';
			}

			$style_attr = ! empty( $image_url ) ? ' style="background-image: url(' . esc_url( $image_url ) . ')"' : '';

			$output .= '<div class="' . esc_attr( $element_id . '-child-slideshow slideshow-item-container item-' . $index ) . '">';
			$output .= '<div class="' . esc_attr( $slide_class ) . '"' . $style_attr . '></div>';
			$output .= '</div>';
		}

		$output .= '</div>';
		$output .= '</div>';

		return $output;
	}

	/**
	 * Render video background container.
	 *
	 * @return string
	 */
	private function render_video_container() {
		$background = isset( $this->attributes['background'] ) ? $this->attributes['background'] : array();

		if ( ! isset( $background['type'] ) || 'video' !== $background['type'] ) {
			return '';
		}

		$video_link = isset( $background['videoLink'] ) ? $background['videoLink'] : '';

		if ( empty( $video_link ) ) {
			return '';
		}

		$player_vars = array(
			'showinfo' => 0,
		);

		$video_start = ! empty( $background['videoStartTime'] ) ? intval( $background['videoStartTime'] ) : 0;
		$video_end   = ! empty( $background['videoEndTime'] ) ? intval( $background['videoEndTime'] ) : 0;

		if ( $video_start > 0 ) {
			$player_vars['start'] = $video_start;
		}

		if ( $video_end > 0 ) {
			$player_vars['end'] = $video_end;
		}

		$config = (object) array(
			'youtube' => (object) array(
				'playerVars' => (object) $player_vars,
			),
		);

		$data_properties = (object) array(
			'url'         => $video_link,
			'class'       => 'guten-video-bg-wrapper' . ( ! empty( $background['videoPlayOnMobile'] ) ? ' show-phone' : '' ),
			'width'       => '100%',
			'height'      => '100%',
			'playing'     => true,
			'muted'       => true,
			'loop'        => ! ( isset( $background['videoPlayOnce'] ) && $background['videoPlayOnce'] ),
			'playsinline' => true,
			'style'       => (object) array(
				'zIndex'        => 0,
				'top'           => 0,
				'left'          => 0,
				'position'      => 'absolute',
				'overflow'      => 'hidden',
				'pointerEvents' => 'none',
			),
			'config'      => $config,
		);

		return '<div class="guten-video-background" data-property="' . esc_attr( wp_json_encode( $data_properties, JSON_UNESCAPED_SLASHES ) ) . '"></div>';
	}

	/**
	 * Render gradient SVG element.
	 *
	 * @param string $id             Gradient ID.
	 * @param array  $gradient_color Gradient color stops.
	 * @param mixed  $gradient_angle Gradient angle.
	 * @return string
	 */
	private function render_gradient_svg( $id, $gradient_color, $gradient_angle = null ) {
		if ( empty( $gradient_color ) || ! is_array( $gradient_color ) ) {
			return '';
		}

		$stops = '';
		foreach ( $gradient_color as $color_stop ) {
			$color  = isset( $color_stop['color'] ) ? $color_stop['color'] : '#000';
			$offset = isset( $color_stop['offset'] ) ? ( floatval( $color_stop['offset'] ) * 100 ) : 0;
			$stops .= '<stop style="stop-color:' . esc_attr( $color ) . '" offset="' . esc_attr( $offset ) . '%"></stop>';
		}

		$transform = '';
		if ( $gradient_angle ) {
			$transform = ' gradientTransform="rotate(' . esc_attr( $gradient_angle ) . ')"';
		}

		return '<linearGradient id="' . esc_attr( $id ) . '"' . $transform . '>' . $stops . '</linearGradient>';
	}

	/**
	 * Render shape divider SVG based on type.
	 *
	 * @param string $id       Divider ID.
	 * @param string $type     Divider type.
	 * @param bool   $invert   Invert divider.
	 * @param bool   $gradient Use gradient.
	 * @param array  $props    Additional properties.
	 * @return string
	 */
	private function render_shape_divider_svg( $id, $type, $invert, $gradient, $props ) {
		$gradient_color  = isset( $props['gradientColor'] ) ? $props['gradientColor'] : array();
		$gradient_angle  = isset( $props['gradientAngle'] ) ? $props['gradientAngle'] : null;
		$gradient_color2 = isset( $props['gradientColor2'] ) ? $props['gradientColor2'] : array();
		$gradient_angle2 = isset( $props['gradientAngle2'] ) ? $props['gradientAngle2'] : null;
		$gradient_color3 = isset( $props['gradientColor3'] ) ? $props['gradientColor3'] : array();
		$gradient_angle3 = isset( $props['gradientAngle3'] ) ? $props['gradientAngle3'] : null;

		switch ( $type ) {
			case 'arrow':
				return $this->render_single_path_svg( $id, '0 0 1200 10', '1200', '10', $invert ? 'M 0,10 V 0 H 600 L 590,10 Z M 600,0 h 600 V 10 H 610 Z' : 'm600 10-10-10h20z', $gradient, $gradient_color, $gradient_angle );

			case 'curve':
				return $this->render_single_path_svg( $id, '0 0 1200 100', '1200', '100', $invert ? 'M 0,100 V 0 H 600 C 339.74,0 113.72,40.53 0,100 Z M 600,0 h 600 V 100 C 1086.28,40.53 860.26,0 600,0 Z' : 'm1200 0c-113.72 59.47-339.74 100-600 100s-486.28-40.53-600-100z', $gradient, $gradient_color, $gradient_angle );

			case 'curve_a1':
				return $this->render_triple_layer_svg( $id, '0 0 1200 165', '1200', '165', 'm1200 0v16c-163.37 62.074-429.49 110-730 110-172.25 0-333.2-13.229-470-36.2919v-89.7081z', 'm1200 0v16c-163.37 52.221-429.49 90-730 90-172.25 0-333.2-11.1293-470-30.5313v-75.4687z', 'm1200 0v16c-163.37 42.23-429.49 69.72-730 69.72-172.25 0-333.2-9-470-24.69v-61.03z', $gradient, $gradient_color, $gradient_angle, $gradient_color2, $gradient_angle2, $gradient_color3, $gradient_angle3 );

			case 'curve_a2':
				return $this->render_single_path_svg( $id, '0 0 1200 86', '1200', '86', $invert ? 'M 1200,70 C 1036.63,27.77 770.51,0.279297 470,0.279297 297.75,0.279297 136.8,9.280703 0,24.970703 V 0 h 1200 z' : 'm1200 0v16c-163.37 42.23-429.49 69.72-730 69.72-172.25 0-333.2-9-470-24.69v-61.03z', $gradient, $gradient_color, $gradient_angle );

			case 'curve_n':
				return $this->render_triple_layer_svg( $id, '0 0 1200 188', '1200', '188', 'm1200 0v27.1567c-13.33-.0847-26.7-.1271-40.1-.1271-555.19 0-1022.39 68.2793-1159.9 160.9704v-188z', 'm1200 0v24.2677c-13.33-.0757-26.7-.1136-40.1-.1136-555.19 0-1022.39 61.0155-1159.9 143.8459v-168z', 'm1200 0v21.37c-13.33-.0667-26.7-.1-40.1-.1-555.19 0-1022.39 53.73-1159.9 126.67v-147.94z', $gradient, $gradient_color, $gradient_angle, $gradient_color2, $gradient_angle2, $gradient_color3, $gradient_angle3 );

			case 'curve_o':
				return $this->render_curve_opacity_svg( $id, $invert, $gradient, $gradient_color, $gradient_angle, $gradient_color2, $gradient_angle2, $gradient_color3, $gradient_angle3 );

			case 'mountain':
				return $this->render_single_path_svg( $id, '0 0 1200 208', '1200', '208', $invert ? 'M 1200,180 900,36 600,144 300,36 0,0 h 1200 z' : 'm0 208 300-36 300-108 300 108 300-144v-28h-300-300-300-300z', $gradient, $gradient_color, $gradient_angle );

			case 'mountain_o':
				return $this->render_mountain_opacity_svg( $id, $invert, $gradient, $gradient_color, $gradient_angle, $gradient_color2, $gradient_angle2, $gradient_color3, $gradient_angle3 );

			case 'papertear':
				return $this->render_papertear_svg( $id, $invert, $gradient, $gradient_color, $gradient_angle );

			case 'split':
				return $this->render_single_path_svg( $id, '0 0 1200 50', '1200', '50', 'm650 0c-13.261 0-25.978 5.26784-35.355 14.6447-9.377 9.3768-14.645 22.0945-14.645 35.3553-.029-13.2418-5.31-25.9312-14.683-35.2843-9.374-9.35299-22.075-14.605732-35.317-14.6057v-.11z', $gradient, $gradient_color, $gradient_angle );

			case 'split_n':
				return $this->render_split_negative_svg( $id, $gradient, $gradient_color, $gradient_angle );

			case 'tilt':
				return $this->render_single_path_svg( $id, '0 0 1200 111', '1200', '111', 'M1200 0V5.61L0 110.59V0H1200Z', $gradient, $gradient_color, $gradient_angle );

			case 'tilt_g':
				return $this->render_tilt_gradient_svg( $id, $gradient, $gradient_color, $gradient_angle, $gradient_color2, $gradient_angle2, $gradient_color3, $gradient_angle3 );

			case 'triangle':
				return $this->render_triangle_svg( $id, $gradient, $gradient_color, $gradient_angle, $gradient_color2, $gradient_angle2, $gradient_color3, $gradient_angle3 );

			case 'triangle_2':
				return $this->render_single_path_svg( $id, '0 0 1200 100', '1200', '100', 'm600 100-600-100h1200z', $gradient, $gradient_color, $gradient_angle );

			case 'triangle_3':
				return $this->render_single_path_svg( $id, '0 0 1200 100', '1200', '100', $invert ? 'M 0,100 V 0 H 376 Z M 376,0 h 824 v 100 z' : 'm376 100-376-100h1200z', $gradient, $gradient_color, $gradient_angle );

			case 'triangle_o':
				return $this->render_triple_layer_svg( $id, '0 0 1200 100', '1200', '100', 'm1200 0h-1200v40l376 60 824-60z', 'm1200 0h-1200v20l376 80 824-80z', 'm376 100-376-100h1200z', $gradient, $gradient_color, $gradient_angle, $gradient_color2, $gradient_angle2, $gradient_color3, $gradient_angle3 );

			case 'triangle_n':
				return $this->render_single_path_svg( $id, '0 0 1200 100', '1200', '100', 'm1200 0v100l-600-95-600 95v-100z', $gradient, $gradient_color, $gradient_angle );

			case 'triangle_n_o':
				return $this->render_triple_layer_svg( $id, '0 0 1200 100', '1200', '100', 'm1200 0v100l-600-95-600 95v-100z', 'm1200 0v80l-600-75-600 75v-80z', 'm1200 0v60l-600-55-600 55v-60z', $gradient, $gradient_color, $gradient_angle, $gradient_color2, $gradient_angle2, $gradient_color3, $gradient_angle3 );

			case 'waves':
				return $this->render_single_path_svg_with_clip_rule( $id, '0 0 1200 143', '1200', '143', $invert ? 'm 1167.0001,143 c -34,0 -100,-6.3e-4 -167,-27.97892 C 933.00001,87.042746 867,31.087613 800,10.103956 733.00001,-10.879706 667.00001,3.1082614 600,31.086478 532.99999,59.064801 467,101.03387 400,122.01753 c -67,20.98379 -133,20.98379 -200,0 C 133,101.03387 67,59.064422 33,38.080645 L 0,17.098123 V 0 h 1200 v 143 z' : 'm1200 20.0467h-33c-34 0-100 0-167 24.0561s-133 72.1682-200 90.2102-133 6.014-200-18.042c-67-24.0561-133-60.1402-200-78.1822-67-18.0421-133-18.0421-200 0-67 18.042-133 54.1261-167 72.1682l-33 18.042v-128.299h1200z', $gradient, $gradient_color, $gradient_angle );

			case 'waves_2':
				return $this->render_single_path_svg( $id, '0 0 1200 191', '1200', '191', $invert ? 'm 1200,174 -50,-18 C 1100,138 1000,102 900,90 855.556,84.667 811.11197,84.07347 766.66797,83.48047 711.11197,82.74047 655.556,82 600,72 561.538,65.077 523.07723,53.71647 484.61523,42.35547 423.07723,24.17847 361.538,6 300,6 200,6 100,54 50,78 L 0,102 V 0 h 1200 z' : 'm1200 0h-1200v89l50 24c50 24 150 72 250 72 61.538 0 123.077-18.178 184.615-36.355 38.462-11.361 76.923-22.722 115.385-29.645 55.556-10 111.111-10.741 166.667-11.481 44.444-.593 88.889-1.186 133.333-6.519 100-12 200-48 250-66l50-18z', $gradient, $gradient_color, $gradient_angle );

			case 'waves_o1':
				return $this->render_waves_o1_svg( $id, $invert, $gradient, $gradient_color, $gradient_angle, $gradient_color2, $gradient_angle2, $gradient_color3, $gradient_angle3 );

			case 'waves_o2':
				return $this->render_waves_o2_svg( $id, $invert, $gradient, $gradient_color, $gradient_angle, $gradient_color2, $gradient_angle2, $gradient_color3, $gradient_angle3 );

			case 'waves_o3':
				return $this->render_waves_o3_svg( $id, $invert, $gradient, $gradient_color, $gradient_angle, $gradient_color2, $gradient_angle2, $gradient_color3, $gradient_angle3 );

			case 'zigzag':
				return $this->render_zigzag_svg( $id, $gradient, $gradient_color, $gradient_angle );

			default:
				return '';
		}
	}

	/**
	 * Render single path SVG.
	 *
	 * @param string $id             Gradient ID.
	 * @param string $viewbox        ViewBox attribute.
	 * @param string $width          Width.
	 * @param string $height         Height.
	 * @param string $d              Path data.
	 * @param bool   $gradient       Use gradient.
	 * @param array  $gradient_color Gradient color stops.
	 * @param mixed  $gradient_angle Gradient angle.
	 * @return string
	 */
	private function render_single_path_svg( $id, $viewbox, $width, $height, $d, $gradient, $gradient_color, $gradient_angle ) {
		$fill = ( $gradient && ! empty( $gradient_color ) ) ? 'url(#' . esc_attr( $id ) . ')' : '#000';
		// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- SVG path data is hardcoded.
		$svg  = '<svg class="guten-shape-fill" viewBox="' . esc_attr( $viewbox ) . '" preserveAspectRatio="none" fill="none" height="' . esc_attr( $height ) . '" width="' . esc_attr( $width ) . '" xmlns="http://www.w3.org/2000/svg">';
		$svg .= '<path d="' . $d . '" fill="' . esc_attr( $fill ) . '"/>';
		if ( $gradient && ! empty( $gradient_color ) ) {
			$svg .= $this->render_gradient_svg( $id, $gradient_color, $gradient_angle );
		}
		$svg .= '</svg>';
		return $svg;
	}

	/**
	 * Render single path SVG with clip rule.
	 *
	 * @param string $id             Gradient ID.
	 * @param string $viewbox        ViewBox attribute.
	 * @param string $width          Width.
	 * @param string $height         Height.
	 * @param string $d              Path data.
	 * @param bool   $gradient       Use gradient.
	 * @param array  $gradient_color Gradient color stops.
	 * @param mixed  $gradient_angle Gradient angle.
	 * @return string
	 */
	private function render_single_path_svg_with_clip_rule( $id, $viewbox, $width, $height, $d, $gradient, $gradient_color, $gradient_angle ) {
		$fill = ( $gradient && ! empty( $gradient_color ) ) ? 'url(#' . esc_attr( $id ) . ')' : '#000';
		$svg  = '<svg fill="none" height="' . esc_attr( $height ) . '" class="guten-shape-fill" viewBox="' . esc_attr( $viewbox ) . '" preserveAspectRatio="none" width="' . esc_attr( $width ) . '" xmlns="http://www.w3.org/2000/svg">';
		// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- SVG path data is hardcoded.
		$svg .= '<path clip-rule="evenodd" d="' . $d . '" fill-rule="evenodd" fill="' . esc_attr( $fill ) . '"/>';
		if ( $gradient && ! empty( $gradient_color ) ) {
			$svg .= $this->render_gradient_svg( $id, $gradient_color, $gradient_angle );
		}
		$svg .= '</svg>';
		return $svg;
	}

	/**
	 * Render triple layer SVG (for shapes with 3 opacity layers).
	 *
	 * @param string $id              Gradient ID.
	 * @param string $viewbox         ViewBox attribute.
	 * @param string $width           Width.
	 * @param string $height          Height.
	 * @param string $d1              Path data layer 1.
	 * @param string $d2              Path data layer 2.
	 * @param string $d3              Path data layer 3.
	 * @param bool   $gradient        Use gradient.
	 * @param array  $gradient_color  Gradient color stops.
	 * @param mixed  $gradient_angle  Gradient angle.
	 * @param array  $gradient_color2 Gradient color stops 2.
	 * @param mixed  $gradient_angle2 Gradient angle 2.
	 * @param array  $gradient_color3 Gradient color stops 3.
	 * @param mixed  $gradient_angle3 Gradient angle 3.
	 * @return string
	 */
	private function render_triple_layer_svg( $id, $viewbox, $width, $height, $d1, $d2, $d3, $gradient, $gradient_color, $gradient_angle, $gradient_color2, $gradient_angle2, $gradient_color3, $gradient_angle3 ) {
		$svg = '<svg fill="none" height="' . esc_attr( $height ) . '" class="guten-shape-fill" viewBox="' . esc_attr( $viewbox ) . '" preserveAspectRatio="none" width="' . esc_attr( $width ) . '" xmlns="http://www.w3.org/2000/svg">';

		if ( $gradient ) {
			$fill1 = ! empty( $gradient_color ) ? 'url(#' . esc_attr( $id ) . ')' : '#00000044';
			$fill2 = ! empty( $gradient_color2 ) ? 'url(#' . esc_attr( $id ) . '-2)' : '#00000088';
			$fill3 = ! empty( $gradient_color3 ) ? 'url(#' . esc_attr( $id ) . '-3)' : '#000';
			// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- SVG path data is hardcoded.
			$svg .= '<g>';
			$svg .= '<path d="' . $d1 . '" opacity=".25" fill="' . esc_attr( $fill1 ) . '"/>';
			$svg .= '<path d="' . $d2 . '" opacity=".5" fill="' . esc_attr( $fill2 ) . '"/>';
			$svg .= '<path d="' . $d3 . '" fill="' . esc_attr( $fill3 ) . '"/>';
			$svg .= '</g>';
			if ( ! empty( $gradient_color ) ) {
				$svg .= $this->render_gradient_svg( $id, $gradient_color, $gradient_angle );
			}
			if ( ! empty( $gradient_color2 ) ) {
				$svg .= $this->render_gradient_svg( $id . '-2', $gradient_color2, $gradient_angle2 );
			}
			if ( ! empty( $gradient_color3 ) ) {
				$svg .= $this->render_gradient_svg( $id . '-3', $gradient_color3, $gradient_angle3 );
			}
		} else {
			$svg .= '<g fill="#000">';
			// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- SVG path data is hardcoded.
			$svg .= '<path d="' . $d1 . '" opacity=".25"/>';
			$svg .= '<path d="' . $d2 . '" opacity=".5"/>';
			$svg .= '<path d="' . $d3 . '"/>';
			$svg .= '</g>';
		}

		$svg .= '</svg>';
		return $svg;
	}

	/**
	 * Render curve opacity SVG.
	 *
	 * @param string $id              Gradient ID.
	 * @param bool   $invert          Invert.
	 * @param bool   $gradient        Use gradient.
	 * @param array  $gradient_color  Gradient color stops.
	 * @param mixed  $gradient_angle  Gradient angle.
	 * @param array  $gradient_color2 Gradient color stops 2.
	 * @param mixed  $gradient_angle2 Gradient angle 2.
	 * @param array  $gradient_color3 Gradient color stops 3.
	 * @param mixed  $gradient_angle3 Gradient angle 3.
	 * @return string
	 */
	private function render_curve_opacity_svg( $id, $invert, $gradient, $gradient_color, $gradient_angle, $gradient_color2, $gradient_angle2, $gradient_color3, $gradient_angle3 ) {
		if ( $invert ) {
			$d1 = 'M 0,100 V 0 H 1200 V 100 C 1086.28,64.318 860.26,40 600,40 339.74,40 113.72,64.318 0,100 Z';
			$d2 = 'M 0,100 V 0 H 1200 V 100 C 1086.28,52.424 860.26,20 600,20 339.74,20 113.72,52.424 0,100 Z';
			$d3 = 'M 0,100 V 0 H 600 C 339.74,0 113.72,40.53 0,100 Z M 600,0 h 600 V 100 C 1086.28,40.53 860.26,0 600,0 Z';
		} else {
			$d1 = 'm1200 0c-113.72 59.47-339.74 100-600 100s-486.28-40.53-600-100z';
			$d2 = 'm1200 0c-113.72 47.576-339.74 80-600 80s-486.28-32.424-600-80z';
			$d3 = 'm1200 0c-113.72 35.682-339.74 60-600 60s-486.28-24.318-600-60z';
		}

		return $this->render_triple_layer_svg( $id, '0 0 1200 100', '1200', '100', $d1, $d2, $d3, $gradient, $gradient_color, $gradient_angle, $gradient_color2, $gradient_angle2, $gradient_color3, $gradient_angle3 );
	}

	/**
	 * Render mountain opacity SVG.
	 *
	 * @param string $id              Gradient ID.
	 * @param bool   $invert          Invert.
	 * @param bool   $gradient        Use gradient.
	 * @param array  $gradient_color  Gradient color stops.
	 * @param mixed  $gradient_angle  Gradient angle.
	 * @param array  $gradient_color2 Gradient color stops 2.
	 * @param mixed  $gradient_angle2 Gradient angle 2.
	 * @param array  $gradient_color3 Gradient color stops 3.
	 * @param mixed  $gradient_angle3 Gradient angle 3.
	 * @return string
	 */
	private function render_mountain_opacity_svg( $id, $invert, $gradient, $gradient_color, $gradient_angle, $gradient_color2, $gradient_angle2, $gradient_color3, $gradient_angle3 ) {
		if ( $invert ) {
			$d1 = 'M 1200,230 900,86 600,194 300,86 0,50 V 0 h 1200 z';
			$d2 = 'M 1200,230 904,63.5 600,194 300,63.5 0,20 V 0 h 1200 z';
			$d3 = 'M 1200,230 909,44.5 600,194 301,43.5 0,0 h 1200 z';
		} else {
			$d1 = 'm0 258 301-43.5 299-150.5 309 149.5 291-185.5v-28h-1200z';
			$d2 = 'm0 238 300-43.5 300-130.5 304 130.5 296-166.5v-28h-1200z';
			$d3 = 'm0 208 300-36 300-108 300 108 300-144v-28h-300-300-300-300z';
		}

		$viewbox = $invert ? '0 0 1200 230' : '0 0 1200 258';
		$height  = $invert ? '230' : '258';

		return $this->render_triple_layer_svg( $id, $viewbox, '1200', $height, $d1, $d2, $d3, $gradient, $gradient_color, $gradient_angle, $gradient_color2, $gradient_angle2, $gradient_color3, $gradient_angle3 );
	}

	/**
	 * Render papertear SVG.
	 *
	 * @param string $id             Gradient ID.
	 * @param bool   $invert         Invert.
	 * @param bool   $gradient       Use gradient.
	 * @param array  $gradient_color Gradient color stops.
	 * @param mixed  $gradient_angle Gradient angle.
	 * @return string
	 */
	private function render_papertear_svg( $id, $invert, $gradient, $gradient_color, $gradient_angle ) {
		if ( $invert ) {
			// phpcs:ignore Generic.Files.LineLength.TooLong -- SVG path data.
			$d = 'M 0,51 V 50.94922 H 1199.8496 L 1200,37.058594 V 51 Z M 1038.3262,36.029297 c -1.7416,0.11375 -3.5646,-0.267969 -5.5371,-1.480469 -2.89,-1 -7.57,0.580391 -10,-1.849609 -4.14,-4 -9.89,-4.721407 -14.5,-7.691407 -3.44,-2.219999 -6.9389,-3.058984 -10.12894,0.541016 -0.72,0.81 -1.68055,0.660078 -2.56055,0.580078 -3.553,-0.235 -7.11692,-0.235 -10.66992,0 -5.31,1.07 -9.76891,-3.320468 -15.12891,-1.480468 -3.44,0.67 -6.72164,2.250078 -10.43164,1.080078 -3.22,-0.47 -6.26851,5.999609 -9.22852,1.349609 -3.05999,-2.89 -7.93124,-2.289766 -11.78124,-3.509766 -2.08001,-0.44 -3.99938,-0.86 -5.85938,1 -1.49,1.42 -3.63086,0.729922 -5.13086,-0.330078 -9.93,-7.13 -14.94,9.88 -32,5.25 -3.47,-0.74 -6.99859,-1.349219 -10.55859,-0.199219 -5.442,-1.776199 -11.32417,-1.675037 -16.70117,0.289063 -5.59001,1.7 -11.1286,3.059609 -17.0586,1.599609 -2.74,-0.68 -5.53,0.211641 -8,1.431641 -13.21,7.6 -25.00117,-7.841797 -33.20117,-3.841797 -5.62,5.19 -9.39,-10.868437 -24,-8.898437 -6.37,0 -13.29008,2.13875 -19.08008,-1.53125 -1.05,-0.6429 -2.21855,-1.068407 -3.43555,-1.253907 -1.218,-0.1855 -2.46029,-0.127172 -3.65429,0.173828 -8.43,1.66 -16.74938,2.391563 -25.35938,0.601563 -7.39,-1.54 -14.99953,-0.281641 -22.51953,0.06836 -8.53,0.35 -11.60117,-6.209453 -16.95117,4.310547 -5.82,10.41 -12.11039,0.690547 -19.40039,-1.939453 -7.21,-3.75 -13.51828,2.770234 -20.73828,1.490234 -11.11,-2.9 -14.94008,3.999141 -22.58008,-0.380859 -5.52,-2.18 -11.00102,-7.36 -17.29102,-5 -2.46,1 -2.65015,-2.129922 -4.41015,-2.419922 -1.64,2.91 -1.54977,2.840391 -3.75977,0.150391 -4.26,-4.55 -11.06062,-0.830781 -16.14062,-3.800781 -0.175,-0.0814 -0.3656,-0.123047 -0.5586,-0.123047 -0.193,0 -0.38554,0.04165 -0.56054,0.123047 -3.49,2.1 -7.12922,1.150234 -10.69922,0.490234 -6.08,-1.14 -11.41016,13.58 -22.16016,9 -2,-0.76 -4.00133,0.09 -5.86133,1 -2.94,1.37 -5.49883,2.001094 -8.79883,-0.128906 -2.15999,-1.37 -5.67124,-0.520157 -8.53124,-0.910157 -2.86001,-0.39 -4.30907,2.420001 -6.28907,3 -11.05,5.620001 -22.21117,12.149922 -35.20117,10.419922 -1.73,-0.66 -3.61,2.13875 -5,0.21875 -4,-4.25 -9.19969,-2.810156 -13.92969,-2.660156 -6.33,1.1 -12.44867,-3.509687 -18.38867,0.07031 -5.24,2 -10.29148,-7.568438 -15.27148,-2.148438 -2.77,2.24 -7.65868,5.54961 -10.88868,2.599609 -2.87999,-2.929999 -6.75156,-4.460078 -9.85156,-7.080078 -1,-0.83 -2.04828,-1.329765 -3.23828,-0.259765 -6.44,-0.62 -13.21023,1.538437 -19.74023,-0.351563 -4.35,-1.14 -8.00125,1.880938 -12.78125,-0.789062 -7.87,-3.74 -7.86985,2.150625 -11.08985,-1.109375 -3,-3.21 -4.87867,-8.69 -10.13867,-8 -8.67,1 -17.29125,-0.400469 -25.78125,1.519531 -3.91,1.7 -1.43969,13.469063 -12.92969,7.789062 -3.67,-2.399999 -7.73945,0.671251 -11.68945,-1.21875 -6.1,-2.66 -10.07078,3.618907 -15.55078,1.378907 -0.341,-0.2091 -0.74167,-0.2972 -1.13867,-0.25 -0.397,0.0472 -0.76778,0.226565 -1.05078,0.509765 -5,4.11 -10.6911,4.360782 -16.6211,2.550782 -18.12,-8.55 -8.70937,8.000234 -29.85937,-4.759766 -8.78,-6 -15.90938,-0.229844 -24.35938,-2.589844 -2.59,-0.63 -2.52945,6.369532 -7.43945,3.269532 -0.39,-0.260001 -1.15016,-0.539375 -1.41016,-0.359376 -3.38,2.390001 -7.66007,0.08016 -11.08008,2.160157 -0.53999,0.33 -1.41117,0.369375 -1.70117,-0.140625 -1.42,-4.13 -17.33015,3.570312 -27.16015,-6.429688 -6,-4.18 -17.1886,3.05875 -25.8086,-1.78125 -4.76,-2.23 -9.70015,-1.77 -14.66015,-1 -11.55,4.49 -16.00024,-3.529062 -26.24024,-2.539062 -4.51,0.28 -7.889685,-3.789688 -12.429685,-3.679688 -1.07,0 -1.550703,-0.890703 -2.220703,-1.470703 -2.07,-1.8 -4.63,-2.869375 -7,-1.609375 -7.66,3.97 -15.830625,2.900391 -23.890625,2.900391 -3.92,-0.74 -14.779453,2 -16.439453,-2 -3,-5.59 -3.090235,-5.551407 -9.490235,-4.691407 -0.4,0.05 -0.999453,0.250313 -1.189453,0.070313 -3,-2.79 -5.13039,-0.369297 -7.40039,1.220703 -3.37,2.76 -7.1,-1.769922 -9,4.330078 -0.24,0.86 -0.999766,0.29 -1.509766,0 -4.22,-3 -9.8,0.890391 -13.25,-4.099609 C 2.64,1.959297 1.2503125,1.919375 0.0703125,2.109375 H 0 V 0 h 1200 v 23.183594 c -1.8897,-0.174264 -3.7883,5.28e-4 -5.5996,0.574218 -4.46,1 -8.9,-0.08945 -13.25,-1.189453 -5,-2.14 -10.5313,-0.310547 -15.5313,-2.310547 -12.72,-5.789999 -18.7698,5.091563 -28.5898,1.351563 -10.2,3.9 -20.6994,4.12 -30.6094,-1 -8.81,-4.21 -19.3204,7.769531 -29.4004,7.769531 -7.76,0.91 -15.4798,2.490235 -23.3398,2.240235 -5.6325,0.2625 -10.1288,5.068906 -15.3535,5.410156 z';
		} else {
			// phpcs:ignore Generic.Files.LineLength.TooLong -- SVG path data.
			$d = 'm1200.29 27.78c-1.94.1999-3.89-.0009-5.75-.59-4.46-1-8.9.09-13.25 1.19-5 2.14-10.53.31-15.53 2.31-12.72 5.79-18.77-5.09-28.59-1.35-10.2-3.9-20.7-4.12-30.61 1-8.81 4.21-19.32-7.77-29.4-7.77-7.76-.91-15.48-2.49-23.34-2.24-7.51-.35-13-8.78-20.89-3.93-2.89 1-7.57-.58-10 1.85-4.14 4-9.89 4.72-14.5 7.69-3.44 2.22-6.94 3.06-10.13-.54-.72-.81-1.68-.66-2.56-.58-3.553.235-7.117.235-10.67 0-5.31-1.07-9.77 3.32-15.13 1.48-3.44-.67-6.72-2.25-10.43-1.08-3.22.47-6.27-6-9.23-1.35-3.06 2.89-7.93 2.29-11.78 3.51-2.08.44-4 .86-5.86-1-1.49-1.42-3.63-.73-5.13.33-9.93 7.13-14.94-9.88-32-5.25-3.47.74-7 1.35-10.56.2-5.442 1.7762-11.323 1.6741-16.7-.29-5.59-1.7-11.13-3.06-17.06-1.6-2.74.68-5.53-.21-8-1.43-13.21-7.6-25 7.84-33.2 3.84-5.62-5.19-9.39 10.87-24 8.9-6.37 0-13.29-2.14-19.08 1.53-1.05.6429-2.219 1.0696-3.436 1.2551-1.218.1855-2.46.1259-3.654-.1751-8.43-1.66-16.75-2.39-25.36-.6-7.39 1.54-15 .28-22.52-.07-8.53-.35-11.6 6.21-16.95-4.31-5.82-10.41-12.11-.69-19.4 1.94-7.21 3.75-13.52-2.77-20.74-1.49-11.11 2.9-14.94-4-22.58.38-5.52 2.18-11 7.36-17.29 5-2.46-1-2.65 2.13-4.41 2.42-1.64-2.91-1.55-2.84-3.76-.15-4.26 4.55-11.06.83-16.14 3.8-.175.0814-.367.1236-.56.1236s-.385-.0422-.56-.1236c-3.49-2.1-7.13-1.15-10.7-.49-6.08 1.14-11.41-13.58-22.16-9-2 .76-4-.09-5.86-1-2.94-1.37-5.5-2-8.8.13-2.16 1.37-5.67.52-8.53.91s-4.31-2.42-6.29-3-11.05-5.62-22.21-12.15-35.2-10.42-1.73.66-3.61-2.14-5-.22-4 4.25-9.2 2.81-13.93 2.66-6.33-1.1-12.45 3.51-18.39-.07-5.24-2-10.29 7.57-15.27 2.15-2.77-2.24-7.66-5.55-10.89-2.6-2.88 2.93-6.75 4.46-9.85 7.08-1 .83-2.05 1.33-3.24.26-6.44.62-13.21-1.54-19.74.35-4.35 1.14-8-1.88-12.78.79-7.87 3.74-7.87-2.15-11.09 1.11-3 3.21-4.88 8.69-10.14 8-8.67-1-17.29.4-25.78-1.52-3.91-1.7-1.44-13.47-12.93-7.79-3.67 2.4-7.74-.67-11.69 1.22-6.1 2.66-10.07-3.62-15.55-1.38-.341.2091-.743.2972-1.14.25s-.767-.2268-1.05-.51c-5-4.11-10.69-4.36-16.62-2.55-18.12 8.55-8.71-8-29.86 4.76-8.78 6-15.91.23-24.36 2.59-2.59.63-2.53-6.37-7.44-3.27-.39.26-1.15.54-1.41.36-3.38-2.39-7.66-.08-11.08-2.16-.54-.33-1.41-.37-1.7.14-1.42 4.13-17.33-3.57-27.16 6.43-6 4.18-17.19-3.06-25.81 1.78-4.76 2.23-9.7 1.77-14.66 1-11.55-4.49-16 3.53-26.24 2.54-4.51-.28-7.89 3.79-12.43 3.68-1.07 0-1.55.89-2.22 1.47-2.07 1.8-4.63 2.87-7 1.61-7.66-3.97-15.83-2.9-23.89-2.9-3.92.74-14.78-2-16.44 2-3 5.59-3.09 5.55-9.49 4.69-.4-.05-1-.25-1.19-.07-3 2.79-5.13.37-7.4-1.22-3.37-2.76-7.1 1.77-9-4.33-.24-.86-1-.29-1.51 0-4.22 3-9.80001-.89-13.25001 4.1-.61.82-2 .86-3.18.67h-.2199998v-48.84h1200.0000098z';
		}

		return $this->render_single_path_svg( $id, '0 0 1200 51', '1200', '51', $d, $gradient, $gradient_color, $gradient_angle );
	}

	/**
	 * Render split negative SVG.
	 *
	 * @param string $id             Gradient ID.
	 * @param bool   $gradient       Use gradient.
	 * @param array  $gradient_color Gradient color stops.
	 * @param mixed  $gradient_angle Gradient angle.
	 * @return string
	 */
	private function render_split_negative_svg( $id, $gradient, $gradient_color, $gradient_angle ) {
		$d    = 'm1200 0v57.38h-1200v-57.38h550v.11c13.242-.000032 25.943 5.25271 35.317 14.6057 9.373 9.3531 14.654 22.0425 14.683 35.2843 0-13.2608 5.268-25.9785 14.645-35.3553 9.376-9.37686 22.094-14.6447 35.355-14.6447z';
		$fill = ( $gradient && ! empty( $gradient_color ) ) ? 'url(#' . esc_attr( $id ) . ')' : '#000';
		$svg  = '<svg class="guten-shape-fill" viewBox="0 0 1200 57" preserveAspectRatio="none" fill="none" height="57" width="1200" xmlns="http://www.w3.org/2000/svg" style="transform: translateX(-50%) rotate(180deg)">';
		// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- SVG path data is hardcoded.
		$svg .= '<path d="' . $d . '" fill="' . esc_attr( $fill ) . '"/>';
		if ( $gradient && ! empty( $gradient_color ) ) {
			$svg .= $this->render_gradient_svg( $id, $gradient_color, $gradient_angle );
		}
		$svg .= '</svg>';
		return $svg;
	}

	/**
	 * Render tilt gradient SVG.
	 *
	 * @param string $id              Gradient ID.
	 * @param bool   $gradient        Use gradient.
	 * @param array  $gradient_color  Gradient color stops.
	 * @param mixed  $gradient_angle  Gradient angle.
	 * @param array  $gradient_color2 Gradient color stops 2.
	 * @param mixed  $gradient_angle2 Gradient angle 2.
	 * @param array  $gradient_color3 Gradient color stops 3.
	 * @param mixed  $gradient_angle3 Gradient angle 3.
	 * @return string
	 */
	private function render_tilt_gradient_svg( $id, $gradient, $gradient_color, $gradient_angle, $gradient_color2, $gradient_angle2, $gradient_color3, $gradient_angle3 ) {
		$svg  = '<svg fill="none" height="231" class="guten-shape-fill" preserveAspectRatio="none" viewBox="0 0 1200 231" width="1200" xmlns="http://www.w3.org/2000/svg">';
		$svg .= '<linearGradient id="a" gradientUnits="userSpaceOnUse" x1="0" x2="1200" y1="115.52" y2="115.52"><stop offset="0" stop-color="#fff"/><stop offset="1"/></linearGradient>';
		$svg .= '<linearGradient id="b" gradientUnits="userSpaceOnUse" x1="0" x2="1200" y1="85.41" y2="85.41"><stop offset="0" stop-color="#ccc"/><stop offset="1" stop-color="#fff"/></linearGradient>';
		$svg .= '<clipPath id="c"><path d="m0 0h1200v231h-1200z"/></clipPath>';

		if ( $gradient ) {
			$fill1 = ! empty( $gradient_color ) ? 'url(#' . esc_attr( $id ) . ')' : 'url(#a)';
			$fill2 = ! empty( $gradient_color2 ) ? 'url(#' . esc_attr( $id ) . '-2)' : 'url(#b)';
			$fill3 = ! empty( $gradient_color3 ) ? 'url(#' . esc_attr( $id ) . '-3)' : '#fff';

			$svg .= '<g>';
			$svg .= '<path d="m1200 0v126.06l-1200 104.99v-231.05z" fill="' . esc_attr( $fill1 ) . '"/>';
			$svg .= '<path d="m1200 0v65.84l-1200 104.98v-170.82z" fill="' . esc_attr( $fill2 ) . '"/>';
			$svg .= '<path d="m1200 0v5.61l-1200 104.98v-110.59z" fill="' . esc_attr( $fill3 ) . '"/>';
			$svg .= '</g>';

			if ( ! empty( $gradient_color ) ) {
				$svg .= $this->render_gradient_svg( $id, $gradient_color, $gradient_angle );
			}
			if ( ! empty( $gradient_color2 ) ) {
				$svg .= $this->render_gradient_svg( $id . '-2', $gradient_color2, $gradient_angle2 );
			}
			if ( ! empty( $gradient_color3 ) ) {
				$svg .= $this->render_gradient_svg( $id . '-3', $gradient_color3, $gradient_angle3 );
			}
		} else {
			$svg .= '<g>';
			$svg .= '<path d="m1200 0v126.06l-1200 104.99v-231.05z" fill="url(#a)"/>';
			$svg .= '<path d="m1200 0v65.84l-1200 104.98v-170.82z" fill="url(#b)"/>';
			$svg .= '<path d="m1200 0v5.61l-1200 104.98v-110.59z" fill="#fff"/>';
			$svg .= '</g>';
		}

		$svg .= '</svg>';
		return $svg;
	}

	/**
	 * Render triangle SVG.
	 *
	 * @param string $id              Gradient ID.
	 * @param bool   $gradient        Use gradient.
	 * @param array  $gradient_color  Gradient color stops.
	 * @param mixed  $gradient_angle  Gradient angle.
	 * @param array  $gradient_color2 Gradient color stops 2.
	 * @param mixed  $gradient_angle2 Gradient angle 2.
	 * @param array  $gradient_color3 Gradient color stops 3.
	 * @param mixed  $gradient_angle3 Gradient angle 3.
	 * @return string
	 */
	private function render_triangle_svg( $id, $gradient, $gradient_color, $gradient_angle, $gradient_color2, $gradient_angle2, $gradient_color3, $gradient_angle3 ) {
		$svg = '<svg fill="none" height="100" class="guten-shape-fill" preserveAspectRatio="none" viewBox="0 0 1200 100" width="1200" xmlns="http://www.w3.org/2000/svg">';

		if ( $gradient && ! empty( $gradient_color ) ) {
			$fill1 = ! empty( $gradient_color ) ? 'url(#' . esc_attr( $id ) . ')' : '#00000044';
			$fill2 = ! empty( $gradient_color ) ? 'url(#' . esc_attr( $id ) . '-2)' : '#00000088';
			$fill3 = ! empty( $gradient_color ) ? 'url(#' . esc_attr( $id ) . '-3)' : '#000';

			$svg .= '<g>';
			$svg .= '<path d="m1200 40v-40h-1200v40h.39l600 60 600-60z" opacity=".25" fill="' . esc_attr( $fill1 ) . '"/>';
			$svg .= '<path d="m1200 20v-20h-1200v20h.39l600 80 600-80z" opacity=".5" fill="' . esc_attr( $fill2 ) . '"/>';
			$svg .= '<path d="m600 100-600-100h1200z" fill="' . esc_attr( $fill3 ) . '"/>';
			$svg .= '</g>';
			if ( ! empty( $gradient_color ) ) {
				$svg .= $this->render_gradient_svg( $id, $gradient_color, $gradient_angle );
			}
			if ( ! empty( $gradient_color2 ) ) {
				$svg .= $this->render_gradient_svg( $id . '-2', $gradient_color2, $gradient_angle2 );
			}
			if ( ! empty( $gradient_color3 ) ) {
				$svg .= $this->render_gradient_svg( $id . '-3', $gradient_color3, $gradient_angle3 );
			}
		} else {
			$svg .= '<g>';
			$svg .= '<path d="m1200 40v-40h-1200v40h.39l600 60 600-60z" opacity=".25"/>';
			$svg .= '<path d="m1200 20v-20h-1200v20h.39l600 80 600-80z" opacity=".5"/>';
			$svg .= '<path d="m600 100-600-100h1200z"/>';
			$svg .= '</g>';
		}

		$svg .= '</svg>';
		return $svg;
	}

	/**
	 * Render waves_o1 SVG.
	 *
	 * @param string $id              Gradient ID.
	 * @param bool   $invert          Invert.
	 * @param bool   $gradient        Use gradient.
	 * @param array  $gradient_color  Gradient color stops.
	 * @param mixed  $gradient_angle  Gradient angle.
	 * @param array  $gradient_color2 Gradient color stops 2.
	 * @param mixed  $gradient_angle2 Gradient angle 2.
	 * @param array  $gradient_color3 Gradient color stops 3.
	 * @param mixed  $gradient_angle3 Gradient angle 3.
	 * @return string
	 */
	private function render_waves_o1_svg( $id, $invert, $gradient, $gradient_color, $gradient_angle, $gradient_color2, $gradient_angle2, $gradient_color3, $gradient_angle3 ) {
		if ( $invert ) {
			$d1 = 'm 1082.4844,94.447264 c -62.584,0.1462 -128.54456,-17.780467 -183.78518,-33.386717 l -1.84961,-0.53125 c -34.6,-9.78 -68.29922,-19.86 -104.44922,-25 -58.16,-8.21 -114.93008,-5.79 -171.58008,3.75 -12.607,2.1467 -25.21331,4.619922 -37.82031,7.419922 -70.66,15.64 -144.35922,33.71 -218.19922,30 -35.25,-1.79 -69.38023,-8.629844 -103.49023,-15.589844 C 227.20055,54.149375 193.16,47.079062 158,44.789062 103.82,41.259062 48.269141,49.659141 0.61914062,68.369141 L 0,68.609375 V 0 h 1200 v 63.359375 c -11.15,7.2568 -23.0898,13.220084 -35.5898,17.771484 -25.7282,9.449995 -53.4786,13.249955 -81.9258,13.316405 z';
			$d2 = 'm 1107.9219,89.015624 c -57.8911,1.35234 -118.85487,-17.689921 -172.65237,-37.294921 -9.12,-3.33 -17.99922,-6.681406 -26.69922,-9.941406 -36.21,-13.65 -71.47054,-27.710078 -109.31054,-34.830077 -74.4,-14.0000004 -146.65063,-5.83875 -219.14063,15.531249 -4,1.18 -8,2.365293 -12,3.558593 -70.28,20.88 -143.23961,43.191016 -216.34961,38.291016 C 328.60953,62.770078 305.90086,58.42 283.38086,53 c -49.19,-11.84 -97.53,-28.819453 -148,-33.189453 C 89.352759,15.910547 43.0418,22.600141 0,39.369141 V 0 h 1200 v 64.369141 c -11.22,6.6033 -23.1598,11.893318 -35.5898,15.761718 -18.235,5.7175 -37.1913,8.433985 -56.4883,8.884765 z';
			$d3 = 'M 95.445312,92.011714 C 62.091582,91.343224 29.786641,84.625391 0.61914062,68.369141 L 0,68 V 0 h 1200 v 61.710938 c -48.55,-22.200001 -105.2398,-32.170001 -160.5098,-28 -35.47,2.67 -69.85067,10.89 -104.22067,19 -12.18,2.869999 -24.35031,5.739843 -36.57031,8.339843 -22.82,4.85 -45.80883,8.778438 -69.29883,10.148438 -70.46,4.1 -140.80008,-14.398672 -208.58008,-31.888672 L 607.73047,35.939453 C 594.52347,32.566153 581.31914,29.5867 568.11914,27 510.99914,16 453.67,13.279141 395,22.869141 c -36.72,6 -70.99937,17.841797 -106.10938,29.341797 L 283.38086,54 c -7.187,2.3467 -14.54331,4.712909 -22.07031,7.099609 -51.76875,16.3375 -110.27569,32.026265 -165.865238,30.912105 z';
		} else {
			$d1 = 'm1200 0v46.29c-48.55 22.2-105.24 32.17-160.51 28-35.47-2.67-69.85-10.89-104.22-19-12.18-2.87-24.35-5.74-36.57-8.34-22.82-4.85-45.81-8.78-69.3-10.15-70.46-4.1-140.8 14.4-208.58 31.89l-13.09 3.37c-13.207 3.3733-26.41 6.3533-39.61 8.94-57.12 11-114.45 13.72-173.12 4.13-36.72-6-71-17.84-106.11-29.34l-5.51-1.79c-7.187-2.3467-14.543-4.7133-22.07-7.1-82.83-26.14-182.91-50.62-260.69-7.27l-.62.37v-40z';
			$d2 = 'm1200 0v43.63c-11.22-6.6033-23.16-11.8916-35.59-15.76-72.94-22.87-157.41 2.27-229.14 28.41-9.12 3.33-18 6.68-26.7 9.94-36.21 13.65-71.47 27.71-109.31 34.83-74.4 14-146.65 5.84-219.14-15.53-4-1.18-8-2.3667-12-3.56-70.28-20.88-143.24-43.19-216.35-38.29-23.16 1.56-45.87 5.91-68.39 11.33-49.19 11.84-97.53 28.82-148 33.19-46.0281 3.9-92.3382-2.791-135.38-19.56v-68.63z';
			$d3 = 'm1200 0v44.64c-11.15-7.2568-23.09-13.2186-35.59-17.77-82.33-30.24-185.36-2.63-265.71 20.07l-1.85.53c-34.6 9.78-68.3 19.86-104.45 25-58.16 8.21-114.93 5.79-171.58-3.75-12.607-2.1467-25.213-4.62-37.82-7.42-70.66-15.64-144.36-33.71-218.2-30-35.25 1.79-69.38 8.63-103.49 15.59s-68.15 14.03-103.31 16.32c-54.18 3.53-109.73-4.87-157.38-23.58l-.62-.24v-39.39z';
		}

		return $this->render_triple_layer_svg( $id, '0 0 1200 108', '1200', '108', $d1, $d2, $d3, $gradient, $gradient_color, $gradient_angle, $gradient_color2, $gradient_angle2, $gradient_color3, $gradient_angle3 );
	}

	/**
	 * Render waves_o2 SVG.
	 *
	 * @param string $id              Gradient ID.
	 * @param bool   $invert          Invert.
	 * @param bool   $gradient        Use gradient.
	 * @param array  $gradient_color  Gradient color stops.
	 * @param mixed  $gradient_angle  Gradient angle.
	 * @param array  $gradient_color2 Gradient color stops 2.
	 * @param mixed  $gradient_angle2 Gradient angle 2.
	 * @param array  $gradient_color3 Gradient color stops 3.
	 * @param mixed  $gradient_angle3 Gradient angle 3.
	 * @return string
	 */
	private function render_waves_o2_svg( $id, $invert, $gradient, $gradient_color, $gradient_angle, $gradient_color2, $gradient_angle2, $gradient_color3, $gradient_angle3 ) {
		if ( $invert ) {
			$d1 = 'M 992.22461,172.26953 C 962.50049,172.31348 931.25,169.5 900,162 800,138 700,66 600,30 500,-6 400,-6 300,12 200,30 100,66 50,83.999997 L 0,102 V 0 h 1200 v 138 l -50,12 c -34.375,8.25 -92.3823,22.17285 -157.77539,22.26953 z';
			$d2 = 'M 974.21875,133.45508 C 950,132.72666 925,130.39628 900,125.73438 800,107.08688 700,51.14287 600,23.17188 500,-4.79912 400,-4.7985 300,9.1875 200,23.1725 100,51.14291 50,65.12891 L 0,79.11523 V 0 h 1200 v 107.08594 l -50,9.32422 c -37.5,6.99277 -103.125,19.23019 -175.78125,17.04492 z';
			$d3 = 'M 974.21875,107.58789 C 950,107.00066 925,105.12156 900,101.36328 800,86.330177 700,41.23164 600,18.68164 500,-3.86836 400,-3.86875 300,7.40625 200,18.68125 100,41.23186 50,52.50586 L 0,63.7793 V 0 h 1200 v 86.330077 l -50,7.51563 c -37.5,5.63745 -103.125,15.503873 -175.78125,13.742183 z';
		} else {
			$d1 = 'm0 127.22 50 11.275c50 11.274 150 33.824 250 45.099s200 11.275 300-11.275 200-67.649 300-82.6821 200 0 250 7.5166l50 7.5165v-104.67c-400 0-800 0-1200 0z';
			$d2 = 'm0 111.885 50 13.986c50 13.986 150 41.957 250 55.942 100 13.986 200 13.986 300-13.985s200-83.9141 300-102.5616c100-18.6476 200 0 250 9.3237l50 9.3238v-83.9139c-400 0-800 0-1200 0z';
			$d3 = 'm0 89 50 18c50 18 150 54 250 72s200 18 300-18 200-108 300-132 200 0 250 12l50 12v-53c-400 0-800 0-1200 0z';
		}

		return $this->render_triple_layer_svg( $id, '0 0 1200 191', '1200', '191', $d1, $d2, $d3, $gradient, $gradient_color, $gradient_angle, $gradient_color2, $gradient_angle2, $gradient_color3, $gradient_angle3 );
	}

	/**
	 * Render waves_o3 SVG.
	 *
	 * @param string $id              Gradient ID.
	 * @param bool   $invert          Invert.
	 * @param bool   $gradient        Use gradient.
	 * @param array  $gradient_color  Gradient color stops.
	 * @param mixed  $gradient_angle  Gradient angle.
	 * @param array  $gradient_color2 Gradient color stops 2.
	 * @param mixed  $gradient_angle2 Gradient angle 2.
	 * @param array  $gradient_color3 Gradient color stops 3.
	 * @param mixed  $gradient_angle3 Gradient angle 3.
	 * @return string
	 */
	private function render_waves_o3_svg( $id, $invert, $gradient, $gradient_color, $gradient_angle, $gradient_color2, $gradient_angle2, $gradient_color3, $gradient_angle3 ) {
		if ( $invert ) {
			$d1 = 'M 1200,104.81054 C 1123.66,65.710547 1037.7292,27 951.19922,20 885.99922,14.76 827.93,32.780234 769,58.490234 c -53.08,23.16 -106.56055,44.030386 -165.56055,35.400391 -43.38,-6.34 -84.60937,-18.820937 -127.60937,-26.460937 C 314.09008,38.679687 149.93,50.999141 0,104.36914 V 0 h 1200 z';
			$d2 = 'm 458.5918,108.25976 c -4.47149,0.106 -8.97922,-0.0129 -13.51172,-0.36914 C 398.98008,104.22062 355.17,77.220703 314.25,58.220703 284.67,44.490703 255.73008,28.569922 224.58008,18.419922 165.00008,-1.00008 99.409453,-1.27078 47.689453,37.949219 27.639453,53.139219 13,73.079453 0,94.189453 V 0 h 1200 v 88.560547 c -12.65,-22.31 -38.2204,-38.350234 -60.6504,-49.240235 -28.09,-13.67 -56.8898,-16.159999 -87.0898,-7.5 -55.62003,15.960001 -109.17042,44.689844 -168.90042,38.839844 -41.76001,-4.05 -79.13993,-25.460781 -116.91993,-43.050781 -37.78,-17.59 -78.6889,-35.069295 -119.1289,-24.279295 -41.31,10.999998 -71.86086,47.609998 -103.63086,72.999998 -24.2375,19.3725 -53.7875,31.187712 -85.08789,31.929682 z';
			$d3 = 'm 1090.2754,93.935547 c -65.567,2.081933 -135.52579,-20.480859 -193.42579,-39.724609 -34.6,-11.5 -68.29922,-23.341797 -104.44922,-29.341797 -71.1,-11.8 -140.13039,-4.919922 -209.40039,13.080078 -70.66,18.38 -144.35922,39.621718 -218.19922,35.261719 -70.47,-4.19 -136.44078,-32.13 -206.80078,-37.5 -54.41,-4.170001 -110.21,5.799999 -158,28 V 0 h 1200 v 57.529297 c -32.625,25.035 -70.3844,35.15709 -109.7246,36.40625 z';
		} else {
			$d1 = 'm0 0v46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.8-37.5 73.84-4.36 147.54 16.88 218.2 35.26 69.27 18 138.3 24.88 209.4 13.08 36.15-6 69.85-17.84 104.45-29.34 92.64-30.79 216.15-70.08 303.15-3.32v-52.47z';
			$d2 = 'm0 0v15.81c13 21.11 27.64 41.05 47.69 56.24 51.72 39.22 117.31 38.95 176.89 19.53 31.15-10.15 60.09-26.07 89.67-39.8 40.92-19 84.73-46 130.83-49.67 36.26-2.85 70.9 9.42 98.6 31.56 31.77 25.39 62.32 62 103.63 73 40.44 10.79 81.35-6.69 119.13-24.28s75.16-39 116.92-43.05c59.73-5.85 113.28 22.88 168.9 38.84 30.2 8.66 59 6.17 87.09-7.5 22.43-10.89 48-26.93 60.65-49.24v-21.44z';
			$d3 = 'm0 0v5.63c149.93 53.37 314.09 65.69 475.83 36.94 43-7.64 84.23-20.12 127.61-26.46 59-8.63 112.48 12.24 165.56 35.4 58.93 25.71 117 43.73 182.2 38.49 86.53-7 172.46-45.71 248.8-84.81v-5.19z';
		}

		return $this->render_triple_layer_svg( $id, '0 0 1200 110', '1200', '110', $d1, $d2, $d3, $gradient, $gradient_color, $gradient_angle, $gradient_color2, $gradient_angle2, $gradient_color3, $gradient_angle3 );
	}

	/**
	 * Render zigzag SVG.
	 *
	 * @param string $id             Gradient ID.
	 * @param bool   $gradient       Use gradient.
	 * @param array  $gradient_color Gradient color stops.
	 * @param mixed  $gradient_angle Gradient angle.
	 * @return string
	 */
	private function render_zigzag_svg( $id, $gradient, $gradient_color, $gradient_angle ) {
		// phpcs:ignore Generic.Files.LineLength.TooLong -- SVG path data.
		$d = 'M0 0V0.613924V0.632911V5L3.98 0.632911H4.02L8 5L11.98 0.632911H12.02L16 5L19.98 0.632911H20.02L24 5L27.98 0.632911H28.02L32 5L35.98 0.632911H36.02L40 5L43.98 0.632911H44.02L48 5L51.98 0.632911H52.02L56 5L59.98 0.632911H60.02L64 5L67.98 0.632911H68.02L72 5L75.98 0.632911H76.02L80 5L83.98 0.632911H84.02L88 5L91.98 0.632911H92.02L96 5L99.98 0.632911H100.02L104 5L107.98 0.632911H108.02L112 5L115.98 0.632911H116.02L120 5L123.98 0.632911H124.02L128 5L131.98 0.632911H132.02L136 5L139.98 0.632911H140.02L144 5L147.98 0.632911H148.02L152 5L155.98 0.632911H156.02L160 5L163.98 0.632911H164.02L168 5L171.98 0.632911H172.02L176 5L179.98 0.632911H180.02L184 5L187.98 0.632911H188.02L192 5L195.98 0.632911H196.02L200 5L203.98 0.632911H204.02L208 5L211.98 0.632911H212.02L216 5L219.98 0.632911H220.02L224 5L227.98 0.632911H228.02L232 5L235.98 0.632911H236.02L240 5L243.98 0.632911H244.02L248 5L251.98 0.632911H252.02L256 5L259.98 0.632911H260.02L264 5L267.98 0.632911H268.02L272 5L275.98 0.632911H276.02L280 5L283.98 0.632911H284.02L288 5L291.98 0.632911H292.02L296 5L299.98 0.632911H300.02L304 5L307.98 0.632911H308.02L312 5L315.98 0.632911H316.02L320 5L323.98 0.632911H324.02L328 5L331.98 0.632911H332.02L336 5L339.98 0.632911H340.02L344 5L347.98 0.632911H348.02L352 5L355.98 0.632911H356.02L360 5L363.98 0.632911H364.02L368 5L371.98 0.632911H372.02L376 5L379.98 0.632911H380.02L384 5L387.98 0.632911H388.02L392 5L395.98 0.632911H396.02L400 5L403.98 0.632911H404.02L408 5L411.98 0.632911H412.02L416 5L419.98 0.632911H420.02L424 5L427.98 0.632911H428.02L432 5L435.98 0.632911H436.02L440 5L443.98 0.632911H444.02L448 5L451.98 0.632911H452.02L456 5L459.98 0.632911H460.02L464 5L467.98 0.632911H468.02L472 5L475.98 0.632911H476.02L480 5L483.98 0.632911H484.02L488 5L491.98 0.632911H492.02L496 5L499.98 0.632911H500.02L504 5L507.98 0.632911H508.02L512 5L515.98 0.632911H516.02L520 5L523.98 0.632911H524.02L528 5L531.98 0.632911H532.02L536 5L539.98 0.632911H540.02L544 5L547.98 0.632911H548.02L552 5L555.98 0.632911H556.02L560 5L563.98 0.632911H564.02L568 5L571.98 0.632911H572.02L576 5L579.98 0.632911H580.02L584 5L587.98 0.632911H588.02L592 5L595.98 0.632911H596.02L600 5L603.98 0.632911H604.02L608 5L611.98 0.632911H612.02L616 5L619.98 0.632911H620.02L624 5L627.98 0.632911H628.02L632 5L635.98 0.632911H636.02L640 5L643.98 0.632911H644.02L648 5L651.98 0.632911H652.02L656 5L659.98 0.632911H660.02L664 5L667.98 0.632911H668.02L672 5L675.98 0.632911H676.02L680 5L683.98 0.632911H684.02L688 5L691.98 0.632911H692.02L696 5L699.98 0.632911H700.02L704 5L707.98 0.632911H708.02L712 5L715.98 0.632911H716.02L720 5L723.98 0.632911H724.02L728 5L731.98 0.632911H732.02L736 5L739.98 0.632911H740.02L744 5L747.98 0.632911H748.02L752 5L755.98 0.632911H756.02L760 5L763.98 0.632911H764.02L768 5L771.98 0.632911H772.02L776 5L779.98 0.632911H780.02L784 5L787.98 0.632911H788.02L792 5L795.98 0.632911H796.02L800 5L803.98 0.632911H804.02L808 5L811.98 0.632911H812.02L816 5L819.98 0.632911H820.02L824 5L827.98 0.632911H828.02L832 5L835.98 0.632911H836.02L840 5L843.98 0.632911H844.02L848 5L851.98 0.632911H852.02L856 5L859.98 0.632911H860.02L864 5L867.98 0.632911H868.02L872 5L875.98 0.632911H876.02L880 5L883.98 0.632911H884.02L888 5L891.98 0.632911H892.02L896 5L899.98 0.632911H900.02L904 5L907.98 0.632911H908.02L912 5L915.98 0.632911H916.02L920 5L923.98 0.632911H924.02L928 5L931.98 0.632911H932.02L936 5L939.98 0.632911H940.02L944 5L947.98 0.632911H948.02L952 5L955.98 0.632911H956.02L960 5L963.98 0.632911H964.02L968 5L971.98 0.632911H972.02L976 5L979.98 0.632911H980.02L984 5L987.98 0.632911H988.02L992 5L995.98 0.632911H996.02L1000 5L1003.98 0.632911H1004.02L1008 5L1011.98 0.632911H1012.02L1016 5L1019.98 0.632911H1020.02L1024 5L1027.98 0.632911H1028.02L1032 5L1035.98 0.632911H1036.02L1040 5L1043.98 0.632911H1044.02L1048 5L1051.98 0.632911H1052.02L1056 5L1059.98 0.632911H1060.02L1064 5L1067.98 0.632911H1068.02L1072 5L1075.98 0.632911H1076.02L1080 5L1083.98 0.632911H1084.02L1088 5L1091.98 0.632911H1092.02L1096 5L1099.98 0.632911H1100.02L1104 5L1107.98 0.632911H1108.02L1112 5L1115.98 0.632911H1116.02L1120 5L1123.98 0.632911H1124.02L1128 5L1131.98 0.632911H1132.02L1136 5L1139.98 0.632911H1140.02L1144 5L1147.98 0.632911H1148.02L1152 5L1155.98 0.632911H1156.02L1160 5L1163.98 0.632911H1164.02L1168 5L1171.98 0.632911H1172.02L1176 5L1179.98 0.632911H1180.02L1184 5L1187.98 0.632911H1188.02L1192 5L1195.98 0.632911H1196.02L1200 5V0.632911V0.613924V0H0Z';

		return $this->render_single_path_svg( $id, '0 0 1200 5', '1200', '5', $d, $gradient, $gradient_color, $gradient_angle );
	}

	/**
	 * Render shape divider (top or bottom).
	 *
	 * @param string $location 'top' or 'bottom'.
	 * @return string
	 */
	private function render_shape_divider( $location ) {
		$attr_key = 'top' === $location ? 'topDivider' : 'bottomDivider';
		$divider  = isset( $this->attributes[ $attr_key ] ) ? $this->attributes[ $attr_key ] : array();

		if ( empty( $divider ) ) {
			return '';
		}

		$type       = isset( $divider['type'] ) ? $divider['type'] : '';
		$flip       = isset( $divider['flip'] ) ? $divider['flip'] : false;
		$front      = isset( $divider['front'] ) ? $divider['front'] : false;
		$invert     = isset( $divider['invert'] ) ? $divider['invert'] : false;
		$color_mode = isset( $divider['colorMode'] ) ? $divider['colorMode'] : '';

		$classes = array( 'guten-shape-divider', 'guten-shape-divider-' . $location );
		if ( $flip ) {
			$classes[] = 'guten-shape-flip';
		}
		if ( $front ) {
			$classes[] = 'guten-shape-zindex';
		}

		$element_id = $this->get_element_id();
		$divider_id = 'divider-' . $location . '-' . $element_id;

		$svg = '';
		if ( $type && 'none' !== $type ) {
			$svg = $this->render_shape_divider_svg(
				$divider_id,
				$type,
				$invert,
				'gradient' === $color_mode,
				$divider
			);
		}

		return '<div class="' . esc_attr( implode( ' ', $classes ) ) . '">' . $svg . '</div>';
	}

	/**
	 * Render animated shape divider (top or bottom).
	 *
	 * @param string $location 'top' or 'bottom'.
	 * @return string
	 */
	private function render_shape_divider_animated( $location ) {
		$attr_key = 'top' === $location ? 'topDividerAnimated' : 'bottomDividerAnimated';
		$divider  = isset( $this->attributes[ $attr_key ] ) ? $this->attributes[ $attr_key ] : array();

		$flip  = isset( $divider['flip'] ) ? $divider['flip'] : false;
		$front = isset( $divider['front'] ) ? $divider['front'] : false;

		$classes = array( 'guten-shape-divider-animated', 'guten-shape-divider-animated-' . $location );
		if ( $flip ) {
			$classes[] = 'guten-shape-flip';
		}
		if ( $front ) {
			$classes[] = 'guten-shape-zindex';
		}

		return '<div class="' . esc_attr( implode( ' ', $classes ) ) . '"></div>';
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
		// and nested block renders will overwrite $this->attributes.
		$attributes = $this->attributes;

		$element_id      = $this->get_element_id();
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();
		$custom_classes  = $this->get_custom_classes();
		$anchor          = isset( $attributes['anchor'] ) ? $attributes['anchor'] : '';

		// Extract attributes with defaults.
		$layout               = isset( $attributes['layout'] ) ? $attributes['layout'] : 'boxed';
		$gap                  = isset( $attributes['gap'] ) ? $attributes['gap'] : 'default';
		$align                = isset( $attributes['align'] ) ? $attributes['align'] : '';
		$overflow             = isset( $attributes['overflow'] ) ? $attributes['overflow'] : '';
		$sticky               = isset( $attributes['sticky'] ) ? $attributes['sticky'] : array();
		$sticky_position      = isset( $attributes['stickyPosition'] ) ? $attributes['stickyPosition'] : 'top';
		$background_animated  = isset( $attributes['backgroundAnimated'] ) ? $attributes['backgroundAnimated'] : array();
		$cursor_effect        = isset( $attributes['cursorEffect'] ) ? $attributes['cursorEffect'] : array();
		$background_effect    = isset( $attributes['backgroundEffect'] ) ? $attributes['backgroundEffect'] : array();
		$background_overlay   = isset( $attributes['backgroundOverlay'] ) ? $attributes['backgroundOverlay'] : array();
		$background_overlay_h = isset( $attributes['backgroundOverlayHover'] ) ? $attributes['backgroundOverlayHover'] : array();
		$background           = isset( $attributes['background'] ) ? $attributes['background'] : array();
		$top_divider          = isset( $attributes['topDivider'] ) ? $attributes['topDivider'] : array();
		$bottom_divider       = isset( $attributes['bottomDivider'] ) ? $attributes['bottomDivider'] : array();
		$top_div_animated     = isset( $attributes['topDividerAnimated'] ) ? $attributes['topDividerAnimated'] : array();
		$bottom_div_animated  = isset( $attributes['bottomDividerAnimated'] ) ? $attributes['bottomDividerAnimated'] : array();

		// Computed flags.
		$_is_sticky              = $this->is_sticky( $sticky );
		$_is_bg_animated         = $this->is_animation_active( $background_animated );
		$_is_top_div_animated    = ! $this->is_empty_value( $top_div_animated ) && ( ! isset( $top_div_animated['type'] ) || 'none' !== $top_div_animated['type'] );
		$_is_bottom_div_animated = ! $this->is_empty_value( $bottom_div_animated ) && ( ! isset( $bottom_div_animated['type'] ) || 'none' !== $bottom_div_animated['type'] );
		$is_slideshow            = isset( $background['slideImage'] ) && is_array( $background['slideImage'] ) && count( $background['slideImage'] ) > 0;
		$is_background_effect    = ! empty( $background_effect ) && isset( $background_effect['type'] ) && 'none' !== $background_effect['type'];
		$using_featured_image    = ! empty( $background['useFeaturedImage'] ) && ( ! empty( $background['useFeaturedImage']['Desktop'] ) || ! empty( $background['useFeaturedImage']['Tablet'] ) || ! empty( $background['useFeaturedImage']['Mobile'] ) );
		$cursor_effect_show      = ! empty( $cursor_effect['show'] );

		$data_id = $this->get_data_id();

		// Build section class name.
		$section_classes   = array();
		$section_classes[] = 'wp-block-gutenverse-section';
		$section_classes[] = 'guten-element';
		$section_classes[] = 'guten-section';
		$section_classes[] = $element_id;

		if ( ! empty( trim( $animation_class ) ) ) {
			$section_classes[] = trim( $animation_class );
		}
		if ( ! empty( trim( $display_classes ) ) ) {
			$section_classes[] = trim( $display_classes );
		}
		if ( ! empty( $custom_classes ) ) {
			$section_classes[] = $custom_classes;
		}

		if ( $_is_bg_animated ) {
			$section_classes[] = 'background-animated';
		}
		if ( $layout ) {
			$section_classes[] = 'layout-' . $layout;
		}
		if ( $align ) {
			$section_classes[] = 'align-' . $align;
		}
		if ( $overflow && 'none' !== $overflow ) {
			$section_classes[] = 'overflow-' . $overflow;
		}
		if ( $_is_sticky ) {
			$section_classes[] = 'guten-sticky';
			$section_classes[] = 'sticky-' . $sticky_position;
		}
		if ( $cursor_effect_show ) {
			$section_classes[] = 'guten-cursor-effect';
		}
		if ( $is_background_effect ) {
			$section_classes[] = 'guten-background-effect-active';
		}
		if ( $is_slideshow ) {
			$section_classes[] = 'guten-background-slideshow';
		}
		if ( $using_featured_image ) {
			$section_classes[] = 'guten-using-featured-image';
		}

		$class_name = esc_attr( implode( ' ', array_filter( $section_classes ) ) );

		// Build wrapper class name.
		$wrapper_classes = array( 'section-wrapper' );
		if ( $_is_sticky ) {
			$wrapper_classes[] = 'guten-section-wrapper';
			$wrapper_classes[] = 'section-' . $element_id;
			$wrapper_classes[] = 'sticky-' . $sticky_position;
		}
		$wrapper_class = esc_attr( implode( ' ', $wrapper_classes ) );

		// Container class.
		$container_class = esc_attr( 'guten-container guten-column-gap-' . $gap );

		// Advance animation data attribute.
		$advance_anim_data = $this->render_advance_animation_data();

		// ID attribute.
		$id_attr = ! empty( $anchor ) ? ' id="' . esc_attr( $anchor ) . '"' : '';

		// Build output.
		$output  = '<div class="' . $wrapper_class . '" data-id="' . esc_attr( $data_id ) . '">';
		$output .= '<section class="' . $class_name . '"' . $advance_anim_data . $id_attr . '>';

		// FluidCanvasSave - apply filter (returns null by default).
		$fluid_canvas = apply_filters( 'gutenverse_fluid_canvas_script', '', $attributes );
		if ( ! empty( $fluid_canvas ) ) {
			$output .= $fluid_canvas;
		}

		// Guten data div.
		$output .= $this->render_guten_data( $data_id, $_is_sticky, $_is_bg_animated, $_is_top_div_animated, $_is_bottom_div_animated, $is_slideshow );

		// Background animated layer.
		$slide_elements = $this->render_slide_elements();
		if ( $_is_bg_animated ) {
			$output .= '<div class="guten-background-animated"><div class="animated-layer animated-' . esc_attr( $data_id ) . '">';
			if ( $is_slideshow ) {
				$output .= $slide_elements;
			}
			$output .= '</div></div>';
		}

		// Slideshow without animation.
		if ( ! $_is_bg_animated && $is_slideshow ) {
			$output .= $slide_elements;
		}

		// Background effect.
		if ( $is_background_effect ) {
			$output .= '<div class="guten-background-effect"><div class="inner-background-container"></div></div>';
		}

		// Video background.
		$output .= $this->render_video_container();

		// Background overlay.
		if ( ! empty( $background_overlay ) || ! empty( $background_overlay_h ) ) {
			$output .= '<div class="guten-background-overlay"></div>';
		}

		// Shape dividers.
		if ( ! empty( $top_divider ) ) {
			$output .= $this->render_shape_divider( 'top' );
		}
		if ( ! empty( $bottom_divider ) ) {
			$output .= $this->render_shape_divider( 'bottom' );
		}

		// Animated shape dividers.
		if ( $_is_top_div_animated ) {
			$output .= $this->render_shape_divider_animated( 'top' );
		}
		if ( $_is_bottom_div_animated ) {
			$output .= $this->render_shape_divider_animated( 'bottom' );
		}

		// Inner blocks container.
		$output .= '<div class="' . $container_class . '">';
		$output .= $this->get_inner_blocks_content();
		$output .= '</div>';

		$output .= '</section>';
		$output .= '</div>';

		// Apply filter hooks (matching the HOC composition).
		$output = apply_filters( 'gutenverse_cursor_move_effect_script', $output, $attributes, $element_id );
		$output = apply_filters( 'gutenverse_cursor_effect_script', $output, $attributes, $element_id );
		$output = apply_filters( 'gutenverse_background_effect_script', $output, $attributes, $element_id );
		$output = apply_filters( 'gutenverse_advance_animation_script', $output, $attributes, $element_id, 'section' );

		return $output;
	}
}
