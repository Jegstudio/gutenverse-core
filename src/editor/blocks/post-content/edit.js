import { compose } from '@wordpress/compose';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useRef } from '@wordpress/element';
import { withCopyElementToolbar, withPartialRender } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { PanelTutorial } from 'gutenverse-core/controls';
import { useSettingFallback } from 'gutenverse-core/helper';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';

const Placeholder = () => {
    return <div className="post-content">
        <p>{__('This will be your post\'s content block, it will display all the blocks in any single post or page.', 'gutenverse')}</p>
        <p>{__('That might be a simple arrangement like consecutive paragraphs in a blog post, or a more elaborate composition that includes image galleries, videos, tables, columns, and any other block types.', 'gutenverse')}</p>
    </div>;
};

const PostContentBlock = compose(
    withPartialRender,
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
        clientId
    } = props;

    const {
        elementId,
        inheritLayout,
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const elementRef = useRef();
    const layout = useSettingFallback('layout');

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-post-content',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    return <>
        <InspectorControls>
            <PanelTutorial
                title={__('How Post Content works?', 'gutenverse')}
                list={[
                    {
                        title: __('On Frontend', 'gutenverse'),
                        description: __('Post content data will be fetched automatically based on the current post/loop.', 'gutenverse')
                    },
                    {
                        title: __('Inside Page/Post Editor and Inside Site Editor', 'gutenverse'),
                        description: __('It will load placeholder data.', 'gutenverse')
                    },
                ]}
            />
        </InspectorControls>
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        {inheritLayout && layout && layout.contentSize && <style>
            {`.${elementId} > .post-content > * { max-width: ${layout.contentSize}; margin-left:auto; margin-right: auto; }`}
        </style>}
        <div
            {...blockProps}>
            <Placeholder />
        </div>
    </>;
});

export default PostContentBlock;