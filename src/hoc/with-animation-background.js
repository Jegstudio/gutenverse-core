import { useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { isAnimationActive, isFSE } from 'gutenverse-core/helper';
import { responsiveBreakpoint } from 'gutenverse-core/helper';
import isEmpty from 'lodash/isEmpty';
import { Helmet } from 'gutenverse-core-editor/components';

export const withAnimationBackground = (blockType) => (BlockElement) => {
    return (props) => {
        const [ bgAnimatedRef, setBgAnimatedRef ] = useState(null);
        const [ headElement, setHeadElement ] = useState(null);
        const [ windowElement, setWindowElement ] = useState(null);

        const { tabletBreakpoint, mobileBreakpoint } = responsiveBreakpoint();

        const {
            attributes
        } = props;

        const {
            elementId,
            backgroundAnimated = {}
        } = attributes;

        const {
            breakpoint = 'Desktop',
        } = backgroundAnimated;

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

        const elementVar = elementId?.replaceAll('-', '');
        const gbganimatedVar = `gbganimated${elementVar}`;
        const loadVar = `loadBgAnimated${elementVar}`;
        const loadTimeoutVar = `loadBgAnimatedTimeout${elementVar}`;
        const animationVar = `gsapBgAnimated${elementVar}`;
        const stVar = `stBgAnimated${elementVar}`;
        const anchorVar = `anchorBgAnimated${elementVar}`;
        const scrollVar = `scrollBgAnimated${elementVar}`;
        const viewportWidth = windowElement ? windowElement.document.querySelector('.interface-interface-skeleton__content')?.innerWidth || windowElement.innerWidth || 0 : 0;
        const enable = isAnimationActive(backgroundAnimated)
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
            scrollVar,
            backgroundAnimated
        };

        const killAnimation = () => {
            if (windowRef) {
                if (windowRef[stVar]) {
                    windowRef[stVar].kill(true);
                }

                if (windowRef[animationVar]) {
                    windowRef[animationVar].kill(true);
                }

                if (windowRef[gbganimatedVar]) {
                    windowRef[gbganimatedVar].clearProps();
                    delete windowRef[gbganimatedVar];
                }
            }
        };

        useEffect(() => {
            if (bgAnimatedRef) {
                setTimeout(() => {
                    const windowEl = bgAnimatedRef.ownerDocument.defaultView || bgAnimatedRef.ownerDocument.parentWindow;
                    const headEl = windowEl.document.getElementsByTagName('head')[0];
                    // const bodyEl = windowEl.document.getElementsByTagName('body')[0];

                    setHeadElement(headEl);
                    setWindowElement(windowEl);
                }, 1);
            }
        }, [bgAnimatedRef]);

        useEffect(() => {
            if (!enable) {
                killAnimation();
            }

            return () => killAnimation();
        }, [enable, windowElement]);

        return <>
            {enable && <Helmet device={deviceType} head={headElement}>
                {window.GutenverseProJSURL && <script async src={window.GutenverseProJSURL?.editorBgAnimated}></script>}
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

                            if (window.gbganimated) {
                                clearTimeout(${loadTimeoutVar});
                                window.${gbganimatedVar} = Object.assign(Object.create(Object.getPrototypeOf(window.gbganimated)), window.gbganimated);
                                window.${gbganimatedVar}.loadAnimation(${JSON.stringify(adanimAttributes)});
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
                setBgAnimatedRef={setBgAnimatedRef}
            />
        </>;
    };
};
