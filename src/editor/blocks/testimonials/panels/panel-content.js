import { __ } from '@wordpress/i18n';
import { CheckboxControl, IconControl, ImageRadioControl, SelectControl } from 'gutenverse-core/controls';


export const panelContent = ({ showQuote, contentType }) => {
    const {
        gutenverseImgDir
    } = window['GutenverseConfig'];

    return [
        {
            id: 'contentType',
            label: __('Content Style', 'gutenverse'),
            component: ImageRadioControl,
            options: [
                {
                    image: <img src={`${gutenverseImgDir}/testimonial-1.png`} />,
                    value: 1
                },
                {
                    image: <img src={`${gutenverseImgDir}/testimonial-2.png`} />,
                    value: 2
                },
                {
                    image: <img src={`${gutenverseImgDir}/testimonial-3.png`} />,
                    value: 3
                },
                {
                    image: <img src={`${gutenverseImgDir}/testimonial-4.png`} />,
                    value: 4
                },
            ]
        },
        {
            id: 'contentPosition',
            label: __('Content Position', 'gutenverse'),
            component: SelectControl,
            show: contentType !== 1,
            options: [
                {
                    label: __('Above Image', 'gutenverse'),
                    value: 'above-image'
                },
                {
                    label: __('Below Image', 'gutenverse'),
                    value: 'below-image'
                },
            ]
        },
        {
            id: 'showQuote',
            label: __('Show Quote', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'showRating',
            label: __('Show Rating', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'iconQuote',
            show: showQuote,
            label: __('Quote Icon', 'gutenverse'),
            component: IconControl,
        },
        {
            id: 'iconRatingFull',
            label: __('Rating Icon Full', 'gutenverse'),
            component: IconControl,
        },
        {
            id: 'iconRatingHalf',
            label: __('Rating Icon Half', 'gutenverse'),
            component: IconControl,
        },
    ];
};