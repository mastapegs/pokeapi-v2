import { LitElement, html, customElement } from 'lit-element';

@customElement('app-component')
export default class AppComponent extends LitElement {
  render() {
    return html` <h1>Hello, World!</h1> `;
  }
}
