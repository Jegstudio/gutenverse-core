import { registerPlugin } from '@wordpress/plugins';
import GutenverseLibrary from '.';
import { useState } from '@wordpress/element';
import { v4 } from 'uuid';
import { useUrlChange } from 'gutenverse-core/editor-helper';

const gutenverseLibraryPlugin = registerPlugin('gutenverse-library', {
    render: () => {
        const [uuid, setUuid] = useState(v4());
        useUrlChange(() => setUuid(v4()));
        return <GutenverseLibrary uuid={uuid} />;
    },
});

export default gutenverseLibraryPlugin;