

const HeadingControl = ({
    label,
    first = false,
}) => {
    return <h3 className={`gutenverse-control-wrapper gutenverse-control-heading-splitter ${first ? 'first': ''}`}>
        {label}
    </h3>;
};

export default HeadingControl;