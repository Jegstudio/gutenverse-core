import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { useEffect, useState } from '@wordpress/element';
import { ArrowLeft } from 'react-feather';
import { PanelBody } from '@wordpress/components';
import { LogoColorSVG, LogoWhiteSVG } from 'gutenverse-core/icons';
import GlobalStyleContent from './global-style-content';
import withGlobalVariable from './with-global-variable';
import { signal } from 'gutenverse-core/editor-helper';
import CardPro from '../pro/card-pro';
import { PluginSidebar } from '@wordpress/editor';

const GlobalStyleSidebar = props => {
    const { variable, googleFont } = props;
    const [stage, setStage] = useState();

    useEffect(() => {
        let binding = signal ? signal.styleDrawerSignal.add(changeStage) : null;

        return () => {
            binding && binding.detach();
        };
    });

    const changeStage = (stage) => {
        setStage(stage);
    };

    return <PluginSidebar
        name="gutenverse-sidebar"
        title={<div className={'global-style-extended'}>{stage && <ArrowLeft size={20} className="back-button" onClick={() => setStage('')} />}<span>{'Global Style Extended'}</span></div>}
        icon={<div className={'gutenverse-icon'}>
            <span className="logo-color"><LogoColorSVG /></span>
            <span className="logo-white"><LogoWhiteSVG /></span>
        </div>}
    >
        <PanelBody>
            <CardPro />
            <GlobalStyleContent {...{
                stage,
                setStage,
                ...props,
                variableFont: variable.fonts,
                googleFont
            }}
            />
        </PanelBody>
    </PluginSidebar>;
};

export default compose(

    withSelect(select => {
        const {
            getVariable,
            getGoogleFont,
            getCustomFont,
        } = select('gutenverse/global-style');

        return {
            variable: getVariable(),
            googleFont: getGoogleFont(),
            customFont: getCustomFont()
        };
    }),

    withDispatch((dispatch) => {
        const {
            initVariableFont,
            addVariableFont,
            editVariableFont,
            deleteVariableFont,
            setGoogleFonts,
            setCustomFonts,
        } = dispatch('gutenverse/global-style');

        return {
            initFontVar: initVariableFont,
            addFontVar: addVariableFont,
            editFontVar: editVariableFont,
            deleteFontVar: deleteVariableFont,
            setGoogleFonts: setGoogleFonts,
            setCustomFonts: setCustomFonts
        };
    }),

    withGlobalVariable,
)(GlobalStyleSidebar);