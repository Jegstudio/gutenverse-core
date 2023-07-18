
import { Skeleton } from 'gutenverse-core/components';

const InstallThemeStatusSkeleton = () => {
    return <div >
        <div style={{ margin: '20px 0', width: '100px', boxSizing: 'border-box' }}>
            <Skeleton variant="rect" height={20} borderRadius={2} />
        </div>
    </div>;
};

export default InstallThemeStatusSkeleton;