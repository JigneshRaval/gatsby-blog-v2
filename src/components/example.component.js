import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

export default class ExampleComponent extends React.Component {
  render() {
    return (<StaticQuery
      query={graphql`
      query SiteTitleQuery {
          allMarkdownRemark : allMarkdownRemark(
              sort: { order: DESC, fields: [frontmatter___date] }
          ) {
              totalCount
              edges {
                  node {
                      fields {
                          slug
                        },
                      excerpt(pruneLength: 250)
                      id
                      frontmatter {
                          date(formatString: "MMMM DD, YYYY")
                          tags
                          title
                          category
                          categoryColor
                          type
                      }
                  }
              }
          }

      }
      `}
      render={staticData => (
        <div className="post-bar">
          <div className="post-cover--toggle-fullscreen" onClick={expandPost}>
            <i className="icon icon-menu"></i> <span className="visuallyhidden">Read in fullscreen mode.</span>
          </div>
          <h3>Blog</h3>
          <nav>
            <ul>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/snippets">Snippets</Link></li>
            </ul>
          </nav>
        </div>
      )}
    />)
  }
}
