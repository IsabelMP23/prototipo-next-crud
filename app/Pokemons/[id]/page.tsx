import Link from "next/link";
import { getPokemonByName } from "../../services/pokeApi";
import Image from "next/image";
import PillType from "@/app/components/PillType";
import Badge from "@/app/components/Badge";
import SpritesCarousel from "@/app/components/SpritesCarousel";
import TitleBox from "@/app/components/TitleBox";

interface PageProps {
  params: {
    id: string;
  };
}

interface PokemonTypeInfo {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface PokemonMove {
  move: {
    name: string;
    url: string;
  };
  version_group_details: [];
}

interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export default async function DetallePokemon({ params }: PageProps) {
  const { id } = await params;
  const data = await getPokemonByName(id);

  if (!data) {
    return (
      <main className="p-8 text-center">
        <h1 className="text-2xl font-bold text-red-500">
          Pokemon no encontrado
        </h1>
        <Link
          href="/Pokemons"
          className="text-white bg-zinc-800 rounded px-4 py-2 hover:bg-zinc-600 mb-6 inline-block"
        >
          ← Volver a la lista
        </Link>
      </main>
    );
  }

  const pokemon = data;

  return (
    <main className="w-full max-w-7xl mx-auto p-6">
      <Link
        href="/Pokemons"
        className="text-white bg-zinc-800 rounded px-4 py-2 hover:bg-zinc-600 mb-6 inline-block"
      >
        ← Volver a la lista
      </Link>

      <section className="bg-white shadow rounded-xl overflow-hidden flex flex-col md:flex-row p-6">
        <article className="shadow rounded-xl overflow-hidden w-full md:min-w-56 md:w-1/3 p-2">
          <Badge>#{pokemon.order.toString().padStart(3, "0")}</Badge>
          <div className="p-4 flex flex-col lg:flex-row justify-between items-center">
            <h1 className="text-2xl font-bold text-black capitalize">
              {pokemon.name}
            </h1>
            <div className="flex flex-row gap-2 ">
              {pokemon.types.map((typeInfo: PokemonTypeInfo) => (
                <PillType key={typeInfo.slot} type={typeInfo.type.name} />
              ))}
            </div>
          </div>
          <div className="relative w-full h-72">
            <Image
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <div>
            <Badge>Sprites</Badge>
            <SpritesCarousel sprites={pokemon.sprites} />
            <div>
              <Badge>Grito</Badge>
              <div className="flex justify-center items-center py-3">
                <audio controls className="h-8">
                  <source
                    src={`https://play.pokemonshowdown.com/audio/cries/${pokemon.name.toLowerCase()}.mp3`}
                    type="audio/mpeg"
                  />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          </div>
        </article>
        <article className="shadow rounded-xl overflow-hidden flex-1 p-2">
          <div className="mb-2">
            <TitleBox>Estadisticas</TitleBox>
            <ul className="grid grid-cols-2 gap-1 justify-center items-center px-2">
              {pokemon.stats.map((statInfo: PokemonStat) => (
                <li
                  key={statInfo.stat.name}
                  className="mb-2 text-black border-b-2 rounded pb-1 border-gray-200"
                >
                  <span className="font-semibold capitalize">
                    {statInfo.stat.name}:
                  </span>{" "}
                  {statInfo.base_stat}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-2">
            <TitleBox>Informacion</TitleBox>
            <p className="text-black px-2">{pokemon.PokeEntry}</p>
          </div>
          <div>
            <TitleBox>Habilidades</TitleBox>
            <ul className="grid grid-cols-2 gap-1 justify-center items-center px-2">
              {pokemon.abilities.map((abilityInfo: PokemonAbility) => (
                <li
                  key={abilityInfo.ability.name}
                  className="mb-2 text-black border-b-2 rounded pb-1 border-gray-200 capitalize"
                >
                  {abilityInfo.ability.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <TitleBox>Movimientos</TitleBox>
            <div className="max-h-48 overflow-y-auto px-2">
              <ul className="grid grid-cols-2 gap-1 justify-center items-center">
                {pokemon.moves.map((moveInfo: PokemonMove) => (
                  <li
                    key={moveInfo.move.name}
                    className="mb-2 text-black border-b-2 rounded pb-1 border-gray-200 capitalize"
                  >
                    {moveInfo.move.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
