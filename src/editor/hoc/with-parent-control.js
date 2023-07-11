export const withParentControl = (BlockControl) => {
    return (props) => {
        const { default: defaultValue, value } = props;
        let thisValue = value;

        if(value === null || value === undefined && defaultValue !== undefined) {
            thisValue = defaultValue;
        }

        const panelProps = {
            ...props,
            value: thisValue
        };

        return <BlockControl
            {...panelProps}
        />;
    };
};