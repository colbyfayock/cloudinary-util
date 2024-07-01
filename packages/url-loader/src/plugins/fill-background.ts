import { z } from "zod";
import { crop, gravity } from "../constants/parameters.js";
import { normalizeNumberParameter } from "../lib/transformations.js";
import type { ImageOptions } from "../types/image.js";
import type { TransformationPlugin } from "../types/plugins.js";

const defaultCrop = "pad";

export const fillBackgroundProps = {
  fillBackground: z
    .union([
      z.boolean(),
      z.object({
        crop: crop.schema.optional(),
        gravity: gravity.schema.optional(),
        prompt: z.string().optional(),
      }),
    ])
    .describe(
      JSON.stringify({
        text: "Uses Generative Fill to extended padded image with AI",
        url: "https://cloudinary.com/documentation/transformation_reference#b_gen_fill",
      })
    )
    .optional(),
};

export const fillBackgroundPlugin = {
  props: fillBackgroundProps,
  assetTypes: ["image", "images"],
  plugin: (settings) => {
    const { cldAsset, options } = settings;
    const { fillBackground } = options;

    if (typeof fillBackground === "undefined") return {};

    const width = normalizeNumberParameter(options.width);
    const height = normalizeNumberParameter(options.height);
    const hasDefinedDimensions =
      typeof height === "number" && typeof width === "number";
    let aspectRatio = options.aspectRatio;

    if (!aspectRatio && hasDefinedDimensions) {
      aspectRatio = `${width}:${height}`;
    }

    if (!aspectRatio) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          `Could not determine aspect ratio based on available options to use fillBackground. Please specify width and height or an aspect ratio.`
        );
      }
      return {};
    }

    if (fillBackground === true) {
      const properties = [
        "b_gen_fill",
        `ar_${aspectRatio}`,
        `c_${defaultCrop}`,
      ];

      cldAsset.addTransformation(properties.join(","));
    } else if (typeof fillBackground === "object") {
      const { crop = defaultCrop, gravity, prompt } = fillBackground;

      const properties = [`ar_${aspectRatio}`, `c_${crop}`];

      if (typeof prompt === "string") {
        properties.unshift(`b_gen_fill:${prompt}`);
      } else {
        properties.unshift(`b_gen_fill`);
      }

      if (typeof gravity === "string") {
        properties.push(`g_${gravity}`);
      }

      cldAsset.addTransformation(properties.join(","));
    }

    return {};
  },
} satisfies TransformationPlugin<ImageOptions>;
