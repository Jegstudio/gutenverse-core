import { compose } from '@wordpress/compose';
import { useCallback, useState, useEffect, useRef } from '@wordpress/element';
import { withPartialRender } from 'gutenverse-core/hoc';
import { BlockControls, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { RichTextComponent, classnames } from 'gutenverse-core/components';
import { __ } from '@wordpress/i18n';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { displayShortcut } from '@wordpress/keycodes';
import { createPortal } from 'react-dom';
import { IconLibrary } from 'gutenverse-core/controls';
import { HighLightToolbar, URLToolbar, FilterDynamic } from 'gutenverse-core/toolbars';
import { gutenverseRoot } from 'gutenverse-core/helper';
import { LogoCircleColor24SVG } from 'gutenverse-core/icons';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { SelectParent } from 'gutenverse-core/components';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { applyFilters } from '@wordpress/hooks';
import isEmpty from 'lodash/isEmpty';
import { isOnEditor } from 'gutenverse-core/helper';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';

const NEW_TAB_REL = 'noreferrer noopener';

const IconListItemBlock = compose(
    withPartialRender,
    withCopyElementToolbar(),
)((props) => {
    const [openIconLibrary, setOpenIconLibrary] = useState(false);

    const {
        attributes,
        setAttributes,
        isSelected,
        clientId,
        setPanelState,
        panelIsClicked,
        setPanelIsClicked
    } = props;

    const {
        elementId,
        icon,
        rel,
        url,
        linkTarget,
        hideIcon,
        dynamicUrl,
    } = attributes;

    const elementRef = useRef(null);
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const [dynamicHref, setDynamicHref] = useState();
    const isGlobalLinkSet = url !== undefined && url !== '';

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    useEffect(() => {
        setAttributes({
            hasGlobalLink: isGlobalLinkSet ? isGlobalLinkSet : false,
        });
    }, [isGlobalLinkSet]);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-icon-list-item',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });
    const onToggleOpenInNewTab = useCallback(
        (value) => {
            const newLinkTarget = value ? '_blank' : undefined;

            let updatedRel = rel;
            if (newLinkTarget && !rel) {
                updatedRel = NEW_TAB_REL;
            } else if (!newLinkTarget && rel === NEW_TAB_REL) {
                updatedRel = undefined;
            }

            setAttributes({
                linkTarget: newLinkTarget,
                rel: updatedRel,
            });
        },
        [rel, setAttributes]
    );

    FilterDynamic(props);
    HighLightToolbar(props);

    const panelState = {
        panel: 'setting',
        section: 0,
    };

    useEffect(() => {
        const dynamicUrlcontent = isEmpty(dynamicUrl) || !isOnEditor() ? dynamicUrl : applyFilters(
            'gutenverse.dynamic.fetch-url',
            dynamicUrl
        );

        (typeof dynamicUrlcontent.then === 'function') && !isEmpty(dynamicUrl) && dynamicUrlcontent
            .then(result => {
                if ((!Array.isArray(result) || result.length > 0) && result !== undefined && result !== dynamicHref) {
                    setDynamicHref(result);
                } else if (result !== dynamicHref) setDynamicHref(undefined);
            }).catch(() => { });
        if (dynamicHref !== undefined) {
            setAttributes({ url: dynamicHref, isDynamic: true });
        } else { setAttributes({ url: url }); }
    }, [dynamicUrl, dynamicHref]);

    return <>
        <InspectorControls>
            <SelectParent {...props}>
                {__('Modify Icon Group', 'gutenverse')}
            </SelectParent>
        </InspectorControls>
        <BlockPanelController panelList={panelList} props={props} />
        {openIconLibrary && createPortal(<IconLibrary
            closeLibrary={() => setOpenIconLibrary(false)}
            value={icon}
            onChange={value => setAttributes({ icon: value })}
        />, gutenverseRoot)}
        <BlockControls>
            <ToolbarGroup>
                {applyFilters('gutenverse.button.url-toolbar',
                    <URLToolbar
                        url={url}
                        setAttributes={setAttributes}
                        isSelected={isSelected}
                        opensInNewTab={linkTarget === '_blank'}
                        onToggleOpenInNewTab={onToggleOpenInNewTab}
                        anchorRef={blockProps.ref}
                        usingDynamic={true}
                        setPanelState={setPanelState}
                        panelState={panelState}
                        title="Item Link"
                        panelIsClicked={panelIsClicked}
                        setPanelIsClicked={setPanelIsClicked}
                    />,
                    props,
                    panelState
                )}
                <ToolbarButton
                    name="icon"
                    icon={<LogoCircleColor24SVG />}
                    title={__('Choose Icon', 'gutenverse')}
                    shortcut={displayShortcut.primary('i')}
                    onClick={() => setOpenIconLibrary(true)}
                />
            </ToolbarGroup>
        </BlockControls>
        <li  {...blockProps}>
            <a id={elementId}>
                {!hideIcon && <i className={icon} />}
                <RichTextComponent
                    ref={elementRef}
                    classNames={`list-text ${hideIcon ? 'no-icon' : ''}`}
                    tagName={'span'}
                    aria-label={__('List text')}
                    placeholder={__('Add text…')}
                    onChange={(value) => setAttributes({ text: value })}
                    multiline={false}
                    setAttributes={setAttributes}
                    attributes={attributes}
                    clientId={clientId}
                    panelDynamic={{ panel: 'setting', section: 1 }}
                    panelPosition={{ panel: 'style', section: 1 }}
                    contentAttribute={'text'}
                    setPanelState={setPanelState}
                    textChilds={'textChilds'}
                    dynamicList={'dynamicDataList'}
                    isUseDinamic={true}
                    isUseHighlight={true}
                    parentHasLink={isGlobalLinkSet}
                />
            </a>
        </li>
    </>;
});

export default IconListItemBlock;