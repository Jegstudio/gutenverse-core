import { compose } from '@wordpress/compose';
import { useState } from '@wordpress/element';
import { InspectorControls, MediaUpload, MediaUploadCheck, RichText, useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { __ } from '@wordpress/i18n';
import { ArrowLeft } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { Button, SandBox } from '@wordpress/components';
import { ReactPlayer } from 'gutenverse-core/components';
import { useRef } from '@wordpress/element';
import { useEffect } from '@wordpress/element';
import { isEmpty } from 'gutenverse-core/helper';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { withAnimationAdvanceV2, withMouseMoveEffect, withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { AlertControl } from 'gutenverse-core/controls';
import { useDynamicScript, useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { CopyElementToolbar } from 'gutenverse-core/components';
import { useSelect } from '@wordpress/data';

const VideoContainer = ({ videoSrc, start, end, hideControls, playing, loop, muted, width, height }) => {
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
    const deviceType = getDeviceType();
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
			class="guten-video-background"
			src="${embedUrl}"
			width="${width?.[deviceType] ? `${width[deviceType]}%` : '100%'}"
			height="${height?.[deviceType] ? `${height[deviceType]}px` : '500px'}"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			referrerpolicy="strict-origin-when-cross-origin"
			allowfullscreen
			title="Embedded Video"
		></iframe>
	`;

    return (
        <div className="video-preview">
            <SandBox html={iframeHtml} />
        </div>
    );
};

const VideoPicker = (props) => {
    const {
        attributes,
        setAttributes,
        children
    } = props;

    const { defaultSrc } = attributes;

    const onVideoSelect = (video) => {
        setAttributes({
            videoSrc: video.url,
            captionOriginal: video.caption
        });
    };

    return (
        <MediaUploadCheck>
            <MediaUpload
                onSelect={onVideoSelect}
                allowedTypes={['video']}
                value={defaultSrc}
                render={children} />
        </MediaUploadCheck>
    );
};

const VideoBlock = compose(
    withPartialRender,
    withPassRef,
    withAnimationAdvanceV2('video'),
    withMouseMoveEffect
)((props) => {
    const {
        attributes,
        setAttributes,
        clientId,
        setBlockRef,
    } = props;

    const {
        elementId,
        videoType,
        videoSrc,
        // start,
        // end,
        captionType,
        captionOriginal,
        captionCustom,
        hideControls,
        playing,
        loop,
        muted,
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const elementRef = useRef(null);
    const videoRef = useRef(null);

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);
    useDynamicScript(elementRef);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-video',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
            {
                videoType: videoType,
                'video-loaded': videoSrc
            },
        ),
        ref: elementRef
    });

    const caption = () => {
        switch (captionType) {
            case 'original':
                return <span className="guten-caption">{captionOriginal}</span>;
            case 'custom':
                return <span className="guten-caption">{captionCustom}</span>;
            default:
                return null;
        }
    };

    const videoRender = () => {
        switch (videoType) {
            case 'externalLink':
                return <VideoContainer {...attributes} />;
            default:
                return <video controls={!hideControls} src={videoSrc} autoPlay={playing} muted={muted} loop={loop} />;
        }
    };

    const [videoURL, setVideoURL] = useState(null);

    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);

    useEffect(() => {
        if (!videoRef.current) return;

        const applyReferrerPolicy = () => {
            const iframes = document.querySelectorAll('iframe');
            iframes.forEach((iframe) => {
                if (!iframe.hasAttribute('referrerpolicy')) {
                    iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
                }
            });
        };

        // Initial check for any existing iframes
        applyReferrerPolicy();

        // Observe for new iframes being added asynchronously
        const observer = new MutationObserver(() => {
            applyReferrerPolicy();
        });

        observer.observe(videoRef.current, {
            childList: true,
            subtree: true,
        });

        // Cleanup on unmount
        return () => observer.disconnect();
    }, []);

    const selectType = () => {
        switch (videoType) {
            case 'externalLink':
                return <div className="video-url-wrapper">
                    <div className="back" onClick={() => setAttributes({ videoType: '', videoSrc: null })}><ArrowLeft size={24} /></div>
                    <h5 className="title">{__('Supported Video URL Types')}</h5>
                    <div className="video-icons">
                        <div className="video-icon youtube"><i className="fab fa-youtube" aria-hidden="true"></i></div>
                        <div className="video-icon twitch"><i className="fab fa-twitch" aria-hidden="true"></i></div>
                        <div className="video-icon vimeo"><i className="fab fa-vimeo" aria-hidden="true"></i></div>
                        <div className="video-icon dailymotion"><i className="fab fa-dailymotion" aria-hidden="true"></i></div>
                    </div>
                    <RichText
                        className={'video-url'}
                        tagName={'span'}
                        aria-label={__('Video URL', 'gutenverse')}
                        placeholder={__('Type/Paste Video URL Here', 'gutenverse')}
                        value={videoSrc}
                        onChange={setVideoURL}
                        withoutInteractiveFormatting
                    />
                    <Button isPrimary onClick={() => setAttributes({ videoSrc: videoURL })}>{__('Render Video')}</Button>
                </div>;
            default:
                return <>
                    <h5 className="title">{__('Select Video Source')}</h5>
                    <div className="upload-mode">
                        <VideoPicker {...props}>{({ open }) => <div onClick={() => {
                            open();
                            setAttributes({ videoType: 'upload' });
                        }}><i className="fa fa-upload" aria-hidden="true"></i><span>{__('Media Files')}</span></div>}
                        </VideoPicker>
                        <div onClick={() => setAttributes({ videoType: 'externalLink' })}><i className="fa fa-link" aria-hidden="true"></i><span>{__('External Link')}</span></div>
                    </div>
                </>;
        }
    };

    return <>
        <CopyElementToolbar {...props} />
        <InspectorControls>
            <div className={'header-control'}>
                <AlertControl type={'warning'}>
                    {__('For certain browsers, videos set to autoplay must be muted to prevent any unexpected disruptions for the user. For more details, please refer to ', 'gutenverse')}
                    <a href="https://developer.chrome.com/blog/autoplay/" target="_blank" rel="noreferrer">{__('this article', 'gutenverse')}</a>.
                </AlertControl>
            </div>
        </InspectorControls>
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <figure {...blockProps} ref={videoRef}>
            {!isEmpty(videoSrc) ? videoRender() : selectType()}
            {!isEmpty(videoSrc) ? caption() : null}
        </figure>
    </>;
});

export default VideoBlock;