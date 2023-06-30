export const handleUnitPoint = ({unit, point}, property, important = false) => unit && point ? `${property}: ${point}${unit}${important ? '!important' : ''};` : '';

export const getUnitPoint = ({unit, point}) => unit && point ? `${point}${unit}` : '';