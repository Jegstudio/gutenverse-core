import { compose } from '@wordpress/compose';
import { withMouseMoveEffect, withPartialRender } from 'gutenverse-core/hoc';
import {
    useBlockProps,
} from '@wordpress/block-editor';
import { classnames, PostListSkeleton } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useEffect, useState, useRef, RawHTML } from '@wordpress/element';
import { useDisplayEditor, useAnimationEditor } from 'gutenverse-core/hooks';
import { dummyText, isOnEditor } from 'gutenverse-core/helper';
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { CopyElementToolbar } from 'gutenverse-core/components';

const IconListBlock = compose(
    withPartialRender,
    withMouseMoveEffect
)((props) => {
    const {
        attributes,
        clientId
    } = props;

    const {
        elementId,
        includedCategory,
        sortBy,
        qty,
        icon,
        sortType,
        hideEmpty,
        showIcon,
        taxonomyType,
        showDivider
    } = attributes;

    const elementRef = useRef();
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState(null);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-taxonomy-list',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    useEffect(() => {
        if (isOnEditor()) {
            setLoading(true);
            elementId && apiFetch({
                path: addQueryArgs('/wp/v2/block-renderer/gutenverse/taxonomy-list', {
                    context: 'edit',
                    attributes: {
                        elementId,
                        sortBy,
                        sortType,
                        includedCategory,
                        qty,
                        icon,
                        hideEmpty,
                        showIcon,
                        showDivider,
                        taxonomyType
                    }
                }),
            }).then((data) => {
                setResponse(data.rendered);
            }).catch(() => {
                setResponse('<span>Error</span>');
            }).finally(() => setLoading(false));
        } else {
            setResponse(`<div class="taxonomy-list-wrapper">
                    <div class="taxonomy-list-item">
						<a href="#">
							<span class="icon-list"><i aria-hidden="true" class="${icon}"></i></span>
							<div class="taxonomy-list-content">${dummyText(5, 10)}</div>
						</a>
					</div>
                    <div class="taxonomy-list-item">
						<a href="#">
							<span class="icon-list"><i aria-hidden="true" class="${icon}"></i></span>
							<div class="taxonomy-list-content">${dummyText(5, 10)}</div>
						</a>
					</div>
                    <div class="taxonomy-list-item">
						<a href="#">
							<span class="icon-list"><i aria-hidden="true" class="${icon}"></i></span>
							<div class="taxonomy-list-content">${dummyText(5, 10)}</div>
						</a>
					</div>
                </div>
            `);
            setLoading(false);
        }
    }, [
        elementId,
        sortBy,
        sortType,
        includedCategory,
        qty,
        icon,
        hideEmpty,
        showIcon,
        taxonomyType
    ]);

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    return <>
        <CopyElementToolbar {...props}/>
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div  {...blockProps}>
            {!loading ? <RawHTML key="html" className="guten-raw-wrapper">
                {response}
            </RawHTML> : <PostListSkeleton />}
        </div>
    </>;
});

export default IconListBlock;