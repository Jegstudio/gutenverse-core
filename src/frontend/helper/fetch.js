// import apiFetch from '@wordpress/api-fetch';

// Initialize Fetch so it can be used on each frontend plugin.
// export default (function (apiFetch) {
//     const { wpjson_url, wpjson_nonce, wpjson_endpoint } = window.GutenverseFrontendConfig;
//     apiFetch.use(apiFetch.createRootURLMiddleware(wpjson_url));
//     apiFetch.nonceMiddleware = apiFetch.createNonceMiddleware(wpjson_nonce);
//     apiFetch.use(apiFetch.nonceMiddleware);
//     apiFetch.use(apiFetch.mediaUploadMiddleware);
//     apiFetch.nonceEndpoint = wpjson_endpoint;
// })(apiFetch);

// comment for now for archive