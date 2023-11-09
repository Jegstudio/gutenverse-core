
import isEmpty from 'lodash/isEmpty';
import { useBlockProps } from '@wordpress/block-editor';
import { useAnimationAdvanceData, useAnimationFrontend, useDisplayFrontend } from 'gutenverse-core/hooks';
import { withAnimationAdvanceScript } from 'gutenverse-core/hoc';
import { compose } from '@wordpress/compose';
import classNames from 'classnames';

const save = compose(
    withAnimationAdvanceScript('icon'),
)((props) => {
    const {
        attributes,
    } = props;

    const {
        inputPlaceholder,
        elementId,
        buttonMode
    } = attributes;
    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classNames(
        'guten-element',
        elementId,
        'guten-icon',
        animationClass,
        displayClass,
    );

    return (
        <form
        {...useBlockProps.save({ className, ...advanceAnimationData })}
        >
            <input type="search"
                placeholder="Place Holder"
                name="search"
                className="gutenverse-search gutenverse-search-input"
            />
            {
                buttonMode !== 'no-button' && <input type="submit" className="gutenverse-search-button " />
            }

        </form>

    );
});

export default save;