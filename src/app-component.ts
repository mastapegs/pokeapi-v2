import { LitElement, html, customElement, TemplateResult } from 'lit-element';

@customElement('app-component')
export default class AppComponent extends LitElement {
  render(): TemplateResult {
    return html` <h1>Hello, World!</h1> `;
  }
}
