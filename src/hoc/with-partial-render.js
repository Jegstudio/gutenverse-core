// import { useSelect } from '@wordpress/data';
import { useRef, useState, useEffect } from '@wordpress/element';
import { isOnEditor } from 'gutenverse-core/helper';
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
        const renderRef = useRef();
        // const deviceType = getDeviceType();

        useEffect(() => {
            if (!window.IntersectionObserver || !renderRef?.current) {
                return;
            }

            const blockElement = renderRef.current;
            const postEditor = blockElement?.ownerDocument?.getElementsByClassName('interface-interface-skeleton__content');
            const windowEl = postEditor?.length > 0 ? postEditor[0] : blockElement?.ownerDocument;

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
                    root: windowEl,
                    rootMargin: isOnEditor() ? '150% 0px' : '0px',
                    threshold: 0,
                }
            );

            observer.observe(blockElement);

            return () => {
                observer.disconnect();
            };
        }, [renderRef]);


        // // useEffect(() => {
        // //     if (partialRender) {
        // //         setPartialRender(false);
        // //     }
        // // }, [deviceType]);

        return partialRender ? <BlockElement {...props}/> : <BlockLoading renderRef={renderRef}/>;
    };
};