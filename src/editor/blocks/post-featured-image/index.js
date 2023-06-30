/* External dependencies */

import edit from './edit';

/* Gutenverse dependencies */
import save from './save';
import metadata from './block.json';
import { IconImageSVG } from '../../../assets/icon/index';

const { name } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconImageSVG />,
    edit,
    save,
};
