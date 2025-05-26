const textStyleFall = (props) => {
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
        translateY: [-100,0],
        easing: 'easeOutExpo',
        duration: animationDuration,
        opacity: [0,1],
        delay: (el, i) => 30 * i
    });

    if (loop) {
        animationRef.current.add({ //display
            targets: targetRef.current,
            delay: displayDuration
        });

        animationRef.current.add({
            targets: targetRef.current,
            translateY: [0,100],
            easing: 'easeInExpo',
            duration: transitionDuration,
            opacity: [1,0],
            delay: (el, i) => 30 * i
        });
    }
};

export default textStyleFall;