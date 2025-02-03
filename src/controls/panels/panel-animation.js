import { AnimationControl } from 'gutenverse-core/controls';

export const animationPanel = (props) => {
    const {elementId, selector} = props;

    return [
        {
            id: 'animation',
            component: AnimationControl
        }
    ];
};