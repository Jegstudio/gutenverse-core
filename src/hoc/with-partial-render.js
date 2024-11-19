import { useRef, useState, useEffect } from '@wordpress/element';
import { Skeleton } from 'gutenverse-core/components';
// import { getDeviceType } from 'gutenverse-core/editor-helper';
import { isOnEditor } from 'gutenverse-core/helper';

const BlockLoading = ({
    renderRef
}) => {
    return <div className="gutenverse-block-loading" ref={renderRef}>
        <div></div>
        <Skeleton width="100%" height="200px" />
    </div>;
};

export const withPartialRender = (BlockElement) => {
    return (props) => {
        const [partialRender, setPartialRender] = useState(false);
        const [windowData, setWindowData] = useState({});
        const renderRef = useRef();
        // const deviceType = getDeviceType();

        useEffect(() => {
            startPartialRender();
        }, [renderRef, windowData]);

        useEffect(() => {
            const timeout = setTimeout(() => {
                if (!renderRef?.current || !renderRef?.current?.ownerDocument) {
                    return;
                }

                // check if this is site editor
                if (window.location.href.indexOf('site-editor.php') !== -1) {
                    const windowEl = renderRef?.current?.ownerDocument?.defaultView || renderRef?.current?.ownerDocument?.parentWindow;
                    setWindowData({
                        type: 'site',
                        window: windowEl
                    });
                } else {
                    const scrollEl = document?.getElementsByClassName('interface-interface-skeleton__content');
                    scrollEl?.length > 0 && setWindowData({
                        type: 'post',
                        window: scrollEl[0]
                    });
                }
            }, 250);

            return () => clearTimeout(timeout);
        }, [renderRef]);

        // useEffect(() => {
        //     if (partialRender) {
        //         setPartialRender(false);
        //     }
        // }, [deviceType]);

        const startPartialRender = () => {
            if ( !partialRender && windowData?.type && renderRef?.current && renderRef?.current?.getBoundingClientRect ) {
                const elementPosition = renderRef?.current?.getBoundingClientRect();
                const windowHeight = windowData?.type === 'post' ? windowData?.window?.getBoundingClientRect()?.height : windowData?.window?.innerHeight;
                const checking = isOnEditor() ? (elementPosition?.top < (3 * windowHeight)) : (elementPosition?.top < (1.5 * windowHeight));

                if (checking) {
                    setPartialRender(true);
                }
            }
        };

        // Move this to useEffect
        windowData?.window?.addEventListener('scroll', () => {
            startPartialRender();
        });

        return partialRender ? <BlockElement {...props}/> : <BlockLoading renderRef={renderRef}/>;
    };
};