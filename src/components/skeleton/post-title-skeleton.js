
import { Skeleton } from 'gutenverse-core-editor/components';

const PostTitleSkeleton = () => {
    return <div style={{width: '100%'}}>
        <div style={{marginBottom: '15px'}}>
            <Skeleton variant="rect" height={30} borderRadius={4} />
        </div>
    </div>;
};

export default PostTitleSkeleton;