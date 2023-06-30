const useAnimationAdvanceData = ({ elementId, advanceAnimation = {}}) => {
    const {
        type,
    } = advanceAnimation;

    let data = {};
    const id = elementId && elementId.split('-')[1];

    if (type) {
        data['data-id'] = id;
    }

    return data;
};

export default useAnimationAdvanceData;