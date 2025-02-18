import { compose } from '@wordpress/compose';

import { withMouseMoveEffect } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { encodeDataToURL } from 'gutenverse-core/helper';
import { useRef } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { withAnimationAdvance } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-styles';

const GoogleMapsBlock = compose(
    withAnimationAdvance('google-maps'),
    withCopyElementToolbar(),
    withMouseMoveEffect
)((props) => {
    const {
        attributes,
        isSelected,
        clientId
    } = props;

    const {
        elementId,
        location,
        zoom,
    } = attributes;

    const elementRef = useRef();
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'gutenverse-maps',
            'no-margin',
            !isSelected && ['select-handler'],
            elementId,
            displayClass,
            animationClass,
        ),
        ref: elementRef
    });

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    const parameter = {
        q: location,
        z: zoom,
        t: 'm',
        output: 'embed',
        iwloc: 'near',
    };

    const iframeParam = {
        frameBorder: 0,
        scrolling: 'no',
        marginHeight: 0,
        marginWidth: 0,
        src: 'https://maps.google.com/maps?' + encodeDataToURL(parameter),
        title: parameter['q'],
    };

    return <>
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div  {...blockProps}>
            <iframe {...iframeParam} />
        </div>
    </>;
});


export default GoogleMapsBlock;