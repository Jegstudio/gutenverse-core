
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { useAnimationAdvanceData, useAnimationFrontend, useDisplayFrontend } from 'gutenverse-core/hooks';
import { withAnimationAdvanceScript } from 'gutenverse-core/hoc';
import { compose } from '@wordpress/compose';
import { classnames } from 'gutenverse-core/components';

const save = compose(
    withAnimationAdvanceScript('icon'),
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
        'guten-icon',
        animationClass,
        displayClass,
    );

    return (
        <div {...useBlockProps.save({ className, ...advanceAnimationData })}>
            <form
                className="gutenverse-search-form"
                action={window.location.origin}
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