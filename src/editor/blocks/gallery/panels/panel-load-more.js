import { __ } from '@wordpress/i18n';

import { AlignCenter, AlignLeft, AlignRight } from 'react-feather';
import { CheckboxControl, IconControl, IconRadioControl, RangeControl, SelectControl, TextControl } from 'gutenverse-core-editor/controls';

export const loadMorePanel = (props) => {
    const {
        elementId,
        enableLoadMore
    } = props;

    return [
        {
            id: 'enableLoadMore',
            label: __('Enable Load More', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'itemsPerLoad',
            show: enableLoadMore,
            label: __('Items Per Load', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 50,
            step: 1,
        },
        {
            id: 'enableLoadText',
            show: enableLoadMore,
            label: __('Button Text', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'enableLoadIcon',
            show: enableLoadMore,
            label: __('Button Icon', 'gutenverse'),
            component: IconControl,
        },
        {
            id: 'enableLoadIconPosition',
            show: enableLoadMore,
            label: __('Icon Position', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Before'),
                    value: 'before'
                },
                {
                    label: __('After'),
                    value: 'after'
                },
            ]
        },
        {
            id: 'enableLoadAlign',
            show: enableLoadMore,
            label: __('Alignment', 'gutenverse'),
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'left',
                    icon: <AlignLeft/>,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter/>,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'right',
                    icon: <AlignRight/>,
                },
            ],
            style: [
                {
                    selector: `.${elementId} .load-more-items`,
                    allowRender: () => enableLoadMore,
                    render: value => `text-align: ${value};`
                }
            ]
        },
    ];
};