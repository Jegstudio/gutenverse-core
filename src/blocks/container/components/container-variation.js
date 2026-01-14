import { __ } from '@wordpress/i18n';
import {
    variation_100,
    variation_100_2,
    variation_100_50_50,
    variation_25_25_25_25,
    variation_25_50_25,
    variation_25_75,
    variation_25_75_75_25,
    variation_33_33_33,
    variation_33_33_33_33_33_33,
    variation_33_33_33_33_66,
    variation_50_50,
    variation_50_50_100,
    variation_50_50_100_2,
    variation_50_50_100_3,
    variation_50_50_50_50,
    variation_75_25
} from '../data';

const IconSide = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" viewBox="0 0 12.6 8.84">
        <path d="M12.42 4.84a.61.61 0 0 0 0-.85L8.61.18a.61.61 0 0 0-.85 0 .61.61 0 0 0 0 .85l3.39 3.39-3.39 3.39a.61.61 0 0 0 0 .85c.23.23.61.23.85 0l3.82-3.82ZM12 4.42v-.6H0v1.2h12v-.6Z" fill="currentColor" />
    </svg>;
};

const IconDown = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" viewBox="0 0 8.84 12.6">
        <path d="M3.99 12.42c.23.23.61.23.85 0L8.66 8.6a.61.61 0 0 0 0-.85.61.61 0 0 0-.85 0l-3.39 3.39-3.4-3.38a.61.61 0 0 0-.85 0 .61.61 0 0 0 0 .85l3.82 3.82Zm.42-.42h.6V0h-1.2v12h.6Z" fill="currentColor" />
    </svg>;
};

const ContainerVariation = ({ onSelect, wrapper }) => {
    return <>
        <div className={wrapper}>
            <div className="container-variation">
                <h3 className="select-container-variation">{__('Container Structure', 'gutenverse')}</h3>
                <ul className="container-variation-picker-list" aria-label={__('Container variations', 'gutenverse')}>
                    <li className="container-variation-picker-item" onClick={() => onSelect(variation_100)}>
                        <div className="container-variation-picker-item-button">
                            <div className="column-icon col-width-100 col-height-100 with-icon">
                                <IconSide />
                            </div>
                        </div>
                    </li>
                    <li className="container-variation-picker-item" onClick={() => onSelect(variation_100_2)}>
                        <div className="container-variation-picker-item-button">
                            <div className="column-icon col-width-100 col-height-100 with-icon">
                                <IconDown />
                            </div>
                        </div>
                    </li>
                    <li className="container-variation-picker-item" onClick={() => onSelect(variation_50_50)}>
                        <div className="container-variation-picker-item-button">
                            <div className="column-icon col-width-50 col-height-100"></div>
                            <div className="column-icon col-width-50 col-height-100"></div>
                        </div>
                    </li>
                    <li className="container-variation-picker-item" onClick={() => onSelect(variation_33_33_33)}>
                        <div className="container-variation-picker-item-button">
                            <div className="column-icon col-width-33 col-height-100"></div>
                            <div className="column-icon col-width-33 col-height-100"></div>
                            <div className="column-icon col-width-33 col-height-100"></div>
                        </div>
                    </li>
                    <li className="container-variation-picker-item" onClick={() => onSelect(variation_25_75)}>
                        <div className="container-variation-picker-item-button">
                            <div className="column-icon col-width-25 col-height-100"></div>
                            <div className="column-icon col-width-75 col-height-100"></div>
                        </div>
                    </li>
                    <li className="container-variation-picker-item" onClick={() => onSelect(variation_75_25)}>
                        <div className="container-variation-picker-item-button">
                            <div className="column-icon col-width-75 col-height-100"></div>
                            <div className="column-icon col-width-25 col-height-100"></div>
                        </div>
                    </li>
                    <li className="container-variation-picker-item" onClick={() => onSelect(variation_25_50_25)}>
                        <div className="container-variation-picker-item-button">
                            <div className="column-icon col-width-25 col-height-100"></div>
                            <div className="column-icon col-width-50 col-height-100"></div>
                            <div className="column-icon col-width-25 col-height-100"></div>
                        </div>
                    </li>
                    <li className="container-variation-picker-item" onClick={() => onSelect(variation_25_25_25_25)}>
                        <div className="container-variation-picker-item-button">
                            <div className="column-icon col-width-25 col-height-100"></div>
                            <div className="column-icon col-width-25 col-height-100"></div>
                            <div className="column-icon col-width-25 col-height-100"></div>
                            <div className="column-icon col-width-25 col-height-100"></div>
                        </div>
                    </li>
                    <li className="container-variation-picker-item" onClick={() => onSelect(variation_50_50_100)}>
                        <div className="container-variation-picker-item-button">
                            <div className="column-icon col-width-50 col-height-50"></div>
                            <div className="column-icon col-width-50 col-height-50"></div>
                            <div className="column-icon col-width-100 col-height-50"></div>
                        </div>
                    </li>
                    <li className="container-variation-picker-item" onClick={() => onSelect(variation_50_50_100_3)}>
                        <div className="container-variation-picker-item-button">
                            <div className="column-icon col-width-100 col-height-50"></div>
                            <div className="column-icon col-width-50 col-height-50"></div>
                            <div className="column-icon col-width-50 col-height-50"></div>
                        </div>
                    </li>
                    <li className="container-variation-picker-item" onClick={() => onSelect(variation_50_50_100_2)}>
                        <div className="container-variation-picker-item-button">
                            <div className="inner-container col-width-50 col-height-100">
                                <div className="column-icon col-width-100 col-height-50"></div>
                                <div className="column-icon col-width-100 col-height-50"></div>
                            </div>
                            <div className="column-icon col-width-50 col-height-100"></div>
                        </div>
                    </li>
                    <li className="container-variation-picker-item" onClick={() => onSelect(variation_100_50_50)}>
                        <div className="container-variation-picker-item-button">
                            <div className="column-icon col-width-50 col-height-100"></div>
                            <div className="inner-container col-width-50 col-height-100">
                                <div className="column-icon col-width-100 col-height-50"></div>
                                <div className="column-icon col-width-100 col-height-50"></div>
                            </div>
                        </div>
                    </li>
                    <li className="container-variation-picker-item" onClick={() => onSelect(variation_50_50_50_50)}>
                        <div className="container-variation-picker-item-button">
                            <div className="column-icon col-width-50 col-height-50"></div>
                            <div className="column-icon col-width-50 col-height-50"></div>
                            <div className="column-icon col-width-50 col-height-50"></div>
                            <div className="column-icon col-width-50 col-height-50"></div>
                        </div>
                    </li>
                    <li className="container-variation-picker-item" onClick={() => onSelect(variation_33_33_33_33_33_33)}>
                        <div className="container-variation-picker-item-button">
                            <div className="column-icon col-width-33 col-height-50"></div>
                            <div className="column-icon col-width-33 col-height-50"></div>
                            <div className="column-icon col-width-33 col-height-50"></div>
                            <div className="column-icon col-width-33 col-height-50"></div>
                            <div className="column-icon col-width-33 col-height-50"></div>
                            <div className="column-icon col-width-33 col-height-50"></div>
                        </div>
                    </li>
                    <li className="container-variation-picker-item" onClick={() => onSelect(variation_25_75_75_25)}>
                        <div className="container-variation-picker-item-button">
                            <div className="column-icon col-width-25 col-height-50"></div>
                            <div className="column-icon col-width-75 col-height-50"></div>
                            <div className="column-icon col-width-75 col-height-50"></div>
                            <div className="column-icon col-width-25 col-height-50"></div>
                        </div>
                    </li>
                    <li className="container-variation-picker-item" onClick={() => onSelect(variation_33_33_33_33_66)}>
                        <div className="container-variation-picker-item-button">
                            <div className="column-icon col-width-33 col-height-50"></div>
                            <div className="column-icon col-width-33 col-height-50"></div>
                            <div className="column-icon col-width-33 col-height-50"></div>
                            <div className="column-icon col-width-33 col-height-50"></div>
                            <div className="column-icon col-width-66 col-height-50"></div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </>;
};

export default ContainerVariation;
