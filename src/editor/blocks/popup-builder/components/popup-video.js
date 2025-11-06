import { ReactPlayer } from 'gutenverse-core/components';
import { isEmpty } from 'gutenverse-core/helper';

const VideoContainer = ({ popupVideoSrc, popupVideoStart, popupVideoEnd, popupVideoHideControls, popupVideoLoop, popupVideoMuted, videoRef, playing, setPlaying }) => {
    const playerStyle = {};
    const playerConfig = {
        youtube: {
            playerVars: {
                start: popupVideoStart,
                end: popupVideoEnd
            }
        }
    };

    return popupVideoSrc ? (
        <ReactPlayer
            ref={videoRef}
            className="guten-video-background"
            url={popupVideoSrc}
            controls={!popupVideoHideControls}
            width={'100%'}
            height={'100%'}
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