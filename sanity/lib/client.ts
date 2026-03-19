import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

export const client = projectId
  ? createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
      useCdn: true,
    })
  : null;
