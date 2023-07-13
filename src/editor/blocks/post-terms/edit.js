import { compose } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';
import { withCustomStyle } from 'gutenverse-core-editor/hoc';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { PanelController } from 'gutenverse-core-editor/controls';
import { panelList } from './panels/panel-list';
import { useEntityProp, store as coreStore } from '@wordpress/core-data';
import { useRef } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core-editor/hoc';
import { useAnimationEditor } from 'gutenverse-core-editor/hooks';
import { useDisplayEditor } from 'gutenverse-core-editor/hooks';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { PanelTutorial } from 'gutenverse-core-editor/controls';
import { isEmpty } from 'lodash';

const PostTermsBlock = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
        setElementRef,
        context: { postId, postType }
    } = props;

    const {
        elementId,
        taxonomy = 'category',
        separator = ',',
        linkTo,
        htmlTag: HtmlTag,
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const postTermRef = useRef();

    let type = taxonomy === 'post_tag' ? 'tags' : 'categories';

    const [termIds = []] = useEntityProp('postType', postType, type, postId);

    const terms = useSelect(
        (select) => {
            const { getEntityRecords } = select(coreStore);

            const data = getEntityRecords(
                'taxonomy',
                taxonomy,
                {
                    include: termIds,
                    context: 'view',
                }
            );

            return data ? data : [];
        },
        [taxonomy]
    );

    useEffect(() => {
        if (postTermRef.current) {
            setElementRef(postTermRef.current);
        }
    }, [postTermRef]);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-post-terms',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: postTermRef
    });

    return <>
        <InspectorControls>
            <PanelTutorial
                title={__('How Post Terms works?', 'gutenverse')}
                list={[
                    {
                        title: __('Inside Post Editor, Query Loop Block, and on Frontend', 'gutenverse'),
                        description: __('Terms data will be fetched automatically based on the current post/loop.', 'gutenverse')
                    },
                    {
                        title: __('Inside Site Editor', 'gutenverse'),
                        description: __('It will load placeholder data.', 'gutenverse')
                    },
                ]}
            />
        </InspectorControls>
        <PanelController panelList={panelList} {...props} />
        <div  {...blockProps}>
            <HtmlTag>
                {!isEmpty(terms) ? terms.map((term, index) => {
                    const name = term?.name;
                    const after = index < terms.length - 1 ? separator : '';

                    return linkTo && linkTo !== 'none' ? <a href="#" onClick={e => e.preventDefault()}>{name + after}</a> : name + after;
                }) : linkTo && linkTo !== 'none' ? <a href="#" onClick={e => e.preventDefault()}>{'Post Terms'}</a> : 'Post Terms'}
            </HtmlTag>
        </div>
    </>;
});

export default PostTermsBlock;