export const handleAlign = (value) => {
    switch (value) {
        case 'flex-start':
            return 'left';
        case 'flex-end':
            return 'right';
        case 'center':
            return 'center';
        case 'space-between':
            return 'justify';
        default:
            return value;
    }
};

export const handleAlignV = value => {
    switch (value) {
        case 'flex-start':
            return 'top';
        case 'center':
            return 'middle';
        case 'flex-end':
            return 'bottom';
        default:
            return value;
    }
};