
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { IconPortfolioGallerySVG } from '../../../assets/icon/index';
// import example from './data/example';

const { name, attributes } = metadata;

export { metadata, name };
export const settings = {
    icon: <IconPortfolioGallerySVG />,
    // example: example,
    edit,
    save,
};
