import { z } from "zod";

/** enum */

export const cropModesEnum = z.enum([
  "auto",
  "fill",
  "lfill",
  "fill_pad",
  "crop",
  "thumb",
  "scale",
  "fit",
  "limit",
  "mfit",
  "pad",
  "lpad",
  "mpad",
  "imagga_scale",
  "imagga_crop",
]);

export const flagsEnum = z.enum([
  "animated",
  "any_format",
  "apng",
  "attachment",
  "awebp",
  "clip",
  "clip_evenodd",
  "cutter",
  "force_icc",
  "force_strip",
  "getinfo",
  "group4",
  "hlsv3",
  "ignore_aspect_ratio",
  "ignore_mask_channels",
  "immutable_cache",
  "keep_attribution",
  "keep_dar",
  "keep_iptc",
  "layer_apply",
  "lossy",
  "mono",
  "no_overflow",
  "no_stream",
  "png8_fl_png24_fl_png32",
  "preserve_transparency",
  "progressive",
  "rasterize",
  "region_relative",
  "relative",
  "replace_image",
  "sanitize",
  "splice",
  "streaming_attachment",
  "strip_profile",
  "text_disallow_overflow",
  "text_no_trim",
  "tiff8_lzw",
  "tiled",
  "truncate_ts",
  "waveform",
]);

/** Angle - a */

export const angle = {
  qualifier: "a",
  schema: z.union([z.string(), z.number()]).describe(
    JSON.stringify({
      text: "Rotates or flips an asset by the specified number of degrees or automatically according to its orientation or available metadata.",
      url: "https://cloudinary.com/documentation/transformation_reference#a_angle",
    }),
  ),
};

/** Aspect Ratio */

export const aspectRatioModesEnum = z.enum([
  "vflip",
  "hflip",
  "ignore",
  "auto_right",
  "auto_left",
]);

const aspectRatioSchema = z.union([
  z.number(),
  aspectRatioModesEnum,
  z.string(),
]);

export const aspectRatio = {
  qualifier: "ar",
  schema: aspectRatioSchema.describe(
    JSON.stringify({
      text: "Crops or resizes the asset to a new aspect ratio.",
      url: "https://cloudinary.com/documentation/transformation_reference#ar_aspect_ratio",
    }),
  ),
};

/** Crop */

const cropSchema = cropModesEnum;

export const crop = {
  qualifier: "c",
  schema: cropSchema.describe(
    JSON.stringify({
      text: "Mode to use when cropping an asset.",
      url: "https://cloudinary.com/documentation/transformation_reference#c_crop_resize",
    }),
  ),
};

/** Flags */

export const flags = {
  qualifier: "fl",
  schema: z.union([flagsEnum, z.array(flagsEnum)]).describe(
    JSON.stringify({
      text: "Alters the regular behavior of another transformation or the overall delivery behavior.",
      url: "https://cloudinary.com/documentation/transformation_reference#fl_flag",
    }),
  ),
};

/** Format */

export const format = {
  qualifier: "f",
  // @TODO: enum
  schema: z.string().describe(
    JSON.stringify({
      text: "Converts (if necessary) and delivers an asset in the specified format regardless of the file extension used in the delivery URL.",
      url: "https://cloudinary.com/documentation/transformation_reference#f_format",
    }),
  ),
};

/** Gravity */

const gravitySchema = z.string();

export const gravity = {
  qualifier: "g",
  schema: gravitySchema.describe(
    JSON.stringify({
      text: "Determines which part of an asset to focus on. Note: Default of auto is applied for supported crop modes only.",
      url: "https://cloudinary.com/documentation/transformation_reference#g_gravity",
    }),
  ),
};

/** Height */

const heightSchema = z.union([z.number(), z.string()]);

export const height = {
  qualifier: "h",
  schema: heightSchema.describe(
    JSON.stringify({
      text: "A qualifier that determines the height of a transformed asset or an overlay.",
      url: "https://cloudinary.com/documentation/transformation_reference#h_height",
    }),
  ),
};

/** Width */

const widthSchema = z.union([z.number(), z.string()]);

export const width = {
  qualifier: "w",
  schema: widthSchema.describe(
    JSON.stringify({
      text: "A qualifier that sets the desired width of an asset using a specified value, or automatically based on the available width.",
      url: "https://cloudinary.com/documentation/transformation_reference#w_width",
    }),
  ),
};

/** X */

export const x = {
  qualifier: "x",
  schema: z.union([z.string(), z.number()]).describe(
    JSON.stringify({
      text: "Adjusts the starting location or offset of the x axis.",
      url: "https://cloudinary.com/documentation/transformation_reference#x_y_coordinates",
    }),
  ),
};

/** Y */

export const y = {
  qualifier: "y",
  schema: z.union([z.string(), z.number()]).describe(
    JSON.stringify({
      text: "Adjusts the starting location or offset of the y axis.",
      url: "https://cloudinary.com/documentation/transformation_reference#x_y_coordinates",
    }),
  ),
};

/** Zoom */

const zoomSchema = z.string();

export const zoom = {
  schema: zoomSchema.describe(
    JSON.stringify({
      text: "Controls how close to crop to the detected coordinates when using face-detection, custom-coordinate, or object-specific gravity.",
      url: "https://cloudinary.com/documentation/transformation_reference#z_zoom",
    }),
  ),
};
