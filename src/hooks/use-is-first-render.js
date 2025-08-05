import { useEffect, useRef } from '@wordpress/element';

export default function useIsFirstRender() {
    const isFirst = useRef(true);
    useEffect(() => {
        isFirst.current = false;
    }, []);
    return isFirst.current;
}