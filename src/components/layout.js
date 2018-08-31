import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import { rhythm, scale } from '../utils/typography';
import { Header } from './Header';
import { PostList } from './Post-List';

export default class Template extends React.Component {

  render() {
    const { location, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header
    console.log('Template:', this.props);

    if (location.pathname === rootPath) {
      header = (
        <h1>
          <Link to={'/'}>
            Gatsby Starter Blog
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3>
          <Link to={'/'}>
            Gatsby Starter Blog
          </Link>
        </h3>
      )
    }
    return (

      <StaticQuery
        query={graphql`
            query MainLayoutQuery {
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

          <div className="container">
            <div className="container-side">
              <PostList posts={staticData.allMarkdownRemark} />
            </div>

            <div className="container-main">
              {header}
              {children}
            </div>

          </div>


        )}
      />




    )
  }
}
