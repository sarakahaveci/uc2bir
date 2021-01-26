# Gatsby Framework

## File system => /app /components /context /data /images /pages /redux /stateful /statics /style .html.js

## Get Deploy URL 👍

<a href="">Deploy</a>

## Features

⚡️ Modern UI Design + Reveal Animations\
⚡️ One Page Layout built with React\
⚡️ Styled with Bootstrap v4.3 + Custom SCSS\
⚡️ Fully Responsive\
⚡️ Configurable color scheme\
⚡️ Image optimization with Gatsby\
⚡️ Easy site customization\
⚡️ Well organized documentation

---

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

```example graphql query
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
---------------------------------------------------

# Call Component
---------------------------------------------------
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
```example graphql query