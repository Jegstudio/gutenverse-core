import { compose } from '@wordpress/compose';

import classnames from 'classnames';
import { useBlockProps } from '@wordpress/block-editor';
import { getImageSrc } from 'gutenverse-core-editor/helper';
import { withAnimationAdvanceScript } from 'gutenverse-core-editor/hoc';
import { useAnimationFrontend } from 'gutenverse-core-editor/hooks';
import { useDisplayFrontend } from 'gutenverse-core-editor/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core-editor/hooks';

const save = compose(
    withAnimationAdvanceScript('fun-fact'),
)((props) => {
    const {
        attributes
    } = props;

    const {
        elementId,
        icon,
        iconType,
        prefix,
        suffix,
        title,
        supper,
        showSupper,
        number,
        duration,
        titleTag: TitleTag,
        hoverBottom,
        hoverBottomDirection,
        image,
        imageAlt
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const imageAltText = imageAlt || null;
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        elementId,
        animationClass,
        displayClass,
        'guten-fun-fact',
        'align-center',
        'hover-from-left',
    );

    const headerContent = () => {
        switch (iconType) {
            case 'icon':
                return <div className="icon"><i className={icon}></i></div>;
            case 'image':
                return <div className="icon"><img src={getImageSrc(image)} alt={imageAltText} /></div>;
            default:
                return null;
        }
    };

    return (
        <div {...useBlockProps.save({ className, ...advanceAnimationData })}>
            <div className="fun-fact-inner">
                {headerContent()}
                <div className="content">
                    <div className="number-wrapper">
                        <span className="prefix">{`${prefix} `}</span>
                        <span className="number loaded" data-number={number} data-duration={duration}></span>
                        <span className="suffix">{suffix}</span>
                        {showSupper && <sup className="super">{supper}</sup>}
                    </div>
                    <TitleTag className="title">{title}</TitleTag>
                </div>
            </div>
            {hoverBottom && <div className={'border-bottom'}>
                <div className={`animated ${hoverBottomDirection}`}></div>
            </div>}
        </div>
    );
});

export default save;