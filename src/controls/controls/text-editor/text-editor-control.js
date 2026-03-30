import { useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Editor } from '@tinymce/tinymce-react';
import { ControlHeadingSimple } from 'gutenverse-core/controls';

const TextEditorControl = (props) => {
    const {
        id,
        label,
        description = '',
        onValueChange,
        value = '',
    } = props;

    const editorRef = useRef(null);

    const handleFullscreenChange = (event) => {
        const headerElement = document.querySelector('.interface-interface-skeleton__sidebar .interface-complementary-area-header');
        const bodyElement = document.querySelector('.interface-interface-skeleton__body');
        const wrapperElement = document.querySelector('.gutenverse-control-wrapper.gvnews-text-editor-control');

        if (event.state) {
            if (headerElement) headerElement.style.position = 'static';
            if (bodyElement) bodyElement.style.zIndex = '99';
            if (wrapperElement) wrapperElement.classList.add('full-screen');
        } else {
            if (headerElement) headerElement.style.position = '';
            if (bodyElement) bodyElement.style.zIndex = '';
            if (wrapperElement) wrapperElement.classList.remove('full-screen');
        }
    };

    const exitFullScreen = () => {
        if (editorRef.current) {
            editorRef.current.execCommand('mceFullScreen');
        }
    };

    return (
        <div className={'gutenverse-control-wrapper gvnews-text-editor-control'}>
            <ControlHeadingSimple
                id={`${id}-text-editor`}
                label={label}
                description={description}
                allowDeviceControl={false}
            />
            <div className="gvnews-text-editor-wrapper">
                <div className="editor-header">
                    <h3>{label}</h3>
                    <button className="gvnews-exit-fullscreen" onClick={exitFullScreen}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.33341 1.6665L1.66675 8.33317M1.66675 1.6665L8.33341 8.33317" stroke="#98A2B3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
                <Editor
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    onEditorChange={(newValue) => {
                        const cleaned = newValue.replace(/\n/g, '').replace(/\s+/g, ' ').trim();
                        onValueChange(cleaned);
                    }}
                    value={value}
                    init={{
                        menubar: false,
                        toolbar: 'bold italic underline blockquote bullist numlist link | fullscreen',
                        plugins: 'paste lists link fullscreen wordpress wpautoresize',
                        branding: false,
                        forced_root_block: 'p',
                        newline_behavior: 'block',
                        content_style: `
                            body {
                                padding: 2px;
                                margin: 8px;
                                border: none;
                            }
                        `,
                        setup: (editor) => {
                            editor.on('FullscreenStateChanged', handleFullscreenChange);
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default TextEditorControl;
