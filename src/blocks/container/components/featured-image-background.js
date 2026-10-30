import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { memo } from '@wordpress/element';
import { deviceStyleValue } from 'gutenverse-core/styling';

const FeaturedImageBackgroundStyle = ({ attributes, context = {}, deviceType }) => {
    const { elementId, featuredImageFallback = {} } = attributes;
    const { postId, postType } = context;
    const { featuredImage, isResolving } = useSelect((select) => {
        const editor = select('core/editor');
        const core = select(coreStore);
        const currentPostId = postId || editor?.getCurrentPostId?.();
        const currentPostType = postType || editor?.getCurrentPostType?.();
        const post = currentPostId && currentPostType ? core.getEditedEntityRecord('postType', currentPostType, currentPostId) : undefined;
        const featuredId = post?.featured_media;
        const media = featuredId ? core.getMedia(featuredId, { context: 'view' }) : undefined;

        return {
            featuredImage: media?.source_url,
            // Wait for the post and media records before showing a fallback.
            isResolving: post === undefined || (!!featuredId && media === undefined),
        };
    }, [postId, postType]);

    const fallback = deviceStyleValue(deviceType, featuredImageFallback);
    const image = featuredImage || (!isResolving && fallback?.image);

    if (!image) {
        return null;
    }

    const selector = `.${elementId}:not(.background-animated), .${elementId}.background-animated > .guten-background-animated .animated-layer, .${elementId}.empty-container`;

    console.log('RENDER ULANG');

    return <style>{`${selector} { background-image: url(${JSON.stringify(image)}) !important; }`}</style>;
};

const FeaturedImageBackground = (props) => {
    const { attributes, deviceType } = props;
    const { useFeaturedFallback, background = {} } = attributes;

    if (!useFeaturedFallback || background.type !== 'default' || !background.useFeaturedImage?.[deviceType]) {
        return null;
    }

    // Recreate the style and data subscription when switching the editor canvas mode.
    return <FeaturedImageBackgroundStyle key={props.renderingMode} {...props} />;
};

const areFeaturedImageBackgroundPropsEqual = (previous, next) => {
    const previousAttributes = previous.attributes;
    const nextAttributes = next.attributes;

    console.log('areFeaturedImageBackgroundPropsEqual-=');

    return previous.deviceType === next.deviceType &&
        previous.renderingMode === next.renderingMode &&
        previous.context?.postId === next.context?.postId &&
        previous.context?.postType === next.context?.postType &&
        previousAttributes.elementId === nextAttributes.elementId &&
        previousAttributes.useFeaturedFallback === nextAttributes.useFeaturedFallback &&
        previousAttributes.featuredImageFallback === nextAttributes.featuredImageFallback &&
        previousAttributes.background?.type === nextAttributes.background?.type &&
        previousAttributes.background?.useFeaturedImage?.[previous.deviceType] === nextAttributes.background?.useFeaturedImage?.[next.deviceType];
};

export default memo(FeaturedImageBackground, areFeaturedImageBackgroundPropsEqual);
