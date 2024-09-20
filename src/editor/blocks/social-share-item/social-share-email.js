import { __ } from '@wordpress/i18n';
import { panelList } from './panels/panel-list';
import { compose } from '@wordpress/compose';
import { withCustomStyle } from 'gutenverse-core/hoc';
import SingleSocialShare from './single-social-share';
import { IconShareEmailSVG } from '../../../assets/icon/index';
import jsondata from './block.json';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';

const SocialShareEmail = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)(props => {
    const socialProps = {
        ...props,
        shareType: 'email',
        serverPath: 'gutenverse/social-share-email',
    };

    return <>
        <SingleSocialShare {...socialProps} />
    </>;
});

const name = 'gutenverse/social-share-email';

const metadata = {
    ...jsondata,
    title: __('Gutenverse Social Share Email', 'gutenverse'),
    description: __('Gutenverse Social Share Email', 'gutenverse'),
    attributes: {
        ...jsondata.attributes,
        text: {
            type: 'string',
            default: __('Share on Email', 'gutenverse')
        },
    },
    keywords: [
        ...jsondata.keywords,
        __('Email', 'gutenverse'),
    ],
};

export { metadata, name };

export const settings = {
    icon: <IconShareEmailSVG />,
    edit: SocialShareEmail,
};
