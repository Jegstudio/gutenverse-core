
import classnames from 'classnames';
import {RichText, useBlockProps} from '@wordpress/block-editor';

const save = ({attributes}) => {
    const {
        elementId,
        textAlign,
        content,
        type,
    } = attributes;

    const TagName = 'h' + type;

    const className = classnames(
        'guten-element',
        elementId, {
            [`text-align-${textAlign}`]: textAlign,
        }
    );

    return (
        <TagName {...useBlockProps.save({className})}>
            <RichText.Content value={content}/>
        </TagName>
    );
};

export default save;