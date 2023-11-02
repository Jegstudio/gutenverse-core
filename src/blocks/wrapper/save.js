
import classnames from 'classnames';
import { useBlockProps } from '@wordpress/block-editor';
import { InnerBlocks } from '@wordpress/block-editor';
import { useAnimationFrontend } from 'gutenverse-core/hooks';

const save = ({ attributes }) => {
    const {
        elementId,
        displayType
    } = attributes;

    const animationClass = useAnimationFrontend(attributes);

    const blockProps = useBlockProps.save({
        className: classnames(
            'guten-element',
            'guten-wrap-helper',
            'no-margin',
            elementId,
            animationClass,
            displayType
        ),
    });

    return (
        <div {...blockProps}>
            <InnerBlocks.Content />
        </div>
    );
};

export default save;