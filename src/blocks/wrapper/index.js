
import edit from './edit';
import save from './save';
import saveV1 from './deprecated/v1/save';
import saveV2 from './deprecated/v2/save';
import metadata from './block.json';
import { IconFlexibleWrapperSVG } from 'gutenverse-core/icons';

const { name, attributes, support } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconFlexibleWrapperSVG />,
    edit,
    save,
    deprecated:[
        {
            attributes,
            save: saveV1
        },
        {
            attributes,
            support,
            save: saveV2
        }
    ]
};
