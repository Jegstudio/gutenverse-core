
import { useInstanceId } from '@wordpress/compose';
import { IconInfoSVG } from 'gutenverse-core-editor/icons';

const AlertControl = (props) => {
    const {
        type = 'primary',
        description = '',
    } = props;

    const id = useInstanceId(AlertControl, 'inspector-alert-control');

    return <div id={id} className={`gutenverse-control-wrapper gutenverse-control-alert ${type}`}>
        <div className={'control-body'}>
            <div className="control-icon">
                <IconInfoSVG />
            </div>
            <div className={'control-alert'}>
                {props.children}
            </div>
        </div>
    </div>;
};

export default AlertControl;
