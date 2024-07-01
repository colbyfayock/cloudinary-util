import { z } from "zod";
import type { ImageOptions } from "../types/image.js";
import type { TransformationPlugin } from "../types/plugins.js";

export const sanitizeProps = {
  sanitize: z
    .boolean()
    .describe(
      JSON.stringify({
        text: "Runs a sanitizer on SVG images.",
        url: "https://cloudinary.com/documentation/transformation_reference#fl_sanitize",
      })
    )
    .optional(),
};

export const sanitizePlugin = {
  props: sanitizeProps,
  assetTypes: ["image", "images"],
  plugin: ({ cldAsset, options }) => {
    const { sanitize = true } = options;

    const shouldApplySanitizer: boolean =
      sanitize &&
      (options.format === "svg" || cldAsset.publicID.endsWith(".svg"));

    if (shouldApplySanitizer) {
      cldAsset.effect("fl_sanitize");
    }

    return {};
  },
} satisfies TransformationPlugin<ImageOptions>;
