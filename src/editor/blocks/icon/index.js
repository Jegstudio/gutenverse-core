
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { IconSVG } from '../../../assets/icon/index';
import example from './data/example';

const { name } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconSVG />,
    example: example,
    edit,
    save,
};
