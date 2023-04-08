import {html, css, LitElement} from 'lit'
import {map} from 'lit/directives/map.js'
import Storage from '@leofcoin/storage'
import '@material/mwc-fab'
import '@material/mwc-list/mwc-check-list-item.js';
import '@material/mwc-list/mwc-list.js';
import '@material/mwc-dialog/mwc-dialog.js';
import '@material/mwc-button/mwc-button.js';
import '@material/mwc-textfield/mwc-textfield.js';
import 'custom-svg-icon'
import '@vandeurenglenn/flex-elements'
import { v4 as uuidv4 } from 'uuid';

export default customElements.define('todo-view', class TodoView extends LitElement {
  static properties = {
    createOpened: { type: Boolean, reflect: true},
    todos: { type: Array }
  }

  constructor() {
    super()
  }

  async connectedCallback() {
    super.connectedCallback()
    if (!globalThis.todoStorage) {
      globalThis.todoStorage = await new Storage('todos')
      await globalThis.todoStorage.init()
    }
    const ids = await todoStorage.keys()
    const values = await todoStorage.values()

    this.todos = values.map((uint8Array, i) => ({
      id: ids[i],
      value: new TextDecoder().decode(uint8Array)
    }))
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      --svg-icon-color: #fff;
    }

    mwc-fab {
      position: absolute;
      right: 12px;
      bottom: 12px;
    }

    .container {
      display: flex;
      flex-direction: column;
      height: 320px;
      max-width: 480px;
      width: 100%;
    }

    mwc-textfield {
      width: 100%;
    }

    mwc-check-list-item {
      --svg-icon-color: #555;
    }

    mwc-check-list-item {
      --mdc-ripple-color: transaparent !important;
    }

    @media(min-width: 720px) {
      :host {

        justify-content: center;
      }

      mwc-list {
        box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)
      }
    }
  `

  async createclosed(event) {
    if (event.detail?.action === 'confirm') {
      const value = this.renderRoot.querySelector('mwc-textfield').value
      const id = uuidv4()
      await todoStorage.put(id, value)

      this.todos.push({ id, value })
      this.requestUpdate()
    }
    
    this.#resetCreateTodo()
  }

  #resetCreateTodo() {
    this.renderRoot.querySelector('mwc-textfield').value = ''
  }

  async #deleteTodo(id) {
    if (!todoStorage.has(id)) return

    await todoStorage.delete(id)
    let i = 0
    for (const todo of this.todos) {
      if (todo.id === id) {
        const index = this.todos.indexOf(this.todos[i])
        this.todos.splice(index, 1)
        break
      }
      i++
    }
    this.requestUpdate()
  }

  render(){
    return html`
    <mwc-dialog @closed="${(event) => this.createclosed(event)}">
      <mwc-textfield label="What Todo?"></mwc-textfield>
      <mwc-button
        slot="primaryAction"
        dialogAction="confirm">
        confirm
      </mwc-button>

      <mwc-button
        slot="secondaryAction"
        dialogAction="cancel">
        Cancel
      </mwc-button>
    </mwc-dialog>

    <span class="container">
      <mwc-list multi>
        ${map(this.todos, (item, i) => html`
        <mwc-check-list-item hasMeta left selected todoId=${item.id}>
          ${item.value}
          <custom-svg-icon icon="delete" slot="meta" @click="${() => this.#deleteTodo(item.id)}"></custom-svg-icon>
        </mwc-check-list-item>
        ${i < this.todos.length -1 ? html`<li divider padded role="seperator"></li>`: ''}
        
        `)}
        
      </mwc-list>
    </span>
    
    <mwc-fab extended label="Create TODO" @click="${() => this.renderRoot.querySelector('mwc-dialog').setAttribute('open', '')}">
      <custom-svg-icon slot="icon" icon="add"></custom-svg-icon>
    </mwc-fab>
    `
  }
});