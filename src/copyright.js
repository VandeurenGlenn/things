import {html, css, LitElement} from 'lit'
import '@vandeurenglenn/flex-elements'

customElements.define('copyright-element', class CopyrightElement extends LitElement {
  static properties = {
    author: { type: String },
    year: { type: String },
    codeLicense: { type: String },
    contentLicense: { type: String }
  }

  constructor() {
    super()
  }

  connectedCallback() {
    super.connectedCallback()

    this.year = this.year || 2023
    this.codeLicense = this.codeLicense || 'CC-BY-NC-SA-4.0'
    this.contentLicense = this.contentLicense || 'CC-BY-4.0'
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 8px 16px;
      box-sizing: border-box;
      font-size: 12px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    p {
      margin: 0;
      overflow: hidden;
      width: 100%;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    @media(min-width: 860) {
      p {
        width: 100%;
      }
    }
  `

  render(){
    return html`
      
    <p>
      &#169; ${this.year} ${this.author}. Code licensed under the ${this.codeLicense} License.
      Except as otherwise noted,
      Documentation & media are licensed under the ${this.contentLicense} License.
    </p>

    `
  }
});