import Link from "next/link";

interface PageProps {
  params: {
    id: string; 
  };
}

export default async function DetalleLibro({ params }: PageProps) {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/libros/${id}`);
 

  if (!res.ok) {
    return (
      <main className="p-8 text-center">
        <h1 className="text-2xl font-bold text-red-500">Libro no encontrado</h1>
        <Link href="/libros" className="text-white bg-zinc-800 rounded px-4 py-2 hover:bg-zinc-600 mb-6 inline-block">
          ← Volver a la lista
        </Link>
      </main>
    );
  } 
  
  const libro = await res.json();

  return (
    <main className="w-full max-w-7xl mx-auto p-8">
      <Link href="/libros" className="text-white bg-zinc-800 rounded px-4 py-2 hover:bg-zinc-600 mb-6 inline-block">
        ← Volver a la lista
      </Link>

      <div className="bg-white shadow rounded-xl overflow-hidden">
        <div className="relative w-full h-80">
          <img src={libro.imagen} alt={libro.titulo} className="object-cover w-full h-full rounded-lg" />
        </div>

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2 text-black">{libro.titulo}</h1>
          <h2 className="text-lg text-gray-600 mb-4">Autor: {libro.autor}</h2>
          <p className="text-gray-700 leading-relaxed">{libro.descripcion}</p>
        </div>
      </div>
    </main>
  );
}