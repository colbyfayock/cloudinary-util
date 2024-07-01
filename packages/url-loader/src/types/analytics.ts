import { z } from "zod";
import type { IAnalyticsOptions } from "@cloudinary/url-gen/sdkAnalytics/interfaces/IAnalyticsOptions";

export interface CloudinaryAnalyticsOptions extends IAnalyticsOptions {}

export const analyticsOptionsSchema: z.ZodType<CloudinaryAnalyticsOptions> =
  z.any();

export type AnalyticsOptions = z.TypeOf<typeof analyticsOptionsSchema> | false;
