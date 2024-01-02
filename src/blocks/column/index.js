
import edit from './edit';
import save from './save';
import saveV1 from './deprecated/v1/save';
import saveV2 from './deprecated/v2/save';
import saveV3 from './deprecated/v3/save';
import attrV2 from './deprecated/v2/attribute.json';
import metadata from './block.json';
import { IconColumnSVG } from 'gutenverse-core/icons';

const { name, attributes } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconColumnSVG />,
    usesContext: ['gutenverse/sectionVerticalAlign'],
    edit,
    save,
    deprecated: [
        {
            attributes,
            save: saveV3
        },
        {
            attributes: {
                ...attributes,
                ...attrV2
            },
            save: saveV2
        },
        {
            attributes,
            save: saveV1
        }
    ]
};
