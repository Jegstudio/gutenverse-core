import { compose } from '@wordpress/compose';
import { classnames } from 'gutenverse-core/components';
import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import { getImageSrc } from 'gutenverse-core/editor-helper';
import { withAnimationAdvanceScript, withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core/hooks';
import { applyFilters } from '@wordpress/hooks';

const save = compose(
    withAnimationAdvanceScript('icon-box'),
    withMouseMoveEffectScript
)((props) => {
    const {
        attributes
    } = props;

    const {
        elementId,
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        elementId,
        animationClass,
        displayClass,
        'guten-feature-list',
    );

    // const imageLazyLoad = () => {
    //     if (lazyLoad) {
    //         return <img src={getImageSrc(image)} alt={imageAltText} loading="lazy" />;
    //     } else {
    //         return <img src={getImageSrc(image)} alt={imageAltText} />;
    //     }
    // };
    // const iconContent = () => {
    //     switch (iconType) {
    //         case 'icon':
    //             return <div className="icon-box icon-box-header">
    //                 <div className={`icon style-${iconStyleMode}`}>
    //                     <i className={icon}></i>
    //                 </div>
    //             </div>;
    //         case 'image':
    //             return <div className="icon-box icon-box-header">
    //                 <div className={`icon style-${iconStyleMode} type-image`}>
    //                     {imageLazyLoad()}
    //                 </div>
    //             </div>;
    //         default:
    //             return null;
    //     }
    // };
    return (
        <div {...useBlockProps.save({ className, ...advanceAnimationData })} >
        </div>
    );
});

export default save;