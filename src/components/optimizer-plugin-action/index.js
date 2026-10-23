import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

export const InstallOptimizerAction = ({ ecosystemUrl, className = "gutenverse-core-optimizer-promo__action gutenverse-core-optimizer-promo__action--install" }) => (
    <a
        className={className}
        href={ecosystemUrl}
        target="_blank"
        rel="noopener noreferrer"
    >
        {__('Install Optimizer', '--gctd--')}
    </a>
);

export const ActivateOptimizerAction = ({ canActivatePlugins, optimizerPlugin, className = "gutenverse-core-optimizer-promo__action gutenverse-core-optimizer-promo__action--activate-optimizer" }) => {
    const [status, setStatus] = useState('idle');
    // wp_localize_script serializes top-level true as the string '1'.
    const canActivate = [true, 1, '1'].includes(canActivatePlugins)
        && false === optimizerPlugin?.active
        && Boolean(optimizerPlugin?.path);
    const isActivating = 'activating' === status;
    const hasFailed = 'failed' === status;

    const activateOptimizer = async () => {
        if (!canActivate || isActivating) {
            return;
        }

        setStatus('activating');

        try {
            await apiFetch({
                path: `wp/v2/plugins/plugin?plugin=${encodeURIComponent(optimizerPlugin.path)}`,
                method: 'POST',
                data: { status: 'active' },
            });

            window.location.reload();
        } catch (error) {
            // The REST response can include permission and server internals.
            // Keep the dashboard message generic and translatable.
            setStatus('failed');
        }
    };

    return <>
        <button
            className={className}
            type="button"
            disabled={!canActivate || isActivating}
            onClick={activateOptimizer}
        >
            {isActivating
                ? __('Activating Optimizer', '--gctd--')
                : __('Activate Optimizer', '--gctd--')}
        </button>
        {hasFailed && <p className="gutenverse-core-optimizer-promo__action-error" role="status">
            {__('Unable to activate Optimizer. Please try again.', '--gctd--')}
        </p>}
    </>;
};

