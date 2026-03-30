
import edit from './edit';
import save from './save';
import saveV1 from './deprecated/v1/save';
import saveV2 from './deprecated/v2/save';
import saveV3 from './deprecated/v3/save';
import saveV4 from './deprecated/v4/save';
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
            save: saveV4
        },
        {
            attributes,
            save: saveV3
        },
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
