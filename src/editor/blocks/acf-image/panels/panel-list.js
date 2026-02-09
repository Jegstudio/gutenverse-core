/* WordPress dependencies */
import { __ } from '@wordpress/i18n';
import { advancePanel, animationPanel, backgroundPanel, borderPanel, conditionPanel, maskPanel, positioningPanel, responsivePanel, transformPanel } from 'gutenverse-core/controls';
import { SelectControl, TextControl, SizeControl } from 'gutenverse-core/controls';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';

export const settingPanel = () => {
    return [
        {
            id: 'fieldKey',
            label: __('Field Key', 'gutenverse'),
            component: TextControl,
            description: __('Enter the ACF Image Field Name/Key here.', 'gutenverse'),
        },
        {
            id: 'size',
            label: __('Image Size', 'gutenverse'),
            component: SelectControl,
            options: [
                { label: __('Thumbnail'), value: 'thumbnail' },
                { label: __('Medium'), value: 'medium' },
                { label: __('Large'), value: 'large' },
                { label: __('Full'), value: 'full' },
            ],
        },
    ];
};

export const stylePanel = () => {
    return [
        {
            id: 'width',
            label: __('Width', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 1000,
                    step: 1,
                },
                '%': {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1,
                },
            },
        },
        {
            id: 'height',
            label: __('Height', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 1000,
                    step: 1,
                },
                '%': {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1,
                },
            },
        },
    ];
};

export const panelList = () => {
    return [
        {
            title: __('Setting', 'gutenverse'),
            panelArray: settingPanel,
            tabRole: TabSetting,
            initialOpen: true,
        },
        {
            title: __('Dimensions', 'gutenverse'),
            panelArray: stylePanel,
            tabRole: TabStyle,
        },
        {
            title: __('Border', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => borderPanel({
                ...props,
                styleId: 'acf-image-border',
            }),
            tabRole: TabStyle,
        },
        {
            title: __('Display', 'gutenverse'),
            initialOpen: false,
            panelArray: responsivePanel,
            tabRole: TabSetting,
        },
        {
            title: __('Positioning', 'gutenverse'),
            initialOpen: false,
            panelArray: positioningPanel,
            tabRole: TabSetting,
        },
        {
            title: __('Animation Effects', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => animationPanel({
                ...props,
                styleId: 'acf-image-animation',
            }),
            tabRole: TabSetting,
        },
        {
            title: __('Transform', 'gutenverse'),
            initialOpen: false,
            panelArray: transformPanel,
            pro: true,
        },
        {
            title: __('Spacing', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                styleId: 'acf-image-advance',
            }),
            tabRole: TabSetting,
        },
        {
            title: __('Condition', 'gutenverse'),
            panelArray: conditionPanel,
            initialOpen: false,
            pro: true,
        },
    ];
};
