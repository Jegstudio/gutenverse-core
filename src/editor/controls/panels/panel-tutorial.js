import { useState } from '@wordpress/element';
import classnames from 'classnames';
import { IconChevronSVG, IconInfoSVG } from 'gutenverse-core-editor/icons';

const PanelAccordion = ({ title, content, open, setOpen, index }) => {
    const classname = classnames('tutorial-accordion', {
        open: open === index
    });

    const setOpenAccordion = () => {
        if (index === open) {
            setOpen(false);
        } else {
            setOpen(index);
        }
    };

    return <div className={classname}>
        <div className="accordion-header" onClick={() => setOpenAccordion()}>
            <h3>{title}</h3>
            <IconChevronSVG />
        </div>
        {open === index && <div className="accordion-body">
            {content}
        </div>}
    </div>;
};

export const PanelTutorial = ({ title, list, style = { margin: '0px 15px 20px' } }) => {
    const [open, setOpen] = useState(0);

    return <div className="gutenverse-how" style={style}>
        <h2><IconInfoSVG />{title}</h2>
        {list.map((item, key) => <PanelAccordion
            key={key}
            title={item.title}
            content={item.description}
            open={open}
            setOpen={setOpen}
            index={key}
        />)}
    </div>;
};