import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useRef } from '@wordpress/element';
import { useState } from '@wordpress/element';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { __ } from '@wordpress/i18n';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { CopyElementToolbar } from 'gutenverse-core/components';
import PopupVideoContent from './components/popup-video';

const PopupBuilder = (props) => {
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
        exitAnimation,
        exitAnimationDuration,
        exitAnimationDelay,
        popupType,
        popupVideoPlayOn,
        popupVideoStart,
        popupVideoPauseOnClose,
        popupVideoResetOnClose
    } = attributes;

    const [show, setShow] = useState(false);
    const [exit, setExit] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [firstPlaying, setFirstPlaying] = useState(true);

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const elementRef = useRef();
    const containerRef = useRef();
    const deviceType = getDeviceType();

    const videoRef = useRef();

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);
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

    const toggleShow = () => {
        setShow((show) => !show);
        if (popupVideoResetOnClose && videoRef.current) {
            videoRef.current.seekTo(popupVideoStart);
        }
        if (popupVideoPlayOn === 'first' && !firstPlaying) {
            return;
        }
        if (popupVideoPlayOn === 'first' || popupVideoPlayOn === 'every') {
            setPlaying(true);
            if (popupVideoPlayOn === 'first') {
                setFirstPlaying(false);
            }
        }
    };
    const hidePopup = () => {
        setExit(true);
        setTimeout(() => {
            setExit(false);
            setShow(false);
            if (popupVideoPauseOnClose) {
                setPlaying(false);
            }
        }, exitAnimation ? (parseInt(exitAnimationDuration) || 0) + (parseInt(exitAnimationDelay) || 0) || 1000 : 0);
    };
    const overlayClicked = () => { closePopupOverlay ? hidePopup() : null; };

    const hideClickContainer = (e) => {
        if (containerRef.current && !containerRef.current.contains(e.target)
            && !(e.target.closest('#gutenverse-root'))
            && !(e.target.closest('.components-popover'))
            && !(e.target.closest('.interface-interface-skeleton__sidebar'))) {
            overlayClicked();
        }
    };

    const renderContent = () => {
        switch(popupType) {
            case 'youtube':
                return <PopupVideoContent playing={playing} setPlaying={setPlaying} attributes={attributes} videoRef={videoRef} />;
            default:
                return <div {...innerBlocksProps} />;
        }
    };

    return <>
        <CopyElementToolbar {...props}/>
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
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
                        animationClass,
                        exit ? 'exit' : '',
                        !animationClass.animated && exitAnimation ? 'animated' : ''
                    )}>
                        {showCloseButton && closePosition === 'container' && <div className="guten-popup-close" onClick={hidePopup}>
                            <i className={closeIcon} />
                        </div>}
                        {renderContent()}
                    </div>
                </div>
            </div>}
        </div>
    </>;
};

export default PopupBuilder;