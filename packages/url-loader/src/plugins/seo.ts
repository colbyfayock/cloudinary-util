import { z } from "zod";
import type { TransformationPlugin } from "../types/plugins.js";

export const seoProps = {
  seoSuffix: z
    .string()
    .describe(
      JSON.stringify({
        text: "Configures the URL to include an SEO-friendly suffix in the URL",
        url: "https://cloudinary.com/documentation/advanced_url_delivery_options#seo_friendly_media_asset_urls",
      })
    )
    .optional(),
};

export const seoPlugin = {
  props: seoProps,
  assetTypes: ["image", "images", "video", "videos"],
  plugin: ({ cldAsset, options }) => {
    const { seoSuffix } = options;

    if (typeof seoSuffix === "string") {
      if (options.deliveryType === "fetch") {
        console.warn(
          "SEO suffix is not supported with a delivery type of fetch"
        );
      } else {
        cldAsset.setSuffix(seoSuffix);
      }
    }

    return {};
  },
} satisfies TransformationPlugin;
