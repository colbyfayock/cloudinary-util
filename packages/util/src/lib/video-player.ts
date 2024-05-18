import { CloudinaryVideoPlayerOptionsLogo, CloudinaryVideoPlayerOptions } from '@cloudinary-util/types';
import { parseUrl } from './cloudinary';
import { getCloudinaryConfig } from './config';

// Also for the player there are basic JS stuff that can be shared that are framework agnostic I think like:

// Check if the publicId passed is an URL
// Set the default transformation for the player
// set the playerId
// Set the player class name
// set the basic event listeners (onError, loadedData, loadedmetadata, pause, play, ended)


// Pull in autoPlay normalization via: cloudinary-community/next-cloudinary#350

export type GetVideoPlayerOptions = Omit<CloudinaryVideoPlayerOptions, "cloud_name" | "autoplayMode" | "publicId" | "secure" | "showLogo" | "logoImageUrl" | "logoOnclickUrl"> & {
  // @TODO - currently defined in url-loader
  config?: any;
  logo?: boolean | GetVideoPlayerOptionsLogo;
  poster?: string; // @TODO - GetCldImageUrlOptions | GetCldVideoUrlOptions;
  src: string;
  quality?: string | number;
}

export interface GetVideoPlayerOptionsLogo {
  imageUrl?: CloudinaryVideoPlayerOptionsLogo['logoImageUrl'];
  logo?: boolean;
  onClickUrl?: CloudinaryVideoPlayerOptionsLogo['logoOnclickUrl'];
}

export function getVideoPlayerOptions(options: GetVideoPlayerOptions) {
  const {
    autoplay,
    colors,
    config,
    controls = true,
    fontFace,
    height,
    language,
    languages,
    logo = true,
    loop = false,
    muted = false,
    poster,
    src,
    sourceTypes,
    transformation,
    quality = 'auto',
    width,
    ...otherCldVidPlayerOptions
  } = options;

  const playerTransformations = Array.isArray(transformation) ? transformation : [transformation];
  let publicId: string = src || "";

  // If the publicId/src is a URL, attempt to parse it as a Cloudinary URL
  // to get the public ID alone

  if ( publicId.startsWith('http') ) {
    try {
      const parts = parseUrl(src);
      if ( typeof parts?.publicId === 'string' ) {
        publicId = parts?.publicId;
      }
    } catch(e) {}
  }

  playerTransformations.unshift({
    quality
  });

  let logoOptions: CloudinaryVideoPlayerOptionsLogo = {};

  if ( typeof logo === 'boolean' ) {
    logoOptions.showLogo = logo;
  } else if ( typeof logo === 'object' ) {
    logoOptions = {
      ...logoOptions,
      showLogo: true,
      logoImageUrl: logo.imageUrl,
      logoOnclickUrl: logo.onClickUrl
    }
  }

  // Parse the value passed to 'autoplay';
  // if its a boolean or a boolean passed as string ("true") set it directly to browser standard prop autoplay else fallback to default;
  // if its a string and not a boolean passed as string ("true") set it to cloudinary video player autoplayMode prop else fallback to undefined;

  let autoPlayValue: boolean | 'true' | 'false' = false;
  let autoplayModeValue: string | undefined = undefined;

  if (typeof autoplay === 'boolean' || autoplay === 'true' || autoplay === 'false') {
    autoPlayValue = autoplay
  }

  if (typeof autoplay === 'string' && autoplay !== 'true' && autoplay !== 'false') {
    autoplayModeValue = autoplay;
  }

  const cloudinaryConfig = getCloudinaryConfig(config);
  const { cloudName } = cloudinaryConfig?.cloud;
  const { secureDistribution, privateCdn } = cloudinaryConfig?.url;

  let playerOptions: CloudinaryVideoPlayerOptions = {
    cloud_name: cloudName,
    privateCdn,
    secureDistribution,

    autoplayMode: autoplayModeValue,
    autoplay: autoPlayValue,
    controls,
    fontFace: fontFace || '',
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
    ...otherCldVidPlayerOptions
  };

  if ( Array.isArray(sourceTypes) ) {
    playerOptions.sourceTypes = sourceTypes;
  }

  if ( typeof colors === 'object' ) {
    playerOptions.colors = colors;
  }

  if ( typeof poster === 'string' ) {
    // If poster is a string, assume it's either a public ID
    // or a remote URL, in either case pass to `publicId`
    playerOptions.posterOptions = {
      publicId: poster
    };
  }
  
  // @TODO

  // } else if ( typeof poster === 'object' ) {
  //   // If poster is an object, we can either customize the
  //   // automatically generated image from the video or generate
  //   // a completely new image from a separate public ID, so look
  //   // to see if the src is explicitly set to determine whether
  //   // or not to use the video's ID or just pass things along
    
  //   // if ( typeof poster.src !== 'string' ) {
  //   //   playerOptions.posterOptions = {
  //   //     publicId: getCldVideoUrl({
  //   //       ...poster,
  //   //       src: publicId,
  //   //       format: 'auto:image',
  //   //     })
  //   //   };
  //   // } else {
  //   //   playerOptions.posterOptions = {
  //   //     publicId: getCldImageUrl(poster)
  //   //   };
  //   // }
  // }

  return playerOptions;
}