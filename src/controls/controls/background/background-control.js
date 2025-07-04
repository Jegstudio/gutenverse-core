
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { Droplet, Image, Video, Wind, Airplay } from 'react-feather';
import { withParentControl } from 'gutenverse-core/hoc';
import { CheckboxControl, ColorControl, IconRadioControl, ImageControl, SelectControl, SizeControl, TextControl, GradientControl, AngleControl, ControlHeadingSimple, LockedFluidBackground, RepeaterControl, RangeControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { applyFilters } from '@wordpress/hooks';
import textControl from '../text/text-control';
import { useEntityProp, store as coreStore } from '@wordpress/core-data';
import { useSelect, select } from '@wordpress/data';
import isEmpty from 'lodash/isEmpty';
import { imagePlaceholder } from 'gutenverse-core/config';
import { determineLocation } from 'gutenverse-core/helper';

const gradientOption = (props) => {
    const { value = {}, onValueChange } = props;
    return <>
        <GradientControl
            label={__('Gradient Color', '--gctd--')}
            description={__('Drag a circle outside the box to remove it. \nYou can\'t remove if there are only two left.', '--gctd--')}
            value={value.gradientColor}
            onValueChange={gradientColor => onValueChange({ ...value, gradientColor })}
        />
        <div className={'gradient-type'}>
            <div>
                <SelectControl
                    label={__('Gradient Type', '--gctd--')}
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
    </>;
};

const getFeaturedImage = (useFeaturedImage) => {
    const { postType } = useSelect((select) => {
        const currentPostType = select('core/editor').getCurrentPostType();
        return {
            postType: currentPostType,
        };
    }, []);

    const postId = select('core/editor').getCurrentPostId();
    const [ featuredImage ] = useEntityProp( 'postType', postType, 'featured_media', postId );
    const onEditor = determineLocation() === 'editor';


    const { media } = useSelect(
        (select) => {
            const { getMedia, getPostType } = select(coreStore);
            return {
                media:
                    featuredImage &&
                    getMedia(featuredImage, {
                        context: 'view',
                    }),
                postType: postType && getPostType(postType),
            };
        },
        [featuredImage, postType]
    );

    let mediaUrl = {
        id: null,
        image: imagePlaceholder
    };

    if(!isEmpty(useFeaturedImage)){
        mediaUrl = {
            id: onEditor ? '#gutenFeaturedImage' : null,
            image: imagePlaceholder
        };
    }

    if(media){
        mediaUrl = {
            id: media.id,
            image: media.source_url
        };
    }
    return mediaUrl;
};

const BackgroundControl = (props) => {
    const {
        value = {},
        onValueChange,
        options = [],
        label,
        description,
        proLabel,
        allowDeviceControl,
        values,
        type = '',
        blockType = '',
        onLocalChange,
    } = props;

    const availableOptions = [
        {
            label: __('Image & Color', '--gctd--'),
            value: 'default',
            icon: <Image size={18} />,
        },
        {
            label: __('Gradient', '--gctd--'),
            value: 'gradient',
            icon: <Droplet size={18} />,
        },
        {
            label: __('Video', '--gctd--'),
            value: 'video',
            icon: <Video size={18} />,
        },
        {
            label: __('Slide Show', '--gctd--'),
            value: 'slide',
            icon: <Airplay size={18} />,
        },
        {
            label: __('Fluid Background', '--gctd--'),
            value: 'fluid',
            icon: <Wind size={18} />,
        },
    ];

    const finalOptions = availableOptions.filter(item => {
        return options.includes(item.value);
    });

    const isWrapperBlock = () => {
        if ('column' === blockType || 'section' === blockType || 'wrapper' === blockType) {
            return true;
        }
        return false;
    };

    // multi device control
    const {
        position = {},
        size = {},
        blendMode,
        fixed = {
            Desktop: false
        },
        useFeaturedImage,
    } = value;

    const parameter = {
        value,
        onValueChange,
        onLocalChange
    };

    const deviceType = getDeviceType();
    const featuredImage = getFeaturedImage(useFeaturedImage);

    const id = useInstanceId(BackgroundControl, 'inspector-background-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-background'}>
        <ControlHeadingSimple
            label={label}
            description={description}
            proLabel={proLabel}
            allowDeviceControl={allowDeviceControl}
        />
        <IconRadioControl
            label={'' === type ? __('Background Type', '--gctd--') : type}
            value={value.type}
            onValueChange={type => {
                if (type === null) {
                    onValueChange(undefined);
                } else {
                    onValueChange({ ...value, type });
                }
            }}
            options={finalOptions}
            blockType={blockType}
        />

        {value.type !== undefined && value.type === 'default' && <>
            <ColorControl
                label={__('Background Color', '--gctd--')}
                value={value.color}
                onValueChange={color => onValueChange({ ...value, color })}
                onLocalChange={color => onLocalChange({ ...value, color })}
            />
            {isWrapperBlock() && <CheckboxControl
                label={__('Use Featured Image', '--gctd--')}
                value={value.useFeaturedImage}
                deviceValues={useFeaturedImage}
                allowDeviceControl={true}
                usePreviousDeviceValue={true}
                usePreviousDevice={true}
                onValueChange={useFeaturedImage => onValueChange({ ...value, useFeaturedImage })}
            />}
            {!isEmpty(useFeaturedImage) ?
                <ImageControl
                    label={__('Background Image', '--gctd--')}
                    externalValue={featuredImage}
                    value={value.image}
                    onValueChange={(image) => onValueChange({ ...value, image })}
                    allowDeviceControl={true}
                    useExternalValue={useFeaturedImage[deviceType]}
                /> :
                <ImageControl
                    label={__('Background Image', '--gctd--')}
                    value={value.image}
                    onValueChange={image => onValueChange({ ...value, image })}
                    allowDeviceControl={true}
                />}
            <SelectControl
                label={__('Background Position', '--gctd--')}
                value={value.position}
                onValueChange={position => onValueChange({ ...value, position })}
                allowDeviceControl={true}
                options={[
                    {
                        label: __('Default', '--gctd--'),
                        value: 'default'
                    },
                    {
                        label: __('Center center', '--gctd--'),
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
                    {
                        label: __('Custom', '--gctd--'),
                        value: 'custom'
                    },
                ]}
            />
            {position[deviceType] !== undefined && position[deviceType] === 'custom' &&
                <>
                    <SizeControl
                        label={__('X Position', '--gctd--')}
                        value={value.xposition}
                        allowDeviceControl={true}
                        onValueChange={xposition => onValueChange({ ...value, xposition })}
                        onLocalChange={xposition => onLocalChange({ ...value, xposition })}
                    />
                    <SizeControl
                        label={__('Y Position', '--gctd--')}
                        value={value.yposition}
                        allowDeviceControl={true}
                        onValueChange={yposition => onValueChange({ ...value, yposition })}
                        onLocalChange={yposition => onLocalChange({ ...value, yposition })}
                    />
                </>}
            <SelectControl
                label={__('Repeat', '--gctd--')}
                value={value.repeat}
                onValueChange={repeat => onValueChange({ ...value, repeat })}
                allowDeviceControl={true}
                options={[
                    {
                        label: __('Default', '--gctd--'),
                        value: 'default'
                    },
                    {
                        label: __('No repeat', '--gctd--'),
                        value: 'no-repeat'
                    },
                    {
                        label: __('Repeat', '--gctd--'),
                        value: 'repeat'
                    },
                    {
                        label: __('Repeat-x', '--gctd--'),
                        value: 'repeat-x'
                    },
                    {
                        label: __('Repeat-y', '--gctd--'),
                        value: 'repeat-y'
                    },
                ]}
            />
            <SelectControl
                label={__('Size', '--gctd--')}
                value={value.size}
                onValueChange={size => onValueChange({ ...value, size })}
                allowDeviceControl={true}
                options={[
                    {
                        label: __('Default', '--gctd--'),
                        value: 'default'
                    },
                    {
                        label: __('Auto', '--gctd--'),
                        value: 'auto'
                    },
                    {
                        label: __('Cover', '--gctd--'),
                        value: 'cover'
                    },
                    {
                        label: __('Contain', '--gctd--'),
                        value: 'contain'
                    },
                    {
                        label: __('Custom', '--gctd--'),
                        value: 'custom'
                    },
                ]}
            />
            {size[deviceType] !== undefined && size[deviceType] === 'custom' &&
                <>
                    <SizeControl
                        label={__('Width', '--gctd--')}
                        value={value.width}
                        allowDeviceControl={true}
                        onValueChange={width => onValueChange({ ...value, width })}
                        onLocalChange={width => onLocalChange({ ...value, width })}
                        units={{
                            px: {
                                text: 'px',
                                min: 1,
                                max: 200,
                                step: 1,
                                unit: 'px',
                            },
                            em: {
                                text: 'em',
                                min: 0.1,
                                max: 10,
                                step: 0.1,
                                unit: 'em',
                            },
                            ['%']: {
                                text: '%',
                                min: 1,
                                max: 100,
                                step: 1,
                                unit: '%',
                            },
                            vh: {
                                text: 'vh',
                                min: 0.1,
                                max: 10,
                                step: 0.1,
                                unit: 'vh',
                            },
                        }}
                    />
                </>
            }
            <SelectControl
                label={__('Blend Mode', '--gctd--')}
                value={blendMode}
                onValueChange={blendMode => onValueChange({ ...value, blendMode })}
                allowDeviceControl={true}
                options={[
                    {
                        label: __('Normal', '--gctd--'),
                        value: 'normal'
                    },
                    {
                        label: __('Multiply', '--gctd--'),
                        value: 'multiply'
                    },
                    {
                        label: __('Screen', '--gctd--'),
                        value: 'screen'
                    },
                    {
                        label: __('Overlay', '--gctd--'),
                        value: 'overlay'
                    },
                    {
                        label: __('Darken', '--gctd--'),
                        value: 'darken'
                    },
                    {
                        label: __('Lighten', '--gctd--'),
                        value: 'lighten'
                    },
                    {
                        label: __('Color Dodge', '--gctd--'),
                        value: 'color-dodge'
                    },
                    {
                        label: __('Color Burn', '--gctd--'),
                        value: 'color-burn'
                    },
                    {
                        label: __('Hard Light', '--gctd--'),
                        value: 'hard-light'
                    },
                    {
                        label: __('Soft Light', '--gctd--'),
                        value: 'soft-light'
                    },
                    {
                        label: __('Difference', '--gctd--'),
                        value: 'difference'
                    },
                    {
                        label: __('Exclusion', '--gctd--'),
                        value: 'exclusion'
                    },
                    {
                        label: __('Hue', '--gctd--'),
                        value: 'hue'

                    },
                    {
                        label: __('Saturation', '--gctd--'),
                        value: 'saturation'
                    },
                    {
                        label: __('Color', '--gctd--'),
                        value: 'color'
                    },
                    {
                        label: __('Luminosity', '--gctd--'),
                        value: 'luminosity'
                    },
                ]}
            />
            <CheckboxControl
                label={__('Fixed Background', '--gctd--')}
                value={fixed}
                deviceValues={fixed}
                allowDeviceControl={true}
                usePreviousDevice={true}
                onValueChange={fixed => onValueChange({ ...value, fixed })}
            />
        </>}

        {value.type !== undefined && value.type === 'gradient' && gradientOption(parameter)}

        {value.type !== undefined && value.type === 'video' && <>
            <TextControl
                label={__('Video Link', '--gctd--')}
                value={value.videoLink}
                onValueChange={videoLink => onValueChange({ ...value, videoLink })}
                placeholder={'https://www.youtube.com/watch?v=cAH1bSq2LmI'}
            />
            <TextControl
                label={__('Start Time', '--gctd--')}
                description={__('in Seconds. For example 1:30 minutes will be 90', '--gctd--')}
                value={value.videoStartTime}
                onValueChange={videoStartTime => onValueChange({ ...value, videoStartTime })}
                placeholder={'10'}
            />
            <TextControl
                label={__('End Time', '--gctd--')}
                description={__('in Seconds. For example 1:30 minutes will be 90', '--gctd--')}
                value={value.videoEndTime}
                onValueChange={videoEndTime => onValueChange({ ...value, videoEndTime })}
                placeholder={'70'}
            />
            <CheckboxControl
                label={__('Play Once', '--gctd--')}
                value={value.videoPlayOnce}
                onValueChange={videoPlayOnce => onValueChange({ ...value, videoPlayOnce })}
            />
            <CheckboxControl
                label={__('Play On Mobile', '--gctd--')}
                value={value.videoPlayOnMobile}
                onValueChange={videoPlayOnMobile => onValueChange({ ...value, videoPlayOnMobile })}
            />
            <ImageControl
                label={__('Background Fallback', '--gctd--')}
                value={value.videoImage}
                onValueChange={videoImage => onValueChange({ ...value, videoImage })}
                allowDeviceControl={true}
            />
        </>}

        {value.type !== undefined && value.type === 'slide' && <>
            <RepeaterControl
                label={__('Image', '--gctd--')}
                titleFormat="<strong><%= value.title%></strong>"
                value={value.slideImage}
                values={values}
                options={[
                    {
                        id: 'image',
                        label: __('Image', '--gctd--'),
                        component: ImageControl,
                    },
                    {
                        id: 'title',
                        label: __('Title', '--gctd--'),
                        component: textControl,
                    },
                ]}
                onValueChange={slideImage => onValueChange({ ...value, slideImage })}
            />
            <CheckboxControl
                label={__('Infinite Loop', '--gctd--')}
                value={value.infiniteLoop}
                onValueChange={infiniteLoop => onValueChange({ ...value, infiniteLoop })}
            />
            <RangeControl
                label={__('Image Display Duration', '--gctd--')}
                min={0}
                max={10}
                step={0.1}
                unit="s"
                value={value.displayDuration}
                onValueChange={displayDuration => onValueChange({ ...value, displayDuration })}
                onLocalChange={displayDuration => onLocalChange({ ...value, displayDuration })}
            />
            <SelectControl
                label={__('Transition', '--gctd--')}
                value={value.transition}
                onValueChange={transition => onValueChange({ ...value, transition })}
                options={[
                    {
                        label: __('fade', '--gctd--'),
                        value: 'fade'
                    },
                    {
                        label: __('Slide Right', '--gctd--'),
                        value: 'slideRight'
                    },
                    {
                        label: __('Slide Left', '--gctd--'),
                        value: 'slideLeft'
                    },
                    {
                        label: __('Slide Top', '--gctd--'),
                        value: 'slideTop'
                    },
                    {
                        label: __('Slide Down', '--gctd--'),
                        value: 'slideDown'
                    },
                ]}
            />
            <RangeControl
                label={__('Transition Duration', '--gctd--')}
                min={0}
                max={10}
                step={0.1}
                description={__('Image Display Duration value will be used if Transition Duration value is higher', '--gctd--')}
                unit="s"
                value={value.duration}
                onValueChange={duration => onValueChange({ ...value, duration })}
                onLocalChange={duration => onLocalChange({ ...value, duration })}
            />
            <SelectControl
                label={__('Background Position', '--gctd--')}
                value={value.backgroundPosition}
                onValueChange={backgroundPosition => onValueChange({ ...value, backgroundPosition })}
                options={[
                    {
                        label: __('Default', '--gctd--'),
                        value: 'default'
                    },
                    {
                        label: __('Center Center', '--gctd--'),
                        value: 'center-center'
                    },
                    {
                        label: __('Center Right', '--gctd--'),
                        value: 'center-right'
                    },
                    {
                        label: __('Center Left', '--gctd--'),
                        value: 'center-left'
                    },
                    {
                        label: __('Top Center', '--gctd--'),
                        value: 'top-center'
                    },
                    {
                        label: __('Top Right', '--gctd--'),
                        value: 'top-right'
                    },
                    {
                        label: __('Top Left', '--gctd--'),
                        value: 'top-left'
                    },
                    {
                        label: __('Bottom Center', '--gctd--'),
                        value: 'bottom-center'
                    },
                    {
                        label: __('Bottom Right', '--gctd--'),
                        value: 'bottom-right'
                    },
                    {
                        label: __('Bottom Left', '--gctd--'),
                        value: 'bottom-left'
                    },
                ]}
            />
            <SelectControl
                label={__('Background Size', '--gctd--')}
                value={value.backgroundSize}
                onValueChange={backgroundSize => onValueChange({ ...value, backgroundSize })}
                options={[
                    {
                        label: __('Default', '--gctd--'),
                        value: 'auto'
                    },
                    {
                        label: __('Contain', '--gctd--'),
                        value: 'contain'
                    },
                    {
                        label: __('Cover', '--gctd--'),
                        value: 'cover'
                    },
                ]}
            />
            <SelectControl
                label={__('Background Repeat', '--gctd--')}
                value={value.backgroundRepeat}
                onValueChange={backgroundRepeat => onValueChange({ ...value, backgroundRepeat })}
                options={[
                    {
                        label: __('Default', '--gctd--'),
                        value: 'repeat'
                    },
                    {
                        label: __('No repeat', '--gctd--'),
                        value: 'no-repeat'
                    },
                    {
                        label: __('Repeat Y', '--gctd--'),
                        value: 'repeat-y'
                    },
                    {
                        label: __('Repeat X', '--gctd--'),
                        value: 'repeat-x'
                    },
                    {
                        label: __('Round', '--gctd--'),
                        value: 'round'
                    },
                ]}
            />
            <CheckboxControl
                label={__('Ken Burns Effect', '--gctd--')}
                value={value.kenBurns}
                onValueChange={kenBurns => onValueChange({ ...value, kenBurns })}
            />
            {value.kenBurns && <SelectControl
                label={__('Direction', '--gctd--')}
                value={value.direction}
                onValueChange={direction => onValueChange({ ...value, direction })}
                options={[
                    {
                        label: __('In', '--gctd--'),
                        value: 'directionIn'
                    },
                    {
                        label: __('Out', '--gctd--'),
                        value: 'directionOut'
                    },
                ]}
            />}
            {/* <CheckboxControl
                label={__('Lazy Load', '--gctd--')}
                value={value.lazyLoad}
                onValueChange={lazyLoad => onValueChange({ ...value, lazyLoad })}
            /> */}
        </>}

        {value.type !== undefined && value.type === 'fluid' && applyFilters(
            'gutenverse.fluid.canvas.option',
            <LockedFluidBackground isOpen={value.type === 'fluid'}/>,
            parameter
        )}
    </div>;
};

export default withParentControl(BackgroundControl);