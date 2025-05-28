import GlobalStyleList from './global-style-list';
import GlobalVariableColor from './global-variable-color';
import GlobalVariableFont from './global-variable-font';

const GlobalStyleContent = (props) => {
    let { stage } = props;
    const params = new URLSearchParams(window.location.search);

    const global = params.get('gutenverse-state-global');
    const openGlobal = params.get('gutenverse-global-sidebar');

    if(openGlobal === 'open' && global){
        stage = global;
    }
    switch (stage) {
        case 'color':
            return <GlobalVariableColor {...props} stage={stage}/>;
        case 'font':
            return <GlobalVariableFont {...props} stage={stage}/>;
        default:
            return <GlobalStyleList {...props} />;
    }
};

export default GlobalStyleContent;