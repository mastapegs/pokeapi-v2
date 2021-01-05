import {
  LitElement,
  html,
  customElement,
  TemplateResult,
  property,
  CSSResult,
  css,
} from 'lit-element';
import { until } from 'lit-html/directives/until';
import './single-pokemon.ts';

interface PokemonResponse {
  count: number | null;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

@customElement('app-component')
export default class AppComponent extends LitElement {
  static get styles(): CSSResult {
    return css`
      .grid-wrapper {
        display: grid;
        grid-template-columns: 1fr;
      }
      @media screen and (min-width: 480px) {
        .grid-wrapper {
          grid-template-columns: 1fr 1fr;
        }
      }
      @media screen and (min-width: 768px) {
        .grid-wrapper {
          grid-template-columns: 1fr 1fr 1fr;
        }
      }
    `;
  }

  @property() message = 'Pokemon!';

  @property({ attribute: false })
  pokemonResponse = AppComponent.getData();

  private static async getData(): Promise<PokemonResponse> {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon');
    const data = await response.json();
    return data;
  }

  render(): TemplateResult {
    return html` <h1>${this.message}</h1>
      <custom-spinner></custom-spinner>
      <div class="grid-wrapper">
        ${until(
          this.pokemonResponse.then(data =>
            data.results.map(
              pokemon =>
                html`<single-pokemon .pokemon=${pokemon}></single-pokemon>`
            )
          ),
          html`<p>Loading...</p>`
        )}
      </div>`;
  }
}
