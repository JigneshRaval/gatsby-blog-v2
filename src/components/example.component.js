import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

export default class ExampleComponent extends React.Component {
  render() {
    return (<StaticQuery
      query={graphql`
      {
        allMarkdownRemark {
          totalCount
        }
      }
  `}
      render={staticData => (
        <div>
          {staticData.allMarkdownRemark.totalCount}
          {/* <Helmet title={staticData.site.siteMetadata.title} />
          <h1>888 Welcome to {staticData.site.siteMetadata.title}!</h1>
          <p>We hope your stay is pleasant.</p> */}
        </div>
      )}
    />)
  }
}
