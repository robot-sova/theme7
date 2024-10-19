declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"about": {
"-index.md": {
	id: "-index.md";
  slug: "-index";
  body: string;
  collection: "about";
  data: any
} & { render(): Render[".md"] };
};
"authors": Record<string, {
  id: string;
  slug: string;
  body: string;
  collection: "authors";
  data: InferEntrySchema<"authors">;
  render(): Render[".md"];
}>;
"blog": {
"-index.md": {
	id: "-index.md";
  slug: "-index";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"post-1.md": {
	id: "post-1.md";
  slug: "post-1";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"post-2.md": {
	id: "post-2.md";
  slug: "post-2";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"post-3.md": {
	id: "post-3.md";
  slug: "post-3";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"post-4.md": {
	id: "post-4.md";
  slug: "post-4";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"post-5.md": {
	id: "post-5.md";
  slug: "post-5";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"post-6.md": {
	id: "post-6.md";
  slug: "post-6";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"post-7.md": {
	id: "post-7.md";
  slug: "post-7";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"post-8.md": {
	id: "post-8.md";
  slug: "post-8";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
};
"book-demo": {
"-index.md": {
	id: "-index.md";
  slug: "-index";
  body: string;
  collection: "book-demo";
  data: any
} & { render(): Render[".md"] };
};
"case": {
"-index.md": {
	id: "-index.md";
  slug: "-index";
  body: string;
  collection: "case";
  data: any
} & { render(): Render[".md"] };
"sisyphus.md": {
	id: "sisyphus.md";
  slug: "sisyphus";
  body: string;
  collection: "case";
  data: any
} & { render(): Render[".md"] };
"sisyphus_1.md": {
	id: "sisyphus_1.md";
  slug: "sisyphus_1";
  body: string;
  collection: "case";
  data: any
} & { render(): Render[".md"] };
"sisyphus_2.md": {
	id: "sisyphus_2.md";
  slug: "sisyphus_2";
  body: string;
  collection: "case";
  data: any
} & { render(): Render[".md"] };
"sisyphus_3.md": {
	id: "sisyphus_3.md";
  slug: "sisyphus_3";
  body: string;
  collection: "case";
  data: any
} & { render(): Render[".md"] };
"sisyphus_4.md": {
	id: "sisyphus_4.md";
  slug: "sisyphus_4";
  body: string;
  collection: "case";
  data: any
} & { render(): Render[".md"] };
"sisyphus_5.md": {
	id: "sisyphus_5.md";
  slug: "sisyphus_5";
  body: string;
  collection: "case";
  data: any
} & { render(): Render[".md"] };
};
"changelog": {
"-index.md": {
	id: "-index.md";
  slug: "-index";
  body: string;
  collection: "changelog";
  data: any
} & { render(): Render[".md"] };
};
"contact": {
"-index.md": {
	id: "-index.md";
  slug: "-index";
  body: string;
  collection: "contact";
  data: any
} & { render(): Render[".md"] };
};
"features": {
"-index.md": {
	id: "-index.md";
  slug: "-index";
  body: string;
  collection: "features";
  data: any
} & { render(): Render[".md"] };
};
"homepage": {
"-index.md": {
	id: "-index.md";
  slug: "-index";
  body: string;
  collection: "homepage";
  data: any
} & { render(): Render[".md"] };
};
"integration": {
"-index.md": {
	id: "-index.md";
  slug: "-index";
  body: string;
  collection: "integration";
  data: any
} & { render(): Render[".md"] };
"adobe.md": {
	id: "adobe.md";
  slug: "adobe";
  body: string;
  collection: "integration";
  data: any
} & { render(): Render[".md"] };
"apple-pay.md": {
	id: "apple-pay.md";
  slug: "apple-pay";
  body: string;
  collection: "integration";
  data: any
} & { render(): Render[".md"] };
"google-chrome.md": {
	id: "google-chrome.md";
  slug: "google-chrome";
  body: string;
  collection: "integration";
  data: any
} & { render(): Render[".md"] };
"google-drive.md": {
	id: "google-drive.md";
  slug: "google-drive";
  body: string;
  collection: "integration";
  data: any
} & { render(): Render[".md"] };
"master-card.md": {
	id: "master-card.md";
  slug: "master-card";
  body: string;
  collection: "integration";
  data: any
} & { render(): Render[".md"] };
"paypal.md": {
	id: "paypal.md";
  slug: "paypal";
  body: string;
  collection: "integration";
  data: any
} & { render(): Render[".md"] };
"slack.md": {
	id: "slack.md";
  slug: "slack";
  body: string;
  collection: "integration";
  data: any
} & { render(): Render[".md"] };
"snapchat.md": {
	id: "snapchat.md";
  slug: "snapchat";
  body: string;
  collection: "integration";
  data: any
} & { render(): Render[".md"] };
"visa-card.md": {
	id: "visa-card.md";
  slug: "visa-card";
  body: string;
  collection: "integration";
  data: any
} & { render(): Render[".md"] };
};
"pages": {
"elements.mdx": {
	id: "elements.mdx";
  slug: "elements";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdx"] };
"privacy-policy.md": {
	id: "privacy-policy.md";
  slug: "privacy-policy";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".md"] };
"terms-conditions.md": {
	id: "terms-conditions.md";
  slug: "terms-conditions";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".md"] };
};
"pricing": {
"-index.md": {
	id: "-index.md";
  slug: "-index";
  body: string;
  collection: "pricing";
  data: any
} & { render(): Render[".md"] };
};
"sections": {
"call-to-action.md": {
	id: "call-to-action.md";
  slug: "call-to-action";
  body: string;
  collection: "sections";
  data: any
} & { render(): Render[".md"] };
"client-testimonials.md": {
	id: "client-testimonials.md";
  slug: "client-testimonials";
  body: string;
  collection: "sections";
  data: any
} & { render(): Render[".md"] };
"faq.md": {
	id: "faq.md";
  slug: "faq";
  body: string;
  collection: "sections";
  data: any
} & { render(): Render[".md"] };
"home-banner.md": {
	id: "home-banner.md";
  slug: "home-banner";
  body: string;
  collection: "sections";
  data: any
} & { render(): Render[".md"] };
"our-commitments.md": {
	id: "our-commitments.md";
  slug: "our-commitments";
  body: string;
  collection: "sections";
  data: any
} & { render(): Render[".md"] };
"our-features.md": {
	id: "our-features.md";
  slug: "our-features";
  body: string;
  collection: "sections";
  data: any
} & { render(): Render[".md"] };
"our-journey.md": {
	id: "our-journey.md";
  slug: "our-journey";
  body: string;
  collection: "sections";
  data: any
} & { render(): Render[".md"] };
"our-services.md": {
	id: "our-services.md";
  slug: "our-services";
  body: string;
  collection: "sections";
  data: any
} & { render(): Render[".md"] };
"our-team-members.md": {
	id: "our-team-members.md";
  slug: "our-team-members";
  body: string;
  collection: "sections";
  data: any
} & { render(): Render[".md"] };
"our-values.md": {
	id: "our-values.md";
  slug: "our-values";
  body: string;
  collection: "sections";
  data: any
} & { render(): Render[".md"] };
"pricing.md": {
	id: "pricing.md";
  slug: "pricing";
  body: string;
  collection: "sections";
  data: any
} & { render(): Render[".md"] };
"trusted-brands.md": {
	id: "trusted-brands.md";
  slug: "trusted-brands";
  body: string;
  collection: "sections";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
