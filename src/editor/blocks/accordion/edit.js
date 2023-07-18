import { __ } from '@wordpress/i18n';
import { useEffect, useRef } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withCustomStyle } from 'gutenverse-core/hoc';
import { panelList } from './panels/panel-list';
import { useInnerBlocksProps, useBlockProps, BlockControls, InspectorControls } from '@wordpress/block-editor';
import classnames from 'classnames';
import { RichText } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { Check, X } from 'react-feather';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { dispatch, select, useSelect } from '@wordpress/data';
import { SelectParent } from 'gutenverse-core/components';
import { PanelTutorial } from 'gutenverse-core/controls';

export const AccordionIcon = ({ iconOpen, iconClosed }) => {
    return <div className={'accordion-icon'}>
        <span className={'accordion-icon-open'}>
            <i className={iconOpen} />
        </span>
        <span className={'accordion-icon-closed'}>
            <i className={iconClosed} />
        </span>
    </div>;
};

const Accordion = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)(props => {
    const {
        getBlocks,
        getBlock,
        getBlockRootClientId,
    } = useSelect(
        (select) => select('core/block-editor'),
        []
    );

    const {
        updateBlockAttributes
    } = dispatch('core/block-editor');

    const {
        attributes,
        setAttributes,
        clientId,
        addStyle,
        setElementRef
    } = props;

    const {
        title,
        iconPosition,
        iconOpen,
        iconClosed,
        titleTag,
        first,
        elementId
    } = attributes;

    const accordionRef = useRef();

    const onOpening = () => {
        const rootId = getBlockRootClientId(clientId);
        const childs = getBlocks(rootId);

        childs.map(child => {
            select('gutenverse/style').findElement(child.clientId).removeStyle('accordion-style');
        });

        !first && addStyle(
            'accordion-style',
            `[data-block="${rootId}"] .guten-accordions .accordion-item.${elementId} .accordion-body { height: auto }`
        );
    };

    const accordionClass = classnames('accordion-content');

    const blockProps = useBlockProps({
        className: classnames(
            'accordion-item',
            first && 'active',
            elementId,
        ),
        ref: accordionRef
    });

    const innerBlocksProps = useInnerBlocksProps({
        className: accordionClass
    }, {
        template: [['core/paragraph']]
    });

    const setFirstActive = () => {
        const rootId = getBlockRootClientId(clientId);
        const childs = getBlocks(rootId);

        childs.map((child) => {
            updateBlockAttributes(child.clientId, { first: false });
        });

        setAttributes({ first: !first });

        onOpening();
    };

    useEffect(() => {
        if (accordionRef.current) {
            setElementRef(accordionRef.current);
        }
    }, [accordionRef]);

    useEffect(() => {
        const rootId = getBlockRootClientId(clientId);
        const parent = getBlock(rootId);
        const { attributes } = parent;
        const {
            iconOpen,
            iconClosed,
            iconPosition,
            titleTag,
        } = attributes;

        setAttributes({
            iconOpen,
            iconClosed,
            iconPosition,
            titleTag,
        });
    }, []);

    return <>
        <InspectorControls>
            <SelectParent {...props}>
                {__('Select accordion parent', 'gutenverse')}
            </SelectParent>
            <PanelTutorial
                title={__('How to use accordion', 'gutenverse')}
                list={[
                    {
                        title: __('Add new accordion child', 'gutenverse'),
                        description: __('To add new accordion, Click above button (Select accordion parent), and click + button (Add accordion item) on bottom right of your accordion.', 'gutenverse')
                    },
                    {
                        title: __('Change default active', 'gutenverse'),
                        description: __('Last Accordin Open will be the active state when first time loaded on frontend.', 'gutenverse')
                    }
                ]}
            />
        </InspectorControls>
        <BlockControls>
            <ToolbarGroup>
                <ToolbarButton
                    name="icon"
                    icon={first ? <X style={{ color: '#000', fill: '#fff' }} /> : <Check style={{ color: '#000', fill: '#fff' }} />}
                    title={__('Default Active', 'gutenverse')}
                    onClick={setFirstActive}
                />
            </ToolbarGroup>
        </BlockControls>
        <div {...blockProps}>
            <div className={'accordion-heading'} onClick={setFirstActive}>
                {iconPosition === 'left' && <AccordionIcon iconClosed={iconClosed} iconOpen={iconOpen} />}
                <RichText
                    className={'accordion-text'}
                    tagName={titleTag}
                    aria-label={__('Accordion Title', 'gutenverse')}
                    placeholder={__('Accordion Title', 'gutenverse')}
                    value={title}
                    onChange={value => setAttributes({ title: value })}
                    withoutInteractiveFormatting
                />
                {iconPosition === 'right' && <AccordionIcon iconClosed={iconClosed} iconOpen={iconOpen} />}
            </div>
            <div className={'accordion-body'}>
                <div {...innerBlocksProps} />
            </div>
        </div>
    </>;
});

export default Accordion;