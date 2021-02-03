# Gatsby Framework

## File pattern

```bash
.
├── LICENSE.md
├── README.md
├── gatsby-browser.js
├── gatsby-config.js
├── gatsby-node.js
├── gatsby-ssr.js
├── package-lock.json
├── package.json
├── webpack.config.js
├── provider.js
└── src
├── images
└── app
└── ├── http
└── ├── ├── layout
└── ├── └── ├── index.jsx
    ├── ├── partials
    ├── └── ├── ...jsx 
    └── sub-page
        ├── ...jsx
├── components
│   ├── ...jsx
├── constants
├── ├── actionTypes.js
├── ├── index.js
├── redux
├── ├── ... redux promise middleware pattern
│   ├── ...png, jpg, gif
└── pages
├── 404.js
├── index.js
└── ...js
├── statics
├── ├── backgorund
├── ├── icon
├── ├── svg
├── style
├── ├── ...
├── ├── main.scss
└── utils
└── ├── ...util settings
└── ├── index.js
```

## Case Pattern

```bash
⚡️ dosya isimleri: kebab-case
⚡️ component isimleri: PascalCase ve jsx element
⚡️ props, settings, switch component isimleri: camelCase ve js element
⚡️ path component isimleri: kebab-case ve js element
⚡️ variables: snake_case
⚡️ function variables: camelCase arrow and default function
⚡️ component variables: arrow function, PascalCase, functional component ve set prop required default
```

## Getting Started 🚀

# npm install
# npm run develop

### Prerequisites 📋

...

```
node@v10.16.0 or higher
npm@6.9.0 or higher
git@2.17.1 or higher
gatsby-cli@2.8.22 or higher
```

Also, you can use [Yarn](https://yarnpkg.com/) instead of NPM ☝️

```
yarn@v1.21.1 or higher
```

---

## How To Use 🔧

From your command line, first clone Simplefolio:

```bash
# Clone this repository
$ git clone clone coppy

# Go into the repository
$ cd pt-points-web
```

Then you can install the dependencies either using NPM or Yarn:

Using NPM:

```bash
# Install dependencies
$ npm install

# Start development server
$ npm run develop
```

Using Yarn:

```bash
# Install dependencies
$ yarn

# Start development server
$ yarn develop
```

```bash
example graphql query
# graphql query
---------------------------------------------------
query MyQuery {
  allMarkdownRemark {
    edges {
      node {
        frontmatter {
          id
          capasity
          category
          content
          location
          name
          price
          purce
          square_meters
          star
          title
          image {
            childImageSharp {
              fluid {
                src
              }
            }
          }
        }
      }
    }
  }
}
```
---------------------------------------------------

# Call Component
---------------------------------------------------
```bash
import React from "react"
import { graphql } from "gatsby"

const ComponentName = ({ data }) => <pre>{JSON.stringify(data, null, 4)}</pre>

export const query = graphql`
  {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            id
            capasity
            category
            content
            location
            name
            price
            purce
            square_meters
            star
            title
            image {
              childImageSharp {
                fluid {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`
export default ComponentName
---------------------------------------------------
```