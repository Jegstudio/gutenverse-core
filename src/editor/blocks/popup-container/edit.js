import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { InnerBlocks } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { CopyElementToolbar } from 'gutenverse-core/components';

const PopupContainer = (props) => {
    const {
        clientId,
        attributes,
    } = props;

    const {
        position,
    } = attributes;

    return <>
        <CopyElementToolbar {...props}/>
        <BlockPanelController panelList={panelList} props={props}/>
        <div className={classnames(
            'guten-element',
            'guten-popup-content-inner',
            position
        )}>
            <div className="guten-popup-content-wrapper">
                <InnerBlocks
                    renderAppender={InnerBlocks.DefaultBlockAppender}
                    clientId={clientId}
                />
            </div>
        </div>
    </>;
};

export default PopupContainer;