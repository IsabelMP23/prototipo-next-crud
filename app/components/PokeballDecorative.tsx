import Image from "next/image";

interface PokeballDecorativeProps {
  width?: number;
  height?: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  rotate?: string;
  opacity?: number;
}

export default function PokeballDecorative({
  width = 200,
  height = 200,
  top,
  bottom,
  left,
  right,
  rotate = "0deg",
  opacity = 0.2,
}: PokeballDecorativeProps) {
  return (
    <Image
      src="/pokeball.png"
      alt="Pokebola decorativa"
      width={width}
      height={height}
      style={{
        position: "absolute",
        top,
        bottom,
        left,
        right,
        opacity,
        transform: `rotate(${rotate})`,
      }}
    />
  );
}