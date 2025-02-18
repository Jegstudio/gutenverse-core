
import { classnames } from 'gutenverse-core/components';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { applyFilters } from '@wordpress/hooks';

const save = ({ attributes }) => {
    const {
        elementId,
        icon,
        hideIcon,
        rel,
        ariaLabel,
        url,
        linkTarget,
        text,
    } = attributes;

    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'guten-icon-list-item',
        elementId,
        animationClass,
        displayClass,
    );

    const href = applyFilters(
        'gutenverse.dynamic.generate-url',
        url,
        'dynamicUrl',
        attributes,
        elementId
    );
    console.log(className, elementId, href, linkTarget, rel, ariaLabel, hideIcon, icon, text)
    return (
        <div {...useBlockProps.save({ className })}>
            <a id={elementId} href={href} target={ linkTarget } rel={ rel } aria-label={ariaLabel}>
                {!hideIcon && <i className={icon} />}
                <RichText.Content
                    className={`list-text ${hideIcon ? 'no-icon' : ''}`}
                    value={text}
                    tagName="span"
                />
            </a>
        </div>
    );
};

export default save;