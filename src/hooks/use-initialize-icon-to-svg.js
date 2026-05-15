import { useEffect, useRef } from '@wordpress/element';

/**
 * Turn configured icon type attributes to SVG for newly inserted blocks.
 *
 * @param {Object} data
 * @param {string} data.elementId
 * @param {Object} data.attributes
 * @param {Function} data.setAttributes
 * @param {Array} data.icons
 */
export default function useInitializeIconToSvg({ elementId, attributes, setAttributes, icons = [] }) {
    const shouldInitialize = useRef(!elementId);

    useEffect(() => {
        if (!shouldInitialize.current) {
            return;
        }

        shouldInitialize.current = false;

        const updatedAttributes = icons.reduce((result, icon) => {
            if (attributes[icon.svg] && attributes[icon.type] !== 'svg') {
                result[icon.type] = 'svg';
            }

            return result;
        }, {});

        if (Object.keys(updatedAttributes).length) {
            setAttributes(updatedAttributes);
        }
    }, []);
}
