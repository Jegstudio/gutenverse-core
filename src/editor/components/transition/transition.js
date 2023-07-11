import { useRef, useEffect } from '@wordpress/element';
import { CSSTransition } from 'react-transition-group';

const DivTransition = ({
    open,
    time = 300,
    effect,
    divClasses,
    closeOnClickOutside = false,
    ...props
}) => {
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            closeOnClickOutside();
        }
    };

    useEffect(() => {
        if (closeOnClickOutside) {
            document.addEventListener('mousedown', handleClickOutside);

            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [ref]);

    return (
        <CSSTransition in={open} timeout={time} classNames={effect}>
            <div className={divClasses} ref={ref}>
                {props.children}
            </div>
        </CSSTransition>
    );
};

export default DivTransition;
