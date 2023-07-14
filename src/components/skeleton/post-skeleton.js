
import { Skeleton } from 'gutenverse-core-editor/components';

const PostSkeleton = ({number = 1}) => {
    return <div style={{display: 'flex'}}>
        {[...new Array(parseInt(number)).keys()].map(index => <div key={index} style={{display: 'flex', width: `${100/parseInt(number)}%`}}>
            <div style={{padding: '5px', width: '50%'}}>
                <Skeleton variant="rect" height={200} borderRadius={4} />
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
        </div>)}
    </div>;
};

export default PostSkeleton;