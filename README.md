# Proyecto 6: Aplicación Backend con Autenticación

## Tabla de Contenidos

1. [Requisitos](#requisitos)
2. [Introducción](#introducción)
3. [Instalación](#instalación)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Implementación de Archivos y Componentes](#implementación-de-archivos-y-componentes)
6. [Documentación](#documentación)
7. [Contacto](#contacto)

---

## Requisitos

Para ejecutar este proyecto, necesitas instalar los siguientes paquetes:

- NodeJS
- Express
- Bcryptjs
- jsonwebtoken
- Cors
- dotenv
- mongoose
- nodemon

---

## Introducción

Este proyecto consiste en una aplicación backend que implementa autenticación y gestiona dos colecciones: clientes y productos. Incluye procesos de:

- Registro y login de clientes.
- Autenticación mediante tokens JWT (JSON Web Tokens).
- Uso de MongoDB y Mongoose para la gestión de datos.
- Documentación con OpenAPI y Swagger.
- Despliegue en Render y MongoDB Atlas.

---

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/usuario/mongodb-proyecto6
   ```
2. Acceder al directorio del proyecto:
   ```bash
   cd mongodb-proyecto6
   ```
3. Instalar las dependencias:
   ```bash
   npm install
   ```
4. Configurar el archivo `.env`. Crear un archivo `.env` con el siguiente contenido:
   ```
   PORT=3003
   MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/?retryWrites=true&w=majority&appName=BOOTCAMPUDD
   SECRET=UCAMP
   URL_BD=mongodb://localhost:27017/merchandise_db
   ```
5. Ejecutar la aplicación:
   ```bash
   npm start
   ```

---

## Estructura del Proyecto

```
📦 mongodb-proyecto6
├── 📂 config
│   ├── db.js
│   📂 controllers
│   ├── articlesController.js
│   ├── clientController.js
│   📂 middleware
│   ├── authorization.js
│   📂 models
│   ├── Articles.js
│   ├── Clients.js
│   📂 node_modules
│   📂 routes
│   ├── articlesRoutes.js
│   ├── clientRoutes.js
├── 📜 .env
├── 📜 .gitignore
├── 📜 package-lock.json
├── 📜 package.json
├── 📜 server.js
```

---

## Implementación de Archivos y Componentes

### 1. `server.js`
Configura el servidor con Node.js y Express, definiendo los endpoints para gestionar los artículos y clientes.

#### Rutas disponibles:
- `/api/articles` → Gestión de artículos.
- `/api/clients` → Gestión de clientes.

El servidor se ejecuta en el puerto definido en `.env` o en el `3003` por defecto.

---

### 2. Modelos (`models/`)
Define la estructura de datos para artículos y clientes en MongoDB.

#### `Articles.js`
```js
const mongoose = require('mongoose');
const articleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});
const Article = mongoose.model('Article', articleSchema);
module.exports = Article;
```

#### `Clients.js`
```js
const mongoose = require("mongoose");
const clientSchema = mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
}, {
    timestamps: true
});
const Client = mongoose.model("clients", clientSchema);
module.exports = Client;
```

---

### 3. Controladores (`controllers/`)

Los controladores procesan las solicitudes del cliente y gestionan la interacción con la base de datos.

#### `articlesController.js`
- `getArticles`: Obtiene todos los artículos.
- `getArticleById`: Busca un artículo por ID.
- `createArticle`: Crea un nuevo artículo.
- `updateArticleById`: Actualiza un artículo.
- `deleteArticleById`: Elimina un artículo.

#### `clientController.js`
- `getAllClients`: Obtiene todos los clientes.
- `deleteClientById`: Elimina un cliente.
- `ClientRegistration`: Registra un nuevo cliente con contraseña cifrada.
- `clientLogin`: Genera un token JWT para autenticación.
- `ClientVerification`: Verifica usuarios autenticados.
- `updateClientById`: Actualiza los datos de un cliente.

Ejemplo de uso:
Cuando un usuario solicita `GET /api/articles`, el controlador accede a la base de datos y devuelve la lista de artículos.

---

### 4. Middleware (`middleware/`)

El archivo `authorization.js` maneja la autenticación con JWT.

#### Cómo funciona:
1. Verifica si la solicitud contiene un token JWT válido.
2. Decodifica el token y extrae la información del usuario.
3. Permite el acceso si el token es válido; de lo contrario, devuelve un error `401 Unauthorized`.

Ejemplo de uso en `clientRoutes.js`:
```js
clientRoutes.get('/verify-client', auth, ClientVerification);
```

---

### 5. Rutas (`routes/`)

Define las rutas de la API.

Ejemplo de uso:
```js
articlesRoutes.post('/create', createArticle); // localhost:3003/api/articles/create
```

---

## Documentación

### 1. Despliegue en Render

El proyecto está desplegado en:
[https://mongodb-proyecto6.onrender.com](https://mongodb-proyecto6.onrender.com)

### 2. Swagger

La documentación OpenAPI está en:
`PROYECTO-6 MONGO.postman_collection.json-OpenApi3Yaml`

---

## Contacto

Para consultas, puedes contactarme en:
📧 jimenaespinoza@gmail.com

