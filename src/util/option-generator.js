
import {
    BlockControls
} from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { cog } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import {
    BackgroundControl,
    BorderControl,
    BoxShadowControl,
    CheckboxControl,
    ColorControl,
    DimensionControl,
    HeadingControl,
    IconControl,
    IconRadioControl,
    ImageControl,
    ImageSizeControl,
    RangeControl,
    SelectControl,
    SizeControl,
    SwitchControl,
    TextareaControl,
    TextControl,
    TextShadowControl,
    TypographyControl
} from 'gutenverse-core/controls';

const processOptions = (options) => {
    const generatedStyle = [];

    options.map(option => {
        const {
            id,
            component,
            allowDeviceControl,
            style: styles,
            onChange,
            skip = false
        } = option;

        if (skip) {
            console.log('Option Process Skipped : ', id);
        } else {
            switch (component) {
                case IconRadioControl:
                case SelectControl:
                case RangeControl:
                    if (styles) {
                        styles.map(style => {
                            const returned = style.render('{$value}');
                            const deviceControl = allowDeviceControl ? 'true' : 'false';

                            generatedStyle.push(`if ( isset( $this->attrs['${id}'] ) ) {
                                $this->inject_style(
                                    array(
                                        'selector'       => "${style.selector}",
                                        'property'       => function( $value ) {
                                            return "${returned}";
                                        },
                                        'value'          => $this->attrs['${id}'],
                                        'device_control' => ${deviceControl},
                                    )
                                );
                            }`);
                        });
                    }
                    break;
                case BackgroundControl:
                    if (styles) {
                        styles.map(style => {
                            generatedStyle.push(`if ( isset( $this->attrs['${id}'] ) ) {
                                $this->handle_background( "${style.selector}", $this->attrs['${id}'] );
                            }`);
                        });
                    }
                    break;
                case SizeControl:
                    if (styles) {
                        styles.map(style => {
                            const renderString = style.render.toString();
                            const match = renderString.match(/WEBPACK[\s\S]*\(value, ['|"]([\s\S]*?)('|"\))/);
                            const deviceControl = allowDeviceControl ? 'true' : 'false';

                            if (match) {
                                generatedStyle.push(`if ( isset( $this->attrs['${id}'] ) ) {
                                    $this->inject_style(
                                        array(
                                            'selector'       => "${style.selector}",
                                            'property'       => function( $value ) {
                                                return $this->handle_unit_point( $value, '${match[1]}');
                                            },
                                            'value'          => $this->attrs['${id}'],
                                            'device_control' => ${deviceControl},
                                        )
                                    );
                                }`);
                            } else {
                                console.log('cannot parse', id);
                            }
                        });
                    }
                    break;
                case ColorControl:
                    if (styles) {
                        styles.map(style => {
                            const renderString = style.render.toString();
                            const match = renderString.match(/WEBPACK[\s\S]*\(value, ['|"]([\s\S]*?)('|"\))/);
                            const deviceControl = allowDeviceControl ? 'true' : 'false';

                            generatedStyle.push(`if ( isset( $this->attrs['${id}'] ) ) {
                                $this->inject_style(
                                    array(
                                        'selector'       => "${style.selector}",
                                        'property'       => function( $value ) {
                                            return $this->handle_color( $value, '${match[1]}');
                                        },
                                        'value'          => $this->attrs['${id}'],
                                        'device_control' => ${deviceControl},
                                    )
                                );
                            }`);
                        });
                    }
                    break;
                case DimensionControl:
                    if (styles) {
                        styles.map(style => {
                            const renderString = style.render.toString();
                            const deviceControl = allowDeviceControl ? 'true' : 'false';

                            let match = renderString.match(/WEBPACK[\s\S]*\(value, ['|"]([\s\S]*?)('|"\))/);
                            if (match) {
                                generatedStyle.push(`if ( isset( $this->attrs['${id}'] ) ) {
                                    $this->inject_style(
                                        array(
                                            'selector'       => "${style.selector}",
                                            'property'       => function( $value ) {
                                                return $this->handle_dimension( $value, '${match[1]}' );
                                            },
                                            'value'          => $this->attrs['${id}'],
                                            'device_control' => ${deviceControl},
                                        )
                                    );
                                }`);
                            } else {
                                let match = renderString.match(/WEBPACK[\s\S]*\(value, ['|"]([\s\S]*?)('|",)/);
                                if ('border-radius' === match[1]) {
                                    generatedStyle.push(`if ( isset( $this->attrs['${id}'] ) ) {
                                        $this->inject_style(
                                            array(
                                                'selector'       => "${style.selector}",
                                                'property'       => function( $value ) {
                                                    return $this->handle_border_radius( $value );
                                                },
                                                'value'          => $this->attrs['${id}'],
                                                'device_control' => ${deviceControl},
                                            )
                                        );
                                    }`);
                                }
                            }
                        });
                    }
                    break;
                case TypographyControl:
                    if (styles) {
                        styles.map(style => {
                            const deviceControl = allowDeviceControl ? 'true' : 'false';

                            generatedStyle.push(`if ( isset( $this->attrs['${id}'] ) ) {
                                $this->inject_typography(
                                    array(
                                        'selector'       => "${style.selector}",
                                        'property'       => function( $value ) {},
                                        'value'          => $this->attrs['${id}'],
                                        'device_control' => ${deviceControl},
                                    )
                                );
                            }`);
                        });
                    }
                    break;
                case BorderControl:
                    const selector = styles[0].selector;
                    generatedStyle.push(`if ( isset( $this->attrs['${id}'] ) ) {
                            $this->handle_border( '${id}', "${selector}" );
                        }`);
                    break;
                case BoxShadowControl:
                    if (styles) {
                        styles.map(style => {
                            const deviceControl = allowDeviceControl ? 'true' : 'false';

                            generatedStyle.push(`if ( isset( $this->attrs['${id}'] ) ) {
                                $this->inject_style(
                                    array(
                                        'selector'       => "${style.selector}",
                                        'property'       => function( $value ) {
                                            return $this->handle_box_shadow( $value );
                                        },
                                        'value'          => $this->attrs['${id}'],
                                        'device_control' => ${deviceControl},
                                    )
                                );
                            }`);
                        });
                    }
                    break;
                case TextShadowControl:
                    if (styles) {
                        styles.map(style => {
                            const deviceControl = allowDeviceControl ? 'true' : 'false';

                            generatedStyle.push(`if ( isset( $this->attrs['${id}'] ) ) {
                                $this->inject_style(
                                    array(
                                        'selector'       => "${style.selector}",
                                        'property'       => function( $value ) {
                                            return $this->handle_text_shadow( $value );
                                        },
                                        'value'          => $this->attrs['${id}'],
                                        'device_control' => ${deviceControl},
                                    )
                                );
                            }`);
                        });
                    }
                    break;
                default:

                    if (HeadingControl === component) {
                        console.log('type HeadingControl', id);
                    } else if (SwitchControl === component) {
                        console.log('type SwitchControl', id);
                    } else if (IconControl === component) {
                        console.log('type IconControl', id);
                    } else if (CheckboxControl === component) {
                        console.log('type CheckboxControl', id);
                    } else if (TextControl === component) {
                        console.log('type TextControl', id);
                    } else if (ImageSizeControl === component) {
                        console.log('type ImageSizeControl', id);
                    } else if (ImageControl === component) {
                        console.log('type ImageControl', id);
                    } else if (TextareaControl === component) {
                        console.log('type TextareaControl', id);
                    } else {
                        console.log('control not recognized', id);
                    }

                    if (onChange) {
                        console.log('On Change set on: ', id);
                    }

                    break;
            }
        }
    });

    return generatedStyle;
};

const generateOptions = (panelList) => {
    const panels = panelList();
    const features = [];
    let generatedStyle = [];

    panels.map(panel => {
        switch (panel.title) {
            case 'Background':
                features.push('background');
                break;
            case 'Border':
                features.push('border');
                break;
            case 'Positioning':
                features.push('positioning');
                break;
            case 'Animation Effects':
                features.push('animation');
                break;
            case 'Spacing':
                features.push('advance');
                break;
            case 'Responsive':
                break;
            default:
                const options = panel.panelArray({
                    elementId: '{$this->element_id}',
                    switcher: {},
                });
                const result = processOptions(options);
                generatedStyle = [
                    ...generatedStyle,
                    ...result,
                ];
        }
    });

    const featureList = features.map(feature => {
        return `'${feature}' => null`;
    }).join(',');

    const generatedOption = generatedStyle.join(`
    
    `);


    console.log(`
    /**
     * Constructor
     *
     * @param array $attrs Attribute.
     */
    public function __construct( $attrs ) {
        parent::__construct( $attrs );

        $this->set_feature(
            array(${featureList})
        );
    }
    
    /**
     * Generate style base on attribute.
     */
    public function generate() {
        ${generatedOption}
    }`);
};

const OptionGenerator = ({ panelList }) => {
    return <BlockControls>
        {process.env.NODE_ENV === 'development' && <ToolbarGroup>
            <ToolbarButton
                name="icon"
                icon={cog}
                title={__('Option Generator', 'gctd')}
                onClick={() => generateOptions(panelList)}
            />
        </ToolbarGroup>}
    </BlockControls>;
};

export default OptionGenerator;