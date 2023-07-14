
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import ControlHeadingSimple from '../part/control-heading-simple';
import cryptoRandomString from 'crypto-random-string';

const IDGeneratorControl = (props) => {
    const {
        value = {},
        label,
        description,
        onValueChange,
    } = props;

    const id = useInstanceId(IDGeneratorControl, 'inspector-id-generator-control');

    const generateNewID = () => {
        const uniqueId = 'guten-' + cryptoRandomString({ length: 6, type: 'alphanumeric' });
        onValueChange(uniqueId);
    };

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-id-generator'}>
        <ControlHeadingSimple
            id={`${id}-text`}
            label={label}
            description={description}
        />
        <div className={'control-body'}>
            <input
                id={`${id}-text`}
                type="text"
                className="control-input-text"
                placeholder={''}
                value={value === undefined ? '' : value}
                disabled={true}
                onChange={() => {}}
            />
            <div className={'gutenverse-control-button'} onClick={generateNewID}>
                {__('Generate', 'gutenverse')}
            </div>
        </div>
    </div>;
};

export default IDGeneratorControl;