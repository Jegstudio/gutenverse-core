import { dispatch, select } from '@wordpress/data';
import { AlertControl, ImageRadioControl } from 'gutenverse-core/controls';
import { column1_100, column2_33_66, column2_50_50, column2_66_33, column3_17_66_17, column3_25_25_50, column3_25_50_25, column3_33_33_33, column3_50_25_25, column4_25_25_25_25, column5_20_20_20_20_20 } from '../data/icons';
import { col1_100, col2_33_66, col2_50_50, col2_66_33, col3_17_66_17, col3_25_25_50, col3_25_50_25, col3_33_33_33, col3_50_25_25, col4_25_25_25_25, col5_20_20_20_20_20 } from '../data/section-column';
import { __ } from '@wordpress/i18n';

export const structurePanel = (props) => {
    const {
        clientId
    } = props;

    const innerBlocks = select('core/block-editor').getBlocks(clientId);

    const onChangeStructure = ({ variation = [] }) => {
        const inner = select('core/block-editor').getBlocks(clientId);

        inner?.length && variation.forEach((item, index) => {
            dispatch('core/block-editor').updateBlockAttributes(inner[index]['clientId'], item[1]);
        });
    };

    const getStructureOptions = () => {
        switch (innerBlocks.length) {
            case 1:
                return [
                    {
                        image: column1_100,
                        value: col1_100
                    }
                ];
            case 2:
                return [
                    {
                        image: column2_50_50,
                        value: col2_50_50
                    },
                    {
                        image: column2_66_33,
                        value: col2_66_33
                    },
                    {
                        image: column2_33_66,
                        value: col2_33_66
                    },
                ];
            case 3:
                return [
                    {
                        image: column3_33_33_33,
                        value: col3_33_33_33
                    },
                    {
                        image: column3_25_25_50,
                        value: col3_25_25_50
                    },
                    {
                        image: column3_25_50_25,
                        value: col3_25_50_25
                    },
                    {
                        image: column3_50_25_25,
                        value: col3_50_25_25
                    },
                    {
                        image: column3_17_66_17,
                        value: col3_17_66_17
                    },
                ];
            case 4:
                return [
                    {
                        image: column4_25_25_25_25,
                        value: col4_25_25_25_25
                    }
                ];
            case 5:
                return [
                    {
                        image: column5_20_20_20_20_20,
                        value: col5_20_20_20_20_20
                    }
                ];
            default:
                return [];
        }
    };

    if (innerBlocks.length) {
        return [
            {
                id: 'variation',
                component: ImageRadioControl,
                options: getStructureOptions(),
                onChange: onChangeStructure
            }
        ];
    } else {
        return [
            {
                id: 'empty-structure',
                component: AlertControl,
                children: <>
                    <span>{__('Please Select Column for your Section.', '--gctd--')}</span>
                </>
            }
        ];
    }
};