/* External dependencies */


/* Gutenverse dependencies */
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { IconArchiveTitleSVG } from '../../../assets/icon/index';

const { name } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconArchiveTitleSVG />,
    edit,
    save,
};
