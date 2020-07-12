import Draw from "./draw.js";

const draw = new Draw(canvas);

//conectarme al api y obtener el pokemon
async function getPokemon(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon = await response.json();
  return pokemon;
}

//dibujar pokemon en el canvas
async function renderPokemon(pokemon) {
  await draw.render(pokemon.sprites.front_default);
  return draw;
}

export { getPokemon, renderPokemon, draw };
