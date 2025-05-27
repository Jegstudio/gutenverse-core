const textStyleFlip = (props) => {
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
        rotateY: [-90, 0],
        duration: animationDuration,
        delay: (el, i) => 45 * i
    });

    if (loop || isRotationType) {
        if (isRotationType && stopRotating()) {
            return;
        }

        animationRef.current.add({
            targets: targetRef.current,
            opacity: 0,
            duration: transitionDuration,
            easing: 'easeOutExpo',
            delay: displayDuration,
            complete: () => {
                if (isRotationType) {
                    nextRotationText();
                }
            },
        });
    }
};

export default textStyleFlip;