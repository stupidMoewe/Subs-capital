import fs from "fs-extra";
import xml from "xml";
import cheerio from "cheerio";

(async function createRssFeed() {
	console.log("creating feed");
	const posts = [
		{
			title: "Post One",
			date: "1/1/2020",
			slug: "post-one",
			content: "<p>This is some content for post one.</p>",
		},
		{
			title: "Post Two",
			date: "1/2/2020",
			slug: "post-two",
			content: "<p>This is some content for post two.</p>",
		},
		{
			title: "Post Three",
			date: "1/3/2020",
			slug: "post-three",
			content:
				"<p>This is some content for post three. This is a relative <a href='/relative-link/'>link</a></p>",
		},
		{
			title: "Post Four",
			date: "1/4/2020",
			slug: "post-four",
			content: "<p>This is some content for post four.</p>",
		},
	];

	const feedObject = {
		rss: [
			{
				_attr: {
					version: "2.0",
					"xmlns:atom": "http://www.w3.org/2005/Atom",
				},
			},
			{
				channel: [
					{
						"atom:link": {
							_attr: {
								href: "www.subs-capital.fr/feed.rss",
								rel: "self",
								type: "application/rss+xml",
							},
						},
					},
					{
						title: "Subs Capital",
					},
					{
						link: "www.subs-capital.fr/",
					},
					{
						description:
							"Une solution d'épargne alternative et innovante dans les cryptos-actifs.",
					},
					{ language: "fr-FR" },
					...buildFeed(posts),
				],
			},
		],
	};

	const feed = '<?xml version="1.0" encoding="UTF-8"?>' + xml(feedObject);

	await fs.writeFile("./feed.rss", feed, "utf8");
})();

function buildFeed(
	posts: { title: string; date: string; slug: string; content: string }[]
) {
	const sortedPosts = posts.sort(function (first, second) {
		return new Date(second.date).getTime() - new Date(first.date).getTime();
	});

	const feedItems = [];

	feedItems.push(
		...sortedPosts.map(function (post) {
			const $ = cheerio.load(post.content as string, {
				decodeEntities: false,
			});

			// replace relative links with absolute
			$("a[href^='/'], img[src^='/']").each(function (
				this: cheerio.Element
			) {
				const $this = $(this);
				if ($this.attr("href")) {
					$this.attr(
						"href",
						`www.subs-capital.fr/${$this.attr("href")}`
					);
				}
				if ($this.attr("src")) {
					$this.attr(
						"src",
						`www.subs-capital.fr/${$this.attr("src")}`
					);
				}
			});

			const postContent = $("body").html() as string;

			const feedItem = {
				item: [
					{ title: post.title },
					{
						pubDate: new Date(post.date as string).toUTCString(),
					},
					{
						guid: [
							{ _attr: { isPermaLink: true } },
							`www.subs-capital.fr/${post.slug}/`,
						],
					},
					{
						description: {
							_cdata: postContent,
						},
					},
				],
			};

			return feedItem;
		})
	);

	return feedItems;
}
