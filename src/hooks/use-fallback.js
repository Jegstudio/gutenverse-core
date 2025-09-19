/**
 * Run fallback function if first function is not function
 *
 * @since 2.1.1
 * @param {*} mainFunction
 * @param {function} fallbackFunction
 * @param {Array} argsMain
 * @param {Array} argsFallback
 * @returns {*}
 */
export function useFallbackFunction (mainFunction, fallbackFunction, argsMain = [], argsFallback = []) {
    if (typeof newestFunction === 'function') {
        return mainFunction(...argsMain);
    }
    return fallbackFunction(...argsFallback);
}
