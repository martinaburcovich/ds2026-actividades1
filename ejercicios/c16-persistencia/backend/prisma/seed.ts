import { prisma } from "../src/config/prisma";

const libros = [
  {
    titulo: "El principito",
    autor: "Antoine de Saint-Exupéry",
    precio: 4500,
    imagen:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80",
    disponible: true,
  },
  {
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    precio: 7800,
    imagen:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80",
    disponible: true,
  },
  {
    titulo: "Rayuela",
    autor: "Julio Cortázar",
    precio: 6900,
    imagen:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80",
    disponible: false,
  },
];

const autores = [
  {
    nombre: "Antoine de Saint-Exupéry",
    nacionalidad: "Francia",
  },
  {
    nombre: "Gabriel García Márquez",
    nacionalidad: "Colombia",
  },
  {
    nombre: "Julio Cortázar",
    nacionalidad: "Argentina",
  },
];

async function main() {
  await prisma.libro.createMany({
    data: libros,
  });

  await prisma.autor.createMany({
    data: autores,
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });