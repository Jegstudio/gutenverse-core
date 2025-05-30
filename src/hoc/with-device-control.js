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

        //usePreviousDeviceValue = true if you need to inherit higher resolutions value.
        const deviceValues = (data) => {
            let newData = newData = {
                ...value,
                [deviceType]: data,
                previousValues: {
                    ...value.previousValues,
                    [deviceType]: 'valueIsSet'
                }
            };

            //check weather the value is set organically or inherit.
            //if value undefined, follow higher resolutions value.
            //if value previously set by inheriting, follow higher resolutions value.
            if (usePreviousDeviceValue && deviceType === 'Desktop' && newData.Desktop !== undefined) {
                if ( newData.Tablet === undefined || newData.previousValues['Tablet'] !== 'valueIsSet' ) {
                    newData = {
                        ...newData,
                        Tablet: data,
                        previousValues: {
                            ...value.previousValues,
                            Tablet: 'inherit'
                        }
                    };
                }
                if ( newData.Mobile === undefined || newData.previousValues['Mobile'] !== 'valueIsSet' ) {
                    newData = {
                        ...newData,
                        Mobile: data,
                        previousValues: {
                            ...value.previousValues,
                            Tablet: 'inherit'
                        }
                    };
                }
            } else if (usePreviousDeviceValue && deviceType === 'Tablet' && newData.Tablet !== undefined) {
                if ( newData.Mobile === undefined || newData.previousValues['Mobile'] !== 'valueIsSet' ) {
                    newData = {
                        ...newData,
                        Mobile: data,
                        previousValues: {
                            ...value.previousValues,
                            Tablet: 'inherit'
                        }
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