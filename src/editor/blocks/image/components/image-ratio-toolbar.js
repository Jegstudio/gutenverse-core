
import {Dropdown, ToolbarButton} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { DOWN } from '@wordpress/keycodes';
import { imageRatio } from '../data/image-ratio';
import classnames from 'classnames';

const IMAGE_RATIO = imageRatio();

const POPOVER_PROPS = {
    isAlternate: true,
};

const ImageRatio = ({index, isPressed}) => {
    const className = classnames({
        'is-active': isPressed
    });

    return (
        <span className={className}>{IMAGE_RATIO[index]['title']}</span>
    );
};

const ImageRatioToolbar = ({ ratio, setAttributes, setCrop }) => {
    return (
        <Dropdown
            className="guten-image-crop-ratio-options"
            popoverProps={ POPOVER_PROPS }
            renderToggle={ ( { onToggle, isOpen } ) => {
                const openOnArrowDown = ( event ) => {
                    if ( ! isOpen && event.keyCode === DOWN ) {
                        event.preventDefault();
                        event.stopPropagation();
                        onToggle();
                    }
                };

                return (
                    <ToolbarButton
                        aria-expanded={ isOpen }
                        aria-haspopup="true"
                        icon={ <ImageRatio index={ ratio } isPressed={true} /> }
                        label={ __( 'Change crop ratio' ) }
                        onClick={ onToggle }
                        onKeyDown={ openOnArrowDown }
                        showTooltip
                    />
                );
            } }
            renderContent={ () => (
                <div className="guten-image-crop-ratio-options">
                    { IMAGE_RATIO.map( ( item, index ) => {
                        const isActive = index === ratio;

                        return <ToolbarButton
                            key={index}
                            name="ratio"
                            icon={<ImageRatio
                                index={index}
                                isPressed={ isActive }
                            />}
                            title={item.title}
                            onClick={() => {
                                setAttributes({ratio: index});

                                index === 0 ? setCrop({}) : setCrop({ aspect: item.value });
                            }}
                        />;
                    } ) }
                </div>
            ) }
        />
    );
};

export default ImageRatioToolbar;