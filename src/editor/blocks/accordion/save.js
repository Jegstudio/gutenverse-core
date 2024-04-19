
import { InnerBlocks, RichText } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { AccordionIcon } from './edit';

export const save = (props) => {
    const {
        attributes,
    } = props;

    const {
        title,
        first,
        iconPosition,
        iconOpen,
        iconClosed,
        titleTag,
        elementId
    } = attributes;

    const accordionStyle = classnames(
        'accordion-item',
        elementId,
        {
            active: first
        }
    );

    return <div className={accordionStyle}>
        <div className={'accordion-heading'}>
            {iconPosition === 'left' && <AccordionIcon iconClosed={iconClosed} iconOpen={iconOpen} />}
            <RichText.Content
                className={'accordion-text'}
                value={title}
                tagName={titleTag}
            />
            {iconPosition === 'right' && <AccordionIcon iconClosed={iconClosed} iconOpen={iconOpen} />}
        </div>
        <div className={'accordion-body'}>
            <div className={'accordion-content'}>
                <InnerBlocks.Content />
            </div>
        </div>
    </div>;
};

export default save;
