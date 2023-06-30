import { Default } from 'gutenverse-core/frontend';
import u from 'umbrellajs';
import anime from 'animejs';

class GutenverseAccordion extends Default {
    /* public */
    init() {
        this._elements.map(element => {
            this._accordionItems(element);
        });
    }

    /* private */
    _accordionItems(element) {
        const blockElement = u(element);
        const items = {
            accordions: blockElement.find('.accordion-item'),
            headingItems: blockElement.find('.accordion-item').find('.accordion-heading'),
            bodyItems: blockElement.find('.accordion-item').find('.accordion-body'),
        };

        this._addClickEvents(items);
    }

    _animate(accordions) {
        accordions.map(item => {
            const accordion = u(item);
            const bodySize = accordion.find('.accordion-body .accordion-content').size();
            const bodyItem = accordion.find('.accordion-body');
            const isActive = accordion.hasClass('active');

            if(isActive) {
                anime({
                    targets: bodyItem.first(),
                    height: bodySize.height,
                    duration: 500,
                    easing: 'easeInOutQuad',
                }).finished.finally(() => {
                    bodyItem.addClass('expanded');
                    bodyItem.attr('style', '');
                });
            } else {
                anime({
                    targets: bodyItem.first(),
                    height: '0',
                    duration: 500,
                    easing: 'easeInOutQuad',
                }).finished.finally(() => {
                    bodyItem.attr('style', '');
                });
            }
        });
    }

    _addClickEvents({accordions, headingItems, bodyItems}) {
        const fn = this;

        fn._animate(accordions);

        u(headingItems).on('click', function (e) {
            const parent = u(e.currentTarget).parent();

            bodyItems.map(item => {
                const bodyItem = u(item);
                if (bodyItem.hasClass('expanded')) {
                    const expanded = bodyItem.find('.accordion-content').size();

                    bodyItem.attr('style', `height: ${expanded.height}px`);
                    bodyItem.removeClass('expanded');
                }
            });

            accordions.map(item => {
                const accordion = u(item);

                return accordion.is(parent) && !accordion.hasClass('active') ? accordion.addClass('active') : accordion.removeClass('active');
            });

            fn._animate(accordions);
        });
    }
}

export default GutenverseAccordion;
