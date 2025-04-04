import { GradientControl, SelectControl, AngleControl } from 'gutenverse-core/controls';
import { __ } from '@wordpress/i18n';
import { useInstanceId } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';

const GradientWithAngleControl = (props) => {

    const {
        label,
        value = {},
        onValueChange,
    } = props;

    const id = useInstanceId(GradientWithAngleControl, 'inspector-gradient-with-angle-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-gradient-with-angle'}>
        <div>
            <GradientControl
                label={label}
                description={__('Drag a circle outside the box to remove it. \nYou can\'t remove if there are only two left.', '--gctd--')}
                value={value.gradientColor}
                onValueChange={gradientColor => onValueChange({ ...value, gradientColor })}
            />
        </div>
        <div className={'gradient-type'} style={{display: 'block'}}>
            <div>
                <SelectControl
                    label={__( label + ' Type', '--gctd--')}
                    value={value.gradientType}
                    onValueChange={gradientType => onValueChange({ ...value, gradientType })}
                    options={[
                        {
                            label: __('Linear', '--gctd--'),
                            value: 'linear'
                        },
                        {
                            label: __('Radial', '--gctd--'),
                            value: 'radial'
                        },
                    ]}
                />
            </div>
            <div>
                {value.gradientType !== undefined && value.gradientType === 'linear' && <AngleControl
                    label={__('Angle', '--gctd--')}
                    value={value.gradientAngle}
                    onValueChange={gradientAngle => onValueChange({ ...value, gradientAngle })}
                />
                }
                {value.gradientType !== undefined && value.gradientType === 'radial' && <SelectControl
                    label={__('Radial Position', '--gctd--')}
                    value={value.gradientRadial}
                    onValueChange={gradientRadial => onValueChange({ ...value, gradientRadial })}
                    options={[
                        {
                            label: __('Center Center', '--gctd--'),
                            value: 'center center'
                        },
                        {
                            label: __('Center Left', '--gctd--'),
                            value: 'center left'
                        },
                        {
                            label: __('Center Right', '--gctd--'),
                            value: 'center right'
                        },
                        {
                            label: __('Top Center', '--gctd--'),
                            value: 'top center'
                        },
                        {
                            label: __('Top Left', '--gctd--'),
                            value: 'top left'
                        },
                        {
                            label: __('Top Right', '--gctd--'),
                            value: 'top right'
                        },
                        {
                            label: __('Bottom Center', '--gctd--'),
                            value: 'bottom center'
                        },
                        {
                            label: __('Bottom Left', '--gctd--'),
                            value: 'bottom left'
                        },
                        {
                            label: __('Bottom Right', '--gctd--'),
                            value: 'bottom right'
                        },
                    ]}
                />}
            </div>
        </div>
    </div>;
};

export default withParentControl(GradientWithAngleControl);