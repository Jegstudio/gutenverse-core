
import { useInstanceId } from '@wordpress/compose';
import ControlHeadingSimple from '../part/control-heading-simple';
import Select from 'react-select';
import classnames from 'classnames';
import { useVisibility } from 'gutenverse-core/hooks';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import { withDeviceControl } from 'gutenverse-core/hoc';
import { isEmpty } from 'lodash';
import { Helmet } from 'gutenverse-core/components';

const FontComponent = (props) => {
    const { innerProps, isSelected, isFocused } = props;
    const [ isVisible, currentElement ] = useVisibility(200, 50);

    const fontClass = classnames('font-option', {
        'selected': isSelected,
        'focused': isFocused,
    });

    return <>
        {props.data.type !== 'system' && !isEmpty(props.data.value) && isVisible && <Helmet>
            <link href={`https://fonts.googleapis.com/css?family=${props.data.value}&text=${props.data.value}`} rel="stylesheet" type="text/css" />
        </Helmet>}
        <div {...innerProps} ref={currentElement} className={fontClass} style={{ fontFamily: props.data.value }}>
            {props.data.label}
        </div>
    </>;
};

const FontControl = (props) => {
    const {
        label,
        allowDeviceControl,
        value = allowDeviceControl ? {} : '',
        onValueChange,
        onStyleChange,
        isMulti = false,
        description = '',
    } = props;

    const { fonts: fontsData } = window['GutenverseConfig'];

    const onChange = value => {
        onValueChange(value);
        onStyleChange(value);
    };

    const customStyles = {
        input: () => {
            return {
                padding: 0,
                margin: 0
            };
        },
        control: (provided) => {
            let style = {
                ...provided,
                borderRadius: '1px',
            };

            if (value !== undefined) {
                style = {
                    ...style,
                    fontFamily: value.value
                };
            }

            return style;
        }
    };

    const fontOptions = fontsData.groups.map(group => {
        const options = fontsData.fonts.filter(item => item.class === group.value).map(font => {
            return {
                label: font.name,
                value: font.value,
                type: font.class
            };
        });

        return {
            label: group.label,
            options
        };
    });

    const id = useInstanceId(FontControl, 'inspector-font-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-font'}>
        <ControlHeadingSimple
            id={`${id}-font`}
            label={label}
            description={description}
            allowDeviceControl={allowDeviceControl}
        />
        <div className={'control-body'}>
            <div className={'control-font'}>
                <Select
                    isMulti={isMulti}
                    styles={customStyles}
                    value={value}
                    onChange={onChange}
                    options={fontOptions}
                    components={{
                        Option: FontComponent,
                    }}
                />
            </div>
        </div>
    </div>;
};

export default compose(withParentControl, withDeviceControl)(FontControl);