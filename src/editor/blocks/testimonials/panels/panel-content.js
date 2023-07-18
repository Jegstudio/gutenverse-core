import { __ } from '@wordpress/i18n';
import { CheckboxControl, IconControl, ImageRadioControl } from 'gutenverse-core/controls';


export const panelContent = ({showQuote}) => {
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
                    image: <img src={`${gutenverseImgDir}/testimonial-1.png`}/>,
                    value: 1
                },
                {
                    image: <img src={`${gutenverseImgDir}/testimonial-2.png`}/>,
                    value: 2
                },
                {
                    image: <img src={`${gutenverseImgDir}/testimonial-3.png`}/>,
                    value: 3
                },
                {
                    image: <img src={`${gutenverseImgDir}/testimonial-4.png`}/>,
                    value: 4
                },
            ]
        },
        {
            id: 'showQuote',
            label: __('Show Quote', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'iconQuote',
            show: showQuote,
            label: __('Quote Icon', 'gutenverse'),
            component: IconControl,
        },
    ];
};