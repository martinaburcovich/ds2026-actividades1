import { Request, Response } from "express";
import * as categoriaService from "../services/categoria.service";

export async function getAll(_req: Request, res: Response) {
  return res.json(await categoriaService.findAll());
}

export async function getById(req: Request, res: Response) {
  const categoria = await categoriaService.findById(Number(req.params.id));

  if (!categoria) {
    return res.status(404).json({ error: "Categoría no encontrada" });
  }

  return res.json(categoria);
}

export async function create(req: Request, res: Response) {
  return res.status(201).json(await categoriaService.create(req.body));
}

export async function update(req: Request, res: Response) {
  return res.json(
    await categoriaService.update(Number(req.params.id), req.body)
  );
}

export async function remove(req: Request, res: Response) {
  await categoriaService.remove(Number(req.params.id));
  return res.status(204).send();
}