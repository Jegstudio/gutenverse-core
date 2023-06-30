import { useEffect } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { withDispatch } from '@wordpress/data';
export { routeStore } from 'gutenverse-core/store';

const Routing = ({ location, updateLocation, children: Content }) => {
    useEffect(() => {
        window.history.pushState(null, null, location?.search);
    }, [location]);

    return <>
        <Content location={location} updateLocation={updateLocation}/>
    </>;
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
)(Routing);