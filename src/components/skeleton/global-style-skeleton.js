
import { Skeleton } from 'gutenverse-core-editor/components';

const GlobalStyleSkeleton = () => {
    return <div >
        <div style={{ margin: '10px auto', width: '25%' }}>
            <Skeleton variant="rect" height={34} borderRadius={2} />
        </div>
        <div style={{ padding: '0px 20px', marginBottom: '6px' }}>
            <Skeleton variant="rect" height={34} borderRadius={5} />
        </div>
        <div style={{ padding: '0px 20px', marginBottom: '6px' }}>
            <Skeleton variant="rect" height={34} borderRadius={5} />
        </div>
        <div style={{ padding: '0px 20px', marginBottom: '6px' }}>
            <Skeleton variant="rect" height={34} borderRadius={5} />
        </div>
        <div style={{ padding: '0px 20px', marginBottom: '6px' }}>
            <Skeleton variant="rect" height={34} borderRadius={5} />
        </div>
        <div style={{ padding: '0px 20px', marginBottom: '6px' }}>
            <Skeleton variant="rect" height={34} borderRadius={5} />
        </div>
    </div>;
};

export default GlobalStyleSkeleton;