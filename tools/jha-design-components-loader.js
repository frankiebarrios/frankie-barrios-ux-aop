// This is a Regular Expression we will use to match specific patterns in order to fix their imports.
const PolymerRegex = /()(class (.*) extends )(Polymer\.Element)/

// This is the logic for the loader. We export it as a module so that it can be used as a loader in Webpack.
module.exports = (content) => {
  if (Boolean(content.search(PolymerRegex))) {
    return content.replace(PolymerRegex, `import { Element as PolymerElement } from '@banno/polymer/polymer-element.js';\n$1$2PolymerElement`);
  }
  return content;
}