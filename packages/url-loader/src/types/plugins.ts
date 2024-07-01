import { z } from "zod";
import {
  aspectRatio,
  crop,
  format,
  gravity,
  height,
  width,
  zoom,
} from "../constants/parameters.js";
import type { AssetOptions } from "./asset.js";
import type { ImageOptions } from "./image.js";
import type { VideoOptions } from "./video.js";

type AllOptions = AssetOptions | ImageOptions | VideoOptions;

export interface PluginSettings<Options extends AllOptions = AllOptions> {
  cldAsset: any;
  options: Options;
}

export type PluginFunction<Options extends AllOptions = AllOptions> = (
  settings: PluginSettings<Options>
) => PluginResults;

export type AssetType = "image" | "images" | "video" | "videos";

export interface TransformationPlugin<Options extends AllOptions = AllOptions> {
  assetTypes: Array<AssetType>;
  plugin: PluginFunction<Options>;
  strict?: boolean;
  props: object;
}

export const pluginOptionsSchema = z.object({
  aspectRatio: aspectRatio.schema.optional(),
  crop: crop.schema.optional(),
  gravity: gravity.schema.optional(),
  height: height.schema.optional(),
  format: format.schema.optional(),
  resize: z.string().optional(),
  width: width.schema.optional(),
  zoom: zoom.schema.optional(),
});

export type PluginOptions = z.infer<typeof pluginOptionsSchema>;

export interface PluginResults {
  options?: PluginOptions;
}
