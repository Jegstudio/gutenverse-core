import { AlertControl, RangeControl, SwitchControl } from 'gutenverse-core/controls';
import { __ } from '@wordpress/i18n';

export const blurPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

    return [{
        id: 'blur-notice',
        component: AlertControl,
        children: <>
            <span>{__('This option will blur background and anything behind this element')}</span>
        </>
    },
    {
        id: '__blurHover',
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
        onChange: ({ __blurHover }) => setSwitcher({ ...switcher, state: __blurHover })
    },
    {
        id: 'blur',
        label: __('Blur', '--gctd--'),
        show: !switcher.state || switcher.state === 'normal',
        component: RangeControl,
        min: 0,
        max: 100,
        allowDeviceControl: true,
        style: [
            {
                selector: `.${elementId}`,
                render: value => `-webkit-backdrop-filter: blur(${value}px); backdrop-filter: blur(${value}px);`
            }
        ]
    },
    {
        id: 'blurHover',
        label: __('Blur Hover', '--gctd--'),
        show: switcher.state === 'hover',
        component: RangeControl,
        min: 0,
        max: 100,
        allowDeviceControl: true,
        style: [
            {
                selector: `.${elementId}:hover`,
                render: value => `-webkit-backdrop-filter: blur(${value}px); backdrop-filter: blur(${value}px);`
            }
        ]
    }];
};