import { __ } from '@wordpress/i18n';
import { BorderControl } from 'gutenverse-core-editor/controls';
import { handleBorder } from 'gutenverse-core/styling';

export const thumbnailPanel = ({elementId}) => {
    return [
        {
            id: 'thumbnailBorder',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .thumbnail-wrap`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
    ];
};