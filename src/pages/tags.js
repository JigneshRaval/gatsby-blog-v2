// Index page for listing all the unique tags
// ================================================

import React from "react"
import { Link, graphql } from "gatsby"

const TagsPage = ({
    data: {
        allMarkdownRemark: { group }
    }
}) => (
        <div>
            <div>
                <h1>Tags</h1>
                <ul>
                    {group.map(tag => (
                        <li key={tag.fieldValue}>
                            <Link to={`/tags/${tag.fieldValue.toLowerCase().replace(/\s/ig, '-')}/`}>{tag.fieldValue} ({tag.totalCount})</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )

export default TagsPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
