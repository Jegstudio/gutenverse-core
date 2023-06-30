import {registerBlockType} from '@wordpress/blocks';
import {__} from '@wordpress/i18n';
import {Type} from 'react-feather';

import { withCustomStyle } from 'gutenverse-core/hoc';
import {
    AlignmentToolbar,
    BlockControls,
    RichText,
    useBlockProps
} from '@wordpress/block-editor';
import {ToolbarGroup} from '@wordpress/components';
import HeadingTypeToolbar from './components/heading-type-toolbar';
import classnames from 'classnames';
import save from './save-demo';
import { compose } from '@wordpress/compose';
import { panelList } from './panels/panel-list';
import { PanelController } from 'gutenverse-core/controls';

const DemoBlock = compose(withCustomStyle(panelList))(props => {
    const {attributes, setAttributes} = props;
    const {
        elementId,
        type,
        content,
        textAlign,
    } = attributes;

    const tagName = 'h' + type;

    const blockProps = useBlockProps({
        className: classnames(elementId, {
            [`has-text-align-${textAlign}`]: textAlign,
        }),
    });

    return <>
        <PanelController panelList={panelList} {...props} />
        <BlockControls>
            <ToolbarGroup>
                <HeadingTypeToolbar
                    type={type}
                    onChange={(newType) =>
                        setAttributes({type: newType})
                    }
                />
            </ToolbarGroup>
            <AlignmentToolbar
                value={textAlign}
                onChange={(nextAlign) => {
                    setAttributes({textAlign: nextAlign});
                }}
            />
        </BlockControls>
        <RichText
            identifier="content"
            tagName={tagName}
            value={content}
            onChange={(value) => setAttributes({content: value})}
            placeholder={__('Write heading…')}
            textAlign={textAlign}
            multiline={false}
            {...blockProps}
        />
    </>;
});

registerBlockType('gutenverse/control', {
    apiVersion: 2,
    title: 'Gutenverse Control Demo',
    description: __(
        'Gutenverse Control Demo',
        'gutenverse'
    ),
    category: 'gutenverse',
    icon: <Type style={{fill: '#fff', color: '#000'}}/>,
    attributes: {
        elementId: {
            type: 'string',
        },
        date: {
            type: 'string',
        },
        repeater: {
            type: 'array'
        },
        textarea: {
            type: 'string'
        },
        icon: {
            type: 'string'
        },
        iconRadio: {
            type: 'string'
        },
        number: {
            type: 'string'
        },
        typography: {
            type: 'object'
        },
        background: {
            type: 'object',
            default: {}
        },
        backgroundHover: {
            type: 'object',
            default: {}
        },
        font: {
            type: 'object'
        },
        imageId: {
            type: 'object'
        },
        checkbox: {
            type: 'object'
        },
        color: {
            type: 'object'
        },
        text: {
            type: 'string'
        },
        select: {
            type: 'object',
        },
        margin: {
            type: 'object'
        },
        range: {
            type: 'object'
        },
        size: {
            type: 'object'
        },
        textAlign: {
            type: 'string'
        },
        content: {
            type: 'string',
            source: 'html',
            selector: 'h1,h2,h3,h4,h5,h6',
            default: ''
        },
        type: {
            type: 'number',
            default: 2
        },
    },
    supports: {
        anchor: true,
        reusable: false,
        html: false,
    },
    keywords: [
        __('container', 'gutenverse'),
        __('column', 'gutenverse'),
        __('gutenverse', 'gutenverse'),
    ],
    edit: DemoBlock,
    save
});
