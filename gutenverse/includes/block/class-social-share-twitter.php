<?php
/**
 * Social Share Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Social Share Block
 *
 * @package gutenverse\block
 */
class Social_Share_Twitter extends Block_Abstract {
	/**
	 * $attributes, $content
	 *
	 * @param string $text .
	 * @param string $selected .
	 *
	 * @return string
	 */
	public function render_content( $text, $selected ) {
		$share_text = $this->attributes['showText'] ? "<div class='gutenverse-share-text'>{$text}</div>" : '';

		if ( 'twitter' === $selected ) {
			$content = '<div class="gutenverse-share-icon">
					<div class="gutenverse-icon-svg">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
							<path d="M523.4 215.7C523.7 220.2 523.7 224.8 523.7 229.3C523.7 368 418.1 527.9 225.1 527.9C165.6 527.9 110.4 510.7 64 480.8C72.4 481.8 80.6 482.1 89.3 482.1C138.4 482.1 183.5 465.5 219.6 437.3C173.5 436.3 134.8 406.1 121.5 364.5C128 365.5 134.5 366.1 141.3 366.1C150.7 366.1 160.1 364.8 168.9 362.5C120.8 352.8 84.8 310.5 84.8 259.5L84.8 258.2C98.8 266 115 270.9 132.2 271.5C103.9 252.7 85.4 220.5 85.4 184.1C85.4 164.6 90.6 146.7 99.7 131.1C151.4 194.8 229 236.4 316.1 240.9C314.5 233.1 313.5 225 313.5 216.9C313.5 159.1 360.3 112 418.4 112C448.6 112 475.9 124.7 495.1 145.1C518.8 140.6 541.6 131.8 561.7 119.8C553.9 144.2 537.3 164.6 515.6 177.6C536.7 175.3 557.2 169.5 576 161.4C561.7 182.2 543.8 200.7 523.4 215.7z"/>
						</svg>
					</div>
				</div>' . $share_text;
		} else {
			$content = '<div class="gutenverse-share-icon">
					<div class="gutenverse-icon-svg">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
							<path d="M453.2 112L523.8 112L369.6 288.2L551 528L409 528L297.7 382.6L170.5 528L99.8 528L264.7 339.5L90.8 112L236.4 112L336.9 244.9L453.2 112zM428.4 485.8L467.5 485.8L215.1 152L173.1 152L428.4 485.8z"/>
						</svg>
					</div>
				</div>' . $share_text;
		}

		return $content;
	}

	/**
	 * Render view in editor
	 */
	public function render_gutenberg() {
		$text     = esc_html( $this->attributes['text'] );
		$selected = isset( $this->attributes['selectedIcon'] ) ? esc_html( $this->attributes['selectedIcon'] ) : 'twitter';
		$content  = $this->render_content( $text, $selected );

		return "<div class='gutenverse-share-twitter gutenverse-share-item {$selected}' id='{$this->get_element_id()}'>
			<a  aria-label='{$text}'>
				{$content}
			</a>
		</div>";
	}

	/**
	 * Render view in frontend
	 */
	public function render_frontend() {
		$post_id          = get_the_ID();
		$title            = get_the_title( $post_id );
		$encoded_post_url = gutenverse_encode_url( $post_id );
		$share_url        = esc_url( 'https://twitter.com/intent/tweet?text=' . $title . '&url=' . $encoded_post_url );
		$text             = esc_html( $this->attributes['text'] );
		$selected         = isset( $this->attributes['selectedIcon'] ) ? esc_html( $this->attributes['selectedIcon'] ) : 'twitter';
		$content          = $this->render_content( $text, $selected );

		return "<div class='gutenverse-share-twitter gutenverse-share-item {$selected}' id='{$this->get_element_id()}'>
			<a target='_blank' href='{$share_url}' aria-label='{$text}'>
				{$content}
			</a>
		</div>";
	}
}
