import { updateLiveStyle } from 'gutenverse-core/styling';
import { useEffect, useRef } from '@wordpress/element';

const BlockController = (props) => {
    const {
        panelProps,
        panelArray,
        elementRef,
        panelIndex
    } = props;

    let timeoutRef = useRef(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);
    return panelArray(panelProps).map((item) => {
        const { id, show, onChange, component: Component, proLabel, forceType, liveStyle = [] } = item;
        const { clientId, setAttributes, elementId, setLiveAttr, liveAttr, setPreviewOpen } = panelProps;

        const onValueChange = (value) => {

            switch (forceType) {
                case 'string':
                    value = value.toString();
                    break;
                case 'integer':
                    value = parseInt(value);
                    break;
            }


            const newValue = {
                [id]: value
            };
            if (!proLabel) {
                setAttributes(newValue);
            }

            onChange ? onChange({
                ...panelProps,
                ...newValue
            }) : null;
        };

        const onLocalChange = (value) => {
            const newValue = {
                [id]: value
            };

            timeoutRef.current = liveStyle && updateLiveStyle({elementId, attributes: newValue, styles: liveStyle, elementRef});
            if(setLiveAttr){
                setLiveAttr({
                    ...liveAttr,
                    [id] : value
                });
            }
        };

        return show !== false && <Component
            key={`${id}`}
            {...item}
            clientId={clientId}
            value={panelProps[id]}
            values={panelProps}
            onValueChange={onValueChange}
            onLocalChange={onLocalChange}
            elementRef={elementRef}
            isOpen={true}
            panelIndex={panelIndex}
            setPreviewOpen={setPreviewOpen}
        />;
    });
};

export default BlockController;