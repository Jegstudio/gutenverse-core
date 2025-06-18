import { useState } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import { parse } from '@wordpress/blocks';
import { ToolbarButton, Modal, TextControl, Button, Spinner } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

const AIButton = () => {
    const [ isModalOpen, setIsModalOpen ] = useState( false );
    const [ currentStep, setCurrentStep ] = useState( 1 );
    const [ firstPromptAnswer, setFirstPromptAnswer ] = useState( '' );
    const [ secondPromptAnswer, setSecondPromptAnswer ] = useState( '' );
    const [ isLoading, setIsLoading ] = useState( false );
    const [ errorMessage, setErrorMessage ] = useState( null );

    const { insertBlocks } = useDispatch( editorStore );

    const openModal = () => {
        setIsModalOpen( true );
        setCurrentStep( 1 );
        setFirstPromptAnswer( '' );
        setSecondPromptAnswer( '' );
        setErrorMessage( null );
    };

    const closeModal = () => {
        setIsModalOpen( false );
    };

    const handleContentTypeSelection = ( type ) => {
        setFirstPromptAnswer( type );
        setErrorMessage( null );
        setCurrentStep( 2 );
    };

    const handleSecondPromptSubmit = async () => {
        if ( secondPromptAnswer.trim() === '' ) {
            setErrorMessage( __( 'Please provide details for the content.', '--gctd--' ) );
            return;
        }

        setErrorMessage( null );
        setIsLoading( true );

        const prompt = `create me a ${ firstPromptAnswer } for: ${ secondPromptAnswer }`;

        try {
            const response = await apiFetch( {
                path: '/gutenverse-client/v1/ai/request',
                method: 'POST',
                data: { prompt: prompt },
            } );

            let mergedContent = '';
            const sectionsOrder = response.data.extracted_data.sections;
            const generatedContent = response.data.llm_generated_content;

            for (const section of sectionsOrder) {
                const sectionType = section.type;
                if (generatedContent[sectionType] && generatedContent[sectionType].generated_content) {
                    mergedContent += generatedContent[sectionType].generated_content;
                }
            }

            const blocksToInsert = parse( mergedContent );

            insertBlocks( blocksToInsert );

            closeModal();

        } catch ( error ) {
            console.error( 'Error during AI request:', error );
            let msg = __( 'An unknown error occurred during AI request.', '--gctd--' );
            if ( error && error.message ) {
                msg = error.message;
            } else if ( error && error.response && error.response.data && error.response.data.message ) {
                msg = error.response.data.message;
            }
            setErrorMessage( msg );
        } finally {
            setIsLoading( false );
        }
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

    return (
        <>
            { aiButton }

            { isModalOpen && (
                <Modal
                    title={ __( 'Gutenverse AI Content Generation', '--gctd--' ) }
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

                            { currentStep === 1 && (
                                <div className="gutenverse-ai-step-one">
                                    <strong className="gutenverse-ai-step-one-question">{ __( 'Do you want to generate a Full Page or a Section?', '--gctd--' ) }</strong>
                                    <div className="gutenverse-ai-button-group">
                                        <Button
                                            isPrimary
                                            isLarge
                                            onClick={ () => handleContentTypeSelection( 'page' ) }
                                        >
                                            { __( 'Full Page', '--gctd--' ) }
                                        </Button>
                                        <Button
                                            isPrimary
                                            isLarge
                                            onClick={ () => handleContentTypeSelection( 'section' ) }
                                        >
                                            { __( 'Section', '--gctd--' ) }
                                        </Button>
                                    </div>
                                </div>
                            ) }

                            { currentStep === 2 && (
                                <div className="gutenverse-ai-step-two">
                                    <TextControl
                                        label={ <span className="gutenverse-ai-text-control-label">{ sprintf(
                                            /* translators: %s: 'page' or 'section' */
                                            __( 'Create a %s for:', '--gctd--' ),
                                            firstPromptAnswer
                                        ) }</span> }
                                        value={ secondPromptAnswer }
                                        onChange={ setSecondPromptAnswer }
                                        placeholder={
                                            firstPromptAnswer === 'page'
                                                ? __( 'e.g., "Fitness app sales page."', '--gctd--' )
                                                : __( 'e.g., "Mindful eating benefits."', '--gctd--' )
                                        }
                                        __experimentalShowCount={ true }
                                    />
                                    <div className="gutenverse-ai-button-group gutenverse-ai-button-group--right">
                                        <Button
                                            isSecondary
                                            onClick={ () => setCurrentStep( 1 ) }
                                        >
                                            { __( 'Back', '--gctd--' ) }
                                        </Button>
                                        <Button
                                            isPrimary
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
        </>
    );
};

export default AIButton;