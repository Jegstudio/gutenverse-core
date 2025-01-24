
import { getDeviceType } from 'gutenverse-core/editor-helper';
import ReactPlayer from 'react-player';

const SectionVideoContainer = ({ attributes }) => {
    const {
        background = {}
    } = attributes;
    if(background.type !== 'video'){
        return null;
    }
    background.videoPlayOnMobile = background.videoPlayOnMobile || false;

    const deviceType = getDeviceType();

    const playerStyle = {
        zIndex: 0,
        top: 0,
        left: 0,
        position: 'absolute',
        overflow: 'hidden',
        pointerEvents: 'none',
        opacity: 1,
    };

    const playerConfig = {
        youtube: {
            playerVars: {
                showinfo: 0,
                start: background.videoStartTime ? parseInt(background.videoStartTime) : 0,
                end: background.videoEndTime ? parseInt(background.videoEndTime) : 0
            },
        }
    };

    const videoPlayer = background.type && background.type === 'video' ? (
        <ReactPlayer
            className="guten-video-bg-wrapper"
            url={background.videoLink}
            controls={false}
            width="100%"
            height="100%"
            playing={true}
            muted={true}
            loop={!background.videoPlayOnce}
            playsinline={true}
            style={playerStyle}
            config={playerConfig}
        />
    ) : null;
    if ('Mobile' === deviceType) {
        if (background.videoPlayOnMobile) {
            return videoPlayer;
        } else {
            return null;
        }
    } else {
        return videoPlayer;
    }
};

export default SectionVideoContainer;