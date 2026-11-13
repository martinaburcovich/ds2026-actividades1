import express from "express";
import cors from "cors";
import libroRoutes from "./routes/libro.routes";
import autorRoutes from "./routes/autor.routes";
import categoriaRoutes from "./routes/categoria.routes";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middlewares/error.middleware";
import { z } from "zod";

const app = express();
const PORT = Number(process.env.PORT ?? 3000);
const corsOptions = {
  origin: [process.env.FRONTEND_URL ?? "http://localhost:5173"],
};

z.config(z.locales.es());

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    mensaje: "API de la Librería funcionando",
  });
});

app.use("/api/libros", libroRoutes);
app.use("/api/autores", autorRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/auth", authRoutes);

app.use((_req, res) => {
  res.status(404).json({ error: "Recurso no encontrado" });
});

app.use(errorHandler);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
