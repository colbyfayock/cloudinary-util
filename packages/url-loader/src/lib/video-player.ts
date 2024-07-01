import type {
  CloudinaryVideoPlayerOptions,
  CloudinaryVideoPlayerOptionsLogo,
} from "@cloudinary-util/types";
import { parseUrl } from "@cloudinary-util/util";

import type { ConfigOptions } from "../types/config.js";
import {
  constructCloudinaryUrl,
  type ConstructUrlProps,
} from "./cloudinary.js";

/**
 * getVideoPlayerOptions
 */

export type GetVideoPlayerOptions = Omit<
  CloudinaryVideoPlayerOptions,
  | "cloud_name"
  | "autoplayMode"
  | "publicId"
  | "secure"
  | "showLogo"
  | "logoImageUrl"
  | "logoOnclickUrl"
> & {
  logo?: boolean | GetVideoPlayerOptionsLogo;
  poster?: string | ConstructUrlProps["options"];
  src: string;
  quality?: string | number;
};

export interface GetVideoPlayerOptionsLogo {
  imageUrl?: CloudinaryVideoPlayerOptionsLogo["logoImageUrl"];
  logo?: boolean;
  onClickUrl?: CloudinaryVideoPlayerOptionsLogo["logoOnclickUrl"];
}

export function getVideoPlayerOptions(
  options: GetVideoPlayerOptions,
  config: ConfigOptions
) {
  const {
    autoplay,
    controls = true,
    height,
    language,
    languages,
    logo = true,
    loop = false,
    muted = false,
    poster,
    src,
    transformation,
    quality = "auto",
    width,
    ...otherCldVidPlayerOptions
  } = options;

  // Configuration for Cloudinary account. Cloud name is required,
  // so if one isn't present, throw.

  const { cloudName } = config?.cloud || {};
  const { secureDistribution, privateCdn } = config?.url || {};

  if (!cloudName) {
    throw new Error(
      "A Cloudinary Cloud name is required, please make sure your environment variable is set and configured in your environment."
    );
  }

  // If the publicId/src is a URL, attempt to parse it as a Cloudinary URL
  // to get the public ID alone

  let publicId = src || "";

  if (publicId.startsWith("http")) {
    try {
      const parts = parseUrl(src);
      if (typeof parts?.publicId === "string") {
        publicId = parts?.publicId;
      }
    } catch (e) {
      // ignore
    }
  }

  if (!publicId) {
    throw new Error(
      "Video Player requires a src, please make sure to configure your src as a public ID or Cloudinary URL."
    );
  }

  // Normalize player transformations as an array

  const playerTransformations = Array.isArray(transformation)
    ? transformation
    : [transformation];

  // We want to apply a quality transformation which defaults
  // to auto, but we want it to be in the beginning of the
  // transformations array, in the event someone
  // has already passed some in, giving them the opportunity
  // to override if desired

  playerTransformations.unshift({
    quality,
  });

  // Provide an object configuration option for player logos

  let logoOptions: CloudinaryVideoPlayerOptionsLogo = {};

  if (typeof logo === "boolean") {
    logoOptions.showLogo = logo;
  } else if (typeof logo === "object") {
    logoOptions = {
      ...logoOptions,
      showLogo: true,
      logoImageUrl: logo.imageUrl,
      logoOnclickUrl: logo.onClickUrl,
    };
  }

  // Parse the value passed to 'autoplay';
  // if its a boolean or a boolean passed as string ("true") set it directly to browser standard prop autoplay else fallback to default;
  // if its a string and not a boolean passed as string ("true") set it to cloudinary video player autoplayMode prop else fallback to undefined;

  let autoplayValue: boolean | "true" | "false" = false;
  let autoplayModeValue: string | undefined = undefined;

  if (
    typeof autoplay === "boolean" ||
    autoplay === "true" ||
    autoplay === "false"
  ) {
    autoplayValue = autoplay;
  }

  if (
    typeof autoplay === "string" &&
    autoplay !== "true" &&
    autoplay !== "false"
  ) {
    autoplayModeValue = autoplay;
  }

  // Finally construct the Player Options object

  const playerOptions: CloudinaryVideoPlayerOptions = {
    cloud_name: cloudName,
    privateCdn,
    secureDistribution,

    autoplayMode: autoplayModeValue,
    autoplay: autoplayValue,
    controls,
    language,
    languages,
    loop,
    muted,
    publicId,
    width,
    height,
    aspectRatio: `${width}:${height}`,
    transformation: playerTransformations,
    ...logoOptions,
    ...otherCldVidPlayerOptions,
  };

  if (typeof poster === "string") {
    // If poster is a string, assume it's either a public ID
    // or a remote URL, in either case pass to `publicId`
    playerOptions.posterOptions = {
      publicId: poster,
    };
  } else if (typeof poster === "object") {
    // If poster is an object, we can either customize the
    // automatically generated image from the video or generate
    // a completely new image from a separate public ID, so look
    // to see if the src is explicitly set to determine whether
    // or not to use the video's ID or just pass things along

    if (typeof poster.src !== "string") {
      playerOptions.posterOptions = {
        publicId: constructCloudinaryUrl({
          options: {
            ...poster,
            src: publicId,
            assetType: "video",
            format: "auto:image",
          },
          config,
        }),
      };
    } else {
      playerOptions.posterOptions = {
        publicId: constructCloudinaryUrl({
          options: poster,
          config,
        }),
      };
    }
  }

  return playerOptions;
}
