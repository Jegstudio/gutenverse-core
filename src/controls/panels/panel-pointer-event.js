import { PointerControl } from 'gutenverse-core/controls';
import { handlePointerEvent } from 'gutenverse-core/styling';

export const pointerEventPanel = (props) => {
    const {
        elementId,
        selector
    } = props;

    return [
        {
            id: 'pointer',
            allowDeviceControl: true,
            component: PointerControl,
            // style below is deprecated
            style: [
                {
                    selector: selector ? selector : `.${elementId}`,
                    hasChild: true,
                    render: value => handlePointerEvent(value)
                }
            ]
        },
    ];
};