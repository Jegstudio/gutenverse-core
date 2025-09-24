
import { addFilter } from '@wordpress/hooks';
import { HeaderV300, ContentV300 } from './version/v3-0-0';

export const loadUpgradeNotice = () => {
    addFilter(
        'gutenverse.dashboard.notice.header',
        'gutenverse/dashboard/notice/header',
        (header, plugin, version) => {
            if (plugin === 'gutenverse') {
                switch (version) {
                    case '3.0.0':
                        header = <HeaderV300 />;
                        break;
                }
            }

            return header;
        }
    );

    addFilter(
        'gutenverse.dashboard.notice.content',
        'gutenverse/dashboard/notice/content',
        (content, plugin, version) => {
            if (plugin === 'gutenverse') {
                switch (version) {
                    case '3.0.0':
                        content = <ContentV300 />;
                        break;
                }
            }

            return content;
        }
    );
};