
import edit from './edit';
import save from './save';
import metadata from './block.json';
import example from './data/example';
import saveV1 from './deprecated/v1/save';
import saveV2 from './deprecated/v2/save';
import { IconTestimonialSVG } from '../../../assets/icon/index';

const { name, attributes } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconTestimonialSVG />,
    example,
    edit,
    save,
    deprecated : [
        {
            attributes,
            save: saveV1
        },
        {
            attributes,
            save: saveV2
        },
    ]
};
