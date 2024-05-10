
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { IconGallerySVG } from '../../../assets/icon/index';
import example from './data/example';
import saveV1 from './deprecated/v1/save';

const { name, attributes } = metadata;

export { metadata, name };
export const settings = {
    icon: <IconGallerySVG />,
    example: example,
    edit,
    save,
    deprecated: [
        {
            attributes: {
                ...attributes,
                showed: {
                    type: 'int',
                    default: 6,
                    deprecated: true,
                },
                animationDuration: {
                    type: 'int',
                    default: 500,
                    copyStyle: true,
                    deprecated: true,
                },
                itemsPerLoad: {
                    type: 'int',
                    deprecated: true,
                },
            },
            save: saveV1
        }
    ]
};
