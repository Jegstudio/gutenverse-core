import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { deviceStyleValue } from 'gutenverse-core/styling';

const FeaturedImageBackgroundStyle = ({ attributes, context = {} }) => {
    const { elementId, background = {}, featuredImageFallback = {} } = attributes;
    const { deviceType, featuredImage, isResolving } = useSelect((select) => {
        const editor = select('core/editor');
        const core = select(coreStore);
        const postId = context.postId || editor?.getCurrentPostId?.();
        const postType = context.postType || editor?.getCurrentPostType?.();
        const post = postId && postType ? core.getEditedEntityRecord('postType', postType, postId) : undefined;
        const featuredId = post?.featured_media;
        const media = featuredId ? core.getMedia(featuredId, { context: 'view' }) : undefined;

        return {
            deviceType: getDeviceType(),
            featuredImage: media?.source_url,
            // Wait for the post and media records before showing a fallback.
            isResolving: post === undefined || (!!featuredId && media === undefined),
        };
    }, [context.postId, context.postType]);

    const fallback = deviceStyleValue(deviceType, featuredImageFallback);
    const image = featuredImage || (!isResolving && fallback?.image);

    if (background.type !== 'default' || !background.useFeaturedImage?.[deviceType] || !image) {
        return null;
    }

    const selector = `.${elementId}:not(.background-animated), .${elementId}.background-animated > .guten-background-animated .animated-layer, .${elementId}.empty-container`;

    return <style>{`${selector} { background-image: url(${JSON.stringify(image)}) !important; }`}</style>;
};

const FeaturedImageBackground = (props) => {
    const { useFeaturedFakkback, background = {} } = props.attributes;

    if (!useFeaturedFakkback || background.type !== 'default' || !['Desktop', 'Tablet', 'Mobile'].some(device => background.useFeaturedImage?.[device])) {
        return null;
    }

    return <FeaturedImageBackgroundStyle {...props} />;
};

export default FeaturedImageBackground;
