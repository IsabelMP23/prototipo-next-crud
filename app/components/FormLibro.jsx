"use client";
import { useState } from "react";

export default function FormLibro({ initialData = {}, onSubmit }) {
  const [form, setForm] = useState({
    titulo: "",
    autor: "",
    descripcion: "",
    imagen: "",
    ...initialData,
  });

  const [errors, setErrors] = useState({});
  
  function validate() {
    const newErrors = {};

    const fields = [
      { name: "titulo", message: "El título es obligatorio." },
      { name: "autor", message: "El autor es obligatorio." },
      { name: "descripcion", message: "La descripción es obligatoria." },
      { name: "imagen", message: "La URL de la imagen es obligatoria." },
    ]
    
    fields.forEach(({ name, message }) => {
      if (!form[name] || form[name].trim() === "") {
        newErrors[name] = message;
      }
    });


    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const validateErrors = validate();
    setErrors(validateErrors);

    if (Object.keys(validateErrors).length === 0) {
      onSubmit(form);
    }
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3"
    >
      <label htmlFor="titulo" className="text-black flex flex-col gap-1">
        Título
        <input
          id="titulo"
          name="titulo"
          placeholder="Título"
          value={form.titulo}
          onChange={handleChange}
          className={`border p-2 rounded border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
            errors.titulo ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.titulo && <span className="text-red-500 text-sm">{errors.titulo}</span>}
      </label>

      <label htmlFor="autor" className="text-black flex flex-col">
        Autor
        <input
        id="autor"
        name="autor"
        placeholder="Autor"
        value={form.autor}
        onChange={handleChange}
        className={`border p-2 rounded border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
            errors.autor ? "border-red-500" : "border-gray-300"
          }`}
      />
      {errors.autor && <span className="text-red-500 text-sm">{errors.autor}</span>}
      </label>
      
      <label htmlFor="descripcion" className="text-black flex flex-col">
        Descripción 
        <textarea
        id="descripcion"
        name="descripcion"
        placeholder="Descripción"
        value={form.descripcion}
        onChange={handleChange}
        className={`border p-2 rounded border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
            errors.descripcion ? "border-red-500" : "border-gray-300"
          }`}
      />
      {errors.descripcion && <span className="text-red-500 text-sm">{errors.descripcion}</span>}
      </label>
     
      <label htmlFor="imagen" className="text-black flex flex-col">
        URL Imagen
        <input
        id="imagen"
        name="imagen"
        placeholder="URL Imagen"
        value={form.imagen}
        onChange={handleChange}
        className={`border p-2 rounded border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
            errors.imagen ? "border-red-500" : "border-gray-300"
          }`}
      />
      {errors.imagen && <span className="text-red-500 text-sm">{errors.imagen}</span>}
      </label>
      
      <button className="bg-blue-500 text-white py-2 px-8 rounded-xl self-center cursor-pointer hover:bg-blue-400">Guardar</button>
    </form>
  );
}
