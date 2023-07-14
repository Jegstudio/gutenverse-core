
import { Skeleton } from 'gutenverse-core-editor/components';

const NavSkeleton = () => {
    return <div style={{ display: 'flex' }}>
        <div style={{ padding: '5px', width: '150px' }}>
            <Skeleton variant="rect" height={20} borderRadius={2} />
        </div>
        <div style={{ padding: '5px', width: '30px' }}>
            <Skeleton variant="circle" height={20} />
        </div>
        <div style={{ padding: '5px', width: '150px' }}>
            <Skeleton variant="rect" height={20} borderRadius={2} />
        </div>
        <div style={{ padding: '5px', width: '30px' }}>
            <Skeleton variant="circle" height={20} />
        </div>
        <div style={{ padding: '5px', width: '150px' }}>
            <Skeleton variant="rect" height={20} borderRadius={2} />
        </div>
    </div>;
};

export default NavSkeleton;