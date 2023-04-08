import 'custom-svg-iconset'
import {html, css, LitElement} from 'lit'
import 'custom-pages'
import {bang, debang } from './utils.js'

export default customElements.define('made-with', class MadeWith extends LitElement {
  static properties = {
  }

  constructor() {
    super()
  }

  static styles = css`
    :host {
      align-items: center;
      box-sizing: border-box;
      padding: 12px;
      display: flex;
      flex-direction: row;
      height: 40px;
      width: 100%;
      background-color: var(--paper-blue-grey-900, #263238);
      color: #FFF;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    custom-svg-icon {
      background: #fff;
      border-radius: 50%;
      box-sizing: content-box;
      padding: 4px;
      --svg-icon-size: 16px;
      --svg-icon-color: red;
    }

    strong.left {
      padding-right: 6px;
    }

    strong.right {
      padding: 0 6px;
    }

    a {
      text-decoration: none;
      color: #0097A7;
    }
    p {
      margin: 0;
      overflow: hidden;
      width: 100%;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `

  render(){
    return html`
    <p>
      <strong class="left">made with</strong>
      <custom-svg-icon icon="favorite"></custom-svg-icon>
      <strong class="right">by</strong>
      <a href="https://github.com/vandeurenglenn">Vandeuren Glenn</a>
    </p>
    
    `
  }
});