
import { useInstanceId } from '@wordpress/compose';
import ControlHeadingSimple from '../part/control-heading-simple';
import Select, { components, GroupHeadingProps} from 'react-select';
import classnames from 'classnames';
import { useVisibility } from 'gutenverse-core/hooks';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import { withDeviceControl } from 'gutenverse-core/hoc';
import isEmpty from 'lodash/isEmpty';
import { __ } from '@wordpress/i18n';
import { Helmet } from 'gutenverse-core/components';
import ProLock from '../pro-lock';

const FontComponent = (props) => {
    const { innerProps, isSelected, isFocused, isDisabled} = props;
    const [ isVisible, currentElement ] = useVisibility(200, 50);
    const { uploadPath } = window['GutenverseConfig'];
    const fontClass = classnames(
        'font-option',
        {
            'selected': isSelected,
            'focused': isFocused,
            'disabled' : isDisabled,
        },
        props.data.pro && `select-option${props.data.pro && ' pro'}`
    );

    const fontStyleHead = () => {
        if (props.data.type === 'google' && !isEmpty(props.data.value) && isVisible){
            return <Helmet>
                <link href={`https://fonts.googleapis.com/css?family=${props.data.value}&text=${props.data.value}`} rel="stylesheet" type="text/css" />
            </Helmet>;
        }
        else if(props.data.type === 'custom_font_pro' && !isEmpty(props.data.value) ){
            return <Helmet>
                <link href={`${uploadPath}/${props.data.value}.css`} rel="stylesheet" type="text/css" />
            </Helmet>;
        }
    };

    return <>
        {() => fontStyleHead}
        <div {...innerProps} ref={currentElement} className={fontClass} style={{ fontFamily: props.data.value }}>
            {props.data.label}
            {props.data.pro && <ProLock
                title = {props.data.label}
                description = {props.data.description}
            />}
        </div>
    </>;
};
// const GroupHeading = (props) => {
//     return <div className='guten-label-pro-wrapper'>
//         <components.GroupHeading {...props} />
//         { props.children === 'Custom Font' && <span className="pro-label">Pro</span>}
//     </div>;
// }

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
        let options = fontsData.fonts.filter(item => item.class === group.value).map(font => {
            return {
                label: font.name,
                value: font.value,
                type: font.class
            };
        });

        if(group.label === 'Custom Font' && options.length === 0){
            options = [{
                label : 'Custom Font',
                value : 'Custom Font',
                type  : 'custom_font_pro',
                pro   : true,
                description: __( 'Lorem Ipsum...', '--gctd--')
            }];
        }
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
                    isOptionDisabled={(option) => option.disabled || option.pro}
                    components={{
                        Option: FontComponent,
                    }}
                />
            </div>
        </div>
    </div>;
};

export default compose(withParentControl, withDeviceControl)(FontControl);