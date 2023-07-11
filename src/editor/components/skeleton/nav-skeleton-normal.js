
import { Skeleton } from 'gutenverse-core-editor/components';

const NavSkeletonNormal = () => {
    return <div style={{ display: 'flex' }}>
        <div style={{ padding: '5px', width: '160px' }}>
            <Skeleton variant="rect" height={25} animation={'none'} borderRadius={2} />
        </div>
        <div style={{ padding: '5px', width: '35px' }}>
            <Skeleton variant="rect" height={25} animation={'none'} />
        </div>
        <div style={{ padding: '5px', width: '160px' }}>
            <Skeleton variant="rect" height={25} borderRadius={2} animation={'none'} />
        </div>
        <div style={{ padding: '5px', width: '35px' }}>
            <Skeleton variant="rect" height={25} animation={'none'} />
        </div>
        <div style={{ padding: '5px', width: '160px' }}>
            <Skeleton variant="rect" height={25} borderRadius={2} animation={'none'} />
        </div>
    </div>;
};

export default NavSkeletonNormal;