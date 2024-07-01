import { convertColorHexToRgb, testColorIsHex } from "@cloudinary-util/util";
import { z } from "zod";

import type { Qualifier } from "../types/qualifiers.js";
import {
  angle,
  aspectRatio,
  crop,
  gravity,
  height,
  width,
  x,
  y,
} from "./parameters.js";

const convertersColors = [
  {
    test: testColorIsHex,
    convert: convertColorHexToRgb,
  },
];

export const primary: Record<string, Qualifier> = {
  aspectRatio,
  crop,
  gravity,
  height,
  width,
} as const;

export const position: Record<string, Qualifier> = {
  angle,
  gravity,
  x,
  y,
} as const;

export const text: Record<string, Qualifier> = {
  alignment: {
    qualifier: false,
    order: 6,
  },
  antialias: {
    qualifier: "antialias",
  },
  border: {
    qualifier: "bo",
    location: "primary",
  },
  color: {
    qualifier: "co",
    location: "primary",
    converters: convertersColors,
  },
  fontFamily: {
    qualifier: false,
    order: 1,
  },
  fontSize: {
    qualifier: false,
    order: 2,
  },
  fontStyle: {
    qualifier: false,
    order: 4,
  },
  fontWeight: {
    qualifier: false,
    order: 3,
  },
  hinting: {
    qualifier: "hinting",
  },
  letterSpacing: {
    qualifier: "letter_spacing",
  },
  lineSpacing: {
    qualifier: "line_spacing",
  },
  stroke: {
    qualifier: "self",
    order: 7,
  },
  textDecoration: {
    qualifier: false,
    order: 5,
  },
} as const;

export const effects = {
  angle,
  art: {
    prefix: "e",
    qualifier: "art",
    schema: z.string().describe(
      JSON.stringify({
        text: "Applies the selected artistic filter.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_art",
      })
    ),
  },
  autoBrightness: {
    prefix: "e",
    qualifier: "auto_brightness",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Automatically adjusts the image brightness and blends the result with the original image.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_auto_brightness",
      })
    ),
  },
  autoColor: {
    prefix: "e",
    qualifier: "auto_color",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Automatically adjusts the image color balance and blends the result with the original image.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_auto_color",
      })
    ),
  },
  autoContrast: {
    prefix: "e",
    qualifier: "auto_contrast",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Automatically adjusts the image contrast and blends the result with the original image.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_auto_contrast",
      })
    ),
  },
  assistColorblind: {
    prefix: "e",
    qualifier: "assist_colorblind",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Applies stripes or color adjustment to help people with common color blind conditions to differentiate between colors that are similar for them.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_assist_colorblind",
      })
    ),
  },
  background: {
    qualifier: "b",
    schema: z.string().describe(
      JSON.stringify({
        text: "Applies a background to empty or transparent areas.",
        url: "https://cloudinary.com/documentation/transformation_reference#b_background",
      })
    ),
  },
  blackwhite: {
    prefix: "e",
    qualifier: "blackwhite",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Converts an image to black and white.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_blackwhite",
      })
    ),
  },
  blur: {
    prefix: "e",
    qualifier: "blur",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Applies a blurring filter to an asset.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_blur",
      })
    ),
  },
  blurFaces: {
    prefix: "e",
    qualifier: "blur_faces",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Blurs all detected faces in an image.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_blur_faces",
      })
    ),
  },
  blurRegion: {
    prefix: "e",
    qualifier: "blur_region",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Applies a blurring filter to the region of an image specified by x, y, width and height, or an area of text. If no region is specified, the whole image is blurred.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_blur_region",
      })
    ),
  },
  border: {
    qualifier: "bo",
    schema: z.string().describe(
      JSON.stringify({
        text: "Adds a solid border around an image or video.",
        url: "https://cloudinary.com/documentation/transformation_reference#bo_border",
      })
    ),
  },
  brightness: {
    prefix: "e",
    qualifier: "brightness",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Adjusts the image or video brightness.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_brightness",
      })
    ),
  },
  brightnessHSB: {
    prefix: "e",
    qualifier: "brightness_hsb",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Adjusts image brightness modulation in HSB to prevent artifacts in some images.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_brightness_hsb",
      })
    ),
  },
  cartoonify: {
    prefix: "e",
    qualifier: "cartoonify",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Applies a cartoon effect to an image.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_cartoonify",
      })
    ),
  },
  color: {
    qualifier: "co",
    schema: z.string().describe(
      JSON.stringify({
        text: "A qualifier that specifies the color to use with the corresponding transformation.",
        url: "https://cloudinary.com/documentation/transformation_reference#co_color",
      })
    ),
    converters: convertersColors,
  },
  colorize: {
    prefix: "e",
    qualifier: "colorize",
    schema: z.string().describe(
      JSON.stringify({
        text: "Colorizes an image. By default, gray is used for colorization. You can specify a different color using the color qualifier.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_colorize",
      })
    ),
  },
  contrast: {
    prefix: "e",
    qualifier: "contrast",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Adjusts an image or video contrast.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_contrast",
      })
    ),
  },
  displace: {
    prefix: "e",
    qualifier: "distort",
    schema: z.string().describe(
      JSON.stringify({
        text: "Displaces the pixels in an image according to the color channels of the pixels in another specified image (a gradient map specified with the overlay parameter).",
        url: "https://cloudinary.com/documentation/transformation_reference#e_displace",
      })
    ),
  },
  distort: {
    prefix: "e",
    qualifier: "distort",
    schema: z.string().describe(
      JSON.stringify({
        text: "Distorts an image to a new shape by either adjusting its corners or by warping it into an arc.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_distort",
      })
    ),
  },
  fillLight: {
    prefix: "e",
    qualifier: "fill_light",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Adjusts the fill light and optionally blends the result with the original image.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_fill_light",
      })
    ),
  },
  gamma: {
    prefix: "e",
    qualifier: "gamma",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Adjusts the image or video gamma level.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_gamma",
      })
    ),
  },
  gradientFade: {
    prefix: "e",
    qualifier: "gradient_fade",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Applies a gradient fade effect from the edge of an image.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_gradient_fade",
      })
    ),
  },
  grayscale: {
    prefix: "e",
    qualifier: "grayscale",
    schema: z.boolean().describe(
      JSON.stringify({
        text: "Converts an image to grayscale (multiple shades of gray).",
        url: "https://cloudinary.com/documentation/transformation_reference#e_grayscale",
      })
    ),
  },
  hue: {
    prefix: "e",
    qualifier: "hue",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Adjusts an image's hue.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_hue",
      })
    ),
  },
  improve: {
    prefix: "e",
    qualifier: "improve",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Adjusts an image's colors, contrast and brightness to improve its appearance.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_improve",
      })
    ),
  },
  loop: {
    prefix: "e",
    qualifier: "loop",
    schema: z.union([z.boolean(), z.number(), z.string()]).describe(
      JSON.stringify({
        text: "Loops a video or animated image the specified number of times.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_loop",
      })
    ),
  },
  multiply: {
    prefix: "e",
    qualifier: "multiply",
    schema: z.boolean().describe(
      JSON.stringify({
        text: "A qualifier that blends image layers using the multiply blend mode",
        url: "https://cloudinary.com/documentation/transformation_reference#e_multiply",
      })
    ),
  },
  negate: {
    prefix: "e",
    qualifier: "negate",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "https://cloudinary.com/documentation/transformation_reference#e_negate",
        url: "https://cloudinary.com/documentation/transformation_reference#e_negate",
      })
    ),
  },
  noise: {
    prefix: "e",
    qualifier: "noise",
    schema: z.boolean().describe(
      JSON.stringify({
        text: "https://cloudinary.com/documentation/transformation_reference#e_noise",
        url: "https://cloudinary.com/documentation/transformation_reference#e_noise",
      })
    ),
  },
  oilPaint: {
    prefix: "e",
    qualifier: "oil_paint",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "https://cloudinary.com/documentation/transformation_reference#e_oil_paint",
        url: "https://cloudinary.com/documentation/transformation_reference#e_oil_paint",
      })
    ),
  },
  opacity: {
    qualifier: "o",
    schema: z.union([z.string(), z.number()]).describe(
      JSON.stringify({
        text: "Adjusts the opacity of an asset and makes it semi-transparent.",
        url: "https://cloudinary.com/documentation/transformation_reference#o_opacity",
      })
    ),
  },
  outline: {
    prefix: "e",
    qualifier: "outline",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Adds an outline effect to an image.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_outline",
      })
    ),
  },
  pixelate: {
    prefix: "e",
    qualifier: "pixelate",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Applies a pixelation effect.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_pixelate",
      })
    ),
  },
  pixelateFaces: {
    prefix: "e",
    qualifier: "pixelate_faces",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Pixelates all detected faces in an image.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_pixelate_faces",
      })
    ),
  },
  pixelateRegion: {
    prefix: "e",
    qualifier: "pixelate_region",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Pixelates the region of an image specified by x, y, width and height, or an area of text.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_pixelate_region",
      })
    ),
  },
  radius: {
    qualifier: "r",
    schema: z.string().describe(
      JSON.stringify({
        text: "Rounds the corners of an image or video.",
        url: "https://cloudinary.com/documentation/transformation_reference#r_round_corners",
      })
    ),
  },
  redeye: {
    prefix: "e",
    qualifier: "redeye",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Automatically removes red eyes in an image.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_redeye",
      })
    ),
  },
  replaceColor: {
    prefix: "e",
    qualifier: "replace_color",
    schema: z.string().describe(
      JSON.stringify({
        text: "Maps an input color and those similar to the input color to corresponding shades of a specified output color.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_replace_color",
      })
    ),
  },
  saturation: {
    prefix: "e",
    qualifier: "saturation",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Adjusts an image or video saturation level.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_saturation",
      })
    ),
  },
  screen: {
    prefix: "e",
    qualifier: "screen",
    schema: z.boolean().describe(
      JSON.stringify({
        text: "A qualifier that blends image layers using the screen blend mode.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_screen",
      })
    ),
  },
  sepia: {
    prefix: "e",
    qualifier: "sepia",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Changes the color scheme of an image to sepia.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_sepia",
      })
    ),
  },
  shadow: {
    prefix: "e",
    qualifier: "shadow",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Adds a gray shadow to the bottom right of an image.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_shadow",
      })
    ),
  },
  sharpen: {
    prefix: "e",
    qualifier: "sharpen",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Applies a sharpening filter.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_sharpen",
      })
    ),
  },
  shear: {
    prefix: "e",
    qualifier: "shear",
    schema: z.string().describe(
      JSON.stringify({
        text: "Skews an image according to the two specified values in degrees.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_shear",
      })
    ),
  },
  simulateColorblind: {
    prefix: "e",
    qualifier: "simulate_colorblind",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Simulates the way an image would appear to someone with the specified color blind condition.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_simulate_colorblind",
      })
    ),
  },
  tint: {
    prefix: "e",
    qualifier: "tint",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Blends an image with one or more tint colors at a specified intensity.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_tint",
      })
    ),
  },
  trim: {
    prefix: "e",
    qualifier: "trim",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Detects and removes image edges whose color is similar to the corner pixels.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_trim",
      })
    ),
  },
  unsharpMask: {
    prefix: "e",
    qualifier: "unsharp_mask",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Applies an unsharp mask filter to an image.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_unsharp_mask",
      })
    ),
  },
  vectorize: {
    prefix: "e",
    qualifier: "vectorize",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Vectorizes an image.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_vectorize",
      })
    ),
  },
  vibrance: {
    prefix: "e",
    qualifier: "vibrance",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Applies a vibrance filter to an image.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_vibrance",
      })
    ),
  },
  vignette: {
    prefix: "e",
    qualifier: "vignette",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Applies a vignette effect to an image.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_vignette",
      })
    ),
  },
} as const;
