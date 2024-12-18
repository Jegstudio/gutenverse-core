import { compose } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';
import { withCustomStyle, withPartialRender } from 'gutenverse-core/hoc';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useEntityProp, store as coreStore } from '@wordpress/core-data';
import { useRef } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { PanelTutorial } from 'gutenverse-core/controls';
import { isEmpty } from 'lodash';

const PostTermsBlock = compose(
    withPartialRender,
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
        contentType,
        inlineDisplay,
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

    const contentHTML = () => {
        switch (contentType) {
            case 'block':
                if( !isEmpty(terms) ){
                    return <div className={`post-term-block ${inlineDisplay ? 'inline-display' : ''}`}>
                        {
                            terms.map((term, index) => {
                                const name = term?.name; 
                                return linkTo && linkTo !== 'none' ? <HtmlTag className="term-item"><a href="#" onClick={e => e.preventDefault()}>{name}</a></HtmlTag> : <HtmlTag className="term-item">{name}</HtmlTag>;
                            })
                        }
                    </div>;
                }else{
                    return <div className="post-term-block">
                        {
                            linkTo && linkTo !== 'none' ? <HtmlTag className="term-item"><a href="#" onClick={e => e.preventDefault()}>{'Post Terms'}</a></HtmlTag> : <HtmlTag className="term-item">{'Post Terms'}</HtmlTag>
                        }
                    </div>;
                }
            case 'string':
            default:
                return <HtmlTag>
                    {!isEmpty(terms) ? terms.map((term, index) => {
                        const name = term?.name;
                        const after = index < terms.length - 1 ? separator : '';

                        return linkTo && linkTo !== 'none' ? <a href="#" onClick={e => e.preventDefault()}>{name + after}</a> : name + after;
                    }) : linkTo && linkTo !== 'none' ? <a href="#" onClick={e => e.preventDefault()}>{'Post Terms'}</a> : 'Post Terms'}
                </HtmlTag>;
        }
    }

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
            {contentHTML()}
        </div>
    </>;
});

export default PostTermsBlock;