import dotenv from "dotenv";
import express from "express";
import accountRouter from "./routes/account.js";
import authRouter from "./routes/auth.js";
import authTokenRouter from "./routes/auth_token.js";
import authSessionRouter from "./routes/auth_session.js";
import cookieParser from "cookie-parser";


dotenv.config();

const PORT = process.env.PORT;
const expressApp = express();
//middlewares
expressApp.use(cookieParser());
expressApp.use(express.json());
expressApp.use(express.text());

expressApp.use('/cuenta', accountRouter);

expressApp.use('/auth', authRouter);

expressApp.use("/auth-token", authTokenRouter);
expressApp.use("/auth-session", authSessionRouter);


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