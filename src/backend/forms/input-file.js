import { __ } from '@wordpress/i18n';
import { v4 as uuidv4 } from 'uuid';
import { useState,useEffect } from '@wordpress/element';


const ControlFile = (props) => {
    const { id, title, description, value, defaultValue = [],customLabel, updateValue, isRequired = false } = props;
    let uuid = uuidv4();
    const [dashboard, setDashboard] = useState(null);
    const [fileFrame, setFileFrame] = useState(null);
    const [fileName, setFileName] = useState('');
    useEffect(() => {
        const fontFrame = wp?.media({
            title: 'Select or Upload Media',
            button: {
                text: 'Select for Font File'
            },
            library: {
                type: ['application','image']
            },
            multiple: true,
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
            let arrUrl = []
            let tempFileName = ''
            dashboard.map(element => {
                arrUrl.push(element.url);
                tempFileName += element.filename + ', '
                setFileName(tempFileName);
            })
            updateValue(id,arrUrl);
        }
    }, [dashboard]);
    const selectItem = (frame) => {
        if (frame) {
            frame.open();
            return;
        }
    };
    const inputValue = value === undefined ? defaultValue : value;
    let inputFileName = [];
    useEffect(() => {
        if( inputValue.length != 0){
            inputValue.map(element => {
                let newArr = element.split('/');
                inputFileName.push(newArr[newArr.length - 1])
            });
            setFileName(inputFileName.join(', '));
        }
    },[])
   
    return <div className="control-wrapper control-text">
        <label className="control-title" htmlFor={`${id}-${uuid}`} style={customLabel}>{title} {isRequired && <span style={{color:'red'}}> *</span>}</label>
        <button onClick={() => selectItem(fileFrame)}>{__('Choose File', 'gtb')}</button>
        <span>{fileName }</span>
        {description !== '' && <span className="control-description">
            {description}
        </span>}
    </div>;
};

export default ControlFile;