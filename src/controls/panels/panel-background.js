import { handleBackground } from 'gutenverse-core/styling';
import { BackgroundControl, SwitchControl } from 'gutenverse-core/controls';

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
        style: [
            {
                selector: normalSelector ? normalSelector : `.${elementId}`,
                hasChild: true,
                render: value => handleBackground(value)
            }
        ],
        blockType: blockType,
    },
    {
        id: 'backgroundHover',
        show: switcher.layout === 'hover',
        component: BackgroundControl,
        allowDeviceControl: true,
        options: hoverOptions,
        style: [
            {
                selector: hoverSelector ? hoverSelector : `.${elementId}:hover`,
                hasChild: true,
                render: value => handleBackground(value)
            }
        ]
    }];
};