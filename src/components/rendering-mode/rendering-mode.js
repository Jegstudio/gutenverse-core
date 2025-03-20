import { registerPlugin } from '@wordpress/plugins';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { store as editorStore } from '@wordpress/editor';

const TEMPLATE_LOCKED_POST_TYPES = ['page', 'post'];

const renderingMode = registerPlugin('gutenverse-default-rendering-mode', {
    render: () => {
        const { setRenderingMode } = useDispatch(editorStore);

        const [postType] = useSelect((select) => [select(editorStore).getCurrentPostType()], []);

        useEffect(() => {
            if (!TEMPLATE_LOCKED_POST_TYPES.includes(postType)) {
                return;
            }
            setRenderingMode('post-only');
        }, [setRenderingMode, postType]);

        return null;
    },
});

export default renderingMode;