const textStyleDrop = (props) => {
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
        scale: [0, 1],
        duration: animationDuration,
        elasticity: 600,
        delay: (el, i) => 45 * (i+1)
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

export default textStyleDrop;