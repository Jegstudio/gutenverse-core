import { __ } from '@wordpress/i18n';
import { panelList } from './panels/panel-list';
import { compose } from '@wordpress/compose';
import { withCustomStyle, withPartialRender } from 'gutenverse-core/hoc';
import SingleSocialShare from './single-social-share';
import jsondata from './block.json';
import { IconShareLineSVG } from '../../../assets/icon/index';

const SocialShareLine = compose(
    withPartialRender,
    withCustomStyle(panelList),
)(props => {
    const socialProps = {
        ...props,
        shareType: 'line',
        serverPath: 'gutenverse/social-share-line',
    };

    return <SingleSocialShare
        {...socialProps}
    />;
});

const name = 'gutenverse/social-share-line';

const metadata = {
    ...jsondata,
    title: __('Gutenverse Social Share Line', 'gutenverse'),
    description: __('Gutenverse Social Share Line', 'gutenverse'),
    attributes: {
        ...jsondata.attributes,
        text: {
            type: 'string',
            default: __('Share on Line', 'gutenverse')
        },
    },
    keywords: [
        ...jsondata.keywords,
        __('Line', 'gutenverse'),
    ],
};

export { metadata, name };

export const settings = {
    icon: <IconShareLineSVG />,
    edit: SocialShareLine,
};
