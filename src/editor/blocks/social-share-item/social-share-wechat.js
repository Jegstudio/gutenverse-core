import { __ } from '@wordpress/i18n';
import { panelList } from './panels/panel-list';
import { compose } from '@wordpress/compose';
import { withCustomStyle } from 'gutenverse-core-editor/hoc';
import SingleSocialShare from './single-social-share';
import jsondata from './block.json';
import { withCopyElementToolbar } from 'gutenverse-core-editor/hoc';
import { IconShareWechatSVG } from '../../../assets/icon/index';

const SocialShareWechat = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)(props => {
    const socialProps = {
        ...props,
        serverPath: 'gutenverse/social-share-wechat',
    };

    return <SingleSocialShare
        {...socialProps}
    />;
});

const name = 'gutenverse/social-share-wechat';

const metadata = {
    ...jsondata,
    title: __('Gutenverse Social Share Wechat', 'gutenverse'),
    description: __('Gutenverse Social Share Wechat', 'gutenverse'),
    attributes: {
        ...jsondata.attributes,
        text: {
            type: 'string',
            default: __('Share on Wechat', 'gutenverse')
        },
    },
    keywords: [
        ...jsondata.keywords,
        __('wechat', 'gutenverse'),
    ],
};

export { metadata, name };

export const settings = {
    icon: <IconShareWechatSVG />,
    edit: SocialShareWechat,
};
