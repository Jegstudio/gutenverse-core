import { directionStartEndPoint, gradientDefault } from 'gutenverse-core/helper';

export const ShapeDivTriangle = (props) => {
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

    if (colorMode === 'default') {
        if (color0) {
            colorObj0 = { ty: 'fl', c: { a: 0, k: [color0.r / 255, color0.g / 255, color0.b / 255, 1], ix: 4 }, o: { a: 0, k: color0.a * 100, ix: 5 }, r: 1, bm: 0, nm: 'Fill 1', mn: 'ADBE Vector Graphic - Fill', hd: false };
        }

        if (color1) {
            colorObj1 = { ty: 'fl', c: { a: 0, k: [color1.r / 255, color1.g / 255, color1.b / 255, 1], ix: 4 }, o: { a: 0, k: color1.a * 100, ix: 5 }, r: 1, bm: 0, nm: 'Fill 1', mn: 'ADBE Vector Graphic - Fill', hd: false };
        }

        if (color2) {
            colorObj2 = { ty: 'fl', c: { a: 0, k: [color2.r / 255, color2.g / 255, color2.b / 255, 1], ix: 4 }, o: { a: 0, k: color2.a * 100, ix: 5 }, r: 1, bm: 0, nm: 'Fill 1', mn: 'ADBE Vector Graphic - Fill', hd: false };
        }

        if (color3) {
            colorObj3 = { ty: 'fl', c: { a: 0, k: [color3.r / 255, color3.g / 255, color3.b / 255, 1], ix: 4 }, o: { a: 0, k: color3.a * 100, ix: 5 }, r: 1, bm: 0, nm: 'Fill 1', mn: 'ADBE Vector Graphic - Fill', hd: false };
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
        }
    }

    return {
        v: '4.8.0',
        meta: { g: 'LottieFiles AE 3.0.2', a: '', k: '', d: '', tc: '' },
        fr: 29.9700012207031,
        ip: 0,
        op: 182.000007413012,
        w: width,
        h: height,
        nm: 'triangle opacity 1',
        ddd: 0,
        assets: [],
        layers: [
            {
                ddd: 0,
                ind: 2,
                ty: 4,
                nm: 'Layer 8 Outlines',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [959.875, 884.5, 0], ix: 2 }, a: { a: 0, k: [960.5, 196.5, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } },
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
                                            [0, 0],
                                        ],
                                        o: [
                                            [0, 0],
                                            [0, 0],
                                            [0, 0],
                                            [0, 0],
                                            [0, 0],
                                            [0, 0],
                                        ],
                                        v: [
                                            [-0.999, -98.589],
                                            [-959.433, -195.469],
                                            [-960.004, -195.469],
                                            [-960.004, 195.469],
                                            [960.004, 195.469],
                                            [960.004, -195.399],
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
                            { ty: 'tr', p: { a: 0, k: [960.499, 196.698], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
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
                ind: 3,
                ty: 4,
                nm: 'Layer 7 Outlines 2',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [478.875, 722.5, 0], ix: 2 }, a: { a: 0, k: [480.5, 64.5, 0], ix: 1 }, s: { a: 0, k: [-100, 100, 100], ix: 6 } },
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
                                            i: { x: 0.263, y: 1 },
                                            o: { x: 0.791, y: 0 },
                                            t: 0,
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
                                                        [480.361, -30.956],
                                                        [480.493, -30.852],
                                                        [-479.992, 63.958],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.263, y: 1 },
                                            o: { x: 0.802, y: 0 },
                                            t: 60,
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
                                                        [480.361, -94.956],
                                                        [479.993, -31.977],
                                                        [-479.992, 63.958],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.304, y: 1 },
                                            o: { x: 0.802, y: 0 },
                                            t: 68,
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
                                                        [480.361, -94.956],
                                                        [479.993, -31.977],
                                                        [-479.992, 63.958],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            t: 158.000006435472,
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
                                                        [480.361, -30.956],
                                                        [480.493, -30.852],
                                                        [-479.97, 66.083],
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
                            { ty: 'tr', p: { a: 0, k: [480.51, 64.275], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
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
                ip: 0,
                op: 300.00001221925,
                st: 0,
                bm: 0,
            },
            {
                ddd: 0,
                ind: 4,
                ty: 4,
                nm: 'Layer 5 Outlines 2',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [478.875, 706.5, 0], ix: 2 }, a: { a: 0, k: [480.5, 80.5, 0], ix: 1 }, s: { a: 0, k: [-100, 100, 100], ix: 6 } },
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
                                            i: { x: 0.263, y: 1 },
                                            o: { x: 0.791, y: 0 },
                                            t: 2,
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
                                                        [479.637, -14.498],
                                                        [479.756, -14.412],
                                                        [-480, 80.003],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.698, y: 1 },
                                            o: { x: 0.802, y: 0 },
                                            t: 62,
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
                                                        [479.672, -141.748],
                                                        [479.898, -16.412],
                                                        [-480, 80.003],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.202, y: 1 },
                                            o: { x: 0.612, y: 0 },
                                            t: 84,
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
                                                        [479.672, -141.748],
                                                        [479.898, -16.412],
                                                        [-480, 80.003],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            t: 151.000006150356,
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
                                                        [479.637, -14.498],
                                                        [479.756, -14.412],
                                                        [-480, 80.003],
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
                            { ty: 'tr', p: { a: 0, k: [481.125, 80.349], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
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
                ip: 2.00000008146167,
                op: 302.000012300712,
                st: 2.00000008146167,
                bm: 0,
            },
            {
                ddd: 0,
                ind: 5,
                ty: 4,
                nm: 'Layer 2 Outlines 2',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [478.875, 690.5, 0], ix: 2 }, a: { a: 0, k: [480.5, 96.5, 0], ix: 1 }, s: { a: 0, k: [-100, 100, 100], ix: 6 } },
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
                                            i: { x: 0.263, y: 1 },
                                            o: { x: 0.791, y: 0 },
                                            t: 5,
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
                                                        [-480.005, 95.999],
                                                        [480.158, 0.998],
                                                        [480.392, 1.004],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.263, y: 1 },
                                            o: { x: 0.802, y: 0 },
                                            t: 65,
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
                                                        [-480.005, 95.999],
                                                        [479.892, 2.248],
                                                        [480.392, -187.121],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.119, y: 1 },
                                            o: { x: 0.802, y: 0 },
                                            t: 73,
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
                                                        [-480.005, 95.999],
                                                        [479.892, 2.248],
                                                        [480.392, -187.121],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            t: 144.00000586524,
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
                                                        [-480.011, 97.124],
                                                        [480.158, 0.998],
                                                        [480.392, 1.004],
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
                            { ty: 'tr', p: { a: 0, k: [480.505, 96.235], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
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
                ip: 5.00000020365417,
                op: 305.000012422905,
                st: 5.00000020365417,
                bm: 0,
            },
            {
                ddd: 0,
                ind: 6,
                ty: 4,
                nm: 'Layer 7 Outlines',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [1439.875, 721.5, 0], ix: 2 }, a: { a: 0, k: [480.5, 64.5, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } },
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
                                            i: { x: 0.263, y: 1 },
                                            o: { x: 0.791, y: 0 },
                                            t: 0,
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
                                                        [480.361, -30.956],
                                                        [480.493, -30.852],
                                                        [-479.992, 63.958],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.263, y: 1 },
                                            o: { x: 0.802, y: 0 },
                                            t: 74,
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
                                                        [480.361, -94.956],
                                                        [479.993, -31.977],
                                                        [-479.992, 63.958],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.119, y: 1 },
                                            o: { x: 0.802, y: 0 },
                                            t: 82,
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
                                                        [480.361, -94.956],
                                                        [479.993, -31.977],
                                                        [-479.992, 63.958],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            t: 178.000007250089,
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
                                                        [480.361, -30.956],
                                                        [480.493, -30.852],
                                                        [-479.985, 65.708],
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
                            { ty: 'tr', p: { a: 0, k: [480.51, 64.275], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
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
                ip: 0,
                op: 300.00001221925,
                st: 0,
                bm: 0,
            },
            {
                ddd: 0,
                ind: 7,
                ty: 4,
                nm: 'Layer 5 Outlines',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [1439.875, 705.5, 0], ix: 2 }, a: { a: 0, k: [480.5, 80.5, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } },
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
                                            i: { x: 0.263, y: 1 },
                                            o: { x: 0.791, y: 0 },
                                            t: 2,
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
                                                        [479.637, -14.498],
                                                        [479.756, -14.412],
                                                        [-480, 80.003],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.263, y: 1 },
                                            o: { x: 0.802, y: 0 },
                                            t: 76,
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
                                                        [479.672, -141.748],
                                                        [479.898, -16.412],
                                                        [-480, 80.003],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.119, y: 1 },
                                            o: { x: 0.802, y: 0 },
                                            t: 85,
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
                                                        [479.672, -141.748],
                                                        [479.898, -16.412],
                                                        [-480, 80.003],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            t: 171.000006964973,
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
                                                        [479.637, -14.498],
                                                        [479.756, -14.412],
                                                        [-480.001, 81.878],
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
                            { ty: 'tr', p: { a: 0, k: [481.125, 80.349], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
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
                ip: 2.00000008146167,
                op: 302.000012300712,
                st: 2.00000008146167,
                bm: 0,
            },
            {
                ddd: 0,
                ind: 8,
                ty: 4,
                nm: 'Layer 2 Outlines',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [1439.875, 689.5, 0], ix: 2 }, a: { a: 0, k: [480.5, 96.5, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } },
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
                                            i: { x: 0.263, y: 1 },
                                            o: { x: 0.791, y: 0 },
                                            t: 5,
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
                                                        [-480.005, 95.999],
                                                        [480.158, 0.998],
                                                        [480.392, 1.004],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.263, y: 1 },
                                            o: { x: 0.802, y: 0 },
                                            t: 79,
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
                                                        [-480.005, 95.999],
                                                        [479.892, 2.248],
                                                        [480.392, -187.121],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.119, y: 1 },
                                            o: { x: 0.802, y: 0 },
                                            t: 82,
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
                                                        [-480.005, 95.999],
                                                        [479.892, 2.248],
                                                        [480.392, -187.121],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            t: 164.000006679857,
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
                                                        [-480.021, 97.999],
                                                        [480.158, 0.998],
                                                        [480.392, 1.004],
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
                            { ty: 'tr', p: { a: 0, k: [480.603, 96.31], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
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
                ip: 5.00000020365417,
                op: 305.000012422905,
                st: 5.00000020365417,
                bm: 0,
            },
        ],
        markers: [],
    };
};
