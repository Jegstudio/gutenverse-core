import { compose } from '@wordpress/compose';
import { withDispatch } from '@wordpress/data';
import { withSelect } from '@wordpress/data';
import { applyFilters } from '@wordpress/hooks';

const Link = ({
    location,
    updateLocation,
    to,
    className,
    children,
    pro,
    setActive
}) => {
    const onClick = (e) => {
        e.preventDefault();
        updateLocation({
            ...location,
            search: to.search
        });
    };

    if (pro) {
        const ButtonPro = applyFilters('gutenverse.setting-pro-button', () =>
            <div className={className} onClick={setActive}>
                <div className="setting-label" >
                    {children}
                    <span className="pro-label">PRO</span>
                </div>
            </div>, { to, className, onClick, children });
        return <ButtonPro />;
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