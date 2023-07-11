export const withVideoBackground = (BlockSave) => {
    return (props) => {
        const {attributes} = props;
        const {background = {}} = attributes;

        const style = {
            zIndex: 0,
            top: 0,
            left: 0,
            position: 'absolute',
            overflow: 'hidden',
            pointerEvents: 'none',
        };

        const config = {
            youtube: {
                playerVars: {
                    showinfo: 0,
                    start: background.videoStartTime ? parseInt(background.videoStartTime) : 0,
                    end: background.videoEndTime ? parseInt(background.videoEndTime) : 0
                },
            }
        };

        const dataProperties = JSON.stringify({
            url: background.videoLink ? background.videoLink : '',
            class: 'guten-video-bg-wrapper',
            width: '100%',
            height: '100%',
            playing: true,
            muted: true,
            loop: !background.videoPlayOnce,
            playsinline: true,
            style,
            config
        });

        const videoContainer = background.type === 'video' && <div className="guten-video-background" data-property={dataProperties}></div>;

        const saveProps = {
            ...props,
            videoContainer
        };

        return <BlockSave {...saveProps}/>;
    };
};