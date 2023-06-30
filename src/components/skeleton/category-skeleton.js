
import { Skeleton } from 'gutenverse-core/components';

const CategorySkeleton = () => {
    return <div >
        <div style={{ marginBottom: '10px', width: '120px' }}>
            <Skeleton variant="rect" height={15} borderRadius={2} />
        </div>
        <div style={{ marginBottom: '10px', width: '150px' }}>
            <Skeleton variant="rect" height={15} borderRadius={2} />
        </div>
        <div style={{ marginBottom: '10px', width: '120px' }}>
            <Skeleton variant="rect" height={15} borderRadius={2} />
        </div>
        <div style={{ marginBottom: '10px', width: '150px' }}>
            <Skeleton variant="rect" height={15} borderRadius={2} />
        </div>
        <div style={{ marginBottom: '10px', width: '50px' }}>
            <Skeleton variant="rect" height={15} borderRadius={2} />
        </div>
        <div style={{ marginBottom: '10px', width: '120px' }}>
            <Skeleton variant="rect" height={15} borderRadius={2} />
        </div>
        <div style={{ marginBottom: '10px', width: '75px' }}>
            <Skeleton variant="rect" height={15} borderRadius={2} />
        </div>
    </div>;
};

export default CategorySkeleton;