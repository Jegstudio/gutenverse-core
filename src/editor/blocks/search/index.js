
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { IconSearchSVG } from 'gutenverse-core/icons';

const { name } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconSeaSVG />,
    edit,
    save,
};
