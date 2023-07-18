import { compose } from '@wordpress/compose';

import { withCustomStyle } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { encodeDataToURL } from 'gutenverse-core/helper';
import { useRef } from '@wordpress/element';
import { useEffect } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { withAnimationAdvance } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';

const GoogleMapsBlock = compose(
    withCustomStyle(panelList),
    withAnimationAdvance('google-maps'),
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
        setElementRef,
        setAdanimRef,
        isSelected
    } = props;

    const {
        elementId,
        location,
        zoom
    } = attributes;

    const googleMapRef = useRef();
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
            animationClass
        ),
        ref: googleMapRef
    });

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

    useEffect(() => {
        if (googleMapRef.current) {
            setElementRef(googleMapRef.current);
            setAdanimRef && setAdanimRef(googleMapRef.current);
        }
    }, [googleMapRef]);

    return <>
        <PanelController panelList={panelList} {...props} />
        <div  {...blockProps}>
            <iframe {...iframeParam} />
        </div>
    </>;
});


export default GoogleMapsBlock;