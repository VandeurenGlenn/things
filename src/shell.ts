import 'custom-svg-iconset'
import {html, css, LitElement} from 'lit'
import 'custom-pages'
import {bang, debang } from './utils.js'
import './made-with-love.js'
import './copyright.js'

customElements.define('app-shell', class AppShell extends LitElement {
  constructor() {
    super()

    onhashchange = this.#onhashchange.bind(this)
    if (!location.hash) location.hash = bang('todo')
    else this.#onhashchange()
  }

  get #pages() {
    return this.renderRoot.querySelector('custom-pages')
  }

  async #select(selected) {
    if (!customElements.get(`${selected}-view`)) await import(`./${selected}.js`)
    this.#pages.select(selected)
  }
  #onhashchange() {
    const selected = debang(location.hash)
    this.#select(selected)
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      color: #555;
    }

    custom-pages {
      height: 100%;
    }

    h1, h2 {
      text-transform: uppercase;
    }

    header {
      display: flex;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
      padding: 12px 24px;
      border-bottom: 1px solid #eee;
    }

    header .container {
      max-width: 480px;
      width: 100%;
    }
  `

  render(){
    return html`
    <header>
      <span class="container">
        <h1>
          Things
        </h1>
        <h2>todo</h2>
      </span>
    </header>
    
    <custom-pages>
      <todo-view></todo-view>
    </custom-pages>

    <made-with-love></made-with-love>
    <copyright-element author="Vandeuren Glenn"></copyright-element>
    `
  }
});