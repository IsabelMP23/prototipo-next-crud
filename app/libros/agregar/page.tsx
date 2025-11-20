"use client";

import { useRouter} from "next/navigation";
import { useRef } from "react";
import FormLibro from "@/app/components/FormLibro";

export default function NuevoLibro() {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  async function handleCreate(data: unknown) {
    await fetch("/api/libros", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    dialogRef.current?.showModal();
  }

  return (
    <>
      <section
        className="p-8 w-full max-w-7xl"
        aria-label="Formulario de agregar libro"
      >
        <div className="bg-white p-6 rounded-2xl shadow-lx">
          <h1 className="text-2xl mb-4 text-black font-bold">Agregar libro</h1>
          <FormLibro onSubmit={handleCreate} />
        </div>
      </section>

      <dialog
        ref={dialogRef}
        className=" inset-0 m-auto rounded-xl p-6 text-center shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm animate-fade-in"
      >
        <h3 className="text-xl font-bold text-black mb-3">¡Libro agregado!</h3>
        <p className="mb-4">El libro se agregó correctamente</p>

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
