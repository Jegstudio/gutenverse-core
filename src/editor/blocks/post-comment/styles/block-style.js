import { isNotEmpty } from 'gutenverse-core/helper';

const panelAvatarData = (elementId, attributes, data) => {

    isNotEmpty(attributes['avatarMargin']) && data.push({
        'type': 'dimension',
        'id': 'avatarMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .comment-author img.avatar`,
    });

    isNotEmpty(attributes['avatarBorder']) && data.push({
        'type': 'border',
        'id': 'avatarBorder',
        'selector': `.${elementId} .comment-author img.avatar`,
    });

    isNotEmpty(attributes['avatarBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'avatarBorderResponsive',
        'selector': `.${elementId} .comment-author img.avatar`,
    });

    return data;
}

const panelButtonData = (elementId, attributes, data) => {

    isNotEmpty(attributes['typographyButton']) && data.push({
        'type': 'typography',
        'id': 'typographyButton',
        'selector': `.${elementId}.guten-post-comment input[type=submit]`,
    });

    isNotEmpty(attributes['colorButton']) && data.push({
        'type': 'color',
        'id': 'colorButton',
        'selector': `.${elementId}.guten-post-comment input[type=submit]`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['bgcolorButton']) && data.push({
        'type': 'color',
        'id': 'bgcolorButton',
        'selector': `.${elementId}.guten-post-comment input[type=submit]`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ]
    });
    
    isNotEmpty(attributes['bggradientButton']) && data.push({
        'type': 'background',
        'id': 'bggradientButton',
        'selector': `.${elementId}.guten-post-comment input[type=submit]`,
    });
    
    isNotEmpty(attributes['borderButton']) && data.push({
        'type': 'border',
        'id': 'borderButton',
        'selector': `.${elementId}.guten-post-comment input[type=submit]`,
    });

    isNotEmpty(attributes['borderButtonResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderButtonResponsive',
        'selector': `.${elementId}.guten-post-comment input[type=submit]`,
    });
    
    isNotEmpty(attributes['marginButton']) && data.push({
        'type': 'dimension',
        'id': 'marginButton',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-post-comment input[type=submit]`,
    });

    isNotEmpty(attributes['paddingButton']) && data.push({
        'type': 'dimension',
        'id': 'paddingButton',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-post-comment input[type=submit]`,
    });
    
    isNotEmpty(attributes['colorButtonHover']) && data.push({
        'type': 'color',
        'id': 'colorButtonHover',
        'selector': `.${elementId}.guten-post-comment input[type=submit]:hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['bgcolorButtonHover']) && data.push({
        'type': 'color',
        'id': 'bgcolorButtonHover',
        'selector': `.${elementId}.guten-post-comment input[type=submit]:hover`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ]
    });
    
    isNotEmpty(attributes['bggradientButtonHover']) && data.push({
        'type': 'background',
        'id': 'bggradientButtonHover',
        'selector': `.${elementId}.guten-post-comment input[type=submit]:hover`,
    });
    
    isNotEmpty(attributes['borderButtonHover']) && data.push({
        'type': 'border',
        'id': 'borderButtonHover',
        'selector': `.${elementId}.guten-post-comment input[type=submit]:hover`,
    });

    isNotEmpty(attributes['borderButtonHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderButtonHoverResponsive',
        'selector': `.${elementId}.guten-post-comment input[type=submit]:hover`,
    });
    
    isNotEmpty(attributes['marginButtonHover']) && data.push({
        'type': 'dimension',
        'id': 'marginButtonHover',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-post-comment input[type=submit]:hover`,
    });

    isNotEmpty(attributes['paddingButtonHover']) && data.push({
        'type': 'dimension',
        'id': 'paddingButtonHover',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-post-comment input[type=submit]:hover`,
    });
    return data;
}

const panelInputData = (elementId, attributes, data) => {
    
    isNotEmpty(attributes['inputTypography']) && data.push({
        'type': 'typography',
        'id': 'inputTypography',
        'selector': `.${elementId} .comment-form input:not([type=submit]), .${elementId} .comment-form textarea`,
    });
    
    isNotEmpty(attributes['inputBorder']) && data.push({
        'type': 'border',
        'id': 'inputBorder',
        'selector': `.${elementId} .comment-form input:not([type=submit]), .${elementId} .comment-form textarea`,
    });

    isNotEmpty(attributes['inputBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'inputBorderResponsive',
        'selector': `.${elementId} .comment-form input:not([type=submit]), .${elementId} .comment-form textarea`,
    });
    
    isNotEmpty(attributes['inputMargin']) && data.push({
        'type': 'dimension',
        'id': 'inputMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .comment-form input:not([type=submit]), .${elementId} .comment-form textarea`,
    });

    isNotEmpty(attributes['inputPadding']) && data.push({
        'type': 'dimension',
        'id': 'inputPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .comment-form input:not([type=submit]), .${elementId} .comment-form textarea`,
    });
    
    isNotEmpty(attributes['inputColorNormal']) && data.push({
        'type': 'color',
        'id': 'inputColorNormal',
        'selector':`.${elementId} .comment-form input:not([type=submit]), .${elementId} .comment-form textarea`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['inputBgColorNormal']) && data.push({
        'type': 'color',
        'id': 'inputBgColorNormal',
        'selector':`.${elementId} .comment-form input:not([type=submit]), .${elementId} .comment-form textarea`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ]
    });
    
    isNotEmpty(attributes['inputColorHover']) && data.push({
        'type': 'color',
        'id': 'inputColorHover',
        'selector': `.${elementId} .comment-form input:not([type=submit]):hover, .${elementId} .comment-form textarea:hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['inputBgColorHover']) && data.push({
        'type': 'color',
        'id': 'inputBgColorHover',
        'selector': `.${elementId} .comment-form input:not([type=submit]):hover, .${elementId} .comment-form textarea:hover`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ]
    });
    
    isNotEmpty(attributes['inputColorFocus']) && data.push({
        'type': 'color',
        'id': 'inputColorFocus',
        'selector': `.${elementId} .comment-form input:not([type=submit]):focus, .${elementId} .comment-form textarea:focus, .${elementId} .comment-form input:not([type=submit]):focus-visible, .${elementId} .comment-form textarea:focus-visible`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['inputBgColorFocus']) && data.push({
        'type': 'color',
        'id': 'inputBgColorFocus',
        'selector': `.${elementId} .comment-form input:not([type=submit]):focus, .${elementId} .comment-form textarea:focus, .${elementId} .comment-form input:not([type=submit]):focus-visible, .${elementId} .comment-form textarea:focus-visible`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ]
    });
    
    isNotEmpty(attributes['inputAreaBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'inputAreaBoxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .comment-form input:not([type=submit],[type=checkbox]), .${elementId} .comment-form textarea`,
    });

    isNotEmpty(attributes['inputAreaBoxShadowHover']) && data.push({
        'type': 'boxShadow',
        'id': 'inputAreaBoxShadowHover',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .comment-form input:not([type=submit],[type=checkbox]):hover, .${elementId} .comment-form textarea:hover`,
    });
    return data;
}

const panelMainCommentData = (elementId, attributes, data) => {
    
    isNotEmpty(attributes['mainContainerBgColor']) && data.push({
        'type': 'color',
        'id': 'mainContainerBgColor',
        'selector': `.${elementId} .commentlist .comment.depth-1`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['mainContainerMargin']) && data.push({
        'type': 'dimension',
        'id': 'mainContainerMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .commentlist .comment.depth-1`,
    });

    isNotEmpty(attributes['mainContainerPadding']) && data.push({
        'type': 'dimension',
        'id': 'mainContainerPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .commentlist .comment.depth-1`,
    });
    
    isNotEmpty(attributes['mainContainerBorder']) && data.push({
        'type': 'borderResponsive',
        'id': 'mainContainerBorder',
        'selector': `.${elementId} .commentlist .comment.depth-1`,
    });
    
    isNotEmpty(attributes['mainBgColor']) && data.push({
        'type': 'color',
        'id': 'mainBgColor',
        'selector': `.${elementId} .commentlist .comment.depth-1 > .comment-body`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['mainMargin']) && data.push({
        'type': 'dimension',
        'id': 'mainMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .commentlist .comment.depth-1 > .comment-body`,
    });

    isNotEmpty(attributes['mainPadding']) && data.push({
        'type': 'dimension',
        'id': 'mainPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .commentlist .comment.depth-1 > .comment-body`,
    });
    
    isNotEmpty(attributes['mainBorder']) && data.push({
        'type': 'borderResponsive',
        'id': 'mainBorder',
        'selector': `.${elementId} .commentlist .comment.depth-1 > .comment-body`,
    });

    return data;
}

const panelReplyData = (elementId, attributes, data) => {
    
    isNotEmpty(attributes['replyBgColor']) && data.push({
        'type': 'color',
        'id': 'replyBgColor',
        'selector': `.${elementId} .commentlist .comment .children`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['replyMargin']) && data.push({
        'type': 'dimension',
        'id': 'replyMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .commentlist .comment .children`,
    });

    isNotEmpty(attributes['replyPadding']) && data.push({
        'type': 'dimension',
        'id': 'replyPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .commentlist .comment .children`,
    });
    
    isNotEmpty(attributes['replyBorder']) && data.push({
        'type': 'borderResponsive',
        'id': 'replyBorder',
        'selector': `.${elementId} .commentlist .comment .children`,
    });

    return data;
}

const panelTypographyHeadingData = (elementId, attributes, data) => {
    
    isNotEmpty(attributes['typographyHeading']) && data.push({
        'type': 'typography',
        'id': 'typographyHeading',
        'selector': `.${elementId} h1, .${elementId} h2, .${elementId} h3, .${elementId} h4, .${elementId} h5, .${elementId} h6`,
    });
    
    isNotEmpty(attributes['colorHeading']) && data.push({
        'type': 'color',
        'id': 'colorHeading',
        'selector': `.${elementId} h1, .${elementId} h2, .${elementId} h3, .${elementId} h4, .${elementId} h5, .${elementId} h6`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['marginHeading']) && data.push({
        'type': 'dimension',
        'id': 'marginHeading',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} h1, .${elementId} h2, .${elementId} h3, .${elementId} h4, .${elementId} h5, .${elementId} h6, .${elementId} .comment-reply-title`,
    });
    
    isNotEmpty(attributes['typographyCommentTitle']) && data.push({
        'type': 'typography',
        'id': 'typographyCommentTitle',
        'selector': `.${elementId} .guten-post-comment-title p`,
    });
    
    isNotEmpty(attributes['colorCommentTitle']) && data.push({
        'type': 'color',
        'id': 'colorCommentTitle',
        'selector': `.${elementId} .guten-post-comment-title p`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['marginCommentTitle']) && data.push({
        'type': 'dimension',
        'id': 'marginCommentTitle',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-post-comment-title`,
    });
    isNotEmpty(attributes['commentCountTypography']) && data.push({
        'type': 'typography',
        'id': 'commentCountTypography',
        'selector': `.${elementId} .guten-post-comment-title p span.comment-count`,
    });
    
    isNotEmpty(attributes['commentCountColor']) && data.push({
        'type': 'color',
        'id': 'commentCountColor',
        'selector': `.${elementId} .guten-post-comment-title p span.comment-count`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });
    
    isNotEmpty(attributes['postTitleTypography']) && data.push({
        'type': 'typography',
        'id': 'postTitleTypography',
        'selector': `.${elementId} .guten-post-comment-title p span.comment-post-title`,
    });
    
    isNotEmpty(attributes['postTitleColor']) && data.push({
        'type': 'color',
        'id': 'postTitleColor',
        'selector': `.${elementId} .guten-post-comment-title p span.comment-post-title`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    return data;
}

const panelTypographyLabelData = (elementId, attributes, data) => {
    
    isNotEmpty(attributes['typographyLabel']) && data.push({
        'type': 'typography',
        'id': 'typographyLabel',
        'selector': `.${elementId} label`,
    });
    
    isNotEmpty(attributes['colorLabel']) && data.push({
        'type': 'color',
        'id': 'colorLabel',
        'selector': `.${elementId} label`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['colorRequired']) && data.push({
        'type': 'color',
        'id': 'colorRequired',
        'selector': `.${elementId} label span`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['marginLabel']) && data.push({
        'type': 'dimension',
        'id': 'marginLabel',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} label, .${elementId} .comment-form-author label, .${elementId} .comment-form-comment label, .${elementId} .comment-form-email label, .${elementId} .comment-form-url label`,
    });

    return data;
}

const panelTypographyLlinkData = (elementId, attributes, data) => {
    
    isNotEmpty(attributes['typographyLink']) && data.push({
        'type': 'typography',
        'id': 'typographyLink',
        'selector': `.${elementId} .comment-form a`,
    });
    
    isNotEmpty(attributes['colorLink']) && data.push({
        'type': 'color',
        'id': 'colorLink',
        'selector': `.${elementId} .comment-form a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['marginLink']) && data.push({
        'type': 'dimension',
        'id': 'marginLink',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .comment-form a`,
    });
    
    isNotEmpty(attributes['userNameTypography']) && data.push({
        'type': 'typography',
        'id': 'userNameTypography',
        'selector': `.${elementId} .commentlist b.fn a.url`,
    });
    
    isNotEmpty(attributes['userNameColor']) && data.push({
        'type': 'color',
        'id': 'userNameColor',
        'selector': `.${elementId} .commentlist b.fn a.url`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['dateTypography']) && data.push({
        'type': 'typography',
        'id': 'dateTypography',
        'selector': `.${elementId} .commentlist .comment-metadata a time`,
    });
    
    isNotEmpty(attributes['dateColor']) && data.push({
        'type': 'color',
        'id': 'dateColor',
        'selector': `.${elementId} .commentlist .comment-metadata a time`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });
    
    isNotEmpty(attributes['replyLinkTypography']) && data.push({
        'type': 'typography',
        'id': 'replyLinkTypography',
        'selector': `.${elementId} .commentlist .reply .comment-reply-link`,
    });
    
    isNotEmpty(attributes['replyLinkColor']) && data.push({
        'type': 'color',
        'id': 'replyLinkColor',
        'selector': `.${elementId} .commentlist .reply .comment-reply-link`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    return data;
}

const panelTypographyTextData = (elementId, attributes, data) => {
    
    isNotEmpty(attributes['typographyText']) && data.push({
        'type': 'typography',
        'id': 'typographyText',
        'selector': `.${elementId} .comment-form p`,
    });
    
    isNotEmpty(attributes['colorText']) && data.push({
        'type': 'color',
        'id': 'colorText',
        'selector': `.${elementId} .comment-form p`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['marginText']) && data.push({
        'type': 'dimension',
        'id': 'marginText',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .comment-form p`,
    });
    
    isNotEmpty(attributes['typographyTextList']) && data.push({
        'type': 'typography',
        'id': 'typographyTextList',
        'selector': `.${elementId} .commentlist .comment p`,
    });
    
    isNotEmpty(attributes['colorTextList']) && data.push({
        'type': 'color',
        'id': 'colorTextList',
        'selector': `.${elementId} .commentlist p`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['marginTextList']) && data.push({
        'type': 'dimension',
        'id': 'marginTextList',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .commentlist .comment p`,
    });
    
    isNotEmpty(attributes['suffixTypography']) && data.push({
        'type': 'typography',
        'id': 'suffixTypography',
        'selector': `.${elementId} span.says`,
    });
    
    isNotEmpty(attributes['suffixColor']) && data.push({
        'type': 'color',
        'id': 'suffixColor',
        'selector': `.${elementId} span.says`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['suffixMargin']) && data.push({
        'type': 'dimension',
        'id': 'suffixMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} span.says`,
    });
    
    return data;
}

const getBlockStyle = (elementId, attributes) => {
    let data = [];

    //panel avatar
    data = panelAvatarData(elementId, attributes, data);
    //panel button
    data = panelButtonData(elementId, attributes, data);
    //panel input
    data = panelInputData(elementId, attributes, data);
    //panel main comment
    data = panelMainCommentData(elementId, attributes, data);
    //panel reply
    data = panelReplyData(elementId, attributes, data);
    //panel typography heading
    data = panelTypographyHeadingData(elementId, attributes, data);
    //panel typography label
    data = panelTypographyLabelData(elementId, attributes, data);
    //panel typography link
    data = panelTypographyLlinkData(elementId, attributes, data);
    //panel typography text
    data = panelTypographyTextData(elementId, attributes, data);

    /**Panel List */
    isNotEmpty(attributes['background']) && data.push({
        'type': 'background',
        'id': 'background',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    isNotEmpty(attributes['backgroundHover']) && data.push({
        'type': 'background',
        'id': 'backgroundHover',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}:hover`,
    });

    isNotEmpty(attributes['border']) && data.push({
        'type': 'border',
        'id': 'border',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    isNotEmpty(attributes['borderHover']) && data.push({
        'type': 'border',
        'id': 'borderHover',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}:hover`,
    });

    isNotEmpty(attributes['borderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsive',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    isNotEmpty(attributes['borderResponsiveHover']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsiveHover',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}:hover`,
    });

    isNotEmpty(attributes['boxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    isNotEmpty(attributes['boxShadowHover']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadowHover',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}:hover`,
    });

    isNotEmpty(attributes['mask']) && data.push({
        'type': 'mask',
        'id': 'mask',
        'responsive': true,
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    isNotEmpty(attributes['padding']) && data.push({
        'type': 'dimension',
        'id': 'padding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    isNotEmpty(attributes['margin']) && data.push({
        'type': 'dimension',
        'id': 'margin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    isNotEmpty(attributes['zIndex']) && data.push({
        'type': 'plain',
        'id': 'zIndex',
        'responsive': true,
        'properties': [
            {
                'name': 'z-index',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    isNotEmpty(attributes['animation']) && isNotEmpty(attributes['animation']['delay']) && data.push({
        'type': 'plain',
        'id': 'animation',
        'properties': [
            {
                'name': 'animation-delay',
                'valueType': 'pattern',
                'pattern': '{value}ms',
                'patternValues': {
                    'value': {
                        'type': 'attribute',
                        'key': 'delay',
                    },

                }
            }
        ],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    //Positioning Panel
    isNotEmpty(attributes['positioningType']) && data.push(
        {
            'type': 'positioning',
            'id': 'positioningType',
            'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
            'skipDeviceType': 'first',
            'attributeType': 'type',
            'multiAttr': {
                'positioningType': attributes['positioningType'],
                'inBlock': attributes['inBlock']
            }
        },
    );
    isNotEmpty(attributes['positioningType']) && isNotEmpty(attributes['positioningWidth']) && data.push(
        {
            'type': 'positioning',
            'id': 'positioningType',
            'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
            'skipDeviceType': 'second',
            'attributeType': 'type',
            'multiAttr': {
                'positioningWidth': attributes['positioningWidth'],
                'positioningType': attributes['positioningType'],
                'inBlock': attributes['inBlock']
            }
        }
    );
    isNotEmpty(attributes['positioningWidth']) && isNotEmpty(attributes['positioningType']) && data.push({
        'type': 'positioning',
        'id': 'positioningWidth',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
        'skipDeviceType': 'first',
        'attributeType': 'width',
        'multiAttr': {
            'positioningWidth': attributes['positioningWidth'],
            'positioningType': attributes['positioningType'],
            'inBlock': attributes['inBlock']
        }
    });
    isNotEmpty(attributes['positioningAlign']) && data.push({
        'type': 'plain',
        'id': 'positioningAlign',
        'responsive': true,
        'properties': [
            {
                'name' : 'align-self',
                'valueType' : 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    },
    {
        'type': 'positioning',
        'id': 'positioningAlign',
        'property': ['vertical-align'],
        'attributeType': 'align',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });
    isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'plain',
        'id': 'positioningLocation',
        'properties': [
            {
                'name' : 'position',
                'valueType' : 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });
    isNotEmpty(attributes['positioningLeft']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningLeft',
        'property': ['left'],
        'responsive': true,
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
        'attributeType': 'custom',
    });
    isNotEmpty(attributes['positioningRight']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningRight',
        'property': ['right'],
        'responsive': true,
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
        'attributeType': 'custom',
    });
    isNotEmpty(attributes['positioningTop']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningTop',
        'property': ['top'],
        'responsive': true,
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
        'attributeType': 'custom',
    });
    isNotEmpty(attributes['positioningBottom']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningBottom',
        'property': ['bottom'],
        'responsive': true,
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
        'attributeType': 'custom',
    });
    return data;
};


export default getBlockStyle;