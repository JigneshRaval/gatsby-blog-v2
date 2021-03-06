// Tag specific page, which listes all the articles having this tag
// ===================================================

import React from "react"
import { Link, graphql } from "gatsby"

const Tags = ({ pageContext, data }) => {

    console.log('Tags Template :', pageContext, data);

    const { tag } = pageContext
    const { edges, totalCount } = data.allMarkdownRemark
    const tagHeader = `${totalCount} post${
        totalCount === 1 ? "" : "s"
        } tagged with "${tag}"`

    return (
        <div>
            <h1>{tagHeader}</h1>
            <ul>
                {edges.map(({ node }) => {
                    const { title } = node.frontmatter;
                    const path = node.fields.slug;
                    return (
                        <li key={path}>
                            <Link to={path}>{title}</Link>
                        </li>
                    )
                })}
            </ul>
            {/*
              This links to a page that does not yet exist.
              We'll come back to it!
            */}
            <Link to="/tags">All tags</Link>
        </div>
    )
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
        limit: 2000
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
            fields {
                slug
            }
            frontmatter {
                title
            }
        }
      }
    }
  }
`
