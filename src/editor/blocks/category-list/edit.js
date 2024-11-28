import { compose } from '@wordpress/compose';
import { withCustomStyle, withMouseMoveEffect, withAnimationAdvance, withCopyElementToolbar } from 'gutenverse-core/hoc';
import {
    useInnerBlocksProps, useBlockProps,
} from '@wordpress/block-editor';
import { classnames, PostListSkeleton } from 'gutenverse-core/components';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useEffect, useState, useRef, RawHTML } from '@wordpress/element';
import { useDisplayEditor, useAnimationEditor } from 'gutenverse-core/hooks';
import { isOnEditor } from 'gutenverse-core/helper';
import { addQueryArgs, apiFetch } from 'gutenverse-core/frontend';

const IconListBlock = compose(
    withCustomStyle(panelList),
    withAnimationAdvance('category-list'),
    withCopyElementToolbar(),
    withMouseMoveEffect
)((props) => {
    const {
        attributes,
        setElementRef
    } = props;

    const {
        elementId,
    } = attributes;
    const categoryListRef = useRef();
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState(null);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-icon-list',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: categoryListRef
    });

    useEffect(() => {
        if (categoryListRef.current) {
            setElementRef && setElementRef(categoryListRef.current);
        }
    }, [categoryListRef]);

    useEffect(() => {
        if ( isOnEditor() ) {
            setLoading(true);

            elementId && apiFetch({
                path: addQueryArgs('/wp/v2/block-renderer/gutenverse/post-list', {
                    context: 'edit',
                    attributes: {
                    },
                }),
            }).then((data) => {
                setResponse(data.rendered);
            }).catch(() => {
                setResponse('<span>Error</span>');
            }).finally(() => setLoading(false));
        }
    }, [])

    return <>
        <PanelController panelList={panelList} {...props} />
        <div  {...blockProps}>
            {!loading ? <RawHTML key="html" className="guten-raw-wrapper">
                {response}
            </RawHTML> : <PostListSkeleton />}
        </div>
    </>;
});

export default IconListBlock;