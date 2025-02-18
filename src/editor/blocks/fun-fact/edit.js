import { compose } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';
import { withMouseMoveEffect } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import anime from 'animejs';
import { getImageSrc } from 'gutenverse-core/editor-helper';
import { useRef } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { withAnimationAdvance } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';

const FunFactBlock = compose(
    withAnimationAdvance('fun-fact'),
    withCopyElementToolbar(),
    withMouseMoveEffect
)((props) => {
    const {
        attributes,
        clientId
    } = props;

    const {
        elementId,
        icon,
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
        iconType,
        image,
        imageAlt,
        lazyLoad,
    } = attributes;

    const imageAltText = imageAlt || null;
    const elementRef = useRef(null);
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    useEffect(() => {
        if (elementRef.current) {
            anime({
                targets: elementRef.current.querySelector('.number'),
                innerHTML: number,
                easing: 'easeInOutQuart',
                round: 1,
                duration,
            });
        }
        return () => anime.remove(elementRef.current?.querySelector('.number'));
    }, [number, duration]);

    const headerContent = () => {
        switch (iconType) {
            case 'icon':
                return <div className="icon"><i className={icon}></i></div>;
            case 'image':
                if (lazyLoad) {
                    return <div className="icon"><img loading={lazyLoad ? 'lazy' : 'eager'} src={getImageSrc(image)} alt={imageAltText} /></div>;
                } else {
                    return <div className="icon"><img src={getImageSrc(image)} alt={imageAltText} /></div>;
                }
            default:
                return null;
        }
    };

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-fun-fact',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
            'align-center',
            'hover-from-left',
        ),
        ref: elementRef
    });

    return <>
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div  {...blockProps}>
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
    </>;
});

export default FunFactBlock;