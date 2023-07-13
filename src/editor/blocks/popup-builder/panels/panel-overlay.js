import { __ } from '@wordpress/i18n';
import { BackgroundControl } from 'gutenverse-core-editor/controls';
import { handleBackground } from 'gutenverse-core/styling';

export const overlayPanel = (props) => {
    const {
        elementId,
    } = props;

    return [
        {
            id: 'overlayColor',
            label: __('Overlay Background', 'gutenverse'),
            component: BackgroundControl,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .guten-popup-overlay`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
    ];
};
