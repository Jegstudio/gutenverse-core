import { Default, u } from 'gutenverse-core-frontend';

class GutenverseSlideshow extends Default {
    init() {
        this._elements.map(element => {
            this.startSlideshow(element);
        });
    }

    startSlideshow(element){
        
    }
}

export default GutenverseSlideshow;