import {__} from '@wordpress/i18n';
import {ToolbarGroup} from '@wordpress/components';
import {stretchFullWidth, stretchWide} from '@wordpress/icons';

export const sectionLayoutControls = {
    fullwidth: {
        icon: stretchFullWidth,
        title: __('Fullwidth Section', 'gutenverse'),
    },
    boxed: {
        icon: stretchWide,
        title: __('Normal Width Section', 'gutenverse'),
    },
};

const DEFAULT_CONTROLS = ['fullwidth', 'boxed'];
const DEFAULT_CONTROL = 'boxed';

const SectionLayoutToolbar = (
    {
        value,
        onChange,
        controls = DEFAULT_CONTROLS,
        isCollapsed = true,
    }
) => {
    function applyOrUnset(layout) {
        return () => onChange(value === layout ? undefined : layout);
    }

    const activeLayout = sectionLayoutControls[value];
    const defaultLayoutControl = sectionLayoutControls[DEFAULT_CONTROL];

    return (
        <ToolbarGroup
            popoverProps={{
                isAlternate: true,
            }}
            isCollapsed={isCollapsed}
            icon={
                activeLayout
                    ? activeLayout.icon
                    : defaultLayoutControl.icon
            }
            label={__('Change section width', 'gutenverse')}
            controls={controls.map((control) => {
                return {
                    ...sectionLayoutControls[control],
                    isActive: value === control,
                    role: isCollapsed ? 'menuitemradio' : undefined,
                    onClick: applyOrUnset(control),
                };
            })}
        />
    );
};

export default SectionLayoutToolbar;