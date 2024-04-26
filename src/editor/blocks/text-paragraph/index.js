
import edit from './edit';
import save from './save';
import metadata from './block.json';
import example from './data/example';
import { IconTextParagraphSVG } from '../../../assets/icon/index';

const { name } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconTextParagraphSVG />,
    example,
    edit,
    save,
};
