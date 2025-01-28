const getBlockStyle = (elementId) => {
    return [
        {
            'type': 'plain',
            'id': 'textAlign',
            'selector': `.${elementId}`,
            'property': 'text-align',
            'responsive': true,
        },
        {
            'type': 'color',
            'id': 'color',
            'selector': `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId}`,
            'property': 'color',
        },
        {
            'type': 'typography',
            'id': 'typography',
            'selector': `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId}`,
        },
    ];
};


export default getBlockStyle;