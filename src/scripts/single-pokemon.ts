import {
  LitElement,
  html,
  customElement,
  property,
  TemplateResult,
  CSSResult,
  css,
} from 'lit-element';
import { until } from 'lit-html/directives/until';
import './custom-spinner.ts';

interface SinglePokemonResponse {
  name: string;
  moves: { move: { name: string; url: string } }[];
  types: { type: { name: string; url: string } }[];
  abilities: { ability: { name: string; url: string } }[];
  sprites: {
    front_default: string;
    back_default: string;
  };
}

@customElement('single-pokemon')
export default class SinglePokemon extends LitElement {
  static get styles(): CSSResult {
    return css`
      :host {
        padding: 1rem;
        margin: 0.3rem;
        background-color: white;
        border-radius: 20px;
        box-shadow: 1px 3px 7px hsla(0, 0%, 50%, 0.5);
      }
    `;
  }

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
                  <details>
                    <summary>Moves</summary>
                    <ul>
                      ${data.moves.map(
                        ({ move: { name, url } }) =>
                          html`<li><a href=${url}>${name}</a></li>`
                      )}
                    </ul>
                  </details>
                  <details ?open=${true}>
                    <summary>Types</summary>
                    <ul>
                      ${data.types.map(
                        ({ type: { name, url } }) =>
                          html`<li><a href=${url}>${name}</a></li>`
                      )}
                    </ul>
                  </details>
                  <details ?open=${true}>
                    <summary>Abilities</summary>
                    <ul>
                      ${data.abilities.map(
                        ({ ability: { name, url } }) =>
                          html`<li><a href=${url}>${name}</a></li>`
                      )}
                    </ul>
                  </details>
                `
            )
            .catch(error => html`<pre>${error}</pre>`),
          html`<p>Loading...</p>`
        )}
      </div>
    `;
  }
}
