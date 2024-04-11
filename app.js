const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(express.json());

// Función para obtener el precio de una moneda desde la API de CoinCap
async function getPriceOfCoin(coinName) {
    try {
        const response = await axios.get(`https://api.coincap.io/v2/assets/${coinName}`);
        
        if (response.data && response.data.data) {
            const coinData = response.data.data;
            const price = coinData.priceUsd;
            return `El precio en dólares de la moneda ${coinName} para el día de hoy es ${price}`;
        } else {
            throw new Error('El nombre de la moneda no fue encontrado en la base de datos');
        }
    } catch (error) {
        // MAnejo de errores 
        if (error.response && error.response.status === 404) {
            throw new Error('La moneda especificada no fue encontrada');
        } else {
            throw new Error('Ocurrió un error al obtener el precio de la moneda');
        }
    }
}

// Ruta para obtener el precio de una moneda
app.get('/coin/:coinName', async (req, res) => {
    const coinName = req.params.coinName;
    try {
        const coinPrice = await getPriceOfCoin(coinName);
        res.send(coinPrice);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

// Ejemplo de datos de usuarios
const users = [
    { id: 1, nombre: 'SAMUEL', apellido: 'Acero Garcia', ciudad: 'Bogotá', país: 'Colombia' },
    { id: 2, nombre: 'DAREK', apellido: 'Aljuri Martinez', ciudad: 'Medellín', país: 'Colombia' },
    { id: 3, nombre: 'JUAN FELIPE', apellido: 'Cepeda Uribe', ciudad: 'Cali', país: 'Colombia' },
    { id: 4, nombre: 'ANA MARIA', apellido: 'Chaves Perez', ciudad: 'Barranquilla', país: 'Colombia' },
    { id: 5, nombre: 'CARLOS DAVID', apellido: 'Cruz Pavas', ciudad: 'Bogotá', país: 'Colombia' },
    { id: 6, nombre: 'DIEGO NORBERTO', apellido: 'Diaz Algarin', ciudad: 'Medellín', país: 'Colombia' },
    { id: 7, nombre: 'JORGE ESTEBAN', apellido: 'Diaz Bernal', ciudad: 'Cali', país: 'Colombia' },
    { id: 8, nombre: 'DAVID ESTEBAN', apellido: 'Diaz Vargas', ciudad: 'Barranquilla', país: 'Colombia' },
    { id: 9, nombre: 'JUAN JOSE', apellido: 'Forero Peña', ciudad: 'Bogotá', país: 'Colombia' },
    { id: 10, nombre: 'SANTIAGO', apellido: 'Gutierrez De Piñeres Barbosa', ciudad: 'Medellín', país: 'Colombia' },
    { id: 11, nombre: 'SAMUEL ESTEBAN', apellido: 'Lopez Huertas', ciudad: 'Cali', país: 'Colombia' },
    { id: 12, nombre: 'MICHAEL STEVEN', apellido: 'Medina Fernandez', ciudad: 'Barranquilla', país: 'Colombia' },
    { id: 13, nombre: 'KATHERIN JULIANA', apellido: 'Moreno Carvajal', ciudad: 'Bogotá', país: 'Colombia' },
    { id: 14, nombre: 'JUAN PABLO', apellido: 'Moreno Patarroyo', ciudad: 'Medellín', país: 'Colombia' },
    { id: 15, nombre: 'NICOLAS ESTEBAN', apellido: 'Muñoz Sendoya', ciudad: 'Cali', país: 'Colombia' },
    { id: 16, nombre: 'SANTIAGO', apellido: 'Navarro Cuy', ciudad: 'Barranquilla', país: 'Colombia' },
    { id: 17, nombre: 'JUAN PABLO', apellido: 'Parrado Morales', ciudad: 'Bogotá', país: 'Colombia' },
    { id: 18, nombre: 'DANIEL SANTIAGO', apellido: 'Ramirez Chinchilla', ciudad: 'Medellín', país: 'Colombia' },
    { id: 19, nombre: 'JUAN PABLO', apellido: 'Restrepo Coca', ciudad: 'Cali', país: 'Colombia' },
    { id: 20, nombre: 'GABRIELA', apellido: 'Reyes Gonzalez', ciudad: 'Barranquilla', país: 'Colombia' },
    { id: 21, nombre: 'JUAN JOSE', apellido: 'Rodriguez Falla', ciudad: 'Bogotá', país: 'Colombia' },
    { id: 22, nombre: 'VALENTINA', apellido: 'Ruiz Torres', ciudad: 'Medellín', país: 'Colombia' },
    { id: 23, nombre: 'MARIANA', apellido: 'Salas Gutierrez', ciudad: 'Cali', país: 'Colombia' },
    { id: 24, nombre: 'SEBASTIAN', apellido: 'Sanchez Sandoval', ciudad: 'Barranquilla', país: 'Colombia' },
    { id: 25, nombre: 'JOSUE DAVID', apellido: 'Sarmiento Guarnizo', ciudad: 'Bogotá', país: 'Colombia' },
    { id: 26, nombre: 'SANTIAGO', apellido: 'Soler Prado', ciudad: 'Medellín', país: 'Colombia' },
    { id: 27, nombre: 'MARIA FERNANDA', apellido: 'Tamayo Lopez', ciudad: 'Cali', país: 'Colombia' },
    { id: 28, nombre: 'DEIVID NICOLAS', apellido: 'Urrea Lara', ciudad: 'Barranquilla', país: 'Colombia' },
    { id: 29, nombre: 'ANDRÉS', apellido: 'Azcona', ciudad: 'Bogotá', país: 'Colombia' }
];

// Ruta para obtener una lista de usuarios
app.get('/users/:count', (req, res) => {
    const count = parseInt(req.params.count);

    const sort = req.query.sort && (req.query.sort.toUpperCase() === 'ASC' || req.query.sort.toUpperCase() === 'DESC') ? req.query.sort.toUpperCase() : 'ASC';

    // Array clonade de usuarios para no modificar el original
    let userList = [...users];

    if (sort === 'ASC') {
        userList.sort((a, b) => (a.apellido > b.apellido) ? 1 : ((b.apellido > a.apellido) ? -1 : 0));
    } else {
        userList.sort((a, b) => (a.apellido < b.apellido) ? 1 : ((b.apellido < a.apellido) ? -1 : 0));
    }

    const limitedUsers = userList.slice(0, count);

    res.json(limitedUsers);
});

// Ruta para simular la creación de un usuario
app.post('/users', (req, res) => {
    // Parsear los datos del cuerpo de la solicitud
        const { nombre, apellido, correo, ciudad, país } = req.body;


    if (!nombre || !apellido || !correo) {
        return res.status(400).json({ error: 'Debe proporcionar nombre, apellido y correo electrónico' });
    }

    const user = {
        nombre,
        apellido,
        correo,
        ciudad: ciudad || 'Bogotá',
        país: país || 'Colombia'
    };

    res.json(user);
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});

