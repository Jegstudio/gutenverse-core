import { useState } from '@wordpress/element';

/**
 * This is a generic hoc used for passing block ref to another hoc.
 * @param {*} BlockElement block element.
 * @returns BlockElement.
 */
export const withPassRef = BlockElement => {
    return (props) => {
        const [blockRef, setBlockRef] = useState(null);

        return <BlockElement
            {...props}
            setBlockRef={setBlockRef}
            blockRef={blockRef}
        />;
    };
};
