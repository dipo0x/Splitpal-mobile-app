import { z } from "zod";
import Constants from "expo-constants";

const envSchema = z.object({
  FIREBASE_API_KEY: z.string().min(1),
  FIREBASE_AUTH_DOMAIN: z.string().min(1),
  FIREBASE_DATABASE_URL: z.string().min(1),
  FIREBASE_PROJECT_ID: z.string().min(1),
  FIREBASE_STORAGE_BUCKET: z.string().min(1),
  FIREBASE_MESSAGING_SENDER_ID: z.string().min(1),
  FIREBASE_APP_ID: z.string().min(1),
});

export const env = envSchema.parse(Constants.expoConfig?.extra);