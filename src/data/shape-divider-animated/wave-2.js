import { directionStartEndPoint, gradientDefault } from 'gutenverse-core/helper';

export const ShapeDivWave2 = (props) => {
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
    let colorObj1 = { ty: 'st', c: { a: 0, k: [0.270588235294, 0.498039215686, 0.929411764706, 1], ix: 3 }, o: { a: 0, k: 100, ix: 4 }, w: { a: 0, k: 43, ix: 5 }, lc: 1, lj: 1, ml: 4, bm: 0, nm: 'Stroke 1', mn: 'ADBE Vector Graphic - Stroke', hd: false };
    let colorObj2 = { ty: 'st', c: { a: 0, k: [0.317647058824, 0.658823529412, 0.894117647059, 1], ix: 3 }, o: { a: 0, k: 100, ix: 4 }, w: { a: 0, k: 59, ix: 5 }, lc: 1, lj: 1, ml: 4, bm: 0, nm: 'Stroke 1', mn: 'ADBE Vector Graphic - Stroke', hd: false };
    let colorObj3 = { ty: 'st', c: { a: 0, k: [0.360784313725, 0.81568627451, 0.854901960784, 1], ix: 3 }, o: { a: 0, k: 100, ix: 4 }, w: { a: 0, k: 59, ix: 5 }, lc: 1, lj: 1, ml: 4, bm: 0, nm: 'Stroke 1', mn: 'ADBE Vector Graphic - Stroke', hd: false };

    if (colorMode === 'default') {
        if (color0) {
            colorObj0 = { ty: 'fl', c: { a: 0, k: [color0.r / 255, color0.g / 255, color0.b / 255, 1], ix: 4 }, o: { a: 0, k: color0.a * 100, ix: 5 }, r: 1, bm: 0, nm: 'Fill 1', mn: 'ADBE Vector Graphic - Fill', hd: false };
        }

        if (color1) {
            colorObj1 = { ty: 'st', c: { a: 0, k: [color1.r / 255, color1.g / 255, color1.b / 255, 1], ix: 3 }, o: { a: 0, k: color1.a * 100, ix: 4 }, w: { a: 0, k: 43, ix: 5 }, lc: 1, lj: 1, ml: 4, bm: 0, nm: 'Stroke 1', mn: 'ADBE Vector Graphic - Stroke', hd: false };
        }

        if (color2) {
            colorObj2 = { ty: 'st', c: { a: 0, k: [color2.r / 255, color2.g / 255, color2.b / 255, 1], ix: 3 }, o: { a: 0, k: color2.a * 100, ix: 4 }, w: { a: 0, k: 59, ix: 5 }, lc: 1, lj: 1, ml: 4, bm: 0, nm: 'Stroke 1', mn: 'ADBE Vector Graphic - Stroke', hd: false };
        }

        if (color3) {
            colorObj3 = { ty: 'st', c: { a: 0, k: [color3.r / 255, color3.g / 255, color3.b / 255, 1], ix: 3 }, o: { a: 0, k: color3.a * 100, ix: 4 }, w: { a: 0, k: 59, ix: 5 }, lc: 1, lj: 1, ml: 4, bm: 0, nm: 'Stroke 1', mn: 'ADBE Vector Graphic - Stroke', hd: false };
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
                w: { a: 0, k: 43, ix: 5 },
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
                w: { a: 0, k: 59, ix: 5 },
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
                w: { a: 0, k: 59, ix: 5 },
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
        op: 169.000006883511,
        w: width,
        h: height,
        nm: 'Wave Opacity 2',
        ddd: 0,
        assets: [],
        layers: [
            {
                ddd: 0,
                ind: 1,
                ty: 4,
                nm: 'Layer 3 Outlines',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [959.5, 911.5, 0], ix: 2 }, a: { a: 0, k: [960.5, 168.5, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } },
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
                                            [-86.739, -14.802],
                                            [-4.025, -0.014],
                                            [-180.968, 35.107],
                                            [-160.629, 19.338],
                                        ],
                                        o: [
                                            [0, 0],
                                            [0, 0],
                                            [0, 0],
                                            [0, 0],
                                            [377.005, 64.335],
                                            [2.085, 0.011],
                                            [171.559, -33.281],
                                            [315.584, -37.993],
                                        ],
                                        v: [
                                            [959.886, -102.894],
                                            [960, 167.776],
                                            [-960, 167.779],
                                            [-961.751, -77.598],
                                            [-798.004, -38.559],
                                            [-287.477, 18.426],
                                            [-0.058, -11.443],
                                            [479.917, -143.731],
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
                            { ty: 'tr', p: { a: 0, k: [960.499, 168.724], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
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
                nm: 'Shape Layer 4',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [970, 540, 0], ix: 2 }, a: { a: 0, k: [0, 0, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } },
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
                                            [216.89, -27.869],
                                            [179.811, -65.549],
                                            [171.413, -9.392],
                                        ],
                                        o: [
                                            [0, 0],
                                            [-179, 23],
                                            [-118.962, 43.367],
                                            [-438, 24],
                                        ],
                                        v: [
                                            [989.5, 259.5],
                                            [537, 203],
                                            [104.689, 340.549],
                                            [-302.5, 417.5],
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
                                { i: { x: [0.116], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [100] },
                                { t: 47.0000019143492, s: [0] },
                            ],
                            ix: 1,
                        },
                        e: {
                            a: 1,
                            k: [
                                { i: { x: [0.372], y: [1] }, o: { x: [0.333], y: [0] }, t: 95, s: [100] },
                                { t: 147.241255997259, s: [0] },
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
                op: 190.000007738859,
                st: 0,
                bm: 0,
            },
            {
                ddd: 0,
                ind: 3,
                ty: 4,
                nm: 'Shape Layer 5',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [970, 540, 0], ix: 2 }, a: { a: 0, k: [0, 0, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } },
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
                                            [175, -25],
                                            [239.335, -84.471],
                                            [0, 0],
                                        ],
                                        o: [
                                            [0, 0],
                                            [-200.694, 28.671],
                                            [-212.5, 75],
                                            [0, 0],
                                        ],
                                        v: [
                                            [980, 220.25],
                                            [552, 156],
                                            [52, 356.5],
                                            [-317, 420.5],
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
                                { i: { x: [0.116], y: [1] }, o: { x: [0.333], y: [0] }, t: 4, s: [100] },
                                { t: 51.0000020772726, s: [0] },
                            ],
                            ix: 1,
                        },
                        e: {
                            a: 1,
                            k: [
                                { i: { x: [0.372], y: [1] }, o: { x: [0.333], y: [0] }, t: 92, s: [100] },
                                { t: 144.00000586524, s: [0] },
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
                ip: 4.00000016292334,
                op: 190.000007738859,
                st: 4.00000016292334,
                bm: 0,
            },
            {
                ddd: 0,
                ind: 4,
                ty: 4,
                nm: 'Shape Layer 6',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [970, 540, 0], ix: 2 }, a: { a: 0, k: [0, 0, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } },
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
                                            [237.263, -14.05],
                                            [197.5, -74],
                                            [0, 0],
                                        ],
                                        o: [
                                            [0, 0],
                                            [-223.749, 13.25],
                                            [-195.092, 73.098],
                                            [0, 0],
                                        ],
                                        v: [
                                            [1007, 192.5],
                                            [586.749, 115.75],
                                            [29.5, 357],
                                            [-326, 419.5],
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
                                { i: { x: [0.116], y: [1] }, o: { x: [0.333], y: [0] }, t: 9, s: [100] },
                                { t: 56.0000022809268, s: [0] },
                            ],
                            ix: 1,
                        },
                        e: {
                            a: 1,
                            k: [
                                { i: { x: [0.372], y: [1] }, o: { x: [0.333], y: [0] }, t: 87.759, s: [100] },
                                { t: 140.000005702317, s: [0] },
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
                ip: 9.00000036657752,
                op: 190.000007738859,
                st: 9.00000036657752,
                bm: 0,
            },
            {
                ddd: 0,
                ind: 5,
                ty: 4,
                nm: 'Shape Layer 2',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [970, 540, 0], ix: 2 }, a: { a: 0, k: [0, 0, 0], ix: 1 }, s: { a: 0, k: [101.65, 98.982, 100], ix: 6 } },
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
                                            [-303, -6.062],
                                        ],
                                        o: [
                                            [0, 0],
                                            [461.019, 9.223],
                                        ],
                                        v: [
                                            [-1004.299, 262.222],
                                            [-297.343, 413.711],
                                        ],
                                        c: false,
                                    },
                                    ix: 2,
                                },
                                nm: 'Path 1',
                                mn: 'ADBE Vector Shape - Group',
                                hd: false,
                            },
                            { ...colorObj1, ...{ w: { a: 0, k: 38, ix: 5 } } },
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
                                { i: { x: [0.186], y: [1] }, o: { x: [0.454], y: [0] }, t: 12, s: [100] },
                                { t: 59.0000024031193, s: [0] },
                            ],
                            ix: 1,
                        },
                        e: {
                            a: 1,
                            k: [
                                { i: { x: [0.57], y: [1] }, o: { x: [0.61], y: [0] }, t: 89, s: [100] },
                                { t: 116.000004724777, s: [0] },
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
                ip: 12.00000048877,
                op: 190.000007738859,
                st: 12.00000048877,
                bm: 0,
            },
            {
                ddd: 0,
                ind: 6,
                ty: 4,
                nm: 'Shape Layer 1',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [970, 540, 0], ix: 2 }, a: { a: 0, k: [0, 0, 0], ix: 1 }, s: { a: 0, k: [101.65, 98.982, 100], ix: 6 } },
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
                                            [-296.114, -12.124],
                                        ],
                                        o: [
                                            [0, 0],
                                            [460.726, 18.863],
                                        ],
                                        v: [
                                            [-1001.594, 229.64],
                                            [-302.016, 415.226],
                                        ],
                                        c: false,
                                    },
                                    ix: 2,
                                },
                                nm: 'Path 1',
                                mn: 'ADBE Vector Shape - Group',
                                hd: false,
                            },
                            { ...colorObj2, ...{ w: { a: 0, k: 41, ix: 5 } } },
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
                                { i: { x: [0.186], y: [1] }, o: { x: [0.454], y: [0] }, t: 16, s: [100] },
                                { t: 63.0000025660426, s: [0] },
                            ],
                            ix: 1,
                        },
                        e: {
                            a: 1,
                            k: [
                                { i: { x: [0.566], y: [1] }, o: { x: [0.61], y: [0] }, t: 86, s: [100] },
                                { t: 113.000004602584, s: [0] },
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
                ip: 16.0000006516934,
                op: 190.000007738859,
                st: 16.0000006516934,
                bm: 0,
            },
            {
                ddd: 0,
                ind: 7,
                ty: 4,
                nm: 'Shape Layer 3',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [970, 540, 0], ix: 2 }, a: { a: 0, k: [0, 0, 0], ix: 1 }, s: { a: 0, k: [101.65, 98.982, 100], ix: 6 } },
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
                                            [-331.529, -22.226],
                                        ],
                                        o: [
                                            [0, 0],
                                            [460.08, 30.845],
                                        ],
                                        v: [
                                            [-1003.562, 193.27],
                                            [-301.033, 415.226],
                                        ],
                                        c: false,
                                    },
                                    ix: 2,
                                },
                                nm: 'Path 1',
                                mn: 'ADBE Vector Shape - Group',
                                hd: false,
                            },
                            { ...colorObj3, ...{ w: { a: 0, k: 41, ix: 5 } } },
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
                                { i: { x: [0.186], y: [1] }, o: { x: [0.454], y: [0] }, t: 21, s: [100] },
                                { t: 68.0000027696968, s: [0] },
                            ],
                            ix: 1,
                        },
                        e: {
                            a: 1,
                            k: [
                                { i: { x: [0.748], y: [1] }, o: { x: [0.61], y: [0] }, t: 80, s: [100] },
                                { t: 109.000004439661, s: [0] },
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
                ip: 21.0000008553475,
                op: 190.000007738859,
                st: 21.0000008553475,
                bm: 0,
            },
        ],
        markers: [],
    };
};
