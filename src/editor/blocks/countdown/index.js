
import edit from './edit';
import save from './save';
import saveV1 from './deprecated/v1/save';
import metadata from './block.json';
import { IconCountdownSVG } from '../../../assets/icon/index';
import example from './data/example';

const { name, attributes, support } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconCountdownSVG />,
    example,
    edit,
    save,
    deprecated: [
        {
            attributes,
            support,
            save: saveV1,
        }
    ]
};
