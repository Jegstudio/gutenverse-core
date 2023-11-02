import { compose } from '@wordpress/compose';
import { withCustomStyle } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useInnerBlocksProps } from '@wordpress/block-editor';
import { useRef, useState, useEffect } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { withAnimationAdvance } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { useSelect, subscribe } from '@wordpress/data';

const TextEditorBlock = compose(
    withCustomStyle(panelList),
    withAnimationAdvance('text-editor'),
    withCopyElementToolbar()
)((props) => {
    const { panelProps, setAdditionalAttribute } = props;
    const [content, setContent] = useState(null);

    const {
        getBlocks,
        getBlockAttributes
    } = useSelect(
        (select) => select('core/block-editor'),
        []
    );

    const {
        attributes,
        setElementRef,
        clientId
    } = props;

    const getContent = () => {
        if(getBlocks(clientId).length > 0){
            const childId = getBlocks(clientId)[0].clientId;
            const { content } = getBlockAttributes(childId);
            return content;
        }
        return;
    };

    useEffect(() => {
        const unsubscribe = subscribe(() => {
            const theContent = getContent();
            if (content !== theContent) setContent(theContent);
        });

        return () => unsubscribe();
    });

    useEffect(() => {
        setAdditionalAttribute({
            content
        });
    }, [content]);

    const {
        elementId,
        dropcap,
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const textEditorRef = useRef();

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'gutenverse-text-editor',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
            {
                'dropcap': dropcap
            },
        ),
        ref: textEditorRef
    });

    const innerBlocksProps = useInnerBlocksProps({
        template: [['core/paragraph']]
    }, {
        allowedBlocks: ['core/paragraph'],
    });

    useEffect(() => {
        if (textEditorRef.current) {
            setElementRef(textEditorRef.current);
        }
    }, [textEditorRef]);

    return <>
        <PanelController
            {...props}
            panelList={panelList}
            panelProps={panelProps}
        />
        <div  {...blockProps}>
            <div {...innerBlocksProps} />
        </div>
    </>;
});

export default TextEditorBlock;