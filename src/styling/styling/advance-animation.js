export const renderAnimation = ({ action, elementId, animationType, customOptions, blockType, deviceType, selector }) => {
    let animation = '';
    let animationDelay = 0;
    let animationDuration = 1;

    const {
        ease,
        type,
        timeline,
        delay,
        duration
    } = action;

    if (animationType === 'scroll') {
        // Delaying and decrease duration if timeline start is set
        animationDelay = Number(timeline.start || 0) / 100;
        animationDuration -= animationDelay;

        // Calculate duration based on distance between start and end timeline
        // Make sure the end timeline value is higher than the start timeline
        if (Number(timeline.end || 0) > Number(timeline.start || 0)) {
            animationDuration = (Number(timeline.end || 0) - Number(timeline.start || 0)) / 100;
        }
    } else if (animationType === 'page') {
        animationDelay = Number(delay || 0);
        animationDuration = Number(duration || 0);
    }

    if (! selector) {
        selector = blockType !== 'gutenverse/section' ? `.${elementId}` : `.section-wrapper[data-id="${elementId?.split('-')[1]}"]`;
    }

    const from = {};

    const to = {
        ease,
        delay: animationDelay,
        duration: animationDuration
    };

    const animationProps = {
        action,
        from,
        to,
        selector,
        deviceType,
        elementId
    };

    switch (type) {
        case 'move':
            animation = renderAnimationMove(animationProps);
            break;
        case 'rotate':
            animation = renderAnimationRotate(animationProps);
            break;
        case 'scale':
            animation = renderAnimationScale(animationProps);
            break;
        case 'skew':
            animation = renderAnimationSkew(animationProps);
            break;
        case 'opacity':
            animation = renderAnimationOpacity(animationProps);
            break;
        case 'custom':
        default:
            animation = renderAnimationCustom({ ...animationProps, options: customOptions });
            break;
    }

    return animation;
};

const renderAnimationCustom = ({ action, from, to, options, deviceType, elementId }) => {
    let animation = [];

    const { type } = action;
    const findCustom = options.find(opt => opt.value === type);

    if (findCustom && findCustom.render) {
        animation = findCustom.render({ action, from, to, device: deviceType, elementId });
    }

    return animation;
};

const renderAnimationMove = ({ action, from, to, selector }) => {
    const {
        moveXFrom,
        moveYFrom,
        moveZFrom,
        moveXTo,
        moveYTo,
        moveZTo
    } = action;

    if (moveXFrom && moveXFrom.point !== '' && moveXFrom.point !== undefined) {
        from['x'] = `${moveXFrom.point}${moveXFrom.unit}`;
    }

    if (moveYFrom && moveYFrom.point !== '' && moveYFrom.point !== undefined) {
        from['y'] = `${moveYFrom.point}${moveYFrom.unit}`;
    }

    if (moveZFrom && moveZFrom.point !== '' && moveZFrom.point !== undefined) {
        from['z'] = `${moveZFrom.point}${moveZFrom.unit}`;
    }

    to['x'] = `${moveXTo && moveXTo.point !== '' && moveXTo.point !== undefined ? moveXTo.point : 0}${moveXTo?.unit || 'px'}`;
    to['y'] = `${moveYTo && moveYTo.point !== '' && moveYTo.point !== undefined ? moveYTo.point : 0}${moveYTo?.unit || 'px'}`;
    to['z'] = `${moveZTo && moveZTo.point !== '' && moveZTo.point !== undefined ? moveZTo.point : 0}${moveZTo?.unit || 'px'}`;

    return [{ selector, from, to }];
};

const renderAnimationRotate = ({ action, from, to, selector }) => {
    const {
        rotateXFrom,
        rotateYFrom,
        rotateZFrom,
        rotateXTo,
        rotateYTo,
        rotateZTo
    } = action;

    if (rotateXFrom && rotateXFrom.point !== '' && rotateXFrom.point !== undefined) {
        from['rotationX'] = `${rotateXFrom.point}${rotateXFrom.unit}`;
    }

    if (rotateYFrom && rotateYFrom.point !== '' && rotateYFrom.point !== undefined) {
        from['rotationY'] = `${rotateYFrom.point}${rotateYFrom.unit}`;
    }

    if (rotateZFrom && rotateZFrom.point !== '' && rotateZFrom.point !== undefined) {
        from['rotationZ'] = `${rotateZFrom.point}${rotateZFrom.unit}`;
    }

    to['rotationX'] = `${rotateXTo && rotateXTo.point !== '' && rotateXTo.point !== undefined ? rotateXTo.point : 0}${rotateXTo?.unit || 'deg'}`;
    to['rotationY'] = `${rotateYTo && rotateYTo.point !== '' && rotateYTo.point !== undefined ? rotateYTo.point : 0}${rotateYTo?.unit || 'deg'}`;
    to['rotationZ'] = `${rotateZTo && rotateZTo.point !== '' && rotateZTo.point !== undefined ? rotateZTo.point : 0}${rotateZTo?.unit || 'deg'}`;

    return [{ selector, from, to }];
};

const renderAnimationScale = ({ action, from, to, selector }) => {
    const {
        scaleXFrom,
        scaleYFrom,
        scaleXTo,
        scaleYTo,
    } = action;

    if (scaleXFrom && scaleXFrom.point !== '' && scaleXFrom.point !== undefined) {
        from['scaleX'] = scaleXFrom.point;
    }

    if (scaleYFrom && scaleYFrom.point !== '' && scaleYFrom.point !== undefined) {
        from['scaleY'] = scaleYFrom.point;
    }

    to['scaleX'] = scaleXTo && scaleXTo.point !== '' && scaleXTo.point !== undefined ? scaleXTo.point : 1;
    to['scaleY'] = scaleYTo && scaleYTo.point !== '' && scaleYTo.point !== undefined ? scaleYTo.point : 1;

    return [{ selector, from, to }];
};

const renderAnimationSkew = ({ action, from, to, selector }) => {
    const {
        skewXFrom,
        skewYFrom,
        skewXTo,
        skewYTo,
    } = action;

    if (skewXFrom && skewXFrom.point !== '' && skewXFrom.point !== undefined) {
        from['skewX'] = `${skewXFrom.point}${skewXFrom.unit}`;
    }

    if (skewYFrom && skewYFrom.point !== '' && skewYFrom.point !== undefined) {
        from['skewY'] = `${skewYFrom.point}${skewYFrom.unit}`;
    }

    to['skewX'] = `${skewXTo && skewXTo.point !== '' && skewXTo.point !== undefined ? skewXTo.point : 0}${skewXTo?.unit || 'deg'}`;
    to['skewY'] = `${skewYTo && skewYTo.point !== '' && skewYTo.point !== undefined ? skewYTo.point : 0}${skewYTo?.unit || 'deg'}`;

    return [{ selector, from, to }];
};

const renderAnimationOpacity = ({ action, from, to, selector }) => {
    const {
        opacityFrom,
        opacityTo,
    } = action;

    if (opacityFrom && opacityFrom.point !== '' && opacityFrom.point !== undefined) {
        from['opacity'] = `${opacityFrom.point}${opacityFrom.unit}`;
    }

    to['opacity'] = `${opacityTo && opacityTo.point !== '' && opacityTo.point !== undefined ? opacityTo.point : 100}${opacityTo?.unit || '%'}`;

    return [{ selector, from, to }];
};
