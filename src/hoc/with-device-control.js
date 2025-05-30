import { useSelect } from '@wordpress/data';
import { determineLocation, theDeviceType } from 'gutenverse-core/helper';

export const withDeviceControl = (BlockControl) => {
    return (props) => {
        const { allowDeviceControl = false, value = {}, usePreviousDeviceValue } = props;
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

        const deviceValues = (data) => {
            let newData = newData = {
                ...value,
                [deviceType]: data
            };
            if (usePreviousDeviceValue && deviceType === 'Desktop' && newData.Desktop !== undefined) {
                if ( newData.Tablet === undefined ) {
                    newData = {
                        ...newData,
                        Tablet: data
                    };
                }
                if ( newData.Mobile === undefined && newData.Tablet === undefined ) {
                    newData = {
                        ...newData,
                        Mobile: data
                    };
                }
            } else if (usePreviousDeviceValue && deviceType === 'Tablet' && newData.Tablet !== undefined) {
                if ( newData.Mobile === undefined ) {
                    newData = {
                        ...newData,
                        Mobile: data
                    };
                }
            }

            return newData;
        };

        const panelProps = allowDeviceControl ? {
            ...props,
            onValueChange: (data) => {
                const newData = data !== undefined ?
                    usePreviousDeviceValue ? deviceValues(data) :
                        {
                            ...value,
                            [deviceType]: data
                        } : {};

                props.onValueChange(newData);
            },
            onLocalChange: (data) => {
                const newData = data !== undefined ?
                    usePreviousDeviceValue ? deviceValues(data) :
                        {
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