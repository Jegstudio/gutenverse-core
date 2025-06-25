import { useState, useEffect } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import { parse } from '@wordpress/blocks';
import { ToolbarButton, Modal, TextControl, Button, Spinner } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { BlockPreview } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';

const AIButton = () => {
    const [ isModalOpen, setIsModalOpen ] = useState( false );
    const [ currentStep, setCurrentStep ] = useState( 1 );
    const [ firstPromptAnswer, setFirstPromptAnswer ] = useState( '' );
    const [ secondPromptAnswer, setSecondPromptAnswer ] = useState( '' );
    const [ isLoading, setIsLoading ] = useState( false );
    const [ errorMessage, setErrorMessage ] = useState( null );
    const [ showPreviewModal, setShowPreviewModal ] = useState( false );
    const [ previewBlocks, setPreviewBlocks ] = useState( [] );
    const [ showSessionPrompt, setShowSessionPrompt ] = useState( false );

    const { insertBlocks } = useDispatch( editorStore );

    const currentPostType = useSelect((select) => {
        return select(editorStore).getCurrentPostType ? select(editorStore).getCurrentPostType() : '_return';
    });

    useEffect(() => {
        if (currentPostType === 'wp_block' && isModalOpen && currentStep !== 0) {
            setCurrentStep(2);
            setFirstPromptAnswer('section');
        }
    }, [currentPostType, isModalOpen, currentStep]);


    const openModal = () => {
        const existingChatSessionId = localStorage.getItem( 'gutenverse_ai_chat_session_id' );

        if ( existingChatSessionId ) {
            setIsModalOpen( true );
            setShowSessionPrompt( true );
            setCurrentStep( 0 );
        } else {
            setIsModalOpen( true );
            setShowSessionPrompt( false );
            if ( currentPostType === 'wp_block' ) {
                setCurrentStep( 2 );
                setFirstPromptAnswer( 'section' );
            } else {
                setCurrentStep( 1 );
                setFirstPromptAnswer( '' );
            }
            setSecondPromptAnswer( '' );
            setErrorMessage( null );
        }
    };

    const closeModal = () => {
        setIsModalOpen( false );
        setShowPreviewModal( false );
        setPreviewBlocks( [] );
        setShowSessionPrompt( false );
        setErrorMessage( null );
    };

    const handleContentTypeSelection = ( type ) => {
        setFirstPromptAnswer( type );
        setErrorMessage( null );
        setCurrentStep( 2 );
    };

    const proceedToPromptFlow = () => {
        setShowSessionPrompt( false );
        setErrorMessage( null );
        setSecondPromptAnswer( '' );

        if ( currentPostType === 'wp_block' ) {
            setCurrentStep( 2 );
            setFirstPromptAnswer( 'section' );
        } else {
            setCurrentStep( 1 );
            setFirstPromptAnswer( '' );
        }
    };

    const handleContinueLastChat = () => {
        proceedToPromptFlow();
    };

    const handleStartNewChat = () => {
        localStorage.removeItem( 'gutenverse_ai_chat_session_id' );
        proceedToPromptFlow();
    };


    const handleSecondPromptSubmit = async () => {
        if ( secondPromptAnswer.trim() === '' ) {
            setErrorMessage( __( 'Please provide details for the content.', '--gctd--' ) );
            return;
        }

        setErrorMessage( null );
        setIsLoading( true );

        const existingChatSessionId = localStorage.getItem( 'gutenverse_ai_chat_session_id' );

        let params = applyFilters(
            'gutenverse.library.import.parameter',
            {
                prompt: `create me a ${ firstPromptAnswer } for: ${ secondPromptAnswer }`
            }
        );

        if ( existingChatSessionId ) {
            params = { ...params, chat_session_id: existingChatSessionId };
        }

        try {
            const response = await apiFetch( {
                path: '/gutenverse-client/v1/ai/request',
                method: 'POST',
                data: { ...params },
            } );

            const mergedContent = response?.data?.content?.generated_content_inline;
            const blocksToInsert = parse( mergedContent );
            setPreviewBlocks( blocksToInsert );
            setShowPreviewModal( true );
            setIsModalOpen( false );

            if ( response?.data?.chat_session_id ) {
                localStorage.setItem( 'gutenverse_ai_chat_session_id', response.data.chat_session_id );
            }

        } catch ( error ) {
            let msg = __( 'An unknown error occurred during AI request.', '--gctd--' );
            if ( error?.details?.message ) {
                msg = error.details?.message;
            } else if ( error?.response?.data?.message ) {
                msg = error.response.data.message;
            }
            setErrorMessage( msg );
        } finally {
            setIsLoading( false );
        }
    };

    const handleConfirmInsert = () => {
        insertBlocks( previewBlocks );
        closeModal();
    };

    const aiButton = (
        <ToolbarButton
            className="gutenverse-ai-button-wrapper"
            onClick={ openModal }
            label={ __( 'Gutenverse AI Mode.', '--gctd--' ) }
        >
            <div className="gutenverse-ai-button">
                <p>AI</p>
            </div>
        </ToolbarButton>
    );

    if ( ['wp_template', 'wp_template_part'].includes(currentPostType) ) {
        return null;
    }

    return (
        <>
            { aiButton }

            { isModalOpen && (
                <Modal
                    title={ __( 'Gutenverse AI Content', '--gctd--' ) }
                    onRequestClose={ closeModal }
                    className="gutenverse-ai-modal"
                >
                    { isLoading ? (
                        <div className="gutenverse-ai-loading-state">
                            <Spinner />
                            <p>{ __( 'Generating content with AI...', '--gctd--' ) }</p>
                        </div>
                    ) : (
                        <>
                            { errorMessage && (
                                <div className="gutenverse-ai-error-message">
                                    <strong>{ __( 'Error:', '--gctd--' ) }</strong> { errorMessage }
                                </div>
                            ) }

                            { showSessionPrompt && currentStep === 0 && (
                                <div className="gutenverse-ai-session-prompt">
                                    <strong className="gutenverse-ai-session-question">
                                        { __( 'A previous chat session was found. Use the same style as previously generated content?', '--gctd--' ) }
                                    </strong>
                                    <div className="gutenverse-ai-button-group">
                                        <Button
                                            variant="primary"
                                            isLarge
                                            onClick={ handleContinueLastChat }
                                        >
                                            { __( 'Continue Last Chat', '--gctd--' ) }
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            isLarge
                                            onClick={ handleStartNewChat }
                                        >
                                            { __( 'Start New Chat', '--gctd--' ) }
                                        </Button>
                                    </div>
                                </div>
                            ) }

                            { !showSessionPrompt && currentStep === 1 && currentPostType !== 'wp_block' && (
                                <div className="gutenverse-ai-step-one">
                                    <strong className="gutenverse-ai-step-one-question">{ __( 'Do you want to generate a Full Page or a Section?', '--gctd--' ) }</strong>
                                    <div className="gutenverse-ai-button-group">
                                        <Button
                                            variant="primary"
                                            isLarge
                                            onClick={ () => handleContentTypeSelection( 'page' ) }
                                        >
                                            { __( 'Full Page', '--gctd--' ) }
                                        </Button>
                                        <Button
                                            variant="primary"
                                            isLarge
                                            onClick={ () => handleContentTypeSelection( 'section' ) }
                                        >
                                            { __( 'Section', '--gctd--' ) }
                                        </Button>
                                    </div>
                                </div>
                            ) }

                            { !showSessionPrompt && ( currentStep === 2 || currentPostType === 'wp_block' ) && (
                                <div className="gutenverse-ai-step-two">
                                    <TextControl
                                        label={ <span className="gutenverse-ai-text-control-label">{ sprintf(
                                            /* translators: %s: 'page' or 'section' */
                                            __( 'Create a %s for:', '--gctd--' ),
                                            currentPostType === 'wp_block' ? 'section' : firstPromptAnswer
                                        ) }</span> }
                                        value={ secondPromptAnswer }
                                        onChange={ setSecondPromptAnswer }
                                        placeholder={
                                            currentPostType === 'wp_block' || firstPromptAnswer === 'section'
                                                ? __( 'e.g., "Mindful eating benefits."', '--gctd--' )
                                                : __( 'e.g., "Fitness app sales page."', '--gctd--' )
                                        }
                                        __experimentalShowCount={ true }
                                    />
                                    <div className="gutenverse-ai-button-group gutenverse-ai-button-group--right">
                                        { currentPostType !== 'wp_block' && (
                                            <Button
                                                variant="secondary"
                                                onClick={ () => setCurrentStep( 1 ) }
                                            >
                                                { __( 'Back', '--gctd--' ) }
                                            </Button>
                                        ) }
                                        <Button
                                            variant="primary"
                                            onClick={ handleSecondPromptSubmit }
                                        >
                                            { __( 'Generate Content', '--gctd--' ) }
                                        </Button>
                                    </div>
                                </div>
                            ) }
                        </>
                    ) }
                </Modal>
            ) }

            { showPreviewModal && (
                <Modal
                    title={ __( 'Preview AI Generated Content', '--gctd--' ) }
                    onRequestClose={ closeModal }
                    className="gutenverse-ai-preview-modal"
                >
                    <div className="gutenverse-ai-preview-content">
                        { previewBlocks.length > 0 ? (
                            <BlockPreview
                                blocks={ previewBlocks }
                                viewportWidth={ 1200 }
                            />
                        ) : (
                            <p>{ __( 'No content to preview.', '--gctd--' ) }</p>
                        ) }
                    </div>
                    <div className="gutenverse-ai-button-group gutenverse-ai-button-group--right">
                        <Button
                            variant="secondary"
                            onClick={ closeModal }
                        >
                            { __( 'Cancel', '--gctd--' ) }
                        </Button>
                        <Button
                            variant="primary"
                            onClick={ handleConfirmInsert }
                        >
                            { __( 'Insert into Editor', '--gctd--' ) }
                        </Button>
                    </div>
                </Modal>
            ) }
        </>
    );
};

export default AIButton;