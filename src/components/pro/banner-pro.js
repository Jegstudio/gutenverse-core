import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import { IconCrownSVG } from 'gutenverse-core/icons';
import ButtonUpgradePro from './button-upgrade-pro';

const BannerPro = ({
	customStyles = {},
}) => {
	const {
		imgDir,
		themesUrl,
	} = window['GutenverseConfig'] || window['GutenverseDashboard'] || {};

	const banner = <div className="banner-pro" style={customStyles}>
		{imgDir && <img className="banner-image" src={`${imgDir}/banner-pro.png`} />}
		<p className="subtitle">{__('Welcome to Gutenverse Library', '--gctd--')}</p>
		<h4 className="title">{__('Discover Our Premium Templates & Sections', '--gctd--')}</h4>
		<div className="buttons">
			<ButtonUpgradePro />
			<a className="demo-button" href={themesUrl} target="_blank" rel="noreferrer">{__('View Demo', '--gctd--')}</a>
		</div>
	</div>;

	// Remove banner when script PRO is loaded.
	return applyFilters(
        'gutenverse.library.banner',
        banner,
        null
    );
}

export default BannerPro;