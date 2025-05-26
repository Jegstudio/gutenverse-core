const textStyleZoom = (props) => {
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
        scale: [4, 1],
        opacity: [0, 1],
        translateZ: 0,
        easing: 'easeOutExpo',
        duration: animationDuration,
        delay: (el, i) => 70 * i,
    });

    if (loop) {
        animationRef.current.add({ //display
            targets: targetRef.current,
            delay: displayDuration
        });

        animationRef.current.add({
            targets: targetRef.current,
            scale: [1, 0],
            opacity: [1, 0],
            translateZ: 0,
            easing: 'easeInExpo',
            duration: transitionDuration,
            delay: (el, i) => 70 * i,
        });
    }
};

export default textStyleZoom;