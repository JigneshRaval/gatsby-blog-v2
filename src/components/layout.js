import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import { Header } from './Header';
import { TagsList } from './Tags-List.component';

export default class Template extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { location, children } = this.props
		const rootPath = `${__PATH_PREFIX__}/`

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

					<main>

						<Header categories={staticData.allMarkdownRemark.edges} />

						<div className="container">


								{children}

						</div>
					</main>
				)}
			/>

		)
	}
}
