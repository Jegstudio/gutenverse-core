import classnames from 'classnames';

import { compose } from '@wordpress/compose';
import { withAnimationAdvanceScript } from 'gutenverse-core-editor/hoc';
import { useAnimationFrontend } from 'gutenverse-core-editor/hooks';
import { useDisplayFrontend } from 'gutenverse-core-editor/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core-editor/hooks';

const SaveSpacer = compose(
    withAnimationAdvanceScript('spacer')
)(props => {
    const {
        attributes
    } = props;

    const {
        elementId,
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'guten-spacer',
        elementId,
        animationClass,
        displayClass
    );

    return <div className={className} { ...advanceAnimationData }/>;
});

export default SaveSpacer;