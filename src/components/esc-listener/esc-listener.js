import { useEffect } from '@wordpress/element';

const EscListener = ({ execute }) => {
    const escFunction = event => {
        if (event.keyCode === 27) {
            execute();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', escFunction, false);
        return () => {
            document.removeEventListener('keydown', escFunction, false);
        };
    }, []);

    return null;
};

export default EscListener;