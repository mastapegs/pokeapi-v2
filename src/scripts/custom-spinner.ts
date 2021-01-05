import {
  LitElement,
  html,
  customElement,
  TemplateResult,
  CSSResult,
  css,
} from 'lit-element';

@customElement('custom-spinner')
export default class CustomSpinner extends LitElement {
  static get styles(): CSSResult {
    return css`
      :host {
        position: relative;
        display: inline-block;
        width: 100px;
        height: 100px;
        margin: 2rem;
      }
      .box {
        height: 100%;
        width: 100%;
        position: absolute;
      }
      .red {
        background-color: rgba(255, 0, 0, 0.7);
        transform: rotate(0deg);
      }
      .green {
        background-color: rgba(0, 255, 0, 0.7);
        transform: rotate(120deg);
      }
      .blue {
        background-color: rgba(0, 0, 255, 0.7);
        transform: rotate(240deg);
      }
    `;
  }

  render(): TemplateResult {
    return html`<div class="box red"></div>
      <div class="box blue"></div>
      <div class="box green"></div>`;
  }
}
