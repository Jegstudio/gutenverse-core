const textStyleFade = (props) => {
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
        opacity: [0, 1],
        easing: 'easeInOutQuad',
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
            opacity: [1, 0],
            easing: 'easeOutInQuad',
            duration: transitionDuration,
            delay: (el, i) => 70 * i,
        });
    }
};

export default textStyleFade;