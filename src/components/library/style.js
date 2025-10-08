export const customStyles = {
    input: () => {
        return {
            padding: 0,
            margin: 0,
            borderColor: '#F0F0F3'
        };
    },
    placeholder: () => {
        return {
            color: 'rgba(153, 162, 169, 1)',
            borderColor: '#F0F0F3'
        };
    },
    control: (provided) => {
        return {
            ...provided,
            borderColor: '#F0F0F3'
        };
    },
    indicatorSeparator: () => {
        return {
            backgroundColor: 'transparent',
        };
    },
    indicatorsContainer: () => {
        return {
            fill: '#8181A5',
        };
    },
    singleValue: () => {
        return {
            fontSize: '12px',
            color: '#8181A5'
        };
    },
};