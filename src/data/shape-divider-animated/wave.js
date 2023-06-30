import { directionStartEndPoint, gradientDefault } from 'gutenverse-core/helper';

export const ShapeDivWave = (props) => {
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
        op: 750.000030548126,
        w: width,
        h: height,
        nm: 'Pre-comp 1',
        ddd: 0,
        assets: [],
        layers: [
            {
                ddd: 0,
                ind: 1,
                ty: 4,
                nm: 'Shape Layer 1',
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
                                    a: 1,
                                    k: [
                                        {
                                            i: { x: 0.833, y: 0.833 },
                                            o: { x: 0.785, y: 0 },
                                            t: 0,
                                            s: [
                                                {
                                                    i: [
                                                        [199.005, 11.57],
                                                        [270.5, -20.14],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    o: [
                                                        [-287.143, -16.694],
                                                        [-389.5, 29],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    v: [
                                                        [404, 322],
                                                        [-364, 346],
                                                        [-1280, 346],
                                                        [-1279.75, 543],
                                                        [1280.25, 543.25],
                                                        [1280, 345.5],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.833, y: 0.833 },
                                            o: { x: 0.167, y: 0.167 },
                                            t: 102,
                                            s: [
                                                {
                                                    i: [
                                                        [216.07, 10.764],
                                                        [272.61, -14.527],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    o: [
                                                        [-287.187, -15.8],
                                                        [-419.134, 22.335],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    v: [
                                                        [404.091, 322.556],
                                                        [-374.866, 343.665],
                                                        [-1280, 362],
                                                        [-1279.75, 543],
                                                        [1280.25, 543.25],
                                                        [1280, 343.306],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.833, y: 0.833 },
                                            o: { x: 0.167, y: 0.167 },
                                            t: 168,
                                            s: [
                                                {
                                                    i: [
                                                        [573.573, -6.258],
                                                        [352.589, 9.697],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    o: [
                                                        [-288.661, 3.129],
                                                        [-385.314, -10.597],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    v: [
                                                        [406.041, 334.68],
                                                        [-584.589, 322.303],
                                                        [-1280, 346],
                                                        [-1279.75, 543],
                                                        [1280.25, 543.25],
                                                        [1280, 296.784],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.833, y: 0.833 },
                                            o: { x: 0.167, y: 0.167 },
                                            t: 254,
                                            s: [
                                                {
                                                    i: [
                                                        [291.539, -1.031],
                                                        [361.442, -8.004],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    o: [
                                                        [-322.741, 1.141],
                                                        [-393.931, 8.724],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    v: [
                                                        [407.365, 356.441],
                                                        [-567.442, 318.004],
                                                        [-1280, 346],
                                                        [-1279.75, 543],
                                                        [1280.25, 543.25],
                                                        [1280, 297.5],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.833, y: 0.833 },
                                            o: { x: 0.167, y: 0.167 },
                                            t: 366,
                                            s: [
                                                {
                                                    i: [
                                                        [618.001, 18],
                                                        [310, -2],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    o: [
                                                        [-287.505, -8.374],
                                                        [-390.57, 2.52],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    v: [
                                                        [405.999, 366],
                                                        [-606, 294],
                                                        [-1280, 314],
                                                        [-1279.75, 543],
                                                        [1280.25, 543.25],
                                                        [1280, 285.5],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.833, y: 0.873 },
                                            o: { x: 1, y: 1 },
                                            t: 488,
                                            s: [
                                                {
                                                    i: [
                                                        [464.98, -11.233],
                                                        [504.514, -24.364],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    o: [
                                                        [-391.02, 22.767],
                                                        [-237.389, 11.282],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    v: [
                                                        [539.02, 303.233],
                                                        [-694.409, 283.872],
                                                        [-1280, 317.368],
                                                        [-1279.75, 543],
                                                        [1280.25, 543.25],
                                                        [1280, 263.458],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.521, y: 0.635 },
                                            o: { x: 1, y: 0.762 },
                                            t: 616,
                                            s: [
                                                {
                                                    i: [
                                                        [568.846, -25.629],
                                                        [500.736, 16.894],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    o: [
                                                        [-343.791, 15.489],
                                                        [-286.22, -9.714],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    v: [
                                                        [527.154, 289.629],
                                                        [-590.504, 353.079],
                                                        [-1280, 325.664],
                                                        [-1279.75, 543],
                                                        [1280.25, 543.25],
                                                        [1280, 296.426],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.329, y: 1 },
                                            o: { x: 0.798, y: 0.608 },
                                            t: 685,
                                            s: [
                                                {
                                                    i: [
                                                        [357.71, 4.488],
                                                        [403.39, -1.856],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    o: [
                                                        [-312.29, 4.488],
                                                        [-384.61, -1.856],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    v: [
                                                        [478.29, 325.512],
                                                        [-423.39, 347.856],
                                                        [-1280, 340.668],
                                                        [-1279.75, 543],
                                                        [1280.25, 543.25],
                                                        [1280, 354.633],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            t: 750.000030548126,
                                            s: [
                                                {
                                                    i: [
                                                        [199.005, 11.57],
                                                        [270.5, -20.14],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    o: [
                                                        [-287.143, -16.694],
                                                        [-389.5, 29],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    v: [
                                                        [404, 322],
                                                        [-364, 346],
                                                        [-1280, 346],
                                                        [-1279.75, 543],
                                                        [1280.25, 543.25],
                                                        [1280, 345.5],
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
                            colorObj0,
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
                op: 763.000031077627,
                st: 0,
                bm: 0,
            },
            {
                ddd: 0,
                ind: 2,
                ty: 4,
                nm: 'Shape Layer 2',
                sr: 1,
                ks: { o: { a: 0, k: 60, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [957.75, 540, 0], ix: 2 }, a: { a: 0, k: [0, 0, 0], ix: 1 }, s: { a: 0, k: [100.097, 100, 100], ix: 6 } },
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
                                            i: { x: 0.833, y: 0.833 },
                                            o: { x: 0.558, y: 0 },
                                            t: 0,
                                            s: [
                                                {
                                                    i: [
                                                        [234.5, 11.5],
                                                        [561.25, 52.5],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [320.56, 5.068],
                                                    ],
                                                    o: [
                                                        [-234.499, -11.5],
                                                        [-170.234, -15.924],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [-126.5, -2],
                                                    ],
                                                    v: [
                                                        [199.999, 300],
                                                        [-965.25, 313.5],
                                                        [-1279.875, 303.875],
                                                        [-1279, 551],
                                                        [1280, 551],
                                                        [1279.938, 304],
                                                        [727.5, 325],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.69, y: 0.69 },
                                            o: { x: 0.167, y: 0.167 },
                                            t: 109,
                                            s: [
                                                {
                                                    i: [
                                                        [233.458, 8.695],
                                                        [311.787, -7.82],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [323.115, 1.851],
                                                    ],
                                                    o: [
                                                        [-234.531, -8.666],
                                                        [-221.693, 2.18],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [-126.482, -0.776],
                                                    ],
                                                    v: [
                                                        [194.549, 304.488],
                                                        [-874.865, 256.82],
                                                        [-1279.875, 300.669],
                                                        [-1279, 551],
                                                        [1280, 551],
                                                        [1279.948, 305.924],
                                                        [720.767, 320.832],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.833, y: 0.833 },
                                            o: { x: 0.167, y: 0.167 },
                                            t: 228,
                                            s: [
                                                {
                                                    i: [
                                                        [228, -6],
                                                        [171.565, 4.908],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [336.5, -15],
                                                    ],
                                                    o: [
                                                        [-234.7, 6.176],
                                                        [-157.291, -4.5],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [-126.39, 5.634],
                                                    ],
                                                    v: [
                                                        [-9.829, 344],
                                                        [-923.283, 271.5],
                                                        [-1279.875, 283.875],
                                                        [-1279, 551],
                                                        [1280, 551],
                                                        [1280, 316],
                                                        [684.669, 287],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.833, y: 0.833 },
                                            o: { x: 0.167, y: 0.167 },
                                            t: 421,
                                            s: [
                                                {
                                                    i: [
                                                        [246.836, 19.914],
                                                        [641.085, -39.494],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [327.849, -4.109],
                                                    ],
                                                    o: [
                                                        [-282.07, -22.756],
                                                        [-238.558, 9.506],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [-126.45, 1.491],
                                                    ],
                                                    v: [
                                                        [182.07, 318.756],
                                                        [-958.403, 254.494],
                                                        [-1279.505, 273.571],
                                                        [-1279, 551],
                                                        [1280, 551],
                                                        [1280, 253.54],
                                                        [709.484, 329.775],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.83, y: 0.83 },
                                            o: { x: 0.167, y: 0.167 },
                                            t: 536,
                                            s: [
                                                {
                                                    i: [
                                                        [257.895, -6.917],
                                                        [622.866, -28.199],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [307.64, -29.376],
                                                    ],
                                                    o: [
                                                        [-283.638, 2.849],
                                                        [-220.497, 9.861],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [-125.891, 12.021],
                                                    ],
                                                    v: [
                                                        [180.936, 300.167],
                                                        [-961.627, 286.126],
                                                        [-1279.601, 276.84],
                                                        [-1279, 551],
                                                        [1280, 551],
                                                        [1278.667, 238.896],
                                                        [779.672, 246.376],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.5, y: 1 },
                                            o: { x: 0.505, y: 0.505 },
                                            t: 619,
                                            s: [
                                                {
                                                    i: [
                                                        [271.442, -39.785],
                                                        [625.237, 38.54],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [309.33, 4.018],
                                                    ],
                                                    o: [
                                                        [-285.558, 34.215],
                                                        [-198.843, -7.894],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [-126.468, -1.643],
                                                    ],
                                                    v: [
                                                        [192.558, 307.785],
                                                        [-935.265, 265.46],
                                                        [-1279.718, 280.845],
                                                        [-1279, 551],
                                                        [1280, 551],
                                                        [1284.144, 268.205],
                                                        [811.949, 238.982],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            t: 750.000030548126,
                                            s: [
                                                {
                                                    i: [
                                                        [234.5, 11.5],
                                                        [561.25, 52.5],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [320.56, 5.068],
                                                    ],
                                                    o: [
                                                        [-234.499, -11.5],
                                                        [-170.234, -15.924],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [-126.5, -2],
                                                    ],
                                                    v: [
                                                        [199.999, 300],
                                                        [-965.25, 313.5],
                                                        [-1279.875, 303.875],
                                                        [-1279, 551],
                                                        [1280, 551],
                                                        [1280, 304],
                                                        [727.5, 325],
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
                            { ty: 'tr', p: { a: 0, k: [2.625, 3], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
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
                op: 763.000031077627,
                st: 0,
                bm: 0,
            },
            {
                ddd: 0,
                ind: 3,
                ty: 4,
                nm: 'Shape Layer 3',
                sr: 1,
                ks: { o: { a: 0, k: 50, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [960, 540, 0], ix: 2 }, a: { a: 0, k: [0, 0, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } },
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
                                            i: { x: 0.833, y: 0.833 },
                                            o: { x: 0.333, y: 0 },
                                            t: 0,
                                            s: [
                                                {
                                                    i: [
                                                        [570.999, -56],
                                                        [131, 6],
                                                        [240.5, -20],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    o: [
                                                        [-230.847, 22.64],
                                                        [-131, -6],
                                                        [-198.738, 16.527],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    v: [
                                                        [366.001, 284],
                                                        [-264, 293],
                                                        [-853.5, 315],
                                                        [-1280.25, 285.25],
                                                        [-1280.125, 575.875],
                                                        [1280, 576],
                                                        [1281, 286],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.833, y: 1 },
                                            o: { x: 0.167, y: 0.167 },
                                            t: 104,
                                            s: [
                                                {
                                                    i: [
                                                        [574.629, 66.947],
                                                        [166.176, -13.666],
                                                        [241.177, 8.608],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    o: [
                                                        [-206.001, -24],
                                                        [-130.696, 10.748],
                                                        [-228.578, -8.158],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    v: [
                                                        [366.001, 284],
                                                        [-270.176, 285.666],
                                                        [-861.992, 305.736],
                                                        [-1283.264, 258.198],
                                                        [-1280.125, 575.875],
                                                        [1280, 576],
                                                        [1280.807, 271.718],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.833, y: 0.833 },
                                            o: { x: 0.167, y: 0 },
                                            t: 248,
                                            s: [
                                                {
                                                    i: [
                                                        [569.429, -108.422],
                                                        [131, 6],
                                                        [343.5, 7],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    o: [
                                                        [-246.225, 46.882],
                                                        [-131, -6],
                                                        [-199.383, -4.063],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    v: [
                                                        [366.001, 284],
                                                        [-296, 275],
                                                        [-889.5, 257],
                                                        [-1286.5, 241.25],
                                                        [-1280.125, 575.875],
                                                        [1280, 576],
                                                        [1280, 212],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.833, y: 0.833 },
                                            o: { x: 0.167, y: 0.167 },
                                            t: 364,
                                            s: [
                                                {
                                                    i: [
                                                        [601.999, 26],
                                                        [209.924, 9.411],
                                                        [282.397, 6.887],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    o: [
                                                        [-231.401, -9.994],
                                                        [-131.005, -5.873],
                                                        [-199.365, -4.862],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    v: [
                                                        [328.001, 292],
                                                        [-295.924, 264.589],
                                                        [-882.397, 243.113],
                                                        [-1285.472, 212.165],
                                                        [-1280.125, 575.875],
                                                        [1280, 576],
                                                        [1280.02, 194.674],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.833, y: 0.833 },
                                            o: { x: 0.167, y: 0.167 },
                                            t: 472,
                                            s: [
                                                {
                                                    i: [
                                                        [770.181, 14.367],
                                                        [198.795, 19.506],
                                                        [267.791, -2.486],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    o: [
                                                        [-245.819, -9.633],
                                                        [-130.51, -12.806],
                                                        [-199.147, 2.595],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    v: [
                                                        [341.249, 289.211],
                                                        [-296.795, 232.494],
                                                        [-878.323, 214.174],
                                                        [-1283.651, 237.644],
                                                        [-1280.125, 575.875],
                                                        [1280, 576],
                                                        [1282.891, 190.512],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.667, y: 1 },
                                            o: { x: 0.167, y: 0.167 },
                                            t: 613,
                                            s: [
                                                {
                                                    i: [
                                                        [578.99, -34.862],
                                                        [259.914, 23.363],
                                                        [331.335, 24.671],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    o: [
                                                        [-230.989, 14.228],
                                                        [-151.516, -2.215],
                                                        [-261.478, -18.117],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    v: [
                                                        [473.86, 233.198],
                                                        [-228.484, 320.215],
                                                        [-847.373, 225.049],
                                                        [-1280.302, 240.188],
                                                        [-1280.125, 575.875],
                                                        [1280, 576],
                                                        [1281.781, 315.547],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            t: 750.000030548126,
                                            s: [
                                                {
                                                    i: [
                                                        [570.999, -56],
                                                        [131, 6],
                                                        [240.5, -20],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    o: [
                                                        [-230.847, 22.64],
                                                        [-131, -6],
                                                        [-198.738, 16.527],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    v: [
                                                        [366.001, 284],
                                                        [-264, 293],
                                                        [-853.5, 315],
                                                        [-1280.25, 285.25],
                                                        [-1280.125, 575.875],
                                                        [1280, 576],
                                                        [1281, 286],
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
                            { ty: 'tr', p: { a: 0, k: [0.57, 0.422], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: 'Transform' },
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
                op: 763.000031077627,
                st: 0,
                bm: 0,
            },
            {
                ddd: 0,
                ind: 4,
                ty: 4,
                nm: 'Shape Layer 4',
                sr: 1,
                ks: { o: { a: 0, k: 30, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [960, 540, 0], ix: 2 }, a: { a: 0, k: [0, 0, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } },
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
                                            i: { x: 0.833, y: 0.833 },
                                            o: { x: 0.333, y: 0 },
                                            t: 0,
                                            s: [
                                                {
                                                    i: [
                                                        [367.572, 51.181],
                                                        [118.335, -14.48],
                                                        [186, 27],
                                                        [119.5, -18.5],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    o: [
                                                        [-315.999, -44],
                                                        [-118.5, 14.5],
                                                        [-183.362, -26.617],
                                                        [-109.176, 16.902],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    v: [
                                                        [707.999, 270],
                                                        [-29.5, 303],
                                                        [-448, 279],
                                                        [-892.5, 288.5],
                                                        [-1281, 309],
                                                        [-1280.5, 540.75],
                                                        [1280, 540.25],
                                                        [1280.25, 308.75],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.833, y: 0.833 },
                                            o: { x: 0.167, y: 0.167 },
                                            t: 89,
                                            s: [
                                                {
                                                    i: [
                                                        [372.872, 12.074],
                                                        [144.585, -1.616],
                                                        [187.829, 5.895],
                                                        [120.767, -5.854],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    o: [
                                                        [-321.894, -10.586],
                                                        [-119.803, 1.927],
                                                        [-174.216, -5.496],
                                                        [-119.294, 5.755],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    v: [
                                                        [716.391, 219.742],
                                                        [-26.367, 287.07],
                                                        [-448.189, 275.782],
                                                        [-894.14, 268.288],
                                                        [-1281, 308.962],
                                                        [-1280.5, 540.75],
                                                        [1280, 540.25],
                                                        [1282.2, 267.028],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.833, y: 0.833 },
                                            o: { x: 0.167, y: 0.167 },
                                            t: 284,
                                            s: [
                                                {
                                                    i: [
                                                        [380.123, -95.635],
                                                        [242.436, 24.897],
                                                        [187, 15.388],
                                                        [120.235, -11.431],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    o: [
                                                        [-310.618, 78.148],
                                                        [-128.406, -10.364],
                                                        [-178.394, -15.001],
                                                        [-115.99, 10.494],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    v: [
                                                        [707.877, 243.635],
                                                        [34.021, 288.288],
                                                        [-451.69, 214.005],
                                                        [-907.45, 233.377],
                                                        [-1281.018, 307.789],
                                                        [-1280.5, 540.75],
                                                        [1280, 540.25],
                                                        [1281.233, 233.619],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            i: { x: 0.667, y: 1 },
                                            o: { x: 0.167, y: 0.167 },
                                            t: 502,
                                            s: [
                                                {
                                                    i: [
                                                        [388.015, 17.508],
                                                        [181.672, -20.3],
                                                        [187.705, -1.457],
                                                        [125.432, 10.92],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    o: [
                                                        [-319.984, -32.213],
                                                        [-123.101, 2.974],
                                                        [-178.173, 1.378],
                                                        [-261.918, -28.772],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    v: [
                                                        [720, 232.123],
                                                        [15.883, 260.498],
                                                        [-419.963, 260.468],
                                                        [-901.403, 203.047],
                                                        [-1283.992, 211.693],
                                                        [-1280.5, 540.75],
                                                        [1280, 540.25],
                                                        [1281.665, 196.394],
                                                    ],
                                                    c: true,
                                                },
                                            ],
                                        },
                                        {
                                            t: 750.000030548126,
                                            s: [
                                                {
                                                    i: [
                                                        [367.572, 51.181],
                                                        [118.335, -14.48],
                                                        [186, 27],
                                                        [119.5, -18.5],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    o: [
                                                        [-315.999, -44],
                                                        [-118.5, 14.5],
                                                        [-183.362, -26.617],
                                                        [-109.176, 16.902],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                        [0, 0],
                                                    ],
                                                    v: [
                                                        [707.999, 270],
                                                        [-29.5, 303],
                                                        [-448, 279],
                                                        [-892.5, 288.5],
                                                        [-1281, 309],
                                                        [-1280.5, 540.75],
                                                        [1280, 540.25],
                                                        [1280.25, 308.75],
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
                op: 763.000031077627,
                st: 0,
                bm: 0,
            },
        ],
        markers: [],
    };
};
