import throttle from 'lodash/throttle';
import { useCallback } from '@wordpress/element';
import { setControlStyle } from 'gutenverse-core/editor-helper';

const BlockController = (props) => {
    const {
        panelProps,
        panelArray,
        elementRef
    } = props;

    const throttleSave = useCallback(
        throttle(({ id, value, style, allowDeviceControl }) => {
            style.map((item, index) => {
                setControlStyle({
                    ...panelProps,
                    id: item.updateID ? item.updateID : `${id}-style-${index}`,
                    value,
                    style: item,
                    allowDeviceControl
                });
            });
        }, 100),
        []
    );

    return panelArray(panelProps).map((item) => {
        const { id, show, onChange, component: Component, style, allowDeviceControl = false, proLabel } = item;
        const { clientId, setAttributes } = panelProps;

        const onValueChange = (value) => {
            const newValue = {
                [id]: value
            };

            !proLabel && setAttributes(newValue);

            onChange ? onChange({
                ...panelProps,
                ...newValue
            }) : null;
        };

        const onStyleChange = (value) => {
            if (style) {
                throttleSave({ id, value, style, allowDeviceControl });
            }
        };

        return show !== false && <Component
            key={`${id}`}
            {...item}
            clientId={clientId}
            value={panelProps[id]}
            values={panelProps}
            onValueChange={onValueChange}
            onStyleChange={onStyleChange}
            elementRef={elementRef}
            isOpen={true}
            throttleSave={throttleSave}
        />;
    });
};

export default BlockController;