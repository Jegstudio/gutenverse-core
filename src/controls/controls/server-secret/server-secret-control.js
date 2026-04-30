import { __ } from '@wordpress/i18n';
import { Button, TextControl, TextareaControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';

const SECRET_MARKER = '__gutenverse_server_secret__';
const REQUIRED_ASTERISK_STYLE = { color: 'rgba(231, 48, 48, 1)' };

const ServerSecretControl = ({
    item,
    fieldKey,
    service,
    elementId,
    label,
    placeholder,
    required = false,
    textArea = false,
    description = '',
    onUpdateIndexValue,
    onUpdateIndexStyle,
}) => {
    const editorContext = useSelect((select) => {
        const editorStore = select('core/editor');
        const editSiteStore = select('core/edit-site');
        const blockEditorStore = select('core/block-editor');
        const selectedClientId = blockEditorStore?.getSelectedBlockClientId?.();
        const selectedBlock = selectedClientId ? blockEditorStore?.getBlock?.(selectedClientId) : null;

        return {
            postId:
                editorStore?.getCurrentPostId?.() ||
                editSiteStore?.getCurrentTemplateId?.() ||
                window?.wp?.data?.select?.('core/editor')?.getCurrentPostId?.() ||
                0,
            blockElementId:
                elementId ||
                selectedBlock?.attributes?.elementId ||
                '',
        };
    }, [elementId]);

    const postId = editorContext?.postId;
    const resolvedElementId = editorContext?.blockElementId;
    const [draftValue, setDraftValue] = useState('');
    const [isEditing, setIsEditing] = useState(item?.[fieldKey] !== SECRET_MARKER);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const hasSavedSecret = item?.[fieldKey] === SECRET_MARKER;
    const requiredLabel = required ? <>{label} <span style={REQUIRED_ASTERISK_STYLE}>*</span></> : label;

    const updateItem = (nextValue) => {
        onUpdateIndexValue({ ...item, [fieldKey]: nextValue });
        onUpdateIndexStyle({ ...item, [fieldKey]: nextValue });
    };

    const saveSecret = (nextValue = draftValue) => {
        if (!postId || !resolvedElementId || !item?._key) {
            setError(__('This credential needs a saved page and a valid form block context before it can be stored securely.', 'gutenverse-form'));
            return;
        }

        setIsSaving(true);
        setError('');
        setMessage('');

        apiFetch({
            path: 'gutenverse-form-client/v1/integration/block_secret',
            method: 'POST',
            data: {
                postId,
                elementId: resolvedElementId,
                actionKey: item._key,
                fieldKey,
                service,
                value: nextValue,
            },
        }).then((response) => {
            setIsSaving(false);

            if (response?.hasSavedValue) {
                updateItem(response.marker || SECRET_MARKER);
                setIsEditing(false);
                setMessage(__('Credentials saved on the server.', 'gutenverse-form'));
            } else {
                updateItem('');
                setDraftValue('');
                setIsEditing(true);
                setMessage(__('Credentials cleared.', 'gutenverse-form'));
            }
        }).catch((err) => {
            setIsSaving(false);
            setError(err?.message || __('Could not store this credential securely.', 'gutenverse-form'));
        });
    };

    const FieldComponent = textArea ? TextareaControl : TextControl;

    return (
        <div className="gutenverse-server-secret-control">
            {!isEditing && hasSavedSecret ? (
                <>
                    <div className="components-base-control">
                        <div className="components-base-control__field">
                            <label className="components-base-control__label">
                                {requiredLabel}
                            </label>
                            {description && <p className="description">{description}</p>}
                        </div>
                    </div>
                    <div className="panel-save-button-container saved" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setIsEditing(true);
                                setDraftValue('');
                                setMessage('');
                                setError('');
                            }}
                        >
                            {__('Change Credentials', 'gutenverse-form')}
                        </Button>
                        <Button
                            variant="tertiary"
                            isDestructive
                            onClick={() => {
                                setDraftValue('');
                                saveSecret('');
                            }}
                            disabled={isSaving}
                        >
                            {isSaving ? __('Removing...', 'gutenverse-form') : __('Remove', 'gutenverse-form')}
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <FieldComponent
                        label={requiredLabel}
                        value={draftValue}
                        onChange={setDraftValue}
                        placeholder={placeholder}
                        help={description || __('This value will be stored on the server instead of in block content.', 'gutenverse-form')}
                        rows={textArea ? 8 : undefined}
                        type={textArea ? undefined : 'password'}
                    />
                    <div className="panel-save-button-container" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <Button
                            variant="secondary"
                            onClick={() => saveSecret()}
                            disabled={isSaving || !draftValue.trim()}
                        >
                            {isSaving ? __('Saving...', 'gutenverse-form') : __('Save Securely', 'gutenverse-form')}
                        </Button>
                        {hasSavedSecret && (
                            <Button
                                variant="tertiary"
                                onClick={() => {
                                    setIsEditing(false);
                                    setDraftValue('');
                                    setError('');
                                }}
                                disabled={isSaving}
                            >
                                {__('Cancel', 'gutenverse-form')}
                            </Button>
                        )}
                    </div>
                </>
            )}
            {message && <p className="notice-description green">{message}</p>}
            {error && <p className="notice-description red" style={{ color: '#b32d2e' }}>{error}</p>}
        </div>
    );
};

export default ServerSecretControl;
