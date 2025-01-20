

const HeadingControl = ({
    label,
    first = false,
    show = true,
}) => {
    return show && <h3 className={`gutenverse-control-wrapper gutenverse-control-heading-splitter ${first ? 'first': ''}`}>
        {label}
    </h3>;
};

export default HeadingControl;