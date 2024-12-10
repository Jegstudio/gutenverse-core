
import { __ } from '@wordpress/i18n';
import { AlertControl, ColorControl, IconControl, SizeControl, SwitchControl} from 'gutenverse-core/controls';
import { handleColor, handleUnitPoint } from 'gutenverse-core/styling';

export const iconPanel = (props) => {
    const {
        elementId,
        showIcon,
        switcher,
        setSwitcher
    } = props;

    return [
        {
            id: 'icon-notice',
            component: AlertControl,
            children: <>
                <span>{__('This Panel Option Only Show If You Turn On "Show Icon" Option')}</span>
            </>
        },
        {
            id: 'icon',
            show: showIcon,
            label: __('Icon', 'gutenverse'),
            component: IconControl
        },
        {
            id: 'iconSpace',
            component: SizeControl,
            show: showIcon,
            label: __('Icon Space', 'gutenverse'),
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: '%',
                },
                vh: {
                    text: 'vh',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: 'vh',
                },
            },
            style: [
                {
                    selector: `.${elementId} .taxonomy-list-wrapper .icon-list`,
                    allowRender: () => true,
                    render: value => handleUnitPoint(value, 'margin-right')
                }
            ]
        },
        {
            id: 'iconSize',
            component: SizeControl,
            show: showIcon,
            label: __('Icon Size', 'gutenverse'),
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: '%',
                },
                vh: {
                    text: 'vh',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: 'vh',
                },
            },
            style: [
                {
                    selector: `.${elementId} .taxonomy-list-wrapper .icon-list i`,
                    allowRender: () => true,
                    render: value => handleUnitPoint(value, 'font-size')
                }
            ]
        },
        {
            id: '__iconSwitch',
            component: SwitchControl,
            show: showIcon,
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
            onChange: ({ __iconSwitch }) => setSwitcher({ ...switcher, iconSwitch: __iconSwitch })
        },
        {
            id: 'iconColor',
            label: __('Icon Color', 'gutenverse'),
            component: ColorControl,
            show: (!switcher.iconSwitch || switcher.iconSwitch === 'normal') && showIcon,
            style: [
                {
                    selector: `.${elementId} .taxonomy-list-wrapper .taxonomy-list-item a .icon-list`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'iconColorHover',
            label: __('Icon Color', 'gutenverse'),
            component: ColorControl,
            show: switcher.iconSwitch === 'hover' && showIcon,
            style: [
                {
                    selector: `.${elementId} .taxonomy-list-wrapper .taxonomy-list-item a:hover .icon-list`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
    ];
};
