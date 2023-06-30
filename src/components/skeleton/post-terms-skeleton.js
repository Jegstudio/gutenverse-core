
import { Skeleton } from 'gutenverse-core/components';

const PostTermsSkeleton = () => {
    return <div style={{display: 'flex'}}>
        <div style={{marginBottom: '15px', marginRight: '5px', width: '60px'}}>
            <Skeleton variant="rect" height={16} borderRadius={4} />
        </div>
        <div style={{marginBottom: '15px', marginRight: '5px', width: '60px'}}>
            <Skeleton variant="rect" height={16} borderRadius={4} />
        </div>
        <div style={{marginBottom: '15px', marginRight: '5px', width: '60px'}}>
            <Skeleton variant="rect" height={16} borderRadius={4} />
        </div>
    </div>;
};

export default PostTermsSkeleton;