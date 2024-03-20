import { __ } from '@wordpress/i18n';
import { BackgroundControl } from 'gutenverse-core/controls';
import { handleBackground } from 'gutenverse-core/styling';

export const overlayPanel = (props) => {
    const {
        elementId,
    } = props;

    return [
        {
            id: 'hoverBgColor',
            label: __('Overlay Background', 'gutenverse'),
            component: BackgroundControl,
            options: [ 'default', 'gradient' ],
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.guten-team .profile-box .profile-card.card-overlay:before`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
    ];
};