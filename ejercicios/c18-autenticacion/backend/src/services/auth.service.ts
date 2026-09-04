import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma";
import { JWT_EXPIRES_IN, JWT_SECRET, SALT_ROUNDS } from "../config/env";
import type { Login, Registro } from "../validations/auth.validation";

const usuarioPublico = { id: true, email: true, nombre: true, rol: true, creadoEn: true } as const;

export async function registrar(datos: Registro) {
  const passwordHash = await bcrypt.hash(datos.password, SALT_ROUNDS);
  return prisma.usuario.create({
    data: { nombre: datos.nombre, email: datos.email, passwordHash },
    select: usuarioPublico,
  });
}

export async function login(datos: Login) {
  const usuario = await prisma.usuario.findUnique({
    where: { email: datos.email },
    omit: { passwordHash: false },
  });
  if (!usuario || !(await bcrypt.compare(datos.password, usuario.passwordHash))) return null;

  const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  const { passwordHash: _passwordHash, ...publico } = usuario;
  return { token, usuario: publico };
}

export async function findById(id: number) {
  return prisma.usuario.findUnique({ where: { id }, select: usuarioPublico });
}
