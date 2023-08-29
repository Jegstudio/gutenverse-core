import { compose } from '@wordpress/compose';
import { withDispatch } from '@wordpress/data';
import { withSelect } from '@wordpress/data';

const Link = ({
    location,
    updateLocation,
    to,
    className,
    children,
    pro,
    setActive
}) => {
    const checkPro = window.gprodata;
    const onClick = (e) => {
        e.preventDefault();
        updateLocation({
            ...location,
            search: to.search
        });
    };
    if(pro){
        return <div className={className} onClick={setActive}>
                    { !checkPro && <p className="pro-label">PRO</p>}
                    <div className="setting-label" >
                        {children}
                    </div>
                </div>
    }
    return <a href={to?.search} className={className} onClick={onClick}>
        {children}
    </a>;
};

export default compose(
    withSelect(select => {
        const {
            getLocation,
        } = select('gutenverse/router');

        return {
            location: getLocation(),
        };
    }),
    withDispatch((dispatch) => {
        const {
            updateLocation
        } = dispatch('gutenverse/router');

        return {
            updateLocation
        };
    }),
)(Link);