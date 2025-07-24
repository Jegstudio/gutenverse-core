import { compose } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import anime from 'animejs';
import { getDeviceType, getImageSrc } from 'gutenverse-core/editor-helper';
import { useRef } from '@wordpress/element';
import { withAnimationAdvanceV2, withMouseMoveEffect, withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { useDynamicScript, useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { CopyElementToolbar } from 'gutenverse-core/components';

const FunFactBlock = compose(
    withPartialRender,
    withPassRef,
    withAnimationAdvanceV2('fun-fact'),
    withMouseMoveEffect
)((props) => {
    const {
        attributes,
        clientId,
        setBlockRef,
        setAttributes,
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
        iconPosition,
        contentDisplay,
        numberFormat = '',
    } = attributes;

    const imageAltText = imageAlt || null;
    const elementRef = useRef(null);
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const deviceType = getDeviceType();

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);
    useDynamicScript(elementRef);

    useEffect(() => {
        if (elementRef.current) {
            let formatter = null;
            if(numberFormat === 'comma') {
                formatter = new Intl.NumberFormat('en-US', {
                    maximumFractionDigits: 0
                });
            }else if(numberFormat === 'point') {
                formatter = new Intl.NumberFormat('id-ID', {
                    maximumFractionDigits: 0
                });
            }
            elementRef.current.querySelector('.number').innerHTML = 0;
            anime({
                targets: elementRef.current.querySelector('.number'),
                innerHTML: number,
                easing: 'easeInOutQuart',
                round: 1,
                duration,
                update: function(anim) {
                    const val = parseInt(anim.animations[0].currentValue);
                    elementRef.current.querySelector('.number').innerHTML = formatter && !isNaN(val) ? `${formatter.format( val )} ` : anim.animations[0].currentValue;
                }
            });
        }
        return () => anime.remove(elementRef.current?.querySelector('.number'));
    }, [number, duration, numberFormat]);

    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);

    const iconContent = () => {
        switch (iconType) {
            case 'icon':
                return <div className="icon-box">
                    <div className="icon"><i className={icon}></i></div>
                </div>;
            case 'image':
                return <div className="icon-box">
                    <div className="icon"><img src={getImageSrc(image)} alt={imageAltText} {...(lazyLoad && { loading: 'lazy' })} /></div>
                </div>;
            default:
                return null;
        }
    };
    const setIconPosition = () => {
        if (iconPosition[deviceType] == 'left' || iconPosition[deviceType] == 'right') {
            setAttributes( { contentDisplay: 'inline-block' } );
        } else {
            setAttributes( { contentDisplay: 'block' } );
        }
    };
    const setShowIconContent = () => {
        if (iconPosition[deviceType] == 'left' || iconPosition[deviceType] == 'top') {
            setAttributes( {
                topIconContent: true,
                bottomIconContent: false
            } );
        } else {
            setAttributes( {
                topIconContent: false,
                bottomIconContent: true
            } );
        }
    };

    useEffect(() => {
        setIconPosition();
        setShowIconContent();
    }, [iconPosition]);

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
        <CopyElementToolbar {...props} />
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div  {...blockProps}>
            <div className="fun-fact-inner">
                {(iconPosition[deviceType] === 'top' || iconPosition[deviceType] === 'left' || iconPosition[deviceType] == undefined) && iconContent()}
                <div className={`content ${contentDisplay}`}>
                    <div className="number-wrapper">
                        <span className="prefix">{`${prefix} `}</span>
                        <span className="number loaded" data-number={number} data-duration={duration}></span>
                        <span className="suffix">{suffix}</span>
                        {showSupper && <sup className="super">{supper}</sup>}
                    </div>
                    <TitleTag className="title">{title}</TitleTag>
                </div>
                {(iconPosition[deviceType] === 'bottom' || iconPosition[deviceType] === 'right') && iconContent()}
            </div>
            {hoverBottom && <div className={'border-bottom'}>
                <div className={`animated ${hoverBottomDirection}`}></div>
            </div>}
        </div>
    </>;
});

export default FunFactBlock;