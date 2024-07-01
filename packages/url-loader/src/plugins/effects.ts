import { z } from "zod";
import type { TransformationPlugin } from "../types/plugins.js";
import { effects as qualifiersEffects } from "../constants/qualifiers.js";
import { constructTransformation } from "../lib/transformations.js";

const effectProps = {
  angle: qualifiersEffects.angle.schema.optional(),
  art: qualifiersEffects.art.schema.optional(),
  autoBrightness: qualifiersEffects.autoBrightness.schema.optional(),
  autoColor: qualifiersEffects.autoColor.schema.optional(),
  autoContrast: qualifiersEffects.autoContrast.schema.optional(),
  assistColorblind: qualifiersEffects.assistColorblind.schema.optional(),
  background: qualifiersEffects.background.schema.optional(),
  blackwhite: qualifiersEffects.blackwhite.schema.optional(),
  blur: qualifiersEffects.blur.schema.optional(),
  blurFaces: qualifiersEffects.blurFaces.schema.optional(),
  blurRegion: qualifiersEffects.blurRegion.schema.optional(),
  border: qualifiersEffects.border.schema.optional(),
  brightness: qualifiersEffects.brightness.schema.optional(),
  brightnessHSB: qualifiersEffects.brightnessHSB.schema.optional(),
  cartoonify: qualifiersEffects.cartoonify.schema.optional(),
  color: qualifiersEffects.color.schema.optional(),
  colorize: qualifiersEffects.colorize.schema.optional(),
  contrast: qualifiersEffects.contrast.schema.optional(),
  distort: qualifiersEffects.distort.schema.optional(),
  fillLight: qualifiersEffects.fillLight.schema.optional(),
  gamma: qualifiersEffects.gamma.schema.optional(),
  gradientFade: qualifiersEffects.gradientFade.schema.optional(),
  grayscale: qualifiersEffects.grayscale.schema.optional(),
  improve: qualifiersEffects.improve.schema.optional(),
  loop: qualifiersEffects.loop.schema.optional(),
  multiply: qualifiersEffects.multiply.schema.optional(),
  negate: qualifiersEffects.negate.schema.optional(),
  oilPaint: qualifiersEffects.oilPaint.schema.optional(),
  opacity: qualifiersEffects.opacity.schema.optional(),
  outline: qualifiersEffects.outline.schema.optional(),
  pixelate: qualifiersEffects.pixelate.schema.optional(),
  pixelateFaces: qualifiersEffects.pixelateFaces.schema.optional(),
  pixelateRegion: qualifiersEffects.pixelateRegion.schema.optional(),
  radius: qualifiersEffects.radius.schema.optional(),
  redeye: qualifiersEffects.redeye.schema.optional(),
  replaceColor: qualifiersEffects.replaceColor.schema.optional(),
  saturation: qualifiersEffects.saturation.schema.optional(),
  screen: qualifiersEffects.screen.schema.optional(),
  sepia: qualifiersEffects.sepia.schema.optional(),
  shadow: qualifiersEffects.shadow.schema.optional(),
  sharpen: qualifiersEffects.sharpen.schema.optional(),
  shear: qualifiersEffects.shear.schema.optional(),
  simulateColorblind: qualifiersEffects.simulateColorblind.schema.optional(),
  tint: qualifiersEffects.tint.schema.optional(),
  trim: qualifiersEffects.trim.schema.optional(),
  unsharpMask: qualifiersEffects.unsharpMask.schema.optional(),
  vectorize: qualifiersEffects.vectorize.schema.optional(),
  vibrance: qualifiersEffects.vibrance.schema.optional(),
  vignette: qualifiersEffects.vignette.schema.optional(),
};

export const effectsProps = {
  effects: z
    .array(z.object(effectProps))
    .describe(
      JSON.stringify({
        text: "Array of objects specifying transformations to be applied to asset.",
      }),
    )
    .optional(),
  ...effectProps,
};

export const effectsPlugin = {
  props: effectsProps,
  assetTypes: ["image", "images", "video", "videos"],
  plugin: (settings) => {
    const { cldAsset, options } = settings;

    // Handle any top-level effect props

    const transformationStrings = constructTransformationString({
      effects: qualifiersEffects,
      options,
    });

    transformationStrings
      .filter((t) => !!t)
      .forEach((transformation) => cldAsset.effect(transformation));

    // If we're passing in an effects prop explicitly, treat it as an array of
    // effects that we need to process

    if (Array.isArray(options?.effects)) {
      options?.effects.forEach((effectsSet) => {
        const transformationString = constructTransformationString({
          effects: qualifiersEffects,
          options: effectsSet,
        })
          .filter((t) => !!t)
          .join(",");
        cldAsset.effect(transformationString);
      });
    }

    interface ConstructTransformationStringSettings {
      effects: object;
      options?: object;
    }

    function constructTransformationString({
      effects,
      options,
    }: ConstructTransformationStringSettings) {
      return (Object.keys(effects) as Array<keyof typeof effects>).map(
        (key) => {
          const { prefix, qualifier, converters } = effects[key];
          return constructTransformation({
            qualifier,
            prefix,
            value: options?.[key],
            converters,
          });
        },
      );
    }

    return {};
  },
} satisfies TransformationPlugin;
