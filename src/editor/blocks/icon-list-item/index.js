
import edit from './edit';
import save from './save';
import metadata from './block.json';
import saveV1 from './deprecated/v1/save';
import { IconListItemSVG } from '../../../assets/icon/index';

const { name, attributes, supports } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconListItemSVG />,
    edit,
    save,
    deprecated : [
        {
            attributes : attributes,
            supports,
            save : saveV1
        }
    ]
};
