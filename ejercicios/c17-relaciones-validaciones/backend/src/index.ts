import express from "express";
import libroRoutes from "./routes/libro.routes";
import autorRoutes from "./routes/autor.routes";
import categoriaRoutes from "./routes/categoria.routes";
import { errorHandler } from "./middlewares/error.middleware";
import { z } from "zod";

const app = express();
const PORT = 3000;

z.config(z.locales.es());

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    mensaje: "API de la Librería funcionando",
  });
});

app.use("/api/libros", libroRoutes);
app.use("/api/autores", autorRoutes);
app.use("/api/categorias", categoriaRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});