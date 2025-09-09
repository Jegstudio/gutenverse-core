import { compose } from '@wordpress/compose';
import { useState } from '@wordpress/element';
import { InspectorControls, MediaUpload, MediaUploadCheck, RichText, useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { __ } from '@wordpress/i18n';
import { ArrowLeft } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { Button } from '@wordpress/components';
import { ReactPlayer } from 'gutenverse-core/components';
import { useRef } from '@wordpress/element';
import { useEffect } from '@wordpress/element';
import { isEmpty } from 'lodash';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { withAnimationAdvanceV2, withMouseMoveEffect, withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { AlertControl } from 'gutenverse-core/controls';
import { useDynamicScript, useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { CopyElementToolbar } from 'gutenverse-core/components';
import { store as editorStore } from '@wordpress/editor';
import { useSelect } from '@wordpress/data';

const VideoContainer = ({ videoSrc, start, end, videoType, hideControls, playing, loop, muted, width, height }) => {
    const playerStyle = {};
    const playerConfig = {
        youtube: {
            playerVars: {
                start,
                end
            }
        }
    };

    const deviceType = getDeviceType();

    return videoType && videoSrc ? (
        <ReactPlayer
            className="guten-video-background"
            url={videoSrc}
            controls={!hideControls}
            width={width && width[deviceType] ? `${width[deviceType]}%` : '100%'}
            height={height && height[deviceType] ? `${height[deviceType]}px` : '500px'}
            playing={playing}
            muted={muted}
            loop={loop}
            playsinline={true}
            style={playerStyle}
            config={playerConfig}
        />
    ) : null;
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
    const renderingMode = useSelect(
        (select) => select(editorStore).getRenderingMode(),
        []
    );

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
        <CopyElementToolbar {...props}/>
        <InspectorControls>
            <div className={'header-control'}>
                <AlertControl type={'warning'}>
                    {__('For certain browsers, videos set to autoplay must be muted to prevent any unexpected disruptions for the user. For more details, please refer to ', 'gutenverse')}
                    <a href="https://developer.chrome.com/blog/autoplay/" target="_blank" rel="noreferrer">{__('this article', 'gutenverse')}</a>.
                </AlertControl>
            </div>
        </InspectorControls>
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <figure {...blockProps}>
            {!isEmpty(videoSrc) ? videoRender() : renderingMode === 'template-locked' ? null : selectType()}
            {!isEmpty(videoSrc) ? caption() : null}
        </figure>
    </>;
});

export default VideoBlock;