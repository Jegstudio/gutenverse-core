
import edit from './edit';
import save from './save';
import metadata from './block.json';
import example from './data/example';
import { IconSectionSVG } from 'gutenverse-core/icons';

const { name } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconSectionSVG />,
    example: example,
    edit,
    save,
};
