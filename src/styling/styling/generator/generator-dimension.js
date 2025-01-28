import { multiProperty } from './generator-plain';

export const dimensionCSS = (attribute, prefix = '', multi = true, min = 0) => {
    const { dimension, unit } = attribute;
    const positions = ['top', 'right', 'bottom', 'left'];
    const styles = [];
    if (dimension && unit) {
        if (multi) {
            positions.map(position => {
                if (dimension[position]) {
                    if(prefix){
                        styles.push(`${prefix}-${position}: ${dimension[position]}${unit};`);
                    }else{
                        styles.push(`${position}: ${dimension[position]}${unit};`);
                    }
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

export const dimensionGenerator = (attribute, style, css) => {
    const {type, selector, property, responsive = false} = style;
    if ( !responsive ) {
        css.Desktop = dimensionCSS(attribute, property[0]);
    }

    if (responsive) {
        if (attribute['Desktop']) {
            css.Desktop = `${selector} { ` + dimensionCSS(attribute['Desktop'], property[0]) + ' }';
        }
        if (attribute['Tablet']) {
            css.Tablet = `${selector} { ` + dimensionCSS(attribute['Tablet'], property[0]) + ' }';
        }
        if (attribute['Mobile']) {
            css.Mobile = `${selector} { ` + dimensionCSS(attribute['Mobile'], property[0]) + ' }';
        }
    }

    return css;
};