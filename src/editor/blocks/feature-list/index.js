
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { IconFeatureListSVG } from '../../../assets/icon/index';
import saveV1 from './deprecated/v1/save';
import example from './data/example';

const { name, attributes, supports } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconFeatureListSVG />,
    example,
    edit,
    save,
    deprecated: [
        {
            attributes,
            supports,
            save: saveV1
        },
    ]
};
