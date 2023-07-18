import { compose } from '@wordpress/compose';

import { withCustomStyle } from 'gutenverse-core/hoc';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { InnerBlocks } from '@wordpress/block-editor';
import classnames from 'classnames';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';

const PopupContainer = compose(
    withCustomStyle(panelList),
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
        <PanelController panelList={panelList} {...props} />
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