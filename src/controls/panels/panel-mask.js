import { MaskControl } from 'gutenverse-core/controls';
import { handleMask } from 'gutenverse-core/styling';

export const maskPanel = (props) => {
    const {
        elementId,
        selector
    } = props;
    return [
        {
            id: 'mask',
            allowDeviceControl: true,
            component: MaskControl,
            style: [
                {
                    selector: selector ? selector : `.${elementId}`,
                    hasChild: true,
                    render: value => handleMask(value)
                }
            ]
        },
    ];
};