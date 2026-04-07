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
		add_filter( 'gutenverse_video_background', array( $this, 'video_background_script' ), 10, 2 );
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
