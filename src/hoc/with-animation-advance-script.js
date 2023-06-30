export const withAnimationAdvanceScript = (blockType) => (BlockElement) => {
    return (props) => {
        const {
            attributes
        } = props;

        const {
            elementId,
            advanceAnimation = {}
        } = attributes;

        const {
            type,
        } = advanceAnimation;

        let script = null;

        const id = elementId && elementId.split('-')[1];

        if (type) {
            script = <div className="guten-data">
                <div data-var={`adanimAttrs${id}`} data-value={JSON.stringify({ blockType, advanceAnimation })} />
            </div>;
        }

        return <>
            {script}
            <BlockElement
                {...props}
            />
        </>;
    };
};
