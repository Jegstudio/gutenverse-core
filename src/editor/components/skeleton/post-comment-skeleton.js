
import { Skeleton } from 'gutenverse-core-editor/components';

const PostCommentSkeleton = () => {
    return <div style={{display: 'flex', width: '100%'}}>
        <div style={{padding: '5px', width: '50px'}}>
            <Skeleton variant="rect" height={40} borderRadius={400} />
        </div>
        <div style={{padding: '5px', width: '50%'}}>
            <div style={{marginBottom: '15px'}}>
                <Skeleton variant="rect" height={24} borderRadius={4} width="50%" />
            </div>
            <div style={{margin: '10px 0'}}>
                <Skeleton variant="rect" height={10} borderRadius={4} width="90%" />
            </div>
            <div style={{margin: '10px 0'}}>
                <Skeleton variant="rect" height={10} borderRadius={4} width="90%" />
            </div>
            <div style={{margin: '10px 0'}}>
                <Skeleton variant="rect" height={10} borderRadius={4} width="70%" />
            </div>
        </div>
    </div>;
};

export default PostCommentSkeleton;