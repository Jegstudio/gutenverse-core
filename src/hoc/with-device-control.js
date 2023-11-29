
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const withDeviceControl = (BlockControl) => {
    return (props) => {
        const { allowDeviceControl = false, value = {} } = props;
        const deviceType = getDeviceType();

        const panelProps = allowDeviceControl ? {
            ...props,
            onValueChange: (data) => {
                const newData = data ? {
                    ...value,
                    [deviceType]: data
                } : {};

                props.onValueChange(newData);
            },
            onStyleChange: (data) => {
                const newData = data ? {
                    ...value,
                    [deviceType]: data
                } : {};

                props.onStyleChange(newData);
            },
            value: value[deviceType],
        } : props;

        return <BlockControl
            {...panelProps}
        />;
    };
};