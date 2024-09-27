
import { InnerBlocks } from '@wordpress/block-editor';
import { useAnimationAdvanceData, useAnimationFrontend, useDisplayFrontend } from 'gutenverse-core/hooks';
import { withAnimationAdvanceScript, withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { compose } from '@wordpress/compose';
import { classnames } from 'gutenverse-core/components';

const save = compose(
    withAnimationAdvanceScript('icon'),
    withMouseMoveEffectScript
)((props) => {
    const {
        attributes,
    } = props;

    const {
        inputPlaceholder,
        elementId,
        showButton
    } = attributes;
    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        elementId,
        'guten-search',
        animationClass,
        displayClass,
    );

    return (
        <div className={className} { ...advanceAnimationData }>
            <form
                className="gutenverse-search-form"
            >
                <input type="search"
                    placeholder={inputPlaceholder}
                    name="s"
                    className={classnames(
                        'gutenverse-search',
                        'gutenverse-search-input',
                    )}
                />
                {
                    showButton && <InnerBlocks.Content className="gutenverse-search-button" />
                }
            </form>
        </div>
    );
});

export default save;