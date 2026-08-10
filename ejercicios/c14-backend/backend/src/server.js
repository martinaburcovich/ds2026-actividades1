const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get("/", (req, res) => {
  res.json({
    message: "API de la librería funcionando",
  });
});

app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");

    res.json({
      api: "ok",
      database: "ok",
    });
  } catch (error) {
    res.status(500).json({
      api: "ok",
      database: "error",
      message: error.message,
    });
  }
});

const libros = [
  {
    id: 1,
    titulo: "El principito",
    autor: "Antoine de Saint-Exupéry",
    precio: 4500,
    imagen:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=500&q=80",
    disponible: true,
  },
  {
    id: 2,
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    precio: 7800,
    imagen:
      "https://images.unsplash.com/photo-1511108690759-009324a90311?auto=format&fit=crop&w=500&q=80",
    disponible: true,
  },
  {
    id: 3,
    titulo: "Rayuela",
    autor: "Julio Cortázar",
    precio: 6900,
    imagen:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80",
    disponible: false,
  },
];

app.get("/libros", (_req, res) => {
  res.json(libros);
});

app.listen(PORT, () => {
  console.log(`Backend escuchando en http://localhost:${PORT}`);
});