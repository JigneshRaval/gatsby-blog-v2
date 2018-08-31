import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import { rhythm, scale } from '../utils/typography';
import { Header } from './Header';
import { PostList } from './Post-List';

export default class Template extends React.Component {

	constructor(props) {
		super(props);

		/* this.state = {
			categories: [],
			tags: [],
			data: props.data
		} */

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
							<div className="container-side">
								<PostList posts={staticData.allMarkdownRemark.edges} />
							</div>

							<div className="container-main">
								{children}
							</div>

						</div>
					</main>
				)}
			/>

		)
	}
}
