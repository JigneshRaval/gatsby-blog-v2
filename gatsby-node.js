const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const tagTemplate = path.resolve("src/templates/tags.js");

const getUniqueTags = (edges) => {
	// METHOD 1
	// ======================
	const set = new Set();

	edges.forEach((edge) => {
		// console.log('getUniqueTags ::', edge, edge.node, edge.node.frontmatter.tags)
		edge.node.frontmatter.tags.forEach(tag => set.add(tag))
	});

	// console.log('SET :', ...set);
	return [...set];

};

exports.createPages = ({ graphql, actions }) => {
	const { createPage } = actions

	return new Promise((resolve, reject) => {
		const blogPost = path.resolve('./src/templates/blog-post.js')
		resolve(
			graphql(
				`
          {
            allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    tags
                  }
                }
              }
            }
          }
        `
			).then(result => {
				if (result.errors) {
					console.log(result.errors)
					reject(result.errors)
				}

				// Create blog posts pages.
				const posts = result.data.allMarkdownRemark.edges;

				_.each(posts, (post, index) => {
					const previous = index === posts.length - 1 ? null : posts[index + 1].node;
					const next = index === 0 ? null : posts[index - 1].node;

					createPage({
						path: post.node.fields.slug,
						component: blogPost,
						context: {
							slug: post.node.fields.slug,
							previous,
							next,
							tags: getUniqueTags(result.data.allMarkdownRemark.edges),
							excerpt: post.node.frontmatter.excerpt,
							category: post.node.frontmatter.category,
							categoryColor: post.node.frontmatter.categoryColor,
							coverImage: post.node.frontmatter.coverImage,
							sourceUrl: post.node.frontmatter.sourceUrl,
							type: post.node.frontmatter.type
						},
					})
				});


				// TAGS :: Create Tags page
				// =================================
				let tags = [],
					postNew = {};

				posts.forEach(({ node }) => {
					if (node.frontmatter.tags) {
						tags = tags.concat(node.frontmatter.tags);

						node.frontmatter.tags.forEach(tag => {
							if (!postNew[tag]) {
								postNew[tag] = [];
							}
							postNew[tag].push(node);
						});
					}
				});

				let uniqueTags = [...new Set(tags)];

				uniqueTags.forEach(tag => {
					const post = postNew[tag];
					createPage({
						path: `/tags/${tag.toLowerCase().replace(/\s/ig, '-')}`,
						component: tagTemplate,
						context: {
							tag,
							post,
							posts: postNew
						},
					});
				});

			})
		)
	})
}

exports.onCreateNode = ({ node, actions, getNode }) => {
	const { createNodeField } = actions

	if (node.internal.type === `MarkdownRemark`) {
		const value = createFilePath({ node, getNode })
		createNodeField({
			name: `slug`,
			node,
			value,
		})
	}
}
