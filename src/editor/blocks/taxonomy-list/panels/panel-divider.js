
import { __ } from '@wordpress/i18n';
import { AlertControl, ColorControl, SelectControl, SizeControl} from 'gutenverse-core/controls';
import { handleColor } from 'gutenverse-core/styling';

export const dividerPanel = (props) => {
    const {
        elementId,
        showDivider,
        layout
    } = props;

    return [
        {
            id: 'divider-notice',
            component: AlertControl,
            children: <>
                <span>{__('This Panel Option Only Show If You Turn On "Show Divider" Option')}</span>
            </>
        },
        {
            id: 'colorDivider',
            label: __('Color Divider', 'gutenverse'),
            show: showDivider,
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .taxonomy-list-item:not(:nth-child(1))`,
                    allowRender : () => showDivider,
                    render: value => handleColor(value, 'border-color')
                },
            ]
        },
        {
            id: 'typeDivider',
            label: __('Type Divider', 'gutenverse'),
            show: showDivider,
            component: SelectControl,
            options:[
                {
                    label: __('Solid', 'gutenverse'),
                    value: 'solid'
                },
                {
                    label: __('Double', 'gutenverse'),
                    value: 'double'
                },
                {
                    label: __('Dotted', 'gutenverse'),
                    value: 'dotted'
                },
                {
                    label: __('Dashed', 'gutenverse'),
                    value: 'dashed'
                },
            ],
            style: [
                {
                    selector: `.${elementId} .taxonomy-list-item:not(:nth-child(1))`,
                    allowRender : () => (showDivider && layout === 'column'),
                    render: value => `border-top-style : ${value};`
                },
                {
                    selector: `.${elementId} .taxonomy-list-item:not(:nth-child(1))`,
                    allowRender : () => (showDivider && layout === 'row'),
                    render: value => `border-left-style : ${value};`
                },
            ]
        },
        {
            id: 'widthDivider',
            label: __('Width Divider', 'gutenverse'),
            show: showDivider,
            component: SizeControl,
            style: [
                {
                    selector: `.${elementId} .taxonomy-list-item`,
                    allowRender : () => showDivider && layout === 'column',
                    render: value => `width : ${value.point}${value.unit};`
                },
                {
                    selector: `.${elementId} .taxonomy-list-item`,
                    allowRender : () => showDivider && layout === 'row',
                    render: value => `height : ${value.point}${value.unit};`
                },
            ]
        },
        {
            id: 'sizeDivider',
            label: __('Size Divider', 'gutenverse'),
            show: showDivider,
            component: SizeControl,
            style: [
                {
                    selector: `.${elementId} .taxonomy-list-item`,
                    allowRender : () => showDivider,
                    render: value => `border-width: ${value.point}${value.unit};`
                },
            ]
        },
    ];
};
