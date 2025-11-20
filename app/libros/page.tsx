"use client";
import Link from "next/link";
import BookCard from "../components/BookCard";
import { useEffect, useRef, useState } from "react";

type Libro = {
  id: string;
  titulo: string;
  autor: string;
  descripcion: string;
  imagen?: string;
};

export default function LibrosPage() {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    fetch("/api/libros")
      .then((res) => res.json())
      .then((data: Libro[]) => setLibros(data));
  }, []);

  function openDeleteDialog(id: string) {
    setSelectedId(id);
    dialogRef.current?.showModal();
  }

  function closeDialog() {
    dialogRef.current?.close();
    setSelectedId(null);
  }

  async function confirmDelete() {
    if (!selectedId) return;
    await fetch(`/api/libros/${selectedId}`, { method: "DELETE" });

    setLibros(libros.filter((x) => x.id !== selectedId));
    closeDialog();
  }

  const filtered = libros.filter((x) =>
    x.titulo.toLowerCase().includes(search.toLowerCase()));

  return (
    <main className="p-8 w-full max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Biblioteca Virtual</h1>
      <section
        aria-describedby="Controles de busqueda"
        className="flex flex-row w-full items-center justify-between mb-6"
      >
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar libros..."
          className="w-full p-2  border border-gray-300 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <Link href="/libros/agregar" className="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">
          Agregar
        </Link>
      </section>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {filtered.map((libro) => (
          <BookCard
            key={libro.id}
            id={libro.id}
            titulo={libro.titulo}
            autor={libro.autor}
            descripcion={libro.descripcion}
            imagen={libro.imagen}
            onDelete={() => openDeleteDialog(libro.id)}
          />
        ))}
      </div>
      <dialog
        ref={dialogRef}
        className="inset-0 m-auto rounded-xl p-6 text-center shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm animate-fade-in"
      >
        <h2 className="text-lg font-bold mb-4">¿Eliminar este libro?</h2>
        <p className="mb-6 text-gray-700">Esta acción no se puede deshacer.</p>

        <div className="flex justify-center gap-4">
          <button
            onClick={closeDialog}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer"
          >
            Cancelar
          </button>

          <button
            onClick={confirmDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
          >
            Eliminar
          </button>
        </div>
      </dialog>
    </main>
  );
}
