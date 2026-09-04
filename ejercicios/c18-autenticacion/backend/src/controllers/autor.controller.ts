import { Request, Response } from "express";
import * as autorService from "../services/autor.service";
export async function getAll(_req: Request, res: Response) { return res.json(await autorService.findAll()); }
export async function getById(req: Request, res: Response) {
  const autor = await autorService.findById(Number(req.params.id));
  if (!autor) return res.status(404).json({ error: "Autor no encontrado" });
  return res.json(autor);
}
export async function create(req: Request, res: Response) { return res.status(201).json(await autorService.create(req.body)); }
export async function update(req: Request, res: Response) { return res.json(await autorService.update(Number(req.params.id), req.body)); }
export async function remove(req: Request, res: Response) { await autorService.remove(Number(req.params.id)); return res.status(204).send(); }
