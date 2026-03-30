import { Default } from '../blocks/default';
import u from 'umbrellajs';
import load from 'load-script';

class GutenverseVideo extends Default {
    /* public */
    init() {
        const elements = this._elements;
        const { framework_asset: path, framework_version } = window.GutenverseFrontendConfig;
        if (elements.length > 0) {
            load(path + 'js/ReactPlayer.standalone.js?ver=' + framework_version, (err) => {
                if (!err) {
                    elements.map(element => {
                        this._renderVideo(element);
                    });
                }

                window.addEventListener('resize', () => {
                    elements.map(element => {
                        this._calculateSize(element);
                    });
                }, true);
            });
        }
    }

    _calculateSize(element) {
        const wrapper = u(element).find('.guten-video-bg-wrapper');
        if (wrapper.length) {
            const inner = u(element).find('.guten-video-bg-wrapper > div');
            const wrapperSize = u(wrapper).size();

            const height = Math.floor(wrapperSize.width * 0.56);
            const width = Math.floor(wrapperSize.height / 0.56);

            if (height > wrapperSize.height) {
                inner.attr('style', `width: ${wrapperSize.width}px; height: ${height}px`);
            } else {
                inner.attr('style', `width: ${width}px; height: ${wrapperSize.height}px`);
            }
        }
    }

    _getYouTubeVideoId(url) {
        const patterns = [
            /(?:youtube\.com\/(?:embed|v)\/|youtu\.be\/)([\w-]{11})/,
            /youtube\.com\/watch\?.*v=([\w-]{11})/,
            /youtube-nocookie\.com\/(?:embed|v)\/([\w-]{11})/,
        ];

        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match) return match[1];
        }

        return null;
    }

    _normalizeVideoUrl(url) {
        if (!url) return url;

        const videoId = this._getYouTubeVideoId(url);
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
        }

        return url;
    }

    /* private */
    _renderVideo(element) {
        const data = u(element).data('property');
        let videoData = null;

        try {
            videoData = data ? (typeof data === 'string' ? JSON.parse(data) : data) : null;
        } catch (e) {
            return;
        }

        if (videoData && typeof videoData === 'object' && videoData.url) {
            // Normalize YouTube watch URLs to embed format for standalone ReactPlayer.
            videoData.url = this._normalizeVideoUrl(videoData.url);

            // Remove start/end playerVars when 0 to avoid YouTube "Invalid video id" error.
            if (videoData.config?.youtube?.playerVars) {
                const pv = videoData.config.youtube.playerVars;
                if (pv.start === 0 || pv.start === '0') delete pv.start;
                if (pv.end === 0 || pv.end === '0') delete pv.end;
            }

            renderReactPlayer(element, videoData); // eslint-disable-line

            setTimeout(() => {
                this._calculateSize(element);
                u(element).find('.guten-video-bg-wrapper').addClass('loaded');
            }, 1);
        }
    }
}

const selected = u('.guten-video-background');

if (selected) {
    new GutenverseVideo(selected);
}