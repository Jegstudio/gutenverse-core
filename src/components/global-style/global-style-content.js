import GlobalStyleList from './global-style-list';
import GlobalVariableColor from './global-variable-color';
import GlobalVariableFont from './global-variable-font';

const GlobalStyleContent = (props) => {
    const { stage } = props;

    switch (stage) {
        case 'color':
            return <GlobalVariableColor {...props} />;
        case 'font':
            return <GlobalVariableFont {...props} />;
        default:
            return <GlobalStyleList {...props}/>;
    }
};

export default GlobalStyleContent;