
import { Skeleton } from 'gutenverse-core/components';

const PostExcerptSkeleton = () => {
    return <div style={{padding: '5px', width: '100%'}}>
        <div style={{margin: '10px 0'}}>
            <Skeleton variant="rect" height={10} borderRadius={4} width="90%" />
        </div>
        <div style={{margin: '10px 0'}}>
            <Skeleton variant="rect" height={10} borderRadius={4} width="90%" />
        </div>
        <div style={{margin: '10px 0'}}>
            <Skeleton variant="rect" height={10} borderRadius={4} width="70%" />
        </div>
    </div>;
};

export default PostExcerptSkeleton;