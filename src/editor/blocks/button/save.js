
import { classnames } from 'gutenverse-core/components';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { useAnimationAdvanceData, useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { withAnimationAdvanceScript, withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { compose } from '@wordpress/compose';

const save = compose(
    withAnimationAdvanceScript('buttons'),
    withMouseMoveEffectScript
)(({ attributes }) => {
    const {
        elementId,
        content,
        url = '#',
        linkTarget,
        rel,
        buttonType,
        buttonSize,
        showIcon,
        icon,
        iconPosition,
        role,
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'guten-button-wrapper',
        elementId,
        displayClass,
    );

    const buttonClass = classnames(
        'guten-button',
        animationClass,
        {
            [`guten-button-${buttonType}`]: buttonType && buttonType !== 'default',
            [`guten-button-${buttonSize}`]: buttonSize,
        }
    );

    const ButtonElement = ({ children }) => {
        return role === 'link' ?
            <a className={buttonClass} href={url} target={linkTarget} rel={rel}>{children}</a> :
            <button className={buttonClass} type="submit">{children}</button>;
    };

    return (
        <div {...useBlockProps.save({ className, ...advanceAnimationData })}>
            <ButtonElement>
                {showIcon && iconPosition === 'before' && <i className={`fa-lg ${icon}`} />}
                <span>
                    <RichText.Content value={content} />
                </span>
                {showIcon && iconPosition === 'after' && <i className={`fa-lg ${icon}`} />}
            </ButtonElement>
        </div>
    );
});

export default save;