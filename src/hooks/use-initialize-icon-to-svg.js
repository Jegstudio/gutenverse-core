import { useEffect, useRef } from '@wordpress/element';

/**
 * Turn configured icon type attributes to SVG for newly inserted blocks.
 *
 * @param {Object} data
 * @param {string} data.elementId
 * @param {Object} data.attributes
 * @param {Function} data.setAttributes
 * @param {Array} data.icons
 * @param {Array} data.repeaterIcons
 */
export default function useInitializeIconToSvg({ elementId, attributes, setAttributes, icons = [], repeaterIcons = [] }) {
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

        repeaterIcons.forEach((icon) => {
            const repeater = attributes[icon.key];

            if (!Array.isArray(repeater)) {
                return;
            }

            let hasUpdate = false;
            const updatedRepeater = repeater.map((item) => {
                if (item?.[icon.svg] && item?.[icon.type] !== 'svg') {
                    hasUpdate = true;

                    return {
                        ...item,
                        [icon.type]: 'svg',
                    };
                }

                return item;
            });

            if (hasUpdate) {
                updatedAttributes[icon.key] = updatedRepeater;
            }
        });

        if (Object.keys(updatedAttributes).length) {
            setAttributes(updatedAttributes);
        }
    }, []);
}
