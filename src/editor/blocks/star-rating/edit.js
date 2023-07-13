import { compose } from '@wordpress/compose';

import { withCustomStyle } from 'gutenverse-core-editor/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { PanelController } from 'gutenverse-core-editor/controls';
import { panelList } from './panels/panel-list';
import StarIcons from './components/star-icons';
import { useRef } from '@wordpress/element';
import { useEffect } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core-editor/hoc';
import { withAnimationAdvance } from 'gutenverse-core-editor/hoc';
import { useAnimationEditor } from 'gutenverse-core-editor/hooks';
import { useDisplayEditor } from 'gutenverse-core-editor/hooks';

const StarRatingBlock = compose(
    withCustomStyle(panelList),
    withAnimationAdvance('star-rating'),
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
        setElementRef,
        setAdanimRef
    } = props;

    const {
        elementId,
        title
    } = attributes;

    const ratingRef = useRef();
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-star-rating',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: ratingRef
    });

    useEffect(() => {
        if (ratingRef.current) {
            setElementRef(ratingRef.current);
            setAdanimRef && setAdanimRef(ratingRef.current);
        }
    }, [ratingRef]);

    return <>
        <PanelController panelList={panelList} {...props} />
        <div  {...blockProps}>
            <div className="rating-wrapper">
                <span className="rating-title">{title}</span>
                <StarIcons {...attributes} />
            </div>
        </div>
    </>;
});

export default StarRatingBlock;