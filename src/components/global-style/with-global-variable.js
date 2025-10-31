import debounce from 'lodash/debounce';
import { useCallback, useEffect } from '@wordpress/element';
import { v4 } from 'uuid';
import {
    getGoogleFontDatas,
} from 'gutenverse-core/helper';
import {
    useGlobalStylesConfig,
} from 'gutenverse-core/editor-helper';
import { modifyGlobalVariable } from 'gutenverse-core/requests';
import { signal } from 'gutenverse-core/editor-helper';
import isEmpty from 'lodash/isEmpty';
import cloneDeep from 'lodash/cloneDeep';

const withGlobalVariable = GlobalStyle => {
    return props => {
        const { variable, googleFont, setCustomFonts, setGoogleFonts } = props;

        // Get global settings from wp
        const { userConfig } = useGlobalStylesConfig();
        const { globalColors } = window['GutenverseConfig'] || {};

        const debounceSave = useCallback(
            debounce((params) => modifyGlobalVariable(params), 200),
            []
        );

        useEffect(() => {
            signal.globalStyleSignal.dispatch(v4());
        }, []);

        useEffect(() => {
            if (isEmpty(variable?.colors)) {
                variable.colors = {
                    pallete: {
                        theme: globalColors?.theme || [],
                        default: globalColors?.default ||  [],
                        custom: globalColors?.custom || []
                    }
                };
            }

            debounceSave({
                variable: variable,
                colors: variable?.colors,
                fonts: variable?.fonts,
                googlefont: getGoogleFontDatas(googleFont)
            });

            signal.globalStyleSignal.dispatch(v4());
        }, [variable]);

        useEffect(() => {
            let newVariable = cloneDeep(variable);
            newVariable.colors = cloneDeep(userConfig?.settings?.color);
            debounceSave({
                variable: newVariable,
                colors: userConfig?.settings?.color,
                fonts: variable?.fonts,
                googlefont: getGoogleFontDatas(googleFont)
            });

            signal.globalStyleSignal.dispatch(v4());
        }, [userConfig]);

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

        return <>
            <GlobalStyle
                {...props}
                addFont={addFont}
            />
        </>;
    };
};

export default withGlobalVariable;