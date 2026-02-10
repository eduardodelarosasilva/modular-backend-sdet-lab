import { Router } from "express";
import authByEmailPwd from "../helpers/auth-by-email-pwd.js";
import { nanoid } from "nanoid";

const session = [];
const authSessionRouter = Router();
authSessionRouter.post("/login", (req, res) => {
    const { email, password } = req.body;//destructuring 
    if (!email || !password) return res.status(400).send("Email y password requeridos");
    try {
        const user = authByEmailPwd(email, password);
        const sessionId = nanoid();
        // Guardamos el sessionId y, opcionalmente, el ID del usuario para saber de quién es la sesión
        //aqui podemos acceder a user.guid, porque authByEamilPdw hizo un return user;pero el objeto esta guardado en la constante
        //Usamos llaves porque queremos guardar un OBJETO, si hacemos "session.push(sessionId)" solo guardarias este atributo
        session.push({ sessionId, userGuid: user.guid });//usmaos shortend
        //aqui estamos creando un objeto nuevo, si no tiene propiedad, la inventamos.
        res.cookie('sessionId', sessionId, {
            httpOnly: true,
        });
        return res.send(`Bienvenido ${user.name}`);
    } catch (err) {
        console.error("❌ Error en Login:", err.message);
        return res.status(500).json({
            error: "Internal Server Error / Auth Failed",
            message: err.message,
            stack: err.stack
        })
    }
});
//aqui la cookie se genero, y ene lr pox request que hagamos se incliuira automaticamente en headers
//por eso en eset get request, podemos extraer la cookie, por que ya esta en el request.
authSessionRouter.get("/profile", (req, res) => {
    //destrcturing, usamos la cookie del request(se pasa automaticamente dsps del post)
    const { sessionId } = req.cookies;

    //si no hay sessionId no esta autenticado
    if (!sessionId) return res.status(401).send("No hay sesión activa (Falta Cookie)");

    // como hizimos push de sessionId en  const session = [];
    // Buscamos si las cookies coinciden, la que nos manda el cliente c/la de DB
    const userSession = session.find(s => s.sessionId === sessionId);

    //si coinciden se guardar en userSession  y podremos validar su existencia
    if (!userSession) return res.status(401).send("Sesión no válida o expirada");

    // POR ULTIMO VALIDAMOS EL GUID (Aquí estaba el detalle):
    // Usamos "userSession.userGuid" porque así lo bautizamos en el POST (línea 31)
    const usuario = USER_BBDD.find((user) => user.guid === userSession.userGuid);

    // Si el usuario ya no existe en la base de datos (fue borrado)
    if (!usuario) return res.status(401).send("Usuario ya no existe en la base de datos");

    console.log("🍪 Cookie recibida y validada:", sessionId);

    // --- MEJORA DE RESPUESTA ---
    // Clonamos el objeto para no modificar la BBDD original (referencia)
    const perfilPublico = { ...usuario };
    delete perfilPublico.password; // Borramos el password por seguridad antes de enviar

    return res.send(perfilPublico);
    // Nota: El código después de un "return" nunca se ejecuta, por eso moví el delete arriba.
});

export default authSessionRouter;