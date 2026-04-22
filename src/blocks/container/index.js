import edit from './edit';
import save from './save';
import metadata from './block.json';
import { IconContainerSVG } from 'gutenverse-core/icons';
import saveV1 from './deprecated/v1/save';
import saveV2 from './deprecated/v2/save';

const { name, attributes, supports } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconContainerSVG />,
    edit,
    save,
    deprecated: [
        {
            attributes,
            supports: { ...supports, className: true },
            save: saveV2
        },
        {
            attributes,
            supports,
            save: saveV1
        },
    ]
};
