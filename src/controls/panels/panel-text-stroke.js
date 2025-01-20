
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
            component: TextStrokeControl,
            style: [
                {
                    selector: selector ? selector : `.${elementId}`,
                    hasChild: true,
                    render: value => handleTextStroke(value)
                }
            ]
        },
    ];
};