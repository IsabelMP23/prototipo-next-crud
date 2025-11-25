import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full max-w-7xl">
      <nav className=" text-white p-4 flex justify-start items-center gap-8 w-full max-w-7xl">
        <Link href="/" className="uppercase font-bold text-2xl">Pokedex</Link>
      </nav>
    </header>
  );
}
