import { compose } from '@wordpress/compose';

import { classnames } from 'gutenverse-core/components';
import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import { ImageBoxFigure } from './edit';
import { withAnimationAdvanceScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core/hooks';

const WrapAHref = ({ attributes, children }) => {
    const {
        url,
        linkTarget,
        rel,
        buttonClass = '',
    } = attributes;

    if (url !== undefined && url !== '') {
        return <a className={buttonClass} href={url} target={linkTarget} rel={rel}>
            {children}
        </a>;
    } else {
        return children;
    }
};

const save = compose(
    withAnimationAdvanceScript('image-box')
)((props) => {
    const {
        attributes
    } = props;

    const {
        elementId,
        contentStyle,
        titleTag: TitleTag,
        title,
        titleIconPosition,
        description,
        titleIcon,
        hoverBottom,
        hoverBottomDirection,
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        elementId,
        animationClass,
        displayClass,
        'gutenverse-image-box',
        'guten-element',
        `style-${contentStyle}`,
    );

    return (
        <div {...useBlockProps.save({ className, ...advanceAnimationData })}>
            <div>test</div>
            <div className="image-box-header">
                <WrapAHref {...props}>
                    <ImageBoxFigure {...attributes} />
                </WrapAHref>
            </div>
            <div className="image-box-body">
                <div className="body-inner">
                    <TitleTag className={classnames(
                        'body-title',
                        `icon-position-${titleIconPosition}`
                    )}>
                        <WrapAHref {...props}>
                            {titleIconPosition === 'before' && titleIcon !== '' && <i className={titleIcon} />}
                            <RichText.Content
                                value={title}
                                tagName="span"
                            />
                            {titleIconPosition === 'after' && titleIcon !== '' && <i className={titleIcon} />}
                        </WrapAHref>
                    </TitleTag>
                    <RichText.Content
                        className="body-description"
                        value={description}
                        tagName="p"
                    />
                    <InnerBlocks.Content />
                    {hoverBottom && <div className={'border-bottom'}>
                        <div className={`animated ${hoverBottomDirection}`}></div>
                    </div>}
                </div>
            </div>
        </div>
    );
});

export default save;