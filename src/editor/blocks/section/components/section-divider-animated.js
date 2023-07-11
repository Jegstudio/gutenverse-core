import classnames from 'classnames';
import { shapeDividerAnimatedLoader } from 'gutenverse-core/styling';
import { useRef } from '@wordpress/element';
import { useEffect } from '@wordpress/element';
import Lottie from 'lottie-web';

const loadDivider = (props) => {
    const { attributes, divRef, divider, elementId, position } = props;
    const { loop, speed } = attributes;

    const container = divRef.current;
    const lottieSVG = container && container.querySelector(':scope > svg');

    if (container) {
        lottieSVG && lottieSVG.remove();

        const animation = Lottie.loadAnimation({
            container,
            animationData: divider,
            renderer: 'svg',
            loop: loop || false,
            autoplay: false,
        });

        animation.setSpeed(speed ? parseFloat(speed) : 1);

        loadDividerPlay({ attributes, animation, container, elementId, position, divRef });

        animation.addEventListener('DOMLoaded', () => {
            const lottieSVG = container.querySelector(':scope > svg');

            lottieSVG.style = '';
            lottieSVG.setAttribute('class', 'guten-shape-fill');
            lottieSVG.setAttribute('preserveAspectRatio', 'none');
        });
    }
};

export const loadDividerPlay = ({ attributes, animation, container, elementId, position }) => {
    const {
        loadOn,
        offset = { point: 50, unit: '%' },
        hoverAnchor,
        pauseOnLeave
    } = attributes;

    const percentageOffset = Number(offset?.point) || 0;
    const dataId = elementId ? elementId.split('-')[1] : '';

    const scrollVar = `dividerAnimScroll${position}${dataId}`;
    const hoverVar = `dividerAnimHover${position}${dataId}`;
    const hoverLeaveVar = `dividerAnimHoverLeave${position}${dataId}`;

    const windowEl = container.ownerDocument.defaultView || container.ownerDocument.parentWindow;
    const scroller = windowEl.document.querySelector('.interface-interface-skeleton__content') || windowEl;
    const anchor = windowEl.document.querySelector(hoverAnchor ? `.${hoverAnchor}` : '.is-root-container');
    const element = container.closest('.guten-element');

    if (windowEl[scrollVar]) {
        scroller.removeEventListener('scroll', windowEl[scrollVar]);
        delete windowEl[scrollVar];
    }

    if (windowEl[hoverVar] && anchor) {
        anchor.removeEventListener('scroll', windowEl[hoverVar]);
        delete windowEl[hoverVar];
    }

    if (windowEl[hoverLeaveVar] && anchor) {
        anchor.removeEventListener('scroll', windowEl[hoverLeaveVar]);
        delete windowEl[hoverLeaveVar];
    }

    if (loadOn === 'pageload') {
        animation.play();
    } else if (loadOn === 'viewport') {
        windowEl[scrollVar] = () => {
            const offset = element.getBoundingClientRect();
            const elementOffsetTop = offset.top;

            const viewportHeight = scroller.clientHeight || scroller.innerHeight;
            const viewportOffset = scroller.scrollHeight || windowEl.document.body.scrollHeight;
            const viewportYOffset = scroller.scrollTop || scroller.scrollY;

            const reachTrigger = elementOffsetTop <= (viewportHeight * percentageOffset / 100);
            const reachBottom = viewportYOffset >= viewportOffset - viewportHeight;
            const backPosition = (elementOffsetTop - viewportHeight) >= 0;
            const atTheBottom = elementOffsetTop > 0 &&  (viewportHeight + Math.ceil(viewportYOffset)) >= (viewportOffset - (viewportHeight * (100 - percentageOffset) / 100));

            if (reachTrigger || (atTheBottom && reachBottom)) {
                animation.play();
            } else if (backPosition) {
                if (pauseOnLeave) {
                    animation.pause();
                }
            }
        };

        scroller.addEventListener('scroll', windowEl[scrollVar]);
    } else if (loadOn === 'hover') {
        windowEl[hoverVar] = () => {
            animation.play();
        };

        windowEl[hoverLeaveVar] = () => {
            animation.pause();
        };

        if (anchor) {
            anchor.addEventListener('mouseenter', windowEl[hoverVar]);

            if (pauseOnLeave) {
                anchor.addEventListener('mouseleave', windowEl[hoverLeaveVar]);
            }
        }
    }
};

export const SectionDividerAnimatedTop = ({ attributes }) => {
    const {
        elementId,
        topDividerAnimated
    } = attributes;

    const {
        type,
        flip,
        front,
    } = topDividerAnimated;

    let divider = '';
    let divRef = useRef();

    const classNames = classnames(
        'guten-shape-divider-animated',
        'guten-shape-divider-animated-top',
        {
            'guten-shape-flip': flip,
            'guten-shape-zindex': front
        }
    );

    if (type && type !== 'none') {
        divider = shapeDividerAnimatedLoader(topDividerAnimated);
    }

    useEffect(() => {
        loadDivider({ attributes: topDividerAnimated, divRef, divider, elementId, position: 'top' });
    }, [divRef, divider]);

    return <div className={classNames} ref={divRef}></div>;
};

export const SectionDividerAnimatedBottom = ({ attributes }) => {
    const {
        elementId,
        bottomDividerAnimated
    } = attributes;

    const {
        type,
        flip,
        front,
    } = bottomDividerAnimated;

    let divider = '';
    let divRef = useRef();

    const classNames = classnames(
        'guten-shape-divider-animated',
        'guten-shape-divider-animated-bottom',
        {
            'guten-shape-flip': flip,
            'guten-shape-zindex': front
        }
    );

    if (type && type !== 'none') {
        divider = shapeDividerAnimatedLoader(bottomDividerAnimated);
    }

    useEffect(() => {
        loadDivider({ attributes: bottomDividerAnimated, divRef, divider, elementId, position: 'bottom' });
    }, [divRef, divider]);

    return <div className={classNames} ref={divRef}></div>;
};

export const SectionDividerAnimatedTopSave = ({ attributes }) => {
    const {
        topDividerAnimated
    } = attributes;

    const {
        flip,
        front,
    } = topDividerAnimated;

    const classNames = classnames(
        'guten-shape-divider-animated',
        'guten-shape-divider-animated-top',
        {
            'guten-shape-flip': flip,
            'guten-shape-zindex': front
        }
    );

    return <div className={classNames}></div>;
};

export const SectionDividerAnimatedBottomSave = ({ attributes }) => {
    const {
        bottomDividerAnimated
    } = attributes;

    const {
        flip,
        front,
    } = bottomDividerAnimated;

    const classNames = classnames(
        'guten-shape-divider-animated',
        'guten-shape-divider-animated-bottom',
        {
            'guten-shape-flip': flip,
            'guten-shape-zindex': front
        }
    );

    return <div className={classNames}></div>;
};