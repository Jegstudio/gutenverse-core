
import classnames from 'classnames';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';

const save = ({ attributes }) => {
    const {
        elementId,
        icon,
        hideIcon,
        rel,
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

    return (
        <div {...useBlockProps.save({ className })}>
            <a id={elementId} href={url} target={ linkTarget } rel={ rel }>
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