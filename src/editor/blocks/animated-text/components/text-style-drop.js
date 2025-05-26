const textStyleDrop = (props) => {
    const {
        loop,
        animationRef,
        targetRef,
        animationDuration,
        displayDuration,
        transitionDuration,
    } = props;

    animationRef.current.add({
        targets: targetRef.current,
        scale: [0, 1],
        duration: animationDuration,
        elasticity: 600,
        delay: (el, i) => 45 * (i+1)
    });

    loop && animationRef.current.add({
        targets: targetRef.current,
        opacity: 0,
        duration: transitionDuration,
        easing: 'easeOutExpo',
        delay: displayDuration
    });
};

export default textStyleDrop;