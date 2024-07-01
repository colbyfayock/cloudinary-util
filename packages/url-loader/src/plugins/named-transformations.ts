import { z } from "zod";
import type { TransformationPlugin } from "../types/plugins.js";

const NamedTransformationSchema = z.string();
type NamedTransformation = z.infer<typeof NamedTransformationSchema>;

export const namedTransformationsProps = {
  namedTransformations: z
    .union([NamedTransformationSchema, z.array(NamedTransformationSchema)])
    .describe(
      JSON.stringify({
        text: "Named transformations to apply to asset.",
        url: "https://cloudinary.com/documentation/image_transformations#named_transformations",
      })
    )
    .optional(),
  /**
   * @deprecated use {@link `namedTransformations`} instead
   */
  transformations: z
    .union([NamedTransformationSchema, z.array(NamedTransformationSchema)])
    .describe(
      JSON.stringify({
        text: "Deprecated: use namedTransformations instead",
        url: "https://cloudinary.com/documentation/image_transformations#named_transformations",
      })
    )
    .optional(),
};

export const namedTransformationsPlugin = {
  props: namedTransformationsProps,
  strict: true,
  assetTypes: ["image", "images", "video", "videos"],
  plugin: ({ cldAsset, options }) => {
    const { transformations, namedTransformations } = options;

    if (transformations && process.env.NODE_ENVIRONMENT === "development") {
      console.warn(
        "The transformations prop is deprecated. Please use namedTransformations instead."
      );
    }

    let _namedTransformations = namedTransformations || transformations || [];

    if (!Array.isArray(_namedTransformations)) {
      _namedTransformations = [_namedTransformations];
    }

    _namedTransformations.forEach((transformation: NamedTransformation) => {
      cldAsset.addTransformation(`t_${transformation}`);
    });

    return {};
  },
} satisfies TransformationPlugin;
