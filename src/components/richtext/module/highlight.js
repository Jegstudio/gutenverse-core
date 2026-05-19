
import u from 'umbrellajs';
import { cryptoRandomString } from 'gutenverse-core/components';
import { useEffect, useState } from '@wordpress/element';

export const highlight = (props) => {
    const {
        attributes,
        setAttributes,
        setPanelState,
        contentAttribute,
        tagName,
        panelPosition,
        textChilds
    } = props;

    const content = attributes[contentAttribute];
    const [lastChildLength, setLastChildLength] = useState(attributes[textChilds].length);

    const getListOfChildTag = (content) => {
        const fakeContent = document.createElement(tagName);
        fakeContent.innerHTML = content;
        const newElement = u(fakeContent).children().map((child) => {
            const newChild = u(child).children().map(grandChild => {
                if (u(grandChild).nodes[0].localName === 'span' && u(grandChild).hasClass('guten-text-highlight')) {
                    // read data style from child.
                    const styleDataStr = u(child).data('guten-highlight-style');
                    let styleData = {};
                    if (styleDataStr !== '') {
                        try {
                            styleData = JSON.parse(styleDataStr);
                        }catch {
                            styleData = {};
                        }
                    }
                    let spanId = u(child).attr('id');
                    let id = u(grandChild).attr('id');

                    return {
                        color: {},
                        colorHover: {},
                        typography: {},
                        typographyHover: {},
                        textClip: {},
                        textClipHover: {},
                        textStroke: {},
                        textStrokeHover: {},
                        background: {},
                        backgroundHover: {},
                        padding: {},
                        paddingHover: {},
                        margin: {},
                        marginHover: {},
                        value: child,
                        id,
                        spanId,
                        ...styleData,
                    };
                }
            });
            return newChild;
        });
        return newElement.nodes;
    };

    useEffect(() => {
        setLastChildLength(attributes[textChilds].length);
    }, [attributes[textChilds]]);

    useEffect(() => {
        const child = getListOfChildTag(content);
        let childs = attributes[textChilds];
        if (attributes[contentAttribute]) {
            let anyChange = 0;
            const newChild = child.map(element => {
                const indexExist = childs.findIndex(item => element.id === item.id);
                if (indexExist !== -1) {
                    return childs[indexExist];
                } else {
                    anyChange += 1;
                    return element;
                }
            });
            if (anyChange > 0 || newChild.length !== childs.length) {
                setAttributes({ [textChilds]: newChild });
            }
        }
        if (lastChildLength !== attributes[textChilds].length && lastChildLength < attributes[textChilds].length) {
            setPanelState({ ...panelPosition, randKey: Math.random() });
        }
    }, [content]);

    useEffect(() => {
        const newDiv = document.createElement('div');
        newDiv.innerHTML = content;
        const contentArray = [];
        newDiv.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                contentArray.push(node.textContent);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                contentArray.push(node.outerHTML);
            }
        });
        const existingIds = [];
        const newValue = contentArray.map(element => {
            const regex = /id="([^"]+)"/;
            const match = element.match(regex);
            let index = element.indexOf('>');
            if (!match && index !== -1) {
                let part1 = element.slice(1, index);
                let tagHtml = part1.split(' ');
                let child = element;
                if (tagHtml[0] === 'span' && tagHtml[1].search('guten-text-highlight')) {
                    const uniqeidChild = 'guten-' + cryptoRandomString({ length: 6, type: 'alphanumeric' });
                    const uniqeidSpan = 'guten-' + cryptoRandomString({ length: 6, type: 'alphanumeric' });
                    child = `<span id=${uniqeidSpan}>` + element.replace(`<${part1}>`, `<${part1} id=${uniqeidChild}>`) + '</span>';
                    setAttributes({ openChild: uniqeidChild });
                }
                return child;
            } else {
                let child = element;
                const id = match?.[1];
                if (id) {
                    const exists = attributes?.[textChilds].filter((el => el?.['spanId'] === id)) ?? [];
                    if (exists.length > 0) {
                        const spanAttrs = exists[0];
                        const { ariaLabel = '' } = spanAttrs;
                        child = child.replace(
                            /<a\b([^>]*)>(.*?)<\/a>/gi,
                            (match, attrs, text) => {
                                if (ariaLabel === '') {
                                    const cleanedAttrs = attrs.replace(
                                        /\s*aria-label=(["'])(.*?)\1/i,
                                        ''
                                    );
                                    return `<a${cleanedAttrs}>${text}</a>`;
                                }
                                if (/aria-label=/i.test(attrs)) {
                                    return `<a${attrs.replace(
                                        /aria-label=(["'])(.*?)\1/i,
                                        `aria-label="${ariaLabel.trim()
                                        }"`
                                    )}>${text}</a>`;
                                }

                                return `<a${attrs} aria-label="${ariaLabel.trim()}">${text}</a>`;
                            }
                        );
                    }
                    // handle duplicated id from copied highlighted text.
                    if (existingIds.includes(id)) {
                        const uniqeidChild = 'guten-' + cryptoRandomString({ length: 6, type: 'alphanumeric' });
                        const uniqeidSpan = 'guten-' + cryptoRandomString({ length: 6, type: 'alphanumeric' });

                        let count = 0;
                        child = child.replace(
                            /id="[^"]*"/g,
                            function() {
                                count++;

                                if (count === 1) {
                                    return `id="${uniqeidSpan}"`;
                                }

                                if (count === 2) {
                                    return `id="${uniqeidChild}"`;
                                }

                                return arguments[0];
                            }
                        );
                    }
                    // add styling attributes to highlight span.
                    const style = (attributes?.[textChilds] ? attributes[textChilds] : []).filter((item) => item?.spanId === id);
                    if (style.length === 1) {
                        const spanStyle = style[0];
                        const filteredAttributes = Object.fromEntries(
                            Object.entries(spanStyle).filter(function(entry) {
                                return entry[0] !== 'id' && entry[0] !== 'spanId' && entry[0] !== '_key' && entry[0] !== 'value';
                            })
                        );
                        const encoded = JSON.stringify(filteredAttributes);
                        if (/data-guten-highlight-style=/.test(child)) {
                            child = child.replace(
                                /data-guten-highlight-style=["'][^"']*["']/i,
                                `data-guten-highlight-style='${encoded}'`
                            );
                        } else {
                            child = child.replace(
                                /(<span\b[^>]*id=["'][^"']*["'])/i,
                                `$1 data-guten-highlight-style='${encoded}'`
                            );
                        }
                    }
                    existingIds.push(id);
                }
                return child;
            }
        });
        const newContent = newValue.join('');
        if (newContent !== content) {
            setAttributes({ [contentAttribute]: newContent });
        }
    }, [content, attributes[textChilds]]);
};