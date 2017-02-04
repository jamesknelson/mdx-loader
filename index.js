"use strict";

var url = require('url')
var loaderUtils = require('loader-utils')
var frontMatter = require('front-matter')
var mdAnchor = require('markdown-it-anchor')
var Prism = require('prismjs')
var MDXIt = require('mdx-it')


var aliases = {
  'js': 'jsx',
  'html': 'markup'
}
function highlight(str, lang) {
  if (!lang) {
    return str
  } else {
    lang = aliases[lang] || lang
    require(`prismjs/components/prism-${lang}.js`)
    if (Prism.languages[lang]) {
      return Prism.highlight(str, Prism.languages[lang])
    } else {
      return str
    }
  }
}


function mdImageReplacer(md) {
  md.core.ruler.push('imageReplacer', function(state) {
    function applyFilterToTokenHierarchy(token) {
      if (token.children) {
        token.children.map(applyFilterToTokenHierarchy);
      }

      if (token.type === 'image') {
        var src = token.attrGet('src')

        if(!loaderUtils.isUrlRequest(src)) return;

        var uri = url.parse(src);
        uri.hash = null;
        token.attrSet('src', 'require("'+uri.format()+'")');
      }
    }

    state.tokens.map(applyFilterToTokenHierarchy);
  })
}


module.exports = function markdownLoader(content) {
  this.cacheable();

  var options = loaderUtils.parseQuery(this.query);

  if (options.linkify === undefined) options.linkify = true;
  if (options.typographer === undefined) options.typographer = true;
  if (options.highlight === undefined) options.highlight = highlight;

  var md =
    new MDXIt(options)
      .use(mdImageReplacer)
      .use(mdAnchor);

  var data = frontMatter(content);

  // Make the plain body and meta available to the next loader
  this.value = {
    meta: data.attributes,
    body: md.render(data.body),
  };

  return `${this.value.body}
module.exports.meta = ${JSON.stringify(this.value.meta, null, 2)}
`;
}
