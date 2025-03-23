**Proyecto Backend: E-commerce con Autenticación y Pasarela de Pagos**
**Tabla de Contenidos**
- [1. Clonar el repositorio](#1-clonar-el-repositorio)
- [2. Acceder al proyecto](#2-acceder-al-proyecto)
- [3. Instalar dependencias](#3-instalar-dependencias)
- [4. Crear archivo .env y configurar tus variables de entorno](#4-crear-archivo-env-y-configurar-tus-variables-de-entorno)
  - [5. Estructura del Proyecto](#5-estructura-del-proyecto)


**Requisitos**
Asegúrate de tener instalado:

- Node.js
- npm
- MongoDB Atlas (cuenta y conexión configurada)
- Stripe (cuenta para pruebas)

**Dependencias necesarias:**


- express 
- mongoose 
- bcryptjs 
- jsonwebtoken 
- cors 
- dotenv 
- nodemon 
- stripe

**Introducción**
Este backend fue desarrollado con Node.js y Express, conectado a una base de datos MongoDB Atlas.

**Incluye:**

Autenticación de clientes con JWT
CRUD de productos
Gestión del carrito de compras
Integración con Stripe para pagos reales
Protección de rutas con middleware
Modelado de datos con Mongoose


# 1. Clonar el repositorio

git clone https://github.com/usuario/MONGODB_PROYECTO6.git

# 2. Acceder al proyecto

cd MONGODB_PROYECTO6

# 3. Instalar dependencias

npm install

# 4. Crear archivo .env y configurar tus variables de entorno 

Crea un archivo .env en la raíz del proyecto con este contenido:

PORT=3003
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
FRONTEND_URL=http://localhost:5173

## 5. Estructura del Proyecto

```bash
📦 MONGODB-PROYECTO6
├── 📂 config
│   └── db.js
├── 📂 controllers
│   ├── articlesController.js
│   ├── clientController.js
│   ├── checkoutController.js
│   ├── paymentController.js
│   └── stripeController.js
├── 📂 middleware
│   └── authorization.js
├── 📂 models
│   ├── Article.js
│   ├── Cart.js
│   ├── Category.js
│   ├── Client.js
│   └── Pet.js
├── 📂 routes
│   ├── articlesRoutes.js
│   ├── clientRoutes.js
│   ├── checkoutRoutes.js
│   └── paymentRoutes.js
├── 📜 server.js
├── 📜 .env
├── 📜 package.json
├── 📜 .gitignore

**CARPETAS PRINCIPALES**
**6.	Carpeta routes**
La carpeta /routes organiza todos los endpoints del backend. Cada archivo define las rutas de una funcionalidad específica de la aplicación, y conecta las peticiones HTTP con los controladores que contienen la lógica correspondiente.
Estas rutas son utilizadas por el servidor para dirigir las solicitudes entrantes hacia el controlador adecuado.
Los archivos principales son:
- articlesRoutes.js: Rutas para crear, leer, actualizar y eliminar productos. También conecta productos con Stripe.
- clientRoutes.js: Rutas para registrar, autenticar, verificar y administrar clientes.
- checkoutRoutes.js: Rutas protegidas con JWT para gestionar el carrito de compras y crear sesiones de pago.
- paymentRoutes.js: Rutas de prueba para crear sesiones de pago simples con Stripe y manejar los resultados de éxito o cancelación.

**7.	Carpeta /models**
La carpeta /models contiene los esquemas de Mongoose que definen la estructura de los datos almacenados en MongoDB. Cada modelo representa una colección dentro de la base de datos y establece qué campos debe tener cada documento, su tipo de dato y sus relaciones con otras colecciones. Estos modelos son esenciales para interactuar de forma organizada con la base de datos.
Los modelos principales son:
- Client.js: define los datos del cliente, incluyendo nombre, correo, dirección, teléfono y su carrito asociado.

**8. Carpeta /controllers**
Esta carpeta contiene la lógica que gestiona las operaciones principales del sistema. Cada archivo responde a solicitudes específicas que provienen de las rutas y se comunica con la base de datos a través de los modelos.

- clientController.js
Gestiona el registro, login, verificación con JWT y edición de clientes.

- articlesController.js
Maneja las operaciones CRUD de productos en la tienda.

- checkoutController.js
Controla la creación, modificación y recuperación del carrito de compras. También conecta el carrito con Stripe para generar sesiones de pago reales.

- paymentController.js
Implementa sesiones de pago de prueba con Stripe y muestra mensajes de éxito o cancelación.

Contacto
📧 jimenaespinoza@gmail.com
👩‍💻 Desarrollado por Jimena Espinoza
🎓 Proyecto académico - Cohorte 16
📦 Backend completo con autenticación y Stripe
**