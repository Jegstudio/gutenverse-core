import { getDeviceType } from 'gutenverse-core/editor-helper';
import { ReactPlayer, VideoPreviewer } from 'gutenverse-core/components';

const SectionVideoContainer = ({ attributes }) => {
    const { background = {} } = attributes;
    const {
        type,
        videoLink,
        videoPlayOnMobile = false,
        videoPlayOnce,
        videoStartTime = 0,
        videoEndTime = 0
    } = background;

    const deviceType = getDeviceType();

    const playerStyle = {
        zIndex: 0,
        top: 0,
        left: 0,
        position: 'absolute',
        overflow: 'hidden',
        pointerEvents: 'none',
        opacity: 1,
        width:'100%',
        height: '100%'
    };

    const playerConfig = {
        youtube: {
            playerVars: {
                showinfo: 0,
                start: parseInt(videoStartTime),
                end: parseInt(videoEndTime),
            },
        }
    };

    // If device is mobile and video is not set to play, return null
    if (deviceType === 'Mobile' && !videoPlayOnMobile) {
        return null;
    }

    // If there is no video type or no valid link, return null
    if (type !== 'video' || !videoLink) {
        return null;
    }
    return (
        <VideoPreviewer
            classNames="guten-video-bg-wrapper"
            videoSrc={videoLink}
            hideControls={true}
            width="100%"
            height="100%"
            playing={true}
            muted={true}
            loop={!videoPlayOnce}
            config={playerConfig}
            styles={playerStyle}
            wrapperStyles={[
                `
                    body{
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                    }
                    body > div {
                        height: inherit;
                    }`
            ]}
        />
    );
};

export default SectionVideoContainer;