"use client";
import Link from "next/link";
import Image from "next/image";
import PillType from "../components/PillType.jsx";

export default function PokeCard({
  id,
  name,
  imagen,
  types,
}) {
  return (
    <Link
      href={`/Pokemons/${name}`}
      className="block border rounded-xl overflow-hidden shadow hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 bg-white relative z-0"
    >
      <div>
        <span className="absolute top-2 left-2 bg-white/70 text-black text-sm font-mono font-bold px-2 py-1 rounded-lg z-10 shadow">#{id}</span>
      </div>
      <div className=" w-full h-64 flex items-center justify-center bg-gray-100">
        <Image src={imagen} alt={name} width={220} height={220} />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-1 text-black capitalize">{name}</h3>
        <div className="flex space-x-2">
          {types.map((type) => (
            <PillType key={type} type={type} />
          ))}
        </div>
      </div>
    </Link>
  );
}
