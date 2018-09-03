import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby'

export const PostList = (props) => {
    console.log('Post-List :', props);
    const makePostActive = (event) => {

    }

    return (

        <div className="postlist">

            <div className="postlist-container">
                {props.posts.map(({ node }, index) => (
                    <article key={index} className="postlist-post" data-post-id="82">
                        <Link to={node.fields.slug} className="postlist-post-inner" onClick={makePostActive}>
                            <div className="postlist-category">
                                <span className="category-badge" style={{ backgroundColor: node.frontmatter.categoryColor }} data-category-color={node.frontmatter.categoryColor}></span> {node.frontmatter.category}
                            </div>
                            <h3 className="postlist-title">{node.frontmatter.title}</h3>
                            <p className="postlist-excerpt hidden" >{node.excerpt}</p>
                        </Link>
                    </article>
                ))}

            </div>

        </div>


    )
}
