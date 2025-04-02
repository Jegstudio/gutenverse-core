import { __ } from '@wordpress/i18n';
import { handleColor, handleDimension, handleTypography } from 'gutenverse-core/styling';
import { ColorControl, DimensionControl, TypographyControl } from 'gutenverse-core/controls';

export const labelTypographyPanel = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'typographyLabel',
            label: __('Label Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'colorLabel',
            label: __('Label Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: {
                'type': 'color',
                'id': 'colorLabel',
                'selector': `.${elementId} label`,
                'properties': [
                    {
                        'name': 'color',
                        'valueType': 'direct'
                    }
                ]
            }
        },
        {
            id: 'colorRequired',
            label: __('Required Indicator Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: {
                'type': 'color',
                'id': 'colorRequired',
                'selector': `.${elementId} label span`,
                'properties': [
                    {
                        'name': 'color',
                        'valueType': 'direct'
                    }
                ]
            }
        },
        {
            id: 'marginLabel',
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
                percent: {
                    text: '%',
                    unit: '%'
                },
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
        },
    ];
};

