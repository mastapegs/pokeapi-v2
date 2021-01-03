import {
  LitElement,
  html,
  customElement,
  TemplateResult,
  property,
} from 'lit-element';
import { until } from 'lit-html/directives/until';

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
  @property() message = 'Hello, World!';

  @property({ attribute: false })
  pokemonResponse: Promise<PokemonResponse> = AppComponent.getData();

  private static async getData(): Promise<PokemonResponse> {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon');
    const data = await response.json();
    return data;
  }

  render(): TemplateResult {
    return html` <h1>${this.message}</h1>
      ${until(
        this.pokemonResponse.then(
          data => html`<pre>${JSON.stringify(data, null, 2)}</pre>`
        ),
        html`<p>Loading...</p>`
      )}`;
  }
}
