import {NextResponse} from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "app", "data", "libros.json");

function readLibrosData() {
  const jsonData = fs.readFileSync(dataFilePath, "utf-8");
  return JSON.parse(jsonData);
}

function writeLibrosData(data: JSON) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> } ) {
    const { id } = await params;
    const libros = readLibrosData();
    const libro = libros.find((l: { id: string }) => l.id === id);
    if (!libro) {
        return NextResponse.json({ message: "Libro no encontrado" }, { status: 404 });
    }
    return NextResponse.json(libro);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> } ) {
    const { id } = await params;
    const updatedLibro = await request.json();
    const libros = readLibrosData();
    const libroIndex = libros.findIndex((l: { id: string }) => l.id === id);
    if (libroIndex === -1) {
        return NextResponse.json({ message: "Libro no encontrado" }, { status: 404 });
    }
    libros[libroIndex] = updatedLibro;
    writeLibrosData(libros);
    return NextResponse.json(updatedLibro);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> } ) {
    const { id } = await params;
    const libros = readLibrosData();
    const libroIndex = libros.findIndex((l: { id: string }) => l.id === id);    
    if (libroIndex === -1) {
        return NextResponse.json({ message: "Libro no encontrado" }, { status: 404 });
    }
    libros.splice(libroIndex, 1);
    writeLibrosData(libros);
    return NextResponse.json({ message: "Libro eliminado" });
}