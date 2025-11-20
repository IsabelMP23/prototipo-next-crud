"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import FormLibro from "@/app/components/FormLibro";

export default function EditLibroClient({ id }: { id: string }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [data, setData] = useState<{
    titulo: string;
    autor: string;
    descripcion: string;
    imagen: string;
  } | null>(null);

  useEffect(() => {
    fetch(`/api/libros/${id}`)
      .then((res) => res.json())
      .then(setData);
  }, [id]);

  async function handleUpdate(values: {
    titulo: string;
    autor: string;
    descripcion: string;
    imagen: string;
  }) {
    await fetch(`/api/libros/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    dialogRef.current?.showModal();
  }

  if (!data) return <p>Cargando...</p>;

  return (
    <>
      <section
        className="p-8 w-full max-w-7xl"
        aria-label="Formulario de edición de libro"
      >
        <div className="bg-white p-6 rounded-2xl shadow-lx">
          <h1 className="text-2xl mb-4 text-black font-bold">Editar libro</h1>
          <FormLibro initialData={data} onSubmit={handleUpdate} />
        </div>
      </section>

       <dialog
        ref={dialogRef}
        className=" inset-0 m-auto rounded-xl p-6 text-center shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm animate-fade-in"
      >
        <h3 className="text-xl font-bold text-black mb-3">
          ¡Libro actualizado!
        </h3>
        <p className="mb-4">Los cambios se guardaron correctamente</p>

        <form method="dialog">
          <button
            onClick={() => router.push("/libros")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Ver libros
          </button>
        </form>
      </dialog>
    </>
  );
}
