import { __ } from '@wordpress/i18n';
import { handleBorder } from 'gutenverse-core/styling';
import { BorderControl } from 'gutenverse-core-editor/controls';

export const avatarPanel = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'avatarBorder',
            label: __('Avatar Border', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId} .comment-author img.avatar`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
    ];
};

