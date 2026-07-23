import { defineCollection, z } from 'astro:content';

const creatures = defineCollection({
  type: 'content',
  schema: z.object({
    no: z.string(),
    status: z.enum(['published', 'hidden', 'archived']).default('published'),
    category: z.enum(['creature', 'symbiont']).default('creature'),

    name_jp: z.string(),
    name_en: z.string(),
    tag: z.string(),
    rarity: z.enum(['LEGEND', 'EPIC', 'RARE', 'UNCOMMON', 'COMMON']),

    plant: z.number().min(0).max(100),
    animal: z.number().min(0).max(100),
    danger: z.number().min(0).max(100),

    habitat: z.string(),
    size: z.string(),
    mobility: z.string(),
    status_label: z.string().optional(),
    status_color: z.string().optional(),

    tags: z.array(z.string()).default([]),
    series: z.array(z.string()).default([]),
    related: z.array(z.string()).default([]),

    shopUrl: z.string().url().optional(),
    price: z.number().nullable().optional(),
    soldOut: z.boolean().default(false),

    notes: z.string().optional(),
    namer: z.string().optional(),
    abilities: z.array(z.string()).default([]),
    top: z.string().optional(),
    missingState: z.string().optional(),

    // 移行期：既存の画像パスを一時的に保持（Phase1完了後 cover.webp へ移行）
    cover: z.string().optional(),
    gallery: z.array(z.object({
      path: z.string(),
      title: z.string().optional(),
      desc: z.string().optional(),
    })).default([]),
    videos: z.array(z.object({
      youtubeId: z.string(),
      title: z.string().optional(),
      observedAt: z.string().optional(),
    })).default([]),
  }),
});

export const collections = { creatures };
