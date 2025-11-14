import { VideoPreviewer } from 'gutenverse-core/components';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { isEmpty } from 'gutenverse-core/helper';

const VideoContainer = ({ popupVideoSrc, popupVideoStart, popupVideoEnd, popupVideoHideControls, popupVideoLoop, popupVideoMuted, popupVideoWidth, popupVideoHeight, videoRef, playing, elementId }) => {
    const deviceType = getDeviceType();

    return popupVideoSrc ? (
        <VideoPreviewer
            videoRef={videoRef}
            classNames={`guten-video-background popup-video-${elementId}`}
            videoSrc={popupVideoSrc}
            hideControls={popupVideoHideControls}
            width={popupVideoWidth && popupVideoWidth[deviceType] ? `${popupVideoWidth[deviceType]}%` : '100%'}
            height={popupVideoHeight && popupVideoHeight[deviceType] ? `${popupVideoHeight[deviceType]}px` : '500px'}
            playing={playing}
            muted={popupVideoMuted}
            loop={popupVideoLoop}
            start={popupVideoStart}
            end={popupVideoEnd}
        />
    ) : null;
};

const PopupVideoContent = (props) => {
    const { attributes, videoRef, playing, setPlaying } = props;
    return <div className="guten-popup-video-container">
        <figure className="guten-element guten-video">
            {!isEmpty(attributes?.popupVideoSrc) ? <VideoContainer {...attributes} videoRef={videoRef} playing={playing} setPlaying={setPlaying} /> : null}
        </figure>
    </div>;
};
export default PopupVideoContent;