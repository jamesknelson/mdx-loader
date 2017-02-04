mdx-loader
==========

[![npm version](https://img.shields.io/npm/v/mdx-loader.svg)](https://www.npmjs.com/package/mdx-loader)

A webpack loader to convert MDX files (i.e. JSX-infused Markdown files) into standard JSX files that export a single React component.

MDX was created to allow for markdown-based documentation pages that can embed live examples using JSX. For more information on MDX, see the [mdx-it](https://github.com/jamesknelson/mdx-it) website. If you'd like a full static-website generation solution using MDX, see [sitepack](https://github.com/jamesknelson/sitepack).

This loader adds markup for syntax highlighting using [Prism.js](http://prismjs.com/), but styles are not included automatically.

## Usage

```
npm install --save-dev mdx-loader
```

As mdx-loader outputs JSX, you'll need to pass the result through babel:

*webpack.config.js*
```js
module: {
  loaders: [
    {
      test: /\.mdx$/,
      loader: 'babel!mdx-loader'
    }
  ]
}
```

If you'd like to add styles for the syntax highlighting, include a Prism.js stylesheet somewhere within your application:

```js
require('prismjs/themes/prism-tomorrow.css');
```
