"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BookCard({
  id,
  titulo,
  autor,
  descripcion,
  imagen,
  onDelete,
}) {
  const router = useRouter();

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/libros/editar/${id}`);
  };

  return (
    <Link
      href={`/libros/${id}`}
      className="block border rounded-xl overflow-hidden shadow hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 bg-white relative z-0"
    >
      <div className="relative w-full h-64">
        <img
          src={imagen}
          alt={titulo}
          className="object-cover w-full h-full rounded-lg"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-1 text-black">{titulo}</h3>
        <p className="text-gray-600 mb-2">Autor: {autor}</p>
        <p className="text-gray-500 text-sm line-clamp-2">{descripcion}</p>
      </div>
      <div className="flex flex-row gap-2 absolute top-2 right-4 z-10">
        <button
          className="ml-4 bg-zinc-100 text-black px-4 py-2 rounded hover:text-white hover:bg-zinc-700 cursor-pointer"
          onClick={handleEdit}
        >
          <i className="fa-regular fa-pen-to-square"></i>
        </button>
        <button
          className=" bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete();
          }}
        >
          <i className="fa-regular fa-trash-can"></i>
        </button>
      </div>
    </Link>
  );
}
