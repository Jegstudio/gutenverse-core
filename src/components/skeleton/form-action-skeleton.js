
import { Skeleton } from 'gutenverse-core/components';

const FormActionSkeleton = () => {
    return <div>
        <div style={{ display: 'flex', padding: '20px' }}>
            <div style={{ padding: '5px', width: '150px' }}>
                <Skeleton variant="rect" height={40} borderRadius={2} />
            </div>
            <div style={{ padding: '5px', width: '150px' }}>
                <Skeleton variant="rect" height={40} borderRadius={2} />
            </div>
            <div style={{ padding: '5px', width: '150px' }}>
                <Skeleton variant="rect" height={40} borderRadius={2} />
            </div>
        </div>
        <div style={{ display: 'block', padding: '10px 20px' }}>
            <div style={{ padding: '7px 5px', width: '100px' }}>
                <Skeleton variant="rect" height={28} borderRadius={2} />
            </div>
            <div style={{ padding: '7px 5px', width: '100%' }}>
                <Skeleton variant="rect" height={28} borderRadius={2} />
            </div>
            <div style={{ padding: '7px 5px', width: '200px' }}>
                <Skeleton variant="rect" height={28} borderRadius={2} />
            </div>
            <div style={{ padding: '25px 5px', width: '100%' }}>
                <Skeleton variant="rect" height={2} borderRadius={2} />
            </div>
        </div>
        <div style={{ display: 'block', padding: '10px 20px' }}>
            <div style={{ padding: '7px 5px', width: '100px' }}>
                <Skeleton variant="rect" height={28} borderRadius={2} />
            </div>
            <div style={{ padding: '7px 5px', width: '100%' }}>
                <Skeleton variant="rect" height={28} borderRadius={2} />
            </div>
            <div style={{ padding: '7px 5px', width: '200px' }}>
                <Skeleton variant="rect" height={28} borderRadius={2} />
            </div>
            <div style={{ padding: '25px 5px', width: '100%' }}>
                <Skeleton variant="rect" height={2} borderRadius={2} />
            </div>
        </div>
    </div>;
};

export default FormActionSkeleton;