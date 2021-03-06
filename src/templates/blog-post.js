// Template for Single Blog Post
// ============================================

import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'

import Layout from '../components/layout'

class BlogPostTemplate extends React.Component {
	render() {
		const post = this.props.data.markdownRemark
		const siteTitle = get(this.props, 'data.site.siteMetadata.title')
		const siteDescription = post.excerpt
		const { previous, next } = this.props.pageContext

		return (
			<Layout location={this.props.location}>
				<Helmet
					htmlAttributes={{ lang: 'en' }}
					meta={[{ name: 'description', content: siteDescription }]}
					title={`${post.frontmatter.title} | ${siteTitle}`}
				/>

				<article className="post-wrapper">
					<h1>{post.frontmatter.title}</h1>
					<p>
						{post.frontmatter.date}
					</p>
					<div dangerouslySetInnerHTML={{ __html: post.html }} />

					<ul>
						{post.frontmatter.tags.map((tag) => {

							return (
								<li key={tag}>
									<Link to={`/tags/${tag.toLowerCase().replace(/\s/ig, '-')}/`}>{tag}</Link>
								</li>
							)
						})}
					</ul>
					<hr />

					<ul>
						{previous && (
							<li>
								<Link to={previous.fields.slug} rel="prev">← {previous.frontmatter.title}</Link>
							</li>
						)}

						{next && (
							<li>
								<Link to={next.fields.slug} rel="next">{next.frontmatter.title} →</Link>
							</li>
						)}
					</ul>
				</article>
			</Layout>
		)
	}
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
		id
		excerpt
		html
		frontmatter {
			title
			date(formatString: "MMMM DD, YYYY")
			category
			categoryColor
			coverImage
			sourceUrl
			type
			tags
		}
    }
  }
`
