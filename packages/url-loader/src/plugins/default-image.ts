import { z } from "zod";

import { getFormat } from "@cloudinary-util/util";
import type { ImageOptions } from "../types/image.js";
import type { TransformationPlugin } from "../types/plugins.js";

export const defaultImageProps = {
  defaultImage: z
    .string()
    .describe(
      JSON.stringify({
        text: "Configures the default image to use in case the given public ID is not available. Must include file extension.",
        url: "https://cloudinary.com/documentation/transformation_reference#d_default_image",
      }),
    )
    .optional(),
};

export const defaultImagePlugin = {
  props: defaultImageProps,
  assetTypes: ["image", "images"],
  plugin: (settings) => {
    const { cldAsset, options } = settings;
    const { defaultImage } = options;

    if (typeof defaultImage === "string") {
      if (!getFormat(defaultImage)) {
        console.warn(
          `The defaultImage prop may be missing a format and must include it along with the public ID. (Ex: myimage.jpg)`,
        );
      }
      const defaultImageId = defaultImage.replace(/\//g, ":");
      cldAsset.addTransformation(`d_${defaultImageId}`);
    }

    return {};
  },
} satisfies TransformationPlugin<ImageOptions>;
