export const paginationSwitcher = (paginationMode) => {
    switch (paginationMode) {
        case 'prevnext':
            return [
                { value: 'normal', label: 'Normal' },
                { value: 'hover', label: 'Hover' },
                { value: 'disabled', label: 'Disabled' }
            ];
        case 'number':
            return [
                { value: 'normal', label: 'Normal' },
                { value: 'hover', label: 'Hover' },
                { value: 'current', label: 'Active' }
            ];
        default:
            return [
                { value: 'normal', label: 'Normal' },
                { value: 'hover', label: 'Hover' }
            ];
    }
};