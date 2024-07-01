import { z } from "zod";
import type { ImageOptions } from "../types/image.js";
import type { TransformationPlugin } from "../types/plugins.js";

export const enhanceProps = {
  enhance: z
    .boolean()
    .describe(
      JSON.stringify({
        text: "Uses AI to analyze an image and make adjustments to enhance the appeal of the image.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_enhance",
      }),
    )
    .optional(),
};

export const enhancePlugin = {
  props: enhanceProps,
  assetTypes: ["image", "images"],
  plugin: (settings) => {
    const { cldAsset, options } = settings;
    const { enhance = false } = options;

    if (enhance) {
      cldAsset.effect("e_enhance");
    }

    return {};
  },
} satisfies TransformationPlugin<ImageOptions>;
