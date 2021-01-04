import {
  LitElement,
  html,
  customElement,
  property,
  TemplateResult,
} from 'lit-element';
import { until } from 'lit-html/directives/until';

interface SinglePokemonResponse {
  name: string;
  sprites: {
    front_default: string;
    back_default: string;
  };
}

@customElement('single-pokemon')
export default class SinglePokemon extends LitElement {
  @property({ type: Object }) pokemon = { name: '', url: '' };

  @property({ attribute: false })
  singlePokeResponse = this.getSinglePokemonData();

  private async getSinglePokemonData(): Promise<SinglePokemonResponse> {
    await new Promise(r => setTimeout(r, 0));
    const response = await fetch(this.pokemon.url);
    const data = await response.json();
    return data;
  }

  render(): TemplateResult {
    return html`
      <div>
        ${until(
          this.singlePokeResponse
            .then(
              data =>
                html`
                  <p>Name: ${data.name}</p>
                  <p>
                    Link: <a href=${this.pokemon.url}>${this.pokemon.url}</a>
                  </p>
                  <details>
                    <summary>Data From Pokemon URL</summary>
                    <pre>${JSON.stringify(data, null, 2)}</pre>
                  </details>
                  <img src=${data.sprites.front_default} />
                  <img src=${data.sprites.back_default} />
                `
            )
            .catch(error => html`<pre>${error}</pre>`),
          html`<p>Loading...</p>`
        )}
      </div>
    `;
  }
}
