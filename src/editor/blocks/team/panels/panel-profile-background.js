import { BackgroundControl, SwitchControl } from 'gutenverse-core-editor/controls';
import { handleBackground } from 'gutenverse-core/styling';

export const profileBackgroundPanel = (props) => {
    const {
        elementId,
        normalOptions,
        hoverOptions,
        switcher,
        setSwitcher
    } = props;

    return [
        {
            id: '__profileBgHover',
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
            onChange: ({__profileBgHover}) => setSwitcher({...switcher, profileBg: __profileBgHover})
        },
        {
            id: 'profileBackground',
            show: !switcher.profileBg || switcher.profileBg === 'normal',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: normalOptions,
            style: [
                {
                    selector: `.${elementId} .profile-box .profile-card`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'profileBackgroundHover',
            show: switcher.profileBg === 'hover',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: hoverOptions,
            style: [
                {
                    selector: `.${elementId} .profile-box .profile-card:hover`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        }
    ];
};