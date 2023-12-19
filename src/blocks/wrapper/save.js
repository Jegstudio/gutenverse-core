
import classnames from 'classnames';
import { useBlockProps } from '@wordpress/block-editor';
import { InnerBlocks } from '@wordpress/block-editor';
import { useAnimationAdvanceData, useAnimationFrontend } from 'gutenverse-core/hooks';
import { compose } from '@wordpress/compose';
import { withAnimationAdvanceScript, withCursorEffectScript } from 'gutenverse-core/hoc';
import { isAnimationActive } from 'gutenverse-core/helper';
import { FluidCanvasSave } from 'gutenverse-core/components';

const save = compose(
    withAnimationAdvanceScript('wrapper'),
    withCursorEffectScript
)(({ attributes }) => {
    const {
        elementId,
        displayType,
        cursorEffect,
        linkTarget,
        rel,
        url,
        backgroundAnimated = {},
    } = attributes;

    const animationClass = useAnimationFrontend(attributes);
    const advanceAnimationData = useAnimationAdvanceData(attributes);

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
            cursorEffectClass,
            {
                'background-animated': isAnimationActive(backgroundAnimated),
            }
        ),
        ...advanceAnimationData
    });
    const contentWrapper = () => {
        if(linkTarget && url && rel){
            return <a href={url} target={linkTarget} rel={rel}>
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
            </a>;
        }else{
            return <>
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
            </>;
        }
    };

    const _isBgAnimated = isAnimationActive(backgroundAnimated);
    const dataId = elementId?.split('-')[1];
    return (
        <div {...blockProps}>
            {contentWrapper()}
        </div>
    );
});

export default save;