import { registerPlugin } from '@wordpress/plugins';
import { useSelect } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import GutenverseLibrary from '.';

const gutenverseLibraryPlugin = registerPlugin('gutenverse-library', {
    render: () => {
        const screen = useSelect((select) => {
            return select(editorStore).getCurrentPostType();
        }, []);

        return <GutenverseLibrary screen={screen} />;
    },
});

export default gutenverseLibraryPlugin;