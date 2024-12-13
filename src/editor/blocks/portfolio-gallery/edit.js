/* External dependencies */
import { useEffect, useRef, useState } from '@wordpress/element';
import { classnames, u } from 'gutenverse-core/components';

/* WordPress dependencies */
import { useBlockProps } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';

/* Gutenverse dependencies */
import { withCustomStyle, withAnimationAdvance, withCopyElementToolbar, withMouseMoveEffect, withPartialRender } from 'gutenverse-core/hoc';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';

/* Local dependencies */
import { panelList } from './panels/panel-list';
import { getImageSrc } from 'gutenverse-core/editor-helper';
import { PanelController } from 'gutenverse-core/controls';

const PortfolioGalleryBlock = compose(
    withPartialRender,
    withCustomStyle(panelList),
    withAnimationAdvance('portfolio-gallery'),
    withCopyElementToolbar(),
    withMouseMoveEffect,
)(props => {
    const {
        attributes,
        setAttributes,
        setElementRef,
    } = props;
    
    const {
        elementId,
        images,
        showLink,
        linkText,
        linkIcon,
        behavior
    } = attributes;

    const portofolioGalleryRef = useRef();
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    const [current, setCurrent] = useState(0);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            elementId,
            animationClass,
            displayClass,
            'guten-portfolio-gallery'
        ),
        ref: portofolioGalleryRef
    });

    useEffect(() => {
        if (portofolioGalleryRef.current) {
            setElementRef(portofolioGalleryRef.current);
        }
    }, [portofolioGalleryRef]);

    const handleOnClick = (index) => {
        if(behavior === 'onclick'){
            setCurrent(index);
        }
    };

    const handleMouseEnter = (index) => {
        if(behavior === 'onhover'){
            setCurrent(index);
        }
    };
    
    useEffect(() => {
        let newImages = images;
        let isCurrent = images.findIndex(el => el.current);
        if( isCurrent === -1 ){
            newImages[0].current = true;
            setAttributes({images : newImages});
        }else{
            setCurrent(isCurrent)
        }
    }, [images]);
    return <>
        <PanelController panelList={panelList} {...props} />
        <div {...blockProps}>
            <div className={`portfolio-gallery-container ${behavior}`}>
                <div className="content-items">
                    {
                        images.map((el,index) => {
                            return <div key={el._key} className={`row-item ${current === index ? 'current-item' : ''}`} data-tab={`portfolio-gallery-tab-${index}`} onClick={() => handleOnClick(index)} onMouseEnter={() => handleMouseEnter(index)}>
                                <div className="row-item-info">
                                    {el.subtitle && <p className="info-subtitle">{el.subtitle}</p>}
                                    {el.title && <h2 className="info-title">{el.title}</h2>} 
                                </div>
                                {
                                    showLink && el.link && <div className="row-link-wrapper">
                                        <a href={el.link} aria-label={el.title} target="_blank" rel="noreferrer">
                                            {linkText}
                                            <i className={`${linkIcon}`} aria-hidden="true"></i>
                                        </a>
                                    </div>
                                }
                            </div>
                        })
                    }
                </div>
                <div className="image-items">
                    {
                        images.map((el,index) => {
                            return <div key={index} id={`portfolio-gallery-tab-${index}`} className={`image-item ${current === index ? 'current-item' : ''}`} style={{backgroundImage:`url(${getImageSrc(el.src)})`}}></div>
                        })
                    }
                </div>
            </div>
        </div>
    </>;
});

export default PortfolioGalleryBlock;
