
import { addFilter } from '@wordpress/hooks';
import { ContentV160 } from './version/v1-6-0';
import { ContentV170 } from './version/v1-7-0';
import { ContentV180 } from './version/v1-8-0';
import { HeaderV200, ContentV200 } from './version/v2-0-0';
import { HeaderV300, ContentV300 } from './version/v3-0-0';

export const loadUpgradeNotice = () => {
    addFilter(
        'gutenverse.dashboard.notice.header',
        'gutenverse/dashboard/notice/header',
        (header, plugin, version) => {
            if (plugin === 'gutenverse') {
                switch (version) {
                    case '2.0.0':
                        header = <HeaderV200 />;
                        break;
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
                    case '1.6.0':
                        content = <ContentV160 />;
                        break;
                    case '1.7.0':
                        content = <ContentV170 />;
                        break;
                    case '1.8.0':
                        content = <ContentV180 />;
                        break;
                    case '2.0.0':
                        content = <ContentV200 />;
                        break;
                    case '3.0.0':
                        content = <ContentV300 />;
                        break;
                }
            }

            return content;
        }
    );
};