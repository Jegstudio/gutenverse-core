import { __ } from '@wordpress/i18n';
import { panelList } from './panels/panel-list';
import { compose } from '@wordpress/compose';
import { withCustomStyle } from 'gutenverse-core-editor/hoc';
import SingleSocialShare from './single-social-share';
import jsondata from './block.json';
import { IconShareWhatsappSVG } from 'gutenverse-core-editor/icons';
import { withCopyElementToolbar } from 'gutenverse-core-editor/hoc';

const SocialShareWhatsapp = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)(props => {
    const socialProps = {
        ...props,
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
