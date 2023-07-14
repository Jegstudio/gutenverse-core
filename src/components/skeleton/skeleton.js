
import classname from 'classnames';

const Skeleton = ({ variant = 'rect', width = '100%', height = '10px', speed = 3, animation = 'wave', borderRadius = 0, className, styles = {} }) => {
    return (
        <span
            className={classname(['loading-skeleton', `skeleton-${variant}`, `animation-${animation}`, `speed-${speed}x`], className)}
            style={{
                width: width,
                height: height,
                borderRadius: variant === 'circle' ? '100%' : borderRadius,
                ...styles
            }}
        ></span>
    );
};

export default Skeleton;
