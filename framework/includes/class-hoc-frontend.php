<?php
/**
 * Gutenverse HOC Frontend
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-framework
 */

namespace Gutenverse\Framework;

/**
 * Class HOC Frontend
 *
 * @package gutenverse-framework
 */
class HOC_Frontend {
	/**
	 * Constructor
	 */
	public function __construct() {
		add_filter( 'gutenverse_background_slideshow', array( $this, 'background_slideshow_script' ), 10, 3 );
		add_filter( 'gutenverse_video_background', array( $this, 'video_background_script' ), 10, 2 );
	}

	/**
	 * Background slideshow script.
	 *
	 * @param string $output     Output HTML.
	 * @param array  $attributes Block attributes.
	 * @param string $element_id Element ID.
	 * @return string
	 */
	public function background_slideshow_script( $output, $attributes, $element_id ) {
		$background   = isset( $attributes['background'] ) ? $attributes['background'] : array();
		$slide_images = isset( $background['slideImage'] ) ? $background['slideImage'] : array();

		if ( empty( $slide_images ) || ! is_array( $slide_images ) ) {
			return $output;
		}

		$output .= '<div class="bg-slideshow-container">';
		$output .= '<div class="bg-slideshow-item">';

		foreach ( $slide_images as $index => $image ) {
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
	 * Video Background Script
	 *
	 * @param string $output     Output HTML.
	 * @param array  $attributes Block attributes.
	 * @return string
	 */
	public function video_background_script( $output, $attributes ) {
		$background = isset( $attributes['background'] ) ? $attributes['background'] : array();

		// Support both 'type' (section/wrapper/column) and 'backgroundType' (container).
		$bg_type = isset( $background['type'] ) ? $background['type'] : ( isset( $background['backgroundType'] ) ? $background['backgroundType'] : '' );

		if ( 'video' !== $bg_type ) {
			return $output;
		}

		// Support both 'videoLink' (section/wrapper/column) and 'videoUrl' (container).
		$video_url        = isset( $background['videoLink'] ) ? $background['videoLink'] : ( isset( $background['videoUrl'] ) ? $background['videoUrl'] : '' );
		$play_on_mobile   = ! empty( $background['videoPlayOnMobile'] );
		$play_once        = ! empty( $background['videoPlayOnce'] );
		$video_start_time = ! empty( $background['videoStartTime'] ) ? intval( $background['videoStartTime'] ) : 0;
		$video_end_time   = ! empty( $background['videoEndTime'] ) ? intval( $background['videoEndTime'] ) : 0;

		$data_properties = array(
			'url'         => $video_url,
			'class'       => 'guten-video-bg-wrapper' . ( $play_on_mobile ? ' show-phone' : '' ),
			'width'       => '100%',
			'height'      => '100%',
			'playing'     => true,
			'muted'       => true,
			'loop'        => ! $play_once,
			'playsinline' => true,
			'style'       => array(
				'zIndex'        => 0,
				'top'           => 0,
				'left'          => 0,
				'position'      => 'absolute',
				'overflow'      => 'hidden',
				'pointerEvents' => 'none',
			),
			'config'      => array(
				'youtube' => array(
					'playerVars' => array(
						'showinfo' => 0,
						'start'    => $video_start_time,
						'end'      => $video_end_time,
					),
				),
			),
		);

		$output .= '<div class="guten-video-background" data-property="' . esc_attr( wp_json_encode( $data_properties ) ) . '"></div>';

		return $output;
	}
}
