// Sourced from: https://cloudinary.com/documentation/upload_widget_reference

type CustomURL = `https://${string}.${string}`;

export interface CloudinaryUploadWidgetOptions {
  // Widget

  encryption?: {
    key: string;
    iv: string;
  };
  defaultSource?: string;
  maxFiles?: number;
  multiple?: boolean;
  sources?: Array<
    | "camera"
    | "dropbox"
    | "facebook"
    | "gettyimages"
    | "google_drive"
    | "image_search"
    | "instagram"
    | "istock"
    | "local"
    | "shutterstock"
    | "unsplash"
    | "url"
  >;

  // Cropping

  cropping?: boolean;
  croppingAspectRatio?: number;
  croppingCoordinatesMode?: string;
  croppingDefaultSelectionRatio?: number;
  croppingShowBackButton?: boolean;
  croppingShowDimensions?: boolean;
  showSkipCropButton?: boolean;

  // Sources

  dropboxAppKey?: string;
  facebookAppId?: string;
  googleApiKey?: string;
  googleDriveClientId?: string;
  instagramClientId?: string;
  searchByRights?: boolean;
  searchBySites?: Array<string>;

  // Upload

  context?: object;
  folder?: string;
  publicId?: string;
  resourceType?: string;
  tags?: Array<string>;
  uploadSignature?: string | Function;
  uploadSignatureTimestamp?: number;

  // Client Side

  clientAllowedFormats?: Array<string>;
  croppingValidateDimensions?: boolean;
  maxChunkSize?: number;
  maxImageFileSize?: number;
  maxImageHeight?: number;
  maxImageWidth?: number;
  maxFileSize?: number;
  maxRawFileSize?: number;
  maxVideoFileSize?: number;
  minImageHeight?: number;
  minImageWidth?: number;
  validateMaxWidthHeight?: boolean;

  // Containing Page

  fieldName?: string;
  form?: string;
  thumbnails?: string;
  thumbnailTransformation?: string | Array<object>;

  // Customization

  buttonCaption?: string;
  buttonClass?: string;
  text?: object;
  theme?: string;
  styles?: object;

  // Advanced

  autoMinimize?: boolean;
  detection?: string;
  getTags?: Function;
  getUploadPresets?: Function;
  inlineContainer?: any; // string or DOM element
  language?: string;
  on_success?: string;
  preBatch?: Function;
  prepareUploadParams?: Function;
  queueViewPosition?: string;
  showAdvancedOptions?: boolean;
  showCompletedButton?: boolean;
  showInsecurePreview?: boolean;
  showPoweredBy?: boolean;
  showUploadMoreButton?: boolean;
  singleUploadAutoClose?: boolean;
}

// Results

export interface CloudinaryUploadWidgetResults {
  event?: string;
  info?: string | CloudinaryUploadWidgetInfo;
}

export interface CloudinaryUploadWidgetInfo {
  access_mode: "public" | "authenticated";
  api_key: string;
  asset_id: string;
  batchId: string;
  bytes: number;
  context: Record<string, Record<string, string>>;
  created_at: string;
  etag: string;
  folder: string;
  format: string;
  height: number;
  hook_execution: Record<string, unknown>;
  id: string;
  info: Record<string, unknown>;
  original_filename: string;
  pages: number;
  path: string;
  placeholder: boolean;
  public_id: string;
  resource_type: "image" | "raw" | "video" | "auto";
  secure_url: string;
  signature: string;
  tags: string[];
  thumbnail_url: string;
  type: "upload" | "private" | "authenticated";
  url: string;
  version: number;
  width: number;
  [key: string]: unknown;
}

// Instance Methods

export interface CloudinaryUploadWidgetInstanceMethods {
  close: (options?: CloudinaryUploadWidgetInstanceMethodCloseOptions) => void;
  destroy: (
    options?: CloudinaryUploadWidgetInstanceMethodDestroyOptions
  ) => Promise<void>;
  hide: () => void;
  isDestroyed: () => boolean;
  isMinimized: () => boolean;
  isShowing: () => boolean;
  minimize: () => void;
  open: (
    widgetSource?: CloudinaryUploadWidgetSources,
    options?: CloudinaryUploadWidgetInstanceMethodOpenOptions
  ) => void;
  show: () => void;
  update: (options: CloudinaryUploadWidgetInstanceMethodUpdateOptions) => void;
}

export type CloudinaryUploadWidgetInstanceMethodCloseOptions = {
  quiet: boolean;
};

export type CloudinaryUploadWidgetInstanceMethodDestroyOptions = {
  removeThumbnails: boolean;
};

export type CloudinaryUploadWidgetInstanceMethodOpenOptions = {
  files: CustomURL[];
};

export type CloudinaryUploadWidgetInstanceMethodUpdateOptions = Omit<
  CloudinaryUploadWidgetOptions,
  | "secure"
  | "uploadSignature"
  | "getTags"
  | "preBatch"
  | "inlineContainer"
  | "fieldName"
> & {
  cloudName: string;
  uploadPreset: string;
};

export type CloudinaryUploadWidgetSources =
  | "local"
  | "url"
  | "camera"
  | "image_search"
  | "google_drive"
  | "dropbox"
  | "facebook"
  | "instagram"
  | "shutterstock"
  | "getty"
  | "istock"
  | "unsplash"
  | null;

// Errors

export type CloudinaryUploadWidgetError =
  | {
      status: string;
      statusText: string;
    }
  | string
  | null;
