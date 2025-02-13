import { useSelect } from '@wordpress/data';
import { determineLocation, theDeviceType } from 'gutenverse-core/helper';

export const withDeviceControl = (BlockControl) => {
    return (props) => {
        const { allowDeviceControl = false, value = {} } = props;
        const {
            deviceType,
        } = useSelect(
            () => {
                const location = determineLocation();
                return {
                    deviceType: theDeviceType(location)
                };
            },
            []
        );

        const panelProps = allowDeviceControl? {
            ...props,
            onValueChange: (data) => {
                const newData = data !== undefined? {
                    ...value,
                    [deviceType]: data
                } : {};

                props.onValueChange(newData);
            },
            onLocalChange: (data) => {
                const newData = data !== undefined? {
                    ...value,
                    [deviceType]: data
                } : {};

                props.onLocalChange(newData);
            },
            value: value[deviceType],
        } : props;

        return <BlockControl
            {...panelProps}
        />;
    };
};