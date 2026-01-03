import { __ } from '@wordpress/i18n';
import {
    variation_100,
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
    variation_50_50_50_50
} from '../data';

const ContainerVariation = ({ onSelect, wrapper }) => {
    return <>
        <div className={wrapper}>
            <div className="container-variation">
                <h3 className="select-container-variation">{__('Container Structure', 'gutenverse')}</h3>
                <ul className="container-variation-picker-list" aria-label={__('Container variations', 'gutenverse')}>
                    <li className="container-variation-picker-item" onClick={() => onSelect(variation_100)}>
                        <div className="container-variation-picker-item-button">
                            <div className="column-icon col-width-100 col-height-100"></div>
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
                    <li className="container-variation-picker-item" onClick={() => onSelect(variation_25_25_25_25)}>
                        <div className="container-variation-picker-item-button">
                            <div className="column-icon col-width-25 col-height-100"></div>
                            <div className="column-icon col-width-25 col-height-100"></div>
                            <div className="column-icon col-width-25 col-height-100"></div>
                            <div className="column-icon col-width-25 col-height-100"></div>
                        </div>
                    </li>
                    <li className="container-variation-picker-item" onClick={() => onSelect(variation_25_75)}>
                        <div className="container-variation-picker-item-button">
                            <div className="column-icon col-width-25 col-height-100"></div>
                            <div className="column-icon col-width-75 col-height-100"></div>
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
                    <li className="container-variation-picker-item" onClick={() => onSelect(variation_25_50_25)}>
                        <div className="container-variation-picker-item-button">
                            <div className="column-icon col-width-25 col-height-100"></div>
                            <div className="column-icon col-width-50 col-height-100"></div>
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
