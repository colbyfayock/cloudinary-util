import { z } from "zod";
import { promptArrayToString } from "../lib/transformations.js";
import type { ImageOptions } from "../types/image.js";
import type { TransformationPlugin } from "../types/plugins.js";

const imageOptionsRecolorPromptSchema = z.union([
  z.string(),
  z.array(z.string()),
]);

const imageOptionsRecolorSchema = z.object({
  prompt: imageOptionsRecolorPromptSchema.optional(),
  to: z.string().optional(),
  multiple: z.boolean().optional(),
});

export const recolorProps = {
  recolor: z
    .union([imageOptionsRecolorPromptSchema, imageOptionsRecolorSchema])
    .describe(
      JSON.stringify({
        text: "Uses generative AI to recolor parts of your image, maintaining the relative shading.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_gen_recolor",
      })
    )
    .optional(),
};

export const recolorPlugin = {
  props: recolorProps,
  assetTypes: ["image", "images"],
  plugin: (settings) => {
    const { cldAsset, options } = settings;
    const { recolor } = options;

    const recolorOptions: Record<string, string | undefined> = {
      prompt: undefined,
      "to-color": undefined,
      multiple: undefined,
    };

    if (Array.isArray(recolor)) {
      if (Array.isArray(recolor[0])) {
        recolorOptions.prompt = promptArrayToString(recolor[0]);
      } else {
        recolorOptions.prompt = recolor[0];
      }

      if (typeof recolor[1] === "string") {
        recolorOptions["to-color"] = recolor[1];
      }
    } else if (typeof recolor === "object") {
      // Allow the prompt to still be available as either a string or an array

      if (typeof recolor.prompt === "string") {
        recolorOptions.prompt = recolor.prompt;
      } else if (Array.isArray(recolor.prompt)) {
        recolorOptions.prompt = promptArrayToString(recolor.prompt);
      }

      if (typeof recolor.to === "string") {
        recolorOptions["to-color"] = recolor.to;
      }

      if (recolor.multiple === true) {
        recolorOptions.multiple = `true`;
      }
    }

    const transformation = Object.entries(recolorOptions)
      .filter(([, value]) => !!value)
      .map(([key, value]) => `${key}_${value}`)
      .join(";");

    if (transformation) {
      cldAsset.addTransformation(`e_gen_recolor:${transformation}`);
    }

    return {};
  },
} satisfies TransformationPlugin<ImageOptions>;
