import classnames from 'classnames';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { withVideoBackground } from 'gutenverse-core/hoc';
import { SectionDividerBottom, SectionDividerTop } from '../../components/section-divider';
import { compose } from '@wordpress/compose';
import { isAnimationActive, isSticky } from 'gutenverse-core/helper';
import { withAnimationAdvanceScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';

const save = compose(
    withAnimationAdvanceScript('section'),
    withVideoBackground
)((props) => {
    const {
        attributes,
        videoContainer
    } = props;

    const {
        elementId,
        layout = 'boxed',
        gap = 'default',
        align,
        overflow,
        topDivider,
        bottomDivider,
        sticky = {},
        stickyShowOn,
        stickyEase,
        stickyPosition,
        stickyDuration,
        topSticky,
        bottomSticky,
        backgroundAnimated = {}
    } = attributes;

    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'guten-section',
        elementId,
        animationClass,
        displayClass,
        {
            'background-animated': isAnimationActive(backgroundAnimated),
            [`layout-${layout}`]: layout,
            [`align-${align}`]: align,
            [`overflow-${overflow}`]: overflow && overflow !== 'none',
            ['guten-sticky']: isSticky(sticky),
            [`sticky-${stickyPosition}`]: isSticky(sticky),

        }
    );

    const wrapperClassName = classnames(
        'section-wrapper',
        {
            ['guten-section-wrapper']: isSticky(sticky),
            [`section-${elementId}`]: isSticky(sticky),
            [`sticky-${stickyPosition}`]: isSticky(sticky),
        }
    );

    const containerClass = classnames('guten-container', {
        [`guten-column-gap-${gap}`]: true,
    });

    return (
        <div className={wrapperClassName} data-id={elementId?.split('-')[1]}>
            {isSticky(sticky) &&
            <script>
                {`var stickyData${elementId?.split('-')[1]} = ${JSON.stringify({
                    sticky,
                    stickyShowOn,
                    stickyPosition,
                    stickyEase,
                    stickyDuration,
                    topSticky,
                    bottomSticky
                })}`}
            </script>}
            <script>{`var top${elementId?.split('-')[1]} = ${JSON.stringify(topSticky)};var bottom${elementId?.split('-')[1]} = ${JSON.stringify(bottomSticky)};`}</script>
            <section {...useBlockProps.save({ className })}>
                {isAnimationActive(backgroundAnimated) && <div className="guten-background-animated"><div className="animated-layer"></div></div>}
                <div className="guten-background-overlay"></div>
                {topDivider && <SectionDividerTop {...props} />}
                {bottomDivider && <SectionDividerBottom {...props} />}
                <div className={containerClass}>
                    <InnerBlocks.Content />
                </div>
                {videoContainer}
            </section>
        </div>
    );
});

export default save;