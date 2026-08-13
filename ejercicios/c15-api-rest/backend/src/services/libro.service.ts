import { Libro } from "../types/libro.types";

const libros: Libro[] = [
  {
    id: 1,
    titulo: "El principito",
    autor: "Antoine de Saint-Exupéry",
    precio: 4500,
    imagen:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80",
    disponible: true,
  },
  {
    id: 2,
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    precio: 7800,
    imagen:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80",
    disponible: true,
  },
  {
    id: 3,
    titulo: "Rayuela",
    autor: "Julio Cortázar",
    precio: 6900,
    imagen:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80",
    disponible: false,
  },
];

let proximoId = 4;

export function findAll(disponible?: boolean): Libro[] {
  if (disponible === undefined) {
    return libros;
  }

  return libros.filter((libro) => libro.disponible === disponible);
}

export function findById(id: number): Libro | undefined {
  return libros.find((libro) => libro.id === id);
}

export function create(datos: Omit<Libro, "id">): Libro {
  const nuevo: Libro = {
    id: proximoId++,
    ...datos,
  };

  libros.push(nuevo);
  return nuevo;
}

export function update(
  id: number,
  datos: Omit<Libro, "id">,
): Libro | undefined {
  const posicion = libros.findIndex((libro) => libro.id === id);

  if (posicion === -1) {
    return undefined;
  }

  libros[posicion] = {
    id,
    ...datos,
  };

  return libros[posicion];
}

export function remove(id: number): boolean {
  const posicion = libros.findIndex((libro) => libro.id === id);

  if (posicion === -1) {
    return false;
  }

  libros.splice(posicion, 1);
  return true;
}