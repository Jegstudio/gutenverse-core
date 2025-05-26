const textStylePop = (props) => {
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
        scale: [0.3, 1],
        opacity: [0, 1],
        translateZ: 0,
        easing: 'easeOutExpo',
        duration: animationDuration,
        delay: (el, i) => 70 * i
    });

    loop && animationRef.current.add({
        targets: targetRef.current,
        opacity: 0,
        duration: transitionDuration,
        easing: 'easeOutExpo',
        delay: displayDuration
    });
};

export default textStylePop;