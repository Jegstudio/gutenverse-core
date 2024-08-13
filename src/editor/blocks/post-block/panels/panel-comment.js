import { __ } from "@wordpress/i18n";
import {
	ColorControl,
	DimensionControl,
	RangeControl,
} from "gutenverse-core/controls";
import { handleColor, handleDimension } from "gutenverse-core/styling";

export const commentPanel = (props) => {
	const { elementId } = props;

	return [
		{
			id: "commentColor",
			label: __("Text color", "gutenverse"),
			component: ColorControl,
			style: [
				{
					selector: `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-comment a`,
					render: (value) => handleColor(value, "color"),
				},
			],
		},
		{
			id: "commentSize",
			label: __("Size", "gutenverse"),
			component: RangeControl,
			min: 1,
			max: 100,
			step: 1,
			allowDeviceControl: true,
			unit: "px",
			style: [
				{
					selector: `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-comment a`,
					render: (value) => `font-size: ${value}px;`,
				},
			],
		},
		{
			id: "commentSpacing",
			label: __("Spacing", "gutenverse"),
			component: RangeControl,
			min: 1,
			max: 100,
			step: 1,
			allowDeviceControl: true,
			unit: "px",
			style: [
				{
					selector: `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-comment.icon-position-before span`,
					render: (value) => `margin-left: ${value}px;`,
				},
				{
					selector: `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-comment.icon-position-after span`,
					render: (value) => `margin-right: ${value}px;`,
				},
			],
		},
		{
			id: "commentMargin",
			label: __("Margin", "gutenverse"),
			component: DimensionControl,
			position: ["top", "right", "bottom", "left"],
			allowDeviceControl: true,
			units: {
				px: {
					text: "px",
					unit: "px",
				},
				em: {
					text: "em",
					unit: "em",
				},
				percent: {
					text: "%",
					unit: "%",
				},
			},
			style: [
				{
					selector: `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-comment`,
					render: (value) => handleDimension(value, "margin"),
				},
			],
		},
		{
			id: "commentPadding",
			label: __("Padding", "gutenverse"),
			component: DimensionControl,
			position: ["top", "right", "bottom", "left"],
			allowDeviceControl: true,
			units: {
				px: {
					text: "px",
					unit: "px",
				},
				em: {
					text: "em",
					unit: "em",
				},
				percent: {
					text: "%",
					unit: "%",
				},
			},
			style: [
				{
					selector: `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-comment`,
					render: (value) => handleDimension(value, "margin"),
				},
			],
		},
	];
};
