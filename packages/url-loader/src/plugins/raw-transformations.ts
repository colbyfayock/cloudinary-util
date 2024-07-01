import { z } from "zod";
import type { TransformationPlugin } from "../types/plugins.js";

const RawTransformationSchema = z.string();
type RawTransformation = z.infer<typeof RawTransformationSchema>;

export const rawTransformationsProps = {
  rawTransformations: z
    .union([RawTransformationSchema, z.array(RawTransformationSchema)])
    .describe(
      JSON.stringify({
        text: "Array of transformation parameters using the Cloudinary URL API to apply to an asset.",
        url: "https://cloudinary.com/documentation/transformation_reference",
      })
    )
    .optional(),
};

export const rawTransformationsPlugin = {
  props: rawTransformationsProps,
  assetTypes: ["image", "images", "video", "videos"],
  plugin: ({ cldAsset, options }) => {
    let { rawTransformations = [] } = options;

    if (!Array.isArray(rawTransformations)) {
      rawTransformations = [rawTransformations];
    }

    rawTransformations.forEach((transformation: RawTransformation) => {
      cldAsset.addTransformation(transformation);
    });

    return {};
  },
} satisfies TransformationPlugin;
