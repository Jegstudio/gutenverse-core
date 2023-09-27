import { __ } from '@wordpress/i18n';
import { v4 as uuidv4 } from 'uuid';
import { useState,useEffect } from '@wordpress/element';


const ControlFile = (props) => {
    const { id, title, description, value, defaultValue = [],customLabel, updateValue, isRequired = false, typeMedia = [] } = props;
    let uuid = uuidv4();
    const [dashboard, setDashboard] = useState(null);
    const [fileFrame, setFileFrame] = useState(null);
    const handleUpdate = (e) => {
        updateValue(id,e.target.value)
    }
    useEffect(() => {
        const fontFrame = wp?.media({
            title: 'Select or Upload Media',
            button: {
                text: 'Select for Font File'
            },
            library: {
                type: typeMedia,
            },
            multiple: false,
        });
        setFileFrame(fontFrame);
    }, []);

    useEffect(() => {
        if (fileFrame) {
            fileFrame.on('select', function () {
                const attachment = fileFrame.state().get('selection').toJSON();
                setDashboard(attachment.map(item => ({
                    id: item?.id,
                    filename: item?.filename,
                    url: item?.url,
                })));
            });
        }
    }, [fileFrame]);
    useEffect(() => {
        if (dashboard) {
            updateValue(id,dashboard[0].url)
        }
    }, [dashboard]);
    const selectItem = (frame) => {
        if (frame) {
            frame.open();
            return;
        }
    };
    const inputValue = value === undefined ? defaultValue : value;
   
    return <div className="control-wrapper control-text">
        <label className="control-title" htmlFor={`${id}-${uuid}`} style={customLabel}>{title} {isRequired && <span style={{color:'red'}}> *</span>}</label>
        <div className="input-file-wrapper">
            <input type="text" value={inputValue}  id={`${id}-${uuid}`} onChange={handleUpdate}/>
            <button onClick={() => selectItem(fileFrame)} className="input-file-button">{__('Choose File', 'gtb')}</button>
        </div>
        {description !== '' && <span className="control-description">
            {description}
        </span>}
    </div>;
};

export default ControlFile;