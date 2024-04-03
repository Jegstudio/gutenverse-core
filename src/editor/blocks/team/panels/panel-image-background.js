import { __ } from '@wordpress/i18n';
import { BackgroundControl, SwitchControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { handleBackground } from 'gutenverse-core/styling';

export const imageBackgroundPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
    } = props;

    return [
        {
            id: '__imageBackgroundHover',
            component: SwitchControl,
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                }
            ],
            onChange: ({ __imageBackgroundHover }) => setSwitcher({ ...switcher, imageBackground: __imageBackgroundHover })
        },
        {
            id: 'imageBackground',
            show: !switcher.imageBackground || switcher.imageBackground === 'normal',
            label: __('Background', 'gutenverse'),
            component: BackgroundControl,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .profile-box .profile-card img`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'imageBackgroundHover',
            show: switcher.imageBackground === 'hover',
            label: __('Background Hover', 'gutenverse'),
            component: BackgroundControl,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .profile-box .profile-card img:hover`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
    ];
};