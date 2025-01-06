
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { IconGallerySVG } from '../../../assets/icon/index';
// import example from './data/example';

const { name, attributes } = metadata;

export { metadata, name };
export const settings = {
    icon: <IconGallerySVG />,
    // example: example,
    edit,
    save,
};
