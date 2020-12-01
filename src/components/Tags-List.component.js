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
        let tagsArray = [];

        props.tags.map(({ node }) => {
            if (node.frontmatter.tags) {
                tagsArray = tagsArray.concat(node.frontmatter.tags);
            }
        })

        console.log('tags --', tagsArray);
        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }

        // usage example:
        //var a = ['a', 1, 'a', 2, '1'];
        var unique = tagsArray.filter( onlyUnique ); // returns ['a', 1, 2, '1']
        /* let test = tagsArray.reduce((allTags, uniqTag) => {
            console.log(allTags, uniqTag);
            if (allTags.indexOf(uniqTag) === -1) {
                allTags.push(uniqTag);
            }
        }); */

        console.log('tags 2 --',unique);

        console.log('uniqueTagList :', uniqueTagList);
    }

    return (

        <div className="postlist">

            <div className="postlist-container">




            </div>

        </div>


    )
}
