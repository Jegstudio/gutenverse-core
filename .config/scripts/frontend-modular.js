const path = require("path");
const fs = require("fs");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const rules = require("gutenverse-core/.config/rules");
const { output } = require('../config');
const { stats, plugins } = require("gutenverse-core/.config/config");
const { externals, coreFrontendExternals } = require("gutenverse-core/.config/externals");
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');

const modularDir = path.resolve(__dirname, "../../src/frontend/blocks/");
const depDir = path.resolve(__dirname, "../../src/frontend/deps/");

const getDepsConfig = () => {
    const files = fs.readdirSync(depDir).filter(file => file.endsWith('.js'));
    const names = {};
    const entry = {};
    const copyTasks = [];
    const deleteTasks = [];

    files.forEach(file => {
        const name = file.replace('.js', '');

        entry[name] = {
            import: path.join(depDir, file),
            library: {
                name: name,
                type: "window",
            },
        };

        deleteTasks.push(`./gutenverse/assets/js/frontend/${name}.js`);

        copyTasks.push({
            source: process.env.NODE_ENV === 'development' ? `./build/${name}.js` : `./build/${name}.js`,
            destination: "./gutenverse/assets/js/frontend/",
        });

        names[name] = name;
    });

    return { entry, copyTasks, deleteTasks, names };
}

const getModularConfig = () => {
    const files = fs.readdirSync(modularDir).filter(file => file.endsWith('.js'));

    const entry = {};
    const copyTasks = [];
    const deleteTasks = [];

    files.forEach(file => {
        const name = file.replace('.js', '');

        entry[name] = {
            import: path.join(modularDir, file),
        };

        deleteTasks.push(`./gutenverse/assets/js/frontend/${name}.js*`);
        deleteTasks.push(`./gutenverse/lib/dependencies/frontend/${name}.asset.php`);

        copyTasks.push({
            source: process.env.NODE_ENV === 'development' ? `./build/${name}.js*` : `./build/${name}.js`,
            destination: "./gutenverse/assets/js/frontend/",
        });

        copyTasks.push({
            source: `./build/${name}.asset.php`,
            destination: "./gutenverse/lib/dependencies/frontend/",
        });
    });

    return { entry, copyTasks, deleteTasks };
};

const { entry, copyTasks, deleteTasks } = getModularConfig();
const depsResult = getDepsConfig();

const frontendDeps = depsResult?.names ? depsResult?.names : {};
Object.assign(entry, depsResult?.entry ? depsResult?.entry : {});
copyTasks.push(...(depsResult?.copyTasks ? depsResult?.copyTasks : []));
deleteTasks.push(...(depsResult?.deleteTasks ? depsResult?.deleteTasks : []));

const makeDepsFunc = (frmt) => {
    return (request) => {
        for (const name of Object.keys(frontendDeps)) {
            if (request === name) {
                return frmt(frontendDeps[name]);
            }
        }
        return undefined;
    }
};

const frontendModular = {
    mode: "development",
    devtool: "source-map",
    entry,
    externals: {
        ...externals,
        ...coreFrontendExternals,
        ...frontendDeps,
    },
    stats,
    output,
    module: {
        strictExportPresence: true,
        rules,
    },
    plugins: [
        ...plugins,
        new DependencyExtractionWebpackPlugin({
            requestToExternal: makeDepsFunc((val) => val),
            requestToHandle: makeDepsFunc((val) => `gutenverse-dep-${val}-script`),
        }),
        new FileManagerPlugin({
            events: {
                onStart: {
                    delete: [
                        ...deleteTasks,
                        "./gutenverse/assets/js/frontend/chunk-shufflejs.js*",
                        "./gutenverse/assets/js/frontend/chunk-swiper.js*",
                        "./gutenverse/assets/js/frontend/chunk-swiper-modules.js*",
                        "./gutenverse/assets/js/frontend/vendors-node_modules_pnpm_swiper_https_gitpkg_vercel_app_Jegstudio_swiper-for-gutenverse_*.js*",
                        "./gutenverse/assets/js/frontend/vendors-node_modules_swiper_shared_utils_mjs.js*"
                    ]
                },
                onEnd: {
                    copy: [
                        ...copyTasks,
                        {
                            source: process.env.NODE_ENV === 'development' ? "./build/chunk-shufflejs.js*" : "./build/chunk-shufflejs.js",
                            destination: "./gutenverse/assets/js/frontend/",
                        },
                        {
                            source: process.env.NODE_ENV === 'development' ? "./build/chunk-swiper.js*" : "./build/chunk-swiper.js",
                            destination: "./gutenverse/assets/js/frontend/",
                        },
                        {
                            source: process.env.NODE_ENV === 'development' ? "./build/vendors-node_modules_pnpm_swiper_https_gitpkg_vercel_app_Jegstudio_swiper-for-gutenverse_*.js*" : "./build/vendors-node_modules_pnpm_swiper_https_gitpkg_vercel_app_Jegstudio_swiper-for-gutenverse_*.js",
                            destination: "./gutenverse/assets/js/frontend/",
                        },
                        {
                            source: process.env.NODE_ENV === 'development' ? "./build/chunk-swiper-modules.js*" : "./build/chunk-swiper-modules.js",
                            destination: "./gutenverse/assets/js/frontend/",
                        },
                        {
                            source: process.env.NODE_ENV === 'development' ? "./build/chunk-anime.js*" : "./build/chunk-anime.js",
                            destination: "./gutenverse/assets/js/frontend/",
                        },
                        {
                            source: process.env.NODE_ENV === 'development' ? "./build/vendors-node_modules_swiper_shared_utils_mjs.js*" : "./build/vendors-node_modules_swiper_shared_utils_mjs.js",
                            destination: "./gutenverse/assets/js/frontend/",
                        }
                    ],
                },
            },
            runTasksInSeries: true,
        }),
    ],
};

module.exports = {
    frontendModular,
};
