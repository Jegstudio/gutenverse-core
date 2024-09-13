
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { IconDualButtonSVG } from '../../../assets/icon/index';
import example from './data/example';

const { name } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconDualButtonSVG />,
    example,
    edit,
    save,
};
