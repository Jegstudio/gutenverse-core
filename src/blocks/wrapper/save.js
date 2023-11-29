
import classnames from 'classnames';
import { useBlockProps } from '@wordpress/block-editor';
import { InnerBlocks } from '@wordpress/block-editor';
import { useAnimationAdvanceData, useAnimationFrontend } from 'gutenverse-core/hooks';
import { compose } from '@wordpress/compose';
import { withAnimationAdvanceScript, withCursorEffectScript } from 'gutenverse-core/hoc';

const save = compose(
    withAnimationAdvanceScript('wrapper'),
    withCursorEffectScript
)(({ attributes }) => {
    const {
        elementId,
        displayType,
        cursorEffect,
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
        ),
        ...advanceAnimationData
    });

    const dataId = elementId?.split('-')[1];

    return (
        <div {...blockProps} data-id={dataId}>
            <InnerBlocks.Content />
        </div>
    );
});

export default save;