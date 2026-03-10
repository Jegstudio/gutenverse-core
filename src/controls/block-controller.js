import { updateLiveStyle } from 'gutenverse-core/styling';
import { useEffect, useRef } from '@wordpress/element';
import { store as editorStore } from '@wordpress/editor';
import { useSelect } from '@wordpress/data';

const BlockController = (props) => {
    const {
        panelProps,
        panelArray,
        elementRef,
        panelIndex
    } = props;

    const deviceType = useSelect((select) => {
        const editor = select(editorStore);
        if (editor?.getDeviceType) return editor.getDeviceType();
        return 'Desktop';
    }, []);

    const { clientId, setAttributes, elementId, setLiveAttr, liveAttr, setPreviewOpen } = panelProps;

    let timeoutRef = useRef(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);
    const enrichedPanelProps = { ...panelProps, deviceType }

    return panelArray(enrichedPanelProps).map((item) => {
        const { id, show, onChange, component: Component, proLabel, forceType, liveStyle = [] } = item;

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
                ...enrichedPanelProps,
                ...newValue
            }) : null;
        };

        const onLocalChange = (value) => {
            const newValue = {
                [id]: value
            };

            timeoutRef.current = liveStyle && updateLiveStyle({ elementId, attributes: newValue, styles: liveStyle, elementRef });
            if (setLiveAttr) {
                setLiveAttr({
                    ...liveAttr,
                    [id]: value
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
            setAttributes={setAttributes}
            elementRef={elementRef}
            isOpen={true}
            panelIndex={panelIndex}
            setPreviewOpen={setPreviewOpen}
        />;
    });
};

export default BlockController;