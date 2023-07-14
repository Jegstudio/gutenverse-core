import { directionStartEndPoint, gradientDefault } from 'gutenverse-core/helper';

export const ShapeDivCurveAsymetricalNegative = (props) => {
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
    let colorObj1 = { ty: 'st', c: { a: 0, k: [0.270588235294, 0.498039215686, 0.929411764706, 1], ix: 3 }, o: { a: 0, k: 100, ix: 4 }, w: { a: 0, k: 51, ix: 5 }, lc: 1, lj: 1, ml: 4, bm: 0, nm: 'Stroke 1', mn: 'ADBE Vector Graphic - Stroke', hd: false };
    let colorObj2 = { ty: 'st', c: { a: 0, k: [0.317647058824, 0.658823529412, 0.894117647059, 1], ix: 3 }, o: { a: 0, k: 100, ix: 4 }, w: { a: 0, k: 43, ix: 5 }, lc: 1, lj: 1, ml: 4, bm: 0, nm: 'Stroke 1', mn: 'ADBE Vector Graphic - Stroke', hd: false };
    let colorObj3 = { ty: 'st', c: { a: 0, k: [0.360784313725, 0.81568627451, 0.854901960784, 1], ix: 3 }, o: { a: 0, k: 100, ix: 4 }, w: { a: 0, k: 42, ix: 5 }, lc: 1, lj: 1, ml: 4, bm: 0, nm: 'Stroke 1', mn: 'ADBE Vector Graphic - Stroke', hd: false };

    if (colorMode === 'default') {
        if (color0) {
            colorObj0 = { ty: 'fl', c: { a: 0, k: [color0.r / 255, color0.g / 255, color0.b / 255, 1], ix: 4 }, o: { a: 0, k: color0.a * 100, ix: 5 }, r: 1, bm: 0, nm: 'Fill 1', mn: 'ADBE Vector Graphic - Fill', hd: false };
        }

        if (color1) {
            colorObj1 = { ty: 'st', c: { a: 0, k: [color1.r / 255, color1.g / 255, color1.b / 255, 1], ix: 3 }, o: { a: 0, k: color1.a * 100, ix: 4 }, w: { a: 0, k: 51, ix: 5 }, lc: 1, lj: 1, ml: 4, bm: 0, nm: 'Stroke 1', mn: 'ADBE Vector Graphic - Stroke', hd: false };
        }

        if (color2) {
            colorObj2 = { ty: 'st', c: { a: 0, k: [color2.r / 255, color2.g / 255, color2.b / 255, 1], ix: 3 }, o: { a: 0, k: color2.a * 100, ix: 4 }, w: { a: 0, k: 43, ix: 5 }, lc: 1, lj: 1, ml: 4, bm: 0, nm: 'Stroke 1', mn: 'ADBE Vector Graphic - Stroke', hd: false };
        }

        if (color3) {
            colorObj3 = { ty: 'st', c: { a: 0, k: [color3.r / 255, color3.g / 255, color3.b / 255, 1], ix: 3 }, o: { a: 0, k: color3.a * 100, ix: 4 }, w: { a: 0, k: 42, ix: 5 }, lc: 1, lj: 1, ml: 4, bm: 0, nm: 'Stroke 1', mn: 'ADBE Vector Graphic - Stroke', hd: false };
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
                ty: 'gs',
                o: {
                    a: 0,
                    k: 100,
                },
                w: { a: 0, k: 51, ix: 5 },
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
                ty: 'gs',
                o: {
                    a: 0,
                    k: 100,
                },
                w: { a: 0, k: 51, ix: 5 },
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
                ty: 'gs',
                o: {
                    a: 0,
                    k: 100,
                },
                w: { a: 0, k: 51, ix: 5 },
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
        meta: { g: 'LottieFiles AE 3.0.2', a: '', k: '', d: '', tc: 'none' },
        fr: 29.9700012207031,
        ip: 0,
        op: 134.000005457932,
        w: 1920,
        h: 1080,
        nm: 'Curve Opacity',
        ddd: 0,
        assets: [],
        layers: [
            {
                ddd: 0,
                ind: 1,
                ty: 4,
                nm: 'Layer 4 Outlines',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [959.5, 852, 0], ix: 2 }, a: { a: 0, k: [960.5, 228, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } },
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
                                            [380.356, -40.68],
                                            [196.711, -108.734],
                                            [0, 0],
                                            [0, 0],
                                        ],
                                        o: [
                                            [-220.116, -0.984],
                                            [-406.898, 43.519],
                                            [0, 0],
                                            [0, 0],
                                            [0, 0],
                                        ],
                                        v: [
                                            [958.99, -181.469],
                                            [-33.923, -137.471],
                                            [-959.267, 96.032],
                                            [-960.001, 227.464],
                                            [959.999, 227.469],
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
                            { ty: 'tr', p: { a: 0, k: [962.869, 228.953], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100.238, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
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
                nm: 'Shape Layer 1',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [1918, 612, 0], ix: 2 }, a: { a: 0, k: [958, 80, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } },
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
                                            [614.671, -53.344],
                                            [0, 0],
                                        ],
                                        o: [
                                            [0, 0],
                                            [-672.93, 58.4],
                                            [0, 0],
                                        ],
                                        v: [
                                            [1047, 159.539],
                                            [-34, 171.259],
                                            [-980.75, 385.664],
                                        ],
                                        c: false,
                                    },
                                    ix: 2,
                                },
                                nm: 'Path 1',
                                mn: 'ADBE Vector Shape - Group',
                                hd: false,
                            },
                            {
                                ty: 'tm',
                                s: {
                                    a: 1,
                                    k: [
                                        { i: { x: [0.418], y: [1] }, o: { x: [0.241], y: [0] }, t: 67, s: [0] },
                                        { t: 114.000004643315, s: [100] },
                                    ],
                                    ix: 1,
                                },
                                e: {
                                    a: 1,
                                    k: [
                                        { i: { x: [0.009], y: [1] }, o: { x: [0.269], y: [0] }, t: 0, s: [0] },
                                        { t: 28.0000011404634, s: [100] },
                                    ],
                                    ix: 2,
                                },
                                o: { a: 0, k: 0, ix: 3 },
                                m: 1,
                                ix: 2,
                                nm: 'Trim Paths 1',
                                mn: 'ADBE Vector Filter - Trim',
                                hd: false,
                            },
                            colorObj1,
                            { ty: 'tr', p: { a: 0, k: [0.93, 1.453], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 104.741], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
                        ],
                        nm: 'Shape 1',
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
                ind: 3,
                ty: 4,
                nm: 'Shape Layer 3',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [1919, 607, 0], ix: 2 }, a: { a: 0, k: [958, 76, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } },
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
                                            [660.578, -44.141],
                                            [0, 0],
                                        ],
                                        o: [
                                            [0, 0],
                                            [-690.641, 46.15],
                                            [0, 0],
                                        ],
                                        v: [
                                            [1032.911, 190.568],
                                            [-42.559, 188.444],
                                            [-990.013, 379.696],
                                        ],
                                        c: false,
                                    },
                                    ix: 2,
                                },
                                nm: 'Path 1',
                                mn: 'ADBE Vector Shape - Group',
                                hd: false,
                            },
                            {
                                ty: 'tm',
                                s: {
                                    a: 1,
                                    k: [
                                        { i: { x: [0.418], y: [1] }, o: { x: [0.241], y: [0] }, t: 64, s: [0] },
                                        { t: 103.000004195276, s: [100] },
                                    ],
                                    ix: 1,
                                },
                                e: {
                                    a: 1,
                                    k: [
                                        { i: { x: [0.068], y: [1] }, o: { x: [0.49], y: [0] }, t: 7, s: [0] },
                                        { t: 38.0000015477717, s: [100] },
                                    ],
                                    ix: 2,
                                },
                                o: { a: 0, k: 0, ix: 3 },
                                m: 1,
                                ix: 2,
                                nm: 'Trim Paths 1',
                                mn: 'ADBE Vector Filter - Trim',
                                hd: false,
                            },
                            colorObj2,
                            { ty: 'tr', p: { a: 0, k: [2.941, -38.145], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100.33, 104.741], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
                        ],
                        nm: 'Shape 1',
                        np: 4,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: 'ADBE Vector Group',
                        hd: false,
                    },
                ],
                ip: 7.00000028511585,
                op: 307.000012504366,
                st: 7.00000028511585,
                bm: 0,
            },
            {
                ddd: 0,
                ind: 4,
                ty: 4,
                nm: 'Shape Layer 2',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [1920, 596, 0], ix: 2 }, a: { a: 0, k: [960, 110, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } },
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
                                            [619.352, -32.745],
                                            [0, 0],
                                        ],
                                        o: [
                                            [0, 0],
                                            [-737.77, 39.006],
                                            [0, 0],
                                        ],
                                        v: [
                                            [968.5, 224.939],
                                            [-30.293, 212.373],
                                            [-1000.5, 379.22],
                                        ],
                                        c: false,
                                    },
                                    ix: 2,
                                },
                                nm: 'Path 1',
                                mn: 'ADBE Vector Shape - Group',
                                hd: false,
                            },
                            {
                                ty: 'tm',
                                s: {
                                    a: 1,
                                    k: [
                                        { i: { x: [0.418], y: [1] }, o: { x: [0.241], y: [0] }, t: 59, s: [0] },
                                        { t: 94.0000038286985, s: [100] },
                                    ],
                                    ix: 1,
                                },
                                e: {
                                    a: 1,
                                    k: [
                                        { i: { x: [0.125], y: [1] }, o: { x: [0.533], y: [0] }, t: 16, s: [0] },
                                        { t: 47.0000019143492, s: [100] },
                                    ],
                                    ix: 2,
                                },
                                o: { a: 0, k: 0, ix: 3 },
                                m: 1,
                                ix: 2,
                                nm: 'Trim Paths 1',
                                mn: 'ADBE Vector Filter - Trim',
                                hd: false,
                            },
                            colorObj3,
                            { ty: 'tr', p: { a: 0, k: [2.941, -38.145], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 104.741], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
                        ],
                        nm: 'Shape 1',
                        np: 4,
                        cix: 2,
                        bm: 0,
                        ix: 1,
                        mn: 'ADBE Vector Group',
                        hd: false,
                    },
                ],
                ip: 16.0000006516934,
                op: 316.000012870944,
                st: 16.0000006516934,
                bm: 0,
            },
        ],
        markers: [],
    };
};
