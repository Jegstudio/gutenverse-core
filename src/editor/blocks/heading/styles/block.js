const getBlockStyle = (elementId) => {
    return [
        {
            'type': 'plain',
            'id': 'textAlign',
            'selector': `.${elementId}`,
            'property': ['text-align'],
            'responsive': true,
        },
        {
            'type': 'color',
            'id': 'color',
            'selector': `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId}`,
            'property': ['color'],
        },
        {
            'type': 'typography',
            'id': 'typography',
            'selector': `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId}`,
        },
        {
            'type': 'textShadow',
            'id': 'textShadow',
            'property': ['text-shadow'],
            'selector': `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId}`,
        },
        {
            'type': 'textStroke',
            'id': 'textStroke',
            'selector': `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId}`,
        },
        {
            'type': 'plain',
            'id': 'overflowWrap',
            'responsive': true,
            'property': ['overflow-wrap', 'word-break'],
            'selector': `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId}`,
        },
        {
            'type': 'background',
            'id': 'background',
            'selector': `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId}`,
        },
        {
            'type': 'background',
            'id': 'backgroundHover',
            'selector': `h1.guten-element.${elementId}:hover,h2.guten-element.${elementId}:hover,h3.guten-element.${elementId}:hover,h4.guten-element.${elementId}:hover,h5.guten-element.${elementId}:hover,h6.guten-element.${elementId}:hover`,
        },
        {
            'type': 'border',
            'id': 'border',
            'selector': `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId}`,
        },
        {
            'type': 'border',
            'id': 'borderHover',
            'selector': `h1.guten-element.${elementId}:hover,h2.guten-element.${elementId}:hover,h3.guten-element.${elementId}:hover,h4.guten-element.${elementId}:hover,h5.guten-element.${elementId}:hover,h6.guten-element.${elementId}:hover`,
        },
        {
            'type': 'borderResponsive',
            'id': 'borderResponsive',
            'selector': `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId}`,
        },
        {
            'type': 'borderResponsive',
            'id': 'borderResponsiveHover',
            'selector': `h1.guten-element.${elementId}:hover,h2.guten-element.${elementId}:hover,h3.guten-element.${elementId}:hover,h4.guten-element.${elementId}:hover,h5.guten-element.${elementId}:hover,h6.guten-element.${elementId}:hover`,
        },
    ];
};


export default getBlockStyle;