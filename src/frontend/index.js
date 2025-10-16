import { u } from 'gutenverse-core-frontend';

const elementPlaceholder = u('[data-image-placeholder]');
const { image_placeholder } = window['GutenverseFrontendConfig'];
elementPlaceholder.nodes.map(element => {
    const data = u(element).data('image-placeholder');
    if('gutenverse-image-placeholder' === data){
        u(element).attr('src', image_placeholder);
    }
});