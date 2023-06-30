
import { Skeleton } from 'gutenverse-core/components';

const PostListSkeleton = ({number = 1}) => {
    return <div style={{display: 'flex'}}>
        {[...new Array(parseInt(number)).keys()].map(index => <div key={index} style={{width: `${100/parseInt(number)}%`}}>
            <div style={{marginBottom: '15px'}}>
                <Skeleton variant="rect" height={24} borderRadius={4} width="50%" />
            </div>
            <div style={{margin: '10px 0'}}>
                <Skeleton variant="rect" height={10} borderRadius={4} width="40%" />
            </div>
        </div>)}
    </div>;
};

export default PostListSkeleton;