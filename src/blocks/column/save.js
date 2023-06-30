import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { compose } from '@wordpress/compose';
import { isAlignStickyColumn, isSticky } from 'gutenverse-core/helper';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';

const save = compose(
)((props) => {
    const {
        attributes,
    } = props;

    const {
        elementId,
        sticky = {},
        stickyShowOn,
        stickyEase,
        stickyPosition,
        stickyDuration,
        topSticky,
        bottomSticky,
        sectionVerticalAlign
    } = attributes;

    const isCanSticky =  isSticky(sticky) && isAlignStickyColumn(sectionVerticalAlign);

    const stickyClass = {
        ['guten-sticky']: isCanSticky,
        [`sticky-${stickyPosition}`]: isCanSticky,
    };

    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const wrapperClasses = classnames(
        'guten-element',
        'guten-column',
        elementId,
        animationClass,
        displayClass,
        stickyClass,
    );

    const blockProps = useBlockProps.save({
        className: wrapperClasses,
        ...(
            isCanSticky
                ? {'data-id': elementId?.split('-')[1]}
                : {}
        )
    });

    return (
        <div {...blockProps}>
            {isCanSticky &&
                <div className="guten-data">
                    <div data-var={`stickyData${elementId?.split('-')[1]}`} data-value={JSON.stringify({
                        sticky,
                        stickyShowOn,
                        stickyPosition,
                        stickyEase,
                        stickyDuration,
                        topSticky,
                        bottomSticky
                    })} />
                </div>}
            <div className="guten-background-overlay"></div>
            <div className={'sticky-wrapper'} data-id={elementId?.split('-')[1]}>
                <div className="guten-column-wrapper">
                    <InnerBlocks.Content />
                </div>
            </div>
        </div>
    );
});

export default save;