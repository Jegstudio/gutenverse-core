const {
    imagePlaceholder,
    libraryApi,
    openedTemplate,
    globalSetting,
    globalVariable = {
        colors: [],
        fonts: []
    },
    userId,
    activation,
    license,
    domainURL,
    current,
    proImg,
    isTools,
    settingsData,
    upgradeProUrl
} = window['GutenverseConfig'] || window['GutenverseDashboard'] || {};

export {
    imagePlaceholder,
    libraryApi,
    openedTemplate,
    globalSetting,
    globalVariable,
    userId,
    activation,
    license,
    domainURL,
    current,
    proImg,
    isTools,
    settingsData,
    upgradeProUrl
};
