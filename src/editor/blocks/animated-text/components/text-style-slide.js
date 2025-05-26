const textStyleSlide = (props) => {
    const {
        loop,
        animationRef,
        targetRef,
        animationDuration,
        displayDuration,
        transitionDuration,
        isRotationType,
        stopRotating,
        nextRotationText,
    } = props;

    animationRef.current.add({
        targets: targetRef.current,
        translateX: [40,0],
        translateZ: 0,
        opacity: [0,1],
        easing: 'easeOutExpo',
        duration: animationDuration,
        delay: (el, i) => 500 + 30 * i
    });

    if (loop || isRotationType) {
        if (isRotationType && stopRotating()) {
            return;
        }

        animationRef.current.add({ //display
            targets: targetRef.current,
            delay: displayDuration
        });
        animationRef.current.add({
            targets: targetRef.current,
            translateX: [0,-30],
            opacity: [1,0],
            easing: 'easeInExpo',
            duration: transitionDuration,
            delay: (el, i) => 100 + 30 * i,
            complete: () => {
                if (isRotationType) {
                    nextRotationText();
                }
            }
        });
    }
};

export default textStyleSlide;