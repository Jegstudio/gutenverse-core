import { __ } from '@wordpress/i18n';
import { panelList } from './panels/panel-list';
import { compose } from '@wordpress/compose';
import { withCustomStyle, withPartialRender } from 'gutenverse-core/hoc';
import SingleSocialShare from './single-social-share';
import jsondata from './block.json';
import { IconShareWhatsappSVG } from '../../../assets/icon/index';

const SocialShareWhatsapp = compose(
    withPartialRender,
    withCustomStyle(panelList),
)(props => {
    const socialProps = {
        ...props,
        shareType: 'whatsapp',
        serverPath: 'gutenverse/social-share-whatsapp',
    };

    return <SingleSocialShare
        {...socialProps}
    />;
});

const name = 'gutenverse/social-share-whatsapp';

const metadata = {
    ...jsondata,
    title: __('Gutenverse Social Share Whatsapp', 'gutenverse'),
    description: __('Gutenverse Social Share Whatsapp', 'gutenverse'),
    attributes: {
        ...jsondata.attributes,
        text: {
            type: 'string',
            default: __('Share on Whatsapp', 'gutenverse')
        },
    },
    keywords: [
        ...jsondata.keywords,
        __('whatsapp', 'gutenverse'),
    ],
};

export { metadata, name };

export const settings = {
    icon: <IconShareWhatsappSVG />,
    edit: SocialShareWhatsapp,
};
