import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby'

export const TagsList = (props) => {
    console.log('tags list :', props);
    const set = new Set();
/*     const filterTags = () => {
        const uniqueColors = props.posts.reduce((total, amount) => {
            amount.forEach( color => {
              if (total.indexOf(color) === -1){
               total.push(color);
              }
            });
            return total;
        }, []);

        console.log(uniqueColors);
    } */
    let uniqueTagList;

    {
        /* uniqueTagList = props.posts.reduce((total, amount) => {
            console.log(total, amount);
            amount.forEach( color => {
              if (total.indexOf(color) === -1){
               total.push(color);
              }
            });
            return <li>{total}</li>;
        }, []) */
        let tags = [];

        props.posts.map(({ node }) => {
            if (node.frontmatter.tags) {
                tags = tags.concat(node.frontmatter.tags);
            }
        })

        tags.reduce((allTags, uniqTag) => {
            console.log(allTags, uniqTag);
            if (allTags.indexOf(uniqTag) === -1) {
                allTags.push(uniqTag);
            }
        }, []);

        console.log('uniqueTagList :', uniqueTagList);
    }

    return (

        <div className="postlist">

            <div className="postlist-container">


                {uniqueTagList}

            </div>

        </div>


    )
}
