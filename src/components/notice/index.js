const Notice = ({ icon, title, description, buttonText, onClick, onClose, cancelButtonText, cancelButton = false, scheme = 'normal', confirmation = false, isChecked = false, setIsChecked = () => {} }) => {

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    return <div id="gutenverse-warn">
        <div className="gutenverse-editor-warn">
            <div className={`gutenverse-warn-wrapper notice-content ${scheme}`}>
                <div className="close-icon" onClick={() => onClose()}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.998 4.5493L11.4488 3L7.99805 6.52113L4.54734 3L2.99805 4.5493L6.51917 8L2.99805 11.4507L4.54734 13L7.99805 9.47887L11.4488 13L12.998 11.4507L9.47692 8L12.998 4.5493Z" fill="#99A2A9" />
                    </svg>
                </div>
                <div className="lock-icon">
                    {icon}
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
                <div className="buttons">
                    <button className="primary" onClick={() => onClick()}>{buttonText}</button>
                    {cancelButton && <button className="cancel" onClick={() => onClose()}>{cancelButtonText}</button>}
                </div>
                {confirmation && <label>
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                    <span>Do not Show Again</span>
                </label>}
            </div>
        </div>
    </div>;
};

export default Notice;
