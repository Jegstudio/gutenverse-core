import { addAction } from '@wordpress/hooks';
import { isFSE } from 'gutenverse-core/helper';
import { render } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

addAction('editor.ErrorBoundary.errorLogged', 'gutenverse/error/handler', () => {
    if (isFSE()) {
        const {
            adminUrl
        } = window['GutenverseConfig'];

        const allTemplatePath = adminUrl + 'site-editor.php?postType=wp_template';

        render(
            <div className="gutenverse-error-wrapper editor-error-boundary">
                <h3>{__('If recovery doesn\'t work, you can try reseting your template. Visit this All template Link to reset Template.', '--gctd--')}</h3>
                <a href={allTemplatePath}>{__('Reset Template', '--gctd--')}</a>
            </div>,
            document.getElementById('gutenverse-error')
        );
    }
});