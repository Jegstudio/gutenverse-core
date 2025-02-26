import { BackgroundControl, SwitchControl } from 'gutenverse-core/controls';
import { handleBackground } from 'gutenverse-core/styling';

export const backgroundPanel = (props) => {
    const {
        elementId,
        normalOptions,
        hoverOptions,
        normalSelector,
        hoverSelector,
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
        style: [
            {
                selector: normalSelector ? normalSelector : `.${elementId}`,
                hasChild: true,
                render: value => handleBackground(value)
            }
        ],
        liveStyle: [
            {
                'type': 'background',
                'id': 'background',
                'selector': normalSelector ? normalSelector : `.editor-styles-wrapper .is-root-container .${elementId}`,
            }
        ],
    },
    {
        id: 'backgroundHover',
        show: switcher.layout === 'hover',
        component: BackgroundControl,
        allowDeviceControl: true,
        options: hoverOptions,
        liveStyle: [
            {
                'type': 'background',
                'id': 'backgroundHover',
                'selector': hoverSelector ? hoverSelector : `.editor-styles-wrapper .is-root-container .${elementId}:hover`,
            }
        ],
        style: [
            {
                selector: hoverSelector ? hoverSelector : `.${elementId}:hover`,
                hasChild: true,
                render: value => handleBackground(value)
            }
        ]
    }];
};