import { __ } from '@wordpress/i18n';
import { BackgroundControl } from 'gutenverse-core/controls';

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
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'overlayColor',
                    'selector': `.${elementId}.guten-popup-builder .guten-popup-overlay`,
                }
            ]
        },
    ];
};
