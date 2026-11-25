import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.string().optional(),
    category: z.string().default('深度评测'),
    date: z.string().default('2026-03-01'),
    readTime: z.string().default('8 分钟'),
    h1: z.string(),
    intro: z.string().optional(),
    recommendedBrands: z.array(z.string()).default(['yinxingren', 'breezenet', 'feimaoyun']),
  }),
});

const guides = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.string().optional(),
    platform: z.string().default('全平台客户端'),
    difficulty: z.string().default('入门级'),
    date: z.string().default('2026-03-01'),
    readTime: z.string().default('8 分钟'),
    h1: z.string(),
    intro: z.string().optional(),
    recommendedBrands: z.array(z.string()).default(['yinxingren', 'breezenet', 'feimaoyun']),
  }),
});

const glossary = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    term: z.string().default(''),
    h1: z.string(),
  }),
});

export const collections = { blog, guides, glossary };
