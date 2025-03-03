
export const plainGeneratorFunction = (value, props) => {
    const {
        functionName,
        attribute
    } = props;
    switch (functionName) {
        case 'postBlockContentAlign':
            if(attribute !== 'end') {
                value = `100%; display: grid; grid-template-rows: 1fr auto; align-self: ${attribute};`;
            }
            break;
        default:
            break;
    }
    return value;
};