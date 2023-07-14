import { directionStartEndPoint, gradientDefault } from 'gutenverse-core/helper';

export const ShapeDivMountain = (props) => {
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
        op: 215.00000875713,
        w: width,
        h: height,
        nm: 'Mountain Opacity',
        ddd: 0,
        assets: [],
        layers: [
            {
                ddd: 0,
                ind: 1,
                ty: 4,
                nm: 'Layer 7 Outlines',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [959.5, 874.5, 0], ix: 2 }, a: { a: 0, k: [960.5, 205.5, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } },
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
                                            [0, 0],
                                        ],
                                        o: [
                                            [0, 0],
                                            [0, 0],
                                            [0, 0],
                                            [0, 0],
                                            [0, 0],
                                            [0, 0],
                                            [0, 0],
                                        ],
                                        v: [
                                            [959.979, -205.064],
                                            [968.979, 213.064],
                                            [-959.979, 205.064],
                                            [-959.979, 162.929],
                                            [-478.393, 93.331],
                                            [-0.002, -147.465],
                                            [494.388, 91.731],
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
                            { ty: 'tr', p: { a: 0, k: [960.478, 205.437], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
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
                nm: 'Layer 6 Outlines',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [479.5, 882, 0], ix: 2 }, a: { a: 0, k: [480.5, 156, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } },
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
                                            i: { x: 0.125, y: 1 },
                                            o: { x: 0.167, y: 0 },
                                            t: 12,
                                            s: [
                                                {
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
                                                        [479.989, -155.195],
                                                        [1.999, 87.602],
                                                        [-480.991, 155.199],
                                                        [-479.982, 203.199],
                                                        [1.198, 203.601],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.125, y: 1 },
                                            o: { x: 0.354, y: 0 },
                                            t: 51,
                                            s: [
                                                {
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
                                                        [479.989, -155.195],
                                                        [-0.001, 53.602],
                                                        [-479.991, 123.199],
                                                        [-479.982, 203.199],
                                                        [1.198, 203.601],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.208, y: 1 },
                                            o: { x: 0.369, y: 0 },
                                            t: 120,
                                            s: [
                                                {
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
                                                        [479.989, -155.195],
                                                        [-0.001, 41.602],
                                                        [-479.991, 103.199],
                                                        [-479.982, 203.199],
                                                        [1.198, 203.601],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            t: 193.000007861051,
                                            s: [
                                                {
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
                                                        [479.989, -155.195],
                                                        [1.999, 87.602],
                                                        [-480.991, 155.199],
                                                        [-479.982, 203.199],
                                                        [1.198, 203.601],
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
                            { ty: 'tr', p: { a: 0, k: [480.489, 156.165], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
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
                ip: 12.00000048877,
                op: 312.000012708021,
                st: 12.00000048877,
                bm: 0,
            },
            {
                ddd: 0,
                ind: 3,
                ty: 4,
                nm: 'Layer 3 Outlines',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [479.5, 866, 0], ix: 2 }, a: { a: 0, k: [480.5, 140, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } },
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
                                            i: { x: 0.125, y: 1 },
                                            o: { x: 0.333, y: 0 },
                                            t: 8,
                                            s: [
                                                {
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
                                                        [-478.991, 172.2],
                                                        [-478.965, 219.699],
                                                        [2.497, 216.851],
                                                        [479.989, -139.195],
                                                        [1.999, 102.226],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.29, y: 1 },
                                            o: { x: 0.354, y: 0 },
                                            t: 47,
                                            s: [
                                                {
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
                                                        [-479.991, 98.2],
                                                        [-479.982, 220.199],
                                                        [-0.003, 218.601],
                                                        [479.989, -139.195],
                                                        [-0.001, 40.601],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.215, y: 1 },
                                            o: { x: 0.369, y: 0 },
                                            t: 115,
                                            s: [
                                                {
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
                                                        [-479.991, 73.2],
                                                        [-479.982, 219.199],
                                                        [-0.003, 217.601],
                                                        [479.989, -140.195],
                                                        [-0.001, 27.601],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            t: 189.000007698128,
                                            s: [
                                                {
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
                                                        [-478.991, 172.2],
                                                        [-478.965, 219.699],
                                                        [2.497, 216.851],
                                                        [479.989, -139.195],
                                                        [1.999, 102.226],
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
                            { ty: 'tr', p: { a: 0, k: [480.489, 140.165], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
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
                ip: 8.00000032584668,
                op: 308.000012545097,
                st: 8.00000032584668,
                bm: 0,
            },
            {
                ddd: 0,
                ind: 4,
                ty: 4,
                nm: 'Layer 3 Outlines 2',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [479.5, 866, 0], ix: 2 }, a: { a: 0, k: [480.5, 140, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } },
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
                                            i: { x: 0.126, y: 1 },
                                            o: { x: 0.333, y: 0 },
                                            t: 4,
                                            s: [
                                                {
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
                                                        [-480.991, 174.2],
                                                        [-479.982, 219.199],
                                                        [0.997, 216.601],
                                                        [479.989, -139.195],
                                                        [-1.001, 104.601],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.282, y: 1 },
                                            o: { x: 0.354, y: 0 },
                                            t: 43,
                                            s: [
                                                {
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
                                                        [-479.991, 63.2],
                                                        [-479.982, 222.199],
                                                        [-0.003, 218.601],
                                                        [479.989, -139.195],
                                                        [-0.001, 18.601],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.206, y: 1 },
                                            o: { x: 0.369, y: 0 },
                                            t: 109,
                                            s: [
                                                {
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
                                                        [-479.991, 25.2],
                                                        [-479.982, 222.199],
                                                        [-0.003, 218.601],
                                                        [479.989, -139.195],
                                                        [-0.001, 5.601],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            t: 185.000007535204,
                                            s: [
                                                {
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
                                                        [-480.991, 174.2],
                                                        [-479.982, 219.199],
                                                        [0.997, 216.601],
                                                        [479.989, -139.195],
                                                        [-1.001, 104.601],
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
                            { ty: 'tr', p: { a: 0, k: [480.489, 140.165], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
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
                ip: 4.00000016292334,
                op: 304.000012382174,
                st: 4.00000016292334,
                bm: 0,
            },
            {
                ddd: 0,
                ind: 5,
                ty: 4,
                nm: 'Layer 5 Outlines',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [1439.5, 818, 0], ix: 2 }, a: { a: 0, k: [480.5, 149, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } },
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
                                            i: { x: 0.125, y: 1 },
                                            o: { x: 0.167, y: 0 },
                                            t: 8,
                                            s: [
                                                {
                                                    i: [
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
                                                    ],
                                                    v: [
                                                        [-479.991, -90.798],
                                                        [30.399, 268.396],
                                                        [479.989, -148.396],
                                                        [11.399, 151.999],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.125, y: 1 },
                                            o: { x: 0.354, y: 0 },
                                            t: 47,
                                            s: [
                                                {
                                                    i: [
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
                                                    ],
                                                    v: [
                                                        [-479.991, -90.798],
                                                        [30.399, 268.396],
                                                        [479.989, -148.396],
                                                        [7.399, 123.999],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.208, y: 1 },
                                            o: { x: 0.369, y: 0 },
                                            t: 136,
                                            s: [
                                                {
                                                    i: [
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
                                                    ],
                                                    v: [
                                                        [-479.991, -90.798],
                                                        [30.399, 268.396],
                                                        [479.989, -148.396],
                                                        [7.399, 105.999],
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
                                                        [0, 0],
                                                    ],
                                                    o: [
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    v: [
                                                        [-479.991, -90.798],
                                                        [30.399, 268.396],
                                                        [479.989, -148.396],
                                                        [11.399, 151.999],
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
                            { ty: 'tr', p: { a: 0, k: [480.469, 148.769], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
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
                ip: 8.00000032584668,
                op: 308.000012545097,
                st: 8.00000032584668,
                bm: 0,
            },
            {
                ddd: 0,
                ind: 6,
                ty: 4,
                nm: 'Layer 4 Outlines',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [1439.5, 802.5, 0], ix: 2 }, a: { a: 0, k: [480.5, 133.5, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } },
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
                                            i: { x: 0.125, y: 1 },
                                            o: { x: 0.167, y: 0 },
                                            t: 4,
                                            s: [
                                                {
                                                    i: [
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
                                                    ],
                                                    v: [
                                                        [-479.991, -75.599],
                                                        [23.899, 288.448],
                                                        [479.989, -133.198],
                                                        [15.249, 168.448],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.125, y: 1 },
                                            o: { x: 0.354, y: 0 },
                                            t: 43,
                                            s: [
                                                {
                                                    i: [
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
                                                    ],
                                                    v: [
                                                        [-479.991, -75.599],
                                                        [23.899, 288.448],
                                                        [479.989, -133.198],
                                                        [1.249, 106.448],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.208, y: 1 },
                                            o: { x: 0.369, y: 0 },
                                            t: 127,
                                            s: [
                                                {
                                                    i: [
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
                                                    ],
                                                    v: [
                                                        [-479.991, -75.599],
                                                        [23.899, 288.448],
                                                        [479.989, -133.198],
                                                        [1.249, 81.447],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            t: 174.000007087165,
                                            s: [
                                                {
                                                    i: [
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
                                                    ],
                                                    v: [
                                                        [-479.991, -75.599],
                                                        [23.899, 288.448],
                                                        [479.989, -133.198],
                                                        [15.249, 168.448],
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
                            { ty: 'tr', p: { a: 0, k: [480.469, 133.57], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
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
                ip: 4.00000016292334,
                op: 304.000012382174,
                st: 4.00000016292334,
                bm: 0,
            },
            {
                ddd: 0,
                ind: 7,
                ty: 4,
                nm: 'Layer 4 Outlines 2',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [1439.5, 802.5, 0], ix: 2 }, a: { a: 0, k: [480.5, 133.5, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } },
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
                                            i: { x: 0.125, y: 1 },
                                            o: { x: 0.167, y: 0 },
                                            t: 0,
                                            s: [
                                                {
                                                    i: [
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
                                                    ],
                                                    v: [
                                                        [-479.991, -75.599],
                                                        [22.899, 285.198],
                                                        [479.989, -133.198],
                                                        [16.249, 169.448],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.125, y: 1 },
                                            o: { x: 0.354, y: 0 },
                                            t: 39,
                                            s: [
                                                {
                                                    i: [
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
                                                    ],
                                                    v: [
                                                        [-479.991, -75.599],
                                                        [22.899, 285.198],
                                                        [479.989, -133.198],
                                                        [-3.751, 73.448],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.208, y: 1 },
                                            o: { x: 0.369, y: 0 },
                                            t: 119,
                                            s: [
                                                {
                                                    i: [
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
                                                    ],
                                                    v: [
                                                        [-479.991, -75.599],
                                                        [22.899, 285.198],
                                                        [479.989, -133.198],
                                                        [-3.751, 39.448],
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
                                                        [0, 0],
                                                    ],
                                                    o: [
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    v: [
                                                        [-479.991, -75.599],
                                                        [22.899, 285.198],
                                                        [479.989, -133.198],
                                                        [16.249, 169.448],
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
                            { ty: 'tr', p: { a: 0, k: [480.469, 133.57], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
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
        ],
        markers: [],
    };
};
