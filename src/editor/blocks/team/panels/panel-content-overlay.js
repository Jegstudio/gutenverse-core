import { __ } from '@wordpress/i18n';
import { ColorControl } from 'gutenverse-core/controls';
import { handleColor } from 'gutenverse-core/controls';

export const overlayPanel = (props) => {
    const {
        elementId,
    } = props;

    return [
        {
            id: 'hoverBgColor',
            label: __('Overlay Background Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}.guten-team .profile-box .profile-card.card-overlay:before`,
                    render: value => handleColor(value, 'background')
                }
            ]
        },
    ];
};