// Post listing index page : Displays the list of all the blog posts
// =====================================

import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Layout from '../components/layout'


class BlogIndex extends React.Component {
	render() {

		const siteTitle = get(this, 'props.data.site.siteMetadata.title')
		const group = get(this, 'props.data.allMarkdownRemark.group')
		const siteDescription = get(
			this,
			'props.data.site.siteMetadata.description'
		)
		const posts = get(this, 'props.data.allMarkdownRemark.edges')
		console.log('BlogIndex :', group);
		return (
			<Layout location={this.props.location}>
				<Helmet
					htmlAttributes={{ lang: 'en' }}
					meta={[{ name: 'description', content: siteDescription }]}
					title={siteTitle}
				/>

				<article className="post-list">
					{posts.map(({ node }) => {
						const title = get(node, 'frontmatter.title') || node.fields.slug
						return (
							<div key={node.fields.slug} className="post-list__item">
								<h3>
									<Link to={node.fields.slug}>
										{title}</Link>
								</h3>
								<small>{node.frontmatter.date}</small>
								<p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
							</div>
						)
					})}
				</article>
			</Layout>
		)
	}
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
		group(field: frontmatter___tags) {
			fieldValue
			totalCount
		}
		edges {
			node {
			excerpt
			fields {
				slug
			}
			frontmatter {
				date(formatString: "DD MMMM, YYYY")
				title
			}
		}
      }
    }
  }
`
