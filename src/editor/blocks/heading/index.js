/* External dependencies */


/* Gutenverse dependencies */
import { IconHeadingSVG } from '../../../assets/icon/index';

/* Local dependencies */
import edit from './edit';
import save from './save';
import metadata from './block.json';
import example from './data/example';

const { name } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconHeadingSVG />,
    example: example,
    edit,
    save,
};
