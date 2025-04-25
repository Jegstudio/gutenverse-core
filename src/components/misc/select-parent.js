
import { Button } from '@wordpress/components';
import { useSelect, dispatch } from '@wordpress/data';

const SelectParent = (props) => {
    const {
        getBlockRootClientId,
    } = useSelect(
        (select) => select('core/block-editor'),
        []
    );

    const {
        selectBlock
    } = dispatch('core/block-editor');

    const selectParent = () => {
        const rootId = getBlockRootClientId(props.clientId);
        selectBlock(rootId);
    };

    return <div className={'parent-button'}>
        <Button variant="primary" onClick={selectParent}>
            {props.children}
        </Button>
    </div>;
};

export default SelectParent;