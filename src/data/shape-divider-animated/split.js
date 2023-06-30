import { directionStartEndPoint, gradientDefault } from 'gutenverse-core/helper';

export const ShapeDivSplit = (props) => {
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
        meta: { g: 'LottieFiles AE 3.0.2', a: '', k: '', d: '', tc: '' },
        fr: 29.9700012207031,
        ip: 0,
        op: 115.000004684046,
        w: width,
        h: height,
        nm: 'Split Opacity',
        ddd: 0,
        assets: [],
        layers: [
            {
                ddd: 0,
                ind: 1,
                ty: 4,
                nm: 'Shape Layer 10',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [960, 540, 0], ix: 2 }, a: { a: 0, k: [0, 0, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } },
                ao: 0,
                shapes: [
                    {
                        ty: 'gr',
                        it: [
                            { ind: 0, ty: 'sh', ix: 1, ks: { a: 0, k: { i: [[0, 0]], o: [[0, 0]], v: [[1074, 626]], c: false }, ix: 2 }, nm: 'Path 1', mn: 'ADBE Vector Shape - Group', hd: false },
                            { ty: 'st', c: { a: 0, k: [0.360784313725, 0.815686334348, 0.854902020623, 1], ix: 3 }, o: { a: 0, k: 100, ix: 4 }, w: { a: 0, k: 89, ix: 5 }, lc: 1, lj: 1, ml: 4, bm: 0, nm: 'Stroke 1', mn: 'ADBE Vector Graphic - Stroke', hd: false },
                            { ty: 'tr', p: { a: 0, k: [0, 0], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
                        ],
                        nm: 'Shape 1',
                        np: 3,
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
                nm: 'Layer 10 Outlines',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [959.5, 909, 0], ix: 2 }, a: { a: 0, k: [960.5, 172, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } },
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
                                            [115, -9.561],
                                            [0, 0],
                                            [21.413, -21.419],
                                            [0, -31.494],
                                            [22.259, 22.208],
                                            [31.448, 0],
                                            [160.079, 18.262],
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
                                            [-243.962, 20.282],
                                            [-30.189, 0.915],
                                            [-22.27, 22.268],
                                            [-0.07, -31.449],
                                            [-22.263, -22.214],
                                            [0, 0],
                                            [-114.5, -13.062],
                                            [0, 0],
                                            [0, 0],
                                            [0, 0],
                                            [0, 0],
                                            [0, 0],
                                            [0, 0],
                                            [0, 0],
                                        ],
                                        v: [
                                            [975.747, -221.177],
                                            [813.558, -179.177],
                                            [115.148, -171.177],
                                            [34.783, -136.458],
                                            [0, -52.493],
                                            [-34.868, -136.288],
                                            [-118.459, -171.164],
                                            [-815.442, -179.675],
                                            [-959.541, -213.677],
                                            [-959.943, 113.917],
                                            [-959.943, 140.915],
                                            [-959.943, 171.177],
                                            [967.943, 175.177],
                                            [965.943, 141.915],
                                            [970.943, 113.917],
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
                            { ty: 'tr', p: { a: 0, k: [960.442, 171.738], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
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
                nm: 'Shape Layer 9',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [960, 540, 0], ix: 2 }, a: { a: 0, k: [0, 0, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } },
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
                                            [-206.894, -19.479],
                                            [-72.515, 0],
                                            [0, 0],
                                        ],
                                        o: [
                                            [19, 14],
                                            [207.091, 19.498],
                                            [94, 0],
                                            [0, 0],
                                        ],
                                        v: [
                                            [-1000, 108],
                                            [-741.106, 186.479],
                                            [-110, 196],
                                            [-27.5, 342.5],
                                        ],
                                        c: false,
                                    },
                                    ix: 2,
                                },
                                nm: 'Path 1',
                                mn: 'ADBE Vector Shape - Group',
                                hd: false,
                            },
                            colorObj1,
                            { ty: 'tr', p: { a: 0, k: [0, 0], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
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
                                { i: { x: [0.12], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [100] },
                                { t: 37.0000015070409, s: [0] },
                            ],
                            ix: 1,
                        },
                        e: {
                            a: 1,
                            k: [
                                { i: { x: [0.288], y: [1] }, o: { x: [0.507], y: [0] }, t: 71, s: [100] },
                                { t: 106.716254346642, s: [0] },
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
                nm: 'Shape Layer 8',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [960, 515, 0], ix: 2 }, a: { a: 0, k: [0, 0, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } },
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
                                            [-244.995, -31.682],
                                            [-61.209, -0.158],
                                            [-11.947, -5.502],
                                            [-8.09, -13.639],
                                            [0, 0],
                                        ],
                                        o: [
                                            [0, 0],
                                            [221.877, 28.692],
                                            [15.143, 0.039],
                                            [16.484, 7.591],
                                            [27.038, 45.58],
                                            [0, 0],
                                        ],
                                        v: [
                                            [-1009, 60],
                                            [-731.005, 179.682],
                                            [-152, 195],
                                            [-81.484, 200.409],
                                            [-52.127, 225.575],
                                            [-27, 345],
                                        ],
                                        c: false,
                                    },
                                    ix: 2,
                                },
                                nm: 'Path 1',
                                mn: 'ADBE Vector Shape - Group',
                                hd: false,
                            },
                            colorObj2,
                            { ty: 'tr', p: { a: 0, k: [0, 0], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
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
                                { i: { x: [0.12], y: [1] }, o: { x: [0.333], y: [0] }, t: 3, s: [100] },
                                { t: 40.0000016292334, s: [0] },
                            ],
                            ix: 1,
                        },
                        e: {
                            a: 1,
                            k: [
                                { i: { x: [0.253], y: [1] }, o: { x: [0.503], y: [0] }, t: 67, s: [100] },
                                { t: 103.630004220936, s: [0] },
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
                ],
                ip: 3.00000012219251,
                op: 303.000012341443,
                st: 3.00000012219251,
                bm: 0,
            },
            {
                ddd: 0,
                ind: 5,
                ty: 4,
                nm: 'Shape Layer 7',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [960, 504, 0], ix: 2 }, a: { a: 0, k: [0, 0, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } },
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
                                            [-228.244, -37.339],
                                            [-82, -1],
                                            [-13.896, -3.136],
                                            [0, 0],
                                        ],
                                        o: [
                                            [0, 0],
                                            [229.999, 37.626],
                                            [20.505, 0.25],
                                            [56.771, 12.814],
                                            [0, 0],
                                        ],
                                        v: [
                                            [-1033, 11],
                                            [-734.999, 164.374],
                                            [-180, 196],
                                            [-90.271, 200.686],
                                            [-45.5, 370.5],
                                        ],
                                        c: false,
                                    },
                                    ix: 2,
                                },
                                nm: 'Path 1',
                                mn: 'ADBE Vector Shape - Group',
                                hd: false,
                            },
                            colorObj3,
                            { ty: 'tr', p: { a: 0, k: [0, 0], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
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
                                { i: { x: [0.12], y: [1] }, o: { x: [0.333], y: [0] }, t: 6, s: [100] },
                                { t: 43.0000017514259, s: [0] },
                            ],
                            ix: 1,
                        },
                        e: {
                            a: 1,
                            k: [
                                { i: { x: [0.262], y: [1] }, o: { x: [0.506], y: [0] }, t: 63, s: [100] },
                                { t: 99.0000040323527, s: [0] },
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
                ],
                ip: 6.00000024438501,
                op: 306.000012463636,
                st: 6.00000024438501,
                bm: 0,
            },
            {
                ddd: 0,
                ind: 6,
                ty: 4,
                nm: 'Shape Layer 6',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [960, 540, 0], ix: 2 }, a: { a: 0, k: [0, 0, 0], ix: 1 }, s: { a: 0, k: [-100, 100, 100], ix: 6 } },
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
                                            [-206.894, -19.479],
                                            [-72.515, 0],
                                            [0, 0],
                                        ],
                                        o: [
                                            [19, 14],
                                            [207.091, 19.498],
                                            [94, 0],
                                            [0, 0],
                                        ],
                                        v: [
                                            [-1000, 108],
                                            [-741.106, 186.479],
                                            [-110, 196],
                                            [-27.5, 342.5],
                                        ],
                                        c: false,
                                    },
                                    ix: 2,
                                },
                                nm: 'Path 1',
                                mn: 'ADBE Vector Shape - Group',
                                hd: false,
                            },
                            colorObj1,
                            { ty: 'tr', p: { a: 0, k: [0, 0], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
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
                                { i: { x: [0.12], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [100] },
                                { t: 37.0000015070409, s: [0] },
                            ],
                            ix: 1,
                        },
                        e: {
                            a: 1,
                            k: [
                                { i: { x: [0.288], y: [1] }, o: { x: [0.507], y: [0] }, t: 71, s: [100] },
                                { t: 106.716254346642, s: [0] },
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
                nm: 'Shape Layer 5',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [960, 515, 0], ix: 2 }, a: { a: 0, k: [0, 0, 0], ix: 1 }, s: { a: 0, k: [-100, 100, 100], ix: 6 } },
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
                                            [-244.995, -31.682],
                                            [-61.209, -0.158],
                                            [-11.947, -5.502],
                                            [-8.09, -13.639],
                                            [0, 0],
                                        ],
                                        o: [
                                            [0, 0],
                                            [221.877, 28.692],
                                            [15.143, 0.039],
                                            [16.484, 7.591],
                                            [27.038, 45.58],
                                            [0, 0],
                                        ],
                                        v: [
                                            [-1009, 60],
                                            [-731.005, 179.682],
                                            [-152, 195],
                                            [-81.484, 200.409],
                                            [-52.127, 225.575],
                                            [-27, 345],
                                        ],
                                        c: false,
                                    },
                                    ix: 2,
                                },
                                nm: 'Path 1',
                                mn: 'ADBE Vector Shape - Group',
                                hd: false,
                            },
                            colorObj2,
                            { ty: 'tr', p: { a: 0, k: [0, 0], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
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
                                { i: { x: [0.12], y: [1] }, o: { x: [0.333], y: [0] }, t: 3, s: [100] },
                                { t: 40.0000016292334, s: [0] },
                            ],
                            ix: 1,
                        },
                        e: {
                            a: 1,
                            k: [
                                { i: { x: [0.253], y: [1] }, o: { x: [0.503], y: [0] }, t: 67, s: [100] },
                                { t: 103.630004220936, s: [0] },
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
                ],
                ip: 3.00000012219251,
                op: 303.000012341443,
                st: 3.00000012219251,
                bm: 0,
            },
            {
                ddd: 0,
                ind: 8,
                ty: 4,
                nm: 'Shape Layer 4',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [960, 504, 0], ix: 2 }, a: { a: 0, k: [0, 0, 0], ix: 1 }, s: { a: 0, k: [-100, 100, 100], ix: 6 } },
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
                                            [-228.244, -37.339],
                                            [-82, -1],
                                            [-13.896, -3.136],
                                            [0, 0],
                                        ],
                                        o: [
                                            [0, 0],
                                            [229.999, 37.626],
                                            [20.505, 0.25],
                                            [56.771, 12.814],
                                            [0, 0],
                                        ],
                                        v: [
                                            [-1033, 11],
                                            [-734.999, 164.374],
                                            [-180, 196],
                                            [-92.271, 204.686],
                                            [-57.5, 388.5],
                                        ],
                                        c: false,
                                    },
                                    ix: 2,
                                },
                                nm: 'Path 1',
                                mn: 'ADBE Vector Shape - Group',
                                hd: false,
                            },
                            colorObj3,
                            { ty: 'tr', p: { a: 0, k: [0, 0], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
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
                                { i: { x: [0.12], y: [1] }, o: { x: [0.333], y: [0] }, t: 6, s: [100] },
                                { t: 43.0000017514259, s: [0] },
                            ],
                            ix: 1,
                        },
                        e: {
                            a: 1,
                            k: [
                                { i: { x: [0.262], y: [1] }, o: { x: [0.506], y: [0] }, t: 63, s: [100] },
                                { t: 99.0000040323527, s: [0] },
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
                ],
                ip: 6.00000024438501,
                op: 306.000012463636,
                st: 6.00000024438501,
                bm: 0,
            },
        ],
        markers: [],
    };
};
