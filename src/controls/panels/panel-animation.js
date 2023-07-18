import { AnimationControl } from 'gutenverse-core/controls';

export const animationPanel = (props) => {
    const {elementId, selector} = props;

    return [
        {
            id: 'animation',
            component: AnimationControl,
            style: [
                {
                    selector: selector ? selector : `.${elementId}`,
                    allowRender: value => value,
                    render: value => {
                        const { delay = 100 } = value;
                        return `animation-delay: ${delay / 1000}s;`;
                    }
                }
            ]
        }
    ];
};