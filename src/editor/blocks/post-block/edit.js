import { compose } from "@wordpress/compose";
import { useEffect, useState, useRef, RawHTML } from "@wordpress/element";
import {
	withCustomStyle,
	withMouseMoveEffect,
	withCopyElementToolbar,
} from "gutenverse-core/hoc";
import { useBlockProps } from "@wordpress/block-editor";
import { classnames, PostSkeleton, u } from "gutenverse-core/components";
import { PanelController } from "gutenverse-core/controls";
import { panelList } from "./panels/panel-list";
import apiFetch from "@wordpress/api-fetch";
import { addQueryArgs } from "@wordpress/url";
import { useAnimationEditor, useDisplayEditor } from "gutenverse-core/hooks";

const PostBlockBlock = compose(
	withCustomStyle(panelList),
	withCopyElementToolbar(),
	withMouseMoveEffect,
)((props) => {
	const { attributes, deviceType, setElementRef } = props;

	const {
		elementId,
		inheritQuery,
		postType,
		postOffset,
		numberPost,
		column,
		breakpoint,
		includePost,
		excludePost,
		includeCategory,
		excludeCategory,
		includeAuthor,
		includeTag,
		excludeTag,
		sortBy,
		htmlTag,
		categoryEnabled,
		categoryPosition,
		excerptEnabled,
		excerptLength,
		excerptMore,
		readmoreEnabled,
		readmoreIcon,
		readmoreIconPosition,
		readmoreText,
		commentEnabled,
		commentIcon,
		commentIconPosition,
		metaEnabled,
		metaAuthorEnabled,
		metaAuthorByText,
		metaAuthorIcon,
		metaAuthorIconPosition,
		metaDateEnabled,
		metaDateType,
		metaDateFormat,
		metaDateFormatCustom,
		metaDateIcon,
		metaDateIconPosition,
		postblockType,
		paginationMode,
		paginationLoadmoreText,
		paginationLoadingText,
		paginationNumberPost,
		paginationScrollLimit,
		paginationIcon,
		paginationIconPosition,
	} = attributes;

	const animationClass = useAnimationEditor(attributes);
	const displayClass = useDisplayEditor(attributes);
	const [response, setResponse] = useState(null);
	const [loading, setLoading] = useState(true);
	const [postLoaded, setPostLoaded] = useState(0);
	const postBlockRef = useRef();

	useEffect(() => {
		if (postBlockRef.current) {
			setElementRef(postBlockRef.current);
		}
	}, [postBlockRef]);

	useEffect(() => {
		setPostLoaded(parseInt(numberPost));
	}, [numberPost]);

	useEffect(() => {
		if (postLoaded) {
			u(postBlockRef.current)
				.find(".guten-block-loadmore")
				.on("click", () => {
					setPostLoaded(postLoaded + parseInt(paginationNumberPost));
				});
		}
	}, [response]);

	useEffect(() => {
		setLoading(true);

		elementId &&
			apiFetch({
				path: addQueryArgs(
					"/wp/v2/block-renderer/gutenverse/post-block",
					{
						context: "edit",
						attributes: {
							elementId,
							inheritQuery,
							postType,
							postOffset,
							numberPost:
								parseInt(postLoaded) === parseInt(numberPost)
									? numberPost
									: postLoaded,
							breakpoint,
							includePost,
							excludePost,
							includeCategory,
							excludeCategory,
							includeAuthor,
							includeTag,
							excludeTag,
							sortBy,
							htmlTag,
							categoryEnabled,
							categoryPosition,
							excerptEnabled,
							excerptLength,
							excerptMore,
							readmoreEnabled,
							readmoreIcon,
							readmoreIconPosition,
							readmoreText,
							commentEnabled,
							commentIcon,
							commentIconPosition,
							metaEnabled,
							metaAuthorEnabled,
							metaAuthorByText,
							metaAuthorIcon,
							metaAuthorIconPosition,
							metaDateEnabled,
							metaDateType,
							metaDateFormat,
							metaDateFormatCustom,
							metaDateIcon,
							metaDateIconPosition,
							postblockType,
							paginationMode,
							paginationLoadmoreText,
							paginationLoadingText,
							paginationNumberPost,
							paginationScrollLimit,
							paginationIcon,
							paginationIconPosition,
						},
					},
				),
			})
				.then((data) => {
					setResponse(data.rendered);
				})
				.catch(() => {
					setResponse("<span>Error</span>");
				})
				.finally(() => setLoading(false));
	}, [
		elementId,
		postType,
		postOffset,
		postLoaded,
		breakpoint,
		includePost,
		excludePost,
		includeCategory,
		excludeCategory,
		includeAuthor,
		includeTag,
		excludeTag,
		sortBy,
		htmlTag,
		categoryEnabled,
		categoryPosition,
		excerptEnabled,
		excerptLength,
		excerptMore,
		readmoreEnabled,
		readmoreIcon,
		readmoreIconPosition,
		readmoreText,
		commentEnabled,
		commentIcon,
		commentIconPosition,
		metaEnabled,
		metaAuthorEnabled,
		metaAuthorByText,
		metaAuthorIcon,
		metaAuthorIconPosition,
		metaDateEnabled,
		metaDateType,
		metaDateFormat,
		metaDateFormatCustom,
		metaDateIcon,
		metaDateIconPosition,
		postblockType,
		paginationMode,
		paginationLoadmoreText,
		paginationLoadingText,
		paginationNumberPost,
		paginationScrollLimit,
		paginationIcon,
		paginationIconPosition,
	]);

	const blockProps = useBlockProps({
		className: classnames(
			"guten-element",
			"guten-post-block",
			"no-margin",
			elementId,
			animationClass,
			displayClass,
			deviceType.toLowerCase(),
		),
		ref: postBlockRef,
	});

	const postSkeletonCondition = () => {
		return column[deviceType] ? (
			<PostSkeleton number={column[deviceType]} />
		) : (
			<PostSkeleton number={1} />
		);
	};

	return (
		<>
			<PanelController panelList={panelList} {...props} />
			<div {...blockProps}>
				{!loading ? (
					<RawHTML key="html" className="guten-raw-wrapper">
						{response}
					</RawHTML>
				) : (
					postSkeletonCondition()
				)}
			</div>
		</>
	);
});

export default PostBlockBlock;
