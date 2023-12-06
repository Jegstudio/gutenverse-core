
import edit from './edit';
import save from './save';
import saveV1 from './saveDeprecated';
import metadata from './block.json';
import { IconImageBoxSVG } from '../../../assets/icon/index';
import example from './data/example';

const { name, attributes } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconImageBoxSVG />,
    example: example,
    edit,
    save,
    deprecated: [
        {
            attributes,
            save: saveV1
        }
    ]
};
