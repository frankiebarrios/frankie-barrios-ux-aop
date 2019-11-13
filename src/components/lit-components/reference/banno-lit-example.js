import {LitElement, html, css} from 'lit-element';
import {jhaStyles} from '../src/styles/jha-styles.js';
import '../src/containers/jha-container/jha-container.js';

export default class ComponentDemo extends LitElement {

  constructor() {
    super();
    this.title = '';
    this.controls = [];
    this.element = null;
    this.showControls = false;
    this.cssVars = [];
    this.showCssVariables = false;
    this.appliedAttributes = [];
  }

  static get styles() {
    return [ jhaStyles, css`
      :host {
        --color-gray-dark: #272d33;
        --color-gray-base: #455564;
        --color-gray-medium: #8d99a0;
        --color-gray-light: #e4e7ea;
        --color-blue: #3aaeda;
        --color-highlight: #7d57c1;
        display: block;
        padding-bottom: 24px;
        color: var(--color-gray-base);
        font-family: -apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",sans-serif;
        max-width: 800px;
        margin: 0 auto;
      }
      :host([showControls]) #controls {
        display: block;
        padding: 8px;
      }
      #controls {
        padding: 10px;
        background-color: var(--color-gray-light);
        display: none;
        margin: 8px 0;
        border-radius: 4px;
      }
      #controls div {
        padding-bottom: 8px;
      }
      label {
        font-size: 14px;
        font-weight: 600;
        font-family: monospace;
      }
      label span {
        width: 100px;
        display: inline-block;
      }
      input {
        border: none;
        border-radius: 4px;
        font-size: 14px;
        font-family: monospace;
        color: var(--color-gray-dark);
        padding: 4px 8px;
      }
      h1,h2,h3,h4,h5 {
        color: var(--color-gray-dark);
        font-weight: 400;
        margin: 0;
      }
      h1 {
        font-size: 3em;
        letter-spacing: -.75px;
        font-weight: 200;
      }
      p {
        margin: 0
      }
      #controls h4 {
        margin: 0 0 8px;
      }
      button {
        font-family: inherit;
        font-size: 14px;
        border: 2px solid var(--color-gray-light);
        color: var(--color-gray-base);
        border-radius: 4px;
        padding: 4px 8px;
        transition: all .2s;
      }
      button:hover {
        background: #eef1f4;
        border-color: #eef1f4;
      }
      #css-vars {
        display: none;
        max-height: 400px;
        background-color: var(--color-gray-light);
        font-size: 14px;
        margin: 8px 0;
        border-radius: 4px;
        padding: 10px;
        overflow-y: auto;
      }
      #css-vars div {
        margin-bottom: 5px;
      }
      #css-vars div:last-of-type {
        margin-bottom: 0;
      }
      .selector-group {
        padding: 8px;
      }
      .css-var {
        margin-left: 28px;
      }
      strong {
        font-style: italic;
        color: var(--color-gray-dark);
        font-family: monospace;
      }
      :host([showCssVariables]) #css-vars {
        display: block;
      }
      code {
        user-select: all;
        display: block;
        background-color: var(--color-gray-base);
        color: white;
        padding: 10px;
        text-align: left;
        border-radius: 4px 4px 0 0;
      }
      /* the "description" slot */
      ::slotted(div) {
        padding: 16px 0 4px;
        font-size: 14px;
      }
      #demo {
        margin-bottom: 4px;
        padding: 10px;
        border: 1px solid var(--color-gray-light);
        border-radius: 0 0 4px 4px;
        background: #fff;
      }
      .selector-group[has-attributes] {
        cursor: pointer;
      }
      .selector-group[selected] {
        color: var(--color-gray-light);
        border-radius: 4px;
        background-color: var(--color-highlight);
      }
      .selector-group[selected] h4, .selector-group[selected] strong {
        color: var(--color-gray-light);
      }
      `
    ];
  }

  static get properties() {
    return {
      title: {
        type: String,
      },
      controls: {
        type:Array,
      },
      showControls: {
        type: Boolean,
        reflect: true
      },
      code: {
        type: String,
      },
      cssVars: {
        type: Array,
      },
      showCssVariables: {
        type: Boolean,
        reflect: true
      },
      appliedAttributes: {
        type: Array,
      },
    }
  }

  onSlotChange(event) {
    const slot = /** @type{HTMLSlotElement} */(event.target);
    // there should only be one element...
    const [element] = slot.assignedElements();
    // need to wait until the element has been upgraded.
    customElements.whenDefined(element.localName).then(r => {
      this.element = element;
      const props = element.constructor.properties;
      if (props) {
        this.controls = Object.keys(props).map(k => { return {key:k, type:props[k].type, value:element[k]}});
        this.originalValues = this.controls.map(c => {return {...c}});
      }
      this.parseStyles();
    });
  }

  parseStyles() {
    // build a Map of css rules->properties->variables
    // TODO: maybe ignore styles that don't start with ':host'?
    const rules = this.element.constructor.styles.map(s => s.styleSheet.cssRules);
    const rulesWithVars = rules.reduce((acc, rule) => {
      // find all rules that have styles use vars
      acc = acc.concat(Array.from(rule).filter(r => r.cssText.includes('var(--')));
      return acc;
    }, []);
    // for each rulesWithVars, find each style within that uses vars.
    const usesVars = rulesWithVars.reduce((acc, rule) => {
      // rule.style is not exactly iterable
      for(var i=0; i<rule.style.length; i++) {
        const prop = rule.style[i];

        if (prop.indexOf('--') !== 0 && // ignore style rules that are variable assignments, since they don't exist as props in rule.style
        rule.style[prop].includes('var(--')) {
          acc.push({selector:rule.selectorText, property:prop, style:rule.style[prop]});
        }
      }
      return acc;
    }, []);
    this.cssVars = usesVars;
  }

  onPropChange(index, key, value) {
    if(this.element) {
      this.element[key] = value;
      // also need to keep this.controls in sync
      // with what the ui has, otherwise reset doesn't work
      // as lit-html doesn't think there are any changes.
      this.controls[index] = {...this.controls[index], ...{key, value}};
      this.controls = [...this.controls];
    }
  }

  /**
   *
   * @param {Map} updates
   */
  updated(updates) {
    if (!updates.has('code') && this.element) {
      this.code = this.element.outerHTML;
    }
  }

  resetProps() {
    if(this.element && this.controls) {
      this.originalValues.forEach(c => {
        this.element[c.key] = c.value;
        if (!c.value) {
          this.element.removeAttribute(c.key);
        } else {
          this.element.setAttribute(c.key, c.value);
        }
      });
      // force an update
      this.controls = [...this.originalValues];
    }
  }

  toggleAttributes(attributes) {
    // If attribute matches a property, set both.
    // otherwise, just set attributes?
    // TODO: learn regex so we can figure out why groups is undefined :()
    const attr = attributes[1];
    if (this.appliedAttributes.includes(attr)) {
      this.appliedAttributes = this.appliedAttributes.filter(a => a !== attr);
      this.element.removeAttribute(attr);
    } else {
      this.appliedAttributes = [...this.appliedAttributes, attr];
    }

    this.appliedAttributes.forEach(a => {
      const controlIndex = this.controls.findIndex(p => p.key === a);
      if (controlIndex) {
        this.onPropChange(controlIndex, a, true);
      }
      this.element.setAttribute(a, '');
    });
  }

  renderSelectorGroupItems(group) {
    return group.map(g => {
      return html`
      <div class="css-var">
        <strong>${g.style}</strong> for ${g.property}
      </div>`;
    });
  }

  renderCssVars(cssVars) {
    // sort, then group by common selector
    const vars = [...cssVars].sort((a, b) => a.selector.localeCompare(b.selector))
    .reduce((acc, cur) => {
      if (Array.isArray(acc[acc.length-1])) {
        const last = acc[acc.length-1];
        if (last[last.length-1].selector === cur.selector) {
          last.push(cur);
        } else {
          acc.push([cur]);
        }
      } else {
        acc.push([cur]);
      }
      return acc;
    }, []);

    return vars.map(group => {
      const [firstItem] = group;
      const attributeRegex = /:host\(\[([a-zA-Z'-]*)\]\)/i;
      const hasAttributes = attributeRegex.test(firstItem.selector);
      let clickHandler = () => {};// empty click handler
      let selected = false;
      if (hasAttributes) {
        const attributes = firstItem.selector.match(attributeRegex);
        clickHandler = () => this.toggleAttributes(attributes);
        selected = this.appliedAttributes.includes(attributes[1])
      }

      return html`
        <div class="selector-group"
          @click=${clickHandler}
          ?has-attributes=${hasAttributes}
          ?selected=${selected}>
          <h4>${group[0].selector} uses:</h4>
          ${this.renderSelectorGroupItems(group)}
        </div>
      `;
    });
  }

  renderControl(control, index) {
    if (control.type === Boolean) {
      return html`
        <div>
          <label>
            <span>
              ${control.key}
            </span>
            <input type="checkbox"
              ?checked=${control.value}
              .checked=${control.value}
              @change=${event => this.onPropChange(index, control.key, event.target.checked)}>
            </input>
          </label>
        </div>
      `;
    } else if (control.type === String) {
      return html`
        <div>
          <label>
            <span>
              ${control.key}
            </span>
            <input type="text" .value=${control.value} @input=${event => this.onPropChange(control.key, event.target.value)}></input>
          </label>
        </div>
      `;
    } else if (control.type === Number){
      return html`
        <div>
          <label>
            ${control.key}
            <input type="number" .value=${control.value} @input=${event => this.onPropChange(control.key, event.target.value)}></input>
          </label>
        </div>
      `;
    } else if (control.type === Object) {
      // not supported :)
    } else if (control.type === Array) {
      // not supported :)
    }
  }

  render() {
    return html`
      <jha-container>
        <h1>${this.title}</h1>
        <slot name="description"></slot>
        <code>${this.code}</code>
        <div id="demo">
          <slot @slotchange=${event => this.onSlotChange(event)}></slot>
        </div>
        ${this.controls.length ? html`<button type="button" @click=${event => this.showControls = !this.showControls}>Edit Properties</button>`: ''}
        <div id="controls">
          ${this.controls.map((c, index) => this.renderControl(c, index))}
          <button type="button" @click=${event => this.resetProps()}>Reset</button>
        </div>
        <button type="button" @click=${event => this.showCssVariables = !this.showCssVariables}>Show CSS Variables</button>
        <div id="css-vars">
          ${this.renderCssVars(this.cssVars)}
        </div>
      </jha-container>
    `;
  }
}

customElements.define('component-demo', ComponentDemo);