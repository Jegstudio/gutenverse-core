
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import ControlHeadingSimple from '../part/control-heading-simple';
import cryptoRandomString from 'crypto-random-string';
import { isEmpty } from 'lodash';
import { dispatch, select } from '@wordpress/data';

const ChildIDGeneratorControl = (props) => {
    const {
        label,
        description,
        clientId
    } = props;

    const id = useInstanceId(ChildIDGeneratorControl, 'inspector-child-id-generator-control');

    const generateChildIDs = (clientId) => {
        const { getBlocks } = select('core/block-editor');
        const { updateBlockAttributes } = dispatch('core/block-editor');

        getBlocks(clientId).map(item => {
            if (item.attributes && !isEmpty(item.attributes.elementId)) {
                const uniqueId = 'guten-' + cryptoRandomString({ length: 6, type: 'alphanumeric' });
                updateBlockAttributes(item.clientId, {
                    elementId: uniqueId
                });
            }

            if (item.innerBlocks && item.innerBlocks.length > 0) {
                generateChildIDs(item.clientId);
            }
        });
    };

    const outLabel = <div className={'gutenverse-control-button'} onClick={() => generateChildIDs(clientId)}>
        {__('Generate', 'gutenverse')}
    </div>;

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-child-id-generator'}>
        <ControlHeadingSimple
            id={`${id}-text`}
            label={label}
            description={description}
            outLabel={outLabel}
        />
    </div>;
};

export default ChildIDGeneratorControl;