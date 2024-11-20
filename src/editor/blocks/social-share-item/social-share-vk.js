import { __ } from '@wordpress/i18n';
import { panelList } from './panels/panel-list';
import { compose } from '@wordpress/compose';
import { withCustomStyle, withPartialRender } from 'gutenverse-core/hoc';
import SingleSocialShare from './single-social-share';
import jsondata from './block.json';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { IconShareVkSVG } from '../../../assets/icon/index';

const SocialShareVk = compose(
    withPartialRender,
    withCustomStyle(panelList),
    withCopyElementToolbar()
)(props => {
    const socialProps = {
        ...props,
        shareType: 'vk',
        serverPath: 'gutenverse/social-share-vk',
    };

    return <SingleSocialShare
        {...socialProps}
    />;
});

const name = 'gutenverse/social-share-vk';

const metadata = {
    ...jsondata,
    title: __('Gutenverse Social Share Vk', 'gutenverse'),
    description: __('Gutenverse Social Share Vk', 'gutenverse'),
    attributes: {
        ...jsondata.attributes,
        text: {
            type: 'string',
            default: __('Share on Vk', 'gutenverse')
        },
    },
    keywords: [
        ...jsondata.keywords,
        __('vk', 'gutenverse'),
    ],
};

export { metadata, name };

export const settings = {
    icon: <IconShareVkSVG />,
    edit: SocialShareVk,
};
