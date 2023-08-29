export const handleDimension = (attribute, prefix, multi = true, min = 0) => {
    const { dimension, unit } = attribute;
    const positions = ['top', 'right', 'bottom', 'left'];
    const styles = [];
    if (dimension && unit) {
        if (multi) {
            positions.map(position => {
                if (dimension[position]) {
                    styles.push(`${prefix}-${position}: ${dimension[position]}${unit};`);
                }
            });

            return styles.join(' ');
        } else {
            let totallyEmpty = true;
            positions.map(position => {
                if (dimension[position]) {
                    totallyEmpty = false;
                    styles.push(`${dimension[position]}${unit}`);
                } else {
                    totallyEmpty = totallyEmpty && true;
                    styles.push(`${min}${unit}`);
                }
            });

            const finalStyles = styles.join(' ');

            return !totallyEmpty ? `${prefix}: ${finalStyles};` : '';
        }
    }

    return '';
};

export const getDimension = (attribute, min = 0) => {
    const { dimension, unit } = attribute;
    const positions = ['top', 'right', 'bottom', 'left'];
    const styles = [];

    if (dimension && unit) {
        let totallyEmpty = true;
        positions.map(position => {
            if (dimension[position]) {
                totallyEmpty = false;
                styles.push(`${dimension[position]}${unit}`);
            } else {
                totallyEmpty = totallyEmpty && true;
                styles.push(`${min}${unit}`);
            }
        });

        const finalStyles = styles.join(' ');

        return !totallyEmpty ? `${finalStyles}` : '';
    }

    return '';
};