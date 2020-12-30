const fetch = require(`node-fetch`);

exports.sourceNodes = async ({actions: {createNode}, createContentDigest}) => {
    const home = await fetch(
        `https://jsonplaceholder.typicode.com/posts`,
        {method: `GET`},
        {headers: {header: `123`}}
    );
    const pageHome = await home.json();
    createNode({
        allData: pageHome,
        id: `page-home-graphql-data`,
        internal: {
            type: `JsonPlaceHolder`,
            contentDigest: createContentDigest(pageHome),
        },
    });
};