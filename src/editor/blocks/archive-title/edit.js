import { compose } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';
import { withCustomStyle, withPartialRender } from 'gutenverse-core/hoc';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController, PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useEntityProp } from '@wordpress/core-data';
import { useRef } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { PanelTutorial } from 'gutenverse-core/controls';
import { __ } from '@wordpress/i18n';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';

const ArchiveTitlePanelController = (props) => {
    const { panelProps, isSelected, setAttributes } = props;
    const defaultPanelProps = {
        ...panelProps,
        ...props.attributes,
        setAttributes
    };
    return <PanelController
        panelList={panelList}
        panelProps={defaultPanelProps}
        isSelected={isSelected}
        {...props}
    />;
};

const ArchiveTitleBlock = compose(
    withPartialRender,
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
        clientId,
        context: { archiveId, archiveType }
    } = props;
    const {
        elementId,
        archiveLink,
        archiveLinkTarget,
        archiveLinkRel = 'noreferrer',
        htmlTag: HtmlTag,
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const elementRef = useRef();
    const linkTarget = archiveLinkTarget ? '_blank' : '_self';
    const [ archiveTitle = 'Archive Title' ] = useEntityProp('postType', archiveType, 'title', archiveId);
    const [ link ] = useEntityProp( 'postType', archiveType, 'link', archiveId );

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-archive-title',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });
    return <>
        <InspectorControls>
            <PanelTutorial
                title={__('How Archive Title works?', 'gutenverse')}
                list={[
                    {
                        title: __('Inside Page Editor, Query Loop Block, and on Frontend', 'gutenverse'),
                        description: __('Title data will be fetched automatically based on the current archive/loop.', 'gutenverse')
                    },
                    {
                        title: __('Inside Site Editor', 'gutenverse'),
                        description: __('It will load placeholder data.', 'gutenverse')
                    },
                ]}
            />
        </InspectorControls>
        <BlockPanelController panelList={panelList} props={props}/>
        <div  {...blockProps}>
            <HtmlTag>{archiveLink ? <a href={link} target={linkTarget} rel={archiveLinkRel} onClick={e => e.preventDefault()}>{archiveTitle}</a> : archiveTitle}</HtmlTag>
        </div>
    </>;
});

export default ArchiveTitleBlock;