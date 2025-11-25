import Image from "next/image";
import Link from "next/link";
import PokeballDecorative from "@/app/components/PokeballDecorative";

export default function Home() {
  return (
      <main className="flex w-full max-w-7xl flex-col lg:flex-row items-center justify-between md:justify-center py-20 px-16 flex-1 border-3 rounded-xl relative">
        <div className="flex flex-col items-center justify-center gap-6 text-center flex-1 relative ">
          <h1 className="max-w-sm text-8xl text-center font-semibold text-zinc-50 ">
            Pokedex
          </h1>
              <Link
            className="flex h-12 w-full items-center justify-center  rounded-full bg-foreground px-5 text-black transition-colors hover:text-white hover:bg-[#383838] md:w-[158px]"
            href="/Pokemons"
          >
            Explorar
          </Link>
        </div>

        <Image
          src="/gengar.gif"
          alt="Pokedex Image"
          width={600}
          height={600}
        />

        <PokeballDecorative top="0px" left="0px" bottom="auto" right="auto" rotate="-20deg" width={150} height={150} />
        <PokeballDecorative top="auto" left="10px" bottom="10px" right="auto" rotate="-20deg" width={100} height={100} opacity={0.8} />
        <PokeballDecorative top="10px" left="auto" bottom="auto" right="10px" rotate="20deg" width={100} height={100} opacity={0.8} />
        <PokeballDecorative top="auto" left="auto" bottom="5px" right="-10px" width={250} height={250} rotate="15deg" />

      </main>
  );
}
