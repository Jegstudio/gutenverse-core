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
class Social_Share_Tumblr extends Block_Abstract {
	/**
	 * $attributes, $content
	 *
	 * @param string $text .
	 *
	 * @return string
	 */
	public function render_content( $text ) {
		$share_text = $this->attributes['showText'] ? "<div class='gutenverse-share-text'>{$text}</div>" : '';

		return '<div class="gutenverse-share-icon">
			<div class="gutenverse-icon-svg">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
					<path d="M469.9 544.3C456.3 558.8 419.9 576 372.5 576C251.7 576 225.5 487.2 225.5 435.4L225.5 291.4L178 291.4C172.5 291.4 168 286.9 168 281.4L168 213.4C168 206.2 172.5 199.8 179.3 197.4C241.3 175.6 260.8 121.4 263.6 80.3C264.4 69.3 270.1 64 279.7 64L350.6 64C356.1 64 360.6 68.5 360.6 74L360.6 189.2L443.6 189.2C449.1 189.2 453.6 193.6 453.6 199.1L453.6 280.8C453.6 286.3 449.1 290.8 443.6 290.8L360.2 290.8L360.2 424C360.2 458.2 383.9 477.6 428.2 459.8C433 457.9 437.2 456.6 440.9 457.6C444.4 458.5 446.7 461 448.3 465.5L470.3 529.8C472.1 534.8 473.6 540.4 469.9 544.3z"/>
				</svg>
			</div>
		</div>' . $share_text;
	}

	/**
	 * Render view in editor
	 */
	public function render_gutenberg() {
		$text    = esc_html( $this->attributes['text'] );
		$content = $this->render_content( $text );

		return "<div class='gutenverse-share-tumblr gutenverse-share-item' id='{$this->get_element_id()}'>
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
		$share_url        = esc_url( 'https://www.tumblr.com/widgets/share/tool?canonicalUrl=' . $encoded_post_url . '&title=' . $title );
		$text             = esc_html( $this->attributes['text'] );
		$content          = $this->render_content( $text );

		return "<div class='gutenverse-share-tumblr gutenverse-share-item' id='{$this->get_element_id()}'>
			<a target='_blank' href='{$share_url}' aria-label='{$text}'>
				{$content}
			</a>
		</div>";
	}
}
