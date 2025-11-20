import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const dataFilePath = path.join(process.cwd(), "app", "data", "libros.json");

function readLibrosData() {
  const jsonData = fs.readFileSync(dataFilePath, "utf-8");
  return JSON.parse(jsonData);
}

function writeLibrosData(data: JSON) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  const libros = readLibrosData();
  return NextResponse.json(libros);
}

export async function POST(request: Request) {
  const data = await request.json();
  const libros = readLibrosData();
  const newLibro = {
    id: crypto.randomUUID(),
    ...data
  }
  
  libros.push(newLibro);
  writeLibrosData(libros);
  return NextResponse.json(newLibro, { status: 201 });
}


