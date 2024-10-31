import { __ } from '@wordpress/i18n';
import { panelList } from './panels/panel-list';
import { compose } from '@wordpress/compose';
import { withCustomStyle } from 'gutenverse-core/hoc';
import SingleSocialShare from './single-social-share';
import jsondata from './block.json';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { IconShareTelegramSVG } from '../../../assets/icon/index';

const SocialShareTelegram = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)(props => {
    const socialProps = {
        ...props,
        shareType: 'telegram',
        serverPath: 'gutenverse/social-share-telegram',
    };

    return <SingleSocialShare
        {...socialProps}
    />;
});

const name = 'gutenverse/social-share-telegram';

const metadata = {
    ...jsondata,
    title: __('Gutenverse Social Share Telegram', 'gutenverse'),
    description: __('Gutenverse Social Share Telegram', 'gutenverse'),
    attributes: {
        ...jsondata.attributes,
        text: {
            type: 'string',
            default: __('Share on Telegram', 'gutenverse')
        },
    },
    keywords: [
        ...jsondata.keywords,
        __('telegram', 'gutenverse'),
    ],
};

export { metadata, name };

export const settings = {
    icon: <IconShareTelegramSVG />,
    edit: SocialShareTelegram,
};

