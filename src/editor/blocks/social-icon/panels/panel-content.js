import { __ } from '@wordpress/i18n';
import { CheckboxControl, DimensionControl, IconControl, SizeControl, TypographyControl } from 'gutenverse-core-editor/controls';
import { handleDimension, handleUnitPoint, handleTypography } from 'gutenverse-core/styling';

export const contentPanel = (props) => {
    const {
        elementId,
        forceHideText,
        addStyle,
        removeStyle
    } = props;

    return [
        {
            id: 'icon',
            label: __('Icon', 'gutenverse'),
            component: IconControl,
        },
        {
            id: 'iconSize',
            label: __('Icon Size', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 100,
                    step: 1
                },
                em: {
                    text: 'em',
                    min: 0.1,
                    max: 3,
                    step: 0.1
                },
            },
            style: [
                {
                    selector: `.guten-social-icon #${elementId} i`,
                    render: value => handleUnitPoint(value, 'font-size')
                }
            ]
        },
        {
            id: 'forceHideText',
            label: __('Force hide text', 'gutenverse'),
            component: CheckboxControl,
            onChange: values => {
                if(values.forceHideText) {
                    const classes = `.guten-social-icon #${elementId} span`;
                    const hideStyle = `${classes} { display: none; }`;

                    addStyle(
                        'forceHideText',
                        hideStyle
                    );
                } else {
                    removeStyle('forceHideText');
                }
            }
        },
        {
            id: 'typography',
            label: __('Typography', 'gutenverse'),
            show: !forceHideText,
            component: TypographyControl,
            style: [
                {
                    selector: `.guten-social-icon #${elementId} span`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'borderRadius',
            label: __('Border Radius', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                '%': {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.guten-social-icons .guten-social-icon a#${elementId}`,
                    render: value => handleDimension(value, 'border-radius', false)
                }
            ],
        },
    ];
};