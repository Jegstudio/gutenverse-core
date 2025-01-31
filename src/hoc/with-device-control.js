import { getDeviceType } from 'gutenverse-core/editor-helper';

export const withDeviceControl = (BlockControl) => {
    return (props) => {
        const { allowDeviceControl = false, value = {} } = props;
        const deviceType = getDeviceType();

        const panelProps = allowDeviceControl? {
            ...props,
            onValueChange: (data) => {
                const newData = data !== undefined? {
                    ...value,
                    [deviceType]: data
                } : {};

                props.onValueChange(newData);
            },
            value: value[deviceType],
        } : props;

        return <BlockControl
            {...panelProps}
        />;
    };
};