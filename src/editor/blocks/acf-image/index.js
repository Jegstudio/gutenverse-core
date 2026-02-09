
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { IconAnimatedTextSVG } from '../../../assets/icon';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: IconAnimatedTextSVG,
	edit,
	save,
};
