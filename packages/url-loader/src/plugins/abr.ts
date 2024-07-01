import { z } from "zod";
import type { TransformationPlugin } from "../types/plugins.js";
import type { VideoOptions } from "../types/video.js";

export const abrProps = {
  streamingProfile: z
    .string()
    .describe(
      JSON.stringify({
        text: "The streaming profile to apply when delivering a video using adaptive bitrate streaming.",
        url: "https://cloudinary.com/documentation/transformation_reference#sp_streaming_profile",
      })
    )
    .optional(),
};

export const abrPlugin = {
  props: abrProps,
  assetTypes: ["video", "videos"],
  plugin: (settings) => {
    const { cldAsset, options } = settings;
    const { streamingProfile } = options;

    if (typeof streamingProfile === "string") {
      cldAsset.addTransformation(`sp_${streamingProfile}`);
    }

    return {};
  },
} satisfies TransformationPlugin<VideoOptions>;
