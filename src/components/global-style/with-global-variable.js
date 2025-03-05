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

const withGlobalVariable = GlobalStyle => {
    return props => {
        const { variable, googleFont, setCustomFonts, setGoogleFonts } = props;

        // Get global settings from wp
        const { userConfig } = useGlobalStylesConfig();

        const debounceSave = useCallback(
            debounce((params) => modifyGlobalVariable(params), 200),
            []
        );

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
        }, [variable, userConfig]);

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