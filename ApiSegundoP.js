const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

const users = [
  {
    nombre: "Samuel",
    apellido: "Acero García",
  },
  {
    nombre: "Darek",
    apellido: "Aljuri Martínez",
  },
  {
    nombre: "Andrés",
    apellido: "Azcona",
  },
  {
    nombre: "Juan Felipe",
    apellido: "Cepeda Uribe",
  },
  {
    nombre: "Ana María",
    apellido: "Chaves Pérez",
  },
  {
    nombre: "Carlos David",
    apellido: "Cruz Pavas",
  },
  {
    nombre: "Diego Norberto",
    apellido: "Díaz Algarín",
  },
  {
    nombre: "Jorge Esteban",
    apellido: "Díaz Bernal",
  },
  {
    nombre: "David Esteban",
    apellido: "Díaz Vargas",
  },
  {
    nombre: "Juan José",
    apellido: "Forero Peña",
  },
  {
    nombre: "Santiago",
    apellido: "Gutierrez De Piñeres Barbosa",
  },
  {
    nombre: "Samuel Esteban",
    apellido: "Lopez Huertas",
  },
  {
    nombre: "Michael Steven",
    apellido: "Medina Fernandez",
  },
  {
    nombre: "Katherin Juliana",
    apellido: "Moreno Carvajal",
  },
  {
    nombre: "Juan Pablo",
    apellido: "Moreno Patarroyo",
  },
  {
    nombre: "Nicolás Esteban",
    apellido: "Muñoz Sendoya",
  },
  {
    nombre: "Santiago",
    apellido: "Navarro Cuy",
  },
  {
    nombre: "Juan Pablo",
    apellido: "Parrado Morales",
  },
  {
    nombre: "Daniel Santiago",
    apellido: "Ramirez Chinchilla",
  },
  {
    nombre: "Juan Pablo",
    apellido: "Restrepo Coca",
  },
  {
    nombre: "Gabriela",
    apellido: "Reyes Gonzalez",
  },
  {
    nombre: "Juan José",
    apellido: "Rodriguez Falla",
  },
  {
    nombre: "Valentina",
    apellido: "Ruiz Torres",
  },
  {
    nombre: "Mariana",
    apellido: "Salas Gutierrez",
  },
  {
    nombre: "Sebastian",
    apellido: "Sanchez Sandoval",
  },
  {
    nombre: "Josue David",
    apellido: "Sarmiento Guarnizo",
  },
  {
    nombre: "Santiago",
    apellido: "Soler Prado",
  },
  {
    nombre: "Maria Fernanda",
    apellido: "Tamayo Lopez",
  },
  {
    nombre: "Deivid Nicolas",
    apellido: "Urrea Lara",
  },
];

app.get("/", (req, res) => {
  res.send(`Api de Samuel Esteban López`);
});

app.get("/coin/:coinName", async (req, res) => {
  const coinName = req.params.coinName.toLowerCase();

  try {
    const response = await axios.get(
      `https://api.coincap.io/v2/assets/${coinName}`
    );

    if (response.data.data) {
      const priceUsd = response.data.data.priceUsd;
      return res.send(
        `El precio en dólares de la moneda ${coinName} para el día de hoy es ${priceUsd}`
      );
    } else {
      return res
        .status(404)
        .send("El nombre de la moneda no fue encontrado en la base de datos");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error al obtener el precio de la moneda");
  }
});

app.get("/users/:count", (req, res) => {
  try {
    const count = parseInt(req.params.count); // Convertir el parámetro count a número
    const sort =
      req.query.sort &&
      (req.query.sort.toUpperCase() === "ASC" ||
        req.query.sort.toUpperCase() === "DESC")
        ? req.query.sort.toUpperCase()
        : "ASC";

    const sortedUsers =
      sort === "ASC" ? users.slice(0, count) : users.slice(-count).reverse();

    res.json(sortedUsers);
  } catch (error) {
    console.error("Error al procesar la solicitud de usuarios:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.post("/users", (req, res) => {
  try {
    const {
      nombre,
      apellido,
      correo,
      ciudad = "Bogotá",
      país = "Colombia",
    } = req.body;

    const newUser = { nombre, apellido, correo, ciudad, país };

    console.log("Nuevo usuario creado:", newUser);

    res.json(newUser);
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
