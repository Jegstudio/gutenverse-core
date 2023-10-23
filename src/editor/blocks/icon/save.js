import { compose } from '@wordpress/compose';

import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { isEmpty } from 'lodash';
import { withAnimationAdvanceScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core/hooks';
import { canRenderTransform } from 'gutenverse-core/styling';

const save = compose(
    withAnimationAdvanceScript('icon'),
)((props) => {
    const {
        attributes
    } = props;

    const {
        elementId,
        icon,
        url,
        linkTarget,
        rel,
        iconShape,
        iconView,
        transform
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);
    const theTransform = canRenderTransform(transform);

    const className = classnames(
        'guten-element',
        elementId,
        'guten-icon',
        animationClass,
        displayClass,
        {
            'gutenverse-transform': theTransform
        }
    );

    const wrapperClass = classnames(
        'guten-icon-wrapper',
        iconShape,
        iconView
    );

    return <div {...useBlockProps.save({ className, ...advanceAnimationData })}>
        {!isEmpty(url) ? <a className={wrapperClass} href={url} target={ linkTarget } rel={ rel }>
            <i className={`${icon}`}/>
        </a> : <span className={wrapperClass}>
            <i className={`${icon}`}/>
        </span>}
    </div>;
});

export default save;