const {
    imagePlaceholder,
    serverUrl,
    serverEndpoint,
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
    serverUrl,
    serverEndpoint,
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
