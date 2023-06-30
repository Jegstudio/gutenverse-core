import { directionStartEndPoint, gradientDefault } from 'gutenverse-core/helper';

export const ShapeDivTriangleNegative = (props) => {
    const {
        colorMode,
        color0,
        color1,
        color2,
        color3,
        gradientColor0 = gradientDefault(),
        gradientColor1 = gradientDefault(),
        gradientColor2 = gradientDefault(),
        gradientColor3 = gradientDefault(),
        gradientAngle0,
        gradientAngle1,
        gradientAngle2,
        gradientAngle3
    } = props;

    const width = 1920;
    const height = 1080;

    let startPoint, endPoint, gradientColor, gradientOpacity;

    let colorObj0 = { ty: 'fl', c: { a: 0, k: [0.227450980392, 0.341176470588, 0.96862745098, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: 'Fill 1', mn: 'ADBE Vector Graphic - Fill', hd: false };
    let colorObj1 = { ty: 'fl', c: { a: 0, k: [0.270588235294, 0.498039215686, 0.929411764706, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: 'Fill 1', mn: 'ADBE Vector Graphic - Fill', hd: false };
    let colorObj2 = { ty: 'fl', c: { a: 0, k: [0.317647058824, 0.658823529412, 0.894117647059, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: 'Fill 1', mn: 'ADBE Vector Graphic - Fill', hd: false };
    let colorObj3 = { ty: 'fl', c: { a: 0, k: [0.360784313725, 0.81568627451, 0.854901960784, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: 'Fill 1', mn: 'ADBE Vector Graphic - Fill', hd: false };

    let colorObjSt1 = { ty: 'st', c: { a: 0, k: [0.270588235294, 0.498039215686, 0.929411764706, 1], ix: 3 }, o: { a: 0, k: 100, ix: 4 }, w: { a: 0, k: 34, ix: 5 }, lc: 1, lj: 1, ml: 4, bm: 0, nm: 'Stroke 1', mn: 'ADBE Vector Graphic - Stroke', hd: false };
    let colorObjSt2 = { ty: 'st', c: { a: 0, k: [0.317647058824, 0.658823529412, 0.894117647059, 1], ix: 3 }, o: { a: 0, k: 100, ix: 4 }, w: { a: 0, k: 58, ix: 5 }, lc: 1, lj: 1, ml: 4, bm: 0, nm: 'Stroke 1', mn: 'ADBE Vector Graphic - Stroke', hd: false };
    let colorObjSt3 = { ty: 'st', c: { a: 0, k: [0.360784313725, 0.81568627451, 0.854901960784, 1], ix: 3 }, o: { a: 0, k: 100, ix: 4 }, w: { a: 0, k: 93, ix: 5 }, lc: 1, lj: 1, ml: 4, bm: 0, nm: 'Stroke 1', mn: 'ADBE Vector Graphic - Stroke', hd: false };

    if (colorMode === 'default') {
        if (color0) {
            colorObj0 = { ty: 'fl', c: { a: 0, k: [color0.r / 255, color0.g / 255, color0.b / 255, 1], ix: 4 }, o: { a: 0, k: color0.a * 100, ix: 5 }, r: 1, bm: 0, nm: 'Fill 1', mn: 'ADBE Vector Graphic - Fill', hd: false };
        }

        if (color1) {
            colorObj1 = { ty: 'fl', c: { a: 0, k: [color1.r / 255, color1.g / 255, color1.b / 255, 1], ix: 4 }, o: { a: 0, k: color1.a * 100, ix: 5 }, r: 1, bm: 0, nm: 'Fill 1', mn: 'ADBE Vector Graphic - Fill', hd: false };
            colorObjSt1 = { ty: 'st', c: { a: 0, k: [color1.r / 255, color1.g / 255, color1.b / 255, 1], ix: 3 }, o: { a: 0, k: color1.a * 100, ix: 4 }, w: { a: 0, k: 34, ix: 5 }, lc: 1, lj: 1, ml: 4, bm: 0, nm: 'Stroke 1', mn: 'ADBE Vector Graphic - Stroke', hd: false };
        }

        if (color2) {
            colorObj2 = { ty: 'fl', c: { a: 0, k: [color2.r / 255, color2.g / 255, color2.b / 255, 1], ix: 4 }, o: { a: 0, k: color2.a * 100, ix: 5 }, r: 1, bm: 0, nm: 'Fill 1', mn: 'ADBE Vector Graphic - Fill', hd: false };
            colorObjSt2 = { ty: 'st', c: { a: 0, k: [color2.r / 255, color2.g / 255, color2.b / 255, 1], ix: 3 }, o: { a: 0, k: color2.a * 100, ix: 4 }, w: { a: 0, k: 58, ix: 5 }, lc: 1, lj: 1, ml: 4, bm: 0, nm: 'Stroke 1', mn: 'ADBE Vector Graphic - Stroke', hd: false };
        }

        if (color3) {
            colorObj3 = { ty: 'fl', c: { a: 0, k: [color3.r / 255, color3.g / 255, color3.b / 255, 1], ix: 4 }, o: { a: 0, k: color3.a * 100, ix: 5 }, r: 1, bm: 0, nm: 'Fill 1', mn: 'ADBE Vector Graphic - Fill', hd: false };
            colorObjSt3 = { ty: 'st', c: { a: 0, k: [color3.r / 255, color3.g / 255, color3.b / 255, 1], ix: 3 }, o: { a: 0, k: color3.a * 100, ix: 4 }, w: { a: 0, k: 93, ix: 5 }, lc: 1, lj: 1, ml: 4, bm: 0, nm: 'Stroke 1', mn: 'ADBE Vector Graphic - Stroke', hd: false };
        }
    } else if (colorMode === 'gradient') {
        if (gradientColor0) {
            gradientColor = [];
            gradientOpacity = [];

            gradientColor0.map((grad) => {
                const gradArray = grad.color
                    .replace(/[^\d,]/g, '')
                    .split(',')
                    .map((g) => parseFloat(g));

                gradientColor = [...gradientColor, parseFloat(grad.offset)];
                gradientColor = [...gradientColor, gradArray[0] / 255, gradArray[1] / 255, gradArray[2] / 255];
                gradientOpacity = [...gradientOpacity, parseFloat(grad.offset), grad.opacity || 1];
            });

            ({ startPoint, endPoint } = directionStartEndPoint(gradientAngle0 || 0));

            colorObj0 = {
                ty: 'gf',
                o: {
                    a: 0,
                    k: 100,
                    ix: 10,
                },
                r: 1,
                bm: 0,
                g: {
                    p: gradientColor0.length,
                    k: {
                        a: 0,
                        k: [...gradientColor, ...gradientOpacity],
                        ix: 9,
                    },
                },
                s: {
                    a: 0,
                    k: [startPoint.x * width, startPoint.y * height],
                    ix: 5,
                },
                e: {
                    a: 0,
                    k: [endPoint.x * width, endPoint.y * height],
                    ix: 6,
                },
                t: 1,
                nm: 'Gradient Fill 1',
                mn: 'ADBE Vector Graphic - G-Fill',
                hd: false,
            };
        }

        if (gradientColor1) {
            gradientColor = [];
            gradientOpacity = [];

            gradientColor1.map((grad) => {
                const gradArray = grad.color
                    .replace(/[^\d,]/g, '')
                    .split(',')
                    .map((g) => parseFloat(g));

                gradientColor = [...gradientColor, parseFloat(grad.offset)];
                gradientColor = [...gradientColor, gradArray[0] / 255, gradArray[1] / 255, gradArray[2] / 255];
                gradientOpacity = [...gradientOpacity, parseFloat(grad.offset), grad.opacity || 1];
            });

            ({ startPoint, endPoint } = directionStartEndPoint(gradientAngle1 || 0));

            colorObj1 = {
                ty: 'gf',
                o: {
                    a: 0,
                    k: 100,
                    ix: 10,
                },
                r: 1,
                bm: 0,
                g: {
                    p: gradientColor1.length,
                    k: {
                        a: 0,
                        k: [...gradientColor, ...gradientOpacity],
                        ix: 9,
                    },
                },
                s: {
                    a: 0,
                    k: [startPoint.x * width, startPoint.y * height],
                    ix: 5,
                },
                e: {
                    a: 0,
                    k: [endPoint.x * width, endPoint.y * height],
                    ix: 6,
                },
                t: 1,
                nm: 'Gradient Fill 1',
                mn: 'ADBE Vector Graphic - G-Fill',
                hd: false,
            };

            colorObjSt1 = {
                ty: 'gs',
                o: {
                    a: 0,
                    k: 100,
                },
                w: { a: 0, k: 34, ix: 5 },
                g: {
                    p: gradientColor1.length,
                    k: {
                        a: 0,
                        k: [...gradientColor, ...gradientOpacity],
                    },
                },
                s: {
                    a: 0,
                    k: [startPoint.x * width, startPoint.y * height],
                    ix: 5,
                },
                e: {
                    a: 0,
                    k: [endPoint.x * width, endPoint.y * height],
                    ix: 6,
                },
                t: 1,
                lc: 1,
                lj: 1,
                ml: 4,
                nm: 'Gradient Stroke 1',
                mn: 'ADBE Vector Graphic - G-Stroke',
            };
        }

        if (gradientColor2) {
            gradientColor = [];
            gradientOpacity = [];

            gradientColor2.map((grad) => {
                const gradArray = grad.color
                    .replace(/[^\d,]/g, '')
                    .split(',')
                    .map((g) => parseFloat(g));

                gradientColor = [...gradientColor, parseFloat(grad.offset)];
                gradientColor = [...gradientColor, gradArray[0] / 255, gradArray[1] / 255, gradArray[2] / 255];
                gradientOpacity = [...gradientOpacity, parseFloat(grad.offset), grad.opacity || 1];
            });

            ({ startPoint, endPoint } = directionStartEndPoint(gradientAngle2 || 0));

            colorObj2 = {
                ty: 'gf',
                o: {
                    a: 0,
                    k: 100,
                    ix: 10,
                },
                r: 1,
                bm: 0,
                g: {
                    p: gradientColor2.length,
                    k: {
                        a: 0,
                        k: [...gradientColor, ...gradientOpacity],
                        ix: 9,
                    },
                },
                s: {
                    a: 0,
                    k: [startPoint.x * width, startPoint.y * height],
                    ix: 5,
                },
                e: {
                    a: 0,
                    k: [endPoint.x * width, endPoint.y * height],
                    ix: 6,
                },
                t: 1,
                nm: 'Gradient Fill 1',
                mn: 'ADBE Vector Graphic - G-Fill',
                hd: false,
            };

            colorObjSt2 = {
                ty: 'gs',
                o: {
                    a: 0,
                    k: 100,
                },
                w: { a: 0, k: 58, ix: 5 },
                g: {
                    p: gradientColor2.length,
                    k: {
                        a: 0,
                        k: [...gradientColor, ...gradientOpacity],
                    },
                },
                s: {
                    a: 0,
                    k: [startPoint.x * width, startPoint.y * height],
                    ix: 5,
                },
                e: {
                    a: 0,
                    k: [endPoint.x * width, endPoint.y * height],
                    ix: 6,
                },
                t: 1,
                lc: 1,
                lj: 1,
                ml: 4,
                nm: 'Gradient Stroke 1',
                mn: 'ADBE Vector Graphic - G-Stroke',
            };
        }

        if (gradientColor3) {
            gradientColor = [];
            gradientOpacity = [];

            gradientColor3.map((grad) => {
                const gradArray = grad.color
                    .replace(/[^\d,]/g, '')
                    .split(',')
                    .map((g) => parseFloat(g));

                gradientColor = [...gradientColor, parseFloat(grad.offset)];
                gradientColor = [...gradientColor, gradArray[0] / 255, gradArray[1] / 255, gradArray[2] / 255];
                gradientOpacity = [...gradientOpacity, parseFloat(grad.offset), grad.opacity || 1];
            });

            ({ startPoint, endPoint } = directionStartEndPoint(gradientAngle3 || 0));

            colorObj3 = {
                ty: 'gf',
                o: {
                    a: 0,
                    k: 100,
                    ix: 10,
                },
                r: 1,
                bm: 0,
                g: {
                    p: gradientColor3.length,
                    k: {
                        a: 0,
                        k: [...gradientColor, ...gradientOpacity],
                        ix: 9,
                    },
                },
                s: {
                    a: 0,
                    k: [startPoint.x * width, startPoint.y * height],
                    ix: 5,
                },
                e: {
                    a: 0,
                    k: [endPoint.x * width, endPoint.y * height],
                    ix: 6,
                },
                t: 1,
                nm: 'Gradient Fill 1',
                mn: 'ADBE Vector Graphic - G-Fill',
                hd: false,
            };

            colorObjSt3 = {
                ty: 'gs',
                o: {
                    a: 0,
                    k: 100,
                },
                w: { a: 0, k: 93, ix: 5 },
                g: {
                    p: gradientColor3.length,
                    k: {
                        a: 0,
                        k: [...gradientColor, ...gradientOpacity],
                    },
                },
                s: {
                    a: 0,
                    k: [startPoint.x * width, startPoint.y * height],
                    ix: 5,
                },
                e: {
                    a: 0,
                    k: [endPoint.x * width, endPoint.y * height],
                    ix: 6,
                },
                t: 1,
                lc: 1,
                lj: 1,
                ml: 4,
                nm: 'Gradient Stroke 1',
                mn: 'ADBE Vector Graphic - G-Stroke',
            };
        }
    }
    
    return {
        v: '4.8.0',
        meta: { g: 'LottieFiles AE 3.0.2', a: '', k: '', d: '', tc: '' },
        fr: 29.9700012207031,
        ip: 0,
        op: 174.000007087165,
        w: width,
        h: height,
        nm: 'Triangle Negative Opacity',
        ddd: 0,
        assets: [],
        layers: [
            {
                ddd: 0,
                ind: 1,
                ty: 4,
                nm: 'Layer 3 Outlines',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [959.5, 856, 0], ix: 2 }, a: { a: 0, k: [960.5, 224, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } },
                ao: 0,
                shapes: [
                    {
                        ty: 'gr',
                        it: [
                            {
                                ind: 0,
                                ty: 'sh',
                                ix: 1,
                                ks: {
                                    a: 0,
                                    k: {
                                        i: [
                                            [0, 0],
                                            [0, 0],
                                            [0, 0],
                                            [0, 0],
                                            [0, 0],
                                        ],
                                        o: [
                                            [0, 0],
                                            [0, 0],
                                            [0, 0],
                                            [0, 0],
                                            [0, 0],
                                        ],
                                        v: [
                                            [0.016, -224.346],
                                            [-959.999, -2.469],
                                            [-959.999, 223.471],
                                            [959.999, 223.471],
                                            [959.998, -3.475],
                                        ],
                                        c: true,
                                    },
                                    ix: 2,
                                },
                                nm: 'Path 1',
                                mn: 'ADBE Vector Shape - Group',
                                hd: false,
                            },
                            colorObj0,
                            { ty: 'tr', p: { a: 0, k: [960.501, 224.031], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
                        ],
                        nm: 'Group 1',
                        np: 2,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: 'ADBE Vector Group',
                        hd: false,
                    },
                ],
                ip: 0,
                op: 300.00001221925,
                st: 0,
                bm: 0,
            },
            {
                ddd: 0,
                ind: 2,
                ty: 4,
                nm: 'Layer 4 Outlines 2',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [1438.75, 742, 0], ix: 2 }, a: { a: 0, k: [480.5, 111, 0], ix: 1 }, s: { a: 0, k: [-100, 100, 100], ix: 6 } },
                ao: 0,
                shapes: [
                    {
                        ty: 'gr',
                        it: [
                            {
                                ind: 0,
                                ty: 'sh',
                                ix: 1,
                                ks: {
                                    a: 1,
                                    k: [
                                        {
                                            i: { x: 0.667, y: 1 },
                                            o: { x: 0.333, y: 0 },
                                            t: 70,
                                            s: [
                                                {
                                                    i: [
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    o: [
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    v: [
                                                        [480.008, -110.5],
                                                        [-480.008, 110.502],
                                                        [-480.03, 76.127],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.833, y: 1 },
                                            o: { x: 0.167, y: 0 },
                                            t: 119,
                                            s: [
                                                {
                                                    i: [
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    o: [
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    v: [
                                                        [480.008, -110.5],
                                                        [-480.008, 110.502],
                                                        [-479.561, 55.877],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            t: 165.000006720588,
                                            s: [
                                                {
                                                    i: [
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    o: [
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    v: [
                                                        [480.008, -110.5],
                                                        [-479.883, 111.127],
                                                        [-479.621, 111.377],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                    ],
                                    ix: 2,
                                },
                                nm: 'Path 1',
                                mn: 'ADBE Vector Shape - Group',
                                hd: false,
                            },
                            colorObj1,
                            { ty: 'tr', p: { a: 0, k: [480.51, 111.06], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
                        ],
                        nm: 'Group 1',
                        np: 4,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: 'ADBE Vector Group',
                        hd: false,
                    },
                ],
                ip: 49.0000019958109,
                op: 349.000014215061,
                st: 49.0000019958109,
                bm: 0,
            },
            {
                ddd: 0,
                ind: 3,
                ty: 4,
                nm: 'Layer 5 Outlines 2',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [1438.75, 742, 0], ix: 2 }, a: { a: 0, k: [480.5, 111, 0], ix: 1 }, s: { a: 0, k: [-100, 100, 100], ix: 6 } },
                ao: 0,
                shapes: [
                    {
                        ty: 'gr',
                        it: [
                            {
                                ind: 0,
                                ty: 'sh',
                                ix: 1,
                                ks: {
                                    a: 1,
                                    k: [
                                        {
                                            i: { x: 0.667, y: 1 },
                                            o: { x: 0.333, y: 0 },
                                            t: 70,
                                            s: [
                                                {
                                                    i: [
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    o: [
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    v: [
                                                        [480.008, -110.5],
                                                        [-480.008, 110.502],
                                                        [-479.758, 43.751],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.833, y: 1 },
                                            o: { x: 0.167, y: 0 },
                                            t: 109,
                                            s: [
                                                {
                                                    i: [
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    o: [
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    v: [
                                                        [480.008, -110.5],
                                                        [-480.008, 110.502],
                                                        [-479.061, 2.001],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            t: 156.00000635401,
                                            s: [
                                                {
                                                    i: [
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    o: [
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    v: [
                                                        [480.008, -110.5],
                                                        [-479.883, 111.877],
                                                        [-479.121, 112.001],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                    ],
                                    ix: 2,
                                },
                                nm: 'Path 1',
                                mn: 'ADBE Vector Shape - Group',
                                hd: false,
                            },
                            colorObj2,
                            { ty: 'tr', p: { a: 0, k: [480.51, 111.06], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
                        ],
                        nm: 'Group 1',
                        np: 4,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: 'ADBE Vector Group',
                        hd: false,
                    },
                ],
                ip: 49.0000019958109,
                op: 349.000014215061,
                st: 49.0000019958109,
                bm: 0,
            },
            {
                ddd: 0,
                ind: 4,
                ty: 4,
                nm: 'Layer 6 Outlines 2',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [1438.75, 742, 0], ix: 2 }, a: { a: 0, k: [480.5, 111, 0], ix: 1 }, s: { a: 0, k: [-100, 100, 100], ix: 6 } },
                ao: 0,
                shapes: [
                    {
                        ty: 'gr',
                        it: [
                            {
                                ind: 0,
                                ty: 'sh',
                                ix: 1,
                                ks: {
                                    a: 1,
                                    k: [
                                        {
                                            i: { x: 0.667, y: 1 },
                                            o: { x: 0.333, y: 0 },
                                            t: 70,
                                            s: [
                                                {
                                                    i: [
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    o: [
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    v: [
                                                        [480.008, -110.435],
                                                        [-479.508, 109.434],
                                                        [-479.758, 11.067],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.833, y: 1 },
                                            o: { x: 0.167, y: 0 },
                                            t: 100,
                                            s: [
                                                {
                                                    i: [
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    o: [
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    v: [
                                                        [480.008, -110.435],
                                                        [-479.508, 109.434],
                                                        [-479.53, -44.433],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            t: 146.000005946702,
                                            s: [
                                                {
                                                    i: [
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    o: [
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    v: [
                                                        [480.008, -110.435],
                                                        [-480.008, 111.559],
                                                        [-480.061, 112.692],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                    ],
                                    ix: 2,
                                },
                                nm: 'Path 1',
                                mn: 'ADBE Vector Shape - Group',
                                hd: false,
                            },
                            colorObj3,
                            { ty: 'tr', p: { a: 0, k: [480.51, 110.994], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
                        ],
                        nm: 'Group 1',
                        np: 4,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: 'ADBE Vector Group',
                        hd: false,
                    },
                ],
                ip: 49.0000019958109,
                op: 349.000014215061,
                st: 49.0000019958109,
                bm: 0,
            },
            {
                ddd: 0,
                ind: 5,
                ty: 4,
                nm: 'Shape Layer 6',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [958.75, 647, 0], ix: 2 }, a: { a: 0, k: [2, 108, 0], ix: 1 }, s: { a: 0, k: [-100, 100, 100], ix: 6 } },
                ao: 0,
                shapes: [
                    {
                        ty: 'gr',
                        it: [
                            {
                                ind: 0,
                                ty: 'sh',
                                ix: 1,
                                ks: {
                                    a: 0,
                                    k: {
                                        i: [
                                            [0, 0],
                                            [0, 0],
                                        ],
                                        o: [
                                            [0, 0],
                                            [0, 0],
                                        ],
                                        v: [
                                            [-962, 298],
                                            [1, 109],
                                        ],
                                        c: false,
                                    },
                                    ix: 2,
                                },
                                nm: 'Path 1',
                                mn: 'ADBE Vector Shape - Group',
                                hd: false,
                            },
                            colorObjSt1,
                            { ty: 'tr', p: { a: 0, k: [0, 0], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100.578, 100.122], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
                        ],
                        nm: 'Shape 1',
                        np: 3,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: 'ADBE Vector Group',
                        hd: false,
                    },
                    {
                        ty: 'tm',
                        s: {
                            a: 1,
                            k: [
                                { i: { x: [0.598], y: [1] }, o: { x: [0.679], y: [0] }, t: 0, s: [100] },
                                { t: 38.0000015477717, s: [0] },
                            ],
                            ix: 1,
                        },
                        e: { a: 0, k: 100, ix: 2 },
                        o: { a: 0, k: 0, ix: 3 },
                        m: 1,
                        ix: 2,
                        nm: 'Trim Paths 1',
                        mn: 'ADBE Vector Filter - Trim',
                        hd: false,
                    },
                ],
                ip: 0,
                op: 49.0000019958109,
                st: 0,
                bm: 0,
            },
            {
                ddd: 0,
                ind: 6,
                ty: 4,
                nm: 'Shape Layer 5',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [956.75, 539, 0], ix: 2 }, a: { a: 0, k: [0, 0, 0], ix: 1 }, s: { a: 0, k: [-101.173, 101.213, 100], ix: 6 } },
                ao: 0,
                shapes: [
                    {
                        ty: 'gr',
                        it: [
                            {
                                ind: 0,
                                ty: 'sh',
                                ix: 1,
                                ks: {
                                    a: 0,
                                    k: {
                                        i: [
                                            [0, 0],
                                            [0, 0],
                                        ],
                                        o: [
                                            [0, 0],
                                            [0, 0],
                                        ],
                                        v: [
                                            [-953.09, 269.125],
                                            [-3.841, 116.9],
                                        ],
                                        c: false,
                                    },
                                    ix: 2,
                                },
                                nm: 'Path 1',
                                mn: 'ADBE Vector Shape - Group',
                                hd: false,
                            },
                            colorObjSt2,
                            { ty: 'tr', p: { a: 0, k: [1.775, 1.91], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100.932, 101.667], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
                        ],
                        nm: 'Shape 1',
                        np: 3,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: 'ADBE Vector Group',
                        hd: false,
                    },
                    {
                        ty: 'tm',
                        s: {
                            a: 1,
                            k: [
                                { i: { x: [0.596], y: [1] }, o: { x: [0.677], y: [0] }, t: 4, s: [100] },
                                { t: 41.7637517010724, s: [0] },
                            ],
                            ix: 1,
                        },
                        e: { a: 0, k: 100, ix: 2 },
                        o: { a: 0, k: 0, ix: 3 },
                        m: 1,
                        ix: 2,
                        nm: 'Trim Paths 1',
                        mn: 'ADBE Vector Filter - Trim',
                        hd: false,
                    },
                ],
                ip: 4.00000016292334,
                op: 49.0000019958109,
                st: 4.00000016292334,
                bm: 0,
            },
            {
                ddd: 0,
                ind: 7,
                ty: 4,
                nm: 'Shape Layer 4',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [959.75, 683, 0], ix: 2 }, a: { a: 0, k: [2.973, 139.22, 0], ix: 1 }, s: { a: 0, k: [-100.924, 103.433, 100], ix: 6 } },
                ao: 0,
                shapes: [
                    {
                        ty: 'gr',
                        it: [
                            {
                                ind: 0,
                                ty: 'sh',
                                ix: 1,
                                ks: {
                                    a: 0,
                                    k: {
                                        i: [
                                            [0, 0],
                                            [0, 0],
                                        ],
                                        o: [
                                            [0, 0],
                                            [0, 0],
                                        ],
                                        v: [
                                            [-978.484, 245.666],
                                            [5.033, 138.078],
                                        ],
                                        c: false,
                                    },
                                    ix: 2,
                                },
                                nm: 'Path 1',
                                mn: 'ADBE Vector Shape - Group',
                                hd: false,
                            },
                            colorObjSt3,
                            { ty: 'tr', p: { a: 0, k: [-1.784, 88.999], ix: 2 }, a: { a: 0, k: [-1.819, 91.102], ix: 1 }, s: { a: 0, k: [98.883, 111.048], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
                        ],
                        nm: 'Shape 1',
                        np: 3,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: 'ADBE Vector Group',
                        hd: false,
                    },
                    {
                        ty: 'tm',
                        s: {
                            a: 1,
                            k: [
                                { i: { x: [0.594], y: [1] }, o: { x: [0.676], y: [0] }, t: 9, s: [100] },
                                { t: 46.5287518951548, s: [0] },
                            ],
                            ix: 1,
                        },
                        e: { a: 0, k: 100, ix: 2 },
                        o: { a: 0, k: 0, ix: 3 },
                        m: 1,
                        ix: 2,
                        nm: 'Trim Paths 1',
                        mn: 'ADBE Vector Filter - Trim',
                        hd: false,
                    },
                ],
                ip: 9.00000036657752,
                op: 49.0000019958109,
                st: 9.00000036657752,
                bm: 0,
            },
            {
                ddd: 0,
                ind: 8,
                ty: 4,
                nm: 'Layer 4 Outlines',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [479.5, 742.5, 0], ix: 2 }, a: { a: 0, k: [480.5, 111, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } },
                ao: 0,
                shapes: [
                    {
                        ty: 'gr',
                        it: [
                            {
                                ind: 0,
                                ty: 'sh',
                                ix: 1,
                                ks: {
                                    a: 1,
                                    k: [
                                        {
                                            i: { x: 0.667, y: 1 },
                                            o: { x: 0.167, y: 0 },
                                            t: 70,
                                            s: [
                                                {
                                                    i: [
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    o: [
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    v: [
                                                        [480.758, -113.25],
                                                        [-480.008, 110.502],
                                                        [-480.53, 74.127],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.833, y: 1 },
                                            o: { x: 0.167, y: 0 },
                                            t: 119,
                                            s: [
                                                {
                                                    i: [
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    o: [
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    v: [
                                                        [480.008, -110.5],
                                                        [-480.008, 110.502],
                                                        [-479.561, 55.877],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            t: 165.000006720588,
                                            s: [
                                                {
                                                    i: [
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    o: [
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    v: [
                                                        [480.008, -110.5],
                                                        [-479.883, 111.127],
                                                        [-479.621, 111.377],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                    ],
                                    ix: 2,
                                },
                                nm: 'Path 1',
                                mn: 'ADBE Vector Shape - Group',
                                hd: false,
                            },
                            colorObj1,
                            { ty: 'tr', p: { a: 0, k: [481.408, 113.396], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
                        ],
                        nm: 'Group 1',
                        np: 4,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: 'ADBE Vector Group',
                        hd: false,
                    },
                ],
                ip: 49.0000019958109,
                op: 349.000014215061,
                st: 49.0000019958109,
                bm: 0,
            },
            {
                ddd: 0,
                ind: 9,
                ty: 4,
                nm: 'Layer 5 Outlines',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [479.5, 742.5, 0], ix: 2 }, a: { a: 0, k: [480.5, 111, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } },
                ao: 0,
                shapes: [
                    {
                        ty: 'gr',
                        it: [
                            {
                                ind: 0,
                                ty: 'sh',
                                ix: 1,
                                ks: {
                                    a: 1,
                                    k: [
                                        {
                                            i: { x: 0.667, y: 1 },
                                            o: { x: 0.333, y: 0 },
                                            t: 70,
                                            s: [
                                                {
                                                    i: [
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    o: [
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    v: [
                                                        [481.633, -111],
                                                        [-480.008, 110.502],
                                                        [-479.758, 43.751],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.833, y: 1 },
                                            o: { x: 0.167, y: 0 },
                                            t: 109,
                                            s: [
                                                {
                                                    i: [
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    o: [
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    v: [
                                                        [480.008, -110.5],
                                                        [-480.008, 110.502],
                                                        [-479.061, 2.001],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            t: 156.00000635401,
                                            s: [
                                                {
                                                    i: [
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    o: [
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    v: [
                                                        [480.008, -110.5],
                                                        [-479.883, 111.877],
                                                        [-479.121, 112.001],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                    ],
                                    ix: 2,
                                },
                                nm: 'Path 1',
                                mn: 'ADBE Vector Shape - Group',
                                hd: false,
                            },
                            colorObj2,
                            { ty: 'tr', p: { a: 0, k: [480.51, 111.06], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
                        ],
                        nm: 'Group 1',
                        np: 4,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: 'ADBE Vector Group',
                        hd: false,
                    },
                ],
                ip: 49.0000019958109,
                op: 349.000014215061,
                st: 49.0000019958109,
                bm: 0,
            },
            {
                ddd: 0,
                ind: 10,
                ty: 4,
                nm: 'Layer 6 Outlines',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [479.5, 742.5, 0], ix: 2 }, a: { a: 0, k: [480.5, 111, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } },
                ao: 0,
                shapes: [
                    {
                        ty: 'gr',
                        it: [
                            {
                                ind: 0,
                                ty: 'sh',
                                ix: 1,
                                ks: {
                                    a: 1,
                                    k: [
                                        {
                                            i: { x: 0.667, y: 1 },
                                            o: { x: 0.333, y: 0 },
                                            t: 70,
                                            s: [
                                                {
                                                    i: [
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    o: [
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    v: [
                                                        [480.008, -110.435],
                                                        [-479.508, 109.434],
                                                        [-479.758, 11.067],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.833, y: 1 },
                                            o: { x: 0.167, y: 0 },
                                            t: 100,
                                            s: [
                                                {
                                                    i: [
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    o: [
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    v: [
                                                        [480.008, -110.435],
                                                        [-479.508, 109.434],
                                                        [-479.53, -44.433],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            t: 146.000005946702,
                                            s: [
                                                {
                                                    i: [
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    o: [
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    v: [
                                                        [480.008, -110.435],
                                                        [-480.008, 111.559],
                                                        [-480.061, 112.692],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                    ],
                                    ix: 2,
                                },
                                nm: 'Path 1',
                                mn: 'ADBE Vector Shape - Group',
                                hd: false,
                            },
                            colorObj3,
                            { ty: 'tr', p: { a: 0, k: [480.51, 110.994], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
                        ],
                        nm: 'Group 1',
                        np: 4,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: 'ADBE Vector Group',
                        hd: false,
                    },
                ],
                ip: 49.0000019958109,
                op: 349.000014215061,
                st: 49.0000019958109,
                bm: 0,
            },
            {
                ddd: 0,
                ind: 11,
                ty: 4,
                nm: 'Shape Layer 1',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [962, 647.5, 0], ix: 2 }, a: { a: 0, k: [2, 108, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } },
                ao: 0,
                shapes: [
                    {
                        ty: 'gr',
                        it: [
                            {
                                ind: 0,
                                ty: 'sh',
                                ix: 1,
                                ks: {
                                    a: 0,
                                    k: {
                                        i: [
                                            [0, 0],
                                            [0, 0],
                                        ],
                                        o: [
                                            [0, 0],
                                            [0, 0],
                                        ],
                                        v: [
                                            [-962, 298],
                                            [1, 109],
                                        ],
                                        c: false,
                                    },
                                    ix: 2,
                                },
                                nm: 'Path 1',
                                mn: 'ADBE Vector Shape - Group',
                                hd: false,
                            },
                            colorObjSt1,
                            { ty: 'tr', p: { a: 0, k: [0, 0], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100.578, 100.122], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
                        ],
                        nm: 'Shape 1',
                        np: 3,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: 'ADBE Vector Group',
                        hd: false,
                    },
                    {
                        ty: 'tm',
                        s: {
                            a: 1,
                            k: [
                                { i: { x: [0.598], y: [1] }, o: { x: [0.679], y: [0] }, t: 0, s: [100] },
                                { t: 38.0000015477717, s: [0] },
                            ],
                            ix: 1,
                        },
                        e: { a: 0, k: 100, ix: 2 },
                        o: { a: 0, k: 0, ix: 3 },
                        m: 1,
                        ix: 2,
                        nm: 'Trim Paths 1',
                        mn: 'ADBE Vector Filter - Trim',
                        hd: false,
                    },
                ],
                ip: 0,
                op: 49.0000019958109,
                st: 0,
                bm: 0,
            },
            {
                ddd: 0,
                ind: 12,
                ty: 4,
                nm: 'Shape Layer 2',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [960, 539.5, 0], ix: 2 }, a: { a: 0, k: [0, 0, 0], ix: 1 }, s: { a: 0, k: [101.173, 101.213, 100], ix: 6 } },
                ao: 0,
                shapes: [
                    {
                        ty: 'gr',
                        it: [
                            {
                                ind: 0,
                                ty: 'sh',
                                ix: 1,
                                ks: {
                                    a: 0,
                                    k: {
                                        i: [
                                            [0, 0],
                                            [0, 0],
                                        ],
                                        o: [
                                            [0, 0],
                                            [0, 0],
                                        ],
                                        v: [
                                            [-953.09, 269.125],
                                            [-3.841, 116.9],
                                        ],
                                        c: false,
                                    },
                                    ix: 2,
                                },
                                nm: 'Path 1',
                                mn: 'ADBE Vector Shape - Group',
                                hd: false,
                            },
                            colorObjSt2,
                            { ty: 'tr', p: { a: 0, k: [1.775, 1.91], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100.932, 101.667], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
                        ],
                        nm: 'Shape 1',
                        np: 3,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: 'ADBE Vector Group',
                        hd: false,
                    },
                    {
                        ty: 'tm',
                        s: {
                            a: 1,
                            k: [
                                { i: { x: [0.596], y: [1] }, o: { x: [0.677], y: [0] }, t: 4, s: [100] },
                                { t: 41.7637517010724, s: [0] },
                            ],
                            ix: 1,
                        },
                        e: { a: 0, k: 100, ix: 2 },
                        o: { a: 0, k: 0, ix: 3 },
                        m: 1,
                        ix: 2,
                        nm: 'Trim Paths 1',
                        mn: 'ADBE Vector Filter - Trim',
                        hd: false,
                    },
                ],
                ip: 4.00000016292334,
                op: 49.0000019958109,
                st: 4.00000016292334,
                bm: 0,
            },
            {
                ddd: 0,
                ind: 13,
                ty: 4,
                nm: 'Shape Layer 3',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [963, 683.5, 0], ix: 2 }, a: { a: 0, k: [2.973, 139.22, 0], ix: 1 }, s: { a: 0, k: [100.924, 103.433, 100], ix: 6 } },
                ao: 0,
                shapes: [
                    {
                        ty: 'gr',
                        it: [
                            {
                                ind: 0,
                                ty: 'sh',
                                ix: 1,
                                ks: {
                                    a: 0,
                                    k: {
                                        i: [
                                            [0, 0],
                                            [0, 0],
                                        ],
                                        o: [
                                            [0, 0],
                                            [0, 0],
                                        ],
                                        v: [
                                            [-978.484, 245.666],
                                            [5.033, 138.078],
                                        ],
                                        c: false,
                                    },
                                    ix: 2,
                                },
                                nm: 'Path 1',
                                mn: 'ADBE Vector Shape - Group',
                                hd: false,
                            },
                            colorObjSt3,
                            { ty: 'tr', p: { a: 0, k: [-1.784, 88.999], ix: 2 }, a: { a: 0, k: [-1.819, 91.102], ix: 1 }, s: { a: 0, k: [98.883, 111.048], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
                        ],
                        nm: 'Shape 1',
                        np: 3,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: 'ADBE Vector Group',
                        hd: false,
                    },
                    {
                        ty: 'tm',
                        s: {
                            a: 1,
                            k: [
                                { i: { x: [0.594], y: [1] }, o: { x: [0.676], y: [0] }, t: 9, s: [100] },
                                { t: 46.5287518951548, s: [0] },
                            ],
                            ix: 1,
                        },
                        e: { a: 0, k: 100, ix: 2 },
                        o: { a: 0, k: 0, ix: 3 },
                        m: 1,
                        ix: 2,
                        nm: 'Trim Paths 1',
                        mn: 'ADBE Vector Filter - Trim',
                        hd: false,
                    },
                ],
                ip: 9.00000036657752,
                op: 49.0000019958109,
                st: 9.00000036657752,
                bm: 0,
            },
        ],
        markers: [],
    };
};
