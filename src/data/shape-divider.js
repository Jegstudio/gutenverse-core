
import { ShapeDivCurve } from './shape-divider/curve';
import { ShapeDivArrow } from './shape-divider/arrow';
import { ShapeDivCurveA1 } from './shape-divider/curve-asymetrical-1';
import { ShapeDivCurveA2 } from './shape-divider/curve-asymetrical-2';
import { ShapeDivCurveN } from './shape-divider/curve-asymetrical-negative';
import { ShapeDivCurveO } from './shape-divider/curve-opacity';
import { ShapeDivMountain } from './shape-divider/mountain';
import { ShapeDivMountainO } from './shape-divider/mountain-opacity';
import { ShapeDivPapertear } from './shape-divider/papertear';
import { ShapeDivSplit } from './shape-divider/split';
import { ShapeDivSplitN } from './shape-divider/split-negative';
import { ShapeDivTilt } from './shape-divider/tilt';
import { ShapeDivTiltG } from './shape-divider/tilt-gradient';
import { ShapeDivTriangle } from './shape-divider/triangle';
import { ShapeDivTriangle2 } from './shape-divider/triangle-2';
import { ShapeDivTriangleA } from './shape-divider/triangle-a';
import { ShapeDivTriangleAO } from './shape-divider/triangle-a-o';
import { ShapeDivTriangleN } from './shape-divider/triangle-n';
import { ShapeDivTriangleNO } from './shape-divider/triangle-n-o';
import { ShapeDivWaves } from './shape-divider/waves';
import { ShapeDivWaves2 } from './shape-divider/waves-2';
import { ShapeDivWavesO1 } from './shape-divider/waves-o-1';
import { ShapeDivWavesO2 } from './shape-divider/waves-o-2';
import { ShapeDivWavesO3 } from './shape-divider/waves-o-3';
import { ShapeDivZigzag } from './shape-divider/zig-zag';

export const shapeDividerGradient = ({id, gradientColor, gradientAngle}) => {
    return <linearGradient id={id} gradientTransform={gradientAngle && `rotate(${gradientAngle})`}>
        {gradientColor.map((value, key) => <stop key={key} style={{stopColor:`${value.color}`}} offset={`${value.offset*100}%`}></stop>)}
    </linearGradient>;
};

export const shapeDividerLoader = ({type, ...props}) => {
    switch (type) {
        case 'arrow':
            return <ShapeDivArrow {...props}/>;
        case 'curve':
            return <ShapeDivCurve {...props}/>;
        case 'curve_a1':
            return <ShapeDivCurveA1 {...props}/>;
        case 'curve_a2':
            return <ShapeDivCurveA2 {...props}/>;
        case 'curve_n':
            return <ShapeDivCurveN {...props}/>;
        case 'curve_o':
            return <ShapeDivCurveO {...props}/>;
        case 'mountain':
            return <ShapeDivMountain {...props}/>;
        case 'mountain_o':
            return <ShapeDivMountainO {...props}/>;
        case 'papertear':
            return <ShapeDivPapertear {...props}/>;
        case 'split':
            return <ShapeDivSplit {...props}/>;
        case 'split_n':
            return <ShapeDivSplitN {...props}/>;
        case 'tilt':
            return <ShapeDivTilt {...props}/>;
        case 'tilt_g':
            return <ShapeDivTiltG {...props}/>;
        case 'triangle':
            return <ShapeDivTriangle {...props}/>;
        case 'triangle_2':
            return <ShapeDivTriangle2 {...props}/>;
        case 'triangle_3':
            return <ShapeDivTriangleA {...props}/>;
        case 'triangle_o':
            return <ShapeDivTriangleAO {...props}/>;
        case 'triangle_n':
            return <ShapeDivTriangleN {...props}/>;
        case 'triangle_n_o':
            return <ShapeDivTriangleNO {...props}/>;
        case 'waves':
            return <ShapeDivWaves {...props}/>;
        case 'waves_2':
            return <ShapeDivWaves2 {...props}/>;
        case 'waves_o1':
            return <ShapeDivWavesO1 {...props}/>;
        case 'waves_o2':
            return <ShapeDivWavesO2 {...props}/>;
        case 'waves_o3':
            return <ShapeDivWavesO3 {...props}/>;
        case 'zigzag':
            return <ShapeDivZigzag {...props}/>;
        default:
            return null;
    }
};