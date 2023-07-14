import { useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { isFSE } from 'gutenverse-core/helper';
import { responsiveBreakpoint } from 'gutenverse-core/helper';
import isEmpty from 'lodash/isEmpty';
import { Helmet } from 'gutenverse-core-editor/components';

export const withAnimationAdvance = (blockType) => (BlockElement) => {
    return (props) => {
        const [ adanimRef, setAdanimRef ] = useState(null);
        const [ headElement, setHeadElement ] = useState(null);
        const [ windowElement, setWindowElement ] = useState(null);

        const { tabletBreakpoint, mobileBreakpoint } = responsiveBreakpoint();

        const {
            attributes
        } = props;

        const {
            elementId,
            advanceAnimation = {}
        } = attributes;

        const {
            type,
            breakpoint = 'Desktop',
        } = advanceAnimation;

        // keep this using useSelect instead of getDeviceType, to trigger changes
        const {
            deviceType,
        } = useSelect(
            (select) => {
                const editor = isFSE() ? select('core/edit-site') : select('core/edit-post');

                if (isEmpty(editor)) {
                    return ({
                        deviceType: (isFSE() ? wp.data.select('core/edit-site') : wp.data.select('core/edit-post')).__experimentalGetPreviewDeviceType(),
                    });
                }

                return ({
                    deviceType: editor.__experimentalGetPreviewDeviceType(),
                });
            },
            []
        );

        const iframeEl = document.querySelector('iframe[name="editor-canvas"]');
        if ( iframeEl ) {
            const iframeWindow = iframeEl.contentWindow;
            iframeWindow.gutenverseCore = iframeWindow.parent.gutenverseCore;
        }

        const elementVar = elementId?.replaceAll('-', '');
        const gadanimVar = `gadanim${elementVar}`;
        const loadVar = `loadAdanim${elementVar}`;
        const loadTimeoutVar = `loadAdanimTimeout${elementVar}`;
        const animationVar = `gsapAdanim${elementVar}`;
        const stVar = `stAdanim${elementVar}`;
        const anchorVar = `anchorAdanim${elementVar}`;
        const hoverVar = `hoverAdanim${elementVar}`;
        const hoverLeaveVar = `hoverLeaveAdanim${elementVar}`;
        const scrollVar = `scrollAdanim${elementVar}`;
        const scrollerVar = `scrollerAdanim${elementVar}`;
        const viewportWidth = windowElement ? windowElement.document.querySelector('.interface-interface-skeleton__content')?.innerWidth || windowElement.innerWidth || 0 : 0;
        const enable = type !== undefined
            && ((breakpoint === 'Desktop' && viewportWidth > tabletBreakpoint)
                || (breakpoint === 'Tablet' && viewportWidth > mobileBreakpoint)
                || (breakpoint === 'Mobile' && viewportWidth > 0));

        const windowRef = windowElement;

        const adanimAttributes = {
            elementId,
            blockType,
            stVar,
            anchorVar,
            animationVar,
            hoverVar,
            hoverLeaveVar,
            scrollVar,
            scrollerVar,
            advanceAnimation
        };

        const killAnimation = () => {
            if (windowRef) {
                if (windowRef[stVar]) {
                    windowRef[stVar].kill(true);
                }

                if (windowRef[animationVar]) {
                    windowRef[animationVar].kill(true);
                }

                if (windowRef[scrollVar] && windowRef[scrollerVar]) {
                    windowRef[scrollerVar].removeEventListener('scroll', windowRef[scrollVar]);
                }

                if (windowRef[anchorVar]) {
                    if (windowRef[hoverVar]) {
                        windowRef[anchorVar].removeEventListener('mouseenter', windowRef[hoverVar]);
                    }

                    if (windowRef[hoverLeaveVar]) {
                        windowRef[anchorVar].removeEventListener('mouseleave', windowRef[hoverLeaveVar]);
                    }
                }

                if (windowRef[gadanimVar]) {
                    windowRef[gadanimVar].clearProps();
                    delete windowRef[gadanimVar];
                }
            }
        };

        useEffect(() => {
            if (adanimRef) {
                setTimeout(() => {
                    const windowEl = adanimRef.ownerDocument.defaultView || adanimRef.ownerDocument.parentWindow;
                    const headEl = windowEl.document.getElementsByTagName('head')[0];
                    // const bodyEl = windowEl.document.getElementsByTagName('body')[0];

                    setHeadElement(headEl);
                    setWindowElement(windowEl);
                }, 1);
            }
        }, [adanimRef]);

        useEffect(() => {
            if (!enable) {
                killAnimation();
            }

            return () => killAnimation();
        }, [enable, windowElement]);

        return <>
            {enable && <Helmet device={deviceType} head={headElement}>
                {window.GutenverseProJSURL && <script async src={window.GutenverseProJSURL?.editorAdanim}></script>}
            </Helmet>}
            <Helmet device={deviceType} head={headElement}>
                {enable && window.GutenverseProJSURL && <script>
                    {
                        `
                        var ${loadTimeoutVar} = null;
                        var ${loadVar} = function() {
                            ${loadTimeoutVar} = setTimeout(function() {
                                ${loadVar}();
                            }, 500);

                            if (window.gadanim) {
                                clearTimeout(${loadTimeoutVar});
                                window.${gadanimVar} = Object.assign(Object.create(Object.getPrototypeOf(window.gadanim)), window.gadanim);
                                window.${gadanimVar}.loadAnimation(${JSON.stringify(adanimAttributes)});
                            }
                        }

                        ${loadVar}();
                        `
                    }
                </script>}
            </Helmet>
            <BlockElement
                {...props}
                deviceType={deviceType}
                setAdanimRef={setAdanimRef}
            />
        </>;
    };
};
