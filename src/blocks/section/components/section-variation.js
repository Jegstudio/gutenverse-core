import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { ChevronLeft } from 'react-feather';
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
    const { onClick, data } = props;
    return <li className="section-variation-picker-item">
        <div
            className="section-variation-picker-item-button"
            onClick={onClick}
        >
            {/* {data?.map((width, key) => {
                return <div key={key} className="column-icon" style={{ width: `${width}%` }}></div>;
            })} */}
        </div>
        {/* <Button
            isSecondary
            iconSize={80}
            className="section-variation-picker-item-button"
            {...props}
        /> */}
    </li>;
};

const SectionVariationPicker = ({ onSelect }) => {
    let choose;
    const [column, setColumn] = useState(0);

    const ResetColumn = (
        <div className={'reset-column'} onClick={() => setColumn(0)}>
            <span>
                <ChevronLeft height={18} width={12} /> {__('Back', '--gctd--')}
            </span>
        </div>
    );

    if (column === 0) {
        choose = <>
            <h3 className="select-column-variation">{__('Select Column', '--gctd--')}</h3>
            <ul className="section-variation-picker-list" aria-label={__('Section variations', '--gctd--')}>
                <VariationList
                    onClick={() => onSelect(col1_100)}
                    data={['100']}
                    label={__('1 Column', '--gctd--')}
                />
                <VariationList
                    onClick={() => setColumn(2)}
                    data={['50', '50']}
                    label={__('2 Column', '--gctd--')}
                />
                <VariationList
                    onClick={() => setColumn(3)}
                    data={['33', '33', '33']}
                    label={__('3 Column', '--gctd--')}
                />
                <VariationList
                    onClick={() => onSelect(col4_25_25_25_25)}
                    data={['25', '25', '25', '25']}
                    label={__('4 Column', '--gctd--')}
                />
                <VariationList
                    onClick={() => onSelect(col5_20_20_20_20_20)}
                    data={['20', '20', '20', '20', '20']}
                    label={__('5 Column', '--gctd--')}
                />
            </ul>
        </>;
    } else if (column === 2) {
        choose = <>
            <h3 className="select-column-variation">{__(' 2 Column', '--gctd--')}</h3>
            <ul className="section-variation-picker-list" aria-label={__('Section variations', '--gctd--')}>
                <VariationList
                    onClick={() => onSelect(col2_50_50)}
                    data={['50', '50']}
                    label={__('50 / 50', '--gctd--')}
                />
                <VariationList
                    onClick={() => onSelect(col2_66_33)}
                    data={['66', '33']}
                    label={__('66 / 33', '--gctd--')}
                />
                <VariationList
                    onClick={() => onSelect(col2_33_66)}
                    data={['33', '66']}
                    label={__('33 / 66', '--gctd--')}
                />
            </ul>
            {ResetColumn}
        </>;
    } else if (column === 3) {
        choose = <>
            <h3 className="select-column-variation">{__(' 3 Column', '--gctd--')}</h3>
            <ul className="section-variation-picker-list" aria-label={__('Section variations', '--gctd--')}>
                <VariationList
                    onClick={() => onSelect(col3_33_33_33)}
                    data={['33', '33', '33']}
                    label={__('33 / 33 / 33', '--gctd--')}
                />
                <VariationList
                    onClick={() => onSelect(col3_25_25_50)}
                    data={['25', '25', '50']}
                    label={__('25 / 25 / 50', '--gctd--')}
                />
                <VariationList
                    onClick={() => onSelect(col3_25_50_25)}
                    data={['25', '50', '25']}
                    label={__('25 / 50 / 25', '--gctd--')}
                />
                <VariationList
                    onClick={() => onSelect(col3_50_25_25)}
                    data={['50', '25', '25']}
                    label={__('50 / 25 / 25', '--gctd--')}
                />
                <VariationList
                    onClick={() => onSelect(col3_17_66_17)}
                    data={['17', '66', '17']}
                    label={__('17 / 66 / 17', '--gctd--')}
                />
            </ul>
            {ResetColumn}
        </>;
    }

    return <div className={'column-picker'}>
        {choose}
    </div>;
};

const SectionVariation = ({ onSelect, wrapper }) => {
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
