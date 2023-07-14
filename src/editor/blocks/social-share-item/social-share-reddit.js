import { __ } from '@wordpress/i18n';
import { panelList } from './panels/panel-list';
import { compose } from '@wordpress/compose';
import { withCustomStyle } from 'gutenverse-core/hoc';
import SingleSocialShare from './single-social-share';
import jsondata from './block.json';
import { IconShareRedditSVG } from '../../../assets/icon/index';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';

const SocialShareReddit = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)(props => {
    const socialProps = {
        ...props,
        serverPath: 'gutenverse/social-share-reddit',
    };

    return <SingleSocialShare
        {...socialProps}
    />;
});

const name = 'gutenverse/social-share-reddit';

const metadata = {
    ...jsondata,
    title: __('Gutenverse Social Share Reddit', 'gutenverse'),
    description: __('Gutenverse Social Share Reddit', 'gutenverse'),
    attributes: {
        ...jsondata.attributes,
        text: {
            type: 'string',
            default: __('Share on Reddit', 'gutenverse')
        },
    },
    keywords: [
        ...jsondata.keywords,
        __('reddit', 'gutenverse'),
    ],
};

export { metadata, name };

export const settings = {
    icon: <IconShareRedditSVG />,
    edit: SocialShareReddit,
};
