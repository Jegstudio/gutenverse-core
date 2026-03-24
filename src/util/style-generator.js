export const getInheritValue = (attributeValue = {}, device, defaultValue) => {

    let inheritValue = attributeValue?.Desktop || defaultValue;
    if (device === 'Tablet') {
        inheritValue = attributeValue?.Tablet || inheritValue;
    } else if (device === 'Mobile') {
        inheritValue = attributeValue?.Mobile ? attributeValue.Mobile : attributeValue?.Tablet || inheritValue;
    }

    return inheritValue;

}