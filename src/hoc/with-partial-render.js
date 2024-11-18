import { useRef, useState } from '@wordpress/element';
import { Skeleton } from 'gutenverse-core/components';
import { isOnEditor } from 'gutenverse-core/helper';
import { memo } from 'react';
import { useEffect } from 'react';

const BlockLoading = memo(({
    renderRef
}) => {
    return <div className="gutenverse-block-loading" ref={renderRef}>
        {/* <div className="gutenverse-load-ring-anim">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div> */}
        <Skeleton width="calc(100% - 24px)" height="calc(200px - 24px)" borderRadius={5}/>
    </div>;
});

export const withPartialRender = (BlockElement) => {
    return (props) => {
        const [partialRender, setPartialRender] = useState(false);
        const [windowElement, setWindowElement] = useState(null);
        const renderRef = useRef();

        useEffect(() => {
            startPartialRender();
        }, [windowElement]);

        useEffect(() => {
            if (renderRef?.current && renderRef?.current?.ownerDocument) {
                const windowEl = renderRef?.current?.ownerDocument?.defaultView || renderRef?.current?.ownerDocument?.parentWindow;
                setWindowElement(windowEl);
            }
        }, [renderRef]);

        const startPartialRender = () => {
            if ( windowElement && renderRef?.current && renderRef?.current?.getBoundingClientRect() ) {
                const positionData = renderRef?.current?.getBoundingClientRect();
                const checking = isOnEditor() ? (positionData?.top < (3 * windowElement?.innerHeight)) : (positionData?.top < (2 * windowElement?.innerHeight));

                if (checking) {
                    setPartialRender(true);
                }
            }
        };

        windowElement?.addEventListener('scroll', () => {
            startPartialRender();
        });

        return partialRender ? <BlockElement {...props}/> : <BlockLoading renderRef={renderRef}/>;
    };
};