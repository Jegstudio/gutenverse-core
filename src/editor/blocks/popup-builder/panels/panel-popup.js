import { __ } from '@wordpress/i18n';
import { ImageRadioControl, SizeControl, RangeControl, SelectControl, BackgroundControl } from 'gutenverse-core/controls';
import { handleBackground, handleUnitPoint, setStylePoint } from 'gutenverse-core/styling';
import { applyFilters } from '@wordpress/hooks';

export const popupPanel = (props) => {
    const {
        elementId,
        position,
        openTrigger,
    } = props;

    const {
        gutenverseImgDir
    } = window['GutenverseConfig'];

    const setWidth = ({ width }) => {
        const styleId = 'popup-width';
        const adminClass = `.guten-popup-builder.${elementId} .guten-popup .guten-popup-content`;

        setStylePoint({
            ...props,
            attribute: width,
            selector: 'width',
            styleId,
            adminClass,
            multiDevice: true
        });
    };

    return applyFilters(
        'gutenverse.popup-builder.options',
        [{
            id: 'width',
            label: __('Popup Container Width', 'gutenverse'),
            component: SizeControl,
            onChange: setWidth,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 58,
                    max: 1440,
                    step: 1
                },
                vh: {
                    text: 'vh',
                    min: 5,
                    max: 100,
                    step: 1
                },
                vw: {
                    text: 'vw',
                    min: 5,
                    max: 100,
                    step: 1
                },
                ['%']: {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1
                },
            },
        },
        {
            id: 'maxHeight',
            label: __('Popup Container Max Height', 'gutenverse'),
            component: SizeControl,
            show: position === 'center',
            allowDeviceControl: true,
            units: {
                vh: {
                    text: 'vh',
                    min: 5,
                    max: 100,
                    step: 1
                },
                ['%']: {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1
                },
            },
            style: [
                {
                    selector: `.${elementId} .guten-popup-center .guten-popup-content`,
                    allowRender: () => position === 'center',
                    render: value => handleUnitPoint(value, 'max-height')
                }
            ]
        },
        {
            id: 'position',
            label: __('Popup Position', 'gutenverse'),
            component: ImageRadioControl,
            options: [
                {
                    image: <img src={`${gutenverseImgDir}/popup-builder-1.png`} />,
                    value: 'left'
                },
                {
                    image: <img src={`${gutenverseImgDir}/popup-builder-2.png`} />,
                    value: 'center'
                },
                {
                    image: <img src={`${gutenverseImgDir}/popup-builder-3.png`} />,
                    value: 'right'
                },
            ],
        },
        {
            id: 'contentPosition',
            label: __('Content Position', 'gutenverse'),
            show: position === 'center',
            component: ImageRadioControl,
            options: [
                {
                    image: <img src={`${gutenverseImgDir}/popup-builder-4.png`} />,
                    value: 'start'
                },
                {
                    image: <img src={`${gutenverseImgDir}/popup-builder-5.png`} />,
                    value: 'center'
                },
                {
                    image: <img src={`${gutenverseImgDir}/popup-builder-6.png`} />,
                    value: 'end'
                },
            ],
        },
        {
            id: 'sideMode',
            label: __('Content Mode', 'gutenverse'),
            show: position !== 'center',
            component: ImageRadioControl,
            options: [
                {
                    image: <img src={`${gutenverseImgDir}/popup-builder-7.png`} />,
                    value: 'space'
                },
                {
                    image: <img src={`${gutenverseImgDir}/popup-builder-8.png`} />,
                    value: 'center'
                },
                {
                    image: <img src={`${gutenverseImgDir}/popup-builder-9.png`} />,
                    value: 'top'
                },
                {
                    image: <img src={`${gutenverseImgDir}/popup-builder-10.png`} />,
                    value: 'bottom'
                },
            ],
        },
        {
            id: 'backgroundColor',
            label: __('Background', 'gutenverse'),
            component: BackgroundControl,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .guten-popup .guten-popup-container`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'openTrigger',
            label: __('Open Trigger'),
            component: SelectControl,
            options: [
                {
                    label: __('On Load', 'gutenverse'),
                    value: 'load',
                },
                {
                    label: __('On Anchor Click', 'gutenverse'),
                    value: 'anchor',
                    pro: true,
                    description: __( 'When a user clicks on an anchor link, a pop-up can appear on the screen to display additional content or provide a specific call to action. ', '--gctd--') 
                },
                {
                    label: __('On Scroll', 'gutenverse'),
                    value: 'scroll',
                    pro: true,
                    description: __( 'Pop-ups that appear when a user scrolls down a web page can be an effective way to grab their attention and encourage engagement.', '--gctd--') 
                },
                {
                    label: __('On Exit Intent', 'gutenverse'),
                    value: 'exit',
                    pro: true,
                    description: __( 'Pop-ups that appear on exit intent are a type of pop-up that is triggered when a user attempts to leave a web page.', '--gctd--') 
                },
            ],
        },
        {
            id: 'openWaitTime',
            label: __('Wait Time (ms)', 'gutenverse'),
            component: RangeControl,
            show: openTrigger === 'load',
            min: 0,
            max: 5000,
            step: 1
        }],
        props
    );
};
