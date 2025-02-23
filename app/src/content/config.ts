import { defineCollection, z } from 'astro:content';
import fs from "fs";
import path from "path";
import yaml from "yaml";

const filePath = path.resolve("./src/data/tags.yaml");
const fileContents = fs.readFileSync(filePath, "utf8");
const tagsData = yaml.parse(fileContents);

const articleSchema = z.object({
	title: z.string(),
	description: z.string(),
	category: z.enum(tagsData.articles),		
	publishedDate: z.coerce.date(),
	updatedDate: z.coerce.date().optional(),
	draft: z.boolean().optional()

	// tags: z.array(z.string()),
});

const guideSchema = z.object({
	title: z.string(),
	description: z.string(),
	category: z.enum(tagsData.guides),		
	publishedDate: z.coerce.date(),
	updatedDate: z.coerce.date().optional(),
	draft: z.boolean().optional()
});

const snippetSchema = z.object({
	title: z.string(),
	category: z.enum(tagsData.snippets),
	description: z.string().optional(),
	publishedDate: z.coerce.date(),
	updatedDate: z.coerce.date().optional(),
	draft: z.boolean().optional()
});

const articleColleection = defineCollection({
	type: 'content',
	schema: articleSchema
});

const snippetCollection = defineCollection({
	type: 'content',
	schema: snippetSchema
});

const guideCollection = defineCollection({
	type: 'content',
	schema: guideSchema
});

export const collections = { 
	'article': articleColleection,
	'snippet': snippetCollection,
	'guide': guideCollection,
};


type ArticleData = z.infer<typeof articleSchema>;
export type Article = ArticleData & { slug: string };

type SnippetData = z.infer<typeof snippetSchema>;
export type Snippet = SnippetData & { slug: string };

type GuideData = z.infer<typeof guideSchema>;
export type Guide = GuideData & { slug: string };