import { directionStartEndPoint, gradientDefault } from 'gutenverse-core/helper';

export const ShapeDivGradient = (props) => {
    const {
        colorMode,
        color0,
        color1,
        color2,
        gradientColor0 = gradientDefault(),
        gradientColor1 = gradientDefault(),
        gradientColor2 = gradientDefault(),
        gradientAngle0,
        gradientAngle1,
        gradientAngle2
    } = props;

    const width = 1920;
    const height = 1080;
    const ty = colorMode === 'gradient' ? 'gf' : 'fl';

    let startPoint, endPoint, gradientColor, gradientOpacity;

    let colorK0 = [ 0.525, 0.89, 0.808 ];
    let colorK1 = [ 1, 0.867, 0.58 ];
    let colorK2 = [ 0.525, 0.89, 0.808 ];

    let opacity0 = [ 100 ];
    let opacity1 = [ 100 ];
    let opacity2 = [ 100 ];

    let angleStart0 = [ 0, 0 ];
    let angleStart1 = [ 0, 0 ];
    let angleStart2 = [ 0, 0 ];

    let angleEnd0 = [ 0, 0 ];
    let angleEnd1 = [ 0, 0 ];
    let angleEnd2 = [ 0, 0 ];

    let maxGradient = 2;
    let i = 0;

    if (colorMode === 'default') {
        if (color0) {
            colorK0 = [ color0.r / 255, color0.g / 255, color0.b / 255, 1 ];
            opacity0 = [ color0.a * 100 ];
        }

        if (color1) {
            colorK1 = [color1.r / 255, color1.g / 255, color1.b / 255, 1];
            opacity1 = [ color1.a * 100 ];
        }

        if (color2) {
            colorK2 = [color2.r / 255, color2.g / 255, color2.b / 255, 1];
            opacity2 = [ color2.a * 100 ];
        }
    } else if (colorMode === 'gradient') {
        maxGradient = Math.max(gradientColor0.length, gradientColor1.length, gradientColor2.length);

        colorK0 = [];
        colorK1 = [];
        colorK2 = [];

        if (gradientColor0) {
            gradientColor = [];
            gradientOpacity = [];

            gradientColor0.map((grad) => {
                const gradArray = grad.color
                    .replace(/[^\d,]/g, '')
                    .split(',')
                    .map((g) => parseFloat(g));

                gradientColor = [ ...gradientColor, parseFloat(grad.offset) ];
                gradientColor = [ ...gradientColor, gradArray[0] / 255, gradArray[1] / 255, gradArray[2] / 255 ];
                gradientOpacity = [ ...gradientOpacity, parseFloat(grad.offset), grad.opacity || 1 ];
            });

            for (i = 0; i < maxGradient - (gradientColor.length / 4); i++) {
                gradientColor = [ ...gradientColor, 1, 1, 1, 1 ];
                gradientOpacity = [ ...gradientOpacity, 1, 0 ];
            }

            ({ startPoint, endPoint } = directionStartEndPoint(gradientAngle0 || 0));

            angleStart0 = [ startPoint.x * width, startPoint.y * height ];
            angleEnd0 = [ endPoint.x * width, endPoint.y * height ];

            colorK0 = [ ...gradientColor, ...gradientOpacity ];
        }

        if (gradientColor1) {
            gradientColor = [];
            gradientOpacity = [];

            gradientColor1.map((grad) => {
                const gradArray = grad.color
                    .replace(/[^\d,]/g, '')
                    .split(',')
                    .map((g) => parseFloat(g));

                gradientColor = [ ...gradientColor, parseFloat(grad.offset) ];
                gradientColor = [ ...gradientColor, gradArray[0] / 255, gradArray[1] / 255, gradArray[2] / 255 ];
                gradientOpacity = [ ...gradientOpacity, parseFloat(grad.offset), grad.opacity || 1 ];
            });

            for (i = 0; i < maxGradient - (gradientColor.length / 4); i++) {
                gradientColor = [ ...gradientColor, 1, 1, 1, 1 ];
                gradientOpacity = [ ...gradientOpacity, 1, 0 ];
            }

            ({ startPoint, endPoint } = directionStartEndPoint(gradientAngle1 || 0));

            angleStart1 = [ startPoint.x * width, startPoint.y * height ];
            angleEnd1 = [ endPoint.x * width, endPoint.y * height ];

            colorK1 = [ ...gradientColor, ...gradientOpacity ];
        }

        if (gradientColor2) {
            gradientColor = [];
            gradientOpacity = [];

            gradientColor2.map((grad) => {
                const gradArray = grad.color
                    .replace(/[^\d,]/g, '')
                    .split(',')
                    .map((g) => parseFloat(g));

                gradientColor = [ ...gradientColor, parseFloat(grad.offset) ];
                gradientColor = [ ...gradientColor, gradArray[0] / 255, gradArray[1] / 255, gradArray[2] / 255 ];
                gradientOpacity = [ ...gradientOpacity, parseFloat(grad.offset), grad.opacity || 1 ];
            });

            for (i = 0; i < maxGradient - (gradientColor.length / 4); i++) {
                gradientColor = [ ...gradientColor, 1, 1, 1, 1 ];
                gradientOpacity = [ ...gradientOpacity, 1, 0 ];
            }

            ({ startPoint, endPoint } = directionStartEndPoint(gradientAngle2 || 0));

            angleStart2 = [ startPoint.x * width, startPoint.y * height ];
            angleEnd2 = [ endPoint.x * width, endPoint.y * height ];

            colorK2 = [ ...gradientColor, ...gradientOpacity ];
        }
    }

    let colorObject = {
        a: 1,
        k: [
            {
                i: {
                    x: 0.833,
                    y: 0.833,
                },
                o: {
                    x: 0.167,
                    y: 0.167,
                },
                t: 0,
                s: [ ...colorK0 ],
            },
            {
                i: {
                    x: 0.833,
                    y: 0.833,
                },
                o: {
                    x: 0.167,
                    y: 0.167,
                },
                t: 48,
                s: [ ...colorK1 ],
            },
            {
                t: 90,
                s: [ ...colorK2 ],
            },
        ],
        ix: 9,
    };

    let opacityObject = {
        o: {
            a: 0,
            k: [
                {
                    i: {
                        x: 0.833,
                        y: 0.833,
                    },
                    o: {
                        x: 0.167,
                        y: 0.167,
                    },
                    t: 0,
                    s: opacity0,
                },
                {
                    i: {
                        x: 0.833,
                        y: 0.833,
                    },
                    o: {
                        x: 0.167,
                        y: 0.167,
                    },
                    t: 48,
                    s: opacity1,
                },
                {
                    t: 90,
                    s: opacity2,
                },
            ],
            ix: 10,
        }
    };

    let angleStartObject = {
        s: {
            a: 0,
            k: [
                {
                    i: {
                        x: 0.833,
                        y: 0.833,
                    },
                    o: {
                        x: 0.167,
                        y: 0.167,
                    },
                    t: 0,
                    s: angleStart0,
                },
                {
                    i: {
                        x: 0.833,
                        y: 0.833,
                    },
                    o: {
                        x: 0.167,
                        y: 0.167,
                    },
                    t: 48,
                    s: angleStart1,
                },
                {
                    t: 90,
                    s: angleStart2,
                },
            ],
            ix: 5,
        }
    };

    let angleEndObject = {
        e: {
            a: 0,
            k: [
                {
                    i: {
                        x: 0.833,
                        y: 0.833,
                    },
                    o: {
                        x: 0.167,
                        y: 0.167,
                    },
                    t: 0,
                    s: angleEnd0,
                },
                {
                    i: {
                        x: 0.833,
                        y: 0.833,
                    },
                    o: {
                        x: 0.167,
                        y: 0.167,
                    },
                    t: 48,
                    s: angleEnd1,
                },
                {
                    t: 90,
                    s: angleEnd2,
                },
            ],
            ix: 6,
        }
    };

    if (colorMode === 'default') {
        colorObject = { c: { ...colorObject } };
    } else if (colorMode === 'gradient') {
        colorObject = { g: { p: maxGradient, k: { ...colorObject } } };
    }

    return {
        v: '4.8.0',
        meta: {
            g: 'LottieFiles AE ',
            a: '',
            k: '',
            d: '',
            tc: '',
        },
        fr: 30,
        ip: 0,
        op: 90,
        w: width,
        h: height,
        nm: 'Comp 1',
        ddd: 0,
        assets: [],
        layers: [
            {
                ddd: 0,
                ind: 1,
                ty: 4,
                nm: 'Shape Layer 1',
                sr: 1,
                ks: {
                    o: {
                        a: 0,
                        k: 100,
                        ix: 11,
                    },
                    r: {
                        a: 0,
                        k: 0,
                        ix: 10,
                    },
                    p: {
                        a: 0,
                        k: [960, 540, 0],
                        ix: 2,
                    },
                    a: {
                        a: 0,
                        k: [0, 0, 0],
                        ix: 1,
                    },
                    s: {
                        a: 0,
                        k: [100, 100, 100],
                        ix: 6,
                    },
                },
                ao: 0,
                shapes: [
                    {
                        ty: 'gr',
                        it: [
                            {
                                ty: 'rc',
                                d: 1,
                                s: {
                                    a: 0,
                                    k: [1920, 1080],
                                    ix: 2,
                                },
                                p: {
                                    a: 0,
                                    k: [0, 0],
                                    ix: 3,
                                },
                                r: {
                                    a: 0,
                                    k: 0,
                                    ix: 4,
                                },
                                nm: 'Rectangle Path 1',
                                mn: 'ADBE Vector Shape - Rect',
                                hd: false,
                            },
                            {
                                ty,
                                r: 1,
                                bm: 0,
                                t: 1,
                                ...angleStartObject,
                                ...angleEndObject,
                                ...colorObject,
                                ...opacityObject,
                                nm: 'Gradient Fill 1',
                                mn: 'ADBE Vector Graphic - G-Fill',
                                hd: false,
                            },
                            {
                                ty: 'tr',
                                p: {
                                    a: 0,
                                    k: [0, 0],
                                    ix: 2,
                                },
                                a: {
                                    a: 0,
                                    k: [0, 0],
                                    ix: 1,
                                },
                                s: {
                                    a: 0,
                                    k: [100, 100],
                                    ix: 3,
                                },
                                r: {
                                    a: 0,
                                    k: 0,
                                    ix: 6,
                                },
                                o: {
                                    a: 0,
                                    k: 100,
                                    ix: 7,
                                },
                                sk: {
                                    a: 0,
                                    k: 0,
                                    ix: 4,
                                },
                                sa: {
                                    a: 0,
                                    k: 0,
                                    ix: 5,
                                },
                                nm: 'Transform',
                            },
                        ],
                        nm: 'Rectangle 1',
                        np: 3,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: 'ADBE Vector Group',
                        hd: false,
                    },
                ],
                ip: 0,
                op: 120,
                st: 0,
                bm: 0,
            },
        ],
        markers: [],
    };
};
