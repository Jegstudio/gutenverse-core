import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import { IconCrownSVG } from 'gutenverse-core/icons';

const BannerPro = () => {
	const {
		imgDir,
		themesUrl,
		referalUrl,
	} = window['GutenverseConfig'];

	const banner = <div className="banner-pro">
		{imgDir && <img className="banner-image" src={`${imgDir}/banner-pro.png`} />}
		<p className="subtitle">{__('Welcome to Gutenverse Library', '--gctd--')}</p>
		<h4 className="title">{__('Discover Our Premium Templates & Sections', '--gctd--')}</h4>
		<div className="buttons">
			<a className="gutenverse-button" href={referalUrl} target="_blank" rel="noreferrer"><IconCrownSVG />{__(' Upgrade to Pro', '--gctd--')}</a>
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