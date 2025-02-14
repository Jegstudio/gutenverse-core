import { compose } from '@wordpress/compose';

import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { InnerBlocks } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';

const PopupContainer = compose(
    withCopyElementToolbar()
)((props) => {
    const {
        clientId,
        attributes,
    } = props;

    const {
        position,
    } = attributes;

    return <>
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
});

export default PopupContainer;