import { useSelect } from '@wordpress/data';
import debounce from 'lodash/debounce';
import { useCallback, useEffect, useState } from '@wordpress/element';
import { v4 } from 'uuid';

import {
    getGoogleFontDatas,
    determineLocation,
    theDeviceType,
} from 'gutenverse-core/helper';
import {
    useGlobalStylesConfig,
} from 'gutenverse-core/editor-helper';

import { modifyGlobalVariable } from 'gutenverse-core/requests';
import elementChange from 'element-change';
import { signal } from 'gutenverse-core/editor-helper';

const withGlobalVariable = GlobalStyle => {
    return props => {
        const { variable, googleFont, setGoogleFonts, setCustomFonts } = props;
        const [headElement, setHeadElement] = useState(null);

        const setWindow = () => {
            setTimeout(() => {
                const canvas = document.querySelector('[name=\'editor-canvas\']');
                const wrapper = !canvas ? window : canvas.contentWindow;
                setHeadElement(wrapper.document.getElementsByTagName('head')[0]);
            }, 500);
        };

        elementChange('#editor', setWindow);
        elementChange('#site-editor', setWindow);

        // Get global settings from wp
        const { userConfig } = useGlobalStylesConfig();

        // Keep this using useSelect instead of getDeviceType, to trigger changes
        const {
            deviceType,
        } = useSelect(
            () => {
                const location = determineLocation();
                return {
                    deviceType: theDeviceType(location)
                };
            },
            []
        );

        const debounceSave = useCallback(
            debounce((params) => modifyGlobalVariable(params), 200),
            []
        );

        const addFont = (id, font, weight) => {
            if (font?.type === 'google') {
                setGoogleFonts(id, {
                    ...font,
                    weight
                });
            } else if (font?.type === 'custom_font_pro') {
                setCustomFonts(id, {
                    ...font,
                    weight
                });
            }
        };

        useEffect(() => {
            signal.globalStyleSignal.dispatch(v4());
        }, []);

        useEffect(() => {

            debounceSave({
                variable: variable,
                colors: variable?.colors,
                fonts: variable?.fonts,
                googlefont: getGoogleFontDatas(googleFont)
            });

            signal.globalStyleSignal.dispatch(v4());
        }, [userConfig, variable, deviceType]);

        return <>
            <GlobalStyle
                {...props}
                addFont={addFont}
            />
        </>;
    };
};

export default withGlobalVariable;