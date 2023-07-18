import { useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { isAlignStickyColumn, isFSE } from 'gutenverse-core/helper';
import isEmpty from 'lodash/isEmpty';
import { Helmet } from 'gutenverse-core/components';

export const withAnimationSticky = () => (BlockElement) => {
    return (props) => {
        const [ stickyRef, setStickyRef ] = useState(null);
        const [ headElement, setHeadElement ] = useState(null);
        const [ windowElement, setWindowElement ] = useState(null);

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

        const {
            attributes,
            setAttributes,
            context,
        } = props;

        const {
            elementId,
            sticky = {},
            stickyShowOn,
            stickyPosition,
            stickyEase = 'none',
            stickyDuration = 0.25,
            topSticky,
            bottomSticky,
            sectionVerticalAlign
        } = attributes;

        const elementVar = elementId?.replaceAll('-', '');
        const stVar = `stSticky${elementVar}`;
        const animationVar = `gsapStickyAnimation${elementVar}`;
        const loadVar = `loadSticky${elementVar}`;
        const loadTimeoutVar = `loadStickyTimeout${elementVar}`;

        const stickyAttributes = {
            elementId,
            stVar,
            animationVar,
            sticky,
            stickyShowOn,
            stickyPosition,
            stickyEase,
            stickyDuration,
            topSticky,
            bottomSticky,
            sectionVerticalAlign,
            elementType: props.name,
        };

        const enable = deviceType && sticky[deviceType] && (props.name !== 'gutenverse/column' || isAlignStickyColumn(sectionVerticalAlign));

        const windowRef = windowElement;

        const killAnimation = () => {
            if (windowRef) {
                const wrapper = props.name === 'gutenverse/section' ? windowRef.document.querySelector(`.${elementId}`)?.parentElement : windowRef.document.querySelector(`.${elementId}`);
                const dummy = wrapper && wrapper.parentElement.querySelector(`.sticky-dummy-${elementId}`);

                if (windowRef[stVar]) {
                    windowRef[stVar].kill(true);
                }

                if (windowRef[animationVar]) {
                    windowRef[animationVar].kill(true);
                }

                if (dummy) {
                    dummy.remove();
                }

                if (wrapper) {
                    wrapper.classList.remove('pinned');

                    if (windowRef.gsap) {
                        windowRef.gsap.set(wrapper, { clearProps: true });
                    }
                }
            }
        };

        if (props.name === 'gutenverse/column') {
            setAttributes({
                sectionVerticalAlign: context['gutenverse/sectionVerticalAlign'],
            });
        }

        useEffect(() => {
            if (stickyRef && stickyRef.ownerDocument) {
                setTimeout(() => {
                    const windowEl = stickyRef.ownerDocument.defaultView || stickyRef.ownerDocument.parentWindow;
                    const headEl = windowEl.document.getElementsByTagName('head')[0];
                    // const bodyEl = windowEl.document.getElementsByTagName('body')[0];

                    setHeadElement(headEl);
                    setWindowElement(windowEl);
                }, 1);
            }
        }, [stickyRef]);

        useEffect(() => {
            if (!enable) {
                killAnimation();
            }

            return () => killAnimation();
        }, [enable, windowElement]);

        return <>
            {enable && <Helmet device={deviceType} head={headElement}>
                {window.GutenverseProJSURL && <script async src={window.GutenverseProJSURL.editorSticky}></script>}
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

                            if (window.gsticky) {
                                clearTimeout(${loadTimeoutVar});
                                window.gsticky.loadSticky(${JSON.stringify(stickyAttributes)});
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
                setStickyRef={setStickyRef}
            />
        </>;
    };
};
