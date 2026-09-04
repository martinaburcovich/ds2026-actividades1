import bcrypt from "bcrypt";
import { prisma } from "../src/config/prisma";
import { SALT_ROUNDS } from "../src/config/env";

const autores = [
  { nombre: "Antoine de Saint-Exupéry", nacionalidad: "Francia" },
  { nombre: "Gabriel García Márquez", nacionalidad: "Colombia" },
  { nombre: "Julio Cortázar", nacionalidad: "Argentina" },
];
const categorias = [{ nombre: "Novela" }, { nombre: "Clásico" }, { nombre: "Infantil" }];
const libros = [
  { titulo: "El principito", autor: "Antoine de Saint-Exupéry", precio: 4500, imagen: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80", disponible: true, categorias: ["Infantil", "Clásico"] },
  { titulo: "Cien años de soledad", autor: "Gabriel García Márquez", precio: 7800, imagen: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80", disponible: true, categorias: ["Novela", "Clásico"] },
  { titulo: "Rayuela", autor: "Julio Cortázar", precio: 6900, imagen: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80", disponible: false, categorias: ["Novela", "Clásico"] },
];
const usuarios = [
  { email: "admin@libreria.test", nombre: "Admin", rol: "ADMIN" as const, password: "Admin1234" },
  { email: "cliente@libreria.test", nombre: "Cliente", rol: "CLIENTE" as const, password: "Cliente1234" },
];

async function main() {
  await prisma.autor.createMany({ data: autores, skipDuplicates: true });
  await prisma.categoria.createMany({ data: categorias, skipDuplicates: true });
  for (const { autor, categorias, ...datos } of libros) {
    const existente = await prisma.libro.findFirst({ where: { titulo: datos.titulo } });
    if (!existente) {
      await prisma.libro.create({ data: { ...datos, autor: { connect: { nombre: autor } }, categorias: { connect: categorias.map((nombre) => ({ nombre })) } } });
    }
  }
  for (const { password, ...datos } of usuarios) {
    await prisma.usuario.upsert({
      where: { email: datos.email },
      update: {},
      create: { ...datos, passwordHash: await bcrypt.hash(password, SALT_ROUNDS) },
    });
  }
}

main().catch((error) => { console.error(error); process.exit(1); }).finally(async () => prisma.$disconnect());
