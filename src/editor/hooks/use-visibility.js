import {createRef, useEffect, useState} from '@wordpress/element';
import throttle from 'lodash.throttle';

/**
 * Check if an element is in viewport

 * @param {number} offset - Number of pixels up to the observable element from the top
 * @param {number} throttleMilliseconds - Throttle observable listener, in ms
 */
export default function useVisibility (offset = 0, throttleMilliseconds = 100) {
    const [isVisible, setIsVisible] = useState(false);
    const currentElement = createRef();

    const onScroll = throttle(() => {
        if (!currentElement.current) {
            setIsVisible(false);
            return;
        }

        const top = currentElement.current.getBoundingClientRect().top;
        setIsVisible(top + offset >= 0 && top - offset <= window.innerHeight);
    }, throttleMilliseconds);

    useEffect(() => {
        document.addEventListener('scroll', onScroll, true);
        return () => document.removeEventListener('scroll', onScroll, true);
    });

    return [isVisible, currentElement];
}