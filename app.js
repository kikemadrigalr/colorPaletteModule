import { getPokemon, renderPokemon, draw as pokemonDraw } from "./pokemon.js";
// import "./custom-properties.js";
//se puede importar custom-properties desde el index.html ya que es global.. app.js no depende  de este

const form = document.querySelector("#form");
form.addEventListener("submit", handleSubmit);

//capturar el evento submit y aplicar FormData
async function handleSubmit(event) {
  event.preventDefault();
  const data = new FormData(form);
  console.log("obtener datos Pokemon");
  const id = data.get("id");
  console.log("pokemon", id);
  const pokemon = await getPokemon(id);
  console.log("dibujar pokemon");
  const pokemonDrawed = await renderPokemon(pokemon);
  console.log("obtener paleta");
  const colors = pokemonDraw.colorPalette(90);
  updateProperties(colors);
}

//solo se toman los primeros tres colores que vienen en el arreglos, pueden ser muchos mas
function updateProperties(colors) {
  document.body.style.setProperty(
    "--primary",
    `rgb(${colors[0].red}, ${colors[0].green}, ${colors[0].blue})`
  );
  document.body.style.setProperty(
    "--secondary",
    `rgb(${colors[1].red}, ${colors[1].green}, ${colors[1].blue})`
  );
  document.body.style.setProperty(
    "--tertiary",
    `rgb(${colors[2].red}, ${colors[2].green}, ${colors[2].blue})`
  );
}
