import { z } from "zod";
import { assetOptionsSchema } from "./asset.js";
import { abrProps } from "../plugins/abr.js";

export const videoOptionsSchema = assetOptionsSchema.merge(
  z.object({
    // Spreading plugins instead of extend or merge to avoid excessive schema warning
    // https://github.com/microsoft/TypeScript/issues/34933#issuecomment-1772787785
    ...abrProps,
  }),
);

type _VideoOptions = z.infer<typeof videoOptionsSchema>;

export interface VideoOptions extends _VideoOptions {}
