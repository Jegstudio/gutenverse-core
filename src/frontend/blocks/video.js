import { Default, u } from 'gutenverse-core-frontend';

class GutenverseVideo extends Default {
    /* public */
    init() {
        this._elements.map(element => {
            this._renderVideo(element);
        });
    }

    /* private */
    _renderVideo(element) {
        const data = u(element).data('property');
        const videoData = data ? JSON.parse(data) : null;

        if (videoData && typeof videoData === 'object') {
            /* the function below is from '\assets\frontend\react-player\ReactPlayer.standalone.js' */
            renderReactPlayer(element, videoData); // eslint-disable-line
        }
    }
}

export default GutenverseVideo;