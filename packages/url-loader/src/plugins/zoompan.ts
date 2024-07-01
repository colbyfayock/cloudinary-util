import { z } from "zod";
import { effects as qualifiersEffects } from "../constants/qualifiers.js";
import type { ImageOptions } from "../types/image.js";
import type { PluginOptions, TransformationPlugin } from "../types/plugins.js";

export const zoompanProps = {
  zoompan: z
    .union([
      z.string(),
      z.boolean(),
      z.object({
        loop: qualifiersEffects.loop.schema.optional(),
        options: z.string(),
      }),
    ])
    .describe(
      JSON.stringify({
        text: "Applies zooming and/or panning to an image, resulting in a video or animated image.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_zoompan",
      }),
    )
    .optional(),
};

export const zoompanPlugin = {
  props: zoompanProps,
  assetTypes: ["image", "images"],
  plugin: ({ cldAsset, options }) => {
    const { zoompan = false } = options;

    const overrides: PluginOptions = {
      format: undefined,
    };

    if (zoompan === true) {
      cldAsset.effect("e_zoompan");
    } else if (typeof zoompan === "string") {
      if (zoompan === "loop") {
        cldAsset.effect("e_zoompan");
        cldAsset.effect("e_loop");
      } else {
        cldAsset.effect(`e_zoompan:${zoompan}`);
      }
    } else if (typeof zoompan === "object") {
      let zoompanEffect = "e_zoompan";

      if (typeof zoompan.options === "string") {
        zoompanEffect = `${zoompanEffect}:${zoompan.options}`;
      }

      cldAsset.effect(zoompanEffect);

      let loopEffect;

      if (zoompan.loop === true) {
        loopEffect = "e_loop";
      } else if (
        typeof zoompan.loop === "string" ||
        typeof zoompan.loop === "number"
      ) {
        loopEffect = `e_loop:${zoompan.loop}`;
      }

      if (loopEffect) {
        cldAsset.effect(loopEffect);
      }
    }

    if (zoompan !== false) {
      overrides.format = "auto:animated";
    }

    return {
      options: overrides,
    };
  },
} satisfies TransformationPlugin<ImageOptions>;
