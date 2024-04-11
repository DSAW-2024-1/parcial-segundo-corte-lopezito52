const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

const users = [
  {
    nombre: "Juan",
    apellido: "Perez",
    correo: "juan@example.com",
    ciudad: "Bogotá",
    país: "Colombia",
  },
  {
    nombre: "María",
    apellido: "Gomez",
    correo: "maria@example.com",
    ciudad: "Medellín",
    país: "Colombia",
  },
  {
    nombre: "Pedro",
    apellido: "Ramirez",
    correo: "pedro@example.com",
    ciudad: "Barranquilla",
    país: "Colombia",
  },
];

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
    const count = parseInt(req.params.count);
    const sort =
      req.query.sort &&
      (req.query.sort.toUpperCase() === "ASC" ||
        req.query.sort.toUpperCase() === "DESC")
        ? req.query.sort.toUpperCase()
        : "ASC";

    const allUsers = [...users];

    const sortedUsers =
      sort === "ASC"
        ? allUsers.sort((a, b) => a.apellido.localeCompare(b.apellido))
        : allUsers.sort((a, b) => b.apellido.localeCompare(a.apellido));

    res.json(sortedUsers.slice(0, count));
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
    users.push(newUser);

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
