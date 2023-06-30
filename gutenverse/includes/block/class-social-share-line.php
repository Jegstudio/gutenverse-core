<?php
/**
 * Social Share Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

/**
 * Class Social Share Block
 *
 * @package gutenverse\block
 */
class Social_Share_Line extends Block_Abstract {
	/**
	 * $attributes, $content
	 *
	 * @return string
	 */
	public function render_content() {
		$share_text = $this->attributes['showText'] ? "<div class='gutenverse-share-text'>{$this->attributes['text']}</div>" : '';

		return "<div class='gutenverse-share-icon'>
				<i class='fab fa-line'></i>
			</div>{$share_text}";
	}

	/**
	 * Render view in editor
	 */
	public function render_gutenberg() {
		$content = $this->render_content();

		return "<div class='gutenverse-share-line gutenverse-share-item' id='{$this->attributes['elementId']}'>
			<a href='#'>
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
		$share_url        = 'https://social-plugins.line.me/lineit/share?url=' . $encoded_post_url . '&text=' . $title;
		$content          = $this->render_content();

		return "<div class='gutenverse-share-line gutenverse-share-item' id='{$this->attributes['elementId']}'>
			<a target='_blank' href='{$share_url}'>
				{$content}
			</a>
		</div>";
	}
}
