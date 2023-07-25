import {__} from '@wordpress/i18n';
import {Button} from '@wordpress/components';
import {useState} from '@wordpress/element';
import {ChevronLeft} from 'react-feather';
import {
    column1_100,
    column2_33_66,
    column2_50_50,
    column2_66_33,
    column3_17_66_17,
    column3_25_25_50,
    column3_25_50_25,
    column3_33_33_33,
    column3_50_25_25,
    column4_25_25_25_25,
    column5_20_20_20_20_20
} from '../data/icons';
import {
    col1_100,
    col2_33_66,
    col2_50_50,
    col2_66_33,
    col3_17_66_17,
    col3_25_25_50,
    col3_25_50_25,
    col3_33_33_33,
    col3_50_25_25,
    col4_25_25_25_25,
    col5_20_20_20_20_20
} from '../data/section-column';

const VariationList = (props) => {
    return <li className="section-variation-picker-item">
        <Button
            isSecondary
            iconSize={80}
            className="section-variation-picker-item-button"
            {...props}
        />
    </li>;
};

const SectionVariationPicker = ({onSelect}) => {
    let choose;
    const [column, setColumn] = useState(0);

    const ResetColumn = (
        <div className={'reset-column'} onClick={() => setColumn(0)}>
            <span>
                <ChevronLeft height={18} width={12}/> {__('Back', 'gctd')}
            </span>
        </div>
    );

    if (column === 0) {
        choose = <>
            <h3 className="select-column-variation">{__('Select Column', 'gctd')}</h3>
            <ul className="section-variation-picker-list" aria-label={__('Section variations', 'gctd')}>
                <VariationList
                    icon={column1_100}
                    onClick={() => onSelect(col1_100)}
                    label={__('1 Column', 'gctd')}
                />
                <VariationList
                    icon={column2_50_50}
                    onClick={() => setColumn(2)}
                    label={__('2 Column', 'gctd')}
                />
                <VariationList
                    icon={column3_33_33_33}
                    onClick={() => setColumn(3)}
                    label={__('3 Column', 'gctd')}
                />
                <VariationList
                    icon={column4_25_25_25_25}
                    onClick={() => onSelect(col4_25_25_25_25)}
                    label={__('4 Column', 'gctd')}
                />
                <VariationList
                    icon={column5_20_20_20_20_20}
                    onClick={() => onSelect(col5_20_20_20_20_20)}
                    label={__('5 Column', 'gctd')}
                />
            </ul>
        </>;
    } else if (column === 2) {
        choose = <>
            <h3 className="select-column-variation">{__(' 2 Column', 'gctd')}</h3>
            <ul className="section-variation-picker-list" aria-label={__('Section variations', 'gctd')}>
                <VariationList
                    icon={column2_50_50}
                    onClick={() => onSelect(col2_50_50)}
                    label={__('50 / 50', 'gctd')}
                />
                <VariationList
                    icon={column2_66_33}
                    onClick={() => onSelect(col2_66_33)}
                    label={__('66 / 33', 'gctd')}
                />
                <VariationList
                    icon={column2_33_66}
                    onClick={() => onSelect(col2_33_66)}
                    label={__('33 / 66', 'gctd')}
                />
            </ul>
            {ResetColumn}
        </>;
    } else if (column === 3) {
        choose = <>
            <h3 className="select-column-variation">{__(' 3 Column', 'gctd')}</h3>
            <ul className="section-variation-picker-list" aria-label={__('Section variations', 'gctd')}>
                <VariationList
                    icon={column3_33_33_33}
                    onClick={() => onSelect(col3_33_33_33)}
                    label={__('33 / 33 / 33', 'gctd')}
                />
                <VariationList
                    icon={column3_25_25_50}
                    onClick={() => onSelect(col3_25_25_50)}
                    label={__('25 / 25 / 50', 'gctd')}
                />
                <VariationList
                    icon={column3_25_50_25}
                    onClick={() => onSelect(col3_25_50_25)}
                    label={__('25 / 50 / 25', 'gctd')}
                />
                <VariationList
                    icon={column3_50_25_25}
                    onClick={() => onSelect(col3_50_25_25)}
                    label={__('50 / 25 / 25', 'gctd')}
                />
                <VariationList
                    icon={column3_17_66_17}
                    onClick={() => onSelect(col3_17_66_17)}
                    label={__('17 / 66 / 17', 'gctd')}
                />
            </ul>
            {ResetColumn}
        </>;
    }

    return <div className={'column-picker'}>
        {choose}
    </div>;
};

const SectionVariation = ({onSelect, wrapper}) => {
    return <>
        <div className={wrapper}>
            <div className={'section-variation-picker-choose  section-variation-picker-container'}>
                <SectionVariationPicker
                    onSelect={onSelect}
                />
            </div>
        </div>
    </>;
};

export default SectionVariation;
