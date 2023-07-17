import { compose } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';
import { withCustomStyle } from 'gutenverse-core-editor/hoc';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { PanelController } from 'gutenverse-core-editor/controls';
import { panelList } from './panels/panel-list';
import { useAnimationEditor } from 'gutenverse-core-editor/hooks';
import { useDisplayEditor } from 'gutenverse-core-editor/hooks';
import { getDate } from 'gutenverse-core-editor/editor-helper';
import { isEmpty } from 'lodash';
import { useRef } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core-editor/hoc';
import { useEntityProp } from '@wordpress/core-data';
import { __ } from '@wordpress/i18n';
import { PanelTutorial } from 'gutenverse-core-editor/controls';

const PostDateBlock = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
        setElementRef,
        context: { postId, postType }
    } = props;

    const {
        elementId,
        dateFormat,
        dateType,
        customFormat,
        linkTo,
        customURL,
        htmlTag: HtmlTag
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const postDateRef = useRef();

    useEffect(() => {
        postDateRef.current && setElementRef(postDateRef.current);
    }, [postDateRef]);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-post-date',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: postDateRef
    });

    const [defaultDateFormat] = useEntityProp(
        'root',
        'site',
        'date_format'
    );

    const [publishDate] = useEntityProp(
        'postType',
        postType,
        'date',
        postId
    );

    const [modifyDate] = useEntityProp(
        'postType',
        postType,
        'modified',
        postId
    );

    const getDateContent = (date) => {
        if ((!isEmpty(linkTo) && !['none', 'custom'].includes(linkTo)) || (linkTo === 'custom' && !isEmpty(customURL))) {
            return <a href="#link-disabled-in-editor" onClick={e => e.preventDefault()}>{date}</a>;
        }

        return date;
    };

    const getDateResult = () => {
        let format = null;

        switch (dateFormat) {
            case 'custom':
                customFormat && (format = customFormat);
                break;
            case 'F j, Y':
            case 'Y-m-d':
            case 'm/d/Y':
            case 'd/m/Y':
            case 'F j, Y g:i A':
            case 'm/d/Y g:i A':
                format = dateFormat;
                break;
            case 'ago':
                format = 'ago';
                break;
            case 'default':
            default:
                format = defaultDateFormat;
                break;
        }

        switch (dateType) {
            case 'both':
                const publish = getDate(format, publishDate);
                const modify = getDate(format, modifyDate);
                return publish === modify ? getDateContent(getDate(format, publishDate)) : getDateContent(`${getDate(format, publishDate)} - Updated on ${getDate(format, modifyDate)}`);
            case 'modified':
                return getDateContent(getDate(format, modifyDate));
            default:
                return getDateContent(getDate(format, publishDate));
        }
    };

    return <>
        <InspectorControls>
            <PanelTutorial
                title={__('How Post Date works?', 'gutenverse')}
                list={[
                    {
                        title: __('Inside Page Editor, Query Loop Block, and on Frontend', 'gutenverse'),
                        description: __('Date data will be fetched automatically based on the current post/loop.', 'gutenverse')
                    },
                    {
                        title: __('Inside Site Editor', 'gutenverse'),
                        description: __('It will load placeholder data.', 'gutenverse')
                    },
                ]}
            />
        </InspectorControls>
        <PanelController panelList={panelList} {...props} />
        <div  {...blockProps}>
            <HtmlTag>{getDateResult()}</HtmlTag>
        </div>
    </>;
});

export default PostDateBlock;