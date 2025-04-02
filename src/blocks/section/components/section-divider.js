
import classnames from 'classnames';
import { shapeDividerLoader } from 'gutenverse-core/styling';

export const SectionDividerTop = ({attributes}) => {
    const {
        topDivider,
        elementId
    } = attributes;

    const {
        type,
        flip,
        front,
        invert,
        colorMode,
        gradientColor,
        gradientAngle,
        gradientColor2,
        gradientAngle2,
        gradientColor3,
        gradientAngle3,
    } = topDivider;

    let divider = '';

    const classNames = classnames(
        'guten-shape-divider',
        'guten-shape-divider-top',
        {
            'guten-shape-flip': flip,
            'guten-shape-zindex': front,
        }
    );

    if (type && type !== 'none') {
        divider = shapeDividerLoader({
            id: `divider-top-${elementId}`,
            type,
            invert,
            gradient: colorMode === 'gradient',
            gradientColor,
            gradientAngle,
            gradientColor2,
            gradientAngle2,
            gradientColor3,
            gradientAngle3,
        });
    }

    return <div className={classNames}>{divider}</div>;
};

export const SectionDividerBottom = ({attributes}) => {
    const {
        bottomDivider,
        elementId
    } = attributes;

    const {
        type,
        flip,
        front,
        invert,
        colorMode,
        gradientColor,
        gradientAngle,
        gradientColor2,
        gradientAngle2,
        gradientColor3,
        gradientAngle3,
    } = bottomDivider;

    let divider = '';

    const classNames = classnames(
        'guten-shape-divider',
        'guten-shape-divider-bottom',
        {
            'guten-shape-flip': flip,
            'guten-shape-zindex': front
        }
    );

    if (type && type !== 'none') {
        divider = shapeDividerLoader({
            id: `divider-bottom-${elementId}`,
            type,
            invert,
            gradient: colorMode === 'gradient',
            gradientColor,
            gradientAngle,
            gradientColor2,
            gradientAngle2,
            gradientColor3,
            gradientAngle3,
        });
    }

    return <div className={classNames}>{divider}</div>;
};