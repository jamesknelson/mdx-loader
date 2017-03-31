mdx-loader
==========

[![npm version](https://img.shields.io/npm/v/mdx-loader.svg)](https://www.npmjs.com/package/mdx-loader)

A webpack loader to convert Markdown files into React components -- in pure JavaScript.

**mdx-loader** uses [MDXC](https://github.com/jamesknelson/mdxc#using-mdx) under the hood. MDXC was created to allow for markdown-based documentation pages that can embed live examples using JSX. If you'd like a full static-website generation solution using MDX, see [sitepack](https://github.com/jamesknelson/sitepack).

This loader adds markup for syntax highlighting using [Prism.js](http://prismjs.com/), but styles are not included automatically.

## Usage

```
npm install --save-dev mdx-loader
```

Assuming you're using Webpack 2, you'll need to add an entry to your `module.rules` array:

```js
module: {
  rules: [
    /**
     * MDX is a tool that converts Markdown files to React components. This 
     * loader uses MDX to create Page objects for Markdown files. As it
     * produces ES2015, the result is then passed through babel.
     */
    { test: /\.mdx?$/,
      use: [
        'babel-loader',
        'mdx-loader',
      ]
    },

    // ...
  ]
},
```

This assumes you've already got Babel set up with your Webpack project.

## Using your Markdown components

You can `import` and use your Markdown files like standard components. You can also import a `meta` object that contains your document's front matter. For example:

```jsx
import React, { Component } from 'react'
import Document, { meta } from './document.mdx'

export default class Something extends Component {
  render() {
    return (
      <div>
        <h1>{meta.title}</h1>
        <Document />
      </div>
    )
  }
}
```

You can also pass props to your component, and configure how the various Markdown elements are rendered. For more details, see the [MDXC documentation](https://github.com/jamesknelson/mdxc#props).

## Syntax Highlighting

If you'd like to add styles for the syntax highlighting, include a Prism.js stylesheet somewhere within your application:

```js
require('prismjs/themes/prism-tomorrow.css');
```

