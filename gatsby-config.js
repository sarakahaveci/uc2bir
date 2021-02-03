const path = require('path');

module.exports = {
  siteMetadata: {
    title: `321UcIkiBir`,
    description: `321UcIkiBir`,
    siteUrl: `https://321.4alabs.com/`,
  },
  plugins: [
    `gatsby-transformer-json`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        actions: path.join(__dirname, 'src/actions'),
        reducers: path.join(__dirname, 'src/reducers'),
        components: path.join(__dirname, 'src/components'),
        constants: path.join(__dirname, 'src/constants'),
      },
    },
    {
      resolve: 'gatsby-plugin-zopfli',
      options: {
        extensions: ['css', 'html', 'js', 'svg'],
        compression: {
          numiterations: 25,
        },
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/data/`,
        name: `data`,
        typeName: ({ node, object, isArray }) => object.level,
      },
    },
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        svgoConfig: {
          pretty: true,
          multipass: true,
          plugins: [
            { removeViewBox: false },
            { removeAttrs: { attrs: '(width|height)' } },
          ],
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pt-groups`,
        path: `${__dirname}/src/images/pt-groups/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `group-lesson`,
        path: `${__dirname}/src/images/group-lesson/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `packets`,
        path: `${__dirname}/src/images/packets/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `gym`,
        path: `${__dirname}/src/images/gym/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images_background`,
        path: `${__dirname}/src/statics/background/images/`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `321UcIkiBir`,
        short_name: `321UcIkiBir`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#02aab0`,
        display: `standalone`,
        icon: 'src/images/favicon.png',
      },
    },
  ],
};
