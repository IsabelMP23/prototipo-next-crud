import axios from "axios";

type FlavorTextEntry = {
  flavor_text: string;
  language: { name: string };
};

type PokemonType = {
  type: {
    name: string;
  };
};

const pokeApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

//Obtener la lista de pokemones
export const getPokemons = async (limit: number = 20, offset: number = 0) => {
  const response = await pokeApi.get(`/pokemon?limit=${limit}&offset=${offset}`);
  const lista = response.data.results;

  const pokemonDetails = await Promise.all(
    lista.map(async (pokemon: { name: string; url: string }) => {
      const detailsResponse = await pokeApi.get(pokemon.url);
      return {
        id: detailsResponse.data.id,
        order: detailsResponse.data.order,
        name: detailsResponse.data.name,
        imagen: detailsResponse.data.sprites.other["official-artwork"].front_default,
        types: detailsResponse.data.types.map((t: PokemonType) => t.type.name),
      };
    })
  );

  return pokemonDetails;
}

//Obtener detalles de un pokemon por su nombre
export const getPokemonByName = async (name: string) => {
  const response = await pokeApi.get(`/pokemon/${name}`);
  const pokemon = response.data;

  const pokeEntryResponse = await pokeApi.get(pokemon.species.url);
  const entry = pokeEntryResponse.data

  const SpanishEntry = entry.flavor_text_entries.find(
    (flavor: FlavorTextEntry) => flavor.language.name === "es"
  );

  const PokeEntry = SpanishEntry ? SpanishEntry.flavor_text : "No disponible";

  return { ...pokemon, PokeEntry
  };

}