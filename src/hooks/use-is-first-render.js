import { useEffect, useRef } from '@wordpress/element';

/**
 * Check is first render for component
 *
 * @since 2.1.1
 * @returns {boolean}
 */
export default function useIsFirstRender() {
    const isFirst = useRef(true);
    useEffect(() => {
        isFirst.current = false;
    }, []);
    return isFirst.current;
}