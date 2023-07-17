import { __ } from '@wordpress/i18n';
import { panelList } from './panels/panel-list';
import { compose } from '@wordpress/compose';
import { withCustomStyle } from 'gutenverse-core-editor/hoc';
import SingleSocialShare from './single-social-share';
import jsondata from './block.json';
import { withCopyElementToolbar } from 'gutenverse-core-editor/hoc';
import { IconShareFacebookSVG } from '../../../assets/icon/index';

const SocialShareFacebook = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)(props => {
    const socialProps = {
        ...props,
        serverPath: 'gutenverse/social-share-facebook',
    };

    return <>
        <SingleSocialShare {...socialProps} />
    </>;
});

const name = 'gutenverse/social-share-facebook';

const metadata = {
    ...jsondata,
    title: __('Gutenverse Social Share Facebook', 'gutenverse'),
    description: __('Gutenverse Social Share Facebook', 'gutenverse'),
    attributes: {
        ...jsondata.attributes,
        text: {
            type: 'string',
            default: __('Share on Facebook', 'gutenverse')
        },
    },
    keywords: [
        ...jsondata.keywords,
        __('facebook', 'gutenverse'),
    ],
};

export { metadata, name };

export const settings = {
    icon: <IconShareFacebookSVG />,
    edit: SocialShareFacebook,
};
