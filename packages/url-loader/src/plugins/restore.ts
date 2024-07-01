import { z } from "zod";
import type { ImageOptions } from "../types/image.js";
import type { TransformationPlugin } from "../types/plugins.js";

export const restoreProps = {
  restore: z
    .boolean()
    .describe(
      JSON.stringify({
        text: "Uses generative AI to restore details in poor quality images or images that may have become degraded through repeated processing and compression.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_gen_restore",
      })
    )
    .optional(),
};

export const restorePlugin = {
  props: restoreProps,
  assetTypes: ["image", "images"],
  plugin: ({ cldAsset, options }) => {
    const { restore = false } = options;

    if (restore) {
      cldAsset.effect("e_gen_restore");
    }

    return {};
  },
} satisfies TransformationPlugin<ImageOptions>;
