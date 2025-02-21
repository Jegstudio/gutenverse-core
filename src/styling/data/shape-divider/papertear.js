import isEmpty from 'lodash/isEmpty';
import { shapeDividerGradient } from '../shape-divider';

export const ShapeDivPapertear = (props) => {
    const {id, gradient, gradientColor, invert} = props;
    const data = 'm1200.29 27.78c-1.94.1999-3.89-.0009-5.75-.59-4.46-1-8.9.09-13.25 1.19-5 2.14-10.53.31-15.53 2.31-12.72 5.79-18.77-5.09-28.59-1.35-10.2-3.9-20.7-4.12-30.61 1-8.81 4.21-19.32-7.77-29.4-7.77-7.76-.91-15.48-2.49-23.34-2.24-7.51-.35-13-8.78-20.89-3.93-2.89 1-7.57-.58-10 1.85-4.14 4-9.89 4.72-14.5 7.69-3.44 2.22-6.94 3.06-10.13-.54-.72-.81-1.68-.66-2.56-.58-3.553.235-7.117.235-10.67 0-5.31-1.07-9.77 3.32-15.13 1.48-3.44-.67-6.72-2.25-10.43-1.08-3.22.47-6.27-6-9.23-1.35-3.06 2.89-7.93 2.29-11.78 3.51-2.08.44-4 .86-5.86-1-1.49-1.42-3.63-.73-5.13.33-9.93 7.13-14.94-9.88-32-5.25-3.47.74-7 1.35-10.56.2-5.442 1.7762-11.323 1.6741-16.7-.29-5.59-1.7-11.13-3.06-17.06-1.6-2.74.68-5.53-.21-8-1.43-13.21-7.6-25 7.84-33.2 3.84-5.62-5.19-9.39 10.87-24 8.9-6.37 0-13.29-2.14-19.08 1.53-1.05.6429-2.219 1.0696-3.436 1.2551-1.218.1855-2.46.1259-3.654-.1751-8.43-1.66-16.75-2.39-25.36-.6-7.39 1.54-15 .28-22.52-.07-8.53-.35-11.6 6.21-16.95-4.31-5.82-10.41-12.11-.69-19.4 1.94-7.21 3.75-13.52-2.77-20.74-1.49-11.11 2.9-14.94-4-22.58.38-5.52 2.18-11 7.36-17.29 5-2.46-1-2.65 2.13-4.41 2.42-1.64-2.91-1.55-2.84-3.76-.15-4.26 4.55-11.06.83-16.14 3.8-.175.0814-.367.1236-.56.1236s-.385-.0422-.56-.1236c-3.49-2.1-7.13-1.15-10.7-.49-6.08 1.14-11.41-13.58-22.16-9-2 .76-4-.09-5.86-1-2.94-1.37-5.5-2-8.8.13-2.16 1.37-5.67.52-8.53.91s-4.31-2.42-6.29-3c-11.05-5.62-22.21-12.15-35.2-10.42-1.73.66-3.61-2.14-5-.22-4 4.25-9.2 2.81-13.93 2.66-6.33-1.1-12.45 3.51-18.39-.07-5.24-2-10.29 7.57-15.27 2.15-2.77-2.24-7.66-5.55-10.89-2.6-2.88 2.93-6.75 4.46-9.85 7.08-1 .83-2.05 1.33-3.24.26-6.44.62-13.21-1.54-19.74.35-4.35 1.14-8-1.88-12.78.79-7.87 3.74-7.87-2.15-11.09 1.11-3 3.21-4.88 8.69-10.14 8-8.67-1-17.29.4-25.78-1.52-3.91-1.7-1.44-13.47-12.93-7.79-3.67 2.4-7.74-.67-11.69 1.22-6.1 2.66-10.07-3.62-15.55-1.38-.341.2091-.743.2972-1.14.25s-.767-.2268-1.05-.51c-5-4.11-10.69-4.36-16.62-2.55-18.12 8.55-8.71-8-29.86 4.76-8.78 6-15.91.23-24.36 2.59-2.59.63-2.53-6.37-7.44-3.27-.39.26-1.15.54-1.41.36-3.38-2.39-7.66-.08-11.08-2.16-.54-.33-1.41-.37-1.7.14-1.42 4.13-17.33-3.57-27.16 6.43-6 4.18-17.19-3.06-25.81 1.78-4.76 2.23-9.7 1.77-14.66 1-11.55-4.49-16 3.53-26.24 2.54-4.51-.28-7.89 3.79-12.43 3.68-1.07 0-1.55.89-2.22 1.47-2.07 1.8-4.63 2.87-7 1.61-7.66-3.97-15.83-2.9-23.89-2.9-3.92.74-14.78-2-16.44 2-3 5.59-3.09 5.55-9.49 4.69-.4-.05-1-.25-1.19-.07-3 2.79-5.13.37-7.4-1.22-3.37-2.76-7.1 1.77-9-4.33-.24-.86-1-.29-1.51 0-4.22 3-9.80001-.89-13.25001 4.1-.61.82-2 .86-3.18.67h-.2199998v-48.84h1200.0000098z';
    const d = invert ? 'M 0,51 V 50.94922 H 1199.8496 L 1200,37.058594 V 51 Z M 1038.3262,36.029297 c -1.7416,0.11375 -3.5646,-0.267969 -5.5371,-1.480469 -2.89,-1 -7.57,0.580391 -10,-1.849609 -4.14,-4 -9.89,-4.721407 -14.5,-7.691407 -3.44,-2.219999 -6.9389,-3.058984 -10.12894,0.541016 -0.72,0.81 -1.68055,0.660078 -2.56055,0.580078 -3.553,-0.235 -7.11692,-0.235 -10.66992,0 -5.31,1.07 -9.76891,-3.320468 -15.12891,-1.480468 -3.44,0.67 -6.72164,2.250078 -10.43164,1.080078 -3.22,-0.47 -6.26851,5.999609 -9.22852,1.349609 -3.05999,-2.89 -7.93124,-2.289766 -11.78124,-3.509766 -2.08001,-0.44 -3.99938,-0.86 -5.85938,1 -1.49,1.42 -3.63086,0.729922 -5.13086,-0.330078 -9.93,-7.13 -14.94,9.88 -32,5.25 -3.47,-0.74 -6.99859,-1.349219 -10.55859,-0.199219 -5.442,-1.776199 -11.32417,-1.675037 -16.70117,0.289063 -5.59001,1.7 -11.1286,3.059609 -17.0586,1.599609 -2.74,-0.68 -5.53,0.211641 -8,1.431641 -13.21,7.6 -25.00117,-7.841797 -33.20117,-3.841797 -5.62,5.19 -9.39,-10.868437 -24,-8.898437 -6.37,0 -13.29008,2.13875 -19.08008,-1.53125 -1.05,-0.6429 -2.21855,-1.068407 -3.43555,-1.253907 -1.218,-0.1855 -2.46029,-0.127172 -3.65429,0.173828 -8.43,1.66 -16.74938,2.391563 -25.35938,0.601563 -7.39,-1.54 -14.99953,-0.281641 -22.51953,0.06836 -8.53,0.35 -11.60117,-6.209453 -16.95117,4.310547 -5.82,10.41 -12.11039,0.690547 -19.40039,-1.939453 -7.21,-3.75 -13.51828,2.770234 -20.73828,1.490234 -11.11,-2.9 -14.94008,3.999141 -22.58008,-0.380859 -5.52,-2.18 -11.00102,-7.36 -17.29102,-5 -2.46,1 -2.65015,-2.129922 -4.41015,-2.419922 -1.64,2.91 -1.54977,2.840391 -3.75977,0.150391 -4.26,-4.55 -11.06062,-0.830781 -16.14062,-3.800781 -0.175,-0.0814 -0.3656,-0.123047 -0.5586,-0.123047 -0.193,0 -0.38554,0.04165 -0.56054,0.123047 -3.49,2.1 -7.12922,1.150234 -10.69922,0.490234 -6.08,-1.14 -11.41016,13.58 -22.16016,9 -2,-0.76 -4.00133,0.09 -5.86133,1 -2.94,1.37 -5.49883,2.001094 -8.79883,-0.128906 -2.15999,-1.37 -5.67124,-0.520157 -8.53124,-0.910157 -2.86001,-0.39 -4.30907,2.420001 -6.28907,3 -11.05,5.620001 -22.21117,12.149922 -35.20117,10.419922 -1.73,-0.66 -3.61,2.13875 -5,0.21875 -4,-4.25 -9.19969,-2.810156 -13.92969,-2.660156 -6.33,1.1 -12.44867,-3.509687 -18.38867,0.07031 -5.24,2 -10.29148,-7.568438 -15.27148,-2.148438 -2.77,2.24 -7.65868,5.54961 -10.88868,2.599609 -2.87999,-2.929999 -6.75156,-4.460078 -9.85156,-7.080078 -1,-0.83 -2.04828,-1.329765 -3.23828,-0.259765 -6.44,-0.62 -13.21023,1.538437 -19.74023,-0.351563 -4.35,-1.14 -8.00125,1.880938 -12.78125,-0.789062 -7.87,-3.74 -7.86985,2.150625 -11.08985,-1.109375 -3,-3.21 -4.87867,-8.69 -10.13867,-8 -8.67,1 -17.29125,-0.400469 -25.78125,1.519531 -3.91,1.7 -1.43969,13.469063 -12.92969,7.789062 -3.67,-2.399999 -7.73945,0.671251 -11.68945,-1.21875 -6.1,-2.66 -10.07078,3.618907 -15.55078,1.378907 -0.341,-0.2091 -0.74167,-0.2972 -1.13867,-0.25 -0.397,0.0472 -0.76778,0.226565 -1.05078,0.509765 -5,4.11 -10.6911,4.360782 -16.6211,2.550782 -18.12,-8.55 -8.70937,8.000234 -29.85937,-4.759766 -8.78,-6 -15.90938,-0.229844 -24.35938,-2.589844 -2.59,-0.63 -2.52945,6.369532 -7.43945,3.269532 -0.39,-0.260001 -1.15016,-0.539375 -1.41016,-0.359376 -3.38,2.390001 -7.66007,0.08016 -11.08008,2.160157 -0.53999,0.33 -1.41117,0.369375 -1.70117,-0.140625 -1.42,-4.13 -17.33015,3.570312 -27.16015,-6.429688 -6,-4.18 -17.1886,3.05875 -25.8086,-1.78125 -4.76,-2.23 -9.70015,-1.77 -14.66015,-1 -11.55,4.49 -16.00024,-3.529062 -26.24024,-2.539062 -4.51,0.28 -7.889685,-3.789688 -12.429685,-3.679688 -1.07,0 -1.550703,-0.890703 -2.220703,-1.470703 -2.07,-1.8 -4.63,-2.869375 -7,-1.609375 -7.66,3.97 -15.830625,2.900391 -23.890625,2.900391 -3.92,-0.74 -14.779453,2 -16.439453,-2 -3,-5.59 -3.090235,-5.551407 -9.490235,-4.691407 -0.4,0.05 -0.999453,0.250313 -1.189453,0.070313 -3,-2.79 -5.13039,-0.369297 -7.40039,1.220703 -3.37,2.76 -7.1,-1.769922 -9,4.330078 -0.24,0.86 -0.999766,0.29 -1.509766,0 -4.22,-3 -9.8,0.890391 -13.25,-4.099609 C 2.64,1.959297 1.2503125,1.919375 0.0703125,2.109375 H 0 V 0 h 1200 v 23.183594 c -1.8897,-0.174264 -3.7883,5.28e-4 -5.5996,0.574218 -4.46,1 -8.9,-0.08945 -13.25,-1.189453 -5,-2.14 -10.5313,-0.310547 -15.5313,-2.310547 -12.72,-5.789999 -18.7698,5.091563 -28.5898,1.351563 -10.2,3.9 -20.6994,4.12 -30.6094,-1 -8.81,-4.21 -19.3204,7.769531 -29.4004,7.769531 -7.76,0.91 -15.4798,2.490235 -23.3398,2.240235 -5.6325,0.2625 -10.1288,5.068906 -15.3535,5.410156 z'
        : data;

    return gradient && !isEmpty(gradientColor) ? <svg fill="none" height="51" className="guten-shape-fill" viewBox="0 0 1200 51" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <g>
            <path d={d} fill={`url(#${id})`}/>
        </g>
        {shapeDividerGradient(props)}
    </svg> : <svg fill="none" height="51" className="guten-shape-fill" viewBox="0 0 1200 51" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <g>
            <path d={d} fill="#000"/>
        </g>
    </svg>;
};