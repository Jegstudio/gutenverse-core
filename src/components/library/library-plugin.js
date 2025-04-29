import { registerPlugin } from '@wordpress/plugins';
import GutenverseLibrary from '.';
import { useEffect, useState } from '@wordpress/element';
import { v4 } from 'uuid';

const patchHistoryMethod = (method) => {
    const original = history[method];
    return function (...args) {
        const result = original.apply(this, args);
        window.dispatchEvent(new Event('urlchange'));
        return result;
    };
};

function useUrlChange(callback) {
    useEffect(() => {
        history.pushState = patchHistoryMethod('pushState');
        history.replaceState = patchHistoryMethod('replaceState');

        const handleChange = () => callback(window.location.href);

        window.addEventListener('popstate', handleChange);
        window.addEventListener('urlchange', handleChange);

        return () => {
            window.removeEventListener('popstate', handleChange);
            window.removeEventListener('urlchange', handleChange);
        };
    }, [callback]);
}

const gutenverseLibraryPlugin = registerPlugin('gutenverse-library', {
    render: () => {
        const [uuid, setUuid] = useState(v4());
        useUrlChange(() => setUuid(v4()));
        return <GutenverseLibrary uuid={uuid} />;
    },
});

export default gutenverseLibraryPlugin;