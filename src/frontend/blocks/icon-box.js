import { Default, u } from 'gutenverse-core-frontend';

class GutenverseIconBox extends Default {
    /* public */
    init() {
        this._elements.map(element => {
            this._iconBox(element);
        });
    }

    /* private */
    _iconBox(element){

        const tabletBreakpoint = 1024;
        const mobileBreakpoint  = 767;
        const position = u(element).data('position');
        const parsedPosition = JSON.parse(position);

        const deviceWidth = window.screen.width;
        this._resizeDevice(element, deviceWidth, tabletBreakpoint, mobileBreakpoint, parsedPosition);

        window.addEventListener('resize', ()=>{
            const deviceWidth = window.screen.width;
            this._resizeDevice(element, deviceWidth, tabletBreakpoint, mobileBreakpoint, parsedPosition);
        });

    }

    /*
    * update when device is resized
    */
    _resizeDevice(element,deviceWidth, tabletBreakpoint, mobileBreakpoint, parsedPosition ){
        if (deviceWidth > tabletBreakpoint) {
            element.classList.add(`icon-position-${parsedPosition.Desktop}`);
            element.classList.remove(`icon-position-${parsedPosition.Mobile}`);
            element.classList.remove(`icon-position-${parsedPosition.Tablet}`);
        } else if (deviceWidth <= tabletBreakpoint && deviceWidth > mobileBreakpoint) {
            element.classList.add(`icon-position-${parsedPosition.Tablet}`);
            element.classList.remove(`icon-position-${parsedPosition.Desktop}`);
            element.classList.remove(`icon-position-${parsedPosition.Mobile}`);
        } else {
            element.classList.add(`icon-position-${parsedPosition.Mobile}`);
            element.classList.remove(`icon-position-${parsedPosition.Tablet}`);
            element.classList.remove(`icon-position-${parsedPosition.Desktop}`);
        }
    }
}

export default GutenverseIconBox;