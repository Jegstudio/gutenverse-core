
import { Skeleton } from 'gutenverse-core/components';

const PostTextSkeleton = () => {
    return <div style={{width: '100%'}}>
        <div style={{marginBottom: '15px'}}>
            <Skeleton variant="rect" height={16} borderRadius={4} />
        </div>
    </div>;
};

export default PostTextSkeleton;