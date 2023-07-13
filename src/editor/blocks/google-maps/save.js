import { compose } from '@wordpress/compose';

import classnames from 'classnames';
import { useBlockProps } from '@wordpress/block-editor';
import { encodeDataToURL } from 'gutenverse-core/helper';
import { withAnimationAdvanceScript } from 'gutenverse-core-editor/hoc';
import { useAnimationFrontend } from 'gutenverse-core-editor/hooks';
import { useDisplayFrontend } from 'gutenverse-core-editor/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core-editor/hooks';

const save = compose(
    withAnimationAdvanceScript('google-maps'),
)((props) => {
    const {
        attributes
    } = props;

    const {
        elementId,
        location,
        zoom
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'gutenverse-maps',
        elementId,
        animationClass,
        displayClass
    );

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

    return (
        <div {...useBlockProps.save({ className, ...advanceAnimationData })}>
            <iframe {...iframeParam}/>
        </div>
    );
});

export default save;