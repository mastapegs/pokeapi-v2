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
        animation: spinner 4s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
      }
      .box {
        height: 100%;
        width: 100%;
        position: absolute;
        opacity: 1;
      }
      .red {
        background-color: rgb(255, 0, 0);
        transform: rotate(0deg);
      }
      .green {
        background-color: rgb(0, 255, 0);
        transform: rotate(120deg);
      }
      .blue {
        background-color: rgb(0, 0, 255);
        transform: rotate(240deg);
      }
      @keyframes spinner {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `;
  }

  render(): TemplateResult {
    return html` ${['red', 'green', 'blue'].map(
      color => html`<div class=${`box ${color}`}></div>`
    )}`;
  }
}
