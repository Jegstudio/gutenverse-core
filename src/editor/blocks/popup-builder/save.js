
import { compose } from '@wordpress/compose';
import { InnerBlocks } from '@wordpress/block-editor';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { canRenderTransform } from 'gutenverse-core/styling';

const save = compose(
)((props) => {
    const { attributes } = props;

    const {
        elementId,
        contentPosition,
        position,
        sideMode,
        closeIcon,
        openTrigger,
        openWaitTime,
        openScrollDistance,
        openAnchor,
        openMaxClick,
        showCloseButton,
        closePosition,
        closePopupOverlay,
        transform
    } = attributes;

    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);
    const theTransform = canRenderTransform(transform);

    const blockProps = useBlockProps.save({
        className: classnames(
            'guten-element',
            'guten-popup-builder',
            elementId,
            displayClass,
            {
                'gutenverse-transform': theTransform
            }
        ),
        'data-trigger': openTrigger,
        'data-wait': openWaitTime,
        'data-scroll': openScrollDistance,
        'data-anchor': openAnchor,
        'data-max-click': openMaxClick,
        'data-close-overlay': closePopupOverlay,
    });

    return (
        <div {...blockProps}>
            <div
                className={classnames(
                    'guten-popup',
                    `guten-popup-${position}`,
                    `guten-popup-side-${sideMode}`
                )}
            >
                <div className="guten-popup-overlay"></div>
                {showCloseButton && closePosition === 'overlay' && (
                    <div className="guten-popup-close">
                        <i className={closeIcon}></i>
                    </div>
                )}
                <div
                    className={classnames(
                        'guten-popup-wrapper',
                        `guten-popup-wrapper-${contentPosition}`
                    )}
                >
                    <div
                        className={classnames(
                            'guten-popup-content',
                            animationClass
                        )}
                    >
                        {showCloseButton && closePosition === 'container' && (
                            <div className="guten-popup-close">
                                <i className={closeIcon}></i>
                            </div>
                        )}
                        <div className="guten-popup-container">
                            <InnerBlocks.Content />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default save;
