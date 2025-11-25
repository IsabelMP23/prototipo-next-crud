import PokeCard from "../components/PokeCard";
import { getPokemons } from "../services/pokeApi";
import { redirect } from "next/navigation";

export default async function PokemonPage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string };
}) {
  const params = await searchParams;
  const currentPage = Number(params.page ?? "1");
  const search = params.search?.toLowerCase() ?? "";

  if (isNaN(currentPage) || currentPage < 1) {
    return redirect("/Pokemons?page=1");
  }

  const limit = 16;
  const total = 151;
  const offset = (currentPage - 1) * limit;

  const data = search
    ? await getPokemons(151, 0)
    : await getPokemons(limit, offset);

  const totalPages = Math.ceil(total / limit);

  const normalize = (str: string) => str.trim().toLowerCase().normalize("NFKD");

  const filtered = data.filter((p) =>
    normalize(p.name).includes(normalize(search))
  );

  return (
    <main className="p-8 w-full max-w-7xl">
      <section
        aria-describedby="Controles de busqueda"
        className="flex flex-row w-full items-center justify-between mb-6"
      >
        <form
          action="/Pokemons"
          method="GET"
          className="w-full flex flex-row gap-2"
        >
          <input
            name="search"
            defaultValue={params.search ?? ""}
            type="text"
            placeholder="Buscar pokemon..."
            className="w-full p-2 border border-gray-300 rounded bg-white text-black 
                       focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          >
            Buscar
          </button>
        </form>
      </section>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {search && filtered.length === 0 ? (
          <p className="text-white text-lg col-span-full text-center">
            Pokémon no encontrado
          </p>
        ) : (
          (filtered.length > 0 ? filtered : data).map((pokemon) => (
            <PokeCard
              key={pokemon.id}
              id={pokemon.order}
              name={pokemon.name}
              imagen={pokemon.imagen}
              types={pokemon.types}
            />
          ))
        )}
      </div>
      {!search && filtered.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          {currentPage > 1 && (
            <a
              href={`/Pokemons?page=${currentPage - 1}`}
              className="px-4 py-2 bg-white text-black rounded-xl hover:bg-gray-200"
            >
              Anterior
            </a>
          )}

          <span className="text-white text-shadow-sm font-bold">
            Página {currentPage} de {totalPages}
          </span>

          {currentPage < totalPages && (
            <a
              href={`/Pokemons?page=${currentPage + 1}`}
              className="px-4 py-2 bg-white text-black rounded-xl hover:bg-gray-200"
            >
              Siguiente
            </a>
          )}
        </div>
      )}
    </main>
  );
}
