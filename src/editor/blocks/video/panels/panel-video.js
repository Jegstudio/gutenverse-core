import { __ } from '@wordpress/i18n';
import { CheckboxControl, ColorControl, NumberControl, RangeControl, SelectControl, TextControl, TypographyControl } from 'gutenverse-core/controls';
import { isYoutubeUrl } from 'gutenverse-core/helper';
import { isEmpty } from 'lodash';
import { handleColor, handleTypography } from 'gutenverse-core/styling';

export const videoPanel = (props) => {
    const {
        elementId,
        videoSrc,
        videoType,
        captionType
    } = props;

    return [
        {
            id: 'videoType',
            label: __('Video Source', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: 'Media Files',
                    value: 'upload'
                },
                {
                    label: 'External Link',
                    value: 'externalLink'
                },
            ],
        },
        {
            id: 'videoSrc',
            show: videoType !== undefined,
            label: __('Video URL', 'gutenverse'),
            description: videoType === 'externalLink' ? __('Currently supported External URL Types are : YouTube, Twitch, Vimeo, and DailyMotion', 'gutenverse') : null,
            component: TextControl
        },
        {
            id: 'start',
            show: videoType === 'externalLink' && !isEmpty(videoSrc) && isYoutubeUrl(videoSrc),
            label: __('Video Start', 'gutenverse'),
            description: __('in Seconds. For example 1:30 minutes will be 90', 'gutenverse'),
            component: NumberControl
        },
        {
            id: 'end',
            show: videoType === 'externalLink' && !isEmpty(videoSrc) && isYoutubeUrl(videoSrc),
            label: __('Video End', 'gutenverse'),
            description: __('in Seconds. For example 1:30 minutes will be 90', 'gutenverse'),
            component: NumberControl
        },
        {
            id: 'hideControls',
            show: videoSrc !== undefined && videoType !== undefined,
            label: __('Hide Control', 'gutenverse'),
            component: CheckboxControl
        },
        {
            id: 'playing',
            show: videoSrc !== undefined && videoType !== undefined,
            label: __('Autoplay Video', 'gutenverse'),
            component: CheckboxControl
        },
        {
            id: 'loop',
            show: videoSrc !== undefined && videoType !== undefined,
            label: __('Loop', 'gutenverse'),
            component: CheckboxControl
        },
        {
            id: 'muted',
            show: videoSrc !== undefined && videoType !== undefined,
            label: __('Muted', 'gutenverse'),
            component: CheckboxControl
        },
        {
            id: 'width',
            show: videoSrc !== undefined && videoType !== undefined,
            label: __('Width', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: '%',
            min: 1,
            max: 100,
            step: 1,
            style: [
                {
                    selector: `.${elementId} video, .${elementId} .guten-video-background`,
                    allowRender: () => videoSrc !== undefined && videoType !== undefined,
                    render: value => `width: ${value}%!important;`
                }
            ]
        },
        {
            id: 'height',
            show: videoSrc !== undefined && videoType !== undefined,
            label: __('Height', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 1,
            max: 1000,
            step: 1,
            style: [
                {
                    selector: `.${elementId} video, .${elementId} .guten-video-background`,
                    allowRender: () => videoSrc !== undefined && videoType !== undefined,
                    render: value => `height: ${value}px!important;`
                }
            ]
        },
        {
            id: 'captionType',
            show: videoSrc !== undefined,
            label: __('Add Caption', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: 'None',
                    value: 'none'
                },
                {
                    label: 'Original (Media File)',
                    value: 'original'
                },
                {
                    label: 'Custom',
                    value: 'custom'
                },
            ],
        },
        {
            id: 'captionCustom',
            show: videoSrc !== undefined && captionType !== undefined && !['none', 'original'].includes(captionType),
            label: __('Custom Caption', 'gutenverse'),
            component: TextControl
        },
        {
            id: 'captionSpace',
            show: videoSrc !== undefined && captionType !== undefined && captionType !== 'none',
            label: __('Caption Space', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            style: [
                {
                    selector: `.${elementId} .guten-caption`,
                    render: value => `margin-top: ${value}px;`
                }
            ]
        },
        {
            id: 'typography',
            show: videoSrc !== undefined && captionType !== undefined && captionType !== 'none',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .guten-caption`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'captionColor',
            show: videoSrc !== undefined && captionType !== undefined && captionType !== 'none',
            label: __('Caption Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .guten-caption`,
                    render: (value) => handleColor(value, 'color')
                }
            ],
        },
    ];
};

