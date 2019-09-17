const searchExpr = /Polymer.Element/g;
const importSearchExpr = /(^|\n)([ \t]*)(<link rel="import" href="\/node_modules\/@banno\/polymer\/polymer\.html"(?: *\/)?>)/;
const fs = require('fs');
const path = require('path');
const indentExpr = /([ \t]*)\S/;

function updateHtmlImports(contents) {
  let importIndex = contents.search(importSearchExpr);
  let insertionPoint, remainingContents;
  let indent = '';
  if (importIndex < 0) {
    // return;
    importIndex = 0;
    insertionPoint = 0;
    remainingContents = '\n' + contents;
  } else {
    const importMatches = importSearchExpr.exec(contents);
    const startIndicator = importMatches[1];
    indent = importMatches[2];
    insertionPoint = importMatches.index + startIndicator.length + indent.length;
    remainingContents = contents.substr(importMatches.index + importMatches[0].length);
  }

  let addDomIfImport = /<dom-if/.test(contents) || /is=['"]?dom-if/.test(contents);
  let addDomRepeatImport = /<dom-repeat/.test(contents) || /is=['"]?dom-repeat/.test(contents);
  contents = contents.substr(0, insertionPoint) +
    '<link rel="import" href="~@banno/polymer/polymer-element.html">' +
    (addDomIfImport ? `\n${indent}<link rel="import" href="~@banno/polymer/lib/elements/dom-if.html">` : '') +
    (addDomRepeatImport ? `\n${indent}<link rel="import" href="~@banno/polymer/lib/elements/dom-repeat.html">` : '') +
    remainingContents;
  return contents;
}


const allowedExprs = [
  /^\s*$/,
  /^\s*\/\/$/,
  /^\s*goog\.(require|provide)/,
  /^\s*import /
];
const iifeStartExpr = /^\s*\(\(\)\s*\=>\s*\{/;
const iifeEndExpr = /^\s*}\)\(\)/;
const multlineCommentStart = /^\s*\/\*/;
const multlineCommentEnd = /\*\/\s*$/;
const useStrictDirectiveExpr = /\s*['"]use strict['"];?/;
function removeIIFE(contents) {
  let lines = contents.split('\n');
  let startExprLineIndex = 0;
  let inComment = false;
  for (; startExprLineIndex < lines.length; startExprLineIndex++) {
    if (iifeStartExpr.test(lines[startExprLineIndex])) {
      break;
    } else if (inComment) {
      if (multlineCommentEnd.test(lines[startExprLineIndex])) {
        inComment = false;
      }
      continue;
    } else if (multlineCommentStart.test(lines[startExprLineIndex])) {
      inComment = !multlineCommentEnd.test(lines[startExprLineIndex]);
      continue;
    }
  
    let allowedPrequels = false;
    for (let i = 0; i < allowedExprs.length; i++) {
      const isAllowed = allowedExprs[i].test(lines[startExprLineIndex]);
      allowedPrequels = allowedPrequels || isAllowed;
    }
    if (!allowedPrequels) {
      return contents;
    }
  }
  
  let endExprLineIndex = lines.length - 1;
  for (; endExprLineIndex > startExprLineIndex; endExprLineIndex--) {
    if (iifeEndExpr.test(lines[endExprLineIndex])) {
      break;
    }
  }
  
  if (endExprLineIndex <= startExprLineIndex) {
    return contents;
  }
  
  for (let i = startExprLineIndex + 1; i < endExprLineIndex; i++) {
    lines[i] = lines[i].replace(/^  /, '');
  }
  
  lines.splice(endExprLineIndex, 1);
  lines.splice(startExprLineIndex, 1);
  for (let i = startExprLineIndex; i < endExprLineIndex; i++) {
    if (useStrictDirectiveExpr.test(lines[i])) {
      lines.splice(i, 1);
      break;
    }
    if (!/^\s*$/.test(lines[i])) {
      break;
    }
  }
  return lines.join('\n');
}

function updateJs(scriptContents) {
  scriptContents = removeIIFE(scriptContents);
  importIndex = scriptContents.indexOf('Polymer.Element');
  if (importIndex < 0) {
    return scriptContents;
  }
  const indent = indentExpr.exec(scriptContents)[1];

  scriptContents = `\n${indent}import {Element as PolymerElement} from '@banno/polymer/polymer-element.js';${scriptContents}`;
  scriptContents = scriptContents.replace(/Polymer.Element/g, () => 'PolymerElement');
  scriptContents = scriptContents.replace(customElementsDefineExpr, (match, indent, elementName) => {
    return `${match}\n${indent}export default ${elementName};`;
  });

  scriptContents = scriptContents.replace(/^(\s*)(window\.\w+ = class|class \w+) extends PolymerElement/gm,
    (match, indent) => `${indent}/** @polymer */\n${match}`);

  const scriptContentLines = scriptContents.split('\n');
  let classDefinitionIndex = scriptContentLines.findIndex(line => /^\s*window\.\w+\s*=\s*class extends Polymer/);
  if (classDefinitionIndex >= 0) {
    if (classDefinitionIndex === 0 || scriptContentLines[classDefinitionIndex - 1].indexOf('*/') < 0) {
      const indentCount = scriptContentLines[classDefinitionIndex].indexOf('window');
      let indent = '';
      for (let i = 0; i < indentCount; i++) {
        indent += ' ';
      }
      scriptContentLines.splice(classDefinitionIndex, 0, `${indent}/**
${indent} * @polymer
${indent} * @customElement
${indent} * @extends {PolymerElement}
${indent} */`);
    }
  }
  return scriptContents;
}

const scriptWithModule = '<script type="module">';
const customElementsDefineExpr = /([ \t]*)customElements.define\([^,]+,\s([^\)]+)\);/;
function updateHtmlScript(contents) {
  let importIndex = contents.indexOf('Polymer.Element');
  if (importIndex < 0) {
    return contents;
  }
  let scriptStartIndex = contents.search(/<script( type="module")?>/);
  if (scriptStartIndex < 0) {
    return contents;
  }
  if (contents.substr(scriptStartIndex, scriptWithModule.length) !== scriptWithModule) {
    contents = contents.substr(0, scriptStartIndex + 7) + ' type="module"' + contents.substr(scriptStartIndex + 7);
  }
  
  scriptStartIndex = contents.indexOf('>', scriptStartIndex) + 1;
  
  const scriptEndIndex = contents.indexOf('</script', scriptStartIndex);
  if (scriptEndIndex < 0) {
    return contents;
  }
  let scriptContents = updateJs(contents.substring(scriptStartIndex, scriptEndIndex));

  contents = contents.substr(0, scriptStartIndex) + scriptContents + contents.substr(scriptEndIndex);
  return contents;
}

module.exports = function(content) {
  const currentFilePath = this.resourcePath;
  if (/\.html$/.test(currentFilePath) && !/@banno[\/\\]polymer[\/\\]/.test(currentFilePath)) {
    content = updateHtmlImports(content);
    // content = updateHtmlScript(content);
  }
  
  return content;
};