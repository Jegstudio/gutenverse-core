
import { getDevice } from 'gutenverse-core/helper';

export const withDeviceControl = (BlockControl) => {
    return (props) => {
        const { allowDeviceControl = false, value = {} } = props;
        const deviceType = getDevice();

        const panelProps = allowDeviceControl ? {
            ...props,
            onValueChange: (data) => {
                const newData = {
                    ...value,
                    [deviceType]: data
                };

                props.onValueChange(newData);
            },
            onStyleChange: (data) => {
                const newData = {
                    ...value,
                    [deviceType]: data
                };

                props.onStyleChange(newData);
            },
            value: value[deviceType],
        } : props;

        return <BlockControl
            {...panelProps}
        />;
    };
};