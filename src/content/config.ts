// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const jsonDataCollection = defineCollection({
  type: 'data',
  schema: z.object({
    //Define JSON-file structure
    profileImage: z.string(),
    profileAlt: z.string(),
    profileLink: z.string(),
    profileTitle: z.string(),
    profileName: z.string(),
    github: z.string().url(),
    githubText: z.string().optional(),
    portfolioImage: z.string().optional(),
    email: z.string().email(),
    linkedin: z.string().url(),
    instagram: z.string().url().optional(),
    youtube: z.string().url().optional(),
    alias: z.string().optional(),
    contactSectionTitle: z.string().optional(),
    contactSectionSubtitle: z.string().optional(),
    contactSectionButtonText: z.string(),
    contactSectionButtonIcon: z.string().optional(),
    techsTitle: z.string().optional(),
    instagramIconName: z.string(),
    youtubeIconName: z.string(),
    githubIconName: z.string(),
    linkedinIconName: z.string(),
    emailIconName: z.string()
  }),
});

export const collections = {
  staticData: jsonDataCollection,
};
