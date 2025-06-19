import { useState, useEffect } from '@wordpress/element'; // Import useEffect
import { useDispatch, useSelect } from '@wordpress/data';
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

    const currentPostType = useSelect((select) => {
        return select(editorStore).getCurrentPostType ? select(editorStore).getCurrentPostType() : '_return';
    });

    // New useEffect to handle initial step for 'wp_block'
    useEffect(() => {
        if (currentPostType === 'wp_block' && isModalOpen) {
            setCurrentStep(2);
            // Set firstPromptAnswer to 'section' as it's the logical choice for a block
            setFirstPromptAnswer('section');
        }
    }, [currentPostType, isModalOpen]);

    const openModal = () => {
        setIsModalOpen( true );
        // Determine the starting step based on currentPostType
        if (currentPostType === 'wp_block') {
            setCurrentStep(2);
            setFirstPromptAnswer('section'); // Pre-set for 'wp_block'
        } else {
            setCurrentStep(1);
            setFirstPromptAnswer('');
        }
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

        // Use firstPromptAnswer, which will be 'section' for wp_block
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

                            {/* Conditionally render step 1 */}
                            { currentStep === 1 && currentPostType !== 'wp_block' && (
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

                            {/* Always show step 2 if currentStep is 2, or if currentPostType is 'wp_block' */}
                            { ( currentStep === 2 || currentPostType === 'wp_block' ) && (
                                <div className="gutenverse-ai-step-two">
                                    <TextControl
                                        label={ <span className="gutenverse-ai-text-control-label">{ sprintf(
                                            /* translators: %s: 'page' or 'section' */
                                            __( 'Create a %s for:', '--gctd--' ),
                                            // Ensure firstPromptAnswer is 'section' if currentPostType is 'wp_block'
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
                                        {/* Conditionally render the 'Back' button */}
                                        { currentPostType !== 'wp_block' && (
                                            <Button
                                                isSecondary
                                                onClick={ () => setCurrentStep( 1 ) }
                                            >
                                                { __( 'Back', '--gctd--' ) }
                                            </Button>
                                        ) }
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