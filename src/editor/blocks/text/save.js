import { compose } from '@wordpress/compose';

import { classnames } from 'gutenverse-core/components';
import { useBlockProps } from '@wordpress/block-editor';
import { InnerBlocks } from '@wordpress/block-editor';
import { withAnimationAdvanceScript, withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core/hooks';
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const save = compose(
    withAnimationAdvanceScript('text-editor'),
    withMouseMoveEffectScript
)((props) => {
    const {
        attributes
    } = props;

    const {
        elementId,
        dropcap,
        paragraph
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'gutenverse-text-editor',
        elementId,
        animationClass,
        displayClass,
        {
            'dropcap': dropcap
        },
    );

    return (
        <div {...useBlockProps.save({ className, ...advanceAnimationData })}>
            <div className="text-content-inner">
                <RichText.Content
                    className={'gutenverse-text-paragraph'}
                    tagName={'p'}
                    aria-label={__('Text Paragraph', 'gutenverse')}
                    placeholder={__('Text Paragraph Placeholder', 'gutenverse')}
                    value={paragraph}
                />
            </div>
        </div>
    );
});

export default save;