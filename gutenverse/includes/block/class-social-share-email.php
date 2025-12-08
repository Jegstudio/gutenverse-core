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
class Social_Share_Email extends Block_Abstract {
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
						<path d="M125.4 128C91.5 128 64 155.5 64 189.4C64 190.3 64 191.1 64.1 192L64 192L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 192L575.9 192C575.9 191.1 576 190.3 576 189.4C576 155.5 548.5 128 514.6 128L125.4 128zM528 256.3L528 448C528 456.8 520.8 464 512 464L128 464C119.2 464 112 456.8 112 448L112 256.3L266.8 373.7C298.2 397.6 341.7 397.6 373.2 373.7L528 256.3zM112 189.4C112 182 118 176 125.4 176L514.6 176C522 176 528 182 528 189.4C528 193.6 526 197.6 522.7 200.1L344.2 335.5C329.9 346.3 310.1 346.3 295.8 335.5L117.3 200.1C114 197.6 112 193.6 112 189.4z"/>
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

		return "<div class='gutenverse-share-email gutenverse-share-item' id='{$this->get_element_id()}'>
			<a aria-label='{$text}'>
				{$content}
			</a>
		</div>";
	}

	/**
	 * Render view in frontend
	 */
	public function render_frontend() {
		$post_id          = get_the_ID();
		$encoded_post_url = gutenverse_encode_url( $post_id );
		$title            = get_the_title( $post_id );
		$share_url        = 'mailto:?subject=' . $title . '&amp;body=' . $encoded_post_url;
		$text             = esc_html( $this->attributes['text'] );
		$content          = $this->render_content( $text );

		return "<div class='gutenverse-share-email gutenverse-share-item' id='{$this->get_element_id()}'>
			<a target='_blank' href='{$share_url}' aria-label='{$text}'>
				{$content}
			</a>
		</div>";
	}
}
