import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { useRef, useEffect } from '@wordpress/element';
import { PanelController } from 'gutenverse-core-editor/controls';
import { panelList } from './panels/panel-list';
import ServerSideRender from '@wordpress/server-side-render';
import { __ } from '@wordpress/i18n';
import { SelectParent } from 'gutenverse-core-editor/components';

const SingleSocialShare = (props) => {
    const {
        attributes,
        serverPath,
        setElementRef
    } = props;

    const {
        elementId,
        showText,
        text,
    } = attributes;

    const socialShareItemRef = useRef();

    const blockProps = useBlockProps({
        className: classnames(
            'guten-social-share-item-wrapper',
        ),
        ref: socialShareItemRef
    });

    useEffect(() => {
        if (socialShareItemRef.current) {
            setElementRef(socialShareItemRef.current);
        }
    }, [socialShareItemRef]);

    return <>
        <InspectorControls>
            <SelectParent {...props}>
                {__('Modify Share Group', 'gutenverse')}
            </SelectParent>
        </InspectorControls>
        <PanelController panelList={panelList} {...props} />
        <div {...blockProps}>
            <ServerSideRender
                block={serverPath}
                attributes={{
                    elementId,
                    showText,
                    text
                }}
                EmptyResponsePlaceholder={EmptySocialShare}
            />
        </div>
    </>;
};

const EmptySocialShare = () => {
    return <div className="gutenverse-share gutenverse-share-item">
        <a href="#">
            <div className="gutenverse-share-icon">
                <i className="fas fa-share-alt-square"></i>
            </div><div className="gutenverse-share-text">{__('Loading Share Button...', 'gutenverse')}</div>
        </a>
    </div>;
};

export default SingleSocialShare;