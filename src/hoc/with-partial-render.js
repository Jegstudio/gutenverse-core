import { useRef, useState, useEffect } from '@wordpress/element';
import { isOnEditor } from 'gutenverse-core/helper';

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
        const [windowElement, setWindowElement] = useState(null);
        const renderRef = useRef();

        useEffect(() => {
            startPartialRender();
        }, [renderRef, windowElement]);

        useEffect(() => {
            if (renderRef?.current && renderRef?.current?.ownerDocument) {
                const windowEl = renderRef?.current?.ownerDocument?.defaultView || renderRef?.current?.ownerDocument?.parentWindow;
                setWindowElement(windowEl);
            }
        }, [renderRef]);

        const startPartialRender = () => {
            if ( windowElement && renderRef?.current && renderRef?.current?.getBoundingClientRect ) {
                const positionData = renderRef?.current?.getBoundingClientRect();
                const checking = isOnEditor() ? (positionData?.top < (3 * windowElement?.innerHeight)) : (positionData?.top < (2 * windowElement?.innerHeight));

                if (checking) {
                    setPartialRender(true);
                }
            }
        };

        // Move this to useEffect
        windowElement?.addEventListener('scroll', () => {
            startPartialRender();
        });

        return partialRender ? <BlockElement {...props}/> : <BlockLoading renderRef={renderRef}/>;
    };
};