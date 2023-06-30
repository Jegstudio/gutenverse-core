
import edit from './edit';
import save from './save';
import metadata from './block.json';
import example from './data/example';
import { IconAnimatedTextSVG } from '../../../assets/icon/index';

const { name } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconAnimatedTextSVG />,
    example: example,
    edit,
    save,
};
