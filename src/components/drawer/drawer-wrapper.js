import { Children, cloneElement, useEffect, useState } from '@wordpress/element';
import EscListener from '../esc-listener/esc-listener';
import classnames from 'classnames';

export const DrawerHeader = ({ children, ...props }) => {
    return cloneElement(children, { ...props });
};

export const DrawerBody = ({ children, ...props }) => {
    return cloneElement(children, { ...props });
};

export const DrawerFooter = ({ children, ...props }) => {
    return cloneElement(children, { ...props });
};

export const DrawerContainer = ({ children }) => {
    let TheHeader = null;
    let TheBody = null;
    let TheFooter = null;

    Children.map(children, (child) => {
        if (child) {
            if (child.type === DrawerHeader) {
                TheHeader = child;
            }

            if (child.type === DrawerBody) {
                TheBody = child;
            }

            if (child.type === DrawerFooter) {
                TheFooter = child;
            }
        }
    });

    const containerClass = classnames('gutenverse-drawer-container', {
        'show-footer': TheFooter !== null
    });

    return <div className={containerClass}>
        <div className={'gutenverse-drawer-header'}>
            {TheHeader}
        </div>
        <div className={'gutenverse-drawer-scroller'}>
            <div className={'gutenverse-drawer-body'}>
                {TheBody}
            </div>
        </div>
        {TheFooter !== null ? <div className={'gutenverse-drawer-footer'}>
            {TheFooter}
        </div> : null}
    </div>;
};

const DrawerWrapper = ({ className, setOpen, open, children }) => {
    const [fade, setFade] = useState(false);

    const closeDrawer = () => {
        setFade(true);

        setTimeout(() => {
            setFade(false);
            setOpen(false);
        }, 200);
    };

    useEffect(() => {
        if (open) {
            document.body.classList.add('gutenverse-drawer-body');
        } else {
            document.body.classList.remove('gutenverse-drawer-body');
        }
    }, [open]);

    return <>
        <EscListener execute={closeDrawer} />
        <div className={classnames('gutenverse-drawer-wrapper', className, {
            'open': open,
            'fade': fade
        })}>
            <div className={'gutenverse-drawer-overlay'} onClick={closeDrawer} />
            {children({
                closeDrawer
            })}
        </div>
    </>;
};


export default DrawerWrapper;