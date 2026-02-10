// 1. MÓDULOS DE NÚCLEO (Core): Herramientas base para el funcionamiento del servidor
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";

// 2. IMPORTACIÓN DE RUTAS (Estilo POM - Page Object Model): 
// Separamos la lógica por "dominios" para que el proyecto sea escalable y testeable.
import accountRouter from "./routes/account.js";
import authRouter from "./routes/auth.js";
import authTokenRouter from "./routes/auth_token.js";
import authSessionRouter from "./routes/auth_session.js";

// 3. CONFIGURACIÓN DE AMBIENTE:
// dotenv.config() carga las variables del archivo .env a process.env. 
// Vital para no "hardcodear" secretos (API Keys, Puertos) en el código.
dotenv.config();

const PORT = process.env.PORT || 3000; // Agregamos un "fallback" por si el .env falla
const expressApp = express();

// 4. MIDDLEWARES DE PRE-PROCESAMIENTO: 
// Transforman la petición cruda (RAW) en objetos JS que el servidor pueda entender.
expressApp.use(cookieParser()); // Parsea las cabeceras de Cookies
expressApp.use(express.json()); // Parsea cuerpos de peticiones en formato JSON
expressApp.use(express.text()); // Parsea cuerpos de peticiones en formato texto plano

// 5. DEFINICIÓN DE PUNTOS DE ENTRADA (Endpoints):
// Mapeamos los prefijos de URL a sus respectivos routers.
expressApp.use('/cuenta', accountRouter);
expressApp.use('/auth', authRouter);
expressApp.use("/auth-token", authTokenRouter);
expressApp.use("/auth-session", authSessionRouter);

// 6. LANZAMIENTO Y ESCUCHA (Bootstrap):
// Activamos el "oído" del servidor. Sin este bucle de eventos, el proceso moriría instantáneamente.
expressApp.listen(PORT, () => {
    console.log(`🚀 Servidor levantado y listo en: http://localhost:${PORT}`);
});


//en http hay que juntar la data binaria y trasnformarlade Chunks (Binario)
// a -> Buffer.concat().toString() (Texto) ->y de aqui a  JSON.parse() (Objeto).

//peor en express, En Express + Console (Salida/Debug):
// req.params (Objeto ya armado) -> JSON.stringify() (Texto).


// Lo que tienes ahora (Envías texto):
// res.send("ID: " + req.params.idcuenta); -> El cliente recibe un String.

// Lo que hace un Pro (Envías datos):
// res.json(req.params); -> El cliente recibe un Objeto JSON real.