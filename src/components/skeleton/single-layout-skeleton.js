
import { Skeleton } from 'gutenverse-core/components';

export const LeftSkeleton = () => {
    return <div>
        <div style={{ padding: '10px', width: '200px', boxSizing: 'border-box' }}>
            <Skeleton variant="rect" height={20} borderRadius={2} />
        </div>
        <div style={{ padding: '10px', width: '100%', boxSizing: 'border-box' }}>
            <Skeleton variant="rect" height={'1000px'} borderRadius={2} />
        </div>
    </div>;
};

export const RightSkeleton = () => {
    return <div>
        <div style={{ padding: '10px', width: '200px', boxSizing: 'border-box' }}>
            <Skeleton variant="rect" height={30} borderRadius={2} />
        </div>
        <div style={{ padding: '10px', width: '100px', boxSizing: 'border-box' }}>
            <Skeleton variant="rect" height={20} borderRadius={2} />
        </div>
        <div style={{ display: 'block' }}>
            <div style={{ padding: '10px', width: '50%', boxSizing: 'border-box', float: 'left' }}>
                <Skeleton variant="rect" height={'150px'} borderRadius={2} />
            </div>
            <div style={{ padding: '10px', width: '50%', boxSizing: 'border-box', float: 'left' }}>
                <Skeleton variant="rect" height={'150px'} borderRadius={2} />
            </div>
            <div style={{ padding: '10px', width: '50%', boxSizing: 'border-box', float: 'left' }}>
                <Skeleton variant="rect" height={'150px'} borderRadius={2} />
            </div>
            <div style={{ padding: '10px', width: '50%', boxSizing: 'border-box', float: 'left' }}>
                <Skeleton variant="rect" height={'150px'} borderRadius={2} />
            </div>
            <div style={{ padding: '10px', width: '50%', boxSizing: 'border-box', float: 'left' }}>
                <Skeleton variant="rect" height={'150px'} borderRadius={2} />
            </div>
            <div style={{ padding: '10px', width: '50%', boxSizing: 'border-box', float: 'left' }}>
                <Skeleton variant="rect" height={'150px'} borderRadius={2} />
            </div>
            <div style={{ padding: '10px', width: '50%', boxSizing: 'border-box', float: 'left' }}>
                <Skeleton variant="rect" height={'150px'} borderRadius={2} />
            </div>
            <div style={{ padding: '10px', width: '50%', boxSizing: 'border-box', float: 'left' }}>
                <Skeleton variant="rect" height={'150px'} borderRadius={2} />
            </div>
            <div style={{ padding: '10px', width: '50%', boxSizing: 'border-box', float: 'left' }}>
                <Skeleton variant="rect" height={'150px'} borderRadius={2} />
            </div>
        </div>
    </div>;
};

