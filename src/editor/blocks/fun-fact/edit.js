import { compose } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';
import { withCustomStyle } from 'gutenverse-core-editor/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { PanelController } from 'gutenverse-core-editor/controls';
import { panelList } from './panels/panel-list';
import anime from 'animejs';
import { getImageSrc } from 'gutenverse-core-editor/helper';
import { useRef } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core-editor/hoc';
import { withAnimationAdvance } from 'gutenverse-core-editor/hoc';
import { useAnimationEditor } from 'gutenverse-core-editor/hooks';
import { useDisplayEditor } from 'gutenverse-core-editor/hooks';

const FunFactBlock = compose(
    withCustomStyle(panelList),
    withAnimationAdvance('fun-fact'),
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
        deviceType,
        setElementRef,
        setAdanimRef,
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
        imageAlt
    } = attributes;

    const imageAltText = imageAlt || null;
    const funFactRef = useRef();
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
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
        ref: funFactRef
    });

    useEffect(() => {
        if (funFactRef.current) {
            setElementRef(funFactRef.current);
            setAdanimRef && setAdanimRef(funFactRef.current);
        }
    }, [funFactRef]);

    useEffect(() => {
        anime({
            targets: funFactRef.current.getElementsByClassName('number')[0],
            innerHTML: `${number}`,
            easing: 'easeInOutQuart',
            round: 1,
            duration,
        });
    }, [attributes, deviceType]);

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

    return <>
        <PanelController panelList={panelList} {...props} />
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