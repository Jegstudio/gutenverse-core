import classnames from 'classnames';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { withVideoBackground } from 'gutenverse-core/hoc';
import { SectionDividerBottom, SectionDividerTop } from '../../components/section-divider';
import { compose } from '@wordpress/compose';
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
            [`layout-${layout}`]: layout,
            [`align-${align}`]: align,
            [`overflow-${overflow}`]: overflow && overflow !== 'none'
        }
    );

    const wrapperClassName = classnames(
        'section-wrapper',
    );

    const containerClass = classnames('guten-container', {
        [`guten-column-gap-${gap}`]: true,
    });

    const dataId = elementId?.split('-')[1];

    return (
        <div className={wrapperClassName} data-id={dataId}>
            <section { ...useBlockProps.save({ className })}>
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