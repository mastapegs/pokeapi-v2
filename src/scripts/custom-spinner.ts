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
        opacity: 0.5;
        border-radius: 10%;
      }
      .red {
        background-color: hsl(0, 100%, 50%);
        transform: rotate(0deg);
      }
      .orange {
        background-color: hsl(30, 100%, 50%);
        transform: rotate(15deg);
      }
      .yellow {
        background-color: hsl(60, 100%, 50%);
        transform: rotate(30deg);
      }
      .green {
        background-color: hsl(120, 100%, 50%);
        transform: rotate(45deg);
      }
      .blue {
        background-color: hsl(240, 100%, 50%);
        transform: rotate(60deg);
      }
      .clear {
        background-color: hsla(0, 0%, 0%, 1);
        transform: rotate(75deg);
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
    return html` ${['red', 'orange', 'yellow', 'green', 'blue', 'clear'].map(
      color => html`<div class=${`box ${color}`}></div>`
    )}`;
  }
}
