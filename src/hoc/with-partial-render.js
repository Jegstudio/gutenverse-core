// import { useSelect } from '@wordpress/data';
import { useRef, useState, useEffect } from '@wordpress/element';
// import { Skeleton } from 'gutenverse-core/components';
// import { getDeviceType } from 'gutenverse-core/editor-helper';
// import { isOnEditor } from 'gutenverse-core/helper';

const BlockLoading = ({
    renderRef
}) => {
    return <div className="gutenverse-block-loading" ref={renderRef}>
        <div></div>
    </div>;
};

export const withPartialRender = (BlockElement) => {
    return (props) => {
        const [partialRender, setPartialRender] = useState(false);
        const [windowData, setWindowData] = useState({});
        const renderRef = useRef();
        // const deviceType = getDeviceType();

        useEffect(() => {
            if (!window.IntersectionObserver || !renderRef?.current) {
                return;
            }

            const blockElement = renderRef.current;

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setPartialRender(true);
                            observer.unobserve(blockElement);
                        }
                    });
                },
                {
                    rootMargin: '240px',
                    threshold: 0.01,
                }
            );

            observer.observe(blockElement);

            return () => {
                observer.disconnect();
            };
        }, [renderRef]);

        // useEffect(() => {
        //     startPartialRender();
        // }, [renderRef, windowData]);

        // useEffect(() => {
        //     const timeout = setTimeout(() => {
        //         if (!renderRef?.current || !renderRef?.current?.ownerDocument) {
        //             return;
        //         }

        //         const elDocument = renderRef?.current?.ownerDocument;
        //         const postEditor = elDocument?.getElementsByClassName('interface-interface-skeleton__content');

        //         if (postEditor?.length > 0) {
        //             setWindowData({
        //                 type: 'post',
        //                 window: postEditor[0]
        //             });
        //         } else {
        //             const iframeEditor = elDocument?.defaultView || elDocument?.parentWindow;
        //             setWindowData({
        //                 type: 'site',
        //                 window: iframeEditor
        //             });
        //         }
        //     }, 500);

        //     return () => clearTimeout(timeout);
        // }, [blocks]);

        // // useEffect(() => {
        // //     if (partialRender) {
        // //         setPartialRender(false);
        // //     }
        // // }, [deviceType]);

        // const startPartialRender = () => {
        //     if ( !partialRender && windowData?.type && renderRef?.current && renderRef?.current?.getBoundingClientRect ) {
        //         const elementPosition = renderRef?.current?.getBoundingClientRect();
        //         const windowHeight = windowData?.type === 'post' ? windowData?.window?.getBoundingClientRect()?.height : windowData?.window?.innerHeight;
        //         const checking = isOnEditor() ? (elementPosition?.top < (3 * windowHeight)) : (elementPosition?.top < (1.5 * windowHeight));

        //         if (checking) {
        //             setPartialRender(true);
        //         }
        //     }
        // };

        // // Move this to useEffect
        // windowData?.window?.addEventListener('scroll', () => {
        //     startPartialRender();
        // });

        return partialRender ? <BlockElement {...props}/> : <BlockLoading renderRef={renderRef}/>;
    };
};