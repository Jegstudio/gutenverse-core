const textStyleFlip = (props) => {
    const {
        loop,
        animation,
        target,
        animationDuration,
        displayDuration,
        transitionDuration,
        isRotationType,
        stopRotating,
        nextRotationText,
    } = props;

    animation.add({
        targets: target,
        rotateY: [-90, 0],
        duration: animationDuration,
        delay: (el, i) => 45 * i
    });

    if (loop || isRotationType) {
        if (isRotationType && stopRotating()) {
            return;
        }

        animation.add({
            targets: target,
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