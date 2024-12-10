import { compose } from '@wordpress/compose';
import { useState } from '@wordpress/element';
import { withCustomStyle, withMouseMoveEffect, withPartialRender } from 'gutenverse-core/hoc';
import { BlockControls, useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';
import { RichTextComponent, classnames } from 'gutenverse-core/components';
import { __ } from '@wordpress/i18n';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { createPortal } from 'react-dom';
import { IconLibrary } from 'gutenverse-core/controls';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { displayShortcut } from '@wordpress/keycodes';
import { gutenverseRoot } from 'gutenverse-core/helper';
import { LogoCircleColor24SVG } from 'gutenverse-core/icons';
import { useRef } from '@wordpress/element';
import { useEffect } from '@wordpress/element';
import { HighLightToolbar, URLToolbar, FilterDynamic } from 'gutenverse-core/toolbars';
import { useCallback } from '@wordpress/element';
import { getImageSrc } from 'gutenverse-core/editor-helper';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { withAnimationAdvance } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { applyFilters } from '@wordpress/hooks';
import isEmpty from 'lodash/isEmpty';
import { getDeviceType } from 'gutenverse-core/editor-helper';

const FeatureListBlock = compose(
    withPartialRender,
    withCustomStyle(panelList),
    withAnimationAdvance('feature-list'),
    withCopyElementToolbar(),
    withMouseMoveEffect
)((props) => {

    const {
        attributes,
    } = props;

    const {
        elementId,
        iconPosition,
    } = attributes;
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const featureListRef = useRef();
    const deviceType = getDeviceType();

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-feature-list',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
            `icon-position-${iconPosition}`,
        ),
        ref: featureListRef
    });

    return <>
        <PanelController panelList={panelList} {...props} deviceType={deviceType} />
        <div  {...blockProps}>
        </div>
    </>;
});

export default FeatureListBlock;