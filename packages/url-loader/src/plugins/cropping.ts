import { z } from "zod";
import * as parameters from "../constants/parameters.js";
import type { PluginResults, TransformationPlugin } from "../types/plugins.js";
import { normalizeNumberParameter } from "../lib/transformations.js";

const cropsAspectRatio = ["auto", "crop", "fill", "lfill", "fill_pad", "thumb"];
const cropsGravityAuto = ["auto", "crop", "fill", "lfill", "fill_pad", "thumb"];
const cropsWithZoom = ["crop", "thumb"];

const DEFAULT_CROP = "limit";

const cropOptionsSchema = z.object({
  aspectRatio: parameters.aspectRatio.schema.optional(),
  type: parameters.crop.schema,
  gravity: parameters.gravity.schema.optional(),
  height: parameters.height.schema.optional(),
  width: parameters.width.schema.optional(),
  zoom: parameters.zoom.schema.optional(),
  source: z.boolean().optional(),
});

type CropOptions = z.infer<typeof cropOptionsSchema>;

export const croppingProps = {
  aspectRatio: parameters.aspectRatio.schema.optional(),
  crop: z
    .union([
      parameters.crop.schema,
      cropOptionsSchema,
      z.array(cropOptionsSchema),
    ])
    .default(DEFAULT_CROP)
    .optional(),
  gravity: parameters.gravity.schema.optional(),
  zoom: parameters.zoom.schema.optional(),
};

export const croppingPlugin = {
  props: croppingProps,
  assetTypes: ["image", "images", "video", "videos"],
  plugin: (settings) => {
    const { cldAsset, options } = settings;

    let crops: Array<CropOptions> = [];

    // Normalize the data that we're working with for simpler processing

    if (
      typeof options.crop === "string" ||
      typeof options.crop === "undefined"
    ) {
      // If we have a type of string or we don't explicitly
      // have a crop set (default is limit) we're using the
      // default pattern of resizing/cropping after all
      // of the transformations

      crops.push({
        aspectRatio: options.aspectRatio,
        width: options.width,
        height: options.height,
        gravity: options.gravity,
        type: options.crop || DEFAULT_CROP,
        zoom: options.zoom,
      });
    } else if (
      typeof options.crop === "object" &&
      !Array.isArray(options.crop)
    ) {
      crops.push(options.crop);
    } else if (Array.isArray(options.crop)) {
      crops = options.crop;
    }

    // We always need a post-transformation to resize the image, whether that uses the
    // default crop mode of "limit" or something user set, so if we dont have anything
    // matching that criteria, push on a "default" using whatever data we can find

    if (crops.length === 1 && crops[0].source === true) {
      crops.push({
        aspectRatio: options.aspectRatio,
        width: options.width,
        height: options.height,
        gravity: options.gravity,
        type: DEFAULT_CROP,
        zoom: options.zoom,
      });
    }

    // Start working through the different crop options and determine whether they're
    // pre-transformation (source) or post-transformation (final)

    const finalTransformations: Array<Array<string>> = [];
    const sourceTransformations: Array<Array<string>> = [];

    for (const crop of crops) {
      const cropDimensions = {
        width: crop.width,
        height: crop.height,
      };

      if (
        typeof cropDimensions.width === "undefined" &&
        typeof crop.aspectRatio === "undefined"
      ) {
        cropDimensions.width = options.width;

        // We likely don't want to infer one dimension and not the other
        // so only infer the height if we're already inferring the width

        if (typeof cropDimensions.height === "undefined") {
          cropDimensions.height = options.height;
        }
      }

      const transformations = collectTransformations({
        aspectRatio: crop.aspectRatio,
        gravity: crop.gravity,
        type: crop.type || DEFAULT_CROP,
        zoom: crop.zoom,
        ...cropDimensions,
      });

      // A source of true means we want to apply the transformations
      // to the original source image

      if (transformations.length > 0) {
        if (crop.source === true) {
          sourceTransformations.push(transformations);
        } else {
          finalTransformations.push(transformations);
        }
      }
    }

    // This stage provides the option for someone to crop and resize the image before any transformations
    // are applied. this could be handy if you want a consistent size on different assets to share
    // transformations for instance

    sourceTransformations.forEach((transformation) => {
      if (transformation.length > 0) {
        cldAsset.addTransformation(transformation.join(","));
      }
    });

    // If we have any overrides, which are the the standard width/height options, apply

    const results: PluginResults = {
      options: {},
    };

    if (results.options && finalTransformations.length > 0) {
      results.options.resize = finalTransformations
        .map((transformation) => transformation.join(","))
        .join("/");
    }

    return results;
  },
} satisfies TransformationPlugin;

/**
 * CollectTransformations
 * @description Given the avialable crop options, returns an array of transformation strings
 */

function collectTransformations(collectOptions: CropOptions) {
  // Default the crop to "limit" to avoid upscaling
  // This avoid further distorting the image since the browser will resize in that case.
  // If caller wants actual resize, can explicitly pass in "scale".
  const { aspectRatio, type: crop, zoom } = collectOptions;

  // Normalize sizing parameters

  let gravity = collectOptions.gravity;
  const height = normalizeNumberParameter(collectOptions.height);
  const width = normalizeNumberParameter(collectOptions.width);

  const transformations = [];

  const hasDefinedDimensions = height || width;
  const hasValidAspectRatio = aspectRatio && cropsAspectRatio.includes(crop);

  // Only apply a crop if we're defining some type of dimension attribute
  // where the crop would make sense

  if (crop && (hasDefinedDimensions || hasValidAspectRatio)) {
    transformations.push(`c_${crop}`);
  }

  // Aspect Ratio requires a crop mode to be applied so we want to make
  // sure a valid one is included

  if (hasValidAspectRatio) {
    transformations.push(`ar_${aspectRatio}`);
  }

  if (width) {
    transformations.push(`w_${width}`);
  }

  // Some crop types don't need a height and will resize based
  // on the aspect ratio

  if (!["limit"].includes(crop) && typeof height === "number") {
    transformations.push(`h_${height}`);
  }

  // Gravity of auto only applies to certain crop types otherewise
  // errors, so default to auto only when crop matches type

  if (!gravity && cropsGravityAuto.includes(crop)) {
    gravity = "auto";
  }

  // If we have gravity, apply it, but check that the gravity passed
  // in doesn't conflict with the crop mode

  if (gravity) {
    if (gravity === "auto" && !cropsGravityAuto.includes(crop)) {
      console.warn(
        `Auto gravity can only be used with crop modes: ${cropsGravityAuto.join(
          ", "
        )}. Not applying gravity.`
      );
    } else {
      transformations.push(`g_${gravity}`);
    }
  }

  // Some zoom types don't work with some crop types

  if (zoom) {
    if (zoom === "auto" && !cropsWithZoom.includes(crop)) {
      console.warn(
        `Zoom can only be used with crop modes: ${cropsWithZoom.join(
          ", "
        )}. Not applying zoom.`
      );
    } else {
      transformations.push(`z_${zoom}`);
    }
  }

  return transformations;
}
