import { BackgroundControl, SwitchControl } from 'gutenverse-core/controls';
import { handleBackground } from 'gutenverse-core/styling';
import SizeControl from '../controls/size/size-control';
import { __ } from '@wordpress/i18n';

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
        optionaName = 'background'
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
        id: optionaName,
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
                'id': optionaName,
                'selector': normalSelector ? normalSelector : `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
            }
        ],
    },
    {
        id: `${optionaName}Hover`,
        show: switcher.layout === 'hover',
        component: BackgroundControl,
        allowDeviceControl: true,
        options: hoverOptions,
        liveStyle: [
            {
                'type': 'background',
                'id': `${optionaName}Hover`,
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
    },
    {
        id: `${optionaName}Transition`,
        label: __('Background Transition', '--gctd--'),
        show: switcher.layout === 'hover',
        component: SizeControl,
        units: {
            s: {
                text: 's',
                min: 1,
                max: 3,
                step: 0.1,
                unit: 's',
            },
            ms: {
                text: 'ms',
                min: 100,
                max: 3000,
                step: 100,
                unit: 'ms',
            },
        },
        liveStyle: [
            {
                'type': 'unitPoint',
                'id': `${optionaName}Transition`,
                'selector': normalSelector ? normalSelector : `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
                'properties': [
                    {
                        'name': 'transition',
                        'valueType': 'pattern',
                        'pattern': '{value}',
                        'patternValues': {
                            'value': {
                                'type': 'direct',
                            },
                        }
                    },
                ],
            }
        ],
    }];
};