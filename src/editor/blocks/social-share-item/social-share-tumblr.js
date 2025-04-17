import { __ } from '@wordpress/i18n';
import { panelList } from './panels/panel-list';
import { compose } from '@wordpress/compose';
import { withCustomStyle, withPartialRender } from 'gutenverse-core/hoc';
import SingleSocialShare from './single-social-share';
import jsondata from './block.json';
import { IconShareTumblrSVG } from '../../../assets/icon/index';

const SocialShareTumblr = compose(
    withPartialRender,
    withCustomStyle(panelList),
)(props => {
    const socialProps = {
        ...props,
        shareType: 'tumblr',
        serverPath: 'gutenverse/social-share-tumblr',
    };

    return <SingleSocialShare
        {...socialProps}
    />;
});

const name = 'gutenverse/social-share-tumblr';

const metadata = {
    ...jsondata,
    title: __('Gutenverse Social Share Tumblr', 'gutenverse'),
    description: __('Gutenverse Social Share Tumblr', 'gutenverse'),
    attributes: {
        ...jsondata.attributes,
        text: {
            type: 'string',
            default: __('Share on Tumblr', 'gutenverse')
        },
    },
    keywords: [
        ...jsondata.keywords,
        __('tumblr', 'gutenverse'),
    ],
};

export { metadata, name };

export const settings = {
    icon: <IconShareTumblrSVG />,
    edit: SocialShareTumblr,
};
