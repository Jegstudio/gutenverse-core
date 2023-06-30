
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { IconClientLogoSVG } from '../../../assets/icon/index';
import example from './data/example';

const { name } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconClientLogoSVG />,
    example: example,
    edit,
    save,
};
