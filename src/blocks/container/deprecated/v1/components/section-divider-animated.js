import classnames from 'classnames';
import { applyFilters } from '@wordpress/hooks';

export const SectionDividerAnimatedTop = ({ attributes }) => {
    return applyFilters(
        'gutenverse.section.divider-animated',
        <></>,
        { ...attributes, location: 'top' }
    );
};

export const SectionDividerAnimatedBottom = ({ attributes }) => {
    return applyFilters(
        'gutenverse.section.divider-animated',
        <></>,
        { ...attributes, location: 'bottom' }
    );
};

export const SectionDividerAnimatedTopSave = ({ attributes }) => {
    const {
        topDividerAnimated
    } = attributes;

    const {
        flip,
        front,
    } = topDividerAnimated;

    const classNames = classnames(
        'guten-shape-divider-animated',
        'guten-shape-divider-animated-top',
        {
            'guten-shape-flip': flip,
            'guten-shape-zindex': front
        }
    );

    return <div className={classNames}></div>;
};

export const SectionDividerAnimatedBottomSave = ({ attributes }) => {
    const {
        bottomDividerAnimated
    } = attributes;

    const {
        flip,
        front,
    } = bottomDividerAnimated;

    const classNames = classnames(
        'guten-shape-divider-animated',
        'guten-shape-divider-animated-bottom',
        {
            'guten-shape-flip': flip,
            'guten-shape-zindex': front
        }
    );

    return <div className={classNames}></div>;
};