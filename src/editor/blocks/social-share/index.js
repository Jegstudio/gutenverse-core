
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { IconShareSVG } from '../../../assets/icon/index';

const { name } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconShareSVG />,
    edit,
    save,
};
