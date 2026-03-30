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

    /* private */
    _renderVideo(element) {
        const data = u(element).data('property');
        const videoData = data ? (typeof data === 'string' ? JSON.parse(data) : data) : null;

        if (videoData && typeof videoData === 'object' && videoData.url) {
            // Normalize YouTube watch URLs to embed format for standalone ReactPlayer.
            videoData.url = this._normalizeVideoUrl(videoData.url);

            // Ensure YouTube playerVars config exists.
            if (!videoData.config) videoData.config = {};
            if (!videoData.config.youtube) videoData.config.youtube = {};
            if (!videoData.config.youtube.playerVars) videoData.config.youtube.playerVars = {};

            const pv = videoData.config.youtube.playerVars;

            // Remove start/end playerVars when 0 to avoid YouTube "Invalid video id" error.
            if (pv.start === 0 || pv.start === '0') delete pv.start;
            if (pv.end === 0 || pv.end === '0') delete pv.end;

            // Track whether user wants unmuted autoplay.
            const wantUnmuted = videoData.playing && !videoData.muted;

            // Browsers block unmuted autoplay. Force muted so autoplay works,
            // then attempt to unmute after playback starts.
            if (videoData.playing) {
                pv.autoplay = 1;
                pv.mute = 1;
                pv.enablejsapi = 1;
                videoData.muted = true;
            }

            renderReactPlayer(element, videoData); // eslint-disable-line

            setTimeout(() => {
                this._calculateSize(element);
                u(element).find('.guten-video-bg-wrapper').addClass('loaded');
            }, 1);

            if (wantUnmuted) {
                this._attemptUnmute(element);
            }
        }
    }

    _attemptUnmute(element) {
        const tryUnmute = () => {
            const video = element.querySelector('video');
            if (video) {
                video.muted = false;
                return;
            }

            const iframe = element.querySelector('iframe');
            if (iframe && iframe.contentWindow) {
                iframe.contentWindow.postMessage(
                    JSON.stringify({ event: 'command', func: 'unMute', args: [] }),
                    '*'
                );
            }
        };

        setTimeout(tryUnmute, 2000);
    }
}

const selected = u('.guten-video-background');

if (selected) {
    new GutenverseVideo(selected);
}