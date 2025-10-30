
import { addFilter } from '@wordpress/hooks';
import { HeaderV320, ContentV320 } from './version/v3-2-0';

export const loadUpgradeNotice = () => {
    addFilter(
        'gutenverse.dashboard.notice.header',
        'gutenverse/dashboard/notice/header',
        (header, plugin, version) => {
            if (plugin === 'gutenverse') {
                switch (version) {
                    case '3.2.0':
                        header = <HeaderV320 />;
                        break;
                }
            }

            return header;
        },
        9
    );

    addFilter(
        'gutenverse.dashboard.notice.content',
        'gutenverse/dashboard/notice/content',
        (content, plugin, version) => {
            if (plugin === 'gutenverse') {
                switch (version) {
                    case '3.2.0':
                        content = <ContentV320 />;
                        break;
                }
            }

            return content;
        }
    );
};