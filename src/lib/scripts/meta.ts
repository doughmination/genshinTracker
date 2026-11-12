/* src/lib/scripts/meta.ts
 * MIT — (c) Doughmination System®
 */

import {
	websiteDomain,
	websiteUrl,
	githubUrl,
	twitterUrl,
	blueskyUrl,
	linkedinUrl,
	twitchUrl,
	youtubeUrl
} from '#lib';

export type MetaInput = {
	title: string;
	description: string;
	pageUrl: string;
	isHome: boolean;
};

// Discord embed accent
const accentColour = 0xeb459e;

// Escape '<' so the JSON can't close the script tag early
const toJson = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');

const closingTag = '</' + 'script>';

// Discord component embed: one Container, max 3,000 bytes, Open Graph tags are the fallback
export function buildEmbedTag({ title, description, pageUrl, isHome }: MetaInput): string {
	// Link buttons: this page, plus Home when we're not already on it
	const buttons = [
		{
			type: 2,
			style: 5,
			label: 'Open page',
			url: pageUrl
		},
		...(isHome
			? []
			: [
					{
						type: 2,
						style: 5,
						label: 'Home',
						url: websiteUrl + '/'
					}
				])
	];

	const componentEmbed = {
		component: {
			type: 17,
			accent_color: accentColour,
			components: [
				{
					type: 9,
					components: [
						{
							type: 10,
							content: `## ${title}`
						},
						{
							type: 10,
							content: description
						}
					],
					accessory: {
						type: 11,
						media: { url: websiteUrl + '/favicon.png' }
					}
				},
				{ type: 14 },
				{
					type: 1,
					components: buttons
				},
				{
					type: 10,
					content: `-# ${websiteDomain}`
				}
			]
		}
	};

	return `<script id='discord:component-embed' type='application/json'>${toJson(componentEmbed)}${closingTag}`;
}

// schema.org structured data (JSON-LD) for search engines
export function buildStructuredDataTag({ title, description, pageUrl, isHome }: MetaInput): string {
	const structuredData = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Person',
				'@id': websiteUrl + '/#person',
				name: 'Clove Twilight',
				url: websiteUrl + '/',
				image: websiteUrl + '/favicon.png',
				jobTitle: 'Software Developer',
				sameAs: [githubUrl, twitterUrl, blueskyUrl, linkedinUrl, twitchUrl, youtubeUrl]
			},
			{
				'@type': 'WebSite',
				'@id': websiteUrl + '/#website',
				name: 'Clove Twilight',
				url: websiteUrl + '/',
				inLanguage: 'en-GB',
				publisher: { '@id': websiteUrl + '/#person' }
			},
			{
				'@type': isHome ? 'ProfilePage' : 'WebPage',
				'@id': pageUrl,
				name: title,
				description: description,
				url: pageUrl,
				inLanguage: 'en-GB',
				isPartOf: { '@id': websiteUrl + '/#website' },
				about: { '@id': websiteUrl + '/#person' }
			}
		]
	};

	return `<script type='application/ld+json'>${toJson(structuredData)}${closingTag}`;
}
