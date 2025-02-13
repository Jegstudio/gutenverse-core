const BlockController = (props) => {
    const {
        panelProps,
        panelArray,
        elementRef
    } = props;

    return panelArray(panelProps).map((item) => {
        const { id, show, onChange, component: Component, proLabel, forceType } = item;
        const { clientId, setAttributes, setLocalAttr } = panelProps;

        const onValueChange = (value) => {

            switch(forceType) {
                case 'string':
                    value = value.toString();
                    break;
                case 'integer':
                    value = parseInt(value);
                    break;
            }


            const newValue = {
                [id]: value
            };
            if(!proLabel){
                setAttributes(newValue);
            }

            onChange ? onChange({
                ...panelProps,
                ...newValue
            }) : null;
        };

        const onLocalChange = (value) => {
            const newValue = {
                [id]: value
            };

            setLocalAttr && setLocalAttr({
                ...panelProps,
                ...newValue
            });
        };

        return show !== false && <Component
            key={`${id}`}
            {...item}
            clientId={clientId}
            value={panelProps[id]}
            values={panelProps}
            onValueChange={onValueChange}
            onLocalChange={onLocalChange}
            elementRef={elementRef}
            isOpen={true}
        />;
    });
};

export default BlockController;