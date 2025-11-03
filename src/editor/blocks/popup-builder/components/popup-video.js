import { ReactPlayer } from 'gutenverse-core/components';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { isEmpty } from 'gutenverse-core/helper';

const VideoContainer = ({ popupVideoSrc, popupVideoStart, popupVideoEnd, popupVideoHideControls, popupVideoLoop, popupVideoMuted, popupVideoWidth, popupVideoHeight, videoRef, playing, setPlaying }) => {
    const playerStyle = {};
    const playerConfig = {
        youtube: {
            playerVars: {
                start: popupVideoStart,
                end: popupVideoEnd
            }
        }
    };
    const deviceType = getDeviceType();

    return popupVideoSrc ? (
        <ReactPlayer
            ref={videoRef}
            className="guten-video-background"
            url={popupVideoSrc}
            controls={!popupVideoHideControls}
            width={popupVideoWidth && popupVideoWidth[deviceType] ? `${popupVideoWidth[deviceType]}%` : '100%'}
            height={popupVideoHeight && popupVideoHeight[deviceType] ? `${popupVideoHeight[deviceType]}px` : '500px'}
            playing={playing}
            muted={popupVideoMuted}
            loop={popupVideoLoop}
            playsinline={true}
            style={playerStyle}
            config={playerConfig}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
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