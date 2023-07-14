import { Default, u } from 'gutenverse-core-frontend';

class GutenversePopupBuilder extends Default {
    /* public */
    init() {
        this._elements.map((element) => {
            new GutenversePopupElement({
                element,
                playAnimation: this.playAnimation,
                getAnimationClass: this.getAnimationClass,
            });

            this.playAnimation(u(element).find('.guten-popup-content'));
        });
    }
}

class GutenversePopupElement {
    constructor({ element, playAnimation, getAnimationClass }) {
        this.element = u(element);
        this.popup = this.element.find('.guten-popup');
        this.overlay = this.element.find('.guten-popup-overlay');
        this.closeButton = this.element.find('.guten-popup-close');
        this.closeOverlay = this.element.data('close-overlay');
        this.wrapper = this.element.find('.guten-popup-wrapper');
        this.content = this.element.find('.guten-popup-content');
        this.contentClass = this.content.attr('class');
        this.playAnimation = playAnimation;
        this.getAnimationClass = getAnimationClass;

        this._addCloseClick();
        this._addLoadEvent();
    }

    /* private */
    _showPopup() {
        this.playAnimation(this.element.find('.guten-popup-content'));
        this.popup.addClass('show');
        this.playAnimation(this.content);
    }

    _closePopup() {
        this.popup.removeClass('show');
        this.popup.addClass('load');
        this.content.attr('class', this.contentClass);
    }

    _addCloseClick() {
        this.closeButton.on('click', () => {
            this._closePopup();
        });

        if (this.closeOverlay === 'true') {
            this.overlay.on('click', () => {
                this._closePopup();
            });

            this.wrapper.on('click', (e) => {
                if (!this.content.first().contains(e.target)) {
                    this._closePopup();
                }
            });
        }
    }

    _addLoadEvent() {
        let anchor, waitTime, scrollDistance, scrollOffset, maxClick;
        let countClick = 0;

        const triggerType = this.element.data('trigger');
        const alreadyLoaded = () => this.popup.hasClass('load');

        switch (triggerType) {
            case 'load':
                waitTime = this.element.data('wait');
                waitTime = waitTime ? waitTime : 0;

                if (!alreadyLoaded()) {
                    setTimeout(() => {
                        this._showPopup();
                    }, waitTime);
                }

                break;

            case 'scroll':
                scrollDistance = this.element.data('scroll');
                scrollDistance = scrollDistance ? scrollDistance : 0;

                u(document).on('scroll', () => {
                    scrollOffset = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);

                    if (scrollOffset > scrollDistance && !alreadyLoaded()) {
                        this._showPopup();
                    }
                });

                break;

            case 'click':
                anchor = this.element.data('anchor');
                maxClick = this.element.data('max-click');

                anchor = anchor ? anchor : '';
                maxClick = maxClick ? parseInt(maxClick) : undefined;

                u(document)
                    .find(`*[href="#${anchor}"]`)
                    .on('click', () => {
                        if (!maxClick || countClick < maxClick) {
                            this._showPopup();
                            countClick += 1;
                        }
                    });

                break;

            case 'exit':
                u(document.body).on('mouseleave', (e) => {
                    if (0 > e.clientY && !alreadyLoaded()) {
                        this._showPopup();
                    }
                });

                break;
        }
    }
}

export default GutenversePopupBuilder;
