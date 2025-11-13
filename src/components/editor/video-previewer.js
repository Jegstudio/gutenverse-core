import { SandBox } from '@wordpress/components';
import { getDeviceType } from '../../editor-helper';

const VideoPreviewer = ({ videoSrc, start, end, hideControls, playing, loop, muted, width, height, classNames, styles, wrapperStyles=[], videoRef=null }) => {
    if (!videoSrc) return null;

    // Detect video type
    let videoType = '';
    if (/youtu(\.be|be\.com)/.test(videoSrc)) {
        videoType = 'youtube';
    } else if (/vimeo\.com/.test(videoSrc)) {
        videoType = 'vimeo';
    } else if (/twitch\.tv/.test(videoSrc)) {
        videoType = 'twitch';
    } else if (/dailymotion\.com/.test(videoSrc)) {
        videoType = 'dailymotion';
    } else {
        videoType = 'unknown';
    }

    // Build the proper embed URL
    let embedUrl = '';
    switch (videoType) {
        case 'youtube': {
            // Match all YouTube URL formats
            const idMatch =
                videoSrc.match(/(?:v=|\/embed\/|youtu\.be\/)([^?&]+)/) ||
                videoSrc.match(/\/shorts\/([^?&]+)/);
            const videoId = idMatch ? idMatch[1] : null;

            if (videoId) {
                const params = new URLSearchParams();
                if (start) params.set('start', start);
                if (end) params.set('end', end);
                params.set('autoplay', playing ? '1' : '0');
                params.set('mute', muted ? '1' : '0');
                params.set('loop', loop ? '1' : '0');
                params.set('controls', hideControls ? '0' : '1');
                params.set('enablejsapi', '1');
                if (loop) params.set('playlist', videoId); // Required for YouTube looping
                embedUrl = `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
            }
            break;
        }
        case 'vimeo': {
            const idMatch = videoSrc.match(/vimeo\.com\/(\d+)/);
            const videoId = idMatch ? idMatch[1] : null;
            if (videoId) {
                const params = new URLSearchParams();
                params.set('autoplay', playing ? '1' : '0');
                params.set('muted', muted ? '1' : '0');
                params.set('loop', loop ? '1' : '0');
                params.set('controls', hideControls ? '0' : '1');
                if (start) params.set('#t', `${start}s`);
                embedUrl = `https://player.vimeo.com/video/${videoId}?${params.toString()}`;
            }
            break;
        }

        case 'twitch': {
            const channelMatch = videoSrc.match(/twitch\.tv\/([^/?]+)/);
            const videoMatch = videoSrc.match(/videos\/(\d+)/);
            const params = new URLSearchParams();
            params.set('autoplay', playing ? 'true' : 'false');
            params.set('muted', muted ? 'true' : 'false');
            params.set('loop', loop ? 'true' : 'false');
            params.set('parent', window.location.hostname);
            if (videoMatch) {
                embedUrl = `https://player.twitch.tv/?video=${videoMatch[1]}&${params.toString()}`;
            } else if (channelMatch) {
                embedUrl = `https://player.twitch.tv/?channel=${channelMatch[1]}&${params.toString()}`;
            }
            break;
        }

        case 'dailymotion': {
            const idMatch = videoSrc.match(/dailymotion\.com\/video\/([^_]+)/);
            const videoId = idMatch ? idMatch[1] : null;
            if (videoId) {
                const params = new URLSearchParams();
                params.set('autoplay', playing ? '1' : '0');
                params.set('mute', muted ? '1' : '0');
                params.set('loop', loop ? '1' : '0');
                params.set('controls', hideControls ? '0' : '1');
                embedUrl = `https://www.dailymotion.com/embed/video/${videoId}?${params.toString()}`;
            }
            break;
        }

        default:
            embedUrl = videoSrc;
    }

    if (!embedUrl) return null;

    // Build iframe HTML
    const iframeHtml = `
		<iframe
			class="${classNames}"
			src="${embedUrl}"
			width="${width}"
			height="${height}"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			referrerpolicy="strict-origin-when-cross-origin"
			allowfullscreen
			title="Embedded Video"
		></iframe>
	`;

    return (
        <div className={classNames} style={styles} ref={videoRef}>
            <SandBox html={iframeHtml} styles={wrapperStyles} />
        </div>
    );
};

export default VideoPreviewer;