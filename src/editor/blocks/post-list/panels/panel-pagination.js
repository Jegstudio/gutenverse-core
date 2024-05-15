import { __ } from '@wordpress/i18n';
import { IconControl, NumberControl, RangeControl, SelectControl, TextControl } from 'gutenverse-core/controls';

export const paginationPanel = (props) => {
    const {
        paginationMode
    } = props;

    return [
        {
            id: 'paginationMode',
            label: __('Pagination Mode', 'gutenverse'),
            description: __('Note: Auto Load on Scroll effect is disabled in editor mode, but it can be viewed on Preview mode.', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('No Pagination'),
                    value: 'disable'
                },
                {
                    label: __('Load More'),
                    value: 'loadmore'
                },
                {
                    label: __('Auto Load on Scroll'),
                    value: 'scrollload'
                },
            ],
        },
        {
            id: 'paginationLoadmoreText',
            show: paginationMode && paginationMode !== 'disable',
            label: __('"Load More" Text', 'gutenverse'),
            component: TextControl
        },
        {
            id: 'paginationLoadingText',
            show: paginationMode && paginationMode !== 'disable',
            label: __('"Loading" Text', 'gutenverse'),
            component: TextControl
        },
        {
            id: 'paginationNumberPost',
            show: paginationMode && paginationMode !== 'disable',
            label: __('Pagination Post', 'gutenverse'),
            description: __('Number of Post loaded per Pagination', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 30,
            step: 1,
            isParseFloat : false,
        },
        {
            id: 'paginationScrollLimit',
            show: paginationMode && paginationMode === 'scrollload',
            label: __('Auto Load Limit', 'gutenverse'),
            description: __('Limit of auto load when scrolling, set to zero to always load until end of content.', 'gutenverse'),
            component: NumberControl,
            min: 0,
            max: 9999,
            step: 1,
        },
        {
            id: 'paginationIcon',
            show: paginationMode && paginationMode !== 'disable',
            component: IconControl
        },
        {
            id: 'paginationIconPosition',
            show: paginationMode && paginationMode !== 'disable',
            component: SelectControl,
            options: [
                {
                    label: __('Before'),
                    value: 'before'
                },
                {
                    label: __('After'),
                    value: 'after'
                }
            ]
        },
    ];
};