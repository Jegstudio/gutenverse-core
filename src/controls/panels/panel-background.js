import { BackgroundControl, SwitchControl } from 'gutenverse-core/controls';

export const backgroundPanel = (props) => {
    const {
        elementId,
        normalOptions,
        hoverOptions,
        switcher,
        setSwitcher,
        blockType = '',
    } = props;

    return [{
        id: '__bgHover',
        component: SwitchControl,
        options: [
            {
                value: 'normal',
                label: 'Normal'
            },
            {
                value: 'hover',
                label: 'Hover'
            }
        ],
        onChange: ({__bgHover}) => setSwitcher({...switcher, layout: __bgHover})
    },
    {
        id: 'background',
        show: !switcher.layout || switcher.layout === 'normal',
        component: BackgroundControl,
        allowDeviceControl: true,
        options: normalOptions,
        blockType: blockType,
        liveStyle: {
            'type': 'background',
            'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
        },
    },
    {
        id: 'backgroundHover',
        show: switcher.layout === 'hover',
        component: BackgroundControl,
        allowDeviceControl: true,
        options: hoverOptions,
        liveStyle: {
            'type': 'background',
            'selector': `.editor-styles-wrapper .is-root-container .${elementId}:hover`,
        },
    }];
};