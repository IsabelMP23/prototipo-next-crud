import Image from "next/image";

export default function SpritesCarousel({ sprites }) {
  const spritesPokemon = Object.entries(sprites)
    .filter(([key, value]) => typeof value === "string" && value)
    .sort(([aKey], [bKey]) => {
      const aFront = aKey.startsWith("front");
      const bFront = bKey.startsWith("front");
      if (aFront && !bFront) return -1;
      if (!aFront && bFront) return 1;
      return 0;
    });
  return <div className="flex flex-row overflow-x-auto px-2 ">
    {spritesPokemon.map(([key, url]) => (
      <div className="relative w-22 h-22 shrink-0"
        key={key}>
        <Image
          src={url}
          alt={key}
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
    ))}
  </div>;
}
