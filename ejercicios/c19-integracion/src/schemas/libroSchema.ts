import { z } from 'zod'

export const libroSchema = z.object({
  titulo: z.string().trim().min(1, 'El título es obligatorio'),
  precio: z.number().int().positive('El precio debe ser mayor a 0'),
  imagen: z.url('Ingresá una URL válida'),
  disponible: z.boolean(),
  autorId: z.number().int().positive('El ID del autor es obligatorio'),
})

export type LibroValidado = z.infer<typeof libroSchema>
