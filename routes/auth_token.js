import { Router } from "express";
import authByEmailPwd from "../helpers/auth-by-email-pwd.js";

const authTokenRouter = Router();
//login con email y password
authTokenRouter.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send();

    try {
        const user = authByEmailPwd(email, password);

        return res.send(`usuario ${user.name} autenticado`);
    } catch (err) {
        return res.sendStatus(401);
    }
})
//solicitud autenticada con sesion para obtener el perfil del ususario
export default authTokenRouter;