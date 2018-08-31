import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby'

export const Header = ( props ) => {
    console.log('Header :', props.categories);

    const expandPost = (event) => {
        alert('Expand Post');
    }

    return (
        <div className="post-bar">
            <div className="post-cover--toggle-fullscreen" onClick={expandPost}>
                <i className="icon icon-menu"></i> <span className="visuallyhidden">Read in fullscreen mode.</span>
            </div>
            <h3>Blog</h3>
            <nav>
                <ul>
                    <li><Link to="/blog">Blog</Link></li>
                    <li><Link to="/snippets">Snippets</Link></li>
                    <li><Link to="/about">About</Link></li>
                    {
                    props.categories.map(node => {

                        return <li><Link to="/about">{node.node.frontmatter.category}</Link></li>;
                    })
                    }
                </ul>
            </nav>
        </div>
    );
}
