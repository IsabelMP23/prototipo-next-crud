import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full max-w-7xl">
      <nav className=" text-white p-4  flex justify-start gap-8 w-full max-w-7xl">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <Link href="/">Inicio</Link>
        <Link href="/libros">Libros</Link>
      </nav>
    </header>
  );
}
