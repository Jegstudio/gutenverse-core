import { compose } from '@wordpress/compose';
import { useEffect, useState } from '@wordpress/element';
import { withCustomStyle } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { useRef } from '@wordpress/element';
import { RawHTML } from '@wordpress/element';
import GutenverseNavMenu from '../../../frontend/blocks/nav-menu';
import { NavSkeleton } from 'gutenverse-core/components';
import { NavSkeletonNormal } from 'gutenverse-core/components';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';

const NavMenuBlock = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
        setElementRef,
        deviceType
    } = props;

    const {
        elementId,
        menuId,
        breakpoint,
        mobileMenuLogo,
        mobileMenuLink,
        mobileMenuURL,
        mobileIcon,
        mobileCloseIcon,
        submenuClick,
        mobileSubmenuClick,
        mobileCloseOnClick,
        submenuItemIndicator,
        transform
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const isStillMounted = useRef();
    const elementRef = useRef();
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);

    const removeClick = () => {
        if (elementRef.current) {
            setTimeout(() => {
                elementRef.current.querySelectorAll('.gutenverse-menu li').forEach(menu => {
                    menu.querySelector('a').addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    });
                });
            }, 1);
        }
    };

    useEffect(() => {
        setLoading(true);
        apiFetch({
            path: addQueryArgs('/wp/v2/block-renderer/gutenverse/nav-menu', {
                context: 'edit',
                attributes: {
                    elementId,
                    menuId,
                    breakpoint,
                    mobileMenuLogo,
                    mobileMenuLink,
                    mobileMenuURL,
                    mobileIcon,
                    mobileCloseIcon,
                    submenuClick,
                    mobileSubmenuClick,
                    mobileCloseOnClick,
                    submenuItemIndicator,
                    transform
                },
            }),
        }).then((data) => {
            setResponse(data.rendered);
            removeClick();
        }).catch(() => {
            setResponse('<h1>Error</h1>');
        }).finally(() => setLoading(false));
    }, [
        menuId,
        breakpoint,
        mobileMenuLogo,
        mobileMenuLink,
        mobileMenuURL,
        mobileIcon,
        mobileCloseIcon,
        submenuClick,
        mobileSubmenuClick,
        mobileCloseOnClick,
        submenuItemIndicator,
        transform
    ]);

    useEffect(() => {
        setTimeout(() => {
            elementRef.current.classList.add('injected');
            new GutenverseNavMenu([elementRef.current]);
        }, 1000);
    }, [response, elementRef]);

    useEffect(() => {
        isStillMounted.current = true;

        return () => {
            isStillMounted.current = false;
        };
    }, []);

    const blockProps = useBlockProps({
        ref: elementRef,
        className: classnames(
            'guten-element',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
            deviceType.toLowerCase(),
            `${breakpoint}-breakpoint`,
        ),
        ['data-item-indicator']: submenuItemIndicator
    });

    useEffect(() => {
        if (elementRef.current) {
            setElementRef(elementRef.current);
        }
    }, [elementRef]);

    return <>
        <PanelController panelList={panelList} {...props} />
        <div {...blockProps}>
            {menuId ? !loading ? <RawHTML key="html">
                {response}
            </RawHTML> : <NavSkeleton /> : <NavSkeletonNormal />}
        </div>
    </>;
});

export default NavMenuBlock;