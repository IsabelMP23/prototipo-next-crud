import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
      <main className="flex w-full max-w-7xl flex-col lg:flex-row items-center justify-between md:justify-center py-20 px-16  flex-1">
        <div className="flex flex-col items-center justify-center gap-6 text-center sm:items-start sm:text-left flex-1">
          <h1 className="max-w-sm text-5xl font-semibold leading-10 tracking-tight text-zinc-50">
            Bienvenido a la Biblioteca Virtual
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-900 ">
             Explora nuestra colección de {" "}
            <Link href="/libros" className="font-medium text-zinc-950 dark:text-zinc-50">
              libros
            </Link>{" "}
            y conoce más sobre{" "}
            <span
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
               nosotros.
            </span>
          </p>
              <Link
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-black transition-colors hover:text-white hover:bg-[#383838] md:w-[158px]"
            href="/libros"
          >
            Explorar
          </Link>
        </div>
        <div>
          <Image
            src="/libros.webp"
            alt="Libros"
            width={700}
            height={400}
            priority
          />
        </div>
      </main>
  );
}
