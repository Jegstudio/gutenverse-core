
import { __ } from '@wordpress/i18n';
import { cog, styles } from '@wordpress/icons';
import { Icon } from '@wordpress/components';

export const TabSetting = {
    id: 'setting',
    name: __('Settings', 'gutenverse'),
    icon: <Icon icon={cog} width={24} height={24} />,
};

export const TabStyle = {
    id: 'style',
    name: __('Style', 'gutenverse'),
    icon: <Icon icon={styles} width={24} height={24} />,
};

export const TabAdvance = {
    id: 'advance',
    name: __('Advance', 'gutenverse'),
    icon: <Icon icon={cog} width={24} height={24} />,
};

export const PanelSequence = [TabSetting, TabStyle, TabAdvance];
