import {html, css, LitElement} from 'lit'
import '@vandeurenglenn/flex-elements'

export default customElements.define('copyright-element', class CopyrightElement extends LitElement {
  static properties = {
  }

  constructor() {
    super()
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
    2023 VandeurenGlenn. Code licensed under the CC-BY-NC-SA-4.0 License.
    Except as otherwise noted,
    Documentation & media are licensed under CC-BY-4.0 License.
</p>

    `
  }
});