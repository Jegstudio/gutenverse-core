
import classnames from 'classnames';
import { useBlockProps } from '@wordpress/block-editor';
import { InnerBlocks } from '@wordpress/block-editor';
import { useAnimationAdvanceData, useAnimationFrontend, useDisplayFrontend } from 'gutenverse-core/hooks';
import { compose } from '@wordpress/compose';
import { withAnimationAdvanceScript, withCursorEffectScript, withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { isAnimationActive } from 'gutenverse-core/helper';
import { FluidCanvasSave } from 'gutenverse-core/components';

const save = compose(
    withAnimationAdvanceScript('wrapper'),
    withCursorEffectScript,
    withMouseMoveEffectScript
)(({ attributes }) => {
    const {
        elementId,
        displayType,
        cursorEffect,
        url,
        linkTarget,
        backgroundAnimated = {},
    } = attributes;

    const animationClass = useAnimationFrontend(attributes);
    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const cursorEffectClass = {
        ['guten-cursor-effect']: cursorEffect?.show
    };

    const blockProps = useBlockProps.save({
        className: classnames(
            'guten-element',
            'guten-wrap-helper',
            'no-margin',
            elementId,
            animationClass,
            displayType,
            displayClass,
            cursorEffectClass,
            {
                'background-animated': isAnimationActive(backgroundAnimated),
                'with-url' :  url
            }
        ),
        ...advanceAnimationData
    });

    const _isBgAnimated = isAnimationActive(backgroundAnimated);
    const dataId = elementId?.split('-')[1];
    const className = classnames(
        'guten-element',
        'guten-wrap-helper',
        'no-margin',
        elementId,
        animationClass,
        displayType,
        displayClass,
        cursorEffectClass,
        {
            'background-animated': isAnimationActive(backgroundAnimated),
            'with-url' :  url
        },
    );

    const newLinkTarget = undefined === linkTarget ? '_self' : linkTarget;
    return (
        <div className={className} {...advanceAnimationData} onClick={url && `window.open('${url}', '${newLinkTarget}');`}>
            {(_isBgAnimated) &&
                <div className="guten-data">
                    {_isBgAnimated &&
                        <div data-var={`bgAnimatedData${dataId}`} data-value={JSON.stringify({
                            ...backgroundAnimated
                        })} />
                    }
                </div>}
            <FluidCanvasSave attributes={attributes} />
            <div className="guten-background-overlay" />
            <div className="guten-inner-wrap" data-id={dataId}>
                {_isBgAnimated && <div className={'guten-background-animated'}><div className={`animated-layer animated-${dataId}`}></div></div>}
                <InnerBlocks.Content />
            </div>
        </div>
    );
});

export default save;