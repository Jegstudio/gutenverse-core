import { useEffect, useRef } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withAnimationAdvance, withCustomStyle } from 'gutenverse-core/hoc';
import { panelList } from './panels/panel-list';
import { useInnerBlocksProps, useBlockProps, InspectorControls, BlockControls } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { PanelController } from 'gutenverse-core/controls';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { dispatch, useSelect } from '@wordpress/data';
import { Button, ToolbarButton, ToolbarGroup} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { plus } from 'gutenverse-core/components';
import { displayShortcut } from '@wordpress/keycodes';

const Accordions = compose(
    withCustomStyle(panelList),
    withAnimationAdvance('accordions'),
    withCopyElementToolbar()
)(props => {
    const {
        getBlocks
    } = useSelect(
        (select) => select('core/block-editor'),
        []
    );

    const {
        insertBlock,
        updateBlockAttributes
    } = dispatch('core/block-editor');

    const {
        attributes,
        clientId,
        setElementRef
    } = props;

    const {
        elementId,
        iconOpen,
        iconClosed,
        iconPosition,
        titleTag,
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const accordionRef = useRef();

    useEffect(() => {
        if (accordionRef.current) {
            setElementRef(accordionRef.current);
        }
    }, [accordionRef]);

    useEffect(() => {
        getBlocks(clientId).map(child => {
            updateBlockAttributes(child.clientId, {
                iconOpen,
                iconClosed,
                iconPosition,
                titleTag,
            });
        });
    }, [iconOpen, iconClosed, iconPosition, titleTag]);

    const innerBlocksProps = useInnerBlocksProps({
        className: classnames(
            'guten-accordions',
            elementId,
        )
    }, {
        template: [['gutenverse/accordion']],
        allowedBlocks: ['gutenverse/accordion'],
        orientation: 'vertical',
        __experimentalAppenderTagName: 'div',
        ref: accordionRef
    });

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-accordions-wrapper',
            'no-margin',
            animationClass,
            displayClass
        ),
        ref: accordionRef
    });

    const addChild = () => {
        const newChild = createBlock('gutenverse/accordion', {});
        insertBlock(newChild, getBlocks(clientId).length + 1, clientId);
    };

    return <>
        <InspectorControls>
            <div className={'parent-button'}>
                <Button isPrimary onClick={() => addChild()}>
                    {__('Add Accordion Child', 'gutenverse')}
                </Button>
            </div>
        </InspectorControls>
        <BlockControls>
            <ToolbarGroup>
                <ToolbarButton
                    name="add"
                    icon={plus}
                    title={__('Add Accordion Child', 'gutenverse')}
                    shortcut={displayShortcut.primary('a')}
                    onClick={() => addChild()}
                />
            </ToolbarGroup>
        </BlockControls>
        <PanelController panelList={panelList} {...props} />
        <div {...blockProps}>
            <div {...innerBlocksProps} />
        </div>
    </>;
});

export default Accordions;
