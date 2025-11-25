export default function PillType({ type }) {   
    const typeColors = {  
        normal: "bg-gray-400",
        fire: "bg-amber-600",
        water: "bg-cyan-700",
        electric: "bg-yellow-500",
        grass: "bg-emerald-600",
        ice: "bg-cyan-600",
        fighting: "bg-amber-800",
        poison: "bg-indigo-500",
        ground: "bg-yellow-600",
        flying: "bg-indigo-300",
        psychic: "bg-pink-500",
        bug: "bg-lime-500",
        rock: "bg-yellow-800",
        ghost: "bg-indigo-800",
        dragon: "bg-purple-800",
        dark: "bg-gray-800",
        steel: "bg-gray-500",
        fairy: "bg-pink-300",
     }
    const bgColor = typeColors[type.toLowerCase()] || "bg-gray-200";

    return (
        <span className={`px-3 py-1 rounded-full text-sm font-medium  text-white capitalize  ${bgColor}`}>
            {type}
        </span>
    );
}