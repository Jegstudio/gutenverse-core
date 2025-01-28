import { MaskControl } from 'gutenverse-core/controls';

export const maskPanel = () => {
    return [
        {
            id: 'mask',
            allowDeviceControl: true,
            component: MaskControl,
        },
    ];
};