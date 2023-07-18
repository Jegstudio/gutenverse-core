import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { IconInfoGraySVG, IconCheckCircleSVG, IconTimesSVG } from 'gutenverse-core/icons';
import ReactTooltip from 'react-tooltip';
import classnames from 'classnames';
import semver from 'semver';
import { DashboardBody, DashboardContent, DashboardHeader } from '../../components';

const ThemeBody = (props) => {
    const { header, children } = props;

    return <div className="system-body">
        <table className="widefat">
            <thead>
                <tr>
                    <th colSpan={3}>{header}</th>
                </tr>
            </thead>
            <tbody>
                {children}
            </tbody>
        </table>
    </div>;
};

const TableRow = ({ id, title, description, value }) => {
    return <tr>
        <td className="status-title">{title}</td>
        <td className="status-flag help">
            <div className="tooltip-wrapper" data-for={id} data-tip={description}>
                <IconInfoGraySVG />
            </div>
            <ReactTooltip id={id} place="right" effect="solid" className="system-status-tooltip" />
        </td>
        <td className="status-value">
            <div className="status-wrapper">
                {value}
            </div>
        </td>
    </tr>;
};

const TableRowPlugin = ({ plugin }) => {
    const { additional_text, link, link_text, title } = plugin;
    return <tr>
        <td className="status-title">{title}</td>
        <td className="status-flag help">
        </td>
        <td className="status-value">
            <div className="status-wrapper">
                {__('by ', 'gutenverse')}
                <a href={link} target={'_blank'} rel="noreferrer">{link_text}</a>
                &nbsp; - {additional_text}
            </div>
        </td>
    </tr>;
};

const TableRowFlag = ({ id, title, flag, children }) => {
    let description = '';

    switch (flag) {
        case 'yellow':
            description = __('This setting may not affect your website entirely, but it will cause some of the features not working as expected.', 'gutenverse');
            break;
        case 'green':
            description = __('Everything is Good', 'gutenverse');
            break;
        case 'red':
            description = __('You will need to fix this setting to make plugin work as expected.', 'gutenverse');
            break;
    }

    return <tr>
        <td className="status-title">{title}</td>
        <td className="status-flag help">
            <div className="tooltip-wrapper" data-for={id} data-tip={description}>
                <div className={classnames('status-flag-circle', flag)}></div>
            </div>
            <ReactTooltip id={id} place="right" effect="solid" className="system-status-tooltip" />
        </td>
        <td className="status-value">
            <div className="status-wrapper">
                {children}
            </div>
        </td>
    </tr>;
};

const ThemeInformation = ({ system }) => {
    const {
        theme_name,
        theme_version,
        is_child_theme,
        parent_theme,
        parent_version
    } = system;

    return <ThemeBody header={__('Theme Information', 'gutenverse')}>
        <>
            <TableRow
                id={'theme_name'}
                title={__('Theme Name', 'gutenverse')}
                description={__('Themes currently installed & activated', 'gutenverse')}
                value={theme_name}
            />
            <TableRow
                id={'theme_version'}
                title={__('Theme Version', 'gutenverse')}
                description={__('Current theme version', 'gutenverse')}
                value={theme_version}
            />
            {is_child_theme && <>
                <TableRow
                    id={'parent_theme'}
                    title={__('Parent Theme', 'gutenverse')}
                    description={__('Current theme parent', 'gutenverse')}
                    value={parent_theme}
                />
                <TableRow
                    id={'parent_theme_version'}
                    title={__('Parent Theme Version', 'gutenverse')}
                    description={__('Current parent theme version', 'gutenverse')}
                    value={parent_version}
                />
            </>}
        </>
    </ThemeBody>;
};

const mbToByte = (size) => {
    const length = size.length;
    const l = size.substring(length - 1, length);
    let ret = size.substring(0, length - 1);

    switch (l) {
        case 'P':
            ret *= 1024;
            break;
        case 'T':
            ret *= 1024;
            break;
        case 'G':
            ret *= 1024;
            break;
        case 'M':
            ret *= 1024;
            break;
        case 'K':
            ret *= 1024;
            break;
    }

    return ret;
};

const WordPressEnvironment = ({ system }) => {
    const {
        home_url,
        site_url,
        login_url,
        wp_version,
        is_multisite,
        wp_debug,
        memory_limit,
        wp_memory_limit,
        wp_language,
        writeable_upload,
        count_category,
        count_tag
    } = system;

    const mlimit = 262144;

    return <ThemeBody header={__('WordPress Environtment', 'gutenverse')}>
        <>
            <TableRow
                id={'home_url'}
                title={__('Home URL', 'gutenverse')}
                description={__('The URL of your site\'s homepage', 'gutenverse')}
                value={home_url}
            />
            <TableRow
                id={'site_url'}
                title={__('Site URL', 'gutenverse')}
                description={__('The root URL of your site', 'gutenverse')}
                value={site_url}
            />
            <TableRow
                id={'login_url'}
                title={__('Login URL', 'gutenverse')}
                description={__('Your website login url', 'gutenverse')}
                value={login_url}
            />
            <TableRow
                id={'wp_version'}
                title={__('WP Version', 'gutenverse')}
                description={__('The version of WordPress installed on your site', 'gutenverse')}
                value={wp_version}
            />
            <TableRow
                id={'wp_multisite'}
                title={__('WP Multisite', 'gutenverse')}
                description={__('Whether or not you have WordPress Multisite enabled', 'gutenverse')}
                value={is_multisite ? <IconCheckCircleSVG /> : <IconTimesSVG />}
            />
            <TableRowFlag
                id={'wp_debug_mode'}
                title={__('WP Debug Mode', 'gutenverse')}
                flag={wp_debug ? 'yellow' : 'green'}
            >
                {wp_debug ? <>
                    <strong>{__('Enabled', 'gutenverse')}</strong> &nbsp;
                    <span>{__('Only enable WP DEBUG if you are on development server, once on production server, you will need to disable WP Debug', 'gutenverse')}</span>
                </> : <>
                    <strong>{__('Disabled', 'gutenverse')}</strong> &nbsp;
                    <span>{__('Only enable WP DEBUG if you are on development server, once on production server, you will need to disable WP Debug', 'gutenverse')}</span>
                </>}
            </TableRowFlag>
            <TableRowFlag
                id={'php_memory_limit'}
                title={__('PHP Memory Limit', 'gutenverse')}
                flag={mbToByte(memory_limit) >= mlimit ? 'green' : 'yellow'}
            >
                {mbToByte(memory_limit) >= mlimit ?
                    <mark className="yes">{memory_limit}</mark> :
                    <>
                        <mark className="error">
                            {memory_limit} {__(' - We recommend setting memory to at least 256MB.', 'gutenverse')}
                        </mark>
                        &nbsp;&nbsp;
                        <a href="http://codex.wordpress.org/Editing_wp-config.php#Increasing_memory_allocated_to_PHP" target="_blank" rel="noreferrer">
                            {__('See: Increasing memory allocated to PHP', 'gutenverse')}
                        </a>
                    </>
                }
            </TableRowFlag>
            <TableRowFlag
                id={'wp_memory_limit'}
                title={__('WP Memory Limit', 'gutenverse')}
                flag={mbToByte(wp_memory_limit) >= mlimit ? 'green' : 'yellow'}
            >
                {mbToByte(wp_memory_limit) >= mlimit ?
                    <mark className="yes">{wp_memory_limit}</mark> :
                    <>
                        <mark className="error">
                            {wp_memory_limit} {__(' - We recommend setting memory to at least 256MB.', 'gutenverse')}
                        </mark>
                        &nbsp;&nbsp;
                        <a href="http://support.jegtheme.com/documentation/system-status/#memory-limit" target="_blank" rel="noreferrer">
                            {__('See: Increasing the WordPress Memory Limit', 'gutenverse')}
                        </a>
                    </>
                }
            </TableRowFlag>
            <TableRow
                id={'wp_language'}
                title={__('WP Language', 'gutenverse')}
                description={__('Default Language of your WordPress Installation', 'gutenverse')}
                value={wp_language}
            />
            <TableRowFlag
                id={'writeable_upload'}
                title={__('Writeable Upload Directory', 'gutenverse')}
                flag={writeable_upload ? 'green' : 'red'}
            >
                {writeable_upload ?
                    <mark className="yes">
                        <IconCheckCircleSVG />
                    </mark> :
                    <>
                        <mark className="error">
                            <IconTimesSVG /> &nbsp; &nbsp; {__('Please make sure your upload directory writeable. Some feature may not work as expected.', 'gutenverse')}
                        </mark>
                    </>
                }
            </TableRowFlag>
            <TableRow
                id={'number_category'}
                title={__('Number of Category', 'gutenverse')}
                description={__('The current number of post category on your site', 'gutenverse')}
                value={count_category}
            />
            <TableRow
                id={'number_tag'}
                title={__('Number of Tag', 'gutenverse')}
                description={__('The current number of post tag on your site', 'gutenverse')}
                value={count_tag}
            />
        </>
    </ThemeBody>;
};

const ServerEnvironment = ({ system }) => {
    const {
        server_info,
        php_version,
        post_max_size,
        max_execution_time,
        max_input_vars,
        suhosin,
        wp_remote_get,
        imagick,
        gd,
        gd_webp,
        fileinfo,
        curl
    } = system;

    const version = semver.minSatisfying([php_version], '>=7.4.30');
    const pmaxsize = 3000;
    const minputsize = 2000;

    return <ThemeBody header={__('Server Environtment', 'gutenverse')}>
        <>
            <TableRow
                id={'server_info'}
                title={__('Server Info', 'gutenverse')}
                description={__('Information about the web server that is currently hosting your site', 'gutenverse')}
                value={server_info}
            />
            <TableRowFlag
                id={'php_version'}
                title={__('PHP Version', 'gutenverse')}
                flag={version === null ? 'yellow' : 'green'}
            >
                {version !== null ? php_version : <mark className="error">
                    {php_version} <span>{__('We recommend a minimum PHP version of 7.4', 'gutenverse')}</span>
                </mark>}
            </TableRowFlag>
            <TableRow
                id={'post_max_size'}
                title={__('PHP Post Max Size', 'gutenverse')}
                description={__('The largest filesize that can be contained in one post', 'gutenverse')}
                value={post_max_size}
            />
            <TableRowFlag
                id={'php_time_limit'}
                title={__('PHP Time Limit', 'gutenverse')}
                flag={max_execution_time >= pmaxsize ? 'green' : 'yellow'}
            >
                {max_execution_time >= pmaxsize ? max_execution_time :
                    <>
                        <mark className="error">
                            {max_execution_time} &nbsp;
                            <span>
                                {__('max_execution_time should be bigger than ') + pmaxsize + __(', otherwise import process may not finished as expected', 'gutenverse')}
                            </span>
                        </mark>
                    </>}
            </TableRowFlag>
            <TableRowFlag
                id={'php_max_input'}
                title={__('PHP Max Input Vars', 'gutenverse')}
                flag={max_input_vars >= minputsize ? 'green' : 'yellow'}
            >
                {max_input_vars >= minputsize ? max_input_vars :
                    <>
                        <mark className="error">
                            {max_input_vars} &nbsp;
                            <span>
                                {__('max_input_vars should be bigger than  ') + minputsize + __(', otherwise you may not able to save setting on option panel', 'gutenverse')}
                            </span>
                        </mark>
                    </>}
            </TableRowFlag>
            <TableRow
                id={'suhosin'}
                title={__('SUHOSIN Installed', 'gutenverse')}
                description={__('Suhosin is an advanced protection system for PHP installations. It was designed to protect your servers on the one hand against a number of well known problems in PHP applications and on the other hand against potential unknown vulnerabilities within these applications or the PHP core itself. If enabled on your server, Suhosin may need to be configured to increase its data submission limits.', 'gutenverse')}
                value={suhosin ? <IconCheckCircleSVG /> : <IconTimesSVG />}
            />
            <TableRowFlag
                id={'wp_remote_get'}
                title={__('WP Remote Get', 'gutenverse')}
                flag={wp_remote_get ? 'green' : 'red'}
            >
                {wp_remote_get ?
                    <mark className="yes">
                        <IconCheckCircleSVG />
                    </mark> :
                    <mark className="error">
                        <span>
                            {__('Please Enable WP Remote Get, some plugin feature may not work if remote get disabled.', 'gutenverse')}
                        </span>
                    </mark>}
            </TableRowFlag>
            <TableRowFlag
                id={'php_image'}
                title={__('PHP Image library installed', 'gutenverse')}
                flag={imagick ? 'green' : 'yellow'}
            >
                {imagick ?
                    <mark className="yes">
                        <IconCheckCircleSVG />
                    </mark> :
                    <mark className="error">
                        <span>
                            {__('Please install PHP image Magic library', 'gutenverse')}
                        </span>
                    </mark>}
            </TableRowFlag>
            <TableRowFlag
                id={'php_gd'}
                title={__('PHP GD library installed', 'gutenverse')}
                flag={gd ? 'green' : 'yellow'}
            >
                {gd ?
                    <mark className="yes">
                        <IconCheckCircleSVG />
                    </mark> :
                    <mark className="error">
                        <span>
                            {__('Please install PHP GD library', 'gutenverse')}
                        </span>
                    </mark>}
            </TableRowFlag>
            <TableRowFlag
                id={'php_gd_webp'}
                title={__('PHP GD WebP supported', 'gutenverse')}
                flag={gd_webp ? 'green' : 'yellow'}
            >
                {gd_webp ?
                    <mark className="yes">
                        <IconCheckCircleSVG />
                    </mark> :
                    <mark className="error">
                        <IconTimesSVG />
                    </mark>}
            </TableRowFlag>
            <TableRowFlag
                id={'php_fileinfo'}
                title={__('PHP fileinfo library installed', 'gutenverse')}
                flag={fileinfo ? 'green' : 'yellow'}
            >
                {fileinfo ?
                    <mark className="yes">
                        <IconCheckCircleSVG />
                    </mark> :
                    <mark className="error">
                        <IconTimesSVG />
                    </mark>}
            </TableRowFlag>
            <TableRowFlag
                id={'curl'}
                title={__('CURL Installed', 'gutenverse')}
                flag={curl ? 'green' : 'yellow'}
            >
                {curl ?
                    <mark className="yes">
                        <IconCheckCircleSVG />
                    </mark> :
                    <mark className="error">
                        <IconTimesSVG />
                    </mark>}
            </TableRowFlag>
        </>
    </ThemeBody>;
};

const Plugins = ({ system }) => {
    const { plugins } = system;
    return <ThemeBody header={__('Installed Plugin', 'gutenverse')}>
        {plugins.map((plugin, index) => {
            return <TableRowPlugin
                key={index}
                plugin={plugin}
            />;
        })}
    </ThemeBody>;
};

const systemText = system => {
    // Theme Info.
    const { theme_name, theme_version, is_child_theme, parent_theme, parent_version } = system;

    let text = '### THEME INFO ###\n\n';
    text += `Theme Name : ${theme_name}\n`;
    text += `Theme Version : ${theme_version}\n`;
    if (is_child_theme) {
        text += `Parent Theme : ${parent_theme}\n`;
        text += `Parent Theme Version : ${parent_version}\n`;
    }

    // WordPress Environment.
    const {
        home_url,
        site_url,
        login_url,
        wp_version,
        is_multisite,
        wp_debug,
        memory_limit,
        wp_memory_limit,
        wp_language,
        writeable_upload,
        count_category,
        count_tag
    } = system;

    text += '\n\n### WordPress Environment ###\n\n';
    text += `Home URL : ${home_url}\n`;
    text += `Site URL : ${site_url}\n`;
    text += `Login URL : ${login_url}\n`;
    text += `WP Version : ${wp_version}\n`;
    text += `WP Multisite : ${is_multisite ? '✔' : '-'}\n`;
    text += `WP Debug Mode : ${wp_debug ? __('Enabled', 'gutenverse') : __('Disabled', 'gutenverse')}\n`;
    text += `PHP Memory Limit : ${memory_limit}\n`;
    text += `WP Memory Limit : ${wp_memory_limit}\n`;
    text += `WP Language : ${wp_language}\n`;
    text += `WP Upload Directory : ${writeable_upload ? '✔' : '-'}\n`;
    text += `Number of Category : ${count_category}\n`;
    text += `Number of Tag : ${count_tag}\n`;

    // Server Environment
    const {
        server_info,
        php_version,
        post_max_size,
        max_execution_time,
        max_input_vars,
        suhosin,
        wp_remote_get,
        imagick,
        gd,
        gd_webp,
        fileinfo,
        curl
    } = system;

    text += '\n\n### Server Environment ###\n\n';
    text += `Server Info : ${server_info}\n`;
    text += `PHP Version : ${php_version}\n`;
    text += `PHP Post Max Size : ${post_max_size}\n`;
    text += `PHP Time Limit : ${max_execution_time}\n`;
    text += `PHP Max Input Vars : ${max_input_vars}\n`;
    text += `SUHOSIN Installed : ${suhosin ? '✔' : '-'}\n`;
    text += `WP Remote Get : ${wp_remote_get ? '✔' : '-'}\n`;
    text += `PHP Image library installed  : ${imagick ? '✔' : '-'}\n`;
    text += `PHP GD library installed  : ${gd ? '✔' : '-'}\n`;
    text += `PHP GD WebP supported : ${gd_webp ? '✔' : '-'}\n`;
    text += `PHP fileinfo library installed  : ${fileinfo ? '✔' : '-'}\n`;
    text += `CURL Installed  : ${curl ? '✔' : '-'}\n`;

    // Active Plugins
    const { plugins } = system;

    text += '\n\n### Active Plugins ###\n\n';

    plugins.map(plugin => {
        const { title, link_text, additional_text } = plugin;
        text += `${title} : ${__('by', 'gutenverse')} ${link_text} - ${additional_text}\n`;
    });

    return text;
};

const System = () => {
    const defaultCopyText = __('Copy System Status', 'gutenverse');
    const { system } = window['GutenverseDashboard'];
    const [copyText, setCopyText] = useState(defaultCopyText);

    const copySystem = async () => {
        const text = systemText(system);
        await navigator.clipboard.writeText(text);

        setCopyText(__('Copied...', 'gutenverse'));
        setTimeout(() => {
            setCopyText(defaultCopyText);
        }, 500);
    };

    return <DashboardContent>
        <DashboardHeader>
            <h2>{__('System Status', 'gutenverse')}</h2>
            <div className="gutenverse-button" onClick={() => copySystem()}>
                {copyText}
            </div>
        </DashboardHeader>
        <DashboardBody>
            <ThemeInformation system={system} />
            <WordPressEnvironment system={system} />
            <ServerEnvironment system={system} />
            <Plugins system={system} />
        </DashboardBody>
    </DashboardContent>;
};

export default System;
