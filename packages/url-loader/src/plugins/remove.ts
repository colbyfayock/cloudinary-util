import { z } from 'zod';

import { promptArrayToString } from '../lib/transformations';

import { ImageOptions } from '../types/image';
import { PluginSettings } from '../types/plugins';

const imageOptionsRemovePromptSchema = z.union([
  z.string(),
  z.array(z.string())
]);

const imageOptionsRemoveSchema = z.object({
  prompt: imageOptionsRemovePromptSchema.optional(),
  region: z.union([
      z.array(z.number()),
      z.array(z.array(z.number()))
    ]).optional(),
  multiple: z.boolean().optional(),
  removeShadow: z.boolean().optional()
})

export const pluginProps = {
  remove: z.union([
    imageOptionsRemovePromptSchema,
    imageOptionsRemoveSchema,
  ])
  .describe(JSON.stringify({
    text: 'Applies zooming and/or panning to an image, resulting in a video or animated image.',
    url: 'https://cloudinary.com/documentation/transformation_reference#e_zoompan'
  }))
  .optional(),
};

export const props = Object.entries(pluginProps).map(([name]) => name);
export const assetTypes = ['image', 'images'];

export function plugin(props: PluginSettings<ImageOptions>) {
  const { cldAsset, options } = props;
  const { remove } = options;

  const removeOptions: Record<string, string | undefined> = {
    prompt: undefined,
    region: undefined,
    multiple: undefined,
    'remove-shadow': undefined,
  };


  if ( typeof remove === 'string' ) {
    removeOptions.prompt = remove;
  } else if ( Array.isArray(remove) ) {
    removeOptions.prompt = promptArrayToString(remove);
  } else if ( typeof remove === 'object' ) {

    const hasPrompt = typeof remove.prompt === 'string' || Array.isArray(remove.prompt);
    const hasRegion = Array.isArray(remove.region);

    if ( hasPrompt && hasRegion ) {
      throw new Error('Invalid remove options: you can not have both a prompt and a region. More info: https://cloudinary.com/documentation/transformation_reference#e_gen_remove')
    }
    
    // Allow the prompt to still be available as either a string or an array
    
    if ( typeof remove.prompt === 'string' ) {
      removeOptions.prompt = remove.prompt
    } else if ( Array.isArray(remove.prompt) ) {
      removeOptions.prompt = promptArrayToString(remove.prompt);
    }

    // Region can be an array of numbers, or an array with 1+ arrays of numbers

    if ( Array.isArray(remove.region) ) {
      removeOptions.region = regionArrayToString(remove.region);
    }

    if ( remove.multiple === true ) {
      removeOptions.multiple = `true`;
    }

    if ( remove.removeShadow === true ) {
      removeOptions['remove-shadow'] = `true`;
    }
  }

  const transformation = Object.entries(removeOptions)
    .filter(([, value]) => !!value)
    .map(([key, value]) => `${key}_${value}`)
    .join(';')

  if ( transformation ) {
    cldAsset.addTransformation(`e_gen_remove:${transformation}`);
  }

  return {};
}

/**
 * regionArrayToString
 */

function regionArrayToString(regionArray: Array<number | Array<number>>): string {
  const indexes: Record<number, string> = {
    0: 'x',
    1: 'y',
    2: 'w',
    3: 'h'
  }

  const regionString = regionArray.map((region, index) => {
    if ( Array.isArray(region) ) {
      return regionArrayToString(region);
    }
    
    const key = indexes[index];

    return `${key}_${region}`;
  }).join(';');

  return `(${regionString})`;
}