
import { TextStrokeControl  } from 'gutenverse-core/controls';
import { handleTextStroke } from 'gutenverse-core/styling';
export const textStrokePanel = (props) => {
    const {
        elementId,
        selector
    } = props;

    return [
        {
            id: 'textStroke',
            allowDeviceControl: true,
            component: TextStrokeControl,
            style: [
                {
                    selector: selector ? selector : `.${elementId}`,
                    render: value => handleTextStroke(value)
                }
            ]
        },
    ];
};