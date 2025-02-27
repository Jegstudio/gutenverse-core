import { compose } from '@wordpress/compose';
import { withMouseMoveEffect } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useRef } from '@wordpress/element';
import { getImageSrc } from 'gutenverse-core/editor-helper';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { withAnimationAdvance } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';

const FeatureListBlock = compose(
    // withPartialRender,
    // withCustomStyle(panelList),
    // withAnimationAdvance('feature-list'),
    withCopyElementToolbar(),
    // withMouseMoveEffect
)((props) => {
    const {
        attributes,
        clientId
    } = props;

    const {
        elementId,
        iconPosition,
        featureList,
        showConnector
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const elementRef = useRef(null);
    const deviceType = getDeviceType();

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-feature-list',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    const iconContent = (item) => {
        switch (item.type) {
            case 'icon':
                return <div className="icon-wrapper">
                    <div className="icon">
                        <i className={item.icon}></i>
                    </div>
                </div>;
            case 'image':
                return <div className="icon-wrapper">
                    <div className="icon">
                        <img src={getImageSrc(item.image)} alt={item.title} loading={item.lazyLoad} />
                    </div>
                </div>;
            default:
                return null;
        }
    };

    return <>
        <BlockPanelController panelList={panelList} props={props} deviceType={deviceType}  elementRef={elementRef}/>
        <div  {...blockProps}>
            <div className="feature-list-wrapper">
                {
                    featureList.map((el, index) => {
                        return <div key={index} className={`icon-position-${iconPosition} feature-list-item`}>
                            {showConnector && <span className={`connector icon-position-${iconPosition}`}></span>}
                            {iconContent(el)}
                            <div className="feature-list-content">
                                {el.link ? <a href={el.link} target="_blank" rel="noreferrer" aria-label={el.title}><h2 className="feature-list-title">{el.title}</h2></a> : <h2 className="feature-list-title">{el.title}</h2>}
                                <p className="feature-list-desc">{el.content}</p>
                            </div>
                        </div>;
                    })
                }
            </div>
        </div>
    </>;
});

export default FeatureListBlock;