import { select } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { advancePanel, animationPanel, backgroundPanel, borderPanel, maskPanel, mouseMoveEffectPanel, positioningPanel, responsivePanel, transformPanel } from 'gutenverse-core/controls';
import { advanceAnimationPanel } from 'gutenverse-core/controls';
import { conditionPanel } from 'gutenverse-core/controls';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { layoutPanel } from './panel-layout';
import { childPanel } from './panel-child';

export const panelList = () => {
    return [
        {
            title: __('Layout', 'gutenverse'),
            panelArray: layoutPanel,
            tabRole: TabSetting
        },
        {
            title: __('Flex Item', 'gutenverse'),
            panelArray: childPanel,
            tabRole: TabSetting,
            show: (props) => {
                const { clientId } = props;
                const parents = select('core/block-editor').getBlockParents(clientId);
                const parentId = parents[parents.length - 1];
                const parentBlock = select('core/block-editor').getBlock(parentId);
                return parentBlock?.name === 'gutenverse/container';
            }
        },
        {
            title: __('Background', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'container-background',
                normalOptions: ['default', 'gradient'],
                hoverOptions: ['default', 'gradient'],
                normalSelector: `.${props.elementId}:not(.background-animated), .${props.elementId}.background-animated > .guten-background-animated .animated-layer, .${props.elementId}.empty-container`,
                hoverSelector: `.${props.elementId}:not(.background-animated):hover, .${props.elementId}.background-animated:hover > .guten-background-animated .animated-layer, .${props.elementId}.empty-container:hover`,
            }),
            tabRole: TabStyle
        },
        {
            title: __('Boxed Background', 'gutenverse'),
            initialOpen: false,
            show: (props) => props.containerLayout === 'boxed',
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'boxed-background',
                optionaName: 'boxedBackground',
                normalOptions: ['default', 'gradient'],
                hoverOptions: ['default', 'gradient'],
                normalSelector: `.${props.elementId} .guten-inner-container`,
                hoverSelector: `.${props.elementId}:hover .guten-inner-container`,
            }),
            tabRole: TabStyle
        },
        {
            title: __('Border', 'gutenverse'),
            initialOpen: false,
            panelArray: borderPanel,
            tabRole: TabStyle
        },
        {
            title: __('Masking', 'gutenverse'),
            initialOpen: false,
            panelArray: maskPanel,
            tabRole: TabStyle
        },
        {
            title: __('Display', 'gutenverse'),
            initialOpen: false,
            panelArray: responsivePanel,
            tabRole: TabStyle
        },
        {
            title: __('Positioning', 'gutenverse'),
            initialOpen: false,
            panelArray: positioningPanel,
            tabRole: TabStyle
        },
        {
            title: __('Animation', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => animationPanel({
                ...props,
                styleId: 'container-animation'
            }),
            tabRole: TabStyle
        },
        {
            title: __('Transform', 'gutenverse'),
            initialOpen: false,
            panelArray: transformPanel,
            pro: true,
        },
        {
            title: __('Mouse Move Effect', 'gutenverse'),
            initialOpen: false,
            panelArray: mouseMoveEffectPanel,
            tabRole: TabStyle,
            pro: true,
        },
        {
            title: __('Advanced Animation', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => advanceAnimationPanel({
                ...props,
                blockType: 'container'
            }),
            pro: true
        },
        {
            title: __('Spacing', 'gutenverse'),
            initialOpen: false,
            panelArray: advancePanel,
            tabRole: TabStyle
        },
        {
            title: __('Condition', 'gutenverse'),
            panelArray: conditionPanel,
            initialOpen: false,
            pro: true
        },
    ];
};
