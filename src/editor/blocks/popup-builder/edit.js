import { compose } from '@wordpress/compose';
import { withMouseMoveEffect } from 'gutenverse-core/hoc';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useRef } from '@wordpress/element';
import { useState } from '@wordpress/element';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { __ } from '@wordpress/i18n';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';

const PopupBuilder = compose(
    withCopyElementToolbar(),
    withMouseMoveEffect
)((props) => {
    const {
        attributes,
        clientId
    } = props;
    const {
        elementId,
        position,
        contentPosition,
        sideMode,
        closePopupOverlay,
        showCloseButton,
        closeIcon,
        closePosition,
    } = attributes;

    const [show, setShow] = useState(false);

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const elementRef = useRef();
    const containerRef = useRef();
    const deviceType = getDeviceType();

    const [localAttr, setLocalAttr] = useState({});
    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef, localAttr);
    const innerBlocksProps = useInnerBlocksProps({
        className: classnames('guten-popup-container')
    }, {
        template: [
            ['gutenverse/popup-container', {
                position: 'above',
            }],
            ['gutenverse/popup-container', {
                position: 'bottom',
            }],
        ],
        allowedBlocks: ['gutenverse/popup-container'],
        renderAppender: false,
    });

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-popup-builder',
            `guten-popup-${deviceType}`,
            elementId,
            displayClass,
        ),
        ref: elementRef,
        'data-close-overlay': closePopupOverlay
    });

    const toggleShow = () => setShow(show => !show);
    const hidePopup = () => setShow(false);
    const overlayClicked = () => { closePopupOverlay ? setShow(false) : null; };

    const hideClickContainer = (e) => {
        if (containerRef.current && !containerRef.current.contains(e.target)
            && !(e.target.closest('#gutenverse-root'))
            && !(e.target.closest('.components-popover'))
            && !(e.target.closest('.interface-interface-skeleton__sidebar'))) {
            overlayClicked();
        }
    };

    return <>
        <BlockPanelController panelList={panelList} props={props} setLocalAttr={setLocalAttr} />
        <div {...blockProps}>
            <div className="guten-popup-holder" onClick={toggleShow}>
                <h1>{__('Popup Builder', 'gutenverse')}</h1>
                <span>{__('This block doesn\'t render on frontend. Click to show popup.', 'gutenverse')}</span>
            </div>
            {<div className={classnames(
                {
                    'show': show
                },
                'guten-popup',
                `guten-popup-${position}`,
                `guten-popup-side-${sideMode}`,
            )}>
                <div className="guten-popup-overlay" onClick={overlayClicked}></div>
                {showCloseButton && closePosition === 'overlay' && <div className="guten-popup-close" onClick={hidePopup}>
                    <i className={closeIcon} />
                </div>}
                <div onClick={hideClickContainer} className={classnames(
                    'guten-popup-wrapper',
                    `guten-popup-wrapper-${contentPosition}`,
                )}>
                    <div ref={containerRef} className={classnames(
                        'guten-popup-content',
                        animationClass
                    )}>
                        {showCloseButton && closePosition === 'container' && <div className="guten-popup-close" onClick={hidePopup}>
                            <i className={closeIcon} />
                        </div>}
                        <div {...innerBlocksProps} />
                    </div>
                </div>
            </div>}
        </div>
    </>;
});

export default PopupBuilder;