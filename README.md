Proyecto 6: Aplicación Backend con Autenticación
Tabla de Contenidos
1.	Requisitos
2.	Introducción
3.	Instalación
4.	Estructura del Proyecto
5.	Implementación de Archivos y Componentes
6.	Funcionamiento
________________________________________
Requisitos
•	NodeJS
•	Express
•	Bcryptjs
•	jsonwebtoken
•	Cors
•	dotenv
•	mongoose
•	nodemon
________________________________________
Introducción
•	En este proyecto, se construyó una aplicación backend donde se verán los pasos para hacer crear dos colecciones, una de clientes y una de productos, el código también incluye procesos de registro y login de clientes, así como también de autenticación y uso de tokens, usando JWT (JSON Web Tokens). Así mismo, se usará MongoDB y Mongoose, para el manejo de datos.

•	Se usará OpenAPI y Swagger para documentar tu aplicación, y tu código deberá seguir una estructura de carpetas clara con controladores, modelos y rutas. Finalmente, desplegaremos la aplicación a través de render.com y MongoDB Atlas.
________________________________________
Instalación
1.	Clonar el repositorio:
git clone https://github.com/usuario/mongodb-proyecto6
2.	Acceder al directorio del proyecto:
cd mongodb-proyecto6
3.	Instalar las dependencias:
npm install

4.	Configurar el archivo .env: Crear un archivo .env con el siguiente contenido:
PORT=3003
MONGODB_URI=mongodb+srv://jimenaespinoza:admin@bootcampudd.1qx3j.mongodb.net/?retryWrites=true&w=majority&appName=BOOTCAMPUDD
SECRET=UCAMP

URL_BD=mongodb://localhost:27017/merchandise_db

5.	Ejecutar la aplicación:
npm start
________________________________________
Estructura del Proyecto
📦 mongodb-proyecto6
├── 📂 config
│   ├── db.js
│   📂 controllers
│   ├── articlesController.js
│   ├── clientController.js
│   📂 middleware
│   ├──authorization.js
│   📂 models
│   ├── Articles.js
│   ├── Clients.js
│   📂 node_modules
│   📂 routes
│   ├── articlesRoutes.jsx
│   ├── clientRoutes.jsx
├── 📜 .env
├── 📜 .gitignore
├── 📜 package-lock.json
├── 📜 package.json
├── 📜 server.js

________________________________________
Implementación de Archivos y Componentes
1.1. server.js
El archivo server.js configura un servidor con Node.js y Express. El archivo configura los endpoints que usa para gestionar los artículos y los clientes mediante diversas rutas, realizando las distintas importaciones necesarias y conectando la base de datos a MongoDB, mediante la función connectDB(), asegurando el acceso a la información almacenada.
•	Rutas disponibles:
o	/api/articles → Gestión de artículos.
o	/api/clients → Gestión de clientes.
El servidor se ejecuta en el puerto definido en .env o en el 3004 por defecto.
________________________________________
1.2. Definición de los modelos en carpeta models
En carpeta models, se define la información que entregaremos tanto para el archivo Article.js como para el archivo Client.js. El código en estos dos archivos, se usará en carpeta controllers y en carpeta routes, para los distintos endpoints. 
En Article.js 
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    Timestamp: {
        type: Date,
        default: Date.now
    }
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article; 



En Client.js
const mongoose = require("mongoose")

const clientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    password:{
        type: String,
        required: true
    }
}, {
    timestamps: true
});
const Client = mongoose.model("clients", clientSchema);

module.exports = Client;

________________________________________
1.3. Carpeta controllers
En la carpeta controllres, se definen las funciones que procesan las solicitudes del cliente y gestionan la interacción con la base de datos a través de los modelos. Es decir, los controladores actúan como intermediarios entre las rutas y la base de datos.
1. articlesController.js
Este archivo maneja todas las operaciones relacionadas con los artículos en la base de datos. Contiene las siguientes funciones:
•	getArticles: Obtiene todos los artículos almacenados en la base de datos.
•	getArticlesById: Busca y devuelve un artículo específico según su ID.
•	createArticle: Crea un nuevo artículo con los datos proporcionados en la solicitud.
•	updateArticleById: Modifica un artículo existente usando su ID.
•	deleteArticleById: Elimina un artículo específico según su ID.

const Article = require('../models/Articles');

exports.getArticles = async (req, res) => { 
    try {
        const articles = await Article.find({});
        return res.json(articles);
    } catch (error) {
        res.status(500).json({ message: 'There was an error fetching the article', error });
    }
}

exports.getArticlesById = async (req, res) => { 
    try {
        const { id } = req.params;
        const article = await Article.findById(id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        return res.json(article);
    } catch (error) {
        res.status(500).json({ message: 'There was an error fetching the article', error });
    }
}

exports.createArticle = async (req, res) => { 
    const { name, price, size } = req.body;
    try {
        const newArticle = await Article.create({ name, price, size  });
        return res.json(newArticle);
    } catch (error) {
        res.status(500).json({ message: 'Error creating article', error });
    }
}

exports.updateArticleById = async (req, res) => { 
    try {
        const { id } = req.params;
        const { name, price, size } = req.body;
        const updateArticle = await Article.findByIdAndUpdate(id, { name, price, size}, { new: true });
        res.json({updateArticle});
    } catch (error) {
        res.status(500).json({ message: 'There was an error updating the information', error });
    }
};

exports.deleteArticleById = async (req, res) => { 
    try {
        const { id } = req.params;
        const articleDeleted = await Article.findByIdAndDelete(id);
        return res.json({ articleDeleted});
    } catch (error) {
        res.status(500).json({ message: 'There was an error, please try again.', error });
    }
};


Ejemplo de uso: Cuando un usuario solicita GET /api/articles/readall, esta petición se redirige al controlador, que accede a la base de datos y devuelve la lista de artículos.
________________________________________
2. clientController.js
Este archivo se encarga de la gestión de los clientes y la autenticación. Contiene las siguientes funciones:
•	getAllClients: Recupera y devuelve la lista de todos los clientes registrados.
•	deleteClientById: Elimina un cliente en base a su ID.
•	ClientRegistration: Registra un nuevo cliente, encriptando su contraseña antes de guardarla en la base de datos.
•	clientLogin: Verifica el usuario y contraseña, y genera un token JWT para autenticación.
•	ClientVerification: Permite verificar si un usuario autenticado es válido mediante su token JWT.
•	updateClientById: Modifica los datos de un cliente específico.

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Client = require('../models/Client');

exports.getAllClients = async (req, res) => {
    try {
        const users = await Client.find().select('-password');
        res.json({ users });
    } catch (error) {
        res.status(500).json({
            msg: "There was an error fetching the clients",
            error: error.message
        });
    }
};

exports.deleteClientById = async (req, res) => { 
    try {
        const { id } = req.params;
        const clientDeleted = await Client.findByIdAndDelete(id);
        return res.json({ clientDeleted});
    } catch (error) {
        res.status(500).json({ message: 'There was an error deleting the clients, please try again', error });
    }
};

exports.ClientRegistration = async (req, res) => { 
    const { name, username, email, password } = req.body    
    try {
        const salt = await bcryptjs.genSalt(10);
        console.log('salt =>', salt)
        const hashedPassword = await bcryptjs.hash(password, salt)
        const createdClient = await Client.create({
            name,
            username, 
            email, 
            password: hashedPassword
        })
        return res.json(createdClient);
    } catch (error) {
        return res.status(400).json({ msg: 'There was an error creating the data, please check the information provided' });
    }
};

exports.clientLogin = async (req, res) => { 
    const { username, password } = req.body;
    try {
        let foundCient = await Client.findOne({ username });
        if (!foundCient) {
            return res.status(400).json({ message: 'The username does not exist, verify information.' });
        }
        const correctPassword = await bcryptjs.compare(password, foundCient.password); 
        if (!correctPassword){
            return res.status(400).json({ message: 'The username or the password does not exist, please try again.' });
        }
        const payload = { user: {  id: foundCient.id } };
        jwt.sign(
            payload,
            process.env.SECRET,
            {
                expiresIn: 120
            },
            (error, token) => {
                if (error) throw error;
                res.json({ token });
            }
        )
    } catch (error) {
        res.json({
            message: "Something went wrong",
            error
        })
    }
}

exports.ClientVerification = async (req, res) => { 
    try {
        const client = await Client.findById(req.user.id).select('-password');
        res.json(client);
    } catch (error) {
        res.status(500).json({ message: "There was an error verifying client", error });
    }  
}

exports.updateClientById = async (req, res) => { 
    try {
        const { id } = req.params;
        const { name, username, email, password } = req.body;
        const updateArticle = await Article.findByIdAndUpdate(id, { name, username, email, password}, { new: true });
        res.json({updateArticle});
    } catch (error) {
        res.status(500).json({ message: 'There was an error updating the information', error });
    }
};

Ejemplo de uso: Cuando un usuario se registra enviando POST /api/clients/register, los datos llegan a ClientRegistration, donde se cifra la contraseña y se almacena el usuario en MongoDB.
________________________________________
1.4. Carpeta middleware
Su propósito principal es manejar la seguridad y la autenticación antes de que las solicitudes lleguen a los controladores.
En este caso, la carpeta contiene el archivo:
authorization.js
Este archivo define un middleware de autenticación, que verifica si una solicitud tiene un token JWT válido antes de permitir el acceso a ciertas rutas protegidas.
Cómo funciona el middleware de autorización
1.	Intercepta la solicitud y revisa si en los encabezados (headers) existe un campo llamado authorization.
2.	Verifica si el token está presente. Si no hay un token, devuelve un error 401 Unauthorized.
3.	Descompone el token para validar su formato (debe ser Bearer <token> o Token <token>).
4.	Decodifica el token usando la clave secreta (process.env.SECRET).
5.	Si el token es válido, extrae la información del usuario y la adjunta al objeto req para que los controladores puedan acceder a ella.
6.	Si el token es inválido o ha expirado, devuelve un error y no permite el acceso a la ruta.
Ejemplo de uso en las rutas
En el archivo clientRoutes.js, hay una ruta protegida:
js
CopiarEditar
clientRoutes.get('/verify-client', auth, ClientVerification);
Aquí, antes de ejecutar ClientVerification, el middleware auth se encarga de comprobar si el cliente tiene un token JWT válido. Si no lo tiene, la solicitud es rechazada con un mensaje de error. 
________________________________________
1.5. Carpeta routes
Esta carpeta maneja las rutas tanto para el archivo articleRoutes.js como para el archivo clientRoutes.js
Las rutas establecidas son distintas, según lo establecido en carpeta controllers, creando rutas para obtener información, agregar información, actualizarla y borrar (CRUD) 
Ejemplo de uso: 
ArticlesRoutes.post('/create', createArticle);  //localhost:3003/api/articles/create

________________________________________
2. Documentación
2.1. Render
El proyecto se desplegó en Render, siguiendo el link:
https://mongodb-proyecto6.onrender.com
2.2. Swagger
El proyecto incluye el archivo documentado en:
PROYECTO-6 MONGO.postman_collection.json-OpenApi3Yaml
________________________________________
3.2. Contacto
jimenaespinoza@gmail.com

