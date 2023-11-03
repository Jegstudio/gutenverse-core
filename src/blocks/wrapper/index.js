
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { IconFlexibleWrapperSVG } from 'gutenverse-core/icons';

const { name } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconFlexibleWrapperSVG />,
    edit,
    save,
};
