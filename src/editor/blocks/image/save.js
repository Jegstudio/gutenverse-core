import { compose } from '@wordpress/compose';

import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { ImageBoxFigure } from './edit';
import { withAnimationAdvanceScript } from 'gutenverse-core-editor/hoc';
import { useAnimationFrontend } from 'gutenverse-core-editor/hooks';
import { useDisplayFrontend } from 'gutenverse-core-editor/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core-editor/hooks';

const save = compose(
    withAnimationAdvanceScript('image')
)((props) => {
    const {
        attributes
    } = props;

    const {
        elementId,
        url,
        linkTarget,
        rel,
        captionType,
        captionOriginal,
        captionCustom,
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const blockProps = useBlockProps.save({
        ...advanceAnimationData,
        className: classnames(
            'guten-element',
            'guten-image',
            elementId,
            animationClass,
            displayClass
        ),
    });

    const caption = () => {
        switch (captionType) {
            case 'original':
                return <span className="guten-caption">{captionOriginal}</span>;
            case 'custom':
                return <span className="guten-caption">{captionCustom}</span>;
            default:
                return null;
        }
    };

    return <div {...blockProps}>
        <a className="guten-image-wrapper" href={url} target={linkTarget} rel={rel}>
            <ImageBoxFigure {...attributes}/>
        </a>
        {caption()}
    </div>;
});

export default save;