
import { Skeleton } from 'gutenverse-core/components';

const PostFeaturedSkeleton = () => {
    return <div style={{width: '100%'}}>
        <div style={{marginBottom: '15px'}}>
            <Skeleton variant="rect" height={400} borderRadius={4} />
        </div>
    </div>;
};

export default PostFeaturedSkeleton;