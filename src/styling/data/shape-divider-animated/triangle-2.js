import { directionStartEndPoint, gradientDefault } from 'gutenverse-core/helper';

export const ShapeDivTriangle2 = (props) => {
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
        ip: 1.00000004073083,
        op: 170.000006924242,
        w: width,
        h: height,
        nm: 'Triangle Opacity 2',
        ddd: 0,
        assets: [],
        layers: [
            {
                ddd: 0,
                ind: 1,
                ty: 4,
                nm: 'Layer 7 Outlines',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [959.5, 884, 0], ix: 2 }, a: { a: 0, k: [960.5, 196, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } },
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
                                            [960.017, -195.471],
                                            [960.017, 195.471],
                                            [-960.017, 195.471],
                                            [-960.017, -195.471],
                                            [-358.41, -99.05],
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
                            { ty: 'tr', p: { a: 0, k: [960.516, 196.03], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100.179, 100.009], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
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
                nm: 'Layer 4 Outlines',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [300.5, 720.5, 0], ix: 2 }, a: { a: 0, k: [301.5, 64.5, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } },
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
                                            i: { x: 0.287, y: 1 },
                                            o: { x: 0.804, y: 0 },
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
                                                        [300.803, 64.21],
                                                        [-300.859, -31.211],
                                                        [-300.609, -31.212],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.287, y: 1 },
                                            o: { x: 0.846, y: 0 },
                                            t: 61,
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
                                                        [300.803, 64.21],
                                                        [-300.804, -32.211],
                                                        [-300.609, -94.212],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.252, y: 1 },
                                            o: { x: 0.846, y: 0 },
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
                                                        [300.803, 64.21],
                                                        [-300.804, -32.211],
                                                        [-300.609, -94.212],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            t: 136.000005539394,
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
                                                        [300.803, 64.21],
                                                        [-300.859, -31.211],
                                                        [-300.609, -31.212],
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
                            { ty: 'tr', p: { a: 0, k: [301.303, 64.77], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
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
                ind: 3,
                ty: 4,
                nm: 'Layer 5 Outlines',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [300.5, 704.5, 0], ix: 2 }, a: { a: 0, k: [301.5, 80.5, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } },
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
                                            i: { x: 0.287, y: 1 },
                                            o: { x: 0.804, y: 0 },
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
                                                        [300.803, 80.208],
                                                        [-300.554, -14.938],
                                                        [-300.609, -15.208],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.287, y: 1 },
                                            o: { x: 0.846, y: 0 },
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
                                                        [300.803, 80.208],
                                                        [-300.804, -15.562],
                                                        [-300.686, -141.083],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.252, y: 1 },
                                            o: { x: 0.846, y: 0 },
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
                                                        [300.803, 80.208],
                                                        [-300.804, -15.562],
                                                        [-300.686, -141.083],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            t: 140.000005702317,
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
                                                        [300.303, 81.333],
                                                        [-300.554, -14.938],
                                                        [-300.609, -14.833],
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
                            { ty: 'tr', p: { a: 0, k: [301.303, 80.771], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
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
                ind: 4,
                ty: 4,
                nm: 'Layer 6 Outlines',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [300.5, 688.5, 0], ix: 2 }, a: { a: 0, k: [301.5, 96.5, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } },
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
                                            i: { x: 0.287, y: 1 },
                                            o: { x: 0.804, y: 0 },
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
                                                        [300.803, 96.205],
                                                        [-300.929, 0.909],
                                                        [-300.984, 0.667],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.287, y: 1 },
                                            o: { x: 0.846, y: 0 },
                                            t: 69,
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
                                                        [300.803, 96.205],
                                                        [-300.804, -0.216],
                                                        [-300.609, -192.208],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.252, y: 1 },
                                            o: { x: 0.846, y: 0 },
                                            t: 78,
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
                                                        [300.803, 96.205],
                                                        [-300.804, -0.216],
                                                        [-300.609, -192.208],
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
                                                        [300.178, 97.33],
                                                        [-300.929, 0.909],
                                                        [-300.859, 0.917],
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
                            { ty: 'tr', p: { a: 0, k: [301.303, 96.775], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
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
                ind: 5,
                ty: 4,
                nm: 'Layer 3 Outlines',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [1260.5, 720.5, 0], ix: 2 }, a: { a: 0, k: [659.5, 64.5, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } },
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
                                            i: { x: 0.287, y: 1 },
                                            o: { x: 0.804, y: 0 },
                                            t: 6,
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
                                                        [659.175, -31.337],
                                                        [659.175, -31.211],
                                                        [-659.214, 64.21],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.287, y: 1 },
                                            o: { x: 0.846, y: 0 },
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
                                                        [659.425, -95.212],
                                                        [659.212, -32.211],
                                                        [-659.214, 64.21],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.252, y: 1 },
                                            o: { x: 0.846, y: 0 },
                                            t: 94,
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
                                                        [659.425, -95.212],
                                                        [659.212, -32.211],
                                                        [-659.214, 64.21],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            t: 155.000006313279,
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
                                                        [659.175, -31.337],
                                                        [659.175, -31.211],
                                                        [-659.214, 64.21],
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
                            { ty: 'tr', p: { a: 0, k: [659.32, 64.77], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
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
                ip: 6.00000024438501,
                op: 306.000012463636,
                st: 6.00000024438501,
                bm: 0,
            },
            {
                ddd: 0,
                ind: 6,
                ty: 4,
                nm: 'Layer 8 Outlines',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [1260.5, 704.5, 0], ix: 2 }, a: { a: 0, k: [659.5, 80.5, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } },
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
                                            i: { x: 0.287, y: 1 },
                                            o: { x: 0.804, y: 0 },
                                            t: 10,
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
                                                        [659.425, -15.713],
                                                        [659.212, -16.211],
                                                        [-659.214, 80.21],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.287, y: 1 },
                                            o: { x: 0.846, y: 0 },
                                            t: 88,
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
                                                        [660.05, -142.838],
                                                        [659.212, -16.211],
                                                        [-659.214, 80.21],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.252, y: 1 },
                                            o: { x: 0.846, y: 0 },
                                            t: 98,
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
                                                        [660.05, -142.838],
                                                        [659.212, -16.211],
                                                        [-659.214, 80.21],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            t: 159.000006476203,
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
                                                        [659.55, -15.213],
                                                        [659.587, -15.211],
                                                        [-659.214, 80.21],
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
                            { ty: 'tr', p: { a: 0, k: [659.32, 80.77], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
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
                ip: 10.0000004073083,
                op: 310.000012626559,
                st: 10.0000004073083,
                bm: 0,
            },
            {
                ddd: 0,
                ind: 7,
                ty: 4,
                nm: 'Layer 9 Outlines',
                sr: 1,
                ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [1260.5, 688.5, 0], ix: 2 }, a: { a: 0, k: [659.5, 96.5, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } },
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
                                            i: { x: 0.287, y: 1 },
                                            o: { x: 0.804, y: 0 },
                                            t: 13,
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
                                                        [659.425, 0.787],
                                                        [659.212, -0.226],
                                                        [-659.214, 96.21],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.287, y: 1 },
                                            o: { x: 0.846, y: 0 },
                                            t: 93,
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
                                                        [659.425, -194.213],
                                                        [659.212, -0.226],
                                                        [-659.214, 96.21],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.252, y: 1 },
                                            o: { x: 0.846, y: 0 },
                                            t: 103,
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
                                                        [659.425, -194.213],
                                                        [659.212, -0.226],
                                                        [-659.214, 96.21],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            t: 163.000006639126,
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
                                                        [659.425, 0.787],
                                                        [659.837, 0.899],
                                                        [-659.214, 96.21],
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
                            { ty: 'tr', p: { a: 0, k: [659.32, 96.77], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
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
                ip: 13.0000005295009,
                op: 313.000012748751,
                st: 13.0000005295009,
                bm: 0,
            },
        ],
        markers: [],
    };
};
