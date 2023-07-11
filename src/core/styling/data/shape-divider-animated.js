// import { ShapeDivGradient } from './shape-divider-animated/gradient';
import { ShapeDivCurve } from './shape-divider-animated/curve';
import { ShapeDivCurveAsymetrical } from './shape-divider-animated/curve-asymetrical';
import { ShapeDivCurveAsymetrical2 } from './shape-divider-animated/curve-asymetrical-2';
import { ShapeDivCurveAsymetricalNegative } from './shape-divider-animated/curve-asymetrical-negative';
// import { ShapeDivWaves } from './shape-divider-animated/waves';
import { ShapeDivWave } from './shape-divider-animated/wave';
import { ShapeDivWave2 } from './shape-divider-animated/wave-2';
import { ShapeDivTriangle } from './shape-divider-animated/triangle';
import { ShapeDivTriangle2 } from './shape-divider-animated/triangle-2';
import { ShapeDivTriangleNegative } from './shape-divider-animated/triangle-negative';
import { ShapeDivSplit } from './shape-divider-animated/split';
import { ShapeDivMountain } from './shape-divider-animated/mountain';
import { ShapeDivHexagonal } from './shape-divider-animated/hexagonal';

export const shapeDividerAnimatedLoader = ({ type, ...props }) => {
    switch (type) {
        // case 'waves':
        //     return ShapeDivWaves({ ...props });
        // case 'gradient':
        //     return ShapeDivGradient({ ...props });
        case 'waves':
            return ShapeDivWave({ ...props });
        case 'waves_2':
            return ShapeDivWave2({ ...props });
        case 'triangle':
            return ShapeDivTriangle({ ...props });
        case 'triangle_2':
            return ShapeDivTriangle2({ ...props });
        case 'triangle_n':
            return ShapeDivTriangleNegative({ ...props });
        case 'curve':
            return ShapeDivCurve({ ...props });
        case 'curve_a':
            return ShapeDivCurveAsymetrical({ ...props });
        case 'curve_a_2':
            return ShapeDivCurveAsymetrical2({ ...props });
        case 'curve_an':
            return ShapeDivCurveAsymetricalNegative({ ...props });
        case 'split':
            return ShapeDivSplit({ ...props });
        case 'mountain':
            return ShapeDivMountain({ ...props });
        case 'hexagonal':
            return ShapeDivHexagonal({ ...props });
        default:
            return null;
    }
};
