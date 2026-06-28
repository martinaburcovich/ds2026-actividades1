import { z } from 'zod'

export const libroSchema = z.object({
  isbn: z.string().trim().min(1, 'El ISBN es obligatorio'),
  titulo: z.string().trim().min(1, 'El título es obligatorio'),
  autor: z.string().trim().min(1, 'El autor es obligatorio'),
})

export type LibroValidado = z.infer<typeof libroSchema>