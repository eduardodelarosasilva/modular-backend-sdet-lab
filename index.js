//esto es como POM, aqui sepramos instancias del servidor de la lógica de rutas (account.js
//practicamente separas dónde ocurren las cosas de qué cosas ocurren.
import dotenv from "dotenv";
dotenv.config();
import express from "express"; // Importación limpia
import accountRouter from "./routes/account.js";
import authRouter from "./routes/auth.js";

const expressApp = express();         // Instancia de la app
const PORT = process.env.PORT; //normalmente va con variables de entorno

expressApp.use(express.json());
expressApp.use(express.text());
//limpieza de código. evitamos repetir la ruta en todo los scripts, ademas de hacerlo legible
expressApp.use('/cuenta', accountRouter);
expressApp.use('/auth', authRouter)


expressApp.listen(PORT, () => {
    console.log(`🚀 Servidor levantado en el puerto${PORT}`);
});



//en http hay que juntar la data binaria y trasnformarlade Chunks (Binario)
// a -> Buffer.concat().toString() (Texto) ->y de aqui a  JSON.parse() (Objeto).

//peor en express, En Express + Console (Salida/Debug):
// req.params (Objeto ya armado) -> JSON.stringify() (Texto).


// Lo que tienes ahora (Envías texto):
// res.send("ID: " + req.params.idcuenta); -> El cliente recibe un String.

// Lo que hace un Pro (Envías datos):
// res.json(req.params); -> El cliente recibe un Objeto JSON real.