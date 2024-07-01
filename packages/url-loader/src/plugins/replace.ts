import { z } from "zod";
import type { ImageOptions } from "../types/image.js";
import type { TransformationPlugin } from "../types/plugins.js";

export const replaceProps = {
  replace: z
    .union([
      z.array(z.string()),
      z.array(z.boolean()),
      z.object({
        to: z.string(),
        from: z.string(),
        preserveGeometry: z.boolean().optional(),
      }),
    ])
    .describe(
      JSON.stringify({
        text: "Uses generative AI to replace parts of your image with something else.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_gen_replace",
      })
    )
    .optional(),
};

export const replacePlugin = {
  props: replaceProps,
  assetTypes: ["image", "images"],
  plugin: ({ cldAsset, options }) => {
    const { replace = null } = options;

    if (replace) {
      let from: string,
        to: string,
        preserveGeometry: boolean = false;

      if (Array.isArray(replace)) {
        from = replace[0] as string;
        to = replace[1] as string;
        preserveGeometry = (replace[2] as boolean) || false;
      } else {
        from = replace.from;
        to = replace.to;
        preserveGeometry = replace.preserveGeometry || false;
      }

      const properties = [`e_gen_replace:from_${from}`, `to_${to}`];

      // This property defaults to false, so we only need to pass it if it's true
      if (preserveGeometry) {
        properties.push(`preserve-geometry_${preserveGeometry}`);
      }

      cldAsset.effect(properties.join(";"));
    }

    return {};
  },
} satisfies TransformationPlugin<ImageOptions>;
