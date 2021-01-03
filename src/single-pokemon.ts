import {
  LitElement,
  html,
  customElement,
  property,
  TemplateResult,
} from 'lit-element';
import { until } from 'lit-html/directives/until';

@customElement('single-pokemon')
export default class SinglePokemon extends LitElement {
  @property({ type: Object }) pokemon = { name: '', url: '' };

  @property({ attribute: false })
  singlePokeResponse = this.getSinglePokemonData();

  private async getSinglePokemonData(): Promise<object> {
    console.log(this.pokemon.url);
    const response = await fetch(this.pokemon.url, {
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    console.log(data);
    return data;
  }

  render(): TemplateResult {
    return html`
      <div>
        <p>Name: ${this.pokemon.name}</p>
        <p>Link: <a href=${this.pokemon.url}>${this.pokemon.url}</a></p>
        ${until(
          this.singlePokeResponse
            .then(data => html`<pre>${data}</pre>`)
            .catch(error => html`<pre>${error}</pre>`),
          html`<p>Loading...</p>`
        )}
      </div>
    `;
  }
}
