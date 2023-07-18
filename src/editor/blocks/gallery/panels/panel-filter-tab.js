import { __ } from '@wordpress/i18n';
import { BackgroundControl, BorderControl, BoxShadowControl, ColorControl, DimensionControl, SwitchControl, TypographyControl } from 'gutenverse-core-editor/controls';
import { allowRenderBoxShadow, handleBackground, handleBorder, handleColor, handleDimension, handleTypography } from 'gutenverse-core/styling';
import { handleBoxShadow } from 'gutenverse-core/styling';

export const filterTabPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

    return [
        {
            id: 'filterTabPadding',
            label: __('Padding', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.${elementId} .filter-controls .guten-gallery-control`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'filterTabMargin',
            label: __('Margin', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.${elementId} .filter-controls .guten-gallery-control`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'filterTabTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .filter-controls .guten-gallery-control`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: '__filterTab',
            component: SwitchControl,
            options: [
                {
                    value: 'general',
                    label: 'General'
                },
                {
                    value: 'active',
                    label: 'Active'
                }
            ],
            onChange: ({__filterTab}) => setSwitcher({...switcher, filterTab: __filterTab})
        },
        {
            id: 'filterTabTextColor',
            show: !switcher.filterTab || switcher.filterTab === 'general',
            label: __('General Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .filter-controls .guten-gallery-control`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'filterTabTextColorActive',
            show: switcher.filterTab === 'active',
            label: __('Active Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .filter-controls .guten-gallery-control.active`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'filterTabBackground',
            show: !switcher.filterTab || switcher.filterTab === 'general',
            label: __('General Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: [ 'default', 'gradient' ],
            style: [
                {
                    selector: `.${elementId} .filter-controls .guten-gallery-control`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'filterTabBackgroundActive',
            show: switcher.filterTab === 'active',
            label: __('Active Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: [ 'default', 'gradient' ],
            style: [
                {
                    selector: `.${elementId} .filter-controls .guten-gallery-control.active`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'filterTabBorder',
            show: !switcher.filterTab || switcher.filterTab === 'general',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId} .filter-controls .guten-gallery-control`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'filterTabBorderActive',
            show: switcher.filterTab === 'active',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId} .filter-controls .guten-gallery-control.active`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'filterTabBoxShadow',
            show: !switcher.filterTab || switcher.filterTab === 'general',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .filter-controls .guten-gallery-control`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'filterTabBoxShadowActive',
            show: switcher.filterTab === 'active',
            label: __('Active Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .filter-controls .guten-gallery-control.active`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
    ];
};