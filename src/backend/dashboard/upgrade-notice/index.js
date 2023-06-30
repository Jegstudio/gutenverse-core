
import { addFilter } from '@wordpress/hooks';
import V160 from './version/v1-6-0';
import V170 from './version/v1-7-0';
import V180 from './version/v1-8-0';

export const loadUpgradeNotice = () => {
    addFilter(
        'gutenverse.dashboard.notice.content',
        'gutenverse/dashboard/notice/content',
        (content, plugin, version) => {
            if (plugin === 'gutenverse') {
                switch (version) {
                    case '1.6.0':
                        content = <V160 />;
                        break;
                    case '1.7.0':
                        content = <V170 />;
                        break;
                    case '1.8.0':
                        content = <V180 />;
                        break;
                }
            }

            return content;
        }
    );
};