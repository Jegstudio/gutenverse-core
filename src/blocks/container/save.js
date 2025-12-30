import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import classnames from 'classnames';
import { useAnimationFrontend } from 'gutenverse-core/hooks';

const save = ({ attributes }) => {
    const {
        elementId,
    } = attributes;

    const animationClass = useAnimationFrontend(attributes);

    const className = classnames(
        'guten-element',
        'guten-container',
        elementId,
        animationClass,
    );

    return (
        <div {...useBlockProps.save({ className })}>
            <div className="guten-background-overlay" />
            <div className="guten-container-inner">
                <InnerBlocks.Content />
            </div>
        </div>
    );
};

export default save;
