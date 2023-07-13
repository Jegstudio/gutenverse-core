
import classnames from 'classnames';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { useAnimationFrontend } from 'gutenverse-core-editor/hooks';
import { useDisplayFrontend } from 'gutenverse-core-editor/hooks';

const save = ({ attributes }) => {
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
        role
    } = attributes;

    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'guten-button-wrapper',
        elementId,
        displayClass
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
        <div {...useBlockProps.save({ className })}>
            <ButtonElement>
                {showIcon && iconPosition === 'before' && <i className={`fa-lg ${icon}`} />}
                <span>
                    <RichText.Content value={content} />
                </span>
                {showIcon && iconPosition === 'after' && <i className={`fa-lg ${icon}`} />}
            </ButtonElement>
        </div>
    );
};

export default save;