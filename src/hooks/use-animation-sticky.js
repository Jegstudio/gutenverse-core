import { applyFilters } from '@wordpress/hooks';

export const useAnimationSticky = (props, elementRef) => {
    applyFilters(
        'gutenverse.hook.sticky-animation',
        null,
        {props, elementRef}
    );
};
