export { default as PopupPro } from './popup-pro';
export { default as PopupInstallPlugin } from './popup-install-plugin'



export const DashboardContent = ({
    children
}) => {
    return <div className="dashboard-content">
        {children}
    </div>;
};


export const DashboardHeader = ({
    children
}) => {
    return <div className="content-header">
        {children}
    </div>;
};

export const DashboardBody = ({
    children
}) => {
    return <div className="content-body">
        {children}
    </div>;
};